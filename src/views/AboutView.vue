<script setup lang="ts">
import { SITE } from '@/config'
import { categories, resources } from '@/data/resources'
</script>

<template>
  <main class="page">
    <div class="container narrow">
      <h1 class="page-title">关于本站</h1>
      <p class="lead">{{ SITE.description }}</p>

      <section class="card block">
        <h2>站点简介</h2>
        <p>
          {{ SITE.name }} 是一个纯静态的学习资源下载站，目前收录 {{ resources.length }} 份资料，分为
          {{ categories.length }} 个分类：{{ categories.map((item) => item.name).join('、') }}。
        </p>
        <p>
          站点本身不运行后端服务，页面由 Cloudflare Pages 全球边缘节点分发，文件托管在独立的对象存储上，
          因此打开与下载都不需要排队等待。
        </p>
      </section>

      <section class="card block">
        <h2>收录标准</h2>
        <ul class="list">
          <li>优先收录学习、科研、办公场景下确实用得上的资料。</li>
          <li>所有文件在上架前都会本地校验，并公开 SHA256 值供下载后核对。</li>
          <li>不收录需要付费购买、含破解补丁或来源不明的资源。</li>
          <li>同一资料如有更新，保留历史版本说明，直接替换为最新文件。</li>
        </ul>
      </section>

      <section id="disclaimer" class="card block">
        <h2>免责声明</h2>
        <ul class="list">
          <li>本站仅提供资源索引与下载链接，不对文件内容的准确性、完整性作任何担保。</li>
          <li>所有资料均来自公开渠道或作者本人授权，仅供个人学习研究使用，请勿用于商业用途。</li>
          <li>若某份资料侵犯了你的合法权益，请通过下方联系方式告知，我们会在核实后第一时间删除。</li>
          <li>因下载、使用本站资源造成的任何直接或间接损失，本站不承担责任。</li>
        </ul>
      </section>

      <section class="card block">
        <h2>联系与反馈</h2>
        <p>
          链接失效、希望补充资料，或有其他建议，欢迎邮件联系：
          <a class="mail" :href="`mailto:${SITE.contact}`">{{ SITE.contact }}</a>
        </p>
        <p class="muted small">为方便定位，请附上资源页面地址与具体问题描述。</p>
      </section>

      <section class="card block">
        <h2>技术信息</h2>
        <ul class="list">
          <li>前端：Vue 3 + TypeScript + Vite，路由使用 History 模式。</li>
          <li>部署：Cloudflare Pages（自动 HTTPS、全球 CDN、免费额度内无限请求）。</li>
          <li>存储：对象存储直链，支持 Range 请求与断点续传。</li>
        </ul>
      </section>
    </div>
  </main>
</template>

<style scoped>
.narrow {
  max-width: 780px;
}

.page-title {
  font-size: 28px;
  font-weight: 680;
  letter-spacing: -0.02em;
}

.lead {
  margin-top: 10px;
  color: var(--text-dim);
}

.block {
  margin-top: 18px;
  padding: 20px 22px;
}

.block h2 {
  font-size: 15.5px;
  font-weight: 620;
  margin-bottom: 10px;
}

.block p {
  color: var(--text-soft);
  font-size: 14px;
}

.block p + p {
  margin-top: 8px;
}

.list {
  display: flex;
  flex-direction: column;
  gap: 7px;
  color: var(--text-soft);
  font-size: 14px;
}

.list li {
  position: relative;
  padding-left: 16px;
}

.list li::before {
  content: '';
  position: absolute;
  left: 2px;
  top: 0.68em;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent);
  opacity: 0.75;
}

.mail {
  color: var(--accent);
  font-weight: 550;
}

.mail:hover {
  text-decoration: underline;
}

.small {
  font-size: 13px;
}
</style>
