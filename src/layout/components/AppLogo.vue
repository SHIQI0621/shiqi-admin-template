<template>
  <div class="app-logo" :class="[
    `app-logo--${align}`,
    `app-logo--${size}`,
    { 'is-collapsed': collapsed, 'is-hidden': !visible }
  ]">
    <router-link :to="to" class="logo-link">
      <img src="@/assets/logo.png" alt="logo" class="logo-img" />
      <transition name="fade">
        <div class="logo-title" v-show="showTitle && !collapsed">
          <h3>{{ title }}</h3>
          <p v-if="appDic">{{ appDic }}</p>
        </div>
      </transition>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { APP_TITLE, APP_DIC } from '@/setting'

interface Props {
  collapsed?: boolean
  visible?: boolean
  showTitle?: boolean
  title?: string
  appDic?: string
  to?: string
  align?: 'left' | 'center' | 'right'
  size?: 'small' | 'default' | 'large'
}

withDefaults(defineProps<Props>(), {
  collapsed: false,
  visible: true,
  showTitle: true,
  title: APP_TITLE,
  appDic: APP_DIC,
  to: '/dashboard',
  align: 'left',
  size: 'default'
})
</script>

<style scoped lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  width: 100%;

  &--center {
    justify-content: center;
  }

  &--left {
    justify-content: flex-start;
  }

  &--right {
    justify-content: flex-end;
  }

  &.is-hidden {
    display: none;
  }

  &.is-collapsed {
    justify-content: center;

    .logo-title {
      display: none;
    }

    .logo-link {
      justify-content: center;
    }
  }

  .logo-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 100%;
    cursor: pointer;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 0.85;
    }
  }

  .logo-img {
    flex-shrink: 0;
    transition: width 0.28s ease, height 0.28s ease;
  }

  .logo-title {
    margin-left: 10px;
    font-weight: 600;
    text-align: left;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    h3 {
      font-size: 16px;
      height: fit-content;
      margin: 0;
      color: inherit;
    }

    p {
      font-size: 12px;
      height: fit-content;
      margin: 2px 0 0 0;
      color: inherit;
      opacity: 0.7;
    }
  }

  // 尺寸变体
  &--small {
    .logo-img {
      width: 28px;
      height: 28px;
    }

    .logo-title {
      h3 {
        font-size: 14px;
      }

      p {
        font-size: 11px;
      }
    }
  }

  &--default {
    .logo-img {
      width: 32px;
      height: 32px;
    }

    .logo-title {
      h3 {
        font-size: 16px;
      }

      p {
        font-size: 12px;
      }
    }
  }

  &--large {
    .logo-img {
      width: 40px;
      height: 40px;
    }

    .logo-title {
      h3 {
        font-size: 18px;
      }

      p {
        font-size: 13px;
      }
    }
  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s ease, max-width 0.28s ease;
  overflow: hidden;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-width: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-width: 200px;
}
</style>
