<template>
  <div class="copy-text-container">
    <span class="copy-text">{{ displayText }}</span>
    <button
      class="copy-btn"
      @click="handleCopy"
      :class="{ 'copied': copied }"
      :title="copied ? '已复制' : '复制'"
    >
      <el-icon v-if="!copied"><CopyDocument /></el-icon>
      <el-icon v-else><Check /></el-icon>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CopyDocument, Check } from '@element-plus/icons-vue'

interface Props {
  text: string
  maxLength?: number
  showTooltip?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxLength: 30,
  showTooltip: true,
})

const emit = defineEmits<{
  (e: 'copied', text: string): void
}>()

const copied = ref(false)

const displayText = computed(() => {
  if (!props.text) return ''
  if (props.text.length <= props.maxLength) return props.text
  return props.text.slice(0, props.maxLength) + '...'
})

async function handleCopy() {
  try {
    await navigator.clipboard.writeText(props.text)
    copied.value = true
    emit('copied', props.text)
    ElMessage.success('复制成功')

    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('复制失败:', err)
    ElMessage.error('复制失败')
  }
}
</script>

<style scoped lang="scss">
.copy-text-container {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 4px 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.copy-text {
  font-size: 14px;
  color: #606266;
  white-space: nowrap;
}

.copy-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  color: #909399;
  cursor: pointer;
  border-radius: 4px;
  transition: all 0.2s;

  &:hover {
    background: #e4e7ed;
    color: #409eff;
  }

  &.copied {
    color: #67c23a;
  }
}
</style>
