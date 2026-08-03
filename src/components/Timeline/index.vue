<template>
  <div class="timeline" :class="{ 'timeline--alternate': alternate, 'timeline--reverse': reverse }">
    <div
      v-for="(item, index) in items"
      :key="item.id ?? index"
      class="timeline-item"
      :class="getItemClass(item, index)"
    >
      <!-- 左侧内容（alternate 模式） -->
      <div v-if="alternate" class="timeline-item__content timeline-item__content--left">
        <slot name="content" :item="item" :index="index">
          <div class="timeline-card" :style="getCardStyle(item)">
            <div v-if="item.title" class="timeline-card__title">{{ item.title }}</div>
            <div v-if="item.content" class="timeline-card__body">{{ item.content }}</div>
            <div v-if="item.timestamp" class="timeline-card__time">{{ item.timestamp }}</div>
          </div>
        </slot>
      </div>

      <!-- 轴线 + 节点 -->
      <div class="timeline-item__axis">
        <!-- 竖线（上方） -->
        <div v-if="index !== 0" class="timeline-item__line timeline-item__line--top"></div>
        <!-- 节点圆点 -->
        <div class="timeline-item__node" :style="getNodeStyle(item)">
          <el-icon v-if="item.icon" :size="14" class="timeline-item__node-icon">
            <component :is="item.icon" />
          </el-icon>
        </div>
        <!-- 竖线（下方） -->
        <div v-if="index !== items.length - 1" class="timeline-item__line timeline-item__line--bottom"></div>
      </div>

      <!-- 右侧内容（或默认模式下的内容） -->
      <div class="timeline-item__content" :class="{ 'timeline-item__content--right': alternate }">
        <slot name="content" :item="item" :index="index" v-if="alternate">
          <!-- alternate 模式下右侧内容只在没有左侧时显示（通过 CSS 控制） -->
        </slot>
        <slot v-else :item="item" :index="index">
          <div class="timeline-card" :style="getCardStyle(item)">
            <div class="timeline-card__header">
              <div v-if="item.title" class="timeline-card__title">{{ item.title }}</div>
              <div v-if="item.timestamp" class="timeline-card__time">{{ item.timestamp }}</div>
            </div>
            <div v-if="item.content" class="timeline-card__body">{{ item.content }}</div>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

/** 时间线类型 */
export type TimelineType = 'primary' | 'success' | 'warning' | 'danger' | 'info'

/** 时间线项 */
export interface TimelineItem {
  /** 唯一标识 */
  id?: string | number
  /** 标题 */
  title?: string
  /** 内容 */
  content?: string
  /** 时间戳 */
  timestamp?: string
  /** 类型（控制颜色） */
  type?: TimelineType
  /** 图标 */
  icon?: any
}

interface TimelineProps {
  /** 时间线数据 */
  items: TimelineItem[]
  /** 是否交替展示（左右交替） */
  alternate?: boolean
  /** 是否反转 */
  reverse?: boolean
  /** 线条颜色（覆盖默认） */
  lineColor?: string
  /** 节点大小 */
  nodeSize?: number
}

const props = withDefaults(defineProps<TimelineProps>(), {
  alternate: false,
  reverse: false,
  lineColor: 'var(--el-border-color)',
  nodeSize: 24,
})

const typeColorMap: Record<TimelineType, string> = {
  primary: 'var(--el-color-primary)',
  success: 'var(--el-color-success)',
  warning: 'var(--el-color-warning)',
  danger: 'var(--el-color-danger)',
  info: 'var(--el-color-info)',
}

function getItemClass(item: TimelineItem, index: number) {
  return {
    'is-primary': item.type === 'primary',
    'is-success': item.type === 'success',
    'is-warning': item.type === 'warning',
    'is-danger': item.type === 'danger',
    'is-info': item.type === 'info',
    'is-left': props.alternate && index % 2 === 0,
    'is-right': props.alternate && index % 2 === 1,
  }
}

function getNodeStyle(item: TimelineItem): CSSProperties {
  const color = item.type ? typeColorMap[item.type] : 'var(--el-color-primary)'
  return {
    width: `${props.nodeSize}px`,
    height: `${props.nodeSize}px`,
    backgroundColor: color,
    borderColor: color,
  }
}

function getCardStyle(item: TimelineItem): CSSProperties {
  const color = item.type ? typeColorMap[item.type] : 'var(--el-color-primary)'
  return {
    '--timeline-color': color,
  }
}
</script>

<style scoped lang="scss">
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;

  &--reverse {
    flex-direction: column-reverse;
  }
}

.timeline-item {
  display: flex;
  position: relative;
  min-height: 60px;

  // 默认模式：轴线在左侧，内容在右侧
  .timeline-item__axis {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40px;
    flex-shrink: 0;
    margin-right: 16px;
  }

  .timeline-item__line {
    width: 2px;
    background-color: var(--el-border-color);
    flex: 1;
    min-height: 8px;

    &--top {
      margin-bottom: 4px;
    }

    &--bottom {
      margin-top: 4px;
    }
  }

  .timeline-item__node {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: var(--el-color-primary);
    border: 2px solid var(--el-color-primary);
    color: #fff;
    flex-shrink: 0;
    z-index: 1;
    box-shadow: 0 0 0 4px var(--el-color-primary-light-9);
  }

  .timeline-item__content {
    flex: 1;
    padding-bottom: 20px;
    min-width: 0;
  }

  .timeline-item__content--left {
    flex: 1;
    text-align: right;
    padding-right: 16px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .timeline-item__content--right {
    flex: 1;
    text-align: left;
    padding-left: 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  // 默认模式下隐藏左侧内容
  .timeline-item__content--left {
    display: none;
  }
}

// alternate 模式
.timeline--alternate {
  .timeline-item {
    .timeline-item__content--left {
      display: flex;
    }

    // 偶数项：内容在左
    &.is-left {
      .timeline-item__content--right {
        display: none;
      }
    }

    // 奇数项：内容在右
    &.is-right {
      .timeline-item__content--left {
        display: none;
      }
    }
  }
}

// 时间线卡片
.timeline-card {
  display: inline-block;
  max-width: 100%;
  padding: 12px 16px;
  background-color: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-left: 3px solid var(--timeline-color, var(--el-color-primary));
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
  text-align: left;
  transition: box-shadow 0.2s, transform 0.2s;

  &:hover {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
    transform: translateY(-1px);
  }

  &__header {
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-bottom: 6px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  &__time {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    white-space: nowrap;
  }

  &__body {
    font-size: 13px;
    color: var(--el-text-color-regular);
    line-height: 1.6;
  }
}
</style>
