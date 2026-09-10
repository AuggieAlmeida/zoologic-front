export type ThemePreference = 'light' | 'dark' | 'system'

export const THEME_STORAGE_KEY = 'zoologic-theme'

export function getThemePreference(): ThemePreference {
  const saved = window.localStorage.getItem(THEME_STORAGE_KEY)
  return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system'
}

export function applyTheme(preference: ThemePreference) {
  const isDark = preference === 'dark'
    || (preference === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

  document.documentElement.classList.toggle('dark', isDark)
}

export function saveThemePreference(preference: ThemePreference) {
  window.localStorage.setItem(THEME_STORAGE_KEY, preference)
  applyTheme(preference)
}
