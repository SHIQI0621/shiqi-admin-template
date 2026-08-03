<template>
  <div class="image-preview-wrapper">
    <el-image
      v-if="previewTrigger === 'click'"
      :src="images[index]"
      :preview-src-list="images"
      :initial-index="index"
      fit="contain"
      class="image-thumbnail"
      @click="handleThumbnailClick"
    >
      <template #error>
        <div class="image-error">
          <el-icon :size="40"><Picture /></el-icon>
          <span>加载失败</span>
        </div>
      </template>
    </el-image>

    <ElImageViewer
      v-if="modelValue"
      :url-list="images"
      :initial-index="index"
      @close="handleClose"
      @switch="handleSwitch"
    />
  </div>
</template>

<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'
import { ElImageViewer } from 'element-plus'

interface Props {
  images: string[]
  modelValue: boolean
  index?: number
  fit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
  previewTrigger?: 'click' | 'manual'
}

const props = withDefaults(defineProps<Props>(), {
  index: 0,
  fit: 'contain',
  previewTrigger: 'manual',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'update:index', index: number): void
  (e: 'close'): void
  (e: 'switch', index: number): void
}>()

function handleThumbnailClick() {
  emit('update:modelValue', true)
}

function handleClose() {
  emit('update:modelValue', false)
  emit('close')
}

function handleSwitch(index: number) {
  emit('update:index', index)
  emit('switch', index)
}

defineExpose({
  show: () => emit('update:modelValue', true),
  hide: () => emit('update:modelValue', false),
})
</script>

<style scoped lang="scss">
.image-preview-wrapper {
  width: 100%;
  height: 100%;
}

.image-thumbnail {
  width: 100%;
  height: 100%;
  max-height: 400px;
  cursor: zoom-in;
}

.image-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  color: #909399;
  font-size: 14px;
  gap: 8px;
}
</style>
