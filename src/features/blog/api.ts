import { apiFetch } from '../../lib/http';
import { parsePaginated, parsePostDetail, parsePostSummary } from '../../lib/api-contracts';
import type { FetchPostsParams, PaginatedResponse, PostDetail, PostSummary } from './types';

export async function fetchPosts(params: FetchPostsParams = {}): Promise<PaginatedResponse<PostSummary>> {
  if (params.skip !== undefined && (!Number.isInteger(params.skip) || params.skip < 0)) {
    throw new RangeError('skip debe ser un entero mayor o igual que 0');
  }
  if (params.limit !== undefined && (!Number.isInteger(params.limit) || params.limit < 1 || params.limit > 100)) {
    throw new RangeError('limit debe ser un entero entre 1 y 100');
  }

  const searchParams = new URLSearchParams();

  if (params.skip !== undefined) searchParams.set('skip', params.skip.toString());
  if (params.limit !== undefined) searchParams.set('limit', params.limit.toString());
  if (params.tag) searchParams.set('tag', params.tag);
  if (params.q) searchParams.set('q', params.q);

  const queryString = searchParams.toString();
  const endpoint = `/posts${queryString ? `?${queryString}` : ''}`;

  return apiFetch(endpoint, parsePaginated(parsePostSummary));
}

export async function fetchAllPosts(
  params: Omit<FetchPostsParams, 'skip' | 'limit'> = {},
): Promise<PostSummary[]> {
  const items: PostSummary[] = [];
  let skip = 0;
  let total = 0;

  do {
    const page = await fetchPosts({ ...params, skip, limit: 100 });
    if (page.skip !== skip) throw new Error('La API devolvió una página fuera de secuencia');
    items.push(...page.items);
    total = page.total;

    if (page.items.length === 0) break;
    skip += page.items.length;
  } while (items.length < total);

  return items;
}

export async function fetchPost(slug: string): Promise<PostDetail> {
  if (!slug.trim()) throw new TypeError('slug no puede estar vacío');
  return apiFetch(`/posts/${encodeURIComponent(slug)}`, parsePostDetail);
}

export async function likePost(slug: string): Promise<PostDetail> {
  if (!slug.trim()) throw new TypeError('slug no puede estar vacío');
  return apiFetch(`/posts/${encodeURIComponent(slug)}/like`, parsePostDetail, {
    method: 'POST',
  });
}
