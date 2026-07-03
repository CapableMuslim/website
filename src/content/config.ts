import { defineCollection, z } from 'astro:content';

const posts = defineCollection({
    type: 'content',

    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        pubDate: z.coerce.date().optional(),
        updatedDate: z.coerce.date().optional(),
        heroImage: z.string().optional(),
        pillar: z.string().optional(),
        subpillar: z.string().optional(),
    }),
});

export const collections = { posts };
