import { getCollection } from 'astro:content';

async function getSearchIndex() {


    const pages = [
        {
            title: 'Home',
            description: 'Ignite the Internal Fire Within You.',
            slug: '',
            category: 'General'
        },
        {
            title: 'Health',
            description: 'Sleep, nutrition, and training. Build a body that serves your mind.',
            slug: 'pillars',
            category: 'Pillar'
        },
        {
            title: 'Mindset',
            description: 'Discipline, focus, and clarity. Master the inner game of success.',
            slug: 'pillars',
            category: 'Pillar'
        },
        {
            title: 'Social',
            description: 'Communication, networking, and legacy. Forge unbreakable bonds.',
            slug: 'pillars',
            category: 'Pillar'
        },
        {
            title: 'Bookshelf',
            description: 'Curated knowledge for the modern seeker.',
            slug: 'bookshelf',
            category: 'Resources'
        },

        {
            title: 'About Us',
            description: 'Forged in Discipline. Our mission and values.',
            slug: 'about',
            category: 'Company'
        },
        {
            title: 'Contact',
            description: 'Get in Touch with our optimization experts.',
            slug: 'contact',
            category: 'Company'
        },
        {
            title: 'FAQ',
            description: 'Common Questions about The Inner Fire.',
            slug: 'faq',
            category: 'Company'
        }

    ];

    return pages;
}

export async function GET({ }) {
    const posts = await getSearchIndex();
    return new Response(JSON.stringify(posts), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
