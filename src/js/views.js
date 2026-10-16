/**
 * views.js — hash-based view switching.
 *
 * The site is one SPA shell: header, <main>, footer and the floating actions
 * are rendered once by renderApp(). Only <main>'s contents change, and they
 * change on `hashchange` rather than a full page load.
 *
 * Everything that binds to a node inside <main> has to be re-bound after a
 * swap, because innerHTML replacement throws the old nodes - and with them
 * every listener attached to them - away. Anything bound to `window`, or to a
 * node outside <main>, must stay in main.js so it is not bound twice.
 */

import { viewContent } from '../app.js'
import { applyTranslations } from './i18n.js'
import { initTiltCards } from './effects.js'
import { initRevealObserver, initSmoothScroll, initContactForm } from './ui.js'

export const VIEWS = ['home', 'services', 'study', 'contact']

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let appConfig = null

/** Normalise '#/services', '#services' or '#/services/extra' to a view name. */
function viewFromHash(hash = window.location.hash) {
  const raw = String(hash).replace(/^#\/?/, '').split('/')[0].toLowerCase()
  return VIEWS.includes(raw) ? raw : 'home'
}

/** Second hash segment, e.g. 'ticket' in '#/services/ticket'. Empty when the
 *  route names no card, so '#/services' still lands at the top of the view. */
function focusFromHash(hash = window.location.hash) {
  return String(hash).replace(/^#\/?/, '').split('/')[1]?.toLowerCase() ?? ''
}

/** Re-bind everything that lives inside <main>. Safe to call repeatedly. */
function bindView() {
  initRevealObserver(prefersReducedMotion)
  initTiltCards(prefersReducedMotion)
  initSmoothScroll()
  // would leave the listener pointing at a detached node after one swap.
  initContactForm()
}

/** Swap <main> to `name` and re-bind everything it contained. */
export function setView(name) {
  const target = VIEWS.includes(name) ? name : 'home'
  const root = document.getElementById('view-root')
  if (!root || !appConfig) return

  root.innerHTML = viewContent(target, appConfig)
  applyTranslations()

  document.querySelectorAll('[data-view]').forEach((link) => {
    const isActive = link.getAttribute('data-view') === target
    link.classList.toggle('is-active', isActive)
    if (isActive) {
      link.setAttribute('aria-current', 'page')
    } else {
      link.removeAttribute('aria-current')
    }
  })

  bindView()

  // '#/services/ticket' scrolls to that card; a plain '#/services' starts at the
  // top as before. block:'center' rather than 'start' so the sticky header never
  // lands on top of the card it was aimed at.
  const card = document.getElementById(`card-${focusFromHash()}`)
  if (card) {
    card.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'center' })
  } else {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

/**
 * Read the route on load and keep it in sync. Corrects a missing or
 * unrecognised hash with replaceState so the first back press is not spent
 * undoing our own default.
 */
export function initRouter(config) {
  appConfig = config
  setView(viewFromHash())

  const current = viewFromHash()
  if (window.location.hash !== `#/${current}`) {
    window.history.replaceState(null, '', `#/${current}`)
  }

  window.addEventListener('hashchange', () => setView(viewFromHash()))

  // The form lives here, so its language does too.
  window.addEventListener('languagechange', () => {
    applyTranslations()
  })
}
