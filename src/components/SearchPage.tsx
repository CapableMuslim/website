import { useState, useEffect, useMemo } from 'react';
import type { SearchEntry } from '../lib/searchConfig';
import { getQueryFromUrl, searchEntries } from '../lib/searchConfig';

export default function SearchPage() {
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<SearchEntry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const urlQuery = getQueryFromUrl();
        if (urlQuery) {
            setQuery(urlQuery);
        }

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

    const articles = results.filter((item) => item.type === 'article');
    const pages = results.filter((item) => item.type === 'page');

    const updateUrl = (value: string) => {
        const url = new URL(window.location.href);
        if (value.trim()) {
            url.searchParams.set('q', value.trim());
        } else {
            url.searchParams.delete('q');
        }
        window.history.replaceState({}, '', url.toString());
    };

    return (
        <section className="py-16 lg:py-24 bg-gold-900 min-h-[70vh]">
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="text-center mb-12">
                    <h1 className="text-4xl lg:text-5xl font-extrabold text-primary-50 uppercase tracking-tight mb-4">
                        Search
                    </h1>
                    {query.trim().length >= 2 && !loading && (
                        <p className="text-stone-400 max-w-2xl mx-auto">
                            {results.length > 0
                                ? `${results.length} result${results.length === 1 ? '' : 's'} for "${query.trim()}"`
                                : `No results for "${query.trim()}"`}
                        </p>
                    )}
                </div>

                <div className="relative mb-12">
                    <input
                        type="search"
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            updateUrl(e.target.value);
                        }}
                        placeholder="Search..."
                        className="w-full bg-brand-900/78 border border-primary-400/20 rounded-2xl py-4 px-5 pl-12 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400/40 transition-all placeholder:text-primary-600 text-primary-100"
                        autoFocus
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>

                {loading && <p className="text-center text-stone-500">Loading search index...</p>}

                {!loading && query.trim().length < 2 && (
                    <p className="text-center text-stone-500">Type at least 2 characters to search.</p>
                )}

                {!loading && query.trim().length >= 2 && results.length === 0 && (
                    <div className="text-center py-16 border border-dashed border-brand-700/60 rounded-2xl">
                        <p className="text-stone-300 font-bold mb-2">No results for "{query.trim()}"</p>
                        <p className="text-stone-500 text-sm">Try different keywords or browse articles from the homepage.</p>
                    </div>
                )}

                {!loading && articles.length > 0 && (
                    <div className="mb-12">
                        <h2 className="text-sm font-bold uppercase tracking-wider text-gold-400 mb-4">
                            Articles ({articles.length})
                        </h2>
                        <div className="space-y-3">
                            {articles.map((result) => (
                                <a
                                    key={result.url}
                                    href={result.url}
                                    className="block bg-brand-900/65 border border-primary-400/10 hover:border-gold-400/30 rounded-xl p-5 transition-all hover:bg-brand-900/72"
                                >
                                    {result.pillar && (
                                        <span className="inline-block px-2 py-0.5 bg-gold-500/20 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                                            {result.pillar}
                                        </span>
                                    )}
                                    <h3 className="text-lg font-bold text-primary-50">{result.title}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                )}

                {!loading && pages.length > 0 && (
                    <div>
                        <h2 className="text-sm font-bold uppercase tracking-wider text-primary-300 mb-4">
                            Pages ({pages.length})
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {pages.map((result) => (
                                <a
                                    key={result.url}
                                    href={result.url}
                                    className="block bg-brand-900/40 border border-primary-400/10 hover:border-primary-400/30 rounded-xl p-4 transition-all"
                                >
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-primary-400 block mb-1">
                                        {result.category}
                                    </span>
                                    <h3 className="text-base font-bold text-primary-50">{result.title}</h3>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}
