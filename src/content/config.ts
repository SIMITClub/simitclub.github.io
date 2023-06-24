import {defineCollection, reference, z} from 'astro:content';

const memberCollection = defineCollection({
  type: 'data',
  schema: z
    .object({

      name: z.object({
        first: z.string(),
        last: z.string().optional(),
      }),

    }).strict()
});

const categoryCollection = defineCollection({
  type: 'data',
  schema: z
    .object({

      title: z.string(),
      description: z.string(),

    }).strict()
});

const postCollection = defineCollection({
  type: "content",
  schema: z
    .object({

      authors: z
        .array(reference('members'))
        .default(['_default']),
      categories: z
        .array(reference('category'))
        .default([]),
      title: z.string(),

    }).strict()
});

export const collections = {
  'members': memberCollection,
  'category': categoryCollection,
  'posts': postCollection,
};