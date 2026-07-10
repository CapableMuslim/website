import fs from 'node:fs';

const xml = fs.readFileSync('Static Pages/rss.xml', 'utf8');

const checks = {
    rss20: /<rss version="2.0"/.test(xml),
    channel: /<channel>/.test(xml),
    channelTitle: /<title>The Capable Muslim<\/title>/.test(xml),
    channelLink: /<link>https:\/\/capablemuslim\.tech\/<\/link>/.test(xml),
    selfLink: /rel="self"/.test(xml),
    items: (xml.match(/<item>/g) ?? []).length,
    itemLinksAbsolute: (xml.match(/<link>https:\/\/capablemuslim\.tech\/posts\//g) ?? []).length,
    guidsAbsolute: (xml.match(/<guid isPermaLink="true">https:\/\/capablemuslim\.tech\//g) ?? []).length,
    pubDates: (xml.match(/<pubDate>/g) ?? []).length,
    relativeLinks: (xml.match(/<link>(?!https:\/\/)/g) ?? []).length,
};

const autodiscovery = fs.readFileSync('Static Pages/index.html', 'utf8');
checks.autodiscovery = autodiscovery.includes(
    'rel="alternate" type="application/rss+xml" title="The Capable Muslim RSS Feed" href="https://capablemuslim.tech/rss.xml"',
);

checks.pass =
    checks.rss20 &&
    checks.channel &&
    checks.selfLink &&
    checks.items === 10 &&
    checks.itemLinksAbsolute === 10 &&
    checks.guidsAbsolute === 10 &&
    checks.pubDates === 10 &&
    checks.relativeLinks === 0 &&
    checks.autodiscovery;

console.log(JSON.stringify(checks, null, 2));
process.exit(checks.pass ? 0 : 1);
