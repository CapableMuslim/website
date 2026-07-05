import { useState, useEffect, useMemo } from 'react';
import type { SearchEntry } from '../lib/searchConfig';
import { getQueryFromUrl, searchEntries } from '../lib/searchConfig';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<SearchEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlQuery = getQueryFromUrl();
        if (urlQuery) setQuery(urlQuery);

        fetch('/search.json')
            .then((res) => res.json())
            .then((data: SearchEntry[]) => {
                setIndex(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const results = useMemo(() => {
        if (query.trim().length < 2 || index.length === 0) return [];
        return searchEntries(index, query);
    }, [index, query]);

    const updateUrl = (value: string) => {
        const url = new URL(window.location.href);
        if (value.trim()) url.searchParams.set('q', value.trim());
        else url.searchParams.delete('q');
        window.history.replaceState({}, '', url.toString());
    };

    return (
        <section className="section-padding section-surface min-h-[70vh]">
            <div className="container-content mx-auto max-w-3xl">
                <header className="mb-10 border-b border-gold/15 pb-8 text-center">
                    <p className="eyebrow mb-3">Search</p>
                    <h1 className="font-display text-3xl text-parchment sm:text-4xl">Find articles</h1>
                    <p className="mt-3 text-parchment-300">Search across all pillars and topics.</p>
                    {query.trim().length >= 2 && !loading && (
                        <p className="mt-2 text-sm text-parchment-400">
                            {results.length > 0
                                ? `${results.length} article${results.length === 1 ? '' : 's'} for "${query.trim()}"`
                                : `No articles for "${query.trim()}"`}
                        </p>
                    )}
                </header>

                <div className="relative mb-8">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            updateUrl(e.target.value);
                        }}
                        placeholder="Search articles..."
                        className="input-field py-3 pl-11"
                        autoFocus
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-parchment-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {loading && <p className="text-center text-sm text-parchment-400">Loading search index...</p>}

                {!loading && query.trim().length < 2 && (
                    <p className="text-center text-sm text-parchment-400">Type at least 2 characters to search.</p>
                )}

                {!loading && query.trim().length >= 2 && results.length === 0 && (
                    <div className="card py-12 text-center">
                        <p className="font-display text-lg text-parchment">No results found</p>
                        <p className="mt-2 text-sm text-parchment-400">Try different keywords or browse all articles.</p>
                    </div>
                )}

                {!loading && results.length > 0 && (
                    <ul className="space-y-3">
                        {results.map((result) => (
                            <li key={result.url}>
                                <a
                                    href={result.url}
                                    className="card block p-5 transition-colors hover:border-gold/30"
                                >
                                    {result.pillar && (
                                        <span className="category-tag mb-2">{result.pillar}</span>
                                    )}
                                    <h2 className="font-display text-lg text-parchment">{result.title}</h2>
                                    {result.description && (
                                        <p className="mt-1 text-sm leading-relaxed text-parchment-300">{result.description}</p>
                                    )}
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </section>
    );
}
