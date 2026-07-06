import { siteConfig } from './site';

export type SocialPlatform = {
    id: string;
    name: string;
    description: string;
    href: string;
    cta: string;
};

export type CommunityPlatform = {
    id: string;
    name: string;
    description: string;
    href: string;
    cta: string;
};

const { social, communities } = siteConfig;

export const socialPlatforms: SocialPlatform[] = [
    {
        id: 'youtube',
        name: 'YouTube',
        description: 'Long-form educational videos and deep dives.',
        href: social.youtube,
        cta: 'Follow',
    },
    {
        id: 'instagram',
        name: 'Instagram',
        description: 'Daily visual insights and practical reminders.',
        href: social.instagram,
        cta: 'Follow',
    },
    {
        id: 'tiktok',
        name: 'TikTok',
        description: 'Quick practical lessons and short educational clips.',
        href: social.tiktok,
        cta: 'Follow',
    },
    {
        id: 'x',
        name: 'X',
        description: 'Thoughts, ideas, and daily reflections.',
        href: social.x,
        cta: 'Follow',
    },
    {
        id: 'threads',
        name: 'Threads',
        description: 'Short discussions and community conversations.',
        href: social.threads,
        cta: 'Follow',
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        description: 'Professional growth and career insights.',
        href: social.linkedin,
        cta: 'Follow',
    },
    {
        id: 'facebook',
        name: 'Facebook',
        description: 'Articles, updates, and announcements.',
        href: social.facebook,
        cta: 'Follow',
    },
    {
        id: 'pinterest',
        name: 'Pinterest',
        description: 'Infographics, visual guides, and inspiration.',
        href: social.pinterest,
        cta: 'Follow',
    },
    {
        id: 'medium',
        name: 'Medium',
        description: 'Long-form essays and in-depth articles.',
        href: social.medium,
        cta: 'Follow',
    },
    {
        id: 'snapchat',
        name: 'Snapchat',
        description: 'Short behind-the-scenes updates and stories.',
        href: social.snapchat,
        cta: 'Follow',
    },
];

export const communityPlatforms: CommunityPlatform[] = [
    {
        id: 'discord',
        name: 'Discord',
        description: 'Daily discussions, accountability and community events.',
        href: communities.discord,
        cta: 'Join',
    },
    {
        id: 'telegram',
        name: 'Telegram',
        description: 'Receive new articles, videos, and important announcements.',
        href: communities.telegram,
        cta: 'Join',
    },
    {
        id: 'reddit',
        name: 'Reddit',
        description: 'Long-form discussions, questions, and shared experiences.',
        href: communities.reddit,
        cta: 'Join',
    },
    {
        id: 'whatsapp',
        name: 'WhatsApp',
        description: 'Small accountability groups and local community conversations.',
        href: communities.whatsapp,
        cta: 'Join',
    },
];

/** All platforms for footer Connect section (social + community, in display order) */
export const connectPlatforms = [...socialPlatforms, ...communityPlatforms].map(
    ({ id, name, href }) => ({ id, name, href }),
);

/** Placeholder until a live member count is available */
export const communityMemberCount = '10K+';
