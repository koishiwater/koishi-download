const FALLBACK_FILE_BASE = 'https://dl.koishi.example.com'
const FALLBACK_SITE_URL = 'https://koishi.example.com'

function trimTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '')
}

export const SITE = {
  name: 'koishi资料网',
  tagline: '校园学习资源，一次下载到位',
  description:
    '课程笔记、文档模板、学习软件与素材的免费下载站。所有资源均提供 SHA256 校验值，直链下载，无需等待。',
  fileBase: trimTrailingSlash(import.meta.env.VITE_FILE_BASE || FALLBACK_FILE_BASE),
  siteUrl: trimTrailingSlash(import.meta.env.VITE_SITE_URL || FALLBACK_SITE_URL),
  contact: 'koishi@example.com',
} as const

/** 把资源文件路径拼成完整下载地址 */
export function fileUrl(path: string): string {
  return `${SITE.fileBase}/${path.replace(/^\/+/, '')}`
}

/** 生成某个资源的分享链接 */
export function resourceShareUrl(id: string): string {
  return `${SITE.siteUrl}/resource/${id}`
}
