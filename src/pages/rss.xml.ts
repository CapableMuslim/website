import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';
import { siteConfig } from '../data/site';
import { formatPillarLabel, sortPostsByDate } from '../lib/posts';
import { withBase } from '../lib/paths';

export async function GET(context: APIContext) {
    const posts = sortPostsByDate(await getCollection('posts'));
    const feedUrl = new URL(withBase('/rss.xml'), context.site);

    return rss({
        title: siteConfig.name,
        description: siteConfig.defaultDescription,
        site: context.site,
        xmlns: {
            atom: 'http://www.w3.org/2005/Atom',
        },
        customData: `<language>en-us</language><atom:link href="${feedUrl.href}" rel="self" type="application/rss+xml" />`,
        items: posts.map((post) => ({
            title: post.data.title,
            description: post.data.description ?? '',
            pubDate: post.data.pubDate ?? post.data.updatedDate,
            link: withBase(`/posts/${post.slug}`),
            categories: post.data.pillar ? [formatPillarLabel(post.data.pillar)] : undefined,
            enclosure: post.data.heroImage
                ? { url: post.data.heroImage, type: 'image/jpeg', length: 0 }
                : undefined,
        })),
    });
}
