<template>
  <el-tag
    ref="tagRef"
    :type="elTagType"
    :effect="effect"
    :size="size"
    :round="round"
    :circle="circle"
    :closable="closable"
    :disable-transitions="disableTransitions"
    @close="handleClose"
    @click="handleClick"
    v-bind="$attrs"
    :class="baseTagClass"
  >
    <template v-if="icon && !$slots.icon">
      <el-icon class="base-tag-icon">
        <component :is="icon" />
      </el-icon>
    </template>
    <slot name="icon" />
    <span v-if="text && !$slots.default">{{ text }}</span>
    <slot />
  </el-tag>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { TagInstance } from 'element-plus'

type TagType = 'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'
type TagEffect = 'dark' | 'light' | 'plain'
type TagSize = 'large' | 'default' | 'small'

interface Props {
  type?: TagType
  effect?: TagEffect
  size?: TagSize
  round?: boolean
  circle?: boolean
  closable?: boolean
  disableTransitions?: boolean
  text?: string
  icon?: string | object
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  effect: 'light',
  size: 'default',
  round: false,
  circle: false,
  closable: false,
  disableTransitions: false,
  text: '',
  icon: ''
})

const tagRef = ref<TagInstance | null>(null)

// el-tag 的 type 合法值为 'primary' | 'success' | 'info' | 'warning' | 'danger'
// 它不接受 'default' 字符串：默认（无主题色）样式通过不传 type（undefined）实现
// 因此自定义的 'default' 映射为 undefined，其余颜色原样透传
const elTagType = computed<'primary' | 'success' | 'info' | 'warning' | 'danger' | undefined>(() => {
  if (props.type === 'default') return undefined
  return props.type
})


const emit = defineEmits<{
  (e: 'close', event: MouseEvent): void
  (e: 'click', event: MouseEvent): void
}>()

const baseTagClass = computed(() => ({
  'base-tag': true,
  [`base-tag--${props.type}`]: true,
  [`base-tag--${props.effect}`]: true,
  [`base-tag--${props.size}`]: true,
  'base-tag--round': props.round,
  'base-tag--circle': props.circle
}))

function handleClose(event: MouseEvent) {
  emit('close', event)
}

function handleClick(event: MouseEvent) {
  emit('click', event)
}

defineExpose({
  tagRef,
  handleClose,
  handleClick
})
</script>

<style scoped lang="scss">
.base-tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 0 8px;
  line-height: 22px;
  border-radius: 4px;
  border: 1px solid transparent;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s ease;
  cursor: pointer;
  user-select: none;

  &:hover {
    opacity: 0.9;
  }

  .base-tag-icon {
    font-size: 12px;
  }

  // ==================== 主题: dark ====================
  &--dark {
    &.base-tag--default {
      background-color: var(--el-fill-color);
      border-color: var(--el-fill-color);
      color: var(--el-text-color-regular);
    }

    &.base-tag--primary {
      background-color: var(--el-color-primary);
      border-color: var(--el-color-primary);
      color: #fff;
    }

    &.base-tag--success {
      background-color: var(--el-color-success);
      border-color: var(--el-color-success);
      color: #fff;
    }

    &.base-tag--info {
      background-color: var(--el-color-info);
      border-color: var(--el-color-info);
      color: #fff;
    }

    &.base-tag--warning {
      background-color: var(--el-color-warning);
      border-color: var(--el-color-warning);
      color: #fff;
    }

    &.base-tag--danger {
      background-color: var(--el-color-danger);
      border-color: var(--el-color-danger);
      color: #fff;
    }
  }

  // ==================== 主题: light ====================
  &--light {
    &.base-tag--default {
      background-color: var(--el-fill-color-light);
      border-color: var(--el-fill-color-light);
      color: var(--el-text-color-regular);
    }

    &.base-tag--primary {
      background-color: var(--el-color-primary-light-9);
      border-color: var(--el-color-primary-light-7);
      color: var(--el-color-primary);
    }

    &.base-tag--success {
      background-color: var(--el-color-success-light-9);
      border-color: var(--el-color-success-light-7);
      color: var(--el-color-success);
    }

    &.base-tag--info {
      background-color: var(--el-color-info-light-9);
      border-color: var(--el-color-info-light-7);
      color: var(--el-color-info);
    }

    &.base-tag--warning {
      background-color: var(--el-color-warning-light-9);
      border-color: var(--el-color-warning-light-7);
      color: var(--el-color-warning);
    }

    &.base-tag--danger {
      background-color: var(--el-color-danger-light-9);
      border-color: var(--el-color-danger-light-7);
      color: var(--el-color-danger);
    }
  }

  // ==================== 主题: plain ====================
  &--plain {
    background-color: transparent;

    &.base-tag--default {
      border-color: var(--el-border-color);
      color: var(--el-text-color-regular);
    }

    &.base-tag--primary {
      border-color: var(--el-color-primary);
      color: var(--el-color-primary);
    }

    &.base-tag--success {
      border-color: var(--el-color-success);
      color: var(--el-color-success);
    }

    &.base-tag--info {
      border-color: var(--el-color-info);
      color: var(--el-color-info);
    }

    &.base-tag--warning {
      border-color: var(--el-color-warning);
      color: var(--el-color-warning);
    }

    &.base-tag--danger {
      border-color: var(--el-color-danger);
      color: var(--el-color-danger);
    }
  }

  // ==================== 圆角 ====================
  &--round {
    border-radius: 6px;
  }

  // ==================== 圆形 ====================
  &--circle {
    border-radius: 50%;
    padding: 0;
    width: 22px;
    height: 22px;
    text-align: center;
  }

  // ==================== 尺寸 ====================
  &--large {
    padding: 0 10px;
    line-height: 26px;
    font-size: 14px;
  }

  &--small {
    padding: 0 6px;
    line-height: 18px;
    font-size: 11px;
  }
}
</style>
