<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { categoryMap, resourceMap, resources } from '@/data/resources'
import { fileUrl, resourceShareUrl } from '@/config'
import { formatBytes, formatDate, formatCount, totalSize } from '@/utils/format'
import { copyText } from '@/utils/clipboard'

const route = useRoute()

const id = computed(() => String(route.params.id ?? ''))
const resource = computed(() => resourceMap.get(id.value))
const category = computed(() =>
  resource.value ? categoryMap[resource.value.category] : undefined,
)
const size = computed(() => (resource.value ? totalSize(resource.value.files) : 0))

const related = computed(() => {
  const current = resource.value
  if (!current) return []
  return resources
    .filter((item) => item.category === current.category && item.id !== current.id)
    .slice(0, 3)
})

const feedback = ref('')
let feedbackTimer: ReturnType<typeof setTimeout> | undefined

async function copy(value: string, label: string): Promise<void> {
  const ok = await copyText(value)
  feedback.value = ok ? `已复制${label}` : '复制失败，请手动选择'
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => (feedback.value = ''), 2000)
}

watch(id, () => {
  feedback.value = ''
})

onUnmounted(() => {
  if (feedbackTimer) clearTimeout(feedbackTimer)
})
</script>

<template>
  <main class="page">
    <div class="container">
      <template v-if="resource && category">
        <nav class="breadcrumb" aria-label="面包屑">
          <RouterLink to="/">全部资源</RouterLink>
          <span class="sep">/</span>
          <RouterLink :to="{ path: '/', query: { cat: category.id } }">
            {{ category.name }}
          </RouterLink>
          <span class="sep">/</span>
          <span class="current">{{ resource.title }}</span>
        </nav>

        <header class="head">
          <div class="head-main">
            <div class="meta-row">
              <span class="category">{{ category.icon }} {{ category.name }}</span>
              <span v-if="resource.version" class="tag">{{ resource.version }}</span>
            </div>
            <h1 class="title">{{ resource.title }}</h1>
            <p class="summary">{{ resource.summary }}</p>

            <div class="facts">
              <span>{{ resource.files.length }} 个文件</span>
              <span class="dot">·</span>
              <span>{{ formatBytes(size) }}</span>
              <span class="dot">·</span>
              <span>更新于 {{ formatDate(resource.updatedAt) }}</span>
              <span class="dot">·</span>
              <span>下载 {{ formatCount(resource.downloads) }}次</span>
            </div>

            <div class="tags">
              <span v-for="tag in resource.tags" :key="tag" class="tag">{{ tag }}</span>
            </div>
          </div>

          <div class="head-actions">
            <button class="btn btn-ghost" type="button" @click="copy(resourceShareUrl(resource.id), '分享链接')">
              复制分享链接
            </button>
          </div>
        </header>

        <section class="files card">
          <h2 class="files-title">文件列表</h2>
          <ul>
            <li v-for="file in resource.files" :key="file.path" class="file">
              <div class="file-main">
                <span class="format">{{ file.format }}</span>
                <div class="file-info">
                  <span class="file-name">{{ file.name }}</span>
                  <div class="file-sub">
                    <span>{{ formatBytes(file.size) }}</span>
                    <template v-if="file.sha256">
                      <span class="dot">·</span>
                      <span class="hash mono">SHA256 {{ file.sha256.slice(0, 16) }}…</span>
                      <button class="link-btn" type="button" @click="copy(file.sha256, '校验值')">
                        复制
                      </button>
                    </template>
                  </div>
                </div>
              </div>

              <div class="file-actions">
                <button
                  class="btn btn-ghost btn-sm"
                  type="button"
                  @click="copy(fileUrl(file.path), '下载链接')"
                >
                  复制链接
                </button>
                <a
                  class="btn btn-primary btn-sm"
                  :href="fileUrl(file.path)"
                  :download="file.name"
                  target="_blank"
                  rel="noopener"
                >
                  下载
                </a>
              </div>
            </li>
          </ul>
        </section>

        <section class="tip card">
          <strong>下载后请校验文件完整性</strong>
          <p class="muted">
            Windows 可在命令行执行
            <span class="mono">certutil -hashfile 文件名 SHA256</span>，输出结果与上方校验值一致即为完整。
            macOS 使用 <span class="mono">shasum -a 256 文件名</span>。
          </p>
        </section>

        <section v-if="related.length" class="related">
          <h2 class="section-title">同类资料</h2>
          <ul class="related-list">
            <li v-for="item in related" :key="item.id">
              <RouterLink :to="`/resource/${item.id}`" class="related-item card">
                <span class="related-title">{{ item.title }}</span>
                <span class="muted">{{ formatDate(item.updatedAt) }} · {{ formatBytes(totalSize(item.files)) }}</span>
              </RouterLink>
            </li>
          </ul>
        </section>

        <Transition name="fade">
          <div v-if="feedback" class="toast">{{ feedback }}</div>
        </Transition>
      </template>

      <div v-else class="empty">
        <span class="icon">📦</span>
        <p>这个资源不存在或已下架</p>
        <RouterLink class="btn btn-primary btn-sm" to="/">返回全部资源</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 7px;
  font-size: 13px;
  color: var(--text-dim);
  margin-bottom: 22px;
}

.breadcrumb a:hover {
  color: var(--accent);
}

.sep {
  opacity: 0.5;
}

.current {
  color: var(--text-soft);
}

.head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  padding-bottom: 24px;
  border-bottom: 1px solid var(--border);
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.category {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 3px 10px;
  border-radius: var(--radius-sm);
  background: var(--accent-soft);
  color: var(--accent);
  font-size: 12.5px;
  font-weight: 550;
}

.title {
  font-size: 28px;
  font-weight: 680;
  letter-spacing: -0.02em;
}

.summary {
  margin-top: 10px;
  color: var(--text-soft);
  max-width: 720px;
}

.facts {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-size: 13px;
  color: var(--text-dim);
}

.dot {
  opacity: 0.45;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 14px;
}

.head-actions {
  flex: none;
}

.files {
  margin-top: 26px;
  padding: 18px 20px;
}

.files-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 12px;
}

.file {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 13px 0;
  border-top: 1px dashed var(--border);
}

.file:first-child {
  border-top: none;
  padding-top: 4px;
}

.file-main {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
}

.format {
  flex: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 10px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  font-size: 10.5px;
  font-weight: 700;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  color: var(--accent);
}

.file-info {
  min-width: 0;
}

.file-name {
  display: block;
  font-size: 14px;
  font-weight: 500;
  word-break: break-all;
}

.file-sub {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: 2px;
  font-size: 12px;
  color: var(--text-dim);
}

.hash {
  color: var(--text-dim);
}

.link-btn {
  border: none;
  background: transparent;
  padding: 0 2px;
  color: var(--accent);
  font-size: 12px;
  cursor: pointer;
}

.link-btn:hover {
  text-decoration: underline;
}

.file-actions {
  display: flex;
  gap: 8px;
  flex: none;
}

.tip {
  margin-top: 18px;
  padding: 16px 20px;
  font-size: 13.5px;
  color: var(--text-soft);
}

.tip strong {
  display: block;
  margin-bottom: 4px;
  color: var(--text);
}

.related {
  margin-top: 34px;
}

.related-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.related-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 14px 16px;
  font-size: 13px;
  transition: border-color 0.18s ease, transform 0.18s ease;
}

.related-item:hover {
  border-color: var(--accent);
  transform: translateY(-1px);
}

.related-title {
  font-size: 14px;
  font-weight: 550;
  color: var(--text);
}

.toast {
  position: fixed;
  left: 50%;
  bottom: 36px;
  transform: translateX(-50%);
  padding: 9px 18px;
  border-radius: 999px;
  background: var(--text);
  color: var(--bg);
  font-size: 13px;
  box-shadow: var(--shadow-md);
  z-index: 50;
}

@media (max-width: 640px) {
  .head {
    flex-direction: column;
  }

  .title {
    font-size: 23px;
  }

  .file {
    flex-direction: column;
    align-items: stretch;
  }

  .file-actions {
    justify-content: flex-end;
  }
}
</style>
