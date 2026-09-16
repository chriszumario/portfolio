import { afterEach, describe, expect, it, vi } from 'vitest';
import { fetchAllPosts, fetchPost, fetchPosts, likePost } from '../../../src/features/blog/api';
import { postFixture } from '../../support/fixtures';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('blog API', () => {
  it('validates pagination parameters', async () => {
    await expect(fetchPosts({ skip: -1 })).rejects.toThrow(RangeError);
    await expect(fetchPosts({ limit: 101 })).rejects.toThrow(RangeError);
  });

  it('encodes filters and validates the page', async () => {
    const fetchMock = vi.fn().mockResolvedValue(Response.json({
      items: [postFixture], total: 1, skip: 0, limit: 10,
    }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchPosts({ limit: 10, tag: 'Clean Code', q: 'API design' }))
      .resolves.toMatchObject({ total: 1 });
    expect(fetchMock.mock.calls[0]?.[0]).toContain('tag=Clean+Code&q=API+design');
  });

  it('loads every page without issuing an extra request', async () => {
    const fetchMock = vi.fn()
      .mockResolvedValueOnce(Response.json({ items: [postFixture], total: 2, skip: 0, limit: 100 }))
      .mockResolvedValueOnce(Response.json({
        items: [{ ...postFixture, id: 2, slug: 'solid-islands' }], total: 2, skip: 1, limit: 100,
      }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(fetchAllPosts()).resolves.toHaveLength(2);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('encodes slugs and uses POST for likes', async () => {
    const detail = { ...postFixture, content: 'Article content' };
    const fetchMock = vi.fn().mockImplementation(() => Promise.resolve(Response.json(detail)));
    vi.stubGlobal('fetch', fetchMock);

    await fetchPost('clean-apis');
    await likePost('clean-apis');

    expect(fetchMock.mock.calls[0]?.[0]).toContain('/posts/clean-apis');
    expect(fetchMock.mock.calls[1]?.[1]).toMatchObject({ method: 'POST' });
  });

  it('rejects empty slugs', async () => {
    await expect(fetchPost('  ')).rejects.toThrow(TypeError);
  });
});
