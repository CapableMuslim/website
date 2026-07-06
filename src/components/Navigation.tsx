import React, { useState, useRef } from 'react';
import { navLinks, articleCategories } from '../data/landing';
import type { ArticleCategory } from '../data/landing';

export default function Navigation() {
    const [articlesOpen, setArticlesOpen] = useState(false);
    const [activeCategory, setActiveCategory] = useState<ArticleCategory | null>(null);
    const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const openDropdown = () => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setArticlesOpen(true);
    };

    const scheduleClose = () => {
        closeTimeout.current = setTimeout(() => {
            setArticlesOpen(false);
            setActiveCategory(null);
        }, 150);
    };

    const handleCategoryEnter = (category: ArticleCategory) => {
        if (closeTimeout.current) clearTimeout(closeTimeout.current);
        setActiveCategory(category);
    };

    return (
        <nav className="hidden lg:block" aria-label="Main navigation">
            <ul className="flex items-center gap-1">
                {navLinks.map((link) =>
                    link.dropdown === 'articles' ? (
                        <li
                            key={link.href}
                            className="relative"
                            onMouseEnter={openDropdown}
                            onMouseLeave={scheduleClose}
                        >
                            <a
                                href={link.href}
                                className="nav-link inline-flex items-center gap-1 rounded px-3 py-2"
                                aria-expanded={articlesOpen}
                                aria-haspopup="true"
                                onFocus={openDropdown}
                            >
                                {link.label}
                                <svg
                                    className={`h-3.5 w-3.5 transition-transform duration-200 ${articlesOpen ? 'rotate-180' : ''}`}
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                            </a>
                        </li>
                    ) : (
                        <li key={`${link.label}-${link.href}`}>
                            <a href={link.href} className="nav-link rounded px-3 py-2">
                                {link.label}
                            </a>
                        </li>
                    ),
                )}
            </ul>

            {articlesOpen && (
                <div
                    className="fixed inset-x-0 top-16 z-40 border-b border-gold/15 bg-bronze-800 shadow-elevated lg:top-[4.5rem]"
                    onMouseEnter={openDropdown}
                    onMouseLeave={scheduleClose}
                >
                    <div className="container-content py-5">
                        <div className="overflow-hidden rounded-lg border border-gold/15">
                            {/* Step 1: categories only — single centered row */}
                            <div className="bg-bronze-850/80 px-4 py-4">
                                <ul className="flex flex-wrap items-center justify-center gap-1">
                                    {articleCategories.map((category) => (
                                        <li key={category.href}>
                                            <a
                                                href={category.href}
                                                className={`inline-block rounded px-3 py-2 text-sm transition-colors ${
                                                    activeCategory?.href === category.href
                                                        ? 'bg-gold/15 font-semibold text-gold'
                                                        : 'text-parchment-300 hover:bg-gold/10 hover:text-parchment'
                                                }`}
                                                onMouseEnter={() => handleCategoryEnter(category)}
                                            >
                                                {category.name}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Step 2: subcategories — only after hovering a category */}
                            {activeCategory && (
                                <div
                                    className="border-t border-gold/10 bg-bronze-800/90 px-6 py-4"
                                    onMouseEnter={() => handleCategoryEnter(activeCategory)}
                                >
                                    <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                                        {activeCategory.subpillars.map((sub) => (
                                            <li key={sub.href}>
                                                <a
                                                    href={sub.href}
                                                    className="text-sm text-parchment-300 transition-colors hover:text-gold"
                                                >
                                                    {sub.label}
                                                </a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
