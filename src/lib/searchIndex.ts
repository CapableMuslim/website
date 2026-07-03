import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';
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

export async function buildSearchIndex(): Promise<SearchEntry[]> {
    const posts = await getCollection('posts');

    const articles: SearchEntry[] = posts.map((post) => ({
        title: post.data.title,
        description: post.data.description || '',
        slug: `posts/${post.slug}`,
        url: `/posts/${post.slug}`,
        type: 'article',
        pillar: post.data.pillar || '',
        subpillar: post.data.subpillar || '',
        category: post.data.pillar || 'Article',
        content: stripMarkdown(post.body),
    }));

    const pages: SearchEntry[] = [
        {
            title: 'Home',
            description: siteConfig.tagline,
            slug: '',
            url: '/',
            type: 'page',
            pillar: '',
            subpillar: '',
            category: 'General',
            content: siteConfig.footerTagline,
        },
        {
            title: 'All Articles',
            description: 'Browse every article published on Capable Muslim.',
            slug: 'posts',
            url: '/posts',
            type: 'page',
            pillar: '',
            subpillar: '',
            category: 'Articles',
            content: 'articles posts library content',
        },
        {
            title: 'About Us',
            description: 'Built on faith and discipline. Our mission and values.',
            slug: 'about',
            url: '/about',
            type: 'page',
            pillar: '',
            subpillar: '',
            category: 'Company',
            content: 'mission faith discipline capability muslim',
        },
        {
            title: 'Contact',
            description: 'Get in touch with our team.',
            slug: 'contact',
            url: '/contact',
            type: 'page',
            pillar: '',
            subpillar: '',
            category: 'Company',
            content: 'contact support email social',
        },
        {
            title: 'FAQ',
            description: `Common questions about ${siteConfig.name}.`,
            slug: 'faq',
            url: '/faq',
            type: 'page',
            pillar: '',
            subpillar: '',
            category: 'Company',
            content: 'questions answers help support',
        },
        {
            title: 'Bookshelf',
            description: 'Curated knowledge for the modern seeker.',
            slug: 'bookshelf',
            url: '/bookshelf',
            type: 'page',
            pillar: 'BOOKSHELF',
            subpillar: '',
            category: 'Resources',
            content: 'books reading reviews must read',
        },
    ];

    return [...articles, ...pages];
}
