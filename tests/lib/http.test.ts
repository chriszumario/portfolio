import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseHero } from '../../src/lib/api-contracts';
import { apiFetch, resolveApiAssetUrl } from '../../src/lib/http';
import { heroFixture } from '../support/fixtures';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('apiFetch', () => {
  it('requests a relative endpoint and validates its response', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json(heroFixture));
    vi.stubGlobal('fetch', fetchMock);

    await expect(apiFetch('/hero', parseHero)).resolves.toEqual(heroFixture);
    expect(fetchMock).toHaveBeenCalledOnce();
    expect(fetchMock.mock.calls[0]?.[0]).toBe('http://127.0.0.1:8000/api/v1/hero');
    expect(new Headers(fetchMock.mock.calls[0]?.[1]?.headers).get('Accept')).toBe('application/json');
  });

  it('rejects absolute endpoints', async () => {
    await expect(apiFetch('https://attacker.example/data', parseHero)).rejects.toThrow(TypeError);
  });

  it('reports invalid successful responses separately from network errors', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({ name: 'Ada' })));

    await expect(apiFetch('/hero', parseHero)).rejects.toMatchObject({
      status: 200,
      code: 'invalid_response',
    });
  });

  it('preserves structured HTTP error details', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue(Response.json({
      error: {
        code: 'validation_error',
        message: 'Invalid request',
        issues: [{ field: 'limit', message: 'Too large', code: 'maximum' }],
      },
    }, { status: 422, headers: { 'X-Request-ID': 'request-1' } })));

    await expect(apiFetch('/hero', parseHero)).rejects.toMatchObject({
      status: 422,
      code: 'validation_error',
      message: 'Invalid request',
      requestId: 'request-1',
    });
  });

  it('rejects invalid timeout values before requesting', async () => {
    await expect(apiFetch('/hero', parseHero, { timeoutMs: 0 })).rejects.toThrow(RangeError);
  });
});

describe('resolveApiAssetUrl', () => {
  it('resolves relative API assets and rejects active protocols', () => {
    expect(resolveApiAssetUrl('/media/avatar.webp')).toBe('http://127.0.0.1:8000/media/avatar.webp');
    expect(resolveApiAssetUrl('javascript:alert(1)')).toBeNull();
  });
});
