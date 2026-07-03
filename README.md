# Signal — v5.4

Enric Trillo's portfolio, built as a versioned product. Next.js 15 (App Router) + TypeScript + React 19. No Tailwind, no UI libraries — hand-rolled CSS with a semantic wavelength token system. WebGL hero background via `ogl`.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # production build
```

## Where things live

| Change this | Edit here |
|---|---|
| All copy, capstones, credentials, changelog, chips, links | `lib/site.ts` |
| Colours, type scale, spacing, every visual token | `app/globals.css` (`:root`) |
| Page structure / section order | `app/page.tsx` |
| Prism props (speed, glow, scale, animation type) | `app/page.tsx` → `<Prism ...>` |
| Marquee tech-stack items | `components/Marquee.tsx` (`ITEMS` array) |
| Dispersion schematic / mobile band grid | `components/Dispersion.tsx` |
| Nav links + mobile menu + active-section tracking | `components/NavLinks.tsx` |
| Glitch cadence | `components/GlitchWord.tsx` (`intervalMs` prop, default 7000) |

## Before shipping

1. Update `lib/site.ts → credentials` with your actual certification titles and URLs. Set `url` to the credential link — `null` makes it non-clickable.
2. Name the capstones (set `workingTitle: false` once christened).
3. Add a `changelog` entry when you do — the site's honesty is the feature.

## Architecture notes

- Server components everywhere except the four files under `components/` that need the browser (observers, canvas, state).
- Wavelength colours defined in two places on purpose: CSS custom properties (`globals.css`) for styling, `wavelengthHex` in `lib/site.ts` for JS/canvas. Keep them in sync.
- Background is a pure CSS dot-grid (`radial-gradient` on `body`) — no JS, no animation.
- `prefers-reduced-motion` disables glitch, pulses, hero entrance, and reveal transitions throughout.
- Fonts load via Google Fonts `<link>` (runtime). Self-hosted/`next/font` is a drop-in change in `app/layout.tsx`.
- Mobile menu uses CSS `max-height` transition (no library dependency). For spring-physics exit animations, Framer Motion's `AnimatePresence` would be the next addition.
