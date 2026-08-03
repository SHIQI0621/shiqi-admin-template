<template>
  <canvas v-if="visible" ref="canvasRef" class="watermark-canvas"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'

interface Props {
  visible?: boolean
  text?: string | string[]
  fontSize?: number
  color?: string
  opacity?: number
  rotate?: number
  spacingX?: number
  spacingY?: number
}

const props = withDefaults(defineProps<Props>(), {
  visible: true,
  text: '水印',
  fontSize: 16,
  color: '#ccc',
  opacity: 0.15,
  rotate: -15,
  spacingX: 150,
  spacingY: 100,
})

const canvasRef = ref<HTMLCanvasElement | null>(null)

// 将 text 统一为数组
const textLines = computed(() => {
  if (Array.isArray(props.text)) return props.text
  return [props.text]
})

function drawWatermark() {
  if (!canvasRef.value || !props.visible) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  if (!ctx) return

  // 设置 canvas 尺寸为整个页面
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // 清空画布
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // 设置水印样式
  ctx.font = `${props.fontSize}px Microsoft YaHei, sans-serif`
  ctx.fillStyle = props.color

  // 计算多行文本的最大宽度
  let maxTextWidth = 0
  for (const line of textLines.value) {
    const w = ctx.measureText(line).width
    if (w > maxTextWidth) maxTextWidth = w
  }
  const lineHeight = props.fontSize * 1.4
  const totalTextHeight = lineHeight * textLines.value.length

  // 计算旋转角度的弧度
  const rotateRad = (props.rotate * Math.PI) / 180

  // 计算旋转后的文本占用空间（用于间距计算）
  const rotatedWidth = Math.abs(maxTextWidth * Math.cos(rotateRad)) + Math.abs(totalTextHeight * Math.sin(rotateRad))
  const rotatedHeight = Math.abs(totalTextHeight * Math.cos(rotateRad)) + Math.abs(maxTextWidth * Math.sin(rotateRad))

  // 计算列数和行数，确保完全覆盖
  const cols = Math.ceil(canvas.width / (props.spacingX + rotatedWidth)) + 2
  const rows = Math.ceil(canvas.height / (props.spacingY + rotatedHeight)) + 2

  // 绘制水印
  for (let i = -1; i < cols; i++) {
    for (let j = -1; j < rows; j++) {
      // 保存当前状态
      ctx.save()

      // 计算每个水印的中心位置
      const x = i * (props.spacingX + rotatedWidth) + rotatedWidth / 2
      const y = j * (props.spacingY + rotatedHeight) + rotatedHeight / 2

      // 移动到水印中心位置
      ctx.translate(x, y)

      // 旋转
      ctx.rotate(rotateRad)

      // 设置透明度
      ctx.globalAlpha = props.opacity

      // 绘制多行文本（居中）
      textLines.value.forEach((line, idx) => {
        const lineWidth = ctx.measureText(line).width
        const yOffset = idx * lineHeight - (totalTextHeight - lineHeight) / 2
        ctx.fillText(line, -lineWidth / 2, yOffset + lineHeight / 3)
      })

      // 恢复状态
      ctx.restore()
    }
  }
}

function handleResize() {
  drawWatermark()
}

onMounted(() => {
  drawWatermark()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})

watch(
  () => [props.text, props.fontSize, props.color, props.opacity, props.rotate, props.spacingX, props.spacingY, props.visible],
  () => {
    drawWatermark()
  }
)
</script>

<style scoped lang="scss">
.watermark-canvas {
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 99999;
}
</style>
