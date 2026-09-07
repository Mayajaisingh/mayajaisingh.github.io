import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const rootDir = import.meta.dirname;

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
