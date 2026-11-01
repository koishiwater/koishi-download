import type { ResourceFile } from '@/types'

const UNITS = ['B', 'KB', 'MB', 'GB', 'TB'] as const

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B'
  let value = bytes
  let unit = 0
  while (value >= 1024 && unit < UNITS.length - 1) {
    value /= 1024
    unit += 1
  }
  const digits = value >= 100 || unit === 0 ? 0 : 1
  return `${value.toFixed(digits)} ${UNITS[unit]}`
}

export function totalSize(files: ResourceFile[]): number {
  return files.reduce((sum, file) => sum + file.size, 0)
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  if (Number.isNaN(date.getTime())) return iso
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function formatCount(count: number): string {
  if (count >= 10000) {
    const value = count / 10000
    return `${value >= 10 ? value.toFixed(0) : value.toFixed(1)} 万`
  }
  return String(count)
}

/** 文件名后缀 → 展示用的格式标识 */
export function extensionOf(name: string): string {
  const index = name.lastIndexOf('.')
  return index === -1 ? 'file' : name.slice(index + 1).toLowerCase()
}
