# Agent Notes

## Project

Vanilla HTML + CSS + JS landing page for Nomokh (Yakut goods). No framework, no build step.

## Entry

`index.html` → `styles.css` + `script.js` (GSAP via CDN).

## Dev

- `npm run dev` — serves root via `npx serve`
- Or open `index.html` directly / use VS Code Live Server
- No lint, typecheck, or build step

## Layout

- Container: `.l-wrapper` — `max-width: 1440px; padding: 0 16px; margin: 0 auto`
- Inter font via Google Fonts CDN in `<head>`
- GSAP 3 + ScrollTrigger via CDN

## Full-bleed utility classes

Use on an element inside a section with `overflow: hidden` to extend its color to the viewport edge:

| Class | Effect |
|-------|--------|
| `.shadow-left` | left bleed, inherits element background |
| `.shadow-right` | right bleed, inherits element background |
| `.shadow--orange` | set bleed color to lighter orange `#f5a070` |
| `.shadow--gray` | set bleed color to `#A8A8A8` |
| `.shadow--dark` | set bleed color to `#333` |
| `.border-left` | left border |
| `.border-right` | right border |
| `.border--gray` | border color `#A8A8A8` |
| `.border--orange` | border color `#EF7E31` |
| `.border--dark` | border color `#2E2F31` |

Combine direction + color, e.g. `.shadow-left.shadow--dark`, `.shadow-right.shadow--gray`, or `.border-left.border--gray`.

## Design Tokens (CSS custom properties in `:root`)

| Token | Value |
|-------|-------|
| `--color-orange` | `#EF7E31` |
| `--color-dark` | `#2E2F31` |
| `--color-gray` | `#A8A8A8` |
| `--color-light` | `#E4E4E4` |

## Structure

Single-page sections in order:
1. Header (fixed)
2. Hero (full viewport)
3. About
4. Features
5. Catalog
6. Services
7. Contacts (form + Yandex map)
8. Footer

## Animations (script.js)

- Hero entrance: text fade-up + visual slide-in
- Scroll-triggered section fade-ins via ScrollTrigger
- Header hide/show on scroll direction
- Mobile burger menu
- Smooth scroll for anchor links

## Notes

- Images are Unsplash placeholders; user replaces later.
- All text is Russian (mix of reference and original).
- Phone: `8 (924) 464-08-88`, WhatsApp: `wa.me/+79244640888`.
- No external deps except GSAP CDN and Google Fonts.