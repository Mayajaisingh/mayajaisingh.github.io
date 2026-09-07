import { initTheme, initYear } from '/src/scripts/common.js';
import { getPosts, getSiteSettings } from '/src/scripts/content.js';
import { renderPostCard } from '/src/scripts/render.js';

async function init() {
  initTheme();
  initYear();

  const [settings, posts] = await Promise.all([getSiteSettings(), getPosts()]);
  document.title = settings.siteTitle || 'Maya Jaisingh';
  document.getElementById('site-tagline').textContent = settings.tagline || '';
  document.getElementById('about-text').textContent = settings.about || '';

  const latest = posts.slice(0, 5);
  document.getElementById('latest-list').innerHTML = latest.map(renderPostCard).join('');
}

init().catch((error) => {
  console.error(error);
});
