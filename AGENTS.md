# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Astro-based personal blog/website hosted at makeshift.computer. It uses:
- Astro 7.x with content collections for blog posts
- Tailwind CSS 4.x for styling
- TypeScript for type safety
- Markdown files for content in `src/content/posts/`

## Key Commands

```bash
# Development
pnpm run dev         # Start dev server at localhost:4321
pnpm run build       # Build to ./dist/
pnpm run preview     # Preview production build

# Code quality
pnpm run astro check # Run TypeScript type checking for Astro files
pnpm run eslint      # Lint TypeScript/Astro files
pnpm run prettier    # Format all code files

# Content creation
pnpm run poast       # Create new blog post (opens in vim)
pnpm run poast "Title Here" # Create post with specific title
```

## Architecture

### Content System
- Blog posts live in `src/content/posts/` as Markdown files
- Posts use frontmatter with `title` (optional), `publishedAt` (RFC-9557 format), and `excerptLimit` (optional)
- The `poast` script creates new posts with proper date formatting and opens them in vim
- Posts are sorted by `publishedAt` date using Temporal API

### Key Files
- `src/content.config.ts`: Defines the posts collection schema with Zod validation and custom loader with excerpt pre-rendering
- `src/util.ts`: Contains `getPosts()` which fetches and sorts all posts using Temporal
- `src/pages/index.astro`: Home page listing all posts with excerpts
- `src/pages/posts/[...slug].astro`: Individual post pages
- `scripts/poast.js`: Blog post creation script

### Routing
- `/` - Homepage with post excerpts
- `/posts/[slug]/` - Individual post pages (slug is the filename without date prefix and .md extension)

### Styling
- Tailwind CSS 4.x configured via Vite plugin
- Typography plugin for prose styling
- Dark mode support with `dark:` variants
- Custom fonts in `public/fonts/` (Manrope and Monaspace)

## Development Notes

- Path aliases configured: `src/*` maps to `./src/*`
- TypeScript strict mode enabled
- ESLint configured with Astro plugin (note: may have false positives with Astro component imports)
- Prettier configured with Astro, Tailwind, and import organization plugins
- Images for posts can be placed in subdirectories (e.g., `posts/2024-08-06-growth-is-just-upside-risk/assets/`)
- Use `pnpm run astro check` for TypeScript checking instead of ESLint for Astro files
- Post pages require `parsePost` utility to properly parse the `publishedAt` date with Temporal API
- **Always run `pnpm run astro check && pnpm run build` after making changes to ensure everything compiles and builds correctly**
