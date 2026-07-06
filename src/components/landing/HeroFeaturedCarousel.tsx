import { useEffect, useState } from 'react';

export type HeroCarouselItem = {
    slug: string;
    title: string;
    description: string;
    pillar: string;
    subpillar?: string;
    image: string;
    readingTime: number;
    href: string;
};

type Props = {
    items: HeroCarouselItem[];
};

const AUTO_ADVANCE_MS = 5000;

export default function HeroFeaturedCarousel({ items }: Props) {
    const [active, setActive] = useState(0);
    const count = items.length;

    const goPrev = () => {
        setActive((current) => (current - 1 + count) % count);
    };

    const goNext = () => {
        setActive((current) => (current + 1) % count);
    };

    useEffect(() => {
        if (count <= 1) return;

        const timer = window.setInterval(() => {
            setActive((current) => (current + 1) % count);
        }, AUTO_ADVANCE_MS);

        return () => window.clearInterval(timer);
    }, [count]);

    if (count === 0) return null;

    return (
        <div className="hero-carousel flex h-full flex-col">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
                Featured Articles
            </p>

            <div className="hero-carousel__viewport relative mt-4 min-h-0 flex-1 overflow-hidden">
                {count > 1 && (
                    <>
                        <button
                            type="button"
                            className="hero-carousel__arrow hero-carousel__arrow--prev"
                            aria-label="Previous featured article"
                            onClick={goPrev}
                        >
                            <svg
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <button
                            type="button"
                            className="hero-carousel__arrow hero-carousel__arrow--next"
                            aria-label="Next featured article"
                            onClick={goNext}
                        >
                            <svg
                                className="h-3 w-3"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                aria-hidden="true"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </>
                )}

                <div
                    className="hero-carousel__track flex h-full transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${active * 100}%)` }}
                >
                    {items.map((post) => {
                        const tag = post.subpillar || post.pillar;

                        return (
                            <a
                                key={post.slug}
                                href={post.href}
                                className="hero-carousel__slide group block h-full w-full shrink-0"
                            >
                                <article className="hero-carousel__card flex h-full flex-col overflow-hidden rounded-lg border border-gold/15 bg-bronze-900/50">
                                    <div className="relative aspect-[16/10] shrink-0 overflow-hidden">
                                        <img
                                            src={post.image}
                                            alt=""
                                            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                                            loading="lazy"
                                        />
                                        <div
                                            className="absolute inset-0 bg-gradient-to-t from-bronze-950/90 via-bronze-950/20 to-transparent"
                                            aria-hidden="true"
                                        />
                                        {tag && (
                                            <span className="category-tag absolute bottom-3 left-3 rounded bg-bronze-950/70 px-2 py-1 backdrop-blur-sm">
                                                {tag}
                                            </span>
                                        )}
                                    </div>
                                    <div className="flex flex-1 flex-col p-4">
                                        <span className="reading-time mb-2 block">
                                            {post.readingTime} min read
                                        </span>
                                        <h3 className="font-display text-lg font-bold leading-snug text-parchment transition-colors group-hover:text-gold line-clamp-2">
                                            {post.title}
                                        </h3>
                                        {post.description && (
                                            <p className="mt-2 text-sm leading-relaxed text-parchment-300 line-clamp-2">
                                                {post.description}
                                            </p>
                                        )}
                                    </div>
                                </article>
                            </a>
                        );
                    })}
                </div>
            </div>

            {count > 1 && (
                <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Featured articles">
                    {items.map((post, index) => (
                        <button
                            key={post.slug}
                            type="button"
                            role="tab"
                            aria-selected={index === active}
                            aria-label={`Show article ${index + 1}: ${post.title}`}
                            className={`hero-carousel__dot h-2 w-2 rounded-full transition-colors ${
                                index === active ? 'bg-gold' : 'bg-gold/25 hover:bg-gold/50'
                            }`}
                            onClick={() => setActive(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
