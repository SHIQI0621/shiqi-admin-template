import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'
import { MAX_CACHE_COUNT } from '@/setting'

interface VisitedView {
  path: string
  fullPath: string
  name?: string
  title: string
  query?: Record<string, any>
  meta?: {
    title?: string
    affix?: boolean
    icon?: string
  }
}

export const useTagsViewStore = defineStore('tagsView', () => {
  const visitedViews = ref<VisitedView[]>([])

  const affixTagPaths = ['/dashboard']

  const cachedViews = ref<string[]>([])

  /**
   * 解析路由路径，确保路径以斜杠开头
   * @param base 基础路径
   * @param path 路径片段
   * @returns 完整路径
   */
  function resolvePath(base: string, path: string): string {
    if (path.startsWith('/')) return path
    const baseWithSlash = base.endsWith('/') ? base : base + '/'
    return baseWithSlash + path
  }

  /**
   * 过滤出需要添加到标签页的路由
   * @param routes 路由数组
   * @param basePath 基础路径
   * @returns 过滤后的路由数组
   */
  function filterAffixTags(routes: any[], basePath = ''): VisitedView[] {
    const tags: VisitedView[] = []
    routes.forEach((route) => {
      const fullPath = resolvePath(basePath, route.path)
      if (route.meta?.affix) {
        tags.push({
          fullPath,
          path: fullPath,
          name: route.name,
          title: route.meta?.title || 'no-name',
          meta: route.meta,
        })
      }
      if (route.children) {
        const tempTags = filterAffixTags(route.children, fullPath)
        if (tempTags.length >= 1) {
          tags.push(...tempTags)
        }
      }
    })
    return tags
  }

  /**
   * 查找指定路径的路由
   * @param routes 路由数组
   * @param path 路径
   * @returns 路由对象或 null
   */
  function findRouteByPath(routes: any[], path: string): any | null {
    for (const route of routes) {
      const routePath = route.path.startsWith('/')
        ? route.path
        : `/${route.path}`
      if (routePath === path) return route
      if (route.children) {
        const found = findRouteByPath(route.children, path)
        if (found) return found
      }
    }
    return null
  }

  /**
   * 初始化标签页
   */
  function initAffixTags() {
    const routes = router.options.routes as any[]
    const affixTags = filterAffixTags(routes)
    for (const tag of affixTags) {
      if (!visitedViews.value.some((v) => v.path === tag.path)) {
        visitedViews.value.push(tag)
      }
    }
    for (const path of affixTagPaths) {
      if (!visitedViews.value.some((v) => v.path === path)) {
        const route = findRouteByPath(routes, path)
        if (route) {
          visitedViews.value.push({
            path,
            fullPath: path,
            name: route.name,
            title: route.meta?.title || 'no-name',
            meta: route.meta,
          })
        }
      }
    }
  }

  /**
   * 添加标签页
   * @param view 标签页视图
   */
  function addView(view: VisitedView) {
    // 跳过不需要添加到标签页的路由（如redirect路由）
    if ((view.meta as { noTagsView?: boolean })?.noTagsView) return
    // 额外检查：跳过路径包含 redirect 的路由（使用 fullPath 检查，确保覆盖所有情况）
    if (view.fullPath.includes('/redirect')) return
    // 额外检查：跳过名称为 Redirect 的路由
    if (view.name === 'Redirect') return
    if (visitedViews.value.some((v) => v.path === view.path)) return
    visitedViews.value.push({
      ...view,
      title: view.meta?.title || view.title || 'no-name',
    })
    updateCachedViews(view)
  }

  /**
   * 更新缓存视图
   * @param view 标签页视图
   */
  function updateCachedViews(view: VisitedView) {
    const componentName = view.name as string | undefined
    if (!componentName) return

    if (affixTagPaths.includes(view.path)) {
      if (!cachedViews.value.includes(componentName)) {
        cachedViews.value.push(componentName)
      }
      return
    }

    const index = cachedViews.value.indexOf(componentName)
    if (index > -1) {
      cachedViews.value.splice(index, 1)
    }
    cachedViews.value.push(componentName)

    const nonAffixCached = cachedViews.value.filter(
      (name) => !isAffixName(name)
    )
    const affixCached = cachedViews.value.filter((name) =>
      isAffixName(name)
    )

    if (nonAffixCached.length > MAX_CACHE_COUNT) {
      const toRemove = nonAffixCached.slice(0, nonAffixCached.length - MAX_CACHE_COUNT)
      cachedViews.value = [...affixCached, ...nonAffixCached.slice(nonAffixCached.length - MAX_CACHE_COUNT)]
      for (const name of toRemove) {
        const view = visitedViews.value.find((v) => v.name === name)
        if (view && !affixTagPaths.includes(view.path)) {
          const idx = visitedViews.value.findIndex((v) => v.name === name)
          if (idx > -1) {
            visitedViews.value.splice(idx, 1)
          }
        }
      }
    }
  }

  /**
   * 判断是否为固定标签页
   * @param name 标签页名称
   * @returns 是否为固定标签页
   */
  function isAffixName(name: string): boolean {
    const view = visitedViews.value.find((v) => v.name === name)
    if (!view) return false
    return affixTagPaths.includes(view.path) || view.meta?.affix === true
  }

  /**
   * 删除标签页
   * @param path 标签页路径
   */
  function removeView(path: string) {
    const index = visitedViews.value.findIndex((v) => v.path === path)
    if (index > -1) {
      const view = visitedViews.value[index]
      if (view.name) {
        const cachedIndex = cachedViews.value.indexOf(view.name as string)
        if (cachedIndex > -1) {
          cachedViews.value.splice(cachedIndex, 1)
        }
      }
      visitedViews.value.splice(index, 1)
    }
  }

  /**
   * 删除其他标签页
   * @param path 标签页路径
   */
  function removeOthers(path: string) {
    const removedViews = visitedViews.value.filter(
      (v) => !affixTagPaths.includes(v.path) && v.path !== path
    )
    visitedViews.value = visitedViews.value.filter((v) => {
      return affixTagPaths.includes(v.path) || v.path === path
    })
    for (const view of removedViews) {
      if (view.name) {
        const index = cachedViews.value.indexOf(view.name as string)
        if (index > -1) {
          cachedViews.value.splice(index, 1)
        }
      }
    }
  }

  /**
   * 删除所有标签页
   */
  function removeAll() {
    const removedViews = visitedViews.value.filter(
      (v) => !affixTagPaths.includes(v.path)
    )
    visitedViews.value = visitedViews.value.filter((v) =>
      affixTagPaths.includes(v.path)
    )
    for (const view of removedViews) {
      if (view.name) {
        const index = cachedViews.value.indexOf(view.name as string)
        if (index > -1) {
          cachedViews.value.splice(index, 1)
        }
      }
    }
  }

  /**
   * 判断是否为固定标签页
   * @param tag 标签页视图
   * @returns 是否为固定标签页
   */
  function isAffix(tag: VisitedView) {
    return affixTagPaths.includes(tag.path) || tag.meta?.affix === true
  }

  /**
   * 获取最后一个标签页
   * @returns 最后一个标签页视图
   */
  function getLastView(): VisitedView | undefined {
    return visitedViews.value[visitedViews.value.length - 1]
  }

  /**
   * 获取前一个标签页
   * @param view 标签页视图
   * @returns 前一个标签页视图
   */
  function getPreviousView(view: VisitedView): VisitedView | undefined {
    const index = visitedViews.value.findIndex((v) => v.path === view.path)
    if (index <= 0) return undefined
    return visitedViews.value[index - 1]
  }

  return {
    visitedViews,
    cachedViews,
    initAffixTags,
    addView,
    removeView,
    removeOthers,
    removeAll,
    isAffix,
    getLastView,
    getPreviousView,
  }
})
