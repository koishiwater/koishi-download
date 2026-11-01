# koishi资料网

[![build](https://github.com/koishiwater/koishi-download/actions/workflows/build.yml/badge.svg)](https://github.com/koishiwater/koishi-download/actions/workflows/build.yml)

一个纯静态的学习资源下载站：Vue 3 + TypeScript + Vite 构建，部署在 Cloudflare Pages，文件托管在对象存储（推荐 Cloudflare R2），无需后端、无需数据库。

## 功能

- 资源卡片列表：分类筛选、关键词搜索、按更新时间 / 下载量 / 名称排序
- 筛选状态同步到地址栏（`?q=`、`?cat=`、`?sort=`），可直接分享
- 资源详情页：文件列表、体积、SHA256 校验值一键复制、分享链接
- 浅色 / 深色主题切换，跟随系统偏好并记忆选择
- 响应式布局，移动端可用
- 全站静态，无后端依赖

## 目录结构

```
├─ public/
│  ├─ _headers        # Cloudflare Pages 响应头（缓存 + 安全头）
│  ├─ _redirects      # SPA 回退，保证 History 路由可直接访问
│  ├─ favicon.svg
│  └─ robots.txt
├─ src/
│  ├─ assets/main.css # 设计变量与通用样式
│  ├─ components/     # SiteHeader / SiteFooter / ResourceCard
│  ├─ composables/    # useTheme
│  ├─ data/resources.ts  # ★ 资源清单（唯一需要日常维护的数据文件）
│  ├─ router/
│  ├─ utils/          # 格式化、剪贴板
│  ├─ views/          # 首页 / 详情 / 关于 / 404
│  ├─ config.ts       # 站点信息与下载地址拼接
│  └─ types.ts
├─ wrangler.toml
└─ vite.config.ts
```

## 本地开发

```bash
npm install
npm run dev        # 开发服务器
npm run type-check # 类型检查
npm run build      # 类型检查 + 生产构建，产物在 dist/
npm run preview    # 本地预览构建产物
```

> 要求 Node 20+（本项目在 Node 24 下验证通过）。

## 配置下载地址

复制 `.env.example` 为 `.env.local`，修改为你的文件存储域名：

```bash
VITE_FILE_BASE=https://dl.your-domain.com
VITE_SITE_URL=https://your-domain.com
```

- `VITE_FILE_BASE`：资源文件根地址。页面中的下载链接 = `VITE_FILE_BASE` + 资源的 `path`。
- `VITE_SITE_URL`：站点公开地址，用于「复制分享链接」。

不配置时会回落到 `src/config.ts` 里的示例域名，正式上线前务必改掉。

## 添加一份新资源

编辑 `src/data/resources.ts`，往 `resources` 数组里追加一项：

```ts
{
  id: 'my-resource',            // 唯一，作为 /resource/:id 的路径
  title: '资源标题',
  summary: '一两句话介绍，列表页显示两行',
  category: 'course',           // course | template | software | ebook | media | other
  tags: ['标签一', '标签二'],
  version: '2026 版',            // 可选
  updatedAt: '2026-11-01',      // ISO 日期
  downloads: 0,
  files: [
    {
      name: '资源文件名.pdf',
      format: 'pdf',
      size: 1048576,            // 字节数
      path: 'course/my-resource/file.pdf',  // 相对 VITE_FILE_BASE，不要以 / 开头
      sha256: '....',           // 可选，填了才会显示校验值
    },
  ],
}
```

生成校验值（Windows PowerShell）：

```powershell
Get-FileHash .\资源文件名.pdf -Algorithm SHA256 | Select-Object -ExpandProperty Hash
```

然后把文件按 `path` 上传到对象存储对应目录即可。

## 部署到 Cloudflare Pages

### 方式一：连接 Git 仓库（推荐，推送即部署）

1. 在 Cloudflare 控制台 → Workers & Pages → 创建 → Pages → 连接到 Git，选择本仓库。
2. 构建设置：
   - 框架预设：`Vue`
   - 构建命令：`npm run build`
   - 构建输出目录：`dist`
3. 保存并部署。之后的每次 `git push` 都会自动构建。

### 方式二：本地命令行直传

```bash
npm i -D wrangler
npx wrangler login
npm run deploy        # = npm run build && wrangler pages deploy dist
```

`wrangler.toml` 里已声明 `pages_build_output_dir = "dist"`，首次部署会让选择或创建项目名。

### 自定义域名

Pages 项目 → 自定义域 → 添加域名，按提示在 DNS 里加 CNAME。绑定后 Cloudflare 会自动签发 HTTPS 证书。

## 对象存储（Cloudflare R2）配置要点

1. 创建存储桶 → 设置 → 开启**公开访问**，并绑定自定义域名（如 `dl.your-domain.com`）。
   直接用 `*.r2.dev` 域名会有频率限制，且部分网络访问不稳定。
2. 配置 CORS，允许你的站点域名读取文件：
   ```json
   [
     {
       "AllowedOrigins": ["https://your-domain.com"],
       "AllowedMethods": ["GET", "HEAD"],
       "AllowedHeaders": ["*"],
       "MaxAgeSeconds": 86400
     }
   ]
   ```
3. 需要强制浏览器下载而不是在线预览时，给对象设置元数据
   `Content-Disposition: attachment; filename="文件名"`。
4. R2 不计出站流量费用，免费额度 10GB 存储，个人下载站基本用不完。

> 也可以用 GitHub Releases、阿里云 OSS、腾讯云 COS 等，只要把 `VITE_FILE_BASE` 指向对应域名即可。

## 免责声明

本站仅提供可公开传播的学习资料索引，所有资源请勿用于商业用途。若内容侵犯你的权益，请联系站点管理员删除。
