<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink } from 'vue-router'
import type { Resource } from '@/types'
import { categoryMap } from '@/data/resources'
import { fileUrl } from '@/config'
import { formatBytes, formatCount, formatDate, totalSize } from '@/utils/format'

const props = defineProps<{ resource: Resource }>()

const category = computed(() => categoryMap[props.resource.category])
const size = computed(() => totalSize(props.resource.files))
const primaryFile = computed(() => props.resource.files[0])
</script>

<template>
  <article class="card resource-card">
    <div class="head">
      <span class="category">
        <span class="emoji">{{ category.icon }}</span>
        {{ category.name }}
      </span>
      <span v-if="resource.version" class="tag">{{ resource.version }}</span>
    </div>

    <h3 class="title">
      <RouterLink :to="`/resource/${resource.id}`" class="title-link">
        {{ resource.title }}
      </RouterLink>
    </h3>

    <p class="summary">{{ resource.summary }}</p>

    <div class="tags">
      <span v-for="tag in resource.tags.slice(0, 3)" :key="tag" class="tag">{{ tag }}</span>
    </div>

    <div class="foot">
      <div class="stats">
        <span>{{ resource.files.length }} 个文件 · {{ formatBytes(size) }}</span>
        <span class="dim">更新于 {{ formatDate(resource.updatedAt) }} · ↓ {{ formatCount(resource.downloads) }}</span>
      </div>
      <a
        v-if="primaryFile"
        class="btn btn-primary btn-sm download"
        :href="fileUrl(primaryFile.path)"
        :download="primaryFile.name"
        target="_blank"
        rel="noopener"
      >
        下载
      </a>
    </div>
  </article>
</template>

<style scoped>
.resource-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 18px 18px 16px;
  transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
}

.resource-card:hover {
  transform: translateY(-2px);
  border-color: var(--border-strong);
  box-shadow: var(--shadow-md);
}

.head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.category {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-size: 12.5px;
  color: var(--accent);
  background: var(--accent-soft);
  border-radius: var(--radius-sm);
  padding: 3px 9px;
  font-weight: 550;
}

.emoji {
  font-size: 13px;
}

.title {
  font-size: 16px;
  font-weight: 600;
}

.title-link::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: var(--radius);
}

.title-link:hover {
  color: var(--accent);
}

.summary {
  color: var(--text-dim);
  font-size: 13.5px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: auto;
  padding-top: 10px;
  border-top: 1px dashed var(--border);
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 1px;
  font-size: 12.5px;
  color: var(--text-soft);
}

.dim {
  color: var(--text-dim);
  font-size: 12px;
}

.download {
  position: relative;
  z-index: 1;
}
</style>
