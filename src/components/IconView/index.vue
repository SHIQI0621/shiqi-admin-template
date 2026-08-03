<template>
  <!-- Element Plus 图标 -->
  <el-icon
    v-if="type === 'element'"
    v-hover="hoverValue"
    :size="size"
    :color="color"
    :class="className"
    :style="iconStyle"
  >
    <component :is="elementIconComponent" />
  </el-icon>

  <!-- Remix Icon 图标 -->
  <i
    v-else-if="type === 'remix'"
    v-hover="hoverValue"
    :class="[`ri-${name}`, className]"
    :style="iconStyle"
  />

  <!-- IconFont / 自定义 SVG 图标 -->
  <i
    v-else-if="type === 'iconfont' || type === 'svg'"
    v-hover="hoverValue"
    :class="[className, type === 'iconfont' ? 'iconfont' : '']"
    :style="{ ...iconStyle, fontSize: typeof size === 'number' ? `${size}px` : size }"
  >
    <svg v-if="type === 'svg'" class="icon-svg" viewBox="0 0 1024 1024">
      <use :xlink:href="`#${name}`"></use>
    </svg>
    <span v-else>{{ name }}</span>
  </i>

  <!-- 文本/Unicode 图标 -->
  <span
    v-else-if="type === 'text'"
    v-hover="hoverValue"
    :class="['icon-text', className]"
    :style="{ ...iconStyle, fontSize: typeof size === 'number' ? `${size}px` : size }"
  >
    {{ name }}
  </span>

  <!-- 自动检测模式 -->
  <span
    v-else
    v-hover="hoverValue"
    :class="className"
    :style="iconStyle"
  >
    <!-- 自动判断：Element Plus -->
    <el-icon v-if="detectedType === 'element'" :size="size" :color="color">
      <component :is="elementIconComponent" />
    </el-icon>

    <!-- 自动判断：Remix Icon -->
    <i v-else-if="detectedType === 'remix'" :class="`ri-${name}`" />

    <!-- 默认：文本显示 -->
    <span
      v-else
      :class="['icon-text']"
      :style="{ fontSize: typeof size === 'number' ? `${size}px` : size }"
    >
      {{ name }}
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import type { AnimationName, Intensity } from '@/hooks/useHoverAnimate'

// 定义 Props
const props = withDefaults(defineProps<{
  /** 图标名称 */
  name: string | undefined
  /** 图标大小 (数字或字符串) */
  size?: number | string
  /** 图标颜色 */
  color?: string
  /** 图标类型 */
  type?: 'element' | 'remix' | 'iconfont' | 'svg' | 'text' | 'auto'
  /** 自定义 CSS 类名 */
  className?: string
  /** 悬浮动画类型，不设置则无动画 */
  animation?: AnimationName | string
  /** 动画时长 (ms) */
  animationDuration?: number
  /** 动画强度 */
  animationIntensity?: Intensity
  /** 是否自动播放动画 */
  autoPlay?: boolean
}>(), {
  size: 16,
  color: '',
  type: 'auto',
  className: '',
  animation: 'squeeze',
  animationDuration: 300,
  animationIntensity: 'normal',
  autoPlay: false,
})

// ==================== v-hover 指令配置 ====================
const hoverValue = computed(() => ({
  name: props.animation || undefined,
  duration: props.animationDuration,
  intensity: props.animationIntensity,
  autoPlay: props.autoPlay,
}))

// 计算样式
const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color || undefined,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  verticalAlign: 'middle',
}))

// 获取 Element Plus 图标组件
const elementIconComponent = computed(() => {
  return (ElementPlusIconsVue as any)[props.name || '']
  || undefined
})

// 检测图标类型
const detectedType = computed(() => {
  const name = props.name

  // 1. 检查是否为 Element Plus 图标
  if ((ElementPlusIconsVue as any)[name || '']) {
    return 'element'
  }

  // 2. 检查是否为 Remix Icon（常见命名模式）
  if (/^ri-/.test(name || '') || isCommonRemixIcon(name || '')) {
    return 'remix'
  }

  // 3. 默认返回 text
  return 'text'
})

// 常用 Remix Icon 名称列表（用于快速检测）
function isCommonRemixIcon(name: string): boolean {
  const commonPatterns = [
    'home', 'user', 'settings', 'menu', 'edit', 'delete', 'add',
    'search', 'arrow', 'link', 'mail', 'phone', 'time', 'calendar',
    'chart', 'file', 'folder', 'download', 'upload', 'share', 'star',
    'heart', 'thumb', 'eye', 'lock', 'shield', 'key', 'bug', 'code',
    'server', 'database', 'wifi', 'camera', 'music', 'video', 'image',
    'map', 'weather', 'shopping', 'money', 'logo', 'notification',
    'dashboard', 'tools', 'team', 'admin', 'group', 'list', 'more',
    'save', 'refresh', 'restart', 'power', 'login', 'logout', 'global',
    'rocket', 'lightbulb', 'flashlight', 'terminal', 'git', 'github',
    'checkbox', 'radio', 'toggle', 'close', 'check', 'error', 'warning',
    'info', 'question', 'gift', 'coupon', 'price', 'wallet', 'bank',
    'computer', 'smartphone', 'tablet', 'monitor', 'hard-drive', 'battery',
    'bluetooth', 'printer', 'speaker', 'headphone', 'mic', 'usb'
  ]

  return commonPatterns.some(pattern => name.includes(pattern))
}
</script>

<style scoped>
.icon-text {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1;
}

.icon-svg {
  width: 1em;
  height: 1em;
  fill: currentColor;
}
</style>
