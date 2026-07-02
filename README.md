# Signal — v5.2

Enric Trillo's portfolio, built as a versioned product. Next.js 15 (App Router) + TypeScript + React 19. No Tailwind, no UI libraries — hand-rolled CSS with a semantic wavelength token system.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck  # tsc --noEmit
npm run build      # static production build
```

## Where things live

| Change this | Edit here |
|---|---|
| All copy, capstones, work, changelog, chips, links | `lib/site.ts` |
| Colours, type scale, spacing, every visual token | `app/globals.css` (`:root`) |
| Page structure / section order | `app/page.tsx` |
| Dispersion schematic behaviour | `components/Dispersion.tsx` |
| Pixel background density / spark count | `components/PixelField.tsx` (`GAP`, spark cap) |
| Glitch cadence | `components/GlitchWord.tsx` (`intervalMs` prop, default 7000) |

## Before shipping

1. Set real URLs in `lib/site.ts → site.links` (email, LinkedIn, GitHub, X). Until then those buttons toast.
2. Swap the two `W-0x` rows in `lib/site.ts → work` for real engagements and set `placeholder: false`.
3. Name the capstones (set `workingTitle: false` once christened).
4. Add a `changelog` entry when you do — the site's honesty is the feature.

## Architecture notes

- Server components everywhere except the five files under `components/` that need the browser (canvas, observers, state).
- Wavelength colours are defined twice on purpose: CSS custom properties for styling, `wavelengthHex` in `lib/site.ts` for canvas/JS. Keep them in sync.
- `prefers-reduced-motion` disables the pixel field animation, glitch, pulses and reveals throughout.
- Fonts load via Google Fonts `<link>` (runtime). If you want self-hosted/`next/font` later, it's a drop-in change in `app/layout.tsx`.
