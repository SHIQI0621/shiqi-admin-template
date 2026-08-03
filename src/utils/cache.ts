import { TOKEN_KEY } from '@/setting'
import type { UserInfo } from '@/types'

/**
 * 缓存 Key 统一管理
 * 所有缓存相关的 key 在此处集中定义，避免硬编码散落在各处
 */
export const CacheKeys = {
  /** Token */
  TOKEN: TOKEN_KEY,
  /** 用户信息 */
  USER_INFO: 'userInfo',
  /** 主题配置 */
  THEME: 'themeConfig',
  /** 布局配置 */
  LAYOUT: 'layoutConfig',
} as const

export type CacheKey = (typeof CacheKeys)[keyof typeof CacheKeys]

/** 存储类型：localStorage | sessionStorage */
export type StorageType = 'local' | 'session'

function getStorage(type: StorageType = 'local'): Storage {
  return type === 'local' ? localStorage : sessionStorage
}

/**
 * 设置缓存
 * - 对象/数组会自动 JSON 序列化
 * - 值为 null/undefined 时自动删除该 key
 */
export function setCache(key: string, value: unknown, type: StorageType = 'local'): void {
  const storage = getStorage(type)
  if (value === null || value === undefined) {
    storage.removeItem(key)
    return
  }
  const serialized = typeof value === 'string' ? value : JSON.stringify(value)
  storage.setItem(key, serialized)
}

/**
 * 获取缓存
 * - 自动尝试 JSON 反序列化
 * - 解析失败时返回原始字符串
 */
export function getCache<T = unknown>(key: string, type: StorageType = 'local'): T | null {
  const storage = getStorage(type)
  const value = storage.getItem(key)
  if (value === null || value === undefined) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return value as unknown as T
  }
}

/**
 * 删除指定缓存
 */
export function removeCache(key: string, type: StorageType = 'local'): void {
  getStorage(type).removeItem(key)
}

/**
 * 清空所有缓存
 */
export function clearCache(type: StorageType = 'local'): void {
  getStorage(type).clear()
}

// ==================== Token 快捷方法 ====================

/** 获取 Token */
export function getToken(): string | null {
  return getCache<string>(CacheKeys.TOKEN)
}

/** 设置 Token */
export function setToken(token: string): void {
  setCache(CacheKeys.TOKEN, token)
}

/** 删除 Token */
export function removeToken(): void {
  removeCache(CacheKeys.TOKEN)
}

// ==================== 用户信息快捷方法 ====================

/** 获取用户信息 */
export function getUserInfo(): UserInfo | null {
  return getCache<UserInfo>(CacheKeys.USER_INFO)
}

/** 设置用户信息 */
export function setUserInfo(user: UserInfo): void {
  setCache(CacheKeys.USER_INFO, user)
}

/** 删除用户信息 */
export function removeUserInfo(): void {
  removeCache(CacheKeys.USER_INFO)
}

/** 清空登录态（token + userInfo） */
export function clearAuth(): void {
  removeToken()
  removeUserInfo()
}
