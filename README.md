# Academic portfolio

My personal academic website -- research, publications, teaching, and a running reading list. Built with [Astro](https://astro.build) and Tailwind CSS, deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
```

## Build

```bash
npm run build    # outputs to dist/
```

Publications and reading-list entries live as Markdown files under `src/content/`. Adding one is just a new file -- no template changes needed.

## Editing content

- **`src/data/site.ts`** -- identity, links, nav, news, research interests,
  education, test scores, experience (jobs + courses + supervision), skills,
  and quotes. Every section of the site is driven from here.
- **`src/content/publications/`** -- one `.md` file per paper (frontmatter only).
- **`src/data/reading.yaml`** -- the whole reading list in one file; adding a
  paper is copy-pasting an 8-line block (template at the top of the file). The
  page groups entries by the year in `dateRead`.
- **`src/assets/profile.jpg`** -- hero portrait; cropped square and optimized
  automatically (original kept as `profile-original.jpg`). Delete it to hide
  the photo.
- **`src/assets/gallery/`** -- photos dropped here appear on the Life page;
  optional captions via `galleryCaptions` in `site.ts`.

## Layouts

Two home layouts live side by side in `src/components/home/`:

- **StandardHome** -- top navbar, centered reading column.
- **ExperimentalHome** -- right sidebar nav (hamburger on mobile), split-screen
  hero with a sticky portrait, bento-grid sections, decorative mountain/wave
  strip (`src/components/SceneStrip.astro`, shared by both).

Switch the whole site (root page **and** all tab pages) between them with the
`layoutVariant` flag at the top of `src/data/site.ts`. The experimental
variant is always previewable at `/experimental`.
