# mayajaisingh.github.io

Personal website + blog for Maya Jaisingh, deployed to GitHub Pages.

## Local development

```bash
npm install
npm run content:index
npm run dev
```

## Build

```bash
npm run build
```

## Content model

- Site settings: `public/content/site.json`
- Posts: `public/content/posts/*.json`
- Generated posts index: `public/content/posts/index.json`

Only posts with:
- `status: "published"`
- `publishDate` in the past

are shown publicly.

## Sveltia CMS setup

CMS is mounted at `/admin/`.

### 1) GitHub backend auth

Set `public/admin/config.yml` backend values:
- `repo`: already set to this repository
- `base_url`: URL of your OAuth server for Decap/Sveltia GitHub auth
- `auth_endpoint`: auth path exposed by that OAuth server

Follow Sveltia GitHub backend setup docs:
https://sveltiacms.app/en/docs/backends/github

### 2) Enable workflow

- Keep `publish_mode: editorial_workflow` for draft/review/publish flow.
- Editors create and review posts in CMS without writing markdown manually.

## Rich post blocks supported

- Paragraphs
- Headings
- Quotes
- Images
- Galleries
- Code blocks
- YouTube embeds
- Tweet embeds

## GitHub Pages deployment

Deployment workflow: `.github/workflows/deploy.yml`

In repository settings:
1. Go to **Pages**
2. Set source to **GitHub Actions**
3. Ensure default branch is `main`
