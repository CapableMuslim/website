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

type MatchRank = 0 | 1 | 2 | 3;

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function containsQuery(value: string, query: string): boolean {
    return value.toLowerCase().includes(query);
}

function containsWord(value: string, query: string): boolean {
    if (!value) return false;
    const pattern = new RegExp(`\\b${escapeRegex(query)}\\b`, 'i');
    return pattern.test(value);
}

function getMatchRank(entry: SearchEntry, query: string): MatchRank | null {
    if (containsQuery(entry.title, query)) return 0;
    if (containsQuery(entry.description, query)) return 1;
    if (containsQuery(entry.pillar, query) || containsQuery(entry.subpillar, query)) return 2;
    if (containsWord(entry.content, query)) return 3;
    return null;
}

export function searchEntries(index: SearchEntry[], rawQuery: string): SearchEntry[] {
    const query = rawQuery.trim().toLowerCase();
    if (query.length < 2 || index.length === 0) return [];

    const ranked = index
        .map((entry) => ({ entry, rank: getMatchRank(entry, query) }))
        .filter((item): item is { entry: SearchEntry; rank: MatchRank } => item.rank !== null)
        .sort((a, b) => a.rank - b.rank || a.entry.title.localeCompare(b.entry.title));

    return ranked.map((item) => item.entry);
}

export function getQueryFromUrl(): string {
    if (typeof window === 'undefined') return '';
    return new URLSearchParams(window.location.search).get('q')?.trim() ?? '';
}

export function buildSearchPageUrl(query: string): string {
    const trimmed = query.trim();
    if (!trimmed) return '/search';
    return `/search?q=${encodeURIComponent(trimmed)}`;
}
