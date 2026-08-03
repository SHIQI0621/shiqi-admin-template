<template>
  <div class="avatar-list" :class="{ 'avatar-list--bordered': bordered }">
    <!-- 堆叠模式（默认） -->
    <div v-if="mode === 'stack'" class="avatar-list__stack">
      <el-tooltip
        v-for="(item, index) in displayList"
        :key="index"
        :content="item.name || ''"
        :placement="tooltipPlacement"
      >
        <el-avatar
          :size="size"
          :src="item.avatar"
          :style="getStackStyle(index)"
          :class="[
            `avatar-list__avatar--${item.status}`  ,
            'avatar-list__avatar--stack'
          ]"
          @click="handleClick(item, index)"
        >
          {{ item.name ? item.name.charAt(0).toUpperCase() : '?' }}
        </el-avatar>
      </el-tooltip>
      <!-- "+N" 更多按钮 -->
      <el-tooltip
        v-if="hiddenCount > 0 && collapsed"
        content="展开"
        placement="top"
      >
        <el-avatar
          :size="size"
          class="avatar-list__avatar--more avatar-list__avatar--stack"
          :style="getMoreStyle()"
          @click="toggleCollapse"
        >
          +{{ hiddenCount }}
        </el-avatar>
      </el-tooltip>
    </div>

    <!-- 网格模式 -->
    <div v-else-if="mode === 'grid'" class="avatar-list__grid">
      <el-tooltip
        v-for="(item, index) in displayList"
        :key="index"
        :content="item.name || ''"
        :placement="tooltipPlacement"
      >
        <div class="avatar-list__grid-item" @click="handleClick(item, index)">
          <el-avatar
            :size="size"
            :src="item.avatar"
            :class="item.status ? `avatar-list__avatar--${item.status}` : ''"
          >
            {{ item.name ? item.name.charAt(0).toUpperCase() : '?' }}
          </el-avatar>
          <span v-if="showName && item.name" class="avatar-list__name">{{ item.name }}</span>
        </div>
      </el-tooltip>
    </div>

    <!-- 列表模式 -->
    <div v-else class="avatar-list__list">
      <div
        v-for="(item, index) in displayList"
        :key="index"
        class="avatar-list__list-item"
        @click="handleClick(item, index)"
      >
        <el-avatar
          :size="size"
          :src="item.avatar"
          :class="item.status ? `avatar-list__avatar--${item.status}` : ''"
        >
          {{ item.name ? item.name.charAt(0).toUpperCase() : '?' }}
        </el-avatar>
        <div v-if="item.name || item.email" class="avatar-list__info">
          <div v-if="item.name" class="avatar-list__info-name">{{ item.name }}</div>
          <div v-if="item.email" class="avatar-list__info-email">{{ item.email }}</div>
        </div>
        <el-tag
          v-if="item.status && statusMap[item.status]"
          :type="statusMap[item.status].type"
          size="small"
        >
          {{ statusMap[item.status].label }}
        </el-tag>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'

export interface AvatarItem {
  name?: string
  avatar?: string
  email?: string
  status?: 'online' | 'offline' | 'busy' | 'away'
  [key: string]: any
}

interface Props {
  list: AvatarItem[]
  mode?: 'stack' | 'grid' | 'list'
  size?: number
  max?: number
  collapsed?: boolean
  showName?: boolean
  bordered?: boolean
  tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right'
  overlap?: number
}

const props = withDefaults(defineProps<Props>(), {
  mode: 'stack',
  size: 36,
  max: 5,
  collapsed: true,
  showName: true,
  bordered: false,
  tooltipPlacement: 'top',
  overlap: 0.4,
})

const emit = defineEmits<{
  (e: 'click', item: AvatarItem, index: number): void
  (e: 'toggle', collapsed: boolean): void
}>()

// 状态映射
const statusMap: Record<string, { label: string; type: 'success' | 'danger' | 'warning' | 'info' }> = {
  online: { label: '在线', type: 'success' },
  offline: { label: '离线', type: 'info' },
  busy: { label: '忙碌', type: 'danger' },
  away: { label: '离开', type: 'warning' },
}

// 折叠状态
const isCollapsed = ref(props.collapsed)

// 显示的列表
const displayList = computed(() => {
  if (!isCollapsed.value || props.list.length <= props.max) {
    return props.list
  }
  return props.list.slice(0, props.max)
})

// 隐藏的数量
const hiddenCount = computed(() => {
  if (!isCollapsed.value) return 0
  return Math.max(0, props.list.length - props.max)
})

// 堆叠间距（负数margin实现堆叠效果）
const overlapOffset = computed(() => props.size * props.overlap)

// 获取堆叠样式
function getStackStyle(index: number): Record<string, string> {
  const marginLeft = index === 0 ? 0 : -overlapOffset.value
  return {
    marginLeft: `${marginLeft}px`,
    zIndex: String(index + 1),
  }
}

// 获取更多按钮样式
function getMoreStyle(): Record<string, string> {
  const count = displayList.value.length
  const marginLeft = count === 0 ? 0 : -overlapOffset.value
  return {
    marginLeft: `${marginLeft}px`,
    zIndex: String(count + 1),
  }
}

// 点击
function handleClick(item: AvatarItem, index: number) {
  emit('click', item, index)
}

// 切换折叠
function toggleCollapse() {
  isCollapsed.value = !isCollapsed.value
  emit('toggle', isCollapsed.value)
}
</script>

<style scoped lang="scss">
.avatar-list {
  display: inline-flex;
  
  &--bordered {
    padding: 8px;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
  }

  // 堆叠模式
  &__stack {
    display: flex;
    align-items: center;
  }

  &__avatar--stack {
    border: 2px solid #fff;
    transition: transform 0.2s, z-index 0s;
    position: relative;
    cursor: pointer;

    &:hover {
      transform: translateY(-4px);
      z-index: 999 !important;
    }
  }

  &__avatar--more {
    background-color: var(--el-color-info-light-9);
    color: var(--el-color-info);
    font-size: 12px;
    font-weight: 600;
  }

  &__avatar--online {
    box-shadow: 0 0 0 2px var(--el-color-success);
  }

  &__avatar--offline {
    opacity: 0.6;
  }

  &__avatar--busy {
    box-shadow: 0 0 0 2px var(--el-color-danger);
  }

  &__avatar--away {
    box-shadow: 0 0 0 2px var(--el-color-warning);
  }

  // 网格模式
  &__grid {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
  }

  &__grid-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.1);
    }
  }

  &__name {
    font-size: 12px;
    color: var(--el-text-color-regular);
  }

  // 列表模式
  &__list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  &__list-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 12px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--el-fill-color-light);
    }
  }

  &__info {
    flex: 1;
  }

  &__info-name {
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  &__info-email {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}
</style>