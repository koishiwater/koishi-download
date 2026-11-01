export type CategoryId = 'course' | 'software' | 'ebook' | 'template' | 'media' | 'other'

export interface Category {
  id: CategoryId
  name: string
  icon: string
  desc: string
}

export type FileFormat =
  | 'pdf'
  | 'docx'
  | 'xlsx'
  | 'pptx'
  | 'zip'
  | 'rar'
  | '7z'
  | 'exe'
  | 'msi'
  | 'dmg'
  | 'apk'
  | 'epub'
  | 'mp4'
  | 'png'
  | 'txt'
  | 'md'

export interface ResourceFile {
  name: string
  format: FileFormat
  /** 字节数 */
  size: number
  /** 相对 VITE_FILE_BASE 的路径，不要以斜杠开头 */
  path: string
  sha256?: string
}

export interface Resource {
  id: string
  title: string
  summary: string
  category: CategoryId
  tags: string[]
  version?: string
  /** ISO 日期，如 2026-10-12 */
  updatedAt: string
  downloads: number
  files: ResourceFile[]
}
