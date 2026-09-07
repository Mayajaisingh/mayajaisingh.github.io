import { initTheme, initYear, safeHtml } from '/src/scripts/common.js';
import { getPosts } from '/src/scripts/content.js';
import { renderPostCard } from '/src/scripts/render.js';

async function init() {
  initTheme();
  initYear();

  const tag = new URL(window.location.href).searchParams.get('tag');
  if (!tag) {
    window.location.replace('/blog/');
    return;
  }

  const posts = await getPosts();
  const filtered = posts.filter((post) => (post.tags || []).some((item) => item.toLowerCase() === tag.toLowerCase()));

  document.getElementById('tag-title').innerHTML = `Posts tagged “${safeHtml(tag)}”`;
  document.getElementById('tag-posts').innerHTML = filtered.map(renderPostCard).join('');
}

init().catch((error) => {
  console.error(error);
});
