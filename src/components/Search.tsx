import { useState, useEffect, useRef, useMemo } from 'react';
import type { SearchEntry } from '../lib/searchConfig';
import { buildSearchPageUrl, searchEntries } from '../lib/searchConfig';

const POPUP_RESULT_LIMIT = 6;

type SearchProps = {
    variant?: 'default' | 'icon' | 'mobile';
};

export default function Search({ variant = 'default' }: SearchProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [expanded, setExpanded] = useState(false);
    const [query, setQuery] = useState('');
    const [index, setIndex] = useState<SearchEntry[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const isMobile = variant === 'mobile';
    const isIcon = variant === 'icon';

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
                if (isIcon) setExpanded(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isIcon]);

    useEffect(() => {
        if (expanded && inputRef.current) inputRef.current.focus();
    }, [expanded]);

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
            if (isIcon) setExpanded(false);
        }
    };

    const inputClasses = isMobile
        ? 'w-full rounded border border-gold/20 bg-bronze-900/80 py-3 px-4 pl-11 text-base text-parchment placeholder:text-parchment-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'
        : isIcon
          ? expanded
              ? 'w-52 rounded border border-gold/20 bg-bronze-900 py-2 px-3 pl-3 text-sm text-parchment placeholder:text-parchment-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold'
              : 'hidden'
          : 'w-full md:w-44 rounded border border-gold/20 bg-bronze-900/80 py-2 px-3 pl-9 text-sm text-parchment placeholder:text-parchment-400 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold';

    const dropdownClasses = isMobile
        ? 'absolute top-full left-0 right-0 mt-2 rounded-lg border border-gold/15 bg-bronze-900 shadow-elevated z-50 overflow-hidden text-left'
        : 'absolute top-full right-0 mt-2 w-[22rem] rounded-lg border border-gold/15 bg-bronze-900 shadow-elevated z-50 overflow-hidden text-left';

    return (
        <div className="relative text-parchment" ref={searchRef}>
            <div className={`relative flex items-center gap-1 ${isIcon ? 'justify-end' : ''}`}>
                {isIcon && (
                    <button
                        type="button"
                        onClick={() => setExpanded((prev) => !prev)}
                        className="flex h-10 w-10 items-center justify-center rounded text-parchment-300 transition-colors hover:bg-gold/10 hover:text-parchment"
                        aria-label="Search"
                        aria-expanded={expanded}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </button>
                )}
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="Search..."
                    className={inputClasses}
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => {
                        if (query.trim().length >= 2) setIsOpen(true);
                    }}
                    onKeyDown={handleKeyDown}
                />
                {!isIcon && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                            isMobile
                                ? 'pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-parchment-400'
                                : 'pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-parchment-400'
                        }
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                )}
            </div>

            {showDropdown && results.length > 0 && (
                <div className={dropdownClasses}>
                    <div className="border-b border-gold/10 px-4 py-3">
                        <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-gold">
                            Articles
                        </h3>
                    </div>

                    <ul className="divide-y divide-gold/10">
                        {popupResults.map((result) => (
                            <li key={result.url}>
                                <a
                                    href={result.url}
                                    className="block px-4 py-3 transition-colors hover:bg-gold/5"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {result.pillar && (
                                        <div className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
                                            {result.pillar}
                                        </div>
                                    )}
                                    <div className="text-sm font-medium leading-snug text-parchment">
                                        {result.title}
                                    </div>
                                </a>
                            </li>
                        ))}
                    </ul>

                    <div className="border-t border-gold/10 p-2">
                        <button
                            type="button"
                            onClick={goToSearchPage}
                            className="w-full rounded px-4 py-2.5 text-left text-sm font-semibold text-gold transition-colors hover:bg-gold/5"
                        >
                            View all results
                        </button>
                    </div>
                </div>
            )}

            {showDropdown && results.length === 0 && (
                <div className={dropdownClasses}>
                    <div className="px-4 py-4 text-center">
                        <p className="mb-3 text-sm text-parchment-400">No articles found.</p>
                        <button
                            type="button"
                            onClick={goToSearchPage}
                            className="text-sm font-semibold text-gold transition-colors hover:text-gold-300"
                        >
                            Search all articles
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
