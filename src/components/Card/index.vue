<template>
  <el-card
    class="app-card"
    :class="cardClasses"
    :style="cardStyle"
    :shadow="shadow"
    :body-style="mergedBodyStyle"
  >
    <!-- 头部：标题 + 图标 + 右侧操作区 -->
    <template
      #header
      v-if="$slots.header || title || icon || $slots['header-right']"
    >
      <div class="app-card__header">
        <div class="app-card__header-left">
          <slot name="header">
            <el-icon v-if="iconName" class="app-card__icon" :size="iconSize">
              <component :is="iconComponent" />
            </el-icon>
            <span v-if="title" class="app-card__title">{{ title }}</span>
          </slot>
        </div>
        <div v-if="$slots['header-right']" class="app-card__header-right">
          <slot name="header-right" />
        </div>
      </div>
    </template>

    <!-- 默认内容区 -->
    <slot>
      <p v-if="description" class="app-card__desc">{{ description }}</p>
    </slot>

    <!-- 底部页脚 -->
    <template #footer v-if="$slots.footer">
      <div class="app-card__footer" :class="`app-card__footer--${footerAlign}`">
        <slot name="footer" />
      </div>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";

type ShadowType = "always" | "hover" | "never";
type FooterAlign = "left" | "center" | "right";

interface Props {
  /** 卡片标题 */
  title?: string;
  /** 标题左侧图标（Element Plus 图标名称） */
  icon?: string;
  /** 图标大小 */
  iconSize?: number;
  /** 卡片描述文字（当无默认插槽时作为内容） */
  description?: string;
  /** 是否显示边框 */
  bordered?: boolean;
  /** 自定义圆角大小 */
  borderRadius?: string | number;
  /** 阴影显示方式 */
  shadow?: ShadowType;
  /** 页脚对齐方式 */
  footerAlign?: FooterAlign;
  /** 自定义 body 样式 */
  bodyStyle?: Record<string, string>;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  icon: "",
  iconSize: 18,
  description: "",
  bordered: false,
  borderRadius: "",
  shadow: "never",
  footerAlign: "right",
  bodyStyle: () => ({}),
});

const cardClasses = computed(() => ({
  "app-card--bordered": props.bordered,
}));

const cardStyle = computed(() => {
  const style: Record<string, string> = {};
  if (props.borderRadius) {
    const radius =
      typeof props.borderRadius === "number"
        ? `${props.borderRadius}px`
        : props.borderRadius;
    style.borderRadius = radius;
  }
  return style;
});

// 合并 body 样式
const mergedBodyStyle = computed(() => ({
  padding: "20px",
  ...props.bodyStyle,
}));

// 图标组件解析
const iconName = computed(() => props.icon || "");

const iconComponent = computed(() => {
  if (!props.icon) return null;
  return (ElementPlusIconsVue as any)[props.icon] || null;
});
</script>

<style scoped lang="scss">
.app-card {
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &--bordered {
    border: 1px solid var(--el-border-color-lighter);
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  &__header-left {
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    gap: 8px;
  }

  &__header-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  &__icon {
    color: var(--el-text-color-secondary);
    flex-shrink: 0;
  }

  &__title {
    font-size: 16px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  &__desc {
    margin: 0;
    font-size: 14px;
    line-height: 1.6;
    color: var(--el-text-color-regular);
  }

  &__footer {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px 20px;
    border-top: 1px solid var(--el-border-color-lighter);
    background-color: var(--el-fill-color-lighter);
    margin: -20px;
    margin-top: 0;

    &--left {
      justify-content: flex-start;
    }
    &--center {
      justify-content: center;
    }
    &--right {
      justify-content: flex-end;
    }
  }

  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid var(--el-border-color-lighter);
  }

  :deep(.el-card__body) {
    padding: 20px;
  }
}
</style>
