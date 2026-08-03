<template>
  <div class="navbar-container">
    <!-- 左侧区域 -->
    <div class="navbar-left">
      <!-- 折叠按钮（仅左侧菜单模式显示） -->
      <div v-if="layoutConfig.mode === 'left'" class="hamburger" @click="toggleSidebar">
        <!-- 移动端显示菜单图标 -->
        <template v-if="layoutConfig.isMobile">
          <Fold v-if="layoutConfig.isCollapse" :size="18" />
          <Expand v-else :size="18" />
        </template>
        <!-- 桌面端显示折叠/展开图标 -->
        <template v-else>
          <Fold v-if="!layoutConfig.isCollapse" :size="18" />
          <Expand v-else :size="18" />
        </template>
      </div>

      <!-- 面包屑导航（仅左侧菜单模式显示） -->
      <Breadcrumb v-if="layoutConfig.mode === 'left' && layoutConfig.showBreadcrumb" class="navbar-breadcrumb" />
    </div>

    <!-- 右侧区域 -->
    <div class="navbar-right">
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
            <el-dropdown-item @click="router.push('/profile')">
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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'
import {
  Fold,
  Expand,
  Setting,
  User,
  SwitchButton,
  ArrowDown,
  Lock,
} from '@element-plus/icons-vue'
import { useLayoutStore, useUserStore, useAppStore } from '@/stores'
import Breadcrumb from './Breadcrumb.vue'
import SizeSelector from '@/components/SizeSelector/index.vue'
import FullScreenToggle from '@/components/FullScreenToggle/index.vue'

const router = useRouter()
const { layoutConfig, toggleSidebar, toggleSettings } = useLayoutStore()
const userStore = useUserStore()
const appStore = useAppStore()

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
    ElMessage.success('退出成功')
  }).catch(() => { })
}
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.navbar-container {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  background: map.get($light-theme, card-bg);
  border-bottom: 1px solid map.get($light-theme, border-color);
  width: 100%;
  position: relative;
  min-width: 0;

  .navbar-left {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    order: -1;

    .hamburger {
      cursor: pointer;
      padding: 0 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 50px;
      min-width: 44px;

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &:active {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .navbar-breadcrumb {
      margin-left: 4px;
    }

    .navbar-logo {
      display: flex;
      align-items: center;
      margin-left: 8px;

      :deep(.logo-title) {
        @include theme-var(color, text-primary);
      }
    }
  }

  .navbar-right {
    display: flex;
    align-items: center;
    margin-left: auto;
    min-width: 0;
    gap: 2px;

    .navbar-item {
      height: 50px;
      line-height: 50px;
      padding: 0 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      position: relative;
      flex-shrink: 0;
      @include theme-var(color, text-regular);

      &:hover {
        background: rgba(0, 0, 0, 0.05);
      }

      &.is-active {
        color: var(--el-color-primary);

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 20px;
          height: 2px;
          background: var(--el-color-primary);
        }
      }

      .theme-picker {
        :deep(.el-color-picker__trigger) {
          vertical-align: middle;
          width: 22px;
          height: 22px;
          padding: 0;
        }
      }
    }

    :deep(.lang-selector),
    :deep(.size-selector) {
      flex-shrink: 0;
    }

    .user-dropdown {
      margin-left: 4px;
      flex-shrink: 0;

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
          @include theme-var(color, text-regular);
        }
      }
    }
  }
}
</style>
