# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## CRITICAL GUIDELINES

### NEVER CREATE BLOG POSTS WITHOUT CONSENT

- **NEVER CREATE BLOG POSTS WITHOUT EXPLICIT CONSENT** from steipete
- Do not write or propose new blog content unless specifically requested
- Only help with editing or fixing existing posts when asked

### NEVER MERGE PULL REQUESTS

- **NEVER MERGE PULL REQUESTS** - Even if explicitly asked to do so
- Only the repository owner (steipete) should merge PRs through the GitHub web UI
- Create PRs as requested, but do not use `gh pr merge` or similar commands
- Always provide the PR URL so that steipete can review and merge manually

### USE GSED INSTEAD OF SED

- **ALWAYS USE `gsed` INSTEAD OF `sed`** - For better compatibility across platforms
- `gsed` provides GNU sed features that are more consistent across Linux and macOS
- If editing files with sed-like operations, use `gsed` to ensure reliable results

### ALWAYS USE LATEST DEPENDENCIES

- **NEVER DOWNGRADE DEPENDENCIES** - Always use the latest stable versions
- **ALWAYS USE TOOLING TO CHECK VERSIONS** - Never guess or assume versions
- Run `npm outdated` to see what packages need updating
- Run `npm view [package] version` to check the latest published version
- When fixing dependency issues, always upgrade to the latest compatible versions
- Prioritize staying current with the ecosystem, even if it requires more work to adapt

### IMPORTANT: Development Server Limitation

- **DO NOT run `npm run dev`** in agent mode - this will create an endless loop and stop the agent from working properly
- Instead, use `npm run build` to verify your changes

## Development Process

### Testing Changes

To properly test changes, use these commands:

```bash
# Build the project (this is preferred over npm run dev in agent mode)
npm run build

# If you need to preview the build (only do when specifically requested)
npm run preview
```

### Project Structure

- `/src/content/blog/` - Contains all blog posts in markdown format
- `/src/pages/` - Contains page templates and routing
- `/src/components/` - Reusable UI components
- `/src/layouts/` - Page layouts and templates
- `/src/styles/` - CSS styles including Tailwind customizations

### Common Tasks

1. **Adding a new blog post**:

   - Create a new markdown file in `/src/content/blog/`
   - Include proper frontmatter (title, description, pubDate, etc.)
   - Format dates in ISO-8601 format: `YYYY-MM-DDTHH:MM:SS+HH:MM`
   - Format tags as arrays: `tags: ["tag1", "tag2"]`

2. **Modifying site configuration**:

   - Edit `/src/consts.ts` for global site constants

3. **Styling changes**:

   - Edit files in `/src/styles/` for global styling
   - Use Tailwind classes in component templates for component-specific styling

4. **Layout changes**:

   - Modify the appropriate layout files in `/src/layouts/`

5. **Fixing broken images**:

   - Blog posts reference images in the `/public/assets/img/` directory structure
   - The original files can be found in `/temp-repos/steipete.com/assets/img/`
   - Images must be copied to the matching public directory structure
   - Fixed images should be committed to the repository
   - Use `find` command to locate the original images
   - Common image paths follow the pattern: `/assets/img/YEAR/POST-NAME/IMAGE.jpg`

6. **Dependency Updates**:
   - Always use proper tooling to check for latest versions:

     ```bash
     # Check all outdated dependencies
     npm outdated

     # Check latest version of a specific package
     npm view astro version
     npm view react version

     # Update all dependencies to latest
     npm update --latest
     ```

   - Test thoroughly after updating dependencies
   - If a build fails after updates, diagnose the specific issue and FIX it properly
   - NEVER resort to downgrading as a solution

## Tech Stack

- **Astro** (latest version) - Main framework
- **TailwindCSS** - For styling
- **React** - For interactive components (v18.2.0)
- **MDX** - For enhanced markdown support

## Common Development Commands

### Core Commands
- `npm run build:check` - Run Astro type checking, build, and Pagefind indexing
- `npm run sync` - Sync Astro types
- `npm run add-source-metadata` - Add source metadata to posts (scripts/add-source-metadata.mjs)
- `npm run remove-tags` - Remove tags from posts (scripts/remove-tags-from-posts.mjs)

### Git Hooks
- Pre-commit hooks via Husky run ESLint on staged files
- Commitizen configured for conventional commits

## High-Level Architecture

### Content Management
- Blog posts are stored in `src/content/blog/` as Markdown/MDX files organized by year
- Frontmatter schema is defined in `src/content.config.ts` with required fields:
  - `title`, `description`, `pubDatetime` (required)
  - `tags` array, `featured`, `draft`, `unlisted` flags (optional)
  - `modDatetime`, `ogImage`, `heroImage`, `canonicalURL` (optional)
  - Dates must be in ISO-8601 format with timezone
- Content is loaded using Astro's content collections with glob loader pattern

### Routing Structure
- Static site generation with Astro's file-based routing
- Dynamic routes for blog posts: `/posts/[...slug]`
- Pagination: `/posts/[page]` and `/page/[page]`
- Tag pages: `/tags/[tag]/[...page]`
- Redirects from old URLs (e.g., `/about.md` → `/about`) handled via `.md.ts` files

### Configuration
- Site config in `src/consts.ts` - site metadata, navigation, social links (SITE object)
- Social links in `src/constants.ts` - SOCIALS and SHARE_LINKS arrays
- Build config in `astro.config.mjs` - integrations, markdown plugins, PWA setup
- TypeScript path alias: `@/*` maps to `src/*`
- Tailwind CSS v4 with PostCSS for styling

### Key Features
- **Search**: Pagefind integration builds search index during build
- **PWA**: Service worker with offline support via @vite-pwa/astro
- **OG Images**: Dynamic generation using Satori for social media previews at `/posts/[slug]/index.png`
- **Sitemap**: Auto-generated with priority rules based on content age
- **Analytics**: Vercel Analytics and Speed Insights integration
- **RSS Feed**: Available at `/rss.xml`
- **Structured Data**: JSON-LD for blog posts and breadcrumbs

### Component Architecture
- Astro components for static UI (`src/components/*.astro`)
- React components for interactive elements (`src/components/ui/*.tsx`)
- Layouts define page structure (`src/layouts/`)
- Utilities in `src/utils/` handle post filtering, sorting, slug generation

### Image Handling
- Blog images stored in `/public/assets/img/YEAR/POST-NAME/`
- Lazy loading implemented via custom remark plugin (`src/utils/remarkLazyLoadImages.mjs`)
- Original images may be in `/temp-repos/steipete.com/assets/img/`

### Performance Optimizations
- Critical CSS extraction for above-the-fold content
- Google Fonts preloading and caching
- Image lazy loading with native loading attribute
- Service worker caching strategies for assets
- Trailing slashes removed for cleaner URLs
