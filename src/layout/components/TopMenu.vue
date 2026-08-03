<template>
  <div class="top-menu-container" :class="[containerClasses, { 'is-drawer-mode': useDrawerMode }]">
    <!-- 左侧区域 菜单 -->
    <div class="top-menu-left">
      <div v-if="useDrawerMode" class="drawer-menu-toggle" @click="drawerVisible = true">
        <el-icon :size="20">
          <Fold v-if="drawerVisible" :size="18" />
          <Expand v-else :size="18" />
        </el-icon>
      </div>

      <!-- 正常模式：顶部水平菜单 -->
      <template v-else>
        <!-- Logo区域 -->
        <div class="top-menu-logo">
          <AppLogo :visible="layoutConfig.showSidebarLogo" />
        </div>

        <div class="top-menu-wrapper" ref="menuWrapperRef">
          <el-menu :default-active="activeMenu" mode="horizontal" background-color="#fff" text-color="#333"
            :active-text-color="activeTextColor" router class="top-menu">
            <TopMenuItem v-for="route in visibleRoutes" :key="route.path" :item="route" :base-path="route.path" />
          </el-menu>
        </div>
      </template>
    </div>

    <!-- 右侧区域：工具栏 -->
    <div class="top-menu-right">
       <!-- 组件大小切换 -->
      <SizeSelector />

      <!-- 全屏切换 -->
      <FullScreenToggle />

      <!-- 用户头像下拉菜单 -->
      <el-dropdown trigger="click" class="user-dropdown">
        <div class="user-info">
          <el-avatar :size="28" :src="userStore.userInfo?.avatar" />
          <span class="username">{{ userStore.userInfo?.nickname || '未登录' }}</span>
          <el-icon>
            <ArrowDown />
          </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>
              <el-icon>
                <User />
              </el-icon>个人中心
            </el-dropdown-item>
            <el-dropdown-item @click="toggleSettings">
              <el-icon>
                <Setting />
              </el-icon>设置
            </el-dropdown-item>
            <el-dropdown-item @click="handleLockScreen">
              <el-icon>
                <Lock />
              </el-icon>锁定屏幕
            </el-dropdown-item>
            <el-dropdown-item divided @click="handleLogout">
              <el-icon>
                <SwitchButton />
              </el-icon>退出登录
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>

    <!-- 抽屉遮罩层 -->
    <Transition name="fade">
      <div v-if="drawerVisible" class="drawer-mask" @click="drawerVisible = false"></div>
    </Transition>

    <!-- 抽屉菜单 - Sidebar风格 -->
    <div class="top-menu-drawer" :class="{ 'is-open': drawerVisible }">
      <!-- 抽屉Logo区 -->
      <div class="drawer-logo" @click="drawerVisible = false">
        <AppLogo />
      </div>

      <!-- 抽屉菜单列表 -->
      <el-scrollbar wrap-class="drawer-scrollbar">
        <el-menu :default-active="activeMenu" mode="vertical" :active-text-color="activeTextColor"
          class="drawer-menu-list">
          <template v-for="route in menuRoutes" :key="route.path">
            <el-sub-menu v-if="route.children?.length && !route.meta?.hidden" :index="route.path">
              <template #title>
                <el-icon v-if="route.meta?.icon" class="menu-icon">
                  <component :is="route.meta.icon" />
                </el-icon>
                <span>{{ route.meta?.title || route.name }}</span>
              </template>
              <template v-for="child in route.children" :key="child.path">
                <el-menu-item v-if="!child.children?.length && !child.meta?.hidden"
                  :index="resolvePath(route.path, child.path)" router @click="drawerVisible = false">
                  <el-icon v-if="child.meta?.icon" class="menu-icon">
                    <component :is="child.meta.icon" />
                  </el-icon>
                  {{ child.meta?.title || child.name }}
                </el-menu-item>
                <el-sub-menu v-else-if="child.children?.length && !child.meta?.hidden"
                  :index="resolvePath(route.path, child.path)">
                  <template #title>
                    <el-icon v-if="child.meta?.icon" class="menu-icon">
                      <component :is="child.meta.icon" />
                    </el-icon>
                    <span>{{ child.meta?.title || child.name }}</span>
                  </template>
                  <el-menu-item v-for="grandChild in child.children" :key="grandChild.path"
                    :index="resolvePath(resolvePath(route.path, child.path), grandChild.path)" router
                    @click="drawerVisible = false">
                    {{ grandChild.meta?.title || grandChild.name }}
                  </el-menu-item>
                </el-sub-menu>
              </template>
            </el-sub-menu>
            <el-menu-item v-else-if="!route.meta?.hidden" :index="route.path" router @click="drawerVisible = false">
              <el-icon v-if="route.meta?.icon" class="menu-icon">
                <component :is="route.meta.icon" />
              </el-icon>
              {{ route.meta?.title || route.name }}
            </el-menu-item>
          </template>
        </el-menu>
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  Setting,
  User,
  SwitchButton,
  ArrowDown,
} from '@element-plus/icons-vue'
import { useLayoutStore, useThemeStore, useUserStore, useMenuStore, useAppStore } from '@/stores'
import TopMenuItem from './TopMenuItem.vue'
import AppLogo from './AppLogo.vue'

const route = useRoute()
const router = useRouter()
const { layoutConfig, toggleSettings } = useLayoutStore()
const { themeConfig } = useThemeStore()
const userStore = useUserStore()
const appStore = useAppStore()
const menuStore = useMenuStore()

// 抽屉菜单可见性
const drawerVisible = ref(false)

// 容器类名
const containerClasses = computed(() => ({
  [`layout-${layoutConfig.mode}`]: true,
}))

// 激活文字色
const activeTextColor = computed(() => themeConfig.primaryColor || '#1890ff')

// 当前激活的菜单 - 支持任意层级递归搜索
const activeMenu = computed(() => {
  const path = route.path
  const routes = menuRoutes.value

  const findActive = (items: any[]): string | null => {
    for (const r of items) {
      if (r.meta?.hidden) continue
      if (r.path === path) return r.path
      if (path.startsWith(r.path + '/')) return r.path
      if (r.children && r.children.length > 0) {
        const found = findActive(r.children)
        if (found) return found
      }
    }
    return null
  }

  return findActive(routes) || path
})

// 菜单路由数据（从Store获取）
const menuRoutes = computed(() => {
  return menuStore.topMenus
})

// 响应式菜单相关
const menuWrapperRef = ref<HTMLElement | null>(null)
const containerWidth = ref(0)
const menuItemWidths = ref<number[]>([])
const windowWidth = ref(window.innerWidth)

// 监听窗口大小变化
function handleWindowResize() {
  windowWidth.value = window.innerWidth
}

// 抽屉模式判断 - 当窗口宽度足够小时才使用抽屉模式
// 只有当窗口宽度小于某个阈值（如 768px）时才使用抽屉模式
const useDrawerMode = computed(() => {
  return windowWidth.value < 768
})

// 计算可见的菜单项（宽度足够时显示）
const visibleRoutes = computed(() => {
  if (containerWidth.value === 0 || useDrawerMode.value) {
    return menuRoutes.value
  }

  const availableWidth = containerWidth.value - 100 // 预留一些空间给"更多"按钮
  let totalWidth = 0
  const visible: any[] = []

  menuRoutes.value.forEach((item, index) => {
    const itemWidth = menuItemWidths.value[index] || 120
    if (totalWidth + itemWidth <= availableWidth) {
      visible.push(item)
      totalWidth += itemWidth
    }
  })

  if (visible.length === 0 && menuRoutes.value.length > 0) {
    return menuRoutes.value
  }

  return visible
})

// 路径拼接函数
function resolvePath(parentPath: string, childPath: string): string {
  if (childPath.startsWith('/')) {
    return childPath
  }
  return `${parentPath}/${childPath}`.replace(/\/+/g, '/')
}

// 计算菜单宽度
function calculateWidths() {
  if (!menuWrapperRef.value) return

  const container = menuWrapperRef.value
  const menuEl = container.querySelector('.el-menu') as HTMLElement

  if (!menuEl) return

  const containerRect = container.getBoundingClientRect()
  containerWidth.value = containerRect.width

  const menuItems = menuEl.querySelectorAll(':scope > .el-menu-item, :scope > .el-sub-menu')
  menuItemWidths.value = Array.from(menuItems).map(item => {
    const rect = item.getBoundingClientRect()
    return rect.width + 8
  })
}

// ResizeObserver
let resizeObserver: ResizeObserver | null = null

function initResizeObserver() {
  if (!menuWrapperRef.value) return

  resizeObserver = new ResizeObserver(() => {
    nextTick(() => {
      calculateWidths()
    })
  })
  resizeObserver.observe(menuWrapperRef.value)
}

// 监听路由变化重新计算
watch(
  () => route.path,
  () => {
    drawerVisible.value = false
    nextTick(() => {
      calculateWidths()
    })
  }
)

// 监听菜单数据变化
watch(
  () => menuRoutes.value,
  () => {
    nextTick(() => {
      calculateWidths()
    })
  },
  { deep: true }
)

onMounted(() => {
  window.addEventListener('resize', handleWindowResize)
  nextTick(() => {
    calculateWidths()
    initResizeObserver()
  })
})

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResize)
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

// 锁屏
function handleLockScreen() {
  appStore.lockScreen()
}

// 退出登录
function handleLogout() {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    await userStore.logout()
    router.push('/login')
    ElMessage.success('已退出登录')
  }).catch(() => { })
}


</script>

<style scoped lang="scss">
.top-menu-container {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: #fff;
  border-bottom: 1px solid #e8e8e8;
  width: 100%;

  &.is-drawer-mode {
    .top-menu-left {
      flex: 1;
    }
  }

  .top-menu-left {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;

    .top-menu-logo {
      display: flex;
      align-items: center;
      padding-right: 20px;
      flex-shrink: 0;

      :deep(.logo-title) {
        color: #1a1a1a;
      }
    }

    .drawer-menu-toggle {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      cursor: pointer;
      color: #606266;
      border-radius: 4px;
      transition: all 0.2s;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
        color: var(--el-color-primary);
      }
    }

    .top-menu-wrapper {
      display: flex;
      align-items: center;
      flex: 1;
      min-width: 0;
      overflow: hidden;

      .top-menu {
        flex: 1;
        border-bottom: none !important;
        background: transparent !important;
        min-width: 0;

        :deep(.el-menu-item),
        :deep(.el-sub-menu__title) {
          height: 50px;
          line-height: 50px;
          border-bottom: 2px solid transparent !important;
          padding: 0 12px;
          font-size: 14px;
          display: flex;
          align-items: center;
          max-width: 200px;
          overflow: hidden;

          .menu-title {
            min-width: 0;
            flex: 1;
            overflow: hidden;
          }

          &:hover {
            background: rgba(0, 0, 0, 0.04);
          }

          &.is-active {
            border-bottom-color: var(--el-color-primary) !important;
            color: var(--el-color-primary);
          }

          .external-link-icon {
            margin-left: 4px;
            opacity: 0.6;

            &:hover {
              opacity: 1;
            }
          }
        }

        :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
          border-bottom-color: var(--el-color-primary) !important;
          color: var(--el-color-primary);
        }

        :deep(.el-sub-menu__icon-arrow) {
          position: static !important;
          margin: 0 0 0 4px !important;
          font-size: 12px;
          transform: none !important;
        }

        :deep(.el-menu--popup) {
          background: #fff;
          box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

          .el-menu-item {
            color: #333;
            border-bottom: none !important;

            .menu-icon {
              width: 18px;
              height: 18px;
              font-size: 18px;
              margin-right: 8px;
            }

            &:hover,
            &.is-active {
              color: var(--el-color-primary);
              background: #e6f7ff !important;
            }

            .external-link-icon {
              margin-left: 4px;
              opacity: 0.6;

              &:hover {
                opacity: 1;
              }
            }
          }

          .el-sub-menu__title {
            .menu-icon {
              width: 18px;
              height: 18px;
              font-size: 18px;
              margin-right: 8px;
            }

            .el-sub-menu__icon-arrow {
              margin-left: auto;
              font-size: 12px;
            }
          }
        }
      }
    }
  }

  .top-menu-right {
    display: flex;
    align-items: center;
    flex-shrink: 0;

    .header-item {
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      color: #606266;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }
    }

    .user-dropdown {
      margin-left: 12px;

      .user-info {
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 0 8px;

        &:hover {
          background: rgba(0, 0, 0, 0.05);
        }

        .username {
          margin: 0 6px;
          font-size: 14px;
          color: #606266;
        }
      }
    }
  }
}

// 更多菜单的图标样式
.menu-icon {
  margin-right: 8px;
  font-size: 16px;
}

// 抽屉遮罩层
.drawer-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.45);
  z-index: 1000;
}

// 抽屉菜单容器 - Sidebar风格
.top-menu-drawer {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  width: 240px;
  background-color: #fff;
  box-shadow: 2px 0 16px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  transform: translateX(-100%);
  transition: transform 0.28s ease-in-out;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  &.is-open {
    transform: translateX(0);
  }

  // 抽屉Logo区
  .drawer-logo {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e8e8e8;
    flex-shrink: 0;
    cursor: pointer;

    :deep(.logo-title) {
      color: #1a1a1a;
    }
  }

  // 滚动容器
  :deep(.drawer-scrollbar) {
    flex: 1;
    overflow-x: hidden !important;
  }

  :deep(.el-scrollbar) {
    height: 100%;
  }

  :deep(.el-scrollbar__view) {
    height: 100%;
  }

  // 菜单列表样式 - Sidebar风格
  .drawer-menu-list {
    border-right: none;
    height: 100%;
    overflow-y: auto;

    // 菜单项和子菜单标题
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
      height: 40px;
      line-height: 40px;
      padding: 0 20px !important;
      font-size: 14px;
      color: #333;

      &:hover {
        background: rgba(0, 0, 0, 0.04);
      }

      &.is-active {
        color: var(--el-color-primary);
        background: #e6f7ff !important;
      }
    }

    // 子菜单项缩进
    :deep(.el-sub-menu .el-menu-item),
    :deep(.el-sub-menu .el-sub-menu__title) {
      padding-left: 36px !important;
    }

    // 三级菜单缩进
    :deep(.el-sub-menu .el-sub-menu .el-menu-item),
    :deep(.el-sub-menu .el-sub-menu .el-sub-menu__title) {
      padding-left: 52px !important;
    }

    // 图标样式
    :deep(.el-menu-item .menu-icon),
    :deep(.el-sub-menu__title .menu-icon) {
      margin-right: 8px;
      font-size: 18px;
      width: 18px;
      height: 18px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    // 子菜单箭头
    :deep(.el-sub-menu__icon-arrow) {
      margin-left: auto;
    }
  }
}

// 淡入淡出动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// 响应式：移动端优化
@media (max-width: 768px) {
  .top-menu-container {
    padding: 0 8px;

    .top-menu-left {
      .top-menu-logo {
        padding-right: 12px;

        .logo-title {
          display: none;
        }
      }

      .top-menu-wrapper {
        .top-menu {

          :deep(.el-menu-item),
          :deep(.el-sub-menu__title) {
            padding: 0 8px;
            font-size: 13px;
          }
        }
      }
    }

    .top-menu-right {
      .user-dropdown {
        .user-info {
          .username {
            display: none;
          }
        }
      }
    }
  }

  // 抽屉菜单在移动端调整位置
  .top-menu-drawer {
    top: 0px;
  }
}
</style>
