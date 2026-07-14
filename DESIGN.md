# Khirvie Portfolio Design System

## 0. Research Log

- Existing contract read: previous `DESIGN.md` described a polished dark developer portfolio with neon system accents.
- Existing UI audit: the site used strong content and functional navigation, but the surface read as conventional dark SaaS: symmetrical panels, smooth cards, soft glows, and predictable neon accents.
- Loaded references: `redesign-skill.md`, `brutalist-skill.md`, `perfection/README.md`, `designpowers/lane-c-review.md`, and `visual-qa`.
- UI/UX database lookup: "graffiti punk portfolio visual design" did not return a direct graffiti preset. Useful adjacent rules were high contrast, editorial/brutalist typography, hard borders, paper noise, dramatic hero hierarchy, and non-rounded mechanical surfaces.
- Chosen direction: graffiti punk zine wall for a systems developer. The remembered moment is a torn-poster hero with sticker CTAs, hazard red marks, acid yellow labels, spray texture, and a raw street-poster project archive.

## 1. Atmosphere & Identity

The portfolio should feel like a late-night build log pasted onto a city wall: practical software systems presented through punk flyers, torn paper, black ink, hazard tape, spray marks, and aggressive typography. It must still remain credible for developer hiring, so the punk layer is visual energy, not vague copy.

### Design Principles

- Keep content direct and specific: systems, repos, stacks, credentials, and role fit stay readable.
- Let the surface be raw: square corners, offset layers, thick ink marks, torn-paper edges, and visible grid lines.
- Use graffiti punk as a controlled design language, not random chaos. Every distortion should support hierarchy.
- Avoid glossy SaaS patterns: no purple-blue AI gradients, no soft glass cards, no rounded pill-heavy layouts.

## 2. Color

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Asphalt | `--asphalt` | `#090807` | Page background |
| Asphalt raised | `--asphalt-2` | `#15110f` | Raised raw panels |
| Paper | `--paper` | `#f2ead2` | Torn poster surfaces and inverse cards |
| Paper aged | `--paper-aged` | `#d9cfad` | Secondary paper panels |
| Ink | `--ink` | `#fff8dc` | Main text on dark |
| Ink dark | `--ink-dark` | `#15100c` | Text on paper/accent fills |
| Muted | `--muted` | `#c3bba3` | Supporting text on dark |
| Muted dark | `--muted-dark` | `#574d3d` | Supporting text on paper |
| Line | `--line` | `#3d3428` | Structural borders |
| Line strong | `--line-strong` | `#fff8dc` | High-contrast dividers |
| Hazard red | `--hazard` | `#ff293f` | Primary accent, buttons, marks |
| Acid yellow | `--acid` | `#dfff00` | Labels, counters, tape |
| Spray teal | `--spray` | `#21ffd2` | Secondary active state |
| Bruise violet | `--bruise` | `#7a2cff` | Occasional poster shadow |
| Rust | `--rust` | `#ff7a1a` | Reserved tertiary mark |

### Rules

- `--hazard` and `--acid` are the primary punk accents. Use `--spray` only for active/focus states and small metadata.
- Paper sections must keep dark text and strong contrast. Dark sections must keep cream text and visible focus states.
- Use black/cream/red/yellow as the dominant story. Violet and rust are supporting marks only.
- Texture is allowed through CSS gradients, masks, and pseudo-elements, but text contrast must remain AA-readable.

## 3. Typography

### Font Stack

- Display: `Archivo Black`, `Impact`, `Arial Black`, `sans-serif`
- Body: `Space Grotesk`, `ui-sans-serif`, `system-ui`, `sans-serif`
- Mono: `JetBrains Mono`, `monospace`

### Scale

| Level | Size | Weight | Line Height | Usage |
| --- | --- | --- | --- | --- |
| Hero | `clamp(3.1rem, 8.4vw, 7.2rem)` | 900 | 0.86 | First-screen statement |
| Section | `clamp(2.65rem, 6vw, 5.4rem)` desktop, `clamp(1.78rem, 9.4vw, 2.8rem)` mobile | 900 | 0.9 | Major sections |
| Project | `clamp(2rem, 4vw, 3.25rem)` | 900 | 0.95 | Project names |
| Card title | `1.12rem` to `1.35rem` | 800 | 1.15 | Compact headings |
| Body | `1rem` to `1.08rem` | 400-600 | 1.62 | Paragraphs and lists |
| Label | `0.72rem` to `0.82rem` | 800 | 1.35 | Metadata, stickers, chips |

### Rules

- Letter spacing remains `0` for headings. Do not use negative tracking.
- Uppercase is allowed for display and labels, but paragraphs remain sentence case for readability.
- Use `JetBrains Mono` for repo indexes, system labels, stack chips, form notes, and technical metadata.
- Use `text-wrap: balance` for major headings and `text-wrap: pretty` for paragraphs where supported.
- Mobile section headings must fit inside the 375px shell without clipping. Prefer a smaller mobile scale before forcing awkward word breaks.

## 4. Spacing & Layout

### Base Unit

Spacing follows a 4px base unit.

| Pattern | Value | Usage |
| --- | --- | --- |
| Container | `min(1200px, calc(100% - 40px))` | Site width |
| Section vertical | `104px` desktop | Main section spacing |
| Panel padding | `18px` to `28px` | Poster panels and cards |
| Grid gap | `12px`, `16px`, `24px`, `32px`, `52px` | Repeated grids and splits |
| Mobile shell | `calc(100% - 28px)` | 375px breathing room |

### Rules

- Use asymmetric grids where possible: offset hero panel, alternating project layouts, and varied repo card rhythm.
- Corners are square. No rounded cards, badges, or buttons.
- Cards and panels can be rotated by a very small amount only when the layout remains readable and stable.
- Avoid nested card-on-card styling. Use full-width bands, torn paper panels, and structured lists.

## 5. Components

### Header Navigation

- **Structure**: sticky black bar with hard border, brand sticker, desktop links, mobile menu.
- **States**: scrolled state becomes denser with paper/ink contrast. Active link uses hazard/acid underline block.
- **Accessibility**: semantic `nav`, labeled mobile toggle, keyboard focus visible.

### Buttons

- **Structure**: `.button` sticker blocks with hard border and offset ink shadow.
- **States**: hover translates slightly and flips accent. Active state presses back toward the shadow.
- **Accessibility**: links remain real anchors with visible focus rings and 44px minimum tap height.
- **Focus**: focus states use a dual acid/ink ring so they remain visible on both dark asphalt and cream paper panels.

### Poster Panels

- **Structure**: hero panel, project cards, repository cards, language board, timeline cards, certification cards, contact form.
- **Material**: paper fill or asphalt fill, thick top/side marks, pseudo torn edges, grain overlay.
- **States**: only clearly clickable elements move on hover. Non-clickable project and repository cards may change internal accents, but the whole card must not translate like a button.

### Chips And Badges

- **Structure**: mono sticker labels for stacks, languages, repo metadata, and counters.
- **Material**: paper/acid/spray fills with black border.
- **States**: non-interactive chips do not animate.

### Graffiti Wall Hero Asset

- **Structure**: live DOM text collage, not a pasted screenshot. Uses `.graffiti-wall`, `.tag`, and `.tape` primitives.
- **Purpose**: gives the theme a memorable visual asset while keeping the site lightweight and accessible.
- **Rules**: decorative text remains `aria-hidden`; real profile data stays in readable DOM nearby.

### Contact Form

- **Structure**: labeled fields, textarea, submit button, live form note.
- **States**: focus uses spray teal and acid outline; invalid fields rely on browser validation.
- **Accessibility**: labels wrap inputs; no placeholder-only labeling.

## 6. Motion & Interaction

| Type | Duration | Usage |
| --- | --- | --- |
| Micro | `140ms` to `190ms` | Button, nav, card hover |
| Reveal | `460ms` | Scroll reveal entrance |
| Header | `160ms` | Sticky header state change |

### Rules

- Animate only `transform`, `opacity`, `background`, `border-color`, `filter`, and `box-shadow`.
- Motion must show interaction or state change. Decorative-only motion is not allowed.
- The `prefers-reduced-motion` media query disables animation and smooth scrolling.

## 7. Depth & Surface

### Strategy

Depth comes from physical offset layers: ink shadows, torn-paper surfaces, hard borders, and overprinted accent bars.

| Level | Value | Usage |
| --- | --- | --- |
| Sticker shadow | `8px 8px 0 var(--shadow-ink)` | Buttons and compact stickers |
| Poster shadow | `14px 14px 0 var(--shadow-ink)` | Main panels |
| Accent offset | `-8px 8px 0 var(--hazard)` | Hero and selected highlights |
| Texture overlay | Low-opacity noise/scratches | Page and poster surfaces |

### Rules

- Do not use soft glass blur or generic floating cards.
- Use hard shadows and visible borders for the punk print feel.
- Keep all shadow directions consistent: down and right unless a controlled accent layer says otherwise.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA contrast for text and controls.
- Keep all navigation and form controls keyboard-accessible.
- Preserve semantic landmarks: `header`, `nav`, `main`, `section`, `article`, and `footer`.
- Keep mobile typography and controls readable at 375px width.
- Keep touch targets at 44px minimum for mobile navigation, repository links, contact links, and resume navigation.
- Respect `prefers-reduced-motion`.
- Graffiti/punk decorative layers must not hide, replace, or obstruct real readable content.

### Accepted Debt

| Item | Location | Why accepted | Exit |
| --- | --- | --- | --- |
| Full Lighthouse audit not automated | Project-wide | Static GitHub Pages site can be smoke-tested locally now; automated audit can be added later | Add Playwright/Lighthouse script when CI is introduced |
| No real portrait asset | Hero/about visual | The current repository has no verified personal photo asset; theme uses live DOM poster art instead | Add an optimized real portrait or approved brand image when available |
