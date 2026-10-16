import en from '../i18n/en.json'
import sv from '../i18n/sv.json'
import bn from '../i18n/bn.json'

const translations = { en, sv, bn }
const languageFlags = { en: '🌐', sv: '🇸🇪', bn: '🇧🇩' }

let currentLang = 'en'
try { currentLang = localStorage.getItem('skyconnect-lang') || 'en' } catch {}

export function t(key) {
  return translations[currentLang]?.[key] ?? translations.en[key] ?? key
}

export function setLanguage(lang) {
  if (!translations[lang]) return
  currentLang = lang
  try { localStorage.setItem('skyconnect-lang', lang) } catch {}
  document.documentElement.lang = lang
  applyTranslations()
  window.dispatchEvent(new CustomEvent('languagechange', { detail: lang }))
}

export function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    const value = t(key)
    if (value) el.textContent = value
  })

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder')
    const value = t(key)
    if (value) el.placeholder = value
  })

  const langBtn = document.getElementById('current-lang')
  if (langBtn) langBtn.textContent = currentLang.toUpperCase()

  const langFlag = document.getElementById('current-lang-flag')
  if (langFlag) langFlag.textContent = languageFlags[currentLang] || '🌐'
}

export function initI18n() {
  applyTranslations()
}
