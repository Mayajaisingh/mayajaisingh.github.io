import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rootDir = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(rootDir, 'index.html'),
        blog: resolve(rootDir, 'blog/index.html'),
        post: resolve(rootDir, 'blog/post/index.html'),
        tags: resolve(rootDir, 'blog/tags/index.html'),
        notFound: resolve(rootDir, '404.html'),
        admin: resolve(rootDir, 'admin/index.html'),
      },
    },
  },
});
