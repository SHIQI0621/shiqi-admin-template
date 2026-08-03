import { createRouter, createWebHashHistory, useRoute, useRouter } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { APP_TITLE } from '@/setting'
import { getCache, CacheKeys, getToken, getUserInfo } from '@/utils/cache'
import type { LayoutConfig } from '@/types'
import { useMenuStore } from '@/stores/modules/menu'

NProgress.configure({ showSpinner: false })

// 白名单：不需要登录即可访问的路由
const whiteList = ['/login', '/404']

const RedirectComponent = {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const fullPath = route.params.pathMatch as string
    router.replace({ path: '/' + fullPath })
    return () => null
  },
}

// 基础路由（不需要权限）
const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { title: '登录', public: true },
  },
  // 403 无权限页
  {
    path: '/403',
    name: 'Forbidden',
    component: () => import('@/views/error/403.vue'),
    meta: { title: '403', public: true },
  },
]

// Layout 外壳路由（业务路由的父容器）
const layoutRoute: RouteRecordRaw = {
  path: '/',
  name: 'Layout',
  component: () => import('@/layout/index.vue'),
  redirect: '/dashboard',
  children: [
    // 首页（固定在首页，不通过菜单配置）
    {
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index.vue'),
      meta: { title: '首页', icon: 'Odometer', affix: true },
    },
    // 个人中心（常用页面，固定配置）
    {
      path: 'profile',
      name: 'Profile',
      component: () => import('@/views/profile/index.vue'),
      meta: { title: '个人中心', icon: 'User' },
    },
    // 中间路由（用于刷新标签页）
    {
      path: 'redirect/:pathMatch(.*)*',
      name: 'Redirect',
      component: RedirectComponent,
      meta: { title: 'redirect', public: true, noTagsView: true },
    },
  ],
}

// 404 兜底路由（初始时不添加，动态路由加载完成后再添加）
const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: () => import('@/views/error/404.vue'),
  meta: { title: '404', public: true },
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: [...baseRoutes, layoutRoute],
})

// 是否已添加动态路由
let dynamicRoutesAdded = false

// 已注册的动态路由名称
const registeredRouteNames = new Set<string>()

/**
 * 递归扁平化路由，将所有嵌套路由转换为顶级路由
 */
function flattenRoutes(routes: RouteRecordRaw[]): RouteRecordRaw[] {
  const result: RouteRecordRaw[] = []
  
  function processRoute(route: RouteRecordRaw) {
    // 创建新的路由对象（不包含子路由）
    const { children, ...flatRoute } = route
    result.push(flatRoute as RouteRecordRaw)
    
    // 递归处理子路由
    if (children && children.length > 0) {
      children.forEach(child => {
        processRoute(child)
      })
    }
  }
  
  routes.forEach(processRoute)
  return result
}

/**
 * 从菜单数据中提取路由配置并添加到路由表
 */
async function addDynamicRoutes(): Promise<void> {
  if (dynamicRoutesAdded) return
  
  const menuStore = useMenuStore()
  
  // 获取菜单数据
  if (!menuStore.isLoaded) {
    await menuStore.fetchMenus()
  }
  
  // 生成路由
  const routes = menuStore.generateRoutes()
  
  // 扁平化路由，将所有嵌套路由转换为顶级路由
  const flatRoutes = flattenRoutes(routes)
  
  // 将扁平化的路由添加到 Layout 路由下
  flatRoutes.forEach(route => {
    const routeName = route.name as string
    if (!registeredRouteNames.has(routeName)) {
      registeredRouteNames.add(routeName)
      router.addRoute('Layout', route)
    }
  })
  
  // 动态路由加载完成后，添加404兜底路由
  router.addRoute('Layout', notFoundRoute)
  
  dynamicRoutesAdded = true
}

router.beforeEach(async (to, _from, next) => {
  NProgress.start()

  // 设置页面标题
  const layoutConfig = getCache<LayoutConfig>(CacheKeys.LAYOUT)
  const dynamicTitle = layoutConfig?.dynamicTitle ?? true
  document.title = dynamicTitle ? `${to.meta.title || ''} - ${APP_TITLE}` : APP_TITLE

  const token = getToken()

  // 已登录用户访问登录页，重定向到首页
  if (to.path === '/login' && token) {
    next('/')
    return
  }

  // 白名单路由直接放行
  if (to.meta.public || whiteList.includes(to.path)) {
    next()
    return
  }

  // 未登录，跳转登录页并携带重定向地址
  if (!token) {
    const redirectPath = to.path !== '/login' ? to.fullPath : ''
    next({
      path: '/login',
      query: redirectPath ? { redirect: redirectPath } : {},
    })
    return
  }

  // 加载动态路由
  if (!dynamicRoutesAdded) {
    try {
      await addDynamicRoutes()
      // 重新导航到当前路由（确保动态路由已注册）
      next({ ...to, replace: true })
      return
    } catch (error) {
      console.error('加载动态路由失败:', error)
      next('/404')
      return
    }
  }

  // 权限校验：检查路由要求的角色
  const requiredRoles = to.meta.roles as string[] | undefined
  if (requiredRoles && requiredRoles.length > 0) {
    const userInfo = getUserInfo()
    const userRoles = userInfo?.roles ?? []
    const hasRole = requiredRoles.some((role) => userRoles.includes(role))
    if (!hasRole) {
      next('/403')
      return
    }
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
