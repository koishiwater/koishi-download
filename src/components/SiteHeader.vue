<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SITE } from '@/config'
import { useTheme } from '@/composables/useTheme'

const { theme, toggle } = useTheme()
</script>

<template>
  <header class="header">
    <div class="container inner">
      <RouterLink to="/" class="brand">
        <svg class="logo" viewBox="0 0 64 64" aria-hidden="true">
          <defs>
            <linearGradient id="logo-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stop-color="#6d8bff" />
              <stop offset="1" stop-color="#4f6ef7" />
            </linearGradient>
          </defs>
          <rect width="64" height="64" rx="16" fill="url(#logo-gradient)" />
          <path
            d="M32 14v22m0 0 10-10m-10 10L22 26"
            fill="none"
            stroke="#fff"
            stroke-width="5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path d="M18 44h28" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" />
        </svg>
        <span class="name">{{ SITE.name }}</span>
      </RouterLink>

      <nav class="nav">
        <RouterLink to="/" class="nav-link">全部资源</RouterLink>
        <RouterLink to="/about" class="nav-link">关于本站</RouterLink>
        <button
          class="theme-toggle"
          type="button"
          :aria-label="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
          :title="theme === 'dark' ? '切换到浅色模式' : '切换到深色模式'"
          @click="toggle"
        >
          <svg v-if="theme === 'dark'" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="12" cy="12" r="4.2" fill="currentColor" />
            <g stroke="currentColor" stroke-width="1.8" stroke-linecap="round">
              <path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2" />
              <path d="M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4L17 7M7 17l-1.6 1.6" />
            </g>
          </svg>
          <svg v-else viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path
              d="M20.5 14.6A8.6 8.6 0 1 1 9.4 3.5a6.9 6.9 0 0 0 11.1 11.1Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: sticky;
  top: 0;
  z-index: 20;
  height: var(--header-height);
  display: flex;
  align-items: center;
  background: color-mix(in srgb, var(--bg) 82%, transparent);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid var(--border);
}

.inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-weight: 650;
  font-size: 16px;
  letter-spacing: -0.01em;
}

.logo {
  width: 28px;
  height: 28px;
  flex: none;
}

.nav {
  display: flex;
  align-items: center;
  gap: 6px;
}

.nav-link {
  padding: 6px 12px;
  border-radius: var(--radius-sm);
  color: var(--text-dim);
  font-size: 14px;
  transition: color 0.18s ease, background-color 0.18s ease;
}

.nav-link:hover {
  color: var(--text);
  background: var(--surface-2);
}

.nav-link.router-link-active {
  color: var(--accent);
  background: var(--accent-soft);
  font-weight: 550;
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  margin-left: 4px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: var(--surface);
  color: var(--text-soft);
  cursor: pointer;
  transition: color 0.18s ease, border-color 0.18s ease, background-color 0.18s ease;
}

.theme-toggle:hover {
  color: var(--accent);
  border-color: var(--accent);
  background: var(--accent-soft);
}

@media (max-width: 480px) {
  .name {
    display: none;
  }
}
</style>
