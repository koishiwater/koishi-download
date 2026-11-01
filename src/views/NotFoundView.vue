<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="page">
    <div class="container center">
      <div class="code">404</div>
      <h1>页面走丢了</h1>
      <p class="muted">你访问的地址不存在，或者对应资源已经下架。</p>
      <div class="actions">
        <RouterLink class="btn btn-primary" to="/">回到全部资源</RouterLink>
        <RouterLink class="btn btn-ghost" to="/about">了解本站</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.center {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 52vh;
  text-align: center;
}

.code {
  font-size: 84px;
  font-weight: 750;
  line-height: 1;
  letter-spacing: -0.04em;
  background: linear-gradient(120deg, var(--accent), var(--text));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

h1 {
  font-size: 22px;
  font-weight: 620;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 12px;
}
</style>
