/**
 * ui.js — interactive UI wiring: header controls, modal, accordion,
 * reveal observers, gallery, back-to-top, lazy images, smooth scroll.
 */

import { setLanguage } from './i18n.js'
import { toggleTheme } from './theme.js'

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

export function initValidationModal() {
  function closeModal() {
    const modal = document.getElementById('validation-modal')
    if (modal) {
      modal.classList.remove('is-open')
      modal.classList.add('hidden')
    }
  }

  document.getElementById('modal-close')?.addEventListener('click', closeModal)
  document.getElementById('modal-backdrop')?.addEventListener('click', closeModal)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal()
  })
}

export function initAccordion() {
  document.querySelectorAll('.accordion-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const content = trigger.nextElementSibling
      const isOpen = content.classList.contains('is-open')
      const icon = trigger.querySelector('svg')

      // Close all others
      document.querySelectorAll('.accordion-content.is-open').forEach((openContent) => {
        if (openContent !== content) {
          openContent.classList.remove('is-open')
          const openTrigger = openContent.previousElementSibling
          if (openTrigger) {
            openTrigger.setAttribute('aria-expanded', 'false')
            const openSvg = openTrigger.querySelector('svg')
            if (openSvg) openSvg.style.transform = ''
          }
        }
      })

      if (isOpen) {
        content.classList.remove('is-open')
        trigger.setAttribute('aria-expanded', 'false')
        icon.style.transform = ''
      } else {
        content.classList.add('is-open')
        trigger.setAttribute('aria-expanded', 'true')
        icon.style.transform = 'rotate(180deg)'
      }
    })
  })
}

export function initRevealObserver(prefersReducedMotion) {
  if (!('IntersectionObserver' in window)) return

  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      const el = entry.target
      el.classList.add('is-visible')
      unifiedObserver.unobserve(el)
    })
  }

  const unifiedObserver = new IntersectionObserver(observerCallback, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  })

  // Observe all animated elements
  document.querySelectorAll('.reveal, .section-fade, [data-service-reveal], [data-trust-reveal], [data-faq-reveal], [data-study-reveal]').forEach((el) => {
    unifiedObserver.observe(el)
  })

  // Add entrance classes (CSS handles the animation)
  if (!prefersReducedMotion) {
    document.querySelectorAll('[data-service-reveal]').forEach((el) => el.classList.add('service-enter'))
    document.querySelectorAll('[data-trust-reveal]').forEach((el) => el.classList.add('trust-enter'))
    document.querySelectorAll('[data-faq-reveal]').forEach((el) => el.classList.add('faq-enter'))
    document.querySelectorAll('[data-study-reveal]').forEach((el) => el.classList.add('study-enter'))
  }
}

export function initGallery() {
  const galleryScroll = document.getElementById('gallery-scroll')
  const galleryPrev = document.getElementById('gallery-prev')
  const galleryNext = document.getElementById('gallery-next')

  if (!galleryScroll || !galleryPrev || !galleryNext) return

  function getCardWidth() {
    const card = galleryScroll.querySelector('.moment-card')
    if (!card) return 400
    return card.offsetWidth + parseFloat(getComputedStyle(galleryScroll).gap)
  }

  function updateGalleryButtons() {
    const { scrollLeft, scrollWidth, clientWidth } = galleryScroll
    galleryPrev.disabled = scrollLeft <= 10
    galleryNext.disabled = scrollLeft + clientWidth >= scrollWidth - 10
  }

  galleryPrev.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: -getCardWidth(), behavior: 'smooth' })
  })

  galleryNext.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: getCardWidth(), behavior: 'smooth' })
  })

  galleryScroll.addEventListener('scroll', updateGalleryButtons, { passive: true })
  updateGalleryButtons()

  // Reveal cards as they scroll into viewport
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, {
      root: galleryScroll,
      threshold: 0.3
    })

    galleryScroll.querySelectorAll('.moment-card').forEach((card) => {
      galleryObserver.observe(card)
    })
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

export function initBlurUpImages() {
  document.querySelectorAll('.blur-load').forEach((img) => {
    if (img.complete) {
      img.classList.add('is-loaded')
    } else {
      img.addEventListener('load', () => {
        img.classList.add('is-loaded')
      })
    }
  })
}

export function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href')
      if (targetId === '#') return
      const target = document.querySelector(targetId)
      if (target) {
        e.preventDefault()
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
        history.pushState(null, '', targetId)
      }
    })
  })
}
