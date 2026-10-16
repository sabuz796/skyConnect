const STORAGE_KEY = 'skyconnect-theme'

export function initTheme() {
  let saved = null
  try { saved = localStorage.getItem(STORAGE_KEY) } catch {}
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

  if (saved === 'dark' || (!saved && prefersDark)) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

export function toggleTheme() {
  const isDark = document.documentElement.classList.toggle('dark')
  try { localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light') } catch {}
}

