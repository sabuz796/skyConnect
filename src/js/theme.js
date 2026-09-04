const STORAGE_KEY = 'skyconnect-theme'

export function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEY)
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
}

export function isDark() {
  return document.documentElement.classList.contains('dark')
}
