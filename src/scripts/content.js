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
  const normalized = String(slug || '');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(normalized)) return null;

  const directResponse = await fetch(`/content/posts/${encodeURIComponent(normalized)}.json`);
  if (directResponse.ok) {
    const directPost = await directResponse.json();
    const isPublished = directPost.status === 'published' && new Date(directPost.publishDate).getTime() <= Date.now();
    return isPublished ? directPost : null;
  }

  const indexResponse = await fetch(POSTS_INDEX_PATH);
  if (!indexResponse.ok) return null;
  const posts = await indexResponse.json();
  const entry = posts.find((post) => post.slug === normalized);
  const fallbackId = entry?.id || entry?.slug;
  if (!fallbackId || fallbackId === normalized) return null;

  const fallbackResponse = await fetch(`/content/posts/${encodeURIComponent(fallbackId)}.json`);
  if (!fallbackResponse.ok) return null;
  const fallbackPost = await fallbackResponse.json();
  const isPublished = fallbackPost.status === 'published' && new Date(fallbackPost.publishDate).getTime() <= Date.now();
  return isPublished ? fallbackPost : null;
}
