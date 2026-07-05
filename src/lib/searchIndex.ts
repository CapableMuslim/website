import { getCollection } from 'astro:content';
import type { SearchEntry } from './searchConfig';

function stripMarkdown(text: string): string {
    return text
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`[^`]*`/g, ' ')
        .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
        .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/[*_~>#-]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export async function buildArticleSearchIndex(): Promise<SearchEntry[]> {
    const posts = await getCollection('posts');

    return posts.map((post) => ({
        title: post.data.title,
        description: post.data.description || '',
        slug: `posts/${post.slug}`,
        url: `/posts/${post.slug}`,
        type: 'article' as const,
        pillar: post.data.pillar || '',
        subpillar: post.data.subpillar || '',
        category: post.data.pillar || 'Article',
        content: stripMarkdown(post.body),
    }));
}
