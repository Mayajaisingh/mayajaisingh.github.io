import { promises as fs } from 'node:fs';
import path from 'node:path';

const postsDir = path.resolve('public/content/posts');
const outputPath = path.resolve('public/content/posts/index.json');

const files = await fs.readdir(postsDir);
const posts = [];

for (const file of files) {
  if (!file.endsWith('.json') || file === 'index.json') continue;
  const fullPath = path.join(postsDir, file);
  const text = await fs.readFile(fullPath, 'utf8');
  const data = JSON.parse(text);
  posts.push({
    slug: data.slug,
    title: data.title,
    excerpt: data.excerpt || '',
    tags: data.tags || [],
    publishDate: data.publishDate,
    status: data.status || 'draft',
  });
}

posts.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
await fs.writeFile(outputPath, `${JSON.stringify(posts, null, 2)}\n`, 'utf8');
console.log(`Generated ${posts.length} post entries.`);
