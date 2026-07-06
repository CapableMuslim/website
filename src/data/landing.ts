import { pillarsData } from './pillars';

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
        href: '/about',
        description: 'Faith as a living framework — worship, character, purpose, and responsibility in the modern world.',
        icon: 'compass',
    },
    {
        name: 'Health',
        slug: 'health',
        href: '/pillars/health',
        description: 'Nutrition, sleep, longevity, and the physical foundations of a capable life.',
        icon: 'heart-pulse',
    },
    {
        name: 'Mindset',
        slug: 'mindset',
        href: '/pillars/mindset',
        description: 'Identity, discipline, stoicism, and the mental architecture of lasting growth.',
        icon: 'brain',
    },
    {
        name: 'Social',
        slug: 'social',
        href: '/pillars/social',
        description: 'Friendship, family, communication, and building meaningful relationships.',
        icon: 'users',
    },
    {
        name: 'Fitness',
        slug: 'fitness',
        href: '/pillars/fitness',
        description: 'Strength, endurance, martial arts, and the body as an instrument of capability.',
        icon: 'dumbbell',
    },
    {
        name: 'Skills',
        slug: 'skills',
        href: '/pillars/skills',
        description: 'Practical know-how, craftsmanship, and competence in the physical world.',
        icon: 'wrench',
    },
    {
        name: 'Style',
        slug: 'style',
        href: '/pillars/style',
        description: 'Presentation, grooming, and the quiet confidence of a well-considered appearance.',
        icon: 'shirt',
    },
    {
        name: 'Culture',
        slug: 'culture',
        href: '/pillars/culture',
        description: 'Reading, entertainment, hobbies, and curating a life of substance.',
        icon: 'book-open',
    },
    {
        name: 'Technology',
        slug: 'technology',
        href: '/pillars/technology',
        description: 'AI, tools, devices, and using technology with intention rather than distraction.',
        icon: 'cpu',
    },
    {
        name: 'Finance',
        slug: 'finance',
        href: '/pillars/finance',
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
    { label: 'Articles', href: '/posts', dropdown: 'articles' },
    { label: 'Bookshelf', href: '/bookshelf' },
    { label: 'Newsletter', href: '/newsletter' },
    { label: 'Community', href: '/community' },
    { label: 'Contact', href: '/contact' },
];

export const supportMissionLink = {
    label: 'Support the Mission',
    href: '/contact',
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
        href: `/pillars/${pillar.slug}`,
        subpillars: pillar.subpillars.map((sub) => ({
            label: sub
                .toLowerCase()
                .split(' ')
                .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                .join(' '),
            href: `/pillars/${pillar.slug}/${sub.toLowerCase().replace(/ /g, '-')}`,
        })),
    }));

export const footerCategories = landingPillars.map((p) => ({
    label: p.name,
    href: p.href,
}));

export const footerCompanyLinks = [
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy-policy' },
] as const;
