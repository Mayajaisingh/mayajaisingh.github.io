import { formatDate, safeHtml } from '/src/scripts/common.js';

export function renderPostCard(post) {
  const tags = (post.tags || [])
    .map((tag) => `<a class="tag-pill" href="/blog/tags/?tag=${encodeURIComponent(tag)}">${safeHtml(tag)}</a>`)
    .join('');

  return `
    <li>
      <time datetime="${safeHtml(post.publishDate)}">${formatDate(post.publishDate)}</time>
      <h3><a href="/blog/post/?slug=${encodeURIComponent(post.slug)}">${safeHtml(post.title)}</a></h3>
      <p>${safeHtml(post.excerpt || '')}</p>
      <div class="tags-list">${tags}</div>
    </li>
  `;
}

export function renderBlocks(blocks = []) {
  return blocks
    .map((block) => {
      if (block.type === 'paragraph') return `<p>${safeHtml(block.text)}</p>`;
      if (block.type === 'heading') return `<h2>${safeHtml(block.text)}</h2>`;
      if (block.type === 'quote') return `<blockquote><p>${safeHtml(block.text)}</p></blockquote>`;
      if (block.type === 'image') return `<figure><img src="${safeHtml(block.src)}" alt="${safeHtml(block.alt || '')}" /></figure>`;
      if (block.type === 'gallery') {
        const images = (block.images || [])
          .map((image) => `<img src="${safeHtml(image.src)}" alt="${safeHtml(image.alt || '')}" />`)
          .join('');
        return `<div class="gallery">${images}</div>`;
      }
      if (block.type === 'code') {
        return `<pre><code>${safeHtml(block.code || '')}</code></pre>`;
      }
      if (block.type === 'embed') {
        if (block.provider === 'youtube') {
          const src = `https://www.youtube.com/embed/${encodeURIComponent(block.id || '')}`;
          return `<iframe class="embed-frame" src="${src}" title="YouTube embed" loading="lazy" allowfullscreen></iframe>`;
        }
        if (block.provider === 'tweet') {
          const url = `https://twitframe.com/show?url=${encodeURIComponent(block.url || '')}`;
          return `<iframe class="embed-frame" src="${url}" title="Tweet embed" loading="lazy"></iframe>`;
        }
      }
      return '';
    })
    .join('');
}
