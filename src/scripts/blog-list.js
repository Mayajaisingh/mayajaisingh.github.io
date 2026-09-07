import { initTheme, initYear } from '/src/scripts/common.js';
import { getPosts } from '/src/scripts/content.js';
import { renderPostCard } from '/src/scripts/render.js';

async function init() {
  initTheme();
  initYear();

  const posts = await getPosts();
  const list = document.getElementById('blog-list');
  const empty = document.getElementById('empty-state');
  const searchInput = document.getElementById('search-input');
  const tagList = document.getElementById('tag-list');

  const tags = [...new Set(posts.flatMap((post) => post.tags || []))].sort((a, b) => a.localeCompare(b));
  tagList.innerHTML = tags
    .map((tag) => `<li><a href="/blog/tags/?tag=${encodeURIComponent(tag)}">${tag}</a></li>`)
    .join('');

  const paint = (items) => {
    list.innerHTML = items.map(renderPostCard).join('');
    empty.classList.toggle('hidden', items.length > 0);
  };

  paint(posts);

  searchInput.addEventListener('input', () => {
    const needle = searchInput.value.toLowerCase().trim();
    if (!needle) {
      paint(posts);
      return;
    }

    const filtered = posts.filter((post) =>
      [post.title, post.excerpt, ...(post.tags || [])].join(' ').toLowerCase().includes(needle),
    );
    paint(filtered);
  });
}

init().catch((error) => {
  console.error(error);
});
