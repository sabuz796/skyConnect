import './styles/main.css'
import { renderApp } from './app.js'
import { initI18n } from './js/i18n.js'
import { initTheme } from './js/theme.js'
import { initHeroGlow } from './js/effects.js'
import { initHeaderControls, initBackToTop } from './js/ui.js'
import { initRouter } from './js/views.js'
import { WHATSAPP_NUMBER, PHONE_NUMBER, PHONE_LINK, CONTACT_EMAIL } from './js/config.js'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const CONFIG = {
  whatsappNumber: WHATSAPP_NUMBER,
  phoneNumber: PHONE_NUMBER,
  phoneLink: PHONE_LINK,
  emailAddress: CONTACT_EMAIL,
}

// Render the shell: header + <main id="view-root"> + footer + floating actions.
document.getElementById('app').innerHTML = renderApp(CONFIG)

initTheme()
initI18n()

// Bind the first view. This also builds the booking form, applies translations
// and runs the per-view effects that renderApp's markup alone cannot.
initRouter(CONFIG)

// ========== EFFECTS ==========
// Bindings that attach to `window` or to nodes outside <main> run once here
// and are deliberately NOT re-run by views.js on every swap.
initHeroGlow(prefersReducedMotion)

// ========== UI ==========
initHeaderControls()
initBackToTop()
