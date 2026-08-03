<template>
  <div class="text-ellipsis-wrapper" :class="wrapperClass">
    <!-- 文本内容 -->
    <el-tooltip
      v-if="showTooltip && isTruncated"
      :content="text"
      :placement="placement"
      :effect="tooltipEffect"
      :popper-class="popperClass"
      :show-after="showAfter"
      :hide-after="hideAfter"
      :offset="offset"
      :show-arrow="showArrow"
      :teleported="teleported"
      :disabled="!isTruncated"
    >
      <span
        ref="textRef"
        class="text-ellipsis-content"
        :style="contentStyle"
        @click="handleClick"
      >
        {{ displayText }}
        <span v-if="isExpandable && !isExpanded" class="expand-toggle" @click.stop="toggleExpand">
          {{ expandText }}
        </span>
        <span v-if="isExpandable && isExpanded" class="expand-toggle collapse" @click.stop="toggleExpand">
          {{ collapseText }}
        </span>
        <el-icon
          v-if="copyable && isCopied"
          class="copy-icon success"
          @click.stop="handleCopy"
        >
          <Check />
        </el-icon>
      </span>
    </el-tooltip>

    <span
      v-else
      ref="textRef"
      class="text-ellipsis-content"
      :style="contentStyle"
      @click="handleClick"
    >
      {{ displayText }}
      <span v-if="isExpandable && !isExpanded" class="expand-toggle" @click.stop="toggleExpand">
        {{ expandText }}
      </span>
      <span v-if="isExpandable && isExpanded" class="expand-toggle collapse" @click.stop="toggleExpand">
        {{ collapseText }}
      </span>
      <el-icon
        v-if="copyable && isCopied"
        class="copy-icon success"
        @click.stop="handleCopy"
      >
        <Check />
      </el-icon>
    </span>

    <!-- 复制按钮 -->
    <el-tooltip
      v-if="copyable && !isCopied"
      content="点击复制"
      :placement="copyTooltipPlacement"
      effect="dark"
    >
      <el-icon
        class="copy-icon"
        @click.stop="handleCopy"
      >
        <CopyDocument />
      </el-icon>
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import { Check, CopyDocument } from '@element-plus/icons-vue'

interface Props {
  text: string
  lines?: number
  width?: string | number
  expandable?: boolean
  copyable?: boolean
  showTooltip?: boolean
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end'
  tooltipEffect?: 'dark' | 'light'
  popperClass?: string
  showAfter?: number
  hideAfter?: number
  offset?: number
  showArrow?: boolean
  teleported?: boolean
  expandText?: string
  collapseText?: string
  copyTooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
}

const props = withDefaults(defineProps<Props>(), {
  lines: 1,
  width: '',
  expandable: false,
  copyable: false,
  showTooltip: true,
  placement: 'top',
  tooltipEffect: 'dark',
  popperClass: '',
  showAfter: 0,
  hideAfter: 200,
  offset: 12,
  showArrow: true,
  teleported: true,
  expandText: '展开',
  collapseText: '收起',
  copyTooltipPlacement: 'right'
})

const textRef = ref<HTMLElement | null>(null)
const isTruncated = ref(false)
const isExpanded = ref(false)
const isCopied = ref(false)

const wrapperClass = computed(() => ({
  'is-expanded': isExpanded.value,
  'is-truncated': isTruncated.value,
  'is-copyable': props.copyable
}))

const contentStyle = computed(() => {
  const style: Record<string, string> = {}

  if (props.width) {
    style.width = typeof props.width === 'number' ? `${props.width}px` : props.width
    style.maxWidth = style.width
  }

  if (!isExpanded.value && isTruncated.value) {
    style.display = '-webkit-box'
    style.webkitLineClamp = String(props.lines)
    style.webkitBoxOrient = 'vertical'
    style.overflow = 'hidden'
  } else if (!isExpanded.value && !isTruncated.value) {
    style.whiteSpace = 'nowrap'
    style.overflow = 'hidden'
    style.textOverflow = 'ellipsis'
  }

  return style
})

const displayText = computed(() => {
  return props.text
})

const isExpandable = computed(() => {
  return props.expandable && isTruncated.value
})

function checkTruncation() {
  nextTick(() => {
    if (!textRef.value) return

    const el = textRef.value
    const scrollHeight = el.scrollHeight
    const clientHeight = el.clientHeight
    const scrollWidth = el.scrollWidth
    const clientWidth = el.clientWidth

    isTruncated.value = scrollHeight > clientHeight + 1 || scrollWidth > clientWidth + 1
  })
}

function toggleExpand() {
  isExpanded.value = !isExpanded.value
  nextTick(() => {
    checkTruncation()
  })
}

function handleClick() {
}

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.text)
    isCopied.value = true
    ElMessage.success('已复制到剪贴板')

    setTimeout(() => {
      isCopied.value = false
    }, 2000)
  } catch (err) {
    const textarea = document.createElement('textarea')
    textarea.value = props.text
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      isCopied.value = true
      ElMessage.success('已复制到剪贴板')
      setTimeout(() => {
        isCopied.value = false
      }, 2000)
    } catch (e) {
      ElMessage.error('复制失败')
    }
    document.body.removeChild(textarea)
  }
}

let resizeObserver: ResizeObserver | null = null

onMounted(() => {
  checkTruncation()

  if (typeof ResizeObserver !== 'undefined' && textRef.value) {
    resizeObserver = new ResizeObserver(() => {
      checkTruncation()
    })
    resizeObserver.observe(textRef.value)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver) {
    resizeObserver.disconnect()
    resizeObserver = null
  }
})

watch(
  () => props.text,
  () => {
    isExpanded.value = false
    nextTick(() => {
      checkTruncation()
    })
  }
)

watch(
  () => props.lines,
  () => {
    isExpanded.value = false
    nextTick(() => {
      checkTruncation()
    })
  }
)
</script>

<style scoped lang="scss">
.text-ellipsis-wrapper {
  display: inline-flex;
  align-items: center;
  width: 100%;
  max-width: 100%;
  position: relative;

  .text-ellipsis-content {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    word-break: break-all;
    line-height: 1.5;
    cursor: default;
    transition: color 0.2s ease;
    flex: 1;
    min-width: 0;
  }

  &.is-truncated .text-ellipsis-content {
    cursor: help;
  }

  &.is-expanded .text-ellipsis-content {
    display: block;
    overflow: visible;
    -webkit-line-clamp: unset;
    white-space: normal;
  }

  .expand-toggle {
    color: var(--el-color-primary);
    cursor: pointer;
    margin-left: 4px;
    flex-shrink: 0;
    user-select: none;
    transition: color 0.2s ease;

    &:hover {
      color: var(--el-color-primary-light-3);
      text-decoration: underline;
    }

    &.collapse {
      color: var(--el-color-primary);
    }
  }

  .copy-icon {
    display: inline-flex;
    margin-left: 6px;
    cursor: pointer;
    color: var(--el-text-color-placeholder);
    font-size: 14px;
    flex-shrink: 0;
    transition: color 0.2s ease, transform 0.2s ease;

    &:hover {
      color: var(--el-color-primary);
      transform: scale(1.1);
    }

    &.success {
      color: var(--el-color-success);
    }
  }

  &:hover .text-ellipsis-content {
    color: var(--el-color-primary);
  }

  &.is-copyable:hover .copy-icon {
    opacity: 1;
  }

  &:not(.is-copyable) .copy-icon {
    display: none;
  }
}
</style>
