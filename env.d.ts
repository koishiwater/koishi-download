/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 资源文件根地址，例如 https://dl.koishi.example.com */
  readonly VITE_FILE_BASE?: string
  /** 站点公开地址，用于生成分享链接 */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
