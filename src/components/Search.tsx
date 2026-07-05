import { useState, useEffect, useRef, useMemo } from 'react';
import type { SearchEntry } from '../lib/searchConfig';
import { buildSearchPageUrl, searchEntries } from '../lib/searchConfig';

const POPUP_RESULT_LIMIT = 6;

type SearchProps = {
    variant?: 'default' | 'mobile';
};

export default function Search({ variant = 'default' }: SearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<SearchEntry[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const isMobile = variant === 'mobile';

    useEffect(() => {
        fetch('/search.json')
            .then((res) => res.json())
            .then((data: SearchEntry[]) => setIndex(data))
            .catch((err) => console.error('Failed to load search index', err));
    }, []);

    const results = useMemo(() => {
        if (query.trim().length < 2) return [];
        return searchEntries(index, query);
    }, [index, query]);

    const popupResults = results.slice(0, POPUP_RESULT_LIMIT);
    const showDropdown = isOpen && query.trim().length >= 2;

    useEffect(() => {
        if (query.trim().length >= 2 && results.length > 0) {
            setIsOpen(true);
        } else if (query.trim().length < 2) {
            setIsOpen(false);
        }
    }, [query, results.length]);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const goToSearchPage = () => {
        if (query.trim().length < 2) return;
        window.location.href = buildSearchPageUrl(query);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            goToSearchPage();
        }
        if (event.key === 'Escape') {
            setIsOpen(false);
        }
    };

    return (
        <div className="relative text-white w-full" ref={searchRef}>
            <div className="relative">
                <input
                    type="search"
                    placeholder="Search articles..."
                    className={
                        isMobile
                            ? 'w-full bg-brand-900/78 border border-primary-400/20 rounded-2xl py-3 px-4 pl-11 text-base focus:outline-none focus:ring-2 focus:ring-gold-400/30 focus:border-gold-400/40 transition-all placeholder:text-primary-600 text-primary-100'
                            : 'w-full md:w-52 bg-white/10 border border-white/10 rounded-full py-1.5 px-3 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-400'
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim().length >= 2) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={
                        isMobile
                            ? 'absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary-400'
                            : 'absolute left-2.5 top-2 h-4 w-4 text-slate-400'
                    }
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {showDropdown && results.length > 0 && (
                <div
                    className={
                        isMobile
                            ? 'absolute top-full left-0 right-0 mt-2 bg-brand-900 border border-primary-400/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-left'
                            : 'absolute top-full right-0 mt-2 w-[22rem] bg-brand-900 border border-primary-400/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-left'
                    }
                >
                    <div className="px-4 py-3 border-b border-primary-400/10">
                        <h3 className="text-[10px] font-bold text-gold-400 uppercase tracking-wider">
                            Articles
                        </h3>
                    </div>

                    <ul className="divide-y divide-primary-400/10">
                        {popupResults.map((result) => (
                            <li key={result.url}>
                                <a
                                    href={result.url}
                                    className="block px-4 py-3 hover:bg-white/5 transition-colors"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                                        {result.pillar && (
                                            <span className="inline-block px-2 py-0.5 bg-gold-500/15 text-gold-300 text-[10px] font-bold uppercase tracking-wider rounded">
                                                {result.pillar}
                                            </span>
                                        )}
                                        {result.subpillar && (
                                            <span className="inline-block px-2 py-0.5 bg-primary-400/10 text-primary-300 text-[10px] font-bold uppercase tracking-wider rounded">
                                                {result.subpillar}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm font-bold text-primary-50 leading-snug">
                                        {result.title}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-primary-400/10 p-2">
                        <button
                            type="button"
                            onClick={goToSearchPage}
                            className="w-full px-4 py-2.5 text-left text-sm font-bold text-gold-300 hover:bg-white/5 rounded-lg transition-colors"
                        >
                            View all results
                        </button>
                    </div>
                </div>
            )}

            {showDropdown && results.length === 0 && (
                <div
                    className={
                        isMobile
                            ? 'absolute top-full left-0 right-0 mt-2 bg-brand-900 border border-primary-400/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-left'
                            : 'absolute top-full right-0 mt-2 w-[22rem] bg-brand-900 border border-primary-400/15 rounded-2xl shadow-2xl z-50 overflow-hidden text-left'
                    }
                >
                    <div className="px-4 py-4 text-center">
                        <p className="text-sm text-primary-400 mb-3">No articles found.</p>
                        <button
                            type="button"
                            onClick={goToSearchPage}
                            className="text-sm font-bold text-gold-300 hover:text-gold-200 transition-colors"
                        >
                            Search all articles
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
