/**
 * ui.js — interactive UI wiring: header controls, reveal observers,
 * back-to-top, lazy images, smooth scroll.
 */

import { setLanguage, t } from './i18n.js'
import { toggleTheme } from './theme.js'
import { CONTACT_EMAIL } from './config.js'
import { buildMailtoUrl, isValidEmail } from '../lib/mailto.js'

/** Kept at module scope so views.js can re-run initRevealObserver on every
 *  view swap without stacking observers on the same elements. */
let revealObserver = null

export function initHeaderControls() {
  // Theme toggle
  document.getElementById('theme-toggle')?.addEventListener('click', toggleTheme)

  // Language switcher
  const langBtn = document.getElementById('lang-btn')
  const langMenu = document.getElementById('lang-menu')

  langBtn?.addEventListener('click', (e) => {
    e.stopPropagation()
    const isOpen = langMenu?.classList.toggle('hidden') === false
    langBtn.setAttribute('aria-expanded', isOpen)
  })

  document.addEventListener('click', () => {
    langMenu?.classList.add('hidden')
    langBtn?.setAttribute('aria-expanded', 'false')
  })

  document.querySelectorAll('.lang-option').forEach((btn) => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang')
      setLanguage(lang)
    })
  })

  // Keyboard navigation for language menu
  langMenu?.addEventListener('keydown', (e) => {
    const options = langMenu.querySelectorAll('.lang-option')
    const currentIndex = Array.from(options).findIndex((opt) => opt === document.activeElement)

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = (currentIndex + 1) % options.length
      options[nextIndex]?.focus()
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      const prevIndex = (currentIndex - 1 + options.length) % options.length
      options[prevIndex]?.focus()
    } else if (e.key === 'Home') {
      e.preventDefault()
      options[0]?.focus()
    } else if (e.key === 'End') {
      e.preventDefault()
      options[options.length - 1]?.focus()
    } else if (e.key === 'Escape') {
      langMenu.classList.add('hidden')
      langBtn?.setAttribute('aria-expanded', 'false')
      langBtn?.focus()
    }
  })

  // Mobile menu
  const mobileBtn = document.getElementById('mobile-btn')
  const mobileMenu = document.getElementById('mobile-menu')

  mobileBtn?.addEventListener('click', () => {
    const isOpen = mobileMenu?.classList.toggle('hidden') === false
    mobileBtn.setAttribute('aria-expanded', isOpen)
  })

  mobileMenu?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden')
      mobileBtn?.setAttribute('aria-expanded', 'false')
    })
  })
}

export function initRevealObserver(prefersReducedMotion) {
  if (!('IntersectionObserver' in window)) return

  // views.js calls this on every view swap. Drop the previous observer first:
  // re-rendered elements are brand new nodes, so without the disconnect they
  // would be observed a second time and the already-revealed ones would never
  // re-trigger, leaving content stuck at its hidden initial state.
  if (revealObserver) revealObserver.disconnect()

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const el = entry.target
      el.classList.add('is-visible')
      revealObserver.unobserve(el)
    })
  }

  revealObserver = new IntersectionObserver(observerCallback, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  })

  // Opt the CSS into its hidden initial states only now that the observer which
  // will un-hide them exists. Until this line runs, main.css's fallback block
  // keeps every `.reveal` / `.section-fade` visible, so a throw anywhere earlier
  // in main.js degrades to "no animation" instead of a blank page.
  document.documentElement.classList.add('js-reveal')

  // Observe all animated elements
  document.querySelectorAll('.reveal, .section-fade, [data-service-reveal], [data-trust-reveal], [data-study-reveal]').forEach((el) => {
    revealObserver.observe(el)
  })

  // Add entrance classes (CSS handles the animation)
  if (!prefersReducedMotion) {
    document.querySelectorAll('[data-service-reveal]').forEach((el) => el.classList.add('service-enter'))
    document.querySelectorAll('[data-trust-reveal]').forEach((el) => el.classList.add('trust-enter'))
    document.querySelectorAll('[data-study-reveal]').forEach((el) => el.classList.add('study-enter'))
  }
}

export function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top')
  if (!backToTopBtn) return

  let ticking = false
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          backToTopBtn.classList.add('is-visible')
        } else {
          backToTopBtn.classList.remove('is-visible')
        }
        ticking = false
      })
      ticking = true
    }
  }, { passive: true })

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  })
}

export function initSmoothScroll() {
  document.getElementById('view-root')?.querySelectorAll('a[href^="#"]')?.forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      // View routes ('#/services') belong to the router, which reacts to
      // hashchange. Running them through querySelector here would throw on
      // the '/' - an invalid selector - and take the whole click with it.
      if (href.startsWith('#/')) return
      const target = document.querySelector(href)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        // replaceState, not pushState: pushing the fragment here would add a
        // bogus history entry and break the back button that hash routing
        // depends on. Skipped entirely while a view route is current, because
        // '#contact' is not a route and writing it over '#/study' would send a
        // reload to Home.
        if (!window.location.hash.startsWith('#/')) {
          window.history.replaceState(null, '', href)
        }
      }
    })
  })
}

/**
 * Wire up the contact form on the Contact view.
 *
 * There is no backend: a valid submit composes a mailto: URL and hands it to
 * `window.location.href`, which opens the visitor's own mail client addressed
 * to CONTACT_EMAIL with the request pre-filled.
 *
 * Called from bindView() on every view swap, because the form lives inside
 * <main> and innerHTML replacement would otherwise leave this listener
 * attached to a detached node.
 */
export function initContactForm() {
  const form = document.getElementById('contact-form')
  if (!form) return

  const emailError = (value) => {
    if (!value.trim()) return 'contact_err_email'
    return isValidEmail(value) ? null : 'contact_err_email_format'
  }

  const rules = {
    'cf-name': (v) => (v.trim() ? null : 'contact_err_name'),
    'cf-email': emailError,
    'cf-message': (v) => (v.trim() ? null : 'contact_err_message')
  }

  const input = (id) => form.querySelector(`#${id}`)
  const value = (id) => input(id)?.value ?? ''

  /** Show or clear a field's inline error, mirroring the booking form's treatment. */
  const showError = (el, key) => {
    const error = document.getElementById(`${el.id}-error`)
    if (!error) return
    error.textContent = key ? t(key) : ''
    error.classList.toggle('hidden', !key)
    if (key) el.setAttribute('aria-invalid', 'true')
    else el.removeAttribute('aria-invalid')
  }

  // Clear an error as soon as the visitor starts fixing that field, so the
  // message disappears the moment it stops being true.
  for (const [id, validate] of Object.entries(rules)) {
    input(id)?.addEventListener('input', () => {
      const el = input(id)
      if (el.getAttribute('aria-invalid') === 'true') showError(el, validate(el.value))
    })
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault()

    let firstInvalid = null
    for (const [id, validate] of Object.entries(rules)) {
      const el = input(id)
      if (!el) continue
      const key = validate(el.value)
      showError(el, key)
      if (key && !firstInvalid) firstInvalid = el
    }

    if (firstInvalid) {
      firstInvalid.focus()
      return
    }

    window.location.href = buildMailtoUrl({
      email: CONTACT_EMAIL,
      name: value('cf-name'),
      from: value('cf-email'),
      topic: value('cf-topic'),
      message: value('cf-message')
    }, t)
  })
}
