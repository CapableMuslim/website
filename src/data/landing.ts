import { pillarsData } from './pillars';
import { withBase } from '../lib/paths';

const p = (path: string) => withBase(path);

export type LandingPillar = {
    name: string;
    slug: string;
    href: string;
    description: string;
    icon: string;
};

export const landingPillars: LandingPillar[] = [
    {
        name: 'Deen',
        slug: 'deen',
        href: p('/about'),
        description: 'Faith as a living framework — worship, character, purpose, and responsibility in the modern world.',
        icon: 'compass',
    },
    {
        name: 'Health',
        slug: 'health',
        href: p('/pillars/health'),
        description: 'Nutrition, sleep, longevity, and the physical foundations of a capable life.',
        icon: 'heart-pulse',
    },
    {
        name: 'Mindset',
        slug: 'mindset',
        href: p('/pillars/mindset'),
        description: 'Identity, discipline, stoicism, and the mental architecture of lasting growth.',
        icon: 'brain',
    },
    {
        name: 'Social',
        slug: 'social',
        href: p('/pillars/social'),
        description: 'Friendship, family, communication, and building meaningful relationships.',
        icon: 'users',
    },
    {
        name: 'Fitness',
        slug: 'fitness',
        href: p('/pillars/fitness'),
        description: 'Strength, endurance, martial arts, and the body as an instrument of capability.',
        icon: 'dumbbell',
    },
    {
        name: 'Skills',
        slug: 'skills',
        href: p('/pillars/skills'),
        description: 'Practical know-how, craftsmanship, and competence in the physical world.',
        icon: 'wrench',
    },
    {
        name: 'Style',
        slug: 'style',
        href: p('/pillars/style'),
        description: 'Presentation, grooming, and the quiet confidence of a well-considered appearance.',
        icon: 'shirt',
    },
    {
        name: 'Culture',
        slug: 'culture',
        href: p('/pillars/culture'),
        description: 'Reading, entertainment, hobbies, and curating a life of substance.',
        icon: 'book-open',
    },
    {
        name: 'Technology',
        slug: 'technology',
        href: p('/pillars/technology'),
        description: 'AI, tools, devices, and using technology with intention rather than distraction.',
        icon: 'cpu',
    },
    {
        name: 'Finance',
        slug: 'finance',
        href: p('/pillars/finance'),
        description: 'Career, income, investing, and building long-term financial capability.',
        icon: 'landmark',
    },
];

/** Slugs to feature on the homepage — falls back to latest posts if unavailable */
export const featuredSlugs = [
    'forging-unbreakable-identity',
    'nutrition-fundamentals',
    'strength-training-essentials',
    'building-wealth-financial-foundations',
    'essential-books-every-man-should-read',
    'leveraging-ai-technology-for-peak-performance',
];

export type NavLink = {
    label: string;
    href: string;
    /** When present, the desktop nav renders a dropdown of pillars/subpillars */
    dropdown?: 'articles';
};

export const navLinks: NavLink[] = [
    { label: 'Articles', href: p('/posts'), dropdown: 'articles' },
    { label: 'Bookshelf', href: p('/bookshelf') },
    { label: 'Newsletter', href: p('/newsletter') },
    { label: 'Community', href: p('/community') },
    { label: 'Contact', href: p('/contact') },
];

export const supportMissionLink = {
    label: 'Support the Mission',
    href: p('/contact'),
} as const;

export type ArticleCategory = {
    name: string;
    href: string;
    subpillars: { label: string; href: string }[];
};

/** Pillars + subpillars for the Articles dropdown, sourced from pillarsData */
export const articleCategories: ArticleCategory[] = pillarsData
    .filter((p) => p.slug !== 'bookshelf')
    .map((pillar) => ({
        name: pillar.name.charAt(0) + pillar.name.slice(1).toLowerCase(),
        href: p(`/pillars/${pillar.slug}`),
        subpillars: pillar.subpillars.map((sub) => ({
            label: sub
                .toLowerCase()
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' '),
            href: p(`/pillars/${pillar.slug}/${sub.toLowerCase().replace(/ /g, '-')}`),
        })),
    }));

export const footerCategories = landingPillars.map((p) => ({
    label: p.name,
    href: p.href,
}));

export const footerCompanyLinks = [
    { label: 'About', href: p('/about') },
    { label: 'FAQ', href: p('/faq') },
    { label: 'Contact', href: p('/contact') },
    { label: 'Privacy Policy', href: p('/privacy-policy') },
] as const;
