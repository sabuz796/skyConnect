import en from '../i18n/en.json'
import sv from '../i18n/sv.json'
import bn from '../i18n/bn.json'

const translations = { en, sv, bn }
const languageFlags = { en: '🇬🇧', sv: '🇸🇪', bn: '🇧🇩' }

let currentLang = localStorage.getItem('skyconnect-lang') || 'en'

export function getLang() {
  return currentLang
}

export function t(key) {
  return translations[currentLang]?.[key] ?? translations.en[key] ?? key
}

export function setLanguage(lang) {
  if (!translations[lang]) return
  currentLang = lang
  localStorage.setItem('skyconnect-lang', lang)
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

  document.querySelectorAll('option[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n')
    const value = t(key)
    if (value) el.textContent = value
  })

  const langBtn = document.getElementById('current-lang')
  if (langBtn) langBtn.textContent = currentLang.toUpperCase()

  const langFlag = document.getElementById('current-lang-flag')
  if (langFlag) langFlag.textContent = languageFlags[currentLang] || '🌐'
}

export function initI18n() {
  applyTranslations()
}
