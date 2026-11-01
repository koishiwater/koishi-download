<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ResourceCard from '@/components/ResourceCard.vue'
import { categories, resources } from '@/data/resources'
import { SITE } from '@/config'
import { formatCount } from '@/utils/format'
import type { CategoryId } from '@/types'

const ALL = 'all'
type SortKey = 'updated' | 'downloads' | 'title'

const sortOptions: { value: SortKey; label: string }[] = [
  { value: 'updated', label: '最近更新' },
  { value: 'downloads', label: '下载最多' },
  { value: 'title', label: '名称排序' },
]

const route = useRoute()
const router = useRouter()

function isCategoryId(value: unknown): value is CategoryId {
  return typeof value === 'string' && categories.some((category) => category.id === value)
}

function isSortKey(value: unknown): value is SortKey {
  return value === 'updated' || value === 'downloads' || value === 'title'
}

const keyword = ref(typeof route.query.q === 'string' ? route.query.q : '')
const activeCategory = ref<CategoryId | typeof ALL>(
  isCategoryId(route.query.cat) ? route.query.cat : ALL,
)
const sortKey = ref<SortKey>(isSortKey(route.query.sort) ? route.query.sort : 'updated')

function buildQuery(): Record<string, string> {
  const query: Record<string, string> = {}
  if (keyword.value.trim()) query.q = keyword.value.trim()
  if (activeCategory.value !== ALL) query.cat = activeCategory.value
  if (sortKey.value !== 'updated') query.sort = sortKey.value
  return query
}

const isSameQuery = (next: Record<string, string>): boolean => {
  const current = route.query as Record<string, unknown>
  const nextKeys = Object.keys(next)
  return (
    nextKeys.length === Object.keys(current).length &&
    nextKeys.every((key) => current[key] === next[key])
  )
}

// 把筛选状态同步到地址栏，方便分享与刷新
watch([keyword, activeCategory, sortKey], () => {
  if (!isSameQuery(buildQuery())) router.replace({ query: buildQuery() })
})

// 支持从页脚 / 外部链接带参数进入
watch(
  () => route.query,
  (query) => {
    const nextKeyword = typeof query.q === 'string' ? query.q : ''
    const nextCategory = isCategoryId(query.cat) ? query.cat : ALL
    const nextSort = isSortKey(query.sort) ? query.sort : 'updated'
    if (nextKeyword !== keyword.value) keyword.value = nextKeyword
    if (nextCategory !== activeCategory.value) activeCategory.value = nextCategory
    if (nextSort !== sortKey.value) sortKey.value = nextSort
  },
)

const counts = computed<Record<string, number>>(() => {
  const map: Record<string, number> = { [ALL]: resources.length }
  for (const category of categories) {
    map[category.id] = resources.filter((resource) => resource.category === category.id).length
  }
  return map
})

const filtered = computed(() => {
  const kw = keyword.value.trim().toLowerCase()
  const result = resources.filter((resource) => {
    if (activeCategory.value !== ALL && resource.category !== activeCategory.value) return false
    if (!kw) return true
    const haystack = [
      resource.title,
      resource.summary,
      resource.version ?? '',
      ...resource.tags,
      ...resource.files.map((file) => file.name),
    ]
      .join(' ')
      .toLowerCase()
    return haystack.includes(kw)
  })

  return [...result].sort((a, b) => {
    if (sortKey.value === 'downloads') return b.downloads - a.downloads
    if (sortKey.value === 'title') return a.title.localeCompare(b.title, 'zh-Hans-CN')
    return b.updatedAt.localeCompare(a.updatedAt)
  })
})

const totalDownloads = computed(() =>
  resources.reduce((sum, resource) => sum + resource.downloads, 0),
)

const hasFilter = computed(() => keyword.value.trim() !== '' || activeCategory.value !== ALL)

function resetFilters(): void {
  keyword.value = ''
  activeCategory.value = ALL
  sortKey.value = 'updated'
}
</script>

<template>
  <main class="page">
    <div class="container">
      <section class="hero">
        <span class="badge">共 {{ resources.length }} 份资料 · 累计下载 {{ formatCount(totalDownloads) }}次</span>
        <h1 class="hero-title">{{ SITE.name }}</h1>
        <p class="hero-desc">{{ SITE.description }}</p>

        <div class="search">
          <svg class="search-icon" viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <circle cx="11" cy="11" r="6.5" fill="none" stroke="currentColor" stroke-width="1.9" />
            <path d="m16 16 4.2 4.2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" />
          </svg>
          <input
            v-model="keyword"
            class="search-input"
            type="search"
            placeholder="搜索课程笔记、模板、软件或文件名…"
            aria-label="搜索资源"
          />
          <button v-if="keyword" class="search-clear" type="button" @click="keyword = ''">
            清除
          </button>
        </div>
      </section>

      <section class="filter-bar">
        <div class="chips">
          <button
            class="chip"
            :class="{ active: activeCategory === ALL }"
            type="button"
            @click="activeCategory = ALL"
          >
            全部
            <span class="count">{{ counts[ALL] }}</span>
          </button>
          <button
            v-for="category in categories"
            :key="category.id"
            class="chip"
            :class="{ active: activeCategory === category.id }"
            type="button"
            @click="activeCategory = category.id"
          >
            <span>{{ category.icon }}</span>
            {{ category.name }}
            <span class="count">{{ counts[category.id] }}</span>
          </button>
        </div>
      </section>

      <section class="toolbar">
        <div class="result-count">
          {{ hasFilter ? `筛选出 ${filtered.length} 个资源` : `全部 ${filtered.length} 个资源` }}
        </div>
        <div class="sort">
          <button
            v-for="option in sortOptions"
            :key="option.value"
            class="sort-btn"
            :class="{ active: sortKey === option.value }"
            type="button"
            @click="sortKey = option.value"
          >
            {{ option.label }}
          </button>
        </div>
      </section>

      <section v-if="filtered.length" class="grid">
        <ResourceCard v-for="resource in filtered" :key="resource.id" :resource="resource" />
      </section>

      <section v-else class="empty">
        <span class="icon">🔍</span>
        <p>没有找到匹配的资料</p>
        <p class="muted">换个关键词，或者清除筛选条件看看全部资源。</p>
        <button class="btn btn-ghost btn-sm reset" type="button" @click="resetFilters">
          清除筛选
        </button>
      </section>

      <section class="notice card">
        <div class="notice-title">下载说明</div>
        <ul class="notice-list">
          <li>所有资源均可直接下载，无需注册、无需等待倒计时。</li>
          <li>每个文件都提供 SHA256 校验值，下载后可用 <span class="mono">certutil -hashfile</span> 核对完整性。</li>
          <li>若链接失效或需要补充资料，请通过「关于本站」页面联系。</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.hero {
  padding: 26px 0 30px;
  max-width: 720px;
}

.badge {
  display: inline-block;
  padding: 3px 12px;
  border-radius: 999px;
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 12.5px;
  font-weight: 550;
  margin-bottom: 14px;
}

.hero-title {
  font-size: 38px;
  font-weight: 720;
  letter-spacing: -0.02em;
  background: linear-gradient(120deg, var(--text) 30%, var(--accent));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-desc {
  margin-top: 10px;
  color: var(--text-dim);
  font-size: 15px;
}

.search {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 22px;
  padding: 0 8px 0 14px;
  height: 50px;
  background: var(--surface);
  border: 1px solid var(--border-strong);
  border-radius: 13px;
  box-shadow: var(--shadow-sm);
  transition: border-color 0.18s ease, box-shadow 0.18s ease;
}

.search:focus-within {
  border-color: var(--accent);
  box-shadow: 0 0 0 4px var(--accent-ring);
}

.search-icon {
  color: var(--text-dim);
  flex: none;
}

.search-input {
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  color: var(--text);
  font-size: 14.5px;
}

.search-input::placeholder {
  color: var(--text-dim);
}

.search-input::-webkit-search-cancel-button {
  display: none;
}

.search-clear {
  border: none;
  background: transparent;
  color: var(--text-dim);
  font-size: 13px;
  cursor: pointer;
  padding: 6px 8px;
  border-radius: 8px;
}

.search-clear:hover {
  color: var(--text);
  background: var(--surface-2);
}

.filter-bar {
  margin-bottom: 6px;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin: 24px 0 14px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border);
}

.result-count {
  font-size: 13.5px;
  color: var(--text-dim);
}

.sort {
  display: inline-flex;
  padding: 3px;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 10px;
}

.sort-btn {
  border: none;
  background: transparent;
  color: var(--text-dim);
  font-size: 13px;
  padding: 4px 12px;
  border-radius: 7px;
  cursor: pointer;
  transition: all 0.16s ease;
}

.sort-btn.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 550;
}

.empty .reset {
  margin-top: 16px;
}

.notice {
  margin-top: 40px;
  padding: 18px 20px;
}

.notice-title {
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 8px;
}

.notice-list {
  display: flex;
  flex-direction: column;
  gap: 5px;
  color: var(--text-dim);
  font-size: 13.5px;
}

.notice-list li::before {
  content: '·';
  margin-right: 8px;
  color: var(--accent);
  font-weight: 700;
}

@media (max-width: 640px) {
  .hero-title {
    font-size: 30px;
  }

  .toolbar {
    flex-wrap: wrap;
  }
}
</style>
