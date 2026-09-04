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

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
skyconnect/
├── index.html                  # Shell + skeleton loader + SEO
├── vite.config.js
├── public/
│   ├── favicon.svg
│   ├── fonts/                  # Self-hosted Inter + Playfair Display
│   └── images/                 # Hero, gallery and section photos
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

## 📄 License

MIT License © 2026 SkyConnect
