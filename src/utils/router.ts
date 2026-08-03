import type { RouteRecordRaw } from 'vue-router'
import type { MenuItem } from '@/stores/modules/menu'

// 使用 Vite 的 import.meta.glob 动态导入所有视图组件
const viewModules = import.meta.glob('/src/views/**/index.vue')

/**
 * 根据组件路径动态加载组件
 * @param componentPath 组件路径，如 'views/feature/avatarList/index.vue'
 * @returns 组件加载函数
 */
export function loadComponent(componentPath: string) {
    // 规范化路径
    const normalizedPath = componentPath.startsWith('/')
        ? componentPath
        : '/' + componentPath

    // 尝试直接匹配
    if (viewModules[normalizedPath]) {
        return viewModules[normalizedPath]
    }

    // 尝试添加 /src 前缀
    const srcPath = normalizedPath.startsWith('/src')
        ? normalizedPath
        : '/src' + normalizedPath

    if (viewModules[srcPath]) {
        return viewModules[srcPath]
    }

    // 如果找不到，返回一个占位组件
    console.warn(`[Router] Component not found: ${componentPath}`)
    return () => import('@/views/error/404.vue')
}

/**
 * 将菜单数据转换为路由配置
 * 处理规则：
 * 1. 没有 component 的菜单项作为分组容器，不生成路由
 * 2. 有 component 的菜单项生成路由
 * 3. 多级菜单中，每个有 component 的节点都会生成独立路由
 * 4. 路径会自动处理，保持菜单数据中的完整路径
 * 
 * @param menus 菜单数据数组
 * @returns 路由配置数组
 */
export function generateRoutesFromMenus(menus: MenuItem[]): RouteRecordRaw[] {
    const routes: RouteRecordRaw[] = []

    function processMenu(items: MenuItem[]): RouteRecordRaw[] {
        const result: RouteRecordRaw[] = []

        for (const item of items) {
            // 跳过外部链接（外部链接不需要路由）
            if (item.isLink && item.linkUrl) {
                continue
            }

            // 如果菜单项有组件，创建路由
            if (item.component) {
                const route: RouteRecordRaw = {
                    path: item.path,
                    name: item.name,
                    component: loadComponent(item.component),
                    meta: {
                        title: item.title,
                        icon: item.icon,
                        affix: item.affix || false,
                    },
                }

                // 处理子菜单中的路由
                if (item.children && item.children.length > 0) {
                    const childRoutes = processMenu(item.children)
                    if (childRoutes.length > 0) {
                        (route as RouteRecordRaw).children = childRoutes
                    }
                }

                result.push(route)
            } else {
                // 没有 component，但是有子菜单，直接处理子菜单
                if (item.children && item.children.length > 0) {
                    const childRoutes = processMenu(item.children)
                    result.push(...childRoutes)
                }
                // 如果没有 component 也没有子菜单，跳过
            }
        }

        return result
    }

    routes.push(...processMenu(menus))
    return routes
}
