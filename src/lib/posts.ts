import type { CollectionEntry } from 'astro:content';

const WORDS_PER_MINUTE = 220;

export const DEFAULT_HERO_IMAGE =
    'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800&h=533';

export function estimateReadingTime(body: string): number {
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function formatPillarLabel(pillar?: string): string {
    if (!pillar) return 'General';
    return pillar.charAt(0) + pillar.slice(1).toLowerCase();
}

export function formatDate(date?: Date): string {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });
}

export type PostCard = {
    title: string;
    description: string;
    slug: string;
    pillar: string;
    pillarKey: string;
    subpillar?: string;
    image: string;
    readingTime: number;
    pubDate?: Date;
};

export function toPostCard(post: CollectionEntry<'posts'>): PostCard {
    return {
        title: post.data.title,
        description: post.data.description ?? '',
        slug: post.slug,
        pillar: formatPillarLabel(post.data.pillar),
        pillarKey: (post.data.pillar ?? '').toUpperCase(),
        subpillar: post.data.subpillar,
        image: post.data.heroImage ?? DEFAULT_HERO_IMAGE,
        readingTime: estimateReadingTime(post.body),
        pubDate: post.data.pubDate,
    };
}

export function sortPostsByDate(posts: CollectionEntry<'posts'>[]): CollectionEntry<'posts'>[] {
    return [...posts].sort((a, b) => {
        const dateA = a.data.pubDate ? new Date(a.data.pubDate).getTime() : 0;
        const dateB = b.data.pubDate ? new Date(b.data.pubDate).getTime() : 0;
        return dateB - dateA;
    });
}

export function getRelatedPosts(
    allPosts: CollectionEntry<'posts'>[],
    current: CollectionEntry<'posts'>,
    limit = 5,
): PostCard[] {
    const sorted = sortPostsByDate(allPosts);
    const samePillar = sorted.filter(
        (p) => p.slug !== current.slug && p.data.pillar === current.data.pillar,
    );
    const others = sorted.filter(
        (p) => p.slug !== current.slug && p.data.pillar !== current.data.pillar,
    );
    const related = [...samePillar, ...others].slice(0, Math.min(Math.max(limit, 3), 6));
    return related.map(toPostCard);
}

export function getFeaturedPosts(
    allPosts: CollectionEntry<'posts'>[],
    featuredSlugs: string[],
    limit = 6,
): PostCard[] {
    const sorted = sortPostsByDate(allPosts);
    const bySlug = new Map(sorted.map((p) => [p.slug, p]));

    const featured = featuredSlugs
        .map((slug) => bySlug.get(slug))
        .filter((p): p is CollectionEntry<'posts'> => Boolean(p))
        .map(toPostCard);

    if (featured.length >= limit) return featured.slice(0, limit);

    const remaining = sorted
        .filter((p) => !featuredSlugs.includes(p.slug))
        .map(toPostCard);

    return [...featured, ...remaining].slice(0, limit);
}
