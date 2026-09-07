import { formatDate, initTheme, initYear, safeHtml } from '/src/scripts/common.js';
import { getPostBySlug } from '/src/scripts/content.js';
import { renderBlocks } from '/src/scripts/render.js';

async function init() {
  initTheme();
  initYear();

  const slug = new URL(window.location.href).searchParams.get('slug');
  if (!slug) {
    window.location.replace('/404.html');
    return;
  }

  const post = await getPostBySlug(slug);
  if (!post) {
    window.location.replace('/404.html');
    return;
  }

  document.title = `${post.title} · Maya Jaisingh`;
  document.getElementById('post-date').textContent = formatDate(post.publishDate);
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-excerpt').textContent = post.excerpt || '';
  document.getElementById('post-content').innerHTML = renderBlocks(post.blocks || []);
  document.getElementById('post-tags').innerHTML = (post.tags || [])
    .map((tag) => `<li><a href="/blog/tags/?tag=${encodeURIComponent(tag)}">${safeHtml(tag)}</a></li>`)
    .join('');
}

init().catch((error) => {
  console.error(error);
  window.location.replace('/404.html');
});
