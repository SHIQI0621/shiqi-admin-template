<template>
  <el-dropdown trigger="click" @command="handleSwitch" class="size-selector">
    <div class="size-trigger">
     <el-tooltip content="组件大小" placement="top">
      <img src="@/assets/size.svg" alt="组件大小" class="size-img" />
     </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="size in sizes" :key="size.value" :command="size.value">
          <span>{{ size.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

const appStore = useAppStore()

type ElementSize = '' | 'default' | 'small' | 'large'

// 组件大小列表
const sizes: { value: ElementSize; label: string }[] = [
  { value: 'large', label: '大' },
  { value: 'default', label: '默认' },
  { value: 'small', label: '小' },
]

// 切换组件大小
function handleSwitch(size: ElementSize | undefined) {
  if (size) {
    appStore.setElementSize(size)
  }
}
</script>

<style scoped lang="scss">
.size-selector {
  .size-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 8px;
    height: 50px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }

    span {
      font-size: 14px;
      color: var(--el-text-color-primary, #303133);
    }
  }
}
</style>
