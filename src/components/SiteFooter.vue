<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SITE } from '@/config'
import { categories } from '@/data/resources'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container inner">
      <div class="col">
        <div class="title">{{ SITE.name }}</div>
        <p class="desc">{{ SITE.description }}</p>
      </div>

      <div class="col">
        <div class="col-title">资源分类</div>
        <ul class="links">
          <li v-for="category in categories" :key="category.id">
            <RouterLink :to="{ path: '/', query: { cat: category.id } }">
              {{ category.icon }} {{ category.name }}
            </RouterLink>
          </li>
        </ul>
      </div>

      <div class="col">
        <div class="col-title">站点</div>
        <ul class="links">
          <li><RouterLink to="/">全部资源</RouterLink></li>
          <li><RouterLink to="/about">关于本站</RouterLink></li>
          <li><RouterLink to="/about#disclaimer">免责声明</RouterLink></li>
        </ul>
      </div>
    </div>

    <div class="container bottom">
      <span>© {{ year }} {{ SITE.name }}　本站仅收录可公开传播的学习资料。</span>
      <span class="build">Powered by Vue · Hosted on Cloudflare Pages</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  border-top: 1px solid var(--border);
  background: var(--surface);
  padding-top: 36px;
}

.inner {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 32px;
  padding-bottom: 28px;
}

.title {
  font-weight: 650;
  font-size: 15px;
  margin-bottom: 8px;
}

.desc {
  color: var(--text-dim);
  font-size: 13.5px;
  max-width: 380px;
}

.col-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--text-soft);
  margin-bottom: 10px;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: 13.5px;
  color: var(--text-dim);
}

.links a:hover {
  color: var(--accent);
}

.bottom {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 8px;
  padding-top: 16px;
  padding-bottom: 24px;
  border-top: 1px solid var(--border);
  color: var(--text-dim);
  font-size: 12.5px;
}

@media (max-width: 720px) {
  .inner {
    grid-template-columns: 1fr;
    gap: 24px;
  }
}
</style>
