<template>
  <el-button
    ref="buttonRef"
    :type="type"
    :size="size"
    :plain="plain"
    :round="round"
    :circle="circle"
    :disabled="disabled || isDisabled"
    :loading="loading"
    :loading-delay="loadingDelay"
    @click="onClick"
    v-bind="$attrs"
  >
    <template v-if="icon && !$slots.icon">
      <el-icon class="el-icon--left">
        <component :is="icon" />
      </el-icon>
    </template>
    <slot name="icon" />
    <slot />
  </el-button>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount, watch, computed } from 'vue'
import { debounce, throttle } from '@/utils/performance'

type ButtonType = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'
type ButtonSize = 'large' | 'default' | 'small'
type TriggerMode = 'debounce' | 'throttle'

interface Props {
  type?: ButtonType
  size?: ButtonSize
  plain?: boolean
  round?: boolean
  circle?: boolean
  disabled?: boolean
  icon?: string | object
  debounceTime?: number
  throttleTime?: number
  trigger?: TriggerMode
  loadingDelay?: number
  autoLoading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'default',
  size: 'default',
  plain: false,
  round: false,
  circle: false,
  disabled: false,
  icon: '',
  debounceTime: 300,
  throttleTime: 300,
  trigger: 'debounce',
  loadingDelay: 200,
  autoLoading: true
})

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

const buttonRef = ref<HTMLElement | null>(null)
void buttonRef
const loading = ref(false)
let loadingTimer: ReturnType<typeof setTimeout> | null = null
let isProcessing = false
let debouncedFn: ((event: MouseEvent) => void) | null = null
let throttledFn: ((event: MouseEvent) => void) | null = null

const isDisabled = computed(() => props.disabled || loading.value)

const showLoading = () => {
  if (!props.autoLoading) return
  if (props.loadingDelay > 0) {
    loadingTimer = setTimeout(() => {
      if (isProcessing) {
        loading.value = true
      }
    }, props.loadingDelay)
  } else {
    loading.value = true
  }
}

const hideLoading = () => {
  if (loadingTimer) {
    clearTimeout(loadingTimer)
    loadingTimer = null
  }
  loading.value = false
}

const originalHandler = (event: MouseEvent) => {
  if (isProcessing) return
  isProcessing = true
  showLoading()
  
  try {
    emit('click', event)
  } catch (e) {
    // 忽略错误，仍然关闭 loading
  }
  
  hideLoading()
  isProcessing = false
}

const createHandlers = () => {
  if (debouncedFn) {
    debouncedFn = null
  }
  if (throttledFn) {
    throttledFn = null
  }
  
  if (props.trigger === 'debounce') {
    debouncedFn = debounce(originalHandler, props.debounceTime)
  } else {
    throttledFn = throttle(originalHandler, props.throttleTime)
  }
}

const onClick = (event: MouseEvent) => {
  if (props.trigger === 'debounce') {
    debouncedFn?.(event)
  } else {
    throttledFn?.(event)
  }
}

watch(
  () => [props.trigger, props.debounceTime, props.throttleTime],
  () => {
    createHandlers()
  },
  { immediate: true }
)

onBeforeUnmount(() => {
  if (loadingTimer) {
    clearTimeout(loadingTimer)
  }
  isProcessing = false
  debouncedFn = null
  throttledFn = null
})
</script>

<style scoped lang="scss">
:deep(.el-button) {
  .el-icon--left {
    margin-right: 4px;
  }
}
</style>
