const POSTS_INDEX_PATH = '/content/posts/index.json';
const SITE_SETTINGS_PATH = '/content/site.json';

export async function getSiteSettings() {
  const response = await fetch(SITE_SETTINGS_PATH);
  if (!response.ok) throw new Error('Unable to load site settings');
  return response.json();
}

export async function getPosts() {
  const response = await fetch(POSTS_INDEX_PATH);
  if (!response.ok) throw new Error('Unable to load post index');
  const posts = await response.json();
  const now = Date.now();
  return posts
    .filter((post) => post.status === 'published' && new Date(post.publishDate).getTime() <= now)
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
}

export async function getPostBySlug(slug) {
  const response = await fetch(`/content/posts/${slug}.json`);
  if (!response.ok) return null;
  const post = await response.json();
  const isPublished = post.status === 'published' && new Date(post.publishDate).getTime() <= Date.now();
  return isPublished ? post : null;
}
