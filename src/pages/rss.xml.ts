import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { toAbsolute } from '../lib/urls';

export async function GET(context) {
  const posts = await getCollection('blog');
  return rss({
    title: 'OpenClaw Blog Live Example',
    description: 'Astro + GitHub Pages demo with RSS feed',
    site: toAbsolute('', context.site),
    items: posts.map((post) => {
      const slug = post.id.replace(/\.md$/, '');
      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        link: toAbsolute(`posts/${slug}/`, context.site)
      };
    })
  });
}
