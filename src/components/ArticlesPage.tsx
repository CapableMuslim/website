import { useMemo, useState } from 'react';
import type { PostCard } from '../lib/posts';
import { pillarsData } from '../data/pillars';

interface Props {
    posts: PostCard[];
}

function ArticleCardItem({ post }: { post: PostCard }) {
    const tag = post.subpillar || post.pillar;
    const href = `/posts/${post.slug}`;

    return (
        <a href={href} className="group block h-full">
            <article className="card h-full overflow-hidden p-0">
                <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                        src={post.image}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bronze-900/95 via-bronze-900/30 to-transparent" />
                    {tag && (
                        <span className="category-tag absolute bottom-3 left-4 rounded bg-bronze-950/70 px-2 py-1 backdrop-blur-sm">
                            {tag}
                        </span>
                    )}
                </div>
                <div className="p-5 sm:p-6">
                    <span className="reading-time mb-2 block">{post.readingTime} min read</span>
                    <h3 className="font-display text-lg leading-snug text-parchment transition-colors group-hover:text-gold sm:text-xl">
                        {post.title}
                    </h3>
                    {post.description && (
                        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-parchment-300">
                            {post.description}
                        </p>
                    )}
                </div>
            </article>
        </a>
    );
}

export default function ArticlesPage({ posts }: Props) {
    const [activeCategory, setActiveCategory] = useState<string>('all');

    const categories = useMemo(() => {
        const keysWithPosts = new Set(posts.map((p) => p.pillarKey));
        return pillarsData
            .filter((p) => p.slug !== 'bookshelf' && keysWithPosts.has(p.name))
            .map((p) => ({
                key: p.name,
                label: p.name.charAt(0) + p.name.slice(1).toLowerCase(),
                slug: p.slug,
            }));
    }, [posts]);

    const filteredPosts = useMemo(() => {
        if (activeCategory === 'all') return posts;
        return posts.filter((p) => p.pillarKey === activeCategory);
    }, [posts, activeCategory]);

    return (
        <>
            <div className="mb-10 flex flex-wrap gap-2">
                <button
                    type="button"
                    onClick={() => setActiveCategory('all')}
                    className={`rounded border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        activeCategory === 'all'
                            ? 'border-gold/50 bg-gold/10 text-gold'
                            : 'border-gold/20 bg-bronze-950/40 text-parchment-300 hover:border-gold/40 hover:text-gold'
                    }`}
                >
                    All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.key}
                        type="button"
                        onClick={() => setActiveCategory(cat.key)}
                        className={`rounded border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                            activeCategory === cat.key
                                ? 'border-gold/50 bg-gold/10 text-gold'
                                : 'border-gold/20 bg-bronze-950/40 text-parchment-300 hover:border-gold/40 hover:text-gold'
                        }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>

            {filteredPosts.length > 0 ? (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredPosts.map((post) => (
                        <ArticleCardItem key={post.slug} post={post} />
                    ))}
                </div>
            ) : (
                <div className="card py-16 text-center">
                    <h2 className="font-display text-xl text-parchment">No articles in this category</h2>
                    <p className="mt-2 text-sm text-parchment-400">Try another category or browse all articles.</p>
                </div>
            )}
        </>
    );
}
