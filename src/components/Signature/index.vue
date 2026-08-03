<template>
  <div class="signature-pad" :style="containerStyle">
    <canvas
      ref="canvasRef"
      :width="canvasWidth"
      :height="canvasHeight"
      :style="canvasStyle"
      @mousedown="startDraw"
      @mousemove="draw"
      @mouseup="endDraw"
      @mouseleave="endDraw"
      @touchstart.prevent="startDraw"
      @touchmove.prevent="draw"
      @touchend.prevent="endDraw"
    />
    <div v-if="isEmpty" class="signature-placeholder">
      <el-icon :size="48"><EditPen /></el-icon>
      <span>{{ placeholder }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch, nextTick } from 'vue'
import { EditPen } from '@element-plus/icons-vue'

interface SignatureProps {
  /** 画布宽度 */
  width?: number
  /** 画布高度 */
  height?: number
  /** 画笔颜色 */
  color?: string
  /** 画笔线宽 */
  lineWidth?: number
  /** 背景色 */
  bgColor?: string
  /** 占位提示文字 */
  placeholder?: string
  /** 是否禁用 */
  disabled?: boolean
}

const props = withDefaults(defineProps<SignatureProps>(), {
  width: 600,
  height: 300,
  color: '#333333',
  lineWidth: 3,
  bgColor: '#ffffff',
  placeholder: '请在此处签名',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'change', isEmpty: boolean): void
  (e: 'begin'): void
  (e: 'end'): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)
const ctx = ref<CanvasRenderingContext2D | null>(null)
const isDrawing = ref(false)
const isEmpty = ref(true)
const hasDrawn = ref(false)

// 适配高清屏的缩放比例
const dpr = ref(1)

const canvasWidth = computed(() => props.width)
const canvasHeight = computed(() => props.height)

const containerStyle = computed(() => ({
  width: `${props.width}px`,
  height: `${props.height}px`,
}))

const canvasStyle = computed(() => ({
  display: 'block',
  width: `${props.width}px`,
  height: `${props.height}px`,
  cursor: props.disabled ? 'not-allowed' : 'crosshair',
  borderRadius: '8px',
}))

/** 初始化 canvas */
function initCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return

  dpr.value = window.devicePixelRatio || 1
  canvas.width = props.width * dpr.value
  canvas.height = props.height * dpr.value

  ctx.value = canvas.getContext('2d')
  if (!ctx.value) return

  ctx.value.scale(dpr.value, dpr.value)
  ctx.value.lineCap = 'round'
  ctx.value.lineJoin = 'round'
  ctx.value.lineWidth = props.lineWidth
  ctx.value.strokeStyle = props.color

  // 填充背景
  ctx.value.fillStyle = props.bgColor
  ctx.value.fillRect(0, 0, props.width, props.height)
}

/** 获取事件坐标 */
function getPos(e: MouseEvent | TouchEvent) {
  const canvas = canvasRef.value
  if (!canvas) return { x: 0, y: 0 }

  const rect = canvas.getBoundingClientRect()
  let clientX: number
  let clientY: number

  if ('touches' in e) {
    const touch = e.touches[0] || e.changedTouches[0]
    clientX = touch.clientX
    clientY = touch.clientY
  } else {
    clientX = (e as MouseEvent).clientX
    clientY = (e as MouseEvent).clientY
  }

  return {
    x: clientX - rect.left,
    y: clientY - rect.top,
  }
}

let lastPos = { x: 0, y: 0 }

/** 开始绘制 */
function startDraw(e: MouseEvent | TouchEvent) {
  if (props.disabled) return
  if (!ctx.value) return

  // 在开始绘制前保存快照到撤销栈
  saveSnapshot()

  isDrawing.value = true
  lastPos = getPos(e)

  // 开始一个新路径
  ctx.value.beginPath()
  ctx.value.moveTo(lastPos.x, lastPos.y)

  // 画一个点（单击场景）
  ctx.value.lineTo(lastPos.x + 0.1, lastPos.y + 0.1)
  ctx.value.stroke()

  if (!hasDrawn.value) {
    hasDrawn.value = true
    isEmpty.value = false
    emit('change', false)
  }
  emit('begin')
}

/** 绘制中 */
function draw(e: MouseEvent | TouchEvent) {
  if (!isDrawing.value || !ctx.value) return
  if (props.disabled) return

  const pos = getPos(e)
  ctx.value.lineTo(pos.x, pos.y)
  ctx.value.stroke()
  lastPos = pos
}

/** 结束绘制 */
function endDraw() {
  if (!isDrawing.value) return
  isDrawing.value = false
  emit('end')
}

/** 清空画板 */
function clear() {
  if (!ctx.value || !canvasRef.value) return

  ctx.value.fillStyle = props.bgColor
  ctx.value.fillRect(0, 0, props.width, props.height)

  hasDrawn.value = false
  isEmpty.value = true
  emit('change', true)
}

/** 撤销最后一笔（简化版：基于快照） */
const undoStack: ImageData[] = []

function saveSnapshot() {
  if (!ctx.value || !canvasRef.value) return
  const snapshot = ctx.value.getImageData(0, 0, canvasRef.value.width, canvasRef.value.height)
  undoStack.push(snapshot)
  // 限制最多 20 步
  if (undoStack.length > 20) {
    undoStack.shift()
  }
}

function undo() {
  if (!ctx.value || !canvasRef.value || undoStack.length === 0) return
  const snapshot = undoStack.pop()
  if (snapshot) {
    ctx.value.putImageData(snapshot, 0, 0)
    // 检查是否清空
    if (undoStack.length === 0) {
      hasDrawn.value = false
      isEmpty.value = true
      emit('change', true)
    }
  }
}

/** 获取 DataURL */
function toDataURL(type: string = 'image/png', quality?: number): string {
  if (!canvasRef.value) return ''
  return canvasRef.value.toDataURL(type, quality)
}

/** 下载图片 */
function download(filename: string = 'signature.png') {
  const dataUrl = toDataURL()
  if (!dataUrl) return

  const link = document.createElement('a')
  link.download = filename
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

/** 是否为空 */
function getIsEmpty() {
  return isEmpty.value
}

// 暴露方法
defineExpose({
  clear,
  undo,
  toDataURL,
  download,
  getIsEmpty,
})

// 监听属性变化重新初始化
watch(
  () => [props.width, props.height, props.bgColor],
  () => {
    nextTick(() => {
      initCanvas()
    })
  }
)

watch(
  () => [props.color, props.lineWidth],
  () => {
    if (ctx.value) {
      ctx.value.strokeStyle = props.color
      ctx.value.lineWidth = props.lineWidth
    }
  }
)

onMounted(() => {
  initCanvas()
})

onBeforeUnmount(() => {
  undoStack.length = 0
})
</script>

<style scoped lang="scss">
.signature-pad {
  position: relative;
  display: inline-block;
  border: 2px dashed var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;
  background: var(--el-bg-color);

  canvas {
    display: block;
  }

  .signature-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--el-text-color-placeholder);
    font-size: 14px;
    pointer-events: none;
    user-select: none;
  }
}
</style>
