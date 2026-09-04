import './styles/main.css'
import { renderApp } from './app.js'
import { HeroForm } from './components/HeroForm.js'
import { initI18n, applyTranslations } from './js/i18n.js'
import { initTheme } from './js/theme.js'
import { initHeroGlow, initTiltCards, initStudyArrows, initFloatingWhatsappEntrance } from './js/effects.js'
import {
  initHeaderControls,
  initValidationModal,
  initAccordion,
  initRevealObserver,
  initGallery,
  initBackToTop,
  initBlurUpImages,
  initSmoothScroll
} from './js/ui.js'
import { WHATSAPP_NUMBER, PHONE_NUMBER, PHONE_LINK } from './js/config.js'

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Render the app
document.getElementById('app').innerHTML = renderApp({
  whatsappNumber: WHATSAPP_NUMBER,
  phoneNumber: PHONE_NUMBER,
  phoneLink: PHONE_LINK,
})

// Init theme & i18n
initTheme()
initI18n()

// ========== HERO FORM ==========
const heroForm = new HeroForm({ lang: document.documentElement.lang || 'en' })
const heroFormContainer = document.getElementById('hero-form')
if (heroFormContainer) {
  heroFormContainer.innerHTML = heroForm.render()
  heroForm.bindEvents(heroFormContainer)
}

// Re-apply translations after language change
window.addEventListener('languagechange', () => {
  applyTranslations()
  heroForm.setLanguage(document.documentElement.lang || 'en')
})

// ========== EFFECTS ==========
initHeroGlow(prefersReducedMotion)
initTiltCards(prefersReducedMotion)
initStudyArrows(prefersReducedMotion)
initFloatingWhatsappEntrance(prefersReducedMotion)

// ========== UI ==========
initHeaderControls()
initValidationModal()
initAccordion()
initRevealObserver(prefersReducedMotion)
initGallery()
initBackToTop()
initBlurUpImages()
initSmoothScroll()
