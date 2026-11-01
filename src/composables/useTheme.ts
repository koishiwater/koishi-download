import { ref } from 'vue'

export type Theme = 'light' | 'dark'

const STORAGE_KEY = 'koishi-theme'

const theme = ref<Theme>('light')
let initialized = false

function apply(value: Theme): void {
  document.documentElement.dataset.theme = value
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // 隐私模式下 localStorage 不可写，忽略
  }
}

function resolveInitialTheme(): Theme {
  const saved = document.documentElement.dataset.theme
  if (saved === 'light' || saved === 'dark') return saved
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function useTheme() {
  if (!initialized) {
    theme.value = resolveInitialTheme()
    apply(theme.value)
    initialized = true
  }

  function toggle(): void {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
    apply(theme.value)
  }

  return { theme, toggle }
}
