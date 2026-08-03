<template>
  <el-dialog
    v-model="dialogVisible"
    :title="title"
    :width="width"
    :top="top"
    :fullscreen="isFullscreen"
    :modal="modal"
    :modal-append-to-body="modalAppendToBody"
    :append-to-body="appendToBody"
    :lock-scroll="lockScroll"
    :custom-class="dialogClass"
    :close-on-click-modal="closeOnClickModal"
    :close-on-press-escape="closeOnPressEscape"
    :show-close="false"
    :before-close="handleBeforeClose"
    :center="center"
    :align-center="alignCenter"
    :destroy-on-close="destroyOnClose"
    :open-delay="openDelay"
    :aria-level="ariaLevel"
    :draggable="draggable"
    :style="{ '--dialog-border-radius': borderRadiusValue }"
    @open="handleOpen"
    @opened="handleOpened"
    @close="handleClose"
    @closed="handleClosed"
    @update:model-value="handleUpdateModelValue"
  >
    <!-- 头部：标题 + 右上角操作按钮 -->
    <template #header>
      <div class="dialog-header-content">
        <slot name="header">
          <span class="dialog-title">{{ title }}</span>
        </slot>
        <div class="dialog-actions">
          <button
            v-if="showFullscreen"
            class="dialog-action-btn"
            :title="isFullscreen ? '退出全屏' : '全屏'"
            @click="toggleFullscreen"
          >
            <IconView
              :name="!isFullscreen ? 'Monitor' : 'Platform'"
              :size="18"
            />
          </button>
          <button
            v-if="showClose"
            class="dialog-action-btn"
            title="关闭"
            @click="handleCloseClick"
          >
            <IconView name="Close" :size="18" />
          </button>
        </div>
      </div>
    </template>

    <template #default>
      <slot />
    </template>
    <template #footer v-if="$slots.footer">
      <slot name="footer" />
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed, nextTick } from "vue";

interface Props {
  modelValue?: boolean;
  title?: string;
  width?: string | number;
  top?: string;
  modal?: boolean;
  modalAppendToBody?: boolean;
  appendToBody?: boolean;
  lockScroll?: boolean;
  customClass?: string;
  closeOnClickModal?: boolean;
  closeOnPressEscape?: boolean;
  showClose?: boolean;
  center?: boolean;
  alignCenter?: boolean;
  destroyOnClose?: boolean;
  openDelay?: number;
  ariaLevel?: string;
  draggable?: boolean;
  dragBoundary?: "viewport" | "parent";
  dragOnOpen?: boolean;
  /** 圆角大小 */
  borderRadius?: string | number;
  /** 是否显示全屏按钮 */
  showFullscreen?: boolean;
  /** 默认全屏 */
  defaultFullscreen?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  title: "",
  width: "50%",
  top: "15vh",
  modal: true,
  modalAppendToBody: true,
  appendToBody: false,
  lockScroll: true,
  customClass: "",
  closeOnClickModal: true,
  closeOnPressEscape: true,
  showClose: true,
  center: false,
  alignCenter: true,
  destroyOnClose: false,
  openDelay: 0,
  ariaLevel: "dialog",
  draggable: false,
  dragBoundary: "viewport",
  dragOnOpen: true,
  borderRadius: 16,
  showFullscreen: false,
  defaultFullscreen: false,
});

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "open"): void;
  (e: "opened"): void;
  (e: "close"): void;
  (e: "closed"): void;
  (e: "fullscreen", value: boolean): void;
}>();

const dialogVisible = ref(props.modelValue);
const isFullscreen = ref(props.defaultFullscreen);

watch(
  () => props.modelValue,
  (val) => {
    dialogVisible.value = val;
  },
);

watch(dialogVisible, (val) => {
  emit("update:modelValue", val);
});

const borderRadiusValue = computed(() => {
  if (typeof props.borderRadius === "number") {
    return `${props.borderRadius}px`;
  }
  return props.borderRadius;
});

const dialogClass = computed(() => {
  return [
    props.customClass,
    "app-dialog",
    {
      "dialog-draggable": props.draggable,
      "dialog-no-animation": props.draggable && props.dragOnOpen,
    },
  ];
});

const toggleFullscreen = () => {
  isFullscreen.value = !isFullscreen.value;
  emit("fullscreen", isFullscreen.value);
}

const handleCloseClick = () => {
  dialogVisible.value = false;
}

const handleBeforeClose = (done: () => void) => {
  done();
}

const handleOpen = () => {
  emit("open");
}

const handleOpened = () => {
  emit("opened");
}

const handleClose = () => {
  emit("close");
}

const handleClosed = () => {
  emit("closed");
}

const handleUpdateModelValue = (val: boolean) => {
  emit("update:modelValue", val);
}

// 获取对话框 DOM 元素
const getDialogEl = (): HTMLElement | null => {
  let dialog = document.querySelector(
    ".dialog-draggable",
  ) as HTMLElement | null;
  if (!dialog) {
    dialog = document.querySelector(".el-dialog") as HTMLElement | null;
  }
  return dialog;
}

const resetPosition = () => {
  nextTick(() => {
    const dialog = getDialogEl();
    if (dialog) {
      dialog.style.transform = "";
    }
  });
}

defineExpose({
  resetPosition,
  toggleFullscreen,
  isFullscreen,
});
</script>

<style scoped lang="scss">
// 对话框圆角（非全屏）
:deep(.el-dialog:not(.is-fullscreen)) {
  border-radius: var(--dialog-border-radius, 16px);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

:deep(.el-dialog__body) {
  flex: 1;
}

// 头部内容布局
.dialog-header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.dialog-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

// 右上角操作按钮组
.dialog-actions {
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
}

.dialog-action-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 6px;
  color: var(--el-text-color-secondary);
  transition: all 0.2s;
  flex-shrink: 0;
  padding: 0;

  &:hover {
    background-color: var(--el-fill-color);
    color: var(--el-text-color-primary);
  }

  .el-icon {
    font-size: 16px;
  }
}

// ========== 全屏模式：flex 纵向布局 ==========
// dialog 本体变为 flex 容器
:deep(.el-dialog.is-fullscreen) {
  display: flex !important;
  flex-direction: column !important;
  height: 100vh !important;
  max-height: 100vh !important;
  border-radius: 0 !important;
  overflow: hidden !important;
}

// header 固定顶部
:deep(.el-dialog.is-fullscreen .el-dialog__header) {
  flex-shrink: 0 !important;
  margin-right: 0 !important;
  padding: 16px 20px !important;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

// body 占满剩余空间，可滚动
:deep(.el-dialog.is-fullscreen .el-dialog__body) {
  flex: 1;
  overflow: auto !important;
  padding: 20px !important;
}

// footer 固定底部
:deep(.el-dialog.is-fullscreen .el-dialog__footer) {
  flex-shrink: 0 !important;
  padding: 12px 20px !important;
  border-top: 1px solid var(--el-border-color-lighter);
  text-align: right !important;
}

// ========== 可拖拽对话框样式 ==========
:deep(.el-dialog.dialog-draggable .el-dialog__header) {
  cursor: move;
  user-select: none;
}

:deep(.el-dialog.dialog-draggable .el-dialog__body) {
  overflow: auto;
}

:deep(.el-dialog.dialog-draggable .el-dialog__headerbtn) {
  cursor: pointer;
}
</style>
