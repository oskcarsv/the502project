# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

The 502 Project is a bilingual (Spanish/English) community website for builders, founders, and dreamers in Guatemala. It's built with Astro 5 and features a content-driven architecture for managing events and initiatives.

## Commands

### Development
```bash
npm run dev       # Start development server at http://localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build locally
```

### Important Notes
- No test suite is configured
- No linting/formatting scripts defined
- Site is designed for deployment to Vercel or Cloudflare Pages

## Architecture

### Framework & Routing
- **Astro 5** with React 19 islands for interactive components
- **i18n configuration**: Spanish (default, no prefix) and English (`/en/*`)
- Default locale is `es` with routing that doesn't prefix the default locale

### Content Management
The site uses **Astro Content Collections** for structured content management:

- **Events**: Defined in `src/content/events/` as MDX files
- Schema in `src/content/config.ts` includes:
  - Bilingual fields (`title`/`titleEs`, `description`/`descriptionEs`)
  - Event metadata: `date`, `time`, `endTime`, `type` (presencial/virtual/hybrid)
  - Registration: `lumaUrl`, `customRegistrationUrl`
  - Status: `open`, `waitlist`, `sold-out`, `requires-application`, `past`
  - Collaboration info: `collaboratorName`, `collaboratorLogo`, `collaboratorUrl`
  - Recording support: `recordingUrl` for past events

### Page Structure
- Dynamic routes use `[...slug].astro` pattern with `getStaticPaths()`
- Pages exist in both root (`src/pages/`) and English (`src/pages/en/`) directories
- Bilingual pages must be kept in sync manually

### Styling System
- **Tailwind CSS** with custom theme extensions
- Brand colors:
  - `502-black`: #191d20 (background)
  - `502-green`: #56ef9f (primary accent)
  - `502-gray`: #252525
- Typography:
  - Body: 'Space Mono' (monospace) at 14px
  - Headings: 'Instrument Serif' (serif)
- Custom utilities:
  - `.grid-bg`: Subtle green grid pattern background
  - `.fade-in`, `.stagger-item`: Scroll-triggered animations
  - `.nav-indicator`: Side navigation active state

### Layout & Navigation
- Main layout in `src/layouts/Layout.astro` with meta tags, favicon, and OG images
- Desktop: Fixed left sidebar navigation with scroll-linked active states
- Mobile: Top bar navigation with language switcher
- Scroll animations managed via IntersectionObserver in inline scripts

## Key Patterns

### Adding Events
1. Create MDX file in `src/content/events/`
2. Include all required frontmatter fields (especially bilingual titles/descriptions)
3. Use `status: "open"` for upcoming events, `"past"` for completed ones
4. Add `recordingUrl` for past events if recording is available
5. For collaborations, set `collaboration: true` and include collaborator details

### i18n Implementation
- Spanish content at root paths (e.g., `/events`)
- English content under `/en` prefix (e.g., `/en/events`)
- Language switcher links in top nav
- Each page should check Astro.url.pathname to determine locale
- Use `lang` prop on Layout component (`"es"` or `"en"`)

### Date Handling
- Dates stored as ISO strings (YYYY-MM-DD)
- Parse with noon timestamp to avoid timezone issues: `new Date(date + 'T12:00:00')`
- Format with `toLocaleDateString('es-GT', ...)` or `toLocaleDateString('en-US', ...)`

### TypeScript Path Aliases
- `@/*` → `src/*`
- `@components/*` → `src/components/*`
- `@layouts/*` → `src/layouts/*`
- `@assets/*` → `src/assets/*`

## Content Guidelines

### Event Content
- Event pages display full MDX content in prose styles
- Use headings, lists, and paragraphs in MDX for structure
- Past events should show "te lo perdiste" banner (Spanish) or equivalent in English
- Registration CTAs adapt based on event status

### Design Language
- Minimalist, monospace aesthetic with serif accents
- Dark theme with subtle green highlights
- Clean borders (`border-white/5` to `border-white/20`)
- Hover states typically transition to `502-green`
- Mobile-first responsive design

## External Integrations

- **Luma**: Event registration via `lumaUrl` in frontmatter
- **YouTube**: Recording hosting via `recordingUrl`
- **Social**: Discord, WhatsApp, LinkedIn, Instagram, X, YouTube links in footer/content

## Deployment

Push to GitHub and connect via:
- Vercel (recommended)
- Cloudflare Pages

Site URL: https://the502project.com
