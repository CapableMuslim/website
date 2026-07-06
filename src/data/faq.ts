export type FaqItem = {
    q: string;
    a: string;
};

export const faqItems: FaqItem[] = [
    {
        q: 'What is The Capable Muslim?',
        a: 'A practical knowledge platform for Muslim men who want to become healthier, stronger, wiser, and more capable — with faith at the center and discipline in daily life.',
    },
    {
        q: 'Who is this platform for?',
        a: 'Young Muslim men who care about long-term growth: health, deen, discipline, relationships, skills, and responsibility — not quick fixes or performative motivation.',
    },
    {
        q: 'Do you accept guest articles or submissions?',
        a: 'No. Content is curated and produced internally to keep quality, clarity, and consistency across every pillar and topic.',
    },
    {
        q: 'Can I ask for personal life advice?',
        a: 'We do not provide individualized coaching through public channels. Our articles and frameworks are designed to be applied on your own. For specific matters, consult qualified professionals.',
    },
    {
        q: 'Is this motivational content?',
        a: 'No. Motivation fades. We focus on systems, habits, and practical frameworks you can apply whether you feel inspired or not.',
    },
    {
        q: 'What topics do you cover?',
        a: 'Ten domains: Deen, Health, Mindset, Social, Fitness, Skills, Style, Culture, Technology, and Finance — treated as one integrated life, not separate pursuits.',
    },
    {
        q: 'How does faith fit into your content?',
        a: 'Islam is the framework, not an add-on. We connect worship, character, and responsibility with practical decisions in health, work, relationships, and daily discipline.',
    },
    {
        q: 'Is the content only for men?',
        a: 'Our primary audience is Muslim men, because the challenges, framing, and examples are written for that experience. Much of the practical guidance may still be useful to others.',
    },
    {
        q: 'Do you offer courses, coaching, or mentorship?',
        a: 'Core articles and the newsletter are free. We may offer deeper programs or community access in the future — anything paid will be clearly stated.',
    },
    {
        q: 'Can I promote my product or brand here?',
        a: 'Generally, no. We protect our readers\' attention. We only share tools or resources we have personally vetted and believe genuinely help our audience.',
    },
    {
        q: 'What makes this different from blogs or YouTube channels?',
        a: 'Most content is built to be consumed. Ours is built to be used — read the framework, apply it, and return to your life. We optimize for action, not time on site.',
    },
    {
        q: 'Is the content beginner-friendly?',
        a: 'Yes, with a high standard. We explain clearly without watering things down. Start with fundamentals in any pillar and build from there over months, not days.',
    },
    {
        q: 'How often is new content published?',
        a: 'We publish articles across pillars on an ongoing basis and send one newsletter each week with a single idea worth applying.',
    },
    {
        q: 'Is the newsletter free?',
        a: 'Yes. Subscribe with your email, read at your pace, and unsubscribe anytime with one click.',
    },
    {
        q: 'How do I unsubscribe from the newsletter?',
        a: 'Every email includes an unsubscribe link. You can also contact us at capablemuslim@gmail.com and we will remove you promptly.',
    },
    {
        q: 'Is there a community aspect?',
        a: 'Yes. Community is part of the long-term vision — connecting with others who share the same standards and direction. Follow our social channels for updates.',
    },
    {
        q: 'Do you provide medical, legal, or financial advice?',
        a: 'No. Our content is educational and practical, not professional advice. Always consult qualified doctors, scholars, lawyers, or financial advisors for your specific situation.',
    },
    {
        q: 'Who is this platform not for?',
        a: 'Those looking for shortcuts, outrage, or content that asks nothing of them. We write for readers willing to take responsibility and do the work over time.',
    },
    {
        q: 'What should I do before contacting support?',
        a: 'Search the site, browse the FAQ, and read the relevant article first. If your question is already answered, we may not respond individually.',
    },
    {
        q: 'What is your core promise to readers?',
        a: 'Your time will not be wasted. Every article and newsletter should clarify something, simplify a decision, or move you one step toward a more capable life.',
    },
];

/** Top 10 questions shown on the homepage FAQ section */
export const featuredFaqIndices = [0, 1, 4, 5, 6, 10, 12, 16, 18, 19] as const;

export function getFeaturedFaqItems(): FaqItem[] {
    return featuredFaqIndices.map((index) => faqItems[index]);
}
