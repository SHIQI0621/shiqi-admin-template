import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import request from '@/utils/request'
import { useMenuStore } from './menu'
import {
  getToken,
  setToken,
  getUserInfo,
  setUserInfo,
  clearAuth,
} from '@/utils/cache'
import type { UserInfo, LoginResponse } from '@/types'

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(getToken())
  const userInfo = ref<UserInfo | null>(getUserInfo())

  const isLoggedIn = computed(() => !!token.value)
  const roles = computed(() => userInfo.value?.roles ?? [])
  const permissions = computed(() => userInfo.value?.permissions ?? [])

  /**
   * 登录
   * @param username 用户名
   * @param password 密码
   * @returns 登录响应
   */
  async function login(username: string, password: string) {
    const res = await request.post<any, LoginResponse>('/api/auth/login', {
      username,
      password,
    })

    token.value = res.token
    setToken(res.token)

    userInfo.value = res.user
    setUserInfo(res.user)

    return res
  }

  /**
   * 获取用户信息
   * @returns 用户信息
   */
  async function fetchUserInfo() {
    const res = await request.get<any, UserInfo>('/api/auth/userinfo')
    userInfo.value = res
    setUserInfo(res)
    return res
  }

  /**
   * 退出登录
   */
  async function logout() {
    try {
      await request.post('/api/auth/logout')
    } catch {
      // 即使接口失败也清理本地状态
    }
    clearState()
  }

  /**
   * 清除用户状态
   */
  function clearState() {
    token.value = null
    userInfo.value = null
    clearAuth()
    // 清空菜单
    const menuStore = useMenuStore()
    menuStore.clearMenus()
  }

  /**
   * 检查用户是否有指定权限
   * @param permission 权限字符串
   * @returns 是否有该权限
   */
  function hasPermission(permission: string): boolean {
    if (!permissions.value.length) return false
    if (permissions.value.includes('*:*:*')) return true
    return permissions.value.includes(permission)
  }

  /**
   * 检查用户是否有指定角色
   * @param role 角色字符串
   * @returns 是否有该角色
   */
  function hasRole(role: string): boolean {
    if (!roles.value.length) return false
    if (roles.value.includes('admin')) return true
    return roles.value.includes(role)
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    roles,
    permissions,
    login,
    fetchUserInfo,
    logout,
    clearState,
    hasPermission,
    hasRole,
  }
})
