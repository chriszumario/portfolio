import { PUBLIC_API_URL } from 'astro:env/client';
import type { ApiResponseParser } from './api-contracts';

export interface ApiIssue {
  field: string;
  message: string;
  code: string;
}

export class ApiClientError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly code: string,
    readonly issues: ApiIssue[] = [],
    readonly requestId: string | null = null,
    options?: ErrorOptions,
  ) {
    super(message, options);
    this.name = 'ApiClientError';
  }
}

export interface ApiFetchOptions extends RequestInit {
  timeoutMs?: number;
}

function normalizeApiBaseUrl(value: string): URL {
  const url = new URL(value);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new TypeError('PUBLIC_API_URL debe usar HTTP o HTTPS');
  }

  url.search = '';
  url.hash = '';
  url.pathname = url.pathname.replace(/\/$/, '') || '/api/v1';
  return url;
}

const API_BASE_URL = normalizeApiBaseUrl(PUBLIC_API_URL);

export function resolveApiAssetUrl(path: string | null | undefined): string | null {
  if (!path) return null;

  try {
    const url = new URL(path, `${API_BASE_URL.origin}/`);
    return url.protocol === 'http:' || url.protocol === 'https:' ? url.toString() : null;
  } catch {
    return null;
  }
}

export async function apiFetch<T>(
  endpoint: string,
  parse: ApiResponseParser<T>,
  options: ApiFetchOptions = {}
): Promise<T> {
  const { timeoutMs = 8000, ...fetchOptions } = options;
  if (!endpoint.startsWith('/') || endpoint.startsWith('//')) {
    throw new TypeError('El endpoint de la API debe ser una ruta relativa absoluta');
  }
  if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
    throw new RangeError('timeoutMs debe ser un número positivo');
  }

  const url = `${API_BASE_URL.toString()}${endpoint}`;

  const controller = new AbortController();
  let timedOut = false;
  const timeoutId = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);
  const externalSignal = fetchOptions.signal;
  const abortFromCaller = () => controller.abort(externalSignal?.reason);

  if (externalSignal) {
    if (externalSignal.aborted) {
      abortFromCaller();
    } else {
      externalSignal.addEventListener('abort', abortFromCaller, { once: true });
    }
  }

  try {
    const headers = new Headers(fetchOptions.headers);
    if (!headers.has('Accept')) headers.set('Accept', 'application/json');

    const response = await fetch(url, { ...fetchOptions, headers, signal: controller.signal });

    if (!response.ok) {
      let message = `La API respondió con HTTP ${response.status}`;
      let code = 'http_error';
      let issues: ApiIssue[] = [];
      try {
        const body: unknown = await response.json();
        if (body && typeof body === 'object' && !Array.isArray(body)) {
          const error = Reflect.get(body, 'error');
          if (error && typeof error === 'object' && !Array.isArray(error)) {
            const candidateMessage = Reflect.get(error, 'message');
            const candidateCode = Reflect.get(error, 'code');
            const candidateIssues = Reflect.get(error, 'issues');
            if (typeof candidateMessage === 'string') message = candidateMessage;
            if (typeof candidateCode === 'string') code = candidateCode;
            if (Array.isArray(candidateIssues)) {
              issues = candidateIssues.filter((issue): issue is ApiIssue => (
                Boolean(issue)
                && typeof issue === 'object'
                && typeof Reflect.get(issue, 'field') === 'string'
                && typeof Reflect.get(issue, 'message') === 'string'
                && typeof Reflect.get(issue, 'code') === 'string'
              ));
            }
          }
        }
      } catch {
        // The status and request ID still provide actionable context.
      }

      throw new ApiClientError(
        message,
        response.status,
        code,
        issues,
        response.headers.get('X-Request-ID'),
      );
    }

    if (response.status === 204) return undefined as T;
    try {
      return parse(await response.json());
    } catch (error) {
      throw new ApiClientError(
        'La API devolvió una respuesta con formato inválido',
        response.status,
        'invalid_response',
        [],
        response.headers.get('X-Request-ID'),
        { cause: error },
      );
    }
  } catch (error) {
    if (error instanceof ApiClientError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      if (!timedOut) throw error;
      throw new ApiClientError(`Tiempo de espera agotado (${timeoutMs}ms)`, 0, 'timeout');
    }
    throw new ApiClientError('No se pudo conectar con la API', 0, 'network_error', [], null, {
      cause: error,
    });
  } finally {
    clearTimeout(timeoutId);
    externalSignal?.removeEventListener('abort', abortFromCaller);
  }
}
