<template>
  <div ref="containerRef" class="draggable-container">
    <div
      v-for="(item, index) in modelValue"
      :key="item[itemKey]"
      :data-index="index"
      class="draggable-item"
      :class="{ 'is-dragging': dragIndex === index, 'is-over': overIndex === index }"
      :style="{ transition: dragIndex === -1 ? 'all 0.2s' : 'none', transform: getTransform(index) }"
      draggable="true"
      @dragstart="onDragStart($event, index)"
      @dragend="onDragEnd"
      @dragover="onDragOver($event, index)"
      @dragenter="onDragEnter($event, index)"
      @drop="onDrop($event, index)"
    >
      <slot name="item" :element="item" :index="index" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: any[]
  itemKey: string
  handle?: string
  animation?: string | number
}

const props = withDefaults(defineProps<Props>(), {
  handle: '',
  animation: 200,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: any[]): void
}>()

const containerRef = ref<HTMLElement>()
void containerRef
const dragIndex = ref(-1)
const overIndex = ref(-1)
const startY = ref(0)

function onDragStart(e: DragEvent, index: number) {
  dragIndex.value = index
  if (e.dataTransfer) {
    e.dataTransfer.effectAllowed = 'move'
    e.dataTransfer.setData('text/plain', String(index))
  }
  const target = e.target as HTMLElement
  const rect = target.getBoundingClientRect()
  startY.value = e.clientY - rect.top
  target.style.opacity = '0.5'
}

function onDragEnd(e: DragEvent) {
  const target = e.target as HTMLElement
  target.style.opacity = '1'
  dragIndex.value = -1
  overIndex.value = -1
}

function onDragOver(e: DragEvent, _index: number) {
  e.preventDefault()
  if (e.dataTransfer) {
    e.dataTransfer.dropEffect = 'move'
  }
}

function onDragEnter(e: DragEvent, index: number) {
  e.preventDefault()
  if (dragIndex.value !== index && dragIndex.value !== -1) {
    overIndex.value = index
  }
}

function onDrop(e: DragEvent, index: number) {
  e.preventDefault()
  if (dragIndex.value === -1 || dragIndex.value === index) return

  const newList = [...props.modelValue]
  const [removed] = newList.splice(dragIndex.value, 1)
  newList.splice(index, 0, removed)
  emit('update:modelValue', newList)

  dragIndex.value = -1
  overIndex.value = -1
}

function getTransform(_index: number): string {
  // 简单实现，可扩展更复杂的动画效果
  return 'none'
}
</script>

<style scoped lang="scss">
.draggable-container {
  .draggable-item {
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    &.is-dragging {
      opacity: 0.5;
    }

    &.is-over {
      border-top: 2px solid var(--el-color-primary);
    }
  }
}
</style>
