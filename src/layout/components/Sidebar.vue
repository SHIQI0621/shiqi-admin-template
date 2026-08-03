<template>
  <div class="sidebar-container" :class="sidebarClasses">
    <!-- Logo区域 -->
    <div v-if="layoutConfig.showSidebarLogo" class="sidebar-logo" :class="{ 'is-collapse': layoutConfig.isCollapse }">
      <AppLogo :collapsed="layoutConfig.isCollapse" align="center" />
    </div>

    <!-- 菜单区域 -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu :key="menuKey" :default-active="activeMenu" :collapse="layoutConfig.isCollapse"
        :collapse-transition="false" mode="vertical" :background-color="backgroundColor" :text-color="textColor"
        :active-text-color="activeTextColor" :unique-opened="layoutConfig.uniqueOpened " :default-openeds="parentPaths">
        <SidebarItem v-for="route in menuRoutes" :key="route.path" :item="route" :base-path="route.path" :level="1" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore, useThemeStore, useMenuStore } from '@/stores'
import SidebarItem from './SidebarItem.vue'
import AppLogo from './AppLogo.vue'

const route = useRoute()
const { layoutConfig } = useLayoutStore()
const { themeConfig } = useThemeStore()
const menuStore = useMenuStore()

// 当前激活的菜单
const activeMenu = computed(() => route.path)

// 菜单key，用于在路由变化时强制重新初始化el-menu
const menuKey = computed(() => `menu-${route.path}`)

// 侧边栏类名
const sidebarClasses = computed(() => ({
  'is-collapse': layoutConfig.isCollapse,
  'is-mobile': layoutConfig.isMobile,
  'is-open': !layoutConfig.isCollapse,
  [`theme-${themeConfig.sidebarTheme}`]: true,
}))

// 根据主题配置背景色和文字色（使用侧边栏变量）
const backgroundColor = computed(() => {
  if (themeConfig.sidebarTheme === 'black') {
    return '#001529'
  } else if (themeConfig.sidebarTheme === 'light') {
    return '#ffffff'
  } else {
    return themeConfig.primaryColor || '#1890ff'
  }
})

const textColor = computed(() => {
  if (themeConfig.sidebarTheme === 'black') {
    return 'rgba(255, 255, 255, 0.65)'
  }
  return '#333333'
})

const activeTextColor = computed(() => {
  if (themeConfig.sidebarTheme === 'header-color') {
    return '#fff'
  }
  return themeConfig.primaryColor || '#1890ff'
})

// 菜单路由（从Store获取）
const menuRoutes = computed(() => {
  return menuStore.sidebarMenus
})

// 计算路由对应的父菜单路径
const parentPaths = computed(() => {
  const path = route.path
  const menus = menuStore.menus
  const result: string[] = []

  function searchMenu(items: any[], targetPath: string, parents: string[]): boolean {
    for (const item of items) {
      if (item.path === targetPath) {
        result.push(...parents)
        return true
      }
      if (item.children && item.children.length > 0) {
        if (searchMenu(item.children, targetPath, [...parents, item.path])) {
          return true
        }
      }
    }
    return false
  }

  searchMenu(menus, path, [])
  return result
})

onMounted(() => {
  if (!menuStore.isLoaded && menuStore.menus.length === 0) {
    menuStore.fetchMenus()
  }
})
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '@/styles/variables' as *;

.sidebar-container {
  height: 100vh;
  width: 210px;
  background-color: map.get($sidebar-black, bg);
  transition: width 0.28s, transform 0.28s;
  z-index: 1003;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  // 统一的 hover 样式（默认深色主题）
  // 深色背景下保持白色半透明背景，文字颜色使用主题色
  :deep(.el-menu-item:hover),
  :deep(.el-menu-item.is-active:hover),
  :deep(.el-sub-menu__title:hover),
  :deep(.el-sub-menu__title.is-active:hover) {
    background-color: rgba(255, 255, 255, 0.08);
    color: var(--el-color-primary);
  }

  // 激活菜单项
  :deep(.el-menu-item.is-active),
  :deep(.el-sub-menu__title.is-active) {
    background-color: rgba(255, 255, 255, 0.12);
    color: var(--el-color-primary);
  }

  // 移动端样式
  &.is-mobile {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1003;
    transform: translateX(-100%);
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

    &.is-open {
      transform: translateX(0);
    }
  }

  &.is-collapse {
    width: 64px;

    .sidebar-logo .logo-title {
      display: none;
    }

    // 折叠模式：统一隐藏文字，只显示图标
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      padding: 0 !important;
      justify-content: center !important;
      overflow: hidden;
    }

    // 隐藏自定义标题文字
    :deep(.menu-title) {
      display: none !important;
    }

    // 隐藏跳转箭头
    :deep(.menu-item-link) {
      display: none !important;
    }

    // 隐藏Element Plus默认箭头
    :deep(.el-sub-menu__icon-arrow) {
      display: none !important;
    }

    // 图标居中（使用更高优先级选择器覆盖正常状态下的margin-right）
    :deep(.el-menu-item .menu-icon),
    :deep(.el-sub-menu__title .menu-icon) {
      margin: 0 !important;
    }

    // 折叠模式的弹出子菜单恢复显示
    :deep(.el-menu--popup) {
      .menu-title {
        display: inline !important;
      }

      .menu-item-link {
        display: inline-flex !important;
      }

      .el-sub-menu__icon-arrow {
        display: inline-flex !important;
      }
    }
  }

  // 折叠模式下重置所有层级的缩进
  &.is-collapse {

    :deep(.el-sub-menu .el-menu-item),
    :deep(.el-sub-menu .el-sub-menu__title) {
      padding-left: 0 !important;
    }

    :deep(.el-sub-menu .el-sub-menu .el-menu-item),
    :deep(.el-sub-menu .el-sub-menu .el-sub-menu__title) {
      padding-left: 0 !important;
    }

    :deep(.el-menu-item .el-menu-tooltip__trigger) {
      justify-content: center;
    }
  }

  // 亮色侧边栏主题
  &.theme-light {
    background-color: map.get($sidebar-light, bg);
    border-right: 1px solid map.get($sidebar-light, border-color);

    :deep(.el-menu-item:hover),
    :deep(.el-menu-item.is-active:hover),
    :deep(.el-sub-menu__title:hover),
    :deep(.el-sub-menu__title.is-active:hover) {
      background-color: rgba(var(--el-color-primary-rgb), 0.08);
      color: var(--el-color-primary);
    }

    :deep(.el-menu-item.is-active),
    :deep(.el-sub-menu__title.is-active) {
      background-color: rgba(var(--el-color-primary-rgb), 0.12);
      color: var(--el-color-primary);
    }
  }

  // 主题色侧边栏
  &.theme-header-color {
    box-shadow: 2px 0 8px rgba(0, 0, 0, 0.15);

    // 主题色背景上使用白色半透明，文字保持白色
    :deep(.el-menu-item:hover),
    :deep(.el-menu-item.is-active:hover),
    :deep(.el-sub-menu__title:hover),
    :deep(.el-sub-menu__title.is-active:hover) {
      background-color: rgba(255, 255, 255, 0.15);
      color: #fff;
    }

    :deep(.el-menu-item.is-active),
    :deep(.el-sub-menu__title.is-active) {
      background-color: rgba(255, 255, 255, 0.2);
      color: #fff;
    }
  }

  .sidebar-logo {
    height: 50px;
    // line-height: 50px;
    background-color: map.get($sidebar-black, bg);
    text-align: center;
    overflow: hidden;
    flex-shrink: 0;

    :deep(.app-logo) {
      height: 100%;
      padding: 0 12px;
    }

    :deep(.logo-title) {
      color: map.get($sidebar-black, text-active);
    }
  }

  // 亮色侧边栏logo样式
  &.theme-light .sidebar-logo {
    background-color: map.get($sidebar-light, logo-bg);

    :deep(.logo-title) {
      color: map.get($sidebar-light, text-active);
    }
  }

  // 主题色侧边栏logo样式
  &.theme-header-color .sidebar-logo {
    background-color: var(--el-color-primary, #1890ff);

    :deep(.logo-title) {
      color: map.get($sidebar-header-color, text-active);
    }
  }

  .scrollbar-wrapper {
    flex: 1;
    overflow-x: hidden !important;
  }

  :deep(.el-scrollbar) {
    height: 100%;
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
  }

  :deep(.el-menu) {
    border-right: none;
    height: 100%;
    overflow-y: auto;
  }

  // 主题色主题子菜单容器
  &.theme-header-color :deep(.el-menu--inline) {
    background-color: rgba(0, 0, 0, 0.15);
  }

  :deep(.el-menu--collapse) {
    width: 64px;
  }

  // 多级菜单缩进统一样式（最大缩进限制在3级）
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    padding-right: 12px !important;
    height: 48px;
    line-height: 48px;
    display: flex !important;
    align-items: center;
    overflow: hidden;
  }

  // 确保标题容器可以收缩
  :deep(.el-menu-item > span:not(.menu-icon):not(.menu-item-link):not([class*='el-'])),
  :deep(.el-sub-menu__title > span:not(.menu-icon):not(.menu-item-link):not([class*='el-'])) {
    min-width: 0;
    flex: 1;
    overflow: hidden;
  }

  // EP tooltip trigger 容器也要收缩
  :deep(.el-menu-tooltip__trigger) {
    min-width: 0;
    flex: 1;
    overflow: hidden;
    display: flex;
    align-items: center;
  }

  // 第一级：默认缩进
  :deep(.el-menu-item),
  :deep(.el-sub-menu__title) {
    padding-left: 20px !important;
  }

  // 第二级
  :deep(.el-sub-menu .el-menu-item) {
    padding-left: 36px !important;
  }

  // 第三级及以上：固定最大缩进
  :deep(.el-sub-menu .el-sub-menu .el-menu-item),
  :deep(.el-sub-menu .el-sub-menu .el-sub-menu__title),
  :deep(.el-sub-menu .el-sub-menu .el-sub-menu .el-menu-item),
  :deep(.el-sub-menu .el-sub-menu .el-sub-menu .el-sub-menu__title) {
    padding-left: 52px !important;
  }

  // 统一图标宽度对齐
  :deep(.el-menu-item .el-icon),
  :deep(.el-sub-menu__title .el-icon) {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 16px;
  }

  // 子菜单标题箭头
  :deep(.el-sub-menu__icon-arrow) {
    margin-left: auto;
  }
}

// 移动端时隐藏侧边栏遮罩上方的内容
.sidebar-container.is-mobile.is-open {
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.2);
}
</style>
