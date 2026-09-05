# makeshift.computer

Personal blog built with Astro and deployed to GitHub Pages.

Live site: https://makeshift.computer/

## Stack
- Astro 7
- TypeScript
- Tailwind CSS 4
- Markdown content collections

## Local development
```bash
pnpm install
pnpm run dev
```

## Build and checks
```bash
pnpm run astro check
pnpm run build
```

## Content
- Posts live in `src/content/posts/`.
- Create a new post:
```bash
pnpm run poast
# or
pnpm run poast "Post Title"
```

## Useful scripts
- `pnpm run dev` - start local dev server
- `pnpm run build` - build production output to `dist/`
- `pnpm run preview` - preview the production build
- `pnpm run astro check` - Astro + TypeScript checks
- `pnpm run eslint` - lint project files
- `pnpm run prettier` - format project files

## Docs
- Newsletter automation plan: [docs/newsletter-buttondown-plan.md](docs/newsletter-buttondown-plan.md)
