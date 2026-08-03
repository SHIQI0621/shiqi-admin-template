<template>
  <el-tooltip :content="isFullscreen ? '退出全屏' : '全屏'" placement="bottom">
    <div class="fullscreen-toggle" @click="handleToggle">
      <IconView :name="isFullscreen ? 'Platform' : 'Monitor'" :size="18" />
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '@/stores'

const appStore = useAppStore()
const isFullscreen = computed(() => appStore.isFullscreen)

function handleToggle() {
  appStore.toggleFullscreen()
}
</script>

<style scoped lang="scss">
.fullscreen-toggle {
  height: 50px;
  line-height: 50px;
  padding: 0 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  position: relative;
  flex-shrink: 0;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }
}
</style>
