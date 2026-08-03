import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { LayoutConfig } from '@/types'
import { getCache, setCache, CacheKeys } from '@/utils/cache'

export const useLayoutStore = defineStore('layout', () => {
  const storedLayout = getCache<LayoutConfig>(CacheKeys.LAYOUT)
  const layoutConfig = ref<LayoutConfig>(storedLayout || {
    mode: 'left',
    fixedHeader: true,
    showSidebarLogo: true,
    showTagsView: true,
    showBreadcrumb: true,
    showCopyright: true,
    dynamicTitle: true,
    isCollapse: false,
    isMobile: false,
    showSettings: false,
    tagsViewStyle: 'card',
    menuBgColor: '#001529',
    uniqueOpened: true,
  })

  watch(layoutConfig, (newVal) => {
    setCache(CacheKeys.LAYOUT, newVal)
  }, { deep: true })

  /**
   * 切换侧边栏折叠状态
   */
  function toggleSidebar() {
    layoutConfig.value.isCollapse = !layoutConfig.value.isCollapse
  }

  /**
   * 设置移动端状态
   * @param isMobile 是否为移动端
   */
  function setMobile(isMobile: boolean) {
    layoutConfig.value.isMobile = isMobile
    if (isMobile) {
      layoutConfig.value.isCollapse = true
    }
  }

  /**
   * 切换设置面板状态
   */
  function toggleSettings() {
    layoutConfig.value.showSettings = !layoutConfig.value.showSettings
  }

  /**
   * 设置布局模式
   * @param mode 布局模式
   */
  function setMode(mode: 'left' | 'top') {
    layoutConfig.value.mode = mode
  }

  /**
   * 切换标签页导航状态
   */
  function toggleTagsView() {
    layoutConfig.value.showTagsView = !layoutConfig.value.showTagsView
  }

  /**
   * 切换面包屑状态
   */
  function toggleBreadcrumb() {
    layoutConfig.value.showBreadcrumb = !layoutConfig.value.showBreadcrumb
  }

  /**
   * 设置标签页样式
   * @param style 标签页样式
   */
  function setTagsViewStyle(style: '' | 'card') {
    layoutConfig.value.tagsViewStyle = style
  }

  return {
    layoutConfig,
    toggleSidebar,
    setMobile,
    toggleSettings,
    setMode,
    toggleTagsView,
    toggleBreadcrumb,
    setTagsViewStyle,
  }
})
