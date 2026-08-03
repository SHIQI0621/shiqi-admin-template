<template>
  <div class="layout-container" :class="layoutClasses">
    <!-- 全局水印 -->
    <Watermark
      v-if="themeConfig.showWatermark"
      :text="themeConfig.watermarkText"
      :opacity="themeConfig.watermarkOpacity"
      :fontSize="themeConfig.watermarkFontSize"
    />
    
    <!-- 左侧菜单模式显示侧边栏 -->
    <Sidebar v-if="layoutConfig.mode === 'left'" />
    
    <!-- 主区域 -->
    <div class="main-container" :class="mainContainerClasses">
      <!-- 顶部导航栏区域 -->
      <div class="header-container" :class="{ 'is-fixed': layoutConfig.fixedHeader }">
        <!-- 左侧菜单模式：只显示Navbar -->
        <template v-if="layoutConfig.mode === 'left'">
          <Navbar />
        </template>
        
        <!-- 顶部菜单模式：TopMenu(含Logo+菜单) -->
        <template v-else-if="layoutConfig.mode === 'top'">
          <TopMenu />
        </template>
        
        <!-- 标签页导航 -->
        <TagsView v-if="layoutConfig.showTagsView" />
      </div>
      
      <!-- 内容区域 -->
      <AppMain :class="{ 
        'has-tags-view': layoutConfig.showTagsView, 
        'has-fixed-header': layoutConfig.fixedHeader 
      }" />
    </div>

    <!-- 设置面板 -->
    <SettingsPanel v-if="layoutConfig.showSettings" />

    <!-- 锁屏组件 -->
    <LockScreen />

    <!-- 移动端遮罩（仅左侧菜单模式） -->
    <div 
      v-if="layoutConfig.isMobile && !layoutConfig.isCollapse && layoutConfig.mode === 'left'" 
      class="mobile-mask"
      @click="toggleSidebar"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useLayoutStore, useThemeStore } from '@/stores'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import TopMenu from './components/TopMenu.vue'
import AppMain from './components/AppMain.vue'
import TagsView from './components/TagsView.vue'
import LockScreen from '@/components/LockScreen/index.vue'

const layoutStore = useLayoutStore()
const { layoutConfig } = storeToRefs(layoutStore)
const { toggleSidebar, setMobile } = layoutStore

const themeStore = useThemeStore()
const { themeConfig } = storeToRefs(themeStore)

// 计算布局类名
const layoutClasses = computed(() => ({
  [`layout-${layoutConfig.value.mode}`]: true,
  'is-collapse': layoutConfig.value.isCollapse,
  'is-mobile': layoutConfig.value.isMobile,
}))

// 主容器类名
const mainContainerClasses = computed(() => ({
  'sidebar-hidden': layoutConfig.value.mode !== 'left',
}))

// 监听窗口大小变化
function handleResize() {
  const isMobile = window.innerWidth < 768
  setMobile(isMobile)
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped lang="scss">
@use '@/styles/variables' as *;

.layout-container {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;

  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-width: 0;

    &.sidebar-hidden {
      margin-left: 0 !important;
    }

    .header-container {
      width: 100%;
      flex-shrink: 0;
      z-index: 1002;
      
      // 取消 fixed 定位，使用正常文档流
      // &.is-fixed 样式已移除
    }
  }

  // 左侧菜单模式：主容器根据侧边栏宽度自适应
  &.layout-left {
    
    &.is-mobile .main-container {
      margin-left: 0;
    }
  }

  // 顶部菜单模式
  &.layout-top {
    .main-container {
      margin-left: 0 !important;
    }
  }

  // 移动端
  &.is-mobile {
    .main-container {
      margin-left: 0 !important;
    }
  }
}

.mobile-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002; // 低于侧边栏(1003)，高于主内容
  transition: opacity 0.28s;
}
</style>
