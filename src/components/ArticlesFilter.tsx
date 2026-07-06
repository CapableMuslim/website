import { useEffect, useState } from 'react';

type Category = {
    key: string;
    label: string;
};

interface Props {
    categories: Category[];
}

export default function ArticlesFilter({ categories }: Props) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [visibleCount, setVisibleCount] = useState<number | null>(null);

    useEffect(() => {
        const items = document.querySelectorAll<HTMLElement>('[data-article-pillar]');
        let count = 0;

        items.forEach((item) => {
            const pillar = item.getAttribute('data-article-pillar');
            const show = activeCategory === 'all' || pillar === activeCategory;
            item.hidden = !show;
            if (show) count += 1;
        });

        setVisibleCount(count);
    }, [activeCategory]);

    const buttonClass = (active: boolean) =>
        `rounded border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
            active
                ? 'border-gold/50 bg-gold/10 text-gold'
                : 'border-gold/20 bg-bronze-950/40 text-parchment-300 hover:border-gold/40 hover:text-gold'
        }`;

    return (
        <>
            <div className="mb-10 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={buttonClass(activeCategory === 'all')}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        type="button"
                        onClick={() => setActiveCategory(cat.key)}
                        className={buttonClass(activeCategory === cat.key)}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {visibleCount === 0 && (
                <div className="card py-16 text-center">
                    <h2 className="font-display text-xl text-parchment">No articles in this category</h2>
                    <p className="mt-2 text-sm text-parchment-400">
                        Try another category or browse all articles.
                    </p>
                </div>
            )}
        </>
    );
}
