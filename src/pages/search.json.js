import { buildArticleSearchIndex } from '../lib/searchIndex';

export async function GET() {
    const articles = await buildArticleSearchIndex();

    return new Response(JSON.stringify(articles), {
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
