import { useState, useEffect, useRef } from 'react';
import Fuse from 'fuse.js';

export default function Search() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [index, setIndex] = useState<any[]>([]);
    const searchRef = useRef<HTMLDivElement>(null);

    useEffect(() => {

        fetch('/search.json')
            .then(res => res.json())
            .then(data => setIndex(data))
            .catch(err => console.error("Failed to load search index", err));
    }, []);

    useEffect(() => {
        if (query.length > 1 && index.length > 0) {
            const fuse = new Fuse(index, {
                keys: ['title', 'description', 'category'],
                threshold: 0.4,
                includeScore: true
            });
            const searchResults = fuse.search(query);
            setResults(searchResults.map(result => result.item));
            setIsOpen(true);
        } else {
            setResults([]);
            setIsOpen(false);
        }
    }, [query, index]);


    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative text-white" ref={searchRef}>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full md:w-48 bg-white/10 border border-white/10 rounded-full py-1.5 px-3 pl-9 text-sm focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all placeholder:text-slate-400"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => { if (query.length > 1) setIsOpen(true); }}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute left-2.5 top-2 h-4 w-4 text-slate-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </div>

            {isOpen && results.length > 0 && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-[#0f0f11] border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden text-left">
                    <div className="py-2">
                        <h3 className="px-4 py-2 text-xs font-bold text-gray-500 uppercase tracking-wider">Results</h3>
                        {results.map((result: any, idx: number) => (
                            <a
                                key={idx}
                                href={`/${result.slug}`}
                                className="block px-4 py-3 hover:bg-white/5 transition-colors border-l-2 border-transparent hover:border-primary-500"
                            >
                                <div className="text-sm font-bold text-gray-200">{result.title}</div>
                                <div className="text-xs text-gray-400 line-clamp-1">{result.description}</div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {isOpen && results.length === 0 && query.length > 1 && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-[#0f0f11] border border-gray-800 rounded-xl shadow-2xl z-50 p-4 text-center">
                    <p className="text-sm text-gray-500">No results found.</p>
                </div>
            )}
        </div>
    );
}
