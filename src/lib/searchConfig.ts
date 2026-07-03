import type { IFuseOptions } from 'fuse.js';

export type SearchEntry = {
    title: string;
    description: string;
    slug: string;
    url: string;
    type: 'article' | 'page';
    pillar: string;
    subpillar: string;
    category: string;
    content: string;
};

export const fuseSearchOptions: IFuseOptions<SearchEntry> = {
    keys: [
        { name: 'title', weight: 0.5 },
        { name: 'description', weight: 0.3 },
        { name: 'pillar', weight: 0.1 },
        { name: 'subpillar', weight: 0.1 },
    ],
    threshold: 0.2,
    ignoreLocation: true,
    minMatchCharLength: 2,
    includeScore: true,
};

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function matchesMetadata(entry: SearchEntry, query: string): boolean {
    const haystacks = [
        entry.title,
        entry.description,
        entry.pillar,
        entry.subpillar,
        entry.category,
    ];

    return haystacks.some((value) => value.toLowerCase().includes(query));
}

function matchesContentWord(entry: SearchEntry, query: string): boolean {
    if (!entry.content) return false;
    const pattern = new RegExp(`\\b${escapeRegex(query)}\\b`, 'i');
    return pattern.test(entry.content);
}

export function searchEntries(index: SearchEntry[], rawQuery: string): SearchEntry[] {
    const query = rawQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    const directMatches = index.filter((entry) => matchesMetadata(entry, query));
    if (directMatches.length > 0) {
        return directMatches;
    }

    const contentMatches = index.filter((entry) => matchesContentWord(entry, query));
    if (contentMatches.length > 0) {
        return contentMatches;
    }

    return [];
}

export function getQueryFromUrl(): string {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('q')?.trim() ?? '';
}
