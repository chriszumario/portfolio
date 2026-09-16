import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { fetchAllPosts, fetchPost } from './features/blog/api';

export const collections = {
  blog: defineCollection({
    loader: {
      name: 'portfolio-api-blog',
      async load({ store, parseData, renderMarkdown, generateDigest, logger }) {
        let items;
        try {
          items = await fetchAllPosts();
        } catch (error) {
          logger.error(`No se pudo cargar el índice del blog: ${String(error)}`);
          return;
        }

        store.clear();

        const postResults: PromiseSettledResult<Awaited<ReturnType<typeof fetchPost>>>[] = [];
        for (let index = 0; index < items.length; index += 5) {
          postResults.push(...await Promise.allSettled(
            items.slice(index, index + 5).map(({ slug }) => fetchPost(slug)),
          ));
        }

        for (const result of postResults) {
          if (result.status === 'rejected') {
            logger.warn(`No se pudo cargar un artículo: ${result.reason}`);
            continue;
          }

          const post = result.value;
          if (!post.is_published) continue;

          try {
            const data = await parseData({
              id: post.slug,
              data: {
                id: post.id,
                title: post.title,
                slug: post.slug,
                excerpt: post.excerpt,
                cover_image_url: post.cover_image_url,
                reading_time_minutes: post.reading_time_minutes,
                tags: post.tags,
                published_at: post.published_at,
                views_count: post.views_count,
                likes_count: post.likes_count,
                is_published: post.is_published,
                created_at: post.created_at,
                updated_at: post.updated_at,
              },
            });
            const rendered = await renderMarkdown(post.content);

            store.set({
              id: post.slug,
              data,
              body: post.content,
              rendered,
              digest: generateDigest({ ...data, content: post.content }),
            });
          } catch (error) {
            logger.warn(`Se omitió el artículo inválido "${post.slug}": ${String(error)}`);
          }
        }
      },
    },
    schema: z.object({
      id: z.number().int().positive(),
      title: z.string().min(1),
      slug: z.string().min(1),
      excerpt: z.string().nullable(),
      cover_image_url: z.string().nullable(),
      reading_time_minutes: z.number().int().positive(),
      tags: z.array(z.string()),
      published_at: z.string().nullable(),
      views_count: z.number().int().nonnegative(),
      likes_count: z.number().int().nonnegative(),
      is_published: z.boolean(),
      created_at: z.string().nullable(),
      updated_at: z.string().nullable(),
    }),
  }),
};
