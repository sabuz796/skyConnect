# ✈️ SkyConnect

> Modern minimalistic travel agency website — VFR flights, Umrah packages, visa handling & study consultancy.

---

## 🌟 About

SkyConnect is a modern, minimalistic travel agency website built for a Swedish travel company. It helps customers book VFR flights to South Asia & Southeast Asia, complete Umrah packages, visa handling, and study consultancy services. All requests go directly through WhatsApp.

## ✨ Features

- 🌙 **Dark mode** — persisted in localStorage
- 🌐 **3 languages** — English, Swedish, Bangla
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 💬 **Request forms** — Flight / Umrah / Hotel → WhatsApp
- 🎓 **Study consultancy** — university admissions, student visa, pre-departure
- ⚡ **Blazing fast** — pure frontend, no framework
- ♿ **Accessible** — keyboard navigation, ARIA labels, reduced motion support

## 🛠️ Tech Stack

| Tool | Version |
|------|---------|
| ⚡ Vite | 7 |
| 🎨 Tailwind CSS | 4 |
| 📝 JavaScript | Vanilla (no framework) |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build

# Regenerate all image derivatives from originals/
npm run images

# Preview production build
npm run preview
```

## 📁 Project Structure

```
skyconnect/
├── index.html                  # Shell + skeleton loader + SEO
├── vite.config.js
├── originals/                  # Pristine image sources (gitignored)
├── scripts/
│   └── optimize-images.mjs     # Generates public/images/ from originals/
├── public/
│   ├── favicon.svg
│   ├── fonts/                  # Self-hosted Inter + Playfair Display
│   └── images/                 # Generated WebP + JPEG derivatives
└── src/
    ├── main.js                 # Entry point
    ├── app.js                  # Main HTML template
    ├── styles/
    │   ├── tokens.css          # Design tokens (CSS custom properties)
    │   ├── main.css            # Tailwind + page styles
    │   └── hero-form.css       # Booking form styles
    ├── components/
    │   ├── HeroForm.js         # Booking form (flight / Umrah / hotel tabs)
    │   ├── AirportSearch.js    # Combobox airport/city search
    │   ├── DatePicker.js       # Calendar (single + range mode)
    │   ├── PassengerStepper.js # Adults / children / infants counters
    │   ├── Popover.js          # Shared floating-layer base class
    │   └── DropdownManager.js  # Singleton dropdown manager
    ├── data/
    │   └── airports.json       # Airport dataset
    ├── i18n/
    │   ├── en.json             # English (default)
    │   ├── sv.json             # Swedish
    │   └── bn.json             # Bangla
    └── js/
        ├── i18n.js             # Language system
        ├── theme.js            # Dark mode
        ├── config.js           # WhatsApp number, phone number/links
        ├── effects.js          # Decorative effects (glow, tilt, parallax)
        └── ui.js               # UI wiring (menu, modal, accordion, gallery)
```

## 🎨 Customize

| What | Where |
|------|-------|
| WhatsApp number | `src/js/config.js` |
| Translations | `src/i18n/*.json` (keep all 3 files in sync) |
| Brand colors | `src/styles/tokens.css` / `main.css` |
| Airport data | `src/data/airports.json` |

## 🖼️ Images

Every photo ships as a `<picture>`: a WebP `<source srcset>` (what ~97% of browsers
take) with a JPEG `<img>` fallback. Nothing in `public/images/` is edited by hand —
it is all generated from the pristine sources in `originals/`:

```bash
npm run images          # regenerate public/images/ from originals/
```

`originals/` is gitignored, so **get the originals from a teammate before running
it** — only the optimised derivatives are committed. `scripts/optimize-images.mjs`
holds a `SPEC` table of which widths to emit per asset, derived from the largest CSS
width each image is displayed at.

To add or replace an image:

1. Drop the original into `originals/`
2. Add it to `SPEC` in `scripts/optimize-images.mjs`
3. Run `npm run images`
4. Reference it in `src/app.js` via the `picture()` helper, passing the full width
   ladder from `SPEC` plus a `sizes` value matching where it renders

The script throws if an asset has no `SPEC` entry, so a forgotten one fails loudly
instead of silently shipping an unresized original.

## 📄 License

MIT License © 2026 SkyConnect
