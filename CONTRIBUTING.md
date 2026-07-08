# Developer guide

A repository-specific map for working on this portfolio. Read this before
editing components or adding sections. (Owner's private notes live in
`NOTES.local.md`, which is git-ignored; this file is the shareable guide.)

---

## 1. Mental model

This is a **fully static Astro 5 site** styled with **Tailwind CSS**. There is
no client-side framework and no runtime state — every page is HTML generated
at build time, plus three tiny inline scripts (theme toggle, mobile menu,
Background-page tabs). "State" exists in exactly two forms:

1. **Build-time data** — everything you see is rendered from
   `src/data/site.ts` and the content collections. Templates are dumb.
2. **`localStorage.theme`** — the only browser state, read pre-paint by an
   inline script in both layout shells to apply the `dark` class.

The site ships **two complete visual chromes** that render the *same data*:

| | Standard | Experimental |
|---|---|---|
| Shell | `src/layouts/Base.astro` (top navbar + footer) | `src/layouts/BaseAlt.astro` (fixed right sidebar, hamburger on mobile) |
| Home | `src/components/home/StandardHome.astro` | `src/components/home/ExperimentalHome.astro` |
| Reading flow | Centered column, top-to-bottom sections | Split-screen hero + bento grid |

Which chrome is live is decided by **one build-time flag** (see §4).

### File map

```
astro.config.mjs            site URL + base path (GitHub Pages) — entry config
tailwind.config.mjs         design tokens: accent color, fonts, content width
src/
  data/
    site.ts                 ★ single source of truth: identity, nav, news,
                            education, experience, skills, quotes, AND the
                            layoutVariant flag
    reading.yaml            reading list (one YAML block per paper)
  content.config.ts         schemas for content collections (zod-validated)
  content/publications/     one .md per paper (frontmatter only)
  assets/                   images processed by Astro (profile*.jpg, gallery/)
  styles/global.css         fonts, theme base, .card/.row-hover/animations
  layouts/
    Base.astro              standard shell (head + navbar + footer)
    BaseAlt.astro           experimental shell (head + right sidebar + hamburger)
    Shell.astro             ★ variant-aware wrapper — tab pages use THIS
  components/
    home/StandardHome.astro       standard home (complete page incl. <Base>)
    home/ExperimentalHome.astro   experimental home (complete page incl. <BaseAlt>)
    Header.astro / Footer.astro   standard chrome only
    ThemeToggle.astro       icon button (vertical-switch variant commented inside)
    SceneStrip.astro        decorative mountains/waves (star variant commented)
    Icon.astro              the whole icon set (name → inline SVG)
    PublicationCard.astro, SocialLinks.astro, HomeHeading.astro,
    SectionHeading.astro    shared presentational pieces
  pages/                    file-based routing (one file = one URL)
    index.astro             ★ root switcher (10 lines — picks a home by flag)
    experimental.astro      permanent preview of the experimental home
    research/publications/background/reading/life/404 .astro — tab pages,
                            all wrapped in Shell.astro
public/                     served verbatim (cv.pdf, favicon.svg, robots.txt)
.github/workflows/deploy.yml  CI: every push to main builds + deploys Pages
```

**Separation of concerns:** content lives in `src/data` + `src/content`
(edit these for routine updates — never templates); page logic/markup lives
in `src/pages`, `src/layouts`, `src/components`; styling lives in Tailwind
utility classes inline, with the few shared primitives (`.card`,
`.card-hover`, `.row-hover`, `.fade-up`, `.fade-left`, `.fade-in-scale`,
`.animate-wave`, `.animate-breathe`, `.link-underline`) defined once in
`src/styles/global.css` and tokens in `tailwind.config.mjs`.

---

## 2. The profile portrait, traced end-to-end

### 2.1 Asset files (all in `src/assets/`, all cut from the same photo)

| File | Dimensions | Used by |
|---|---|---|
| `profile-original.jpg` | 1603×2532 (tall source) | Experimental **desktop** framed column |
| `profile.jpg` | 800×800 (headshot crop) | **Standard** hero; fallback for experimental |
| `profile-banner.jpg` | 1603×1280 (wide band) | Experimental **mobile** banner |

They are in `src/assets` (not `public/`) so Astro's image pipeline converts
them to responsive WebP at build time. Nothing imports them by literal path —
both homes discover them with `import.meta.glob`, so **deleting a file
gracefully hides/falls back** rather than breaking the build.

### 2.2 Where each one is imported and rendered

**Standard layout — `src/components/home/StandardHome.astro`**

- Import: lines **27–31** — glob for `profile.{jpg,jpeg,png,webp}`; if no
  file matches, the hero simply renders without a photo.
- Render: lines **96–109** — one `<Image>`:
  - `width={640} height={640} fit="cover" position="top"` → the *generated
    file* is a 640×640 square, cropped from the top of whatever you supply
    (aspect ratio is enforced here, at build time).
  - `widths={[160, 288, 432, 576, 640]}` +
    `sizes="(min-width: 1024px) 288px, (min-width: 768px) 224px, 160px"`
    → the responsive srcset. **Keep `sizes` in sync with the display size.**
  - Display size (line 107):
    `h-40 w-40 md:h-56 md:w-56 lg:h-72 lg:w-72 rounded-2xl object-cover`
    → 160px (mobile) / 224px (tablet) / 288px (desktop) square.

**Experimental layout — `src/components/home/ExperimentalHome.astro`**

- Imports: lines **26–41** — three globs with a fallback chain:
  `portrait = profile-original ?? profile`, `banner = profile-banner ?? portrait`.
- Column wrapper (line **83**):
  `lg:sticky lg:top-0 lg:w-[30%] lg:self-start lg:p-5 xl:w-[27%] xl:p-6`
  → the image column's **width share** of the split screen (30% / 27%) and
  its padding frame. This is the biggest desktop "size" knob.
- **Mobile banner** `<Image>` (lines **85–92**): renders `banner` at native
  1603×1280 aspect, displayed
  `h-72 sm:h-80 w-full object-cover object-[50%_45%] lg:hidden`
  → 288/320px-tall full-width band, vertically positioned at 45%.
- **Desktop portrait** `<Image>` (lines **94–101**): renders `portrait`,
  displayed
  `hidden lg:block lg:h-[23rem] xl:h-[25rem] w-full object-cover object-[50%_32%] lg:rounded-2xl`
  → a 368/400px-tall framed panel; width follows the column (§ above),
  `object-cover` crops the tall source to fit, `object-[50%_32%]` keeps the
  face in frame. `sizes="30vw"` matches the column width.

The gentle load reveal on both is the `fade-in-scale` class
(`src/styles/global.css`).

### 2.3 How to swap the photo

1. Replace `src/assets/profile-original.jpg` with the new photo (any size;
   taller-than-wide works best for the experimental column).
2. Re-cut the two derived crops **from the new photo** and overwrite:
   - `profile.jpg` — square, ≥ 640×640, face centered.
   - `profile-banner.jpg` — wide (~5:4 → 4:3), face in the upper-middle band.
   Any editor works; keep the same filenames and you touch zero code.
3. `npm run dev` and check `/` at mobile + desktop widths, then flip
   `layoutVariant` (or visit `/experimental` vs `/`) to check the other
   layout. If the face sits oddly, adjust only the `object-[50%_XX%]`
   values — 0% = top of the image, 100% = bottom.

### 2.4 How to change size/ratio without breaking responsiveness

Golden rule: **change the display classes and the `sizes` attribute
together**; leave `object-cover` alone (it's what absorbs any source ratio).

- **Standard hero size:** edit the `h-*/w-*` pairs on line 107 (keep each
  breakpoint's `h` = `w` for a square; make them differ for a rectangle,
  e.g. `md:h-64 md:w-52` for 4:5). Then update `sizes` on line 105 so each
  breakpoint's rendered CSS width matches, and bump `width/height` (lines
  99–100) if you display larger than 640px at any density.
- **Experimental desktop:** column share = `lg:w-[30%] xl:w-[27%]`
  (line 83); panel height = `lg:h-[23rem] xl:h-[25rem]` (line 100). These
  are independent — width tracks the viewport, height is fixed — so the
  visible crop's ratio changes with screen width by design. Update
  `sizes="30vw"` if you change the column share.
- **Experimental mobile banner:** height = `h-72 sm:h-80` (line 91). If you
  make it much taller, also consider re-cutting `profile-banner.jpg` taller,
  or you'll just see more of the same band.
- Never remove the `lg:hidden` / `hidden lg:block` pair on the two
  experimental `<Image>`s — that's what swaps banner ↔ framed panel at the
  1024px breakpoint.

---

## 3. Routing & the tab pages

File-based: every file in `src/pages/` is a URL. All tab pages follow one
pattern:

```astro
import Base from "../layouts/Shell.astro";  // yes, aliased as "Base"
...
<Base title="..." description="...">  ...content...  </Base>
```

`Shell.astro` renders the content inside **whichever chrome the flag
selects** — `Base` (navbar) or `BaseAlt` (sidebar, with the `contained` prop
adding the centered reading container that `Base` provides natively). This is
why tab pages never know or care which layout is live.

**New page checklist:** create `src/pages/<name>.astro`, wrap in
`Shell.astro`, use `SectionHeading` for the title, and add
`{ label, href }` to `site.nav` in `site.ts` — both the navbar and the
sidebar render from that one array.

---

## 4. Layout toggling & safe reversion

The mechanism is one line — `src/data/site.ts`, line 13:

```ts
export const layoutVariant = "experimental" as "standard" | "experimental";
```

Consumed in exactly two places:

- `src/pages/index.astro` — renders `<ExperimentalHome />` or
  `<StandardHome />` at the root.
- `src/layouts/Shell.astro` — wraps every tab page in `BaseAlt` or `Base`.

`/experimental` (from `src/pages/experimental.astro`) *always* renders the
experimental home, regardless of the flag — it's the comparison preview.

**To revert strictly to the default layout:**

1. In `site.ts` change the flag to `"standard"`. That alone restores the
   navbar chrome on the root and every tab page. Nothing else is required.
2. Optionally, to stop shipping the experimental preview page, delete
   `src/pages/experimental.astro` (it's 7 lines; recreate it later by
   re-importing `ExperimentalHome`). Leave `BaseAlt.astro`,
   `ExperimentalHome.astro`, and `Shell.astro` in place — they cost nothing
   when unreferenced, and `Shell` is still the correct wrapper for tab pages
   in both modes.
3. `npm run build` to confirm, then push.

Do **not** revert by deleting `Shell.astro` or re-pointing tab pages back to
`Base.astro` directly — that re-couples every page to one chrome and undoes
the switch mechanism.

---

## 5. Editing best practices (specific to this codebase)

1. **Data first, templates second.** If you're typing prose or facts into an
   `.astro` file, stop — it almost certainly belongs in `site.ts`,
   `reading.yaml`, or a publication `.md`. Both layouts read the same data,
   so content added this way appears in both for free; content hardcoded in
   one home component silently diverges from the other.
2. **Adding a home section = two render sites.** The homes are intentionally
   independent files. Add the data to `site.ts`, then render it in
   `StandardHome.astro` (as a `<HomeHeading>` section) **and** in
   `ExperimentalHome.astro` (as a bento card with the mono-label header
   pattern used there). If you deliberately want it in only one layout,
   leave a comment saying so.
3. **Use the shared primitives.** Cards: `class="card p-5"` (hover glow is
   built in). List-row hover: `row-hover`. Icons: `<Icon name="..." />` —
   add new paths to `Icon.astro` rather than pasting SVGs inline. Internal
   links: always prefix with `import.meta.env.BASE_URL` (every component
   does this — copy the `href()` helper pattern from `Header.astro` /
   `BaseAlt.astro`) or the site breaks under a GitHub Pages subpath.
4. **Scripts must survive duplication.** Components can appear twice on a
   page (ThemeToggle renders in both the sidebar and mobile menu). Hook
   scripts to **classes** with `querySelectorAll`, never `getElementById`,
   and prefer processed `<script>` (Astro dedupes it) over `is:inline`
   unless it must run pre-paint.
5. **Style for both themes, always.** Every color utility needs its `dark:`
   counterpart. Test with the toggle, not just your OS preference. Animations
   go in `global.css` as named keyframes + a class; they're globally disabled
   by the `prefers-reduced-motion` block, so never rely on an animation for
   content visibility (use `backwards` fill, not `forwards`/`both`, when an
   element must also respond to hover transforms).
6. **Variants are kept as comments, not branches.** Alternative designs
   (star strip in `SceneStrip.astro`, vertical switch in
   `ThemeToggle.astro`) live in `{/* ... */}` blocks inside the same file.
   Follow that convention: swap blocks, don't fork files — except for whole
   layouts, which follow the `components/home/` + flag pattern.
7. **Windows contributors:** never round-trip source files through
   PowerShell (`Get-Content | Set-Content`) — it corrupts the UTF-8
   punctuation (·, —, ﷺ) used throughout. Edit in your editor, commit with
   git as usual.
8. **Before pushing:** `npm run build` (zod schemas validate all content and
   fail loudly on bad frontmatter/YAML), then eyeball `/` and one tab page
   in **both** layout variants and both themes. The build must show all 8
   pages.

---

## 6. Deployment (context)

`astro.config.mjs` holds `site` and `base` — they must match the GitHub
repo name (instructions inline in that file). `.github/workflows/deploy.yml`
builds and publishes to GitHub Pages on every push to `main`; enable
**Settings → Pages → Source → GitHub Actions** once, on first setup.
