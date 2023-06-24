import {CollectionEntry, defineCollection, reference, SchemaContext, z} from 'astro:content';

export const memberSchema = ({ image }: SchemaContext) => z
  .object({

    // ------------------------------------------------------------------------
    // Required

    name: z.object({
      first: z.string(),
      last: z.string().optional()
    }),

    // ------------------------------------------------------------------------
    // Optional

    bio: z.string().max(150).optional(),

    /** Email, website, or social media profile. */
    contact: z
      .union([z.string().url(), z.string().email()])
      .optional(),

    position: z.enum([
      'President',
      'Vice President',
      'Events Director',
      'Events Subcommittee',
      'Marketing Director',
      'Marketing Subcommittee',
      'Technical Director',
      'Technical Deputy Director',
      'Technical Subcommittee',
      'Member',
    ]).default('Member'),

    status: z.enum(["alumni", "current"]).default("current"),

    // https://developers.facebook.com/docs/sharing/best-practices/#images
    img: z.object({
      alt: z.string(),
      src: image().refine((img) => img.format !== 'jpg' || img.width >= 314, {
        message: 'Image must be at least 314px wide!'
      })
    })

  }).strict();

export const postSchema = ({ image }: SchemaContext) => z
  .object({

    // ----------------------------------------------------------------------
    // Required

    title: z.string(),
    datePublished: z
      .union([z.date(), z.string()])
      .transform((val) => new Date(val)),

    // Follow recommended limit for <meta name="description" content="">
    // https://github.com/joshbuchea/HEAD/blob/master/README.md?plain=1#L133
    description: z.string().max(150),

    // ----------------------------------------------------------------------
    // Optional

    authors: z
      .array(reference('members'))
      .default(['default']),

    categories: z
      .array(reference('category'))
      .default([]),

    draft: z
      .boolean()
      .default(false),

    // https://developers.facebook.com/docs/sharing/best-practices/#images
    img: z.object({
      alt: z.string(),
      // Link to "@assets/images/*".
      src: image().refine((img) => img.format !== 'jpg' || img.width >= 600, {
        message: 'Image must be at least 600px wide!'
      }),
      height: z.number().optional(),
      width: z.number().optional(),
      // Attribution link.
      attribution: z.string().optional()
    }).optional(),

    related: z
      .array(reference('posts'))
      .default([]),

  }).strict();

export const categorySchema = () => z
  .object({

    /** Full name of the category. */
    title: z.string(),

    /** Short description of the category. */
    description: z.string().max(150),

    /** SVG icon for the category, e.g. "mdi:language-c" */
    icon: z.string().optional(),

  }).strict();

const memberCollection = defineCollection({
  type: 'content',
  schema: memberSchema
});

const categoryCollection = defineCollection({
  type: 'data',
  schema: categorySchema
});

const postCollection = defineCollection({
  type: "content",
  schema: postSchema
});

export type Members = CollectionEntry<'members'>;
export type Posts = CollectionEntry<'posts'>;
export type Categories = CollectionEntry<'category'>;

export const collections = {
  'members': memberCollection,
  'category': categoryCollection,
  'posts': postCollection,
};