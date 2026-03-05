# makeshift.computer

Personal blog built with Astro and deployed to GitHub Pages.

Live site: https://makeshift.computer/

## Stack
- Astro 5
- TypeScript
- Tailwind CSS 4
- Markdown content collections

## Local development
```bash
npm install
npm run dev
```

## Build and checks
```bash
npm run astro check
npm run build
```

## Content
- Posts live in `src/content/posts/`.
- Create a new post:
```bash
npm run poast
# or
npm run poast "Post Title"
```

## Useful scripts
- `npm run dev` - start local dev server
- `npm run build` - build production output to `dist/`
- `npm run preview` - preview the production build
- `npm run astro check` - Astro + TypeScript checks
- `npm run eslint` - lint project files
- `npm run prettier` - format project files

## Docs
- Newsletter automation plan: [docs/newsletter-buttondown-plan.md](docs/newsletter-buttondown-plan.md)
