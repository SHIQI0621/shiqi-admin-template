import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import request from '@/utils/request'
import { generateRoutesFromMenus } from '@/utils/router'

export interface MenuItem {
  id: number
  path: string
  name: string
  title: string
  icon: string
  component?: string
  affix?: boolean
  children?: MenuItem[]
  isLink?: boolean
  linkUrl?: string
}

export const useMenuStore = defineStore('menu', () => {
  const menus = ref<MenuItem[]>([])
  const isLoaded = ref(false)
  const generatedRoutes = ref<RouteRecordRaw[]>([])

  /**
   * 获取菜单列表
   */
  async function fetchMenus() {
    try {
      const res = await request.get('/api/system/menu/list')
      menus.value = res.data || []
      isLoaded.value = true
    } catch (error) {
      console.error('获取菜单失败:', error)
    }
  }

  /**
   * 将原始菜单数据转换为侧边栏组件需要的格式
   * @param menu 原始菜单项
   * @returns 转换后的菜单项
   */
  function transformMenu(menu: MenuItem): any {
    return {
      path: menu.path,
      meta: {
        title: menu.title,
        icon: menu.icon,
        isLink: menu.isLink,
        linkUrl: menu.linkUrl,
      },
      children: menu.children?.map(child => transformMenu(child)) || [],
    }
  }

  /**
   * 清空菜单列表
   */
  function clearMenus() {
    menus.value = []
    generatedRoutes.value = []
    isLoaded.value = false
  }

  /**
   * 根据菜单数据生成路由
   * @returns 生成的路由配置数组
   */
  function generateRoutes(): RouteRecordRaw[] {
    if (menus.value.length === 0) {
      return []
    }
    
    const routes = generateRoutesFromMenus(menus.value)
    generatedRoutes.value = routes
    return routes
  }

  /**
   * 获取已生成的路由
   */
  const routes = computed(() => generatedRoutes.value)

  /**
   * 获取侧边栏菜单（包含图标）
   * @returns 侧边栏菜单项数组
   */
  const sidebarMenus = computed(() => {
    return menus.value.map(menu => transformMenu(menu))
  })

  /**
   * 获取顶部菜单（保留图标）
   * @returns 顶部菜单项数组
   */
  const topMenus = computed(() => {
    return menus.value.map(menu => transformMenu(menu))
  })

  /**
   * 查找当前路由对应的菜单标题
   * @param path 当前路由路径
   * @returns 菜单标题
   */
  function getMenuTitle(path: string): string {
    const findTitle = (items: MenuItem[]): string => {
      for (const item of items) {
        if (item.path === path) {
          return item.title
        }
        if (item.children && item.children.length) {
          const found = findTitle(item.children)
          if (found) return found
        }
      }
      return ''
    }
    return findTitle(menus.value)
  }

  return {
    menus,
    isLoaded,
    generatedRoutes,
    routes,
    fetchMenus,
    clearMenus,
    generateRoutes,
    sidebarMenus,
    topMenus,
    getMenuTitle,
  }
})
