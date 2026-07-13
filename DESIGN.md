# Khirvie Portfolio Design System

## 1. Atmosphere & Identity

A professional dark portfolio for a software developer with systems depth. The signature is a technical, high-contrast interface that uses restrained neon accents for scanning and emphasis while keeping the content direct, credible, and work-focused.

## 2. Color

### Palette

| Role | Token | Value | Usage |
| --- | --- | --- | --- |
| Background | `--bg` | `#08070d` | Page background |
| Background raised | `--bg-2` | `#101018` | Secondary dark depth |
| Panel | `--card` | `rgba(20, 18, 30, 0.82)` | Repeated content panels |
| Panel solid | `--card-solid` | `#17131f` | Opaque panel backup |
| Text primary | `--ink` | `#f6f0ff` | Main text |
| Text muted | `--muted` | `#afa4bb` | Body support text |
| Text quiet | `--muted-2` | `#766b83` | Metadata |
| Line | `--line` | `rgba(246, 240, 255, 0.16)` | Inputs, header, small controls only |
| Accent acid | `--acid` | `#d7ff38` | Status, metrics, primary emphasis |
| Accent pink | `--pink` | `#ff2a8e` | Primary buttons and section markers |
| Accent cyan | `--cyan` | `#33f5ff` | Secondary links and hover state |
| Accent violet | `--violet` | `#8b5cf6` | Brand mark gradient |
| Accent orange | `--orange` | `#ff8a00` | Reserved accent |

### Rules

- Large repeated panels use tonal backgrounds, gradient overlays, or accent bars instead of full borders.
- Borders are reserved for controls, inputs, navigation, badges, and small chips where boundaries improve usability.
- Accent colors support hierarchy and actions; they should not turn every element into a separate highlight.

## 3. Typography

### Scale

| Level | Size | Weight | Line Height | Usage |
| --- | --- | --- | --- | --- |
| Hero | `clamp(4rem, 9vw, 7.8rem)` | 700+ | 0.88 | First-screen title |
| Section | `clamp(2.9rem, 6vw, 5rem)` | 700+ | 0.94 | Major section titles |
| Project | `clamp(2.1rem, 4vw, 3.3rem)` | 700+ | 1.05 | Project names |
| Card title | `1.1rem` to `1.2rem` | 700 | 1.22 | Compact headings |
| Body | `1rem` to `1.08rem` | 400-500 | 1.58 | Paragraphs and lists |
| Label | `0.72rem` to `0.82rem` | 700-800 | 1.4 | Eyebrows, metadata, chips |

### Font Stack

- Primary: `Space Grotesk`, `ui-sans-serif`, `system-ui`, `sans-serif`
- Mono: `JetBrains Mono`, `monospace`

### Rules

- Content must stay professional and specific. Avoid persona labels in visible profile copy.
- Use `JetBrains Mono` for metrics, chips, system labels, and code-like details.
- Keep letter spacing at `0` for headings and use positive tracking only for compact uppercase labels.

## 4. Spacing & Layout

### Base Unit

Spacing follows a 4px base unit.

| Pattern | Value | Usage |
| --- | --- | --- |
| Container | `min(1180px, calc(100% - 40px))` | Site width |
| Section vertical | `112px` desktop | Main section spacing |
| Panel padding | `20px` to `24px` | Cards and forms |
| Grid gap | `16px`, `24px`, `28px`, `32px`, `54px` | Repeated grids and split layouts |
| Mobile shell | `calc(100% - 40px)` | Maintains side breathing room |

### Rules

- Use responsive grids that collapse to one column below tablet width.
- Preserve enough spacing for dense project data without forcing equal-height card sameness.
- Keep project and repository names wrapped safely with `overflow-wrap: anywhere` where needed.

## 5. Components

### Header Navigation

- **Structure**: sticky header, brand mark, desktop links, mobile toggle menu.
- **States**: transparent at rest, blurred raised state on scroll, visible active/hover link state.
- **Accessibility**: semantic `nav`, labeled mobile toggle, keyboard-reachable links.

### Buttons

- **Structure**: `.button` with optional `.button-primary`.
- **States**: default, hover, active/focus through border, background, and shadow changes.
- **Accessibility**: links remain real anchors; color contrast must stay readable.

### Repeated Panels

- **Structure**: hero panel, project cards, repository cards, language board, timeline cards, certification cards, contact form.
- **Depth**: no full panel border by default; use tonal background, shadow, and optional 3px accent bar.
- **States**: hover may lift interactive cards with background and shadow changes.

### Chips And Badges

- **Structure**: compact mono labels for stacks, languages, and metadata.
- **Depth**: small border is allowed because chips need a clear boundary at dense sizes.
- **States**: non-interactive chips do not animate.

### Contact Form

- **Structure**: labeled fields, textarea, submit button, form note.
- **States**: focus ring and border color visible on every field.
- **Accessibility**: labels wrap each input; no placeholder-only labeling.

## 6. Motion & Interaction

| Type | Duration | Usage |
| --- | --- | --- |
| Micro | `160ms` to `200ms` | Button and card hover |
| Reveal | `520ms` | Scroll reveal entrance |
| Header | `180ms` | Sticky header state change |

### Rules

- Animate only `transform`, `opacity`, `background`, `border-color`, and `box-shadow`.
- Motion must communicate interaction, page entry, or state changes.
- The `prefers-reduced-motion` media query disables animation and smooth scrolling.

## 7. Depth & Surface

### Strategy

Use a mixed strategy: tonal panels and shadows for large surfaces, borders only for controls and compact utility elements.

| Level | Value | Usage |
| --- | --- | --- |
| Default panel | `0 22px 70px rgba(0, 0, 0, 0.32)` | Main repeated panels |
| Hover panel | `0 22px-78px rgba(0, 0, 0, 0.34-0.42)` | Interactive cards |
| Header raised | `0 18px 50px rgba(0, 0, 0, 0.35)` | Sticky scrolled header |
| Compact inset | `inset 3px 0 0 ...` | Metric and language inner emphasis |

### Rules

- Do not add a full border to every card. It makes repeated panels look templated and noisy.
- Accent bars are preferred over boxed outlines when a card needs a visual marker.
- Shadow direction and intensity should stay consistent across panels.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA contrast for body text and controls.
- Keep all navigation and form controls keyboard-accessible.
- Preserve semantic landmarks: `header`, `nav`, `main`, `section`, `article`, and `footer`.
- Keep mobile typography and controls readable at 375px width.
- Respect `prefers-reduced-motion`.

### Accepted Debt

| Item | Location | Why accepted | Exit |
| --- | --- | --- | --- |
| Full Lighthouse audit not yet automated | Project-wide | Static GitHub Pages site can be smoke-tested locally now; automated audit can be added later | Add Playwright/Lighthouse script when CI is introduced |
