<template>
  <div class="qr-code" :style="{ width: size + 'px', height: size + 'px' }">
    <canvas ref="canvasRef"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'
import QRCodeLib from 'qrcode'

export type QRStyle = 'standard' | 'inverted' | 'rounded' | 'gradient' | 'logo' | 'dots'
export type QRErrorLevel = 'L' | 'M' | 'Q' | 'H'

interface Props {
  text: string
  qrStyle?: QRStyle
  size?: number
  errorLevel?: QRErrorLevel
  color1?: string
  color2?: string
  logo?: string
}

const props = withDefaults(defineProps<Props>(), {
  qrStyle: 'standard',
  size: 200,
  errorLevel: 'L',
  color1: '#667eea',
  color2: '#764ba2',
  logo: '',
})

const emit = defineEmits<{
  (e: 'change', dataUrl: string): void
  (e: 'error', err: Error): void
}>()

const canvasRef = ref<HTMLCanvasElement | null>(null)

// 统一参数接口：传递 canvas 元素而非 context
// 因为 qrcode 库在传入 context + 3 参数时存在参数解析 bug
async function generateQR() {
  if (!props.text || !canvasRef.value) return

  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  try {
    canvas.width = props.size
    canvas.height = props.size

    switch (props.qrStyle) {
      case 'standard':
        await generateStandard(canvas)
        break
      case 'inverted':
        await generateInverted(canvas)
        break
      case 'rounded':
        await generateRounded(canvas)
        break
      case 'dots':
        await generateDots(canvas)
        break
      case 'gradient':
        await generateGradient(canvas)
        break
      case 'logo':
        await generateLogo(canvas)
        break
      default:
        await generateStandard(canvas)
    }

    const dataUrl = canvas.toDataURL('image/png')
    emit('change', dataUrl)
  } catch (err: any) {
    console.error('QR code generation failed:', err)
    emit('error', err)
  }
}

// standard / inverted / logo：直接渲染到主 canvas
async function generateStandard(canvas: HTMLCanvasElement) {
  await QRCodeLib.toCanvas(canvas, props.text, {
    width: props.size,
    margin: 2,
    errorCorrectionLevel: props.errorLevel,
    color: { dark: '#000000', light: '#ffffff' },
  })
}

async function generateInverted(canvas: HTMLCanvasElement) {
  await QRCodeLib.toCanvas(canvas, props.text, {
    width: props.size,
    margin: 2,
    errorCorrectionLevel: props.errorLevel,
    color: { dark: '#ffffff', light: '#000000' },
  })
}

async function generateLogo(canvas: HTMLCanvasElement) {
  // 生成底色二维码
  await QRCodeLib.toCanvas(canvas, props.text, {
    width: props.size,
    margin: 2,
    errorCorrectionLevel: props.errorLevel,
    color: { dark: '#2c3e50', light: '#ffffff' },
  })

  // 如果没有 Logo，直接返回
  if (!props.logo) return

  // 加载 Logo 图片并绘制到 canvas 中心
  const ctx = canvas.getContext('2d')!
  const logoImg = await loadImage(props.logo)

  const logoSize = props.size * 0.2
  const logoX = (props.size - logoSize) / 2
  const logoY = (props.size - logoSize) / 2
  const padding = logoSize * 0.1

  // 绘制白色背景圆角矩形，确保 Logo 清晰可见
  ctx.save()
  ctx.fillStyle = '#ffffff'
  roundRect(ctx, logoX - padding, logoY - padding, logoSize + padding * 2, logoSize + padding * 2, 8)
  ctx.fill()
  ctx.restore()

  // 绘制 Logo
  ctx.drawImage(logoImg, logoX, logoY, logoSize, logoSize)
}

// 加载图片的 Promise 封装
function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = src
  })
}

// 绘制圆角矩形路径
function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

// rounded / dots / gradient：渲染到临时 canvas，再二次加工
async function generateRounded(canvas: HTMLCanvasElement) {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = props.size
  tempCanvas.height = props.size

  // 传递 canvas 元素，而非 context
  await QRCodeLib.toCanvas(tempCanvas, props.text, {
    width: props.size,
    margin: 2,
    errorCorrectionLevel: props.errorLevel,
    color: { dark: '#1a1a2e', light: '#ffffff' },
  })

  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, props.size, props.size)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, props.size, props.size)
  ctx.drawImage(tempCanvas, 0, 0)

  const radius = props.size * 0.08
  ctx.save()
  ctx.globalCompositeOperation = 'destination-in'
  ctx.beginPath()
  ctx.moveTo(radius, 0)
  ctx.lineTo(props.size - radius, 0)
  ctx.quadraticCurveTo(props.size, 0, props.size, radius)
  ctx.lineTo(props.size, props.size - radius)
  ctx.quadraticCurveTo(props.size, props.size, props.size - radius, props.size)
  ctx.lineTo(radius, props.size)
  ctx.quadraticCurveTo(0, props.size, 0, props.size - radius)
  ctx.lineTo(0, radius)
  ctx.quadraticCurveTo(0, 0, radius, 0)
  ctx.closePath()
  ctx.fill()
  ctx.restore()

  ctx.save()
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)'
  ctx.lineWidth = 1
  ctx.strokeRect(0, 0, props.size, props.size)
  ctx.restore()
}

async function generateDots(canvas: HTMLCanvasElement) {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = props.size
  tempCanvas.height = props.size

  // 用纯黑/白色渲染临时二维码，便于准确检测深色模块
  await QRCodeLib.toCanvas(tempCanvas, props.text, {
    width: props.size,
    margin: 2,
    errorCorrectionLevel: props.errorLevel,
    color: { dark: '#000000', light: '#ffffff' },
  })

  const tempCtx = tempCanvas.getContext('2d')!
  const imageData = tempCtx.getImageData(0, 0, props.size, props.size)
  const data = imageData.data

  const ctx = canvas.getContext('2d')!

  ctx.clearRect(0, 0, props.size, props.size)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, props.size, props.size)

  // 根据二维码模块数量计算合适的圆点大小
  // QR 模块数 ≈ size / moduleSize，用 moduleSize 作为圆点间距
  const moduleCount = Math.ceil(props.size / 7) // 估算 QR 模块宽度
  const pixelSize = Math.max(2, Math.floor(props.size / moduleCount))
  const radius = pixelSize / 2

  for (let y = 0; y < props.size; y += pixelSize) {
    for (let x = 0; x < props.size; x += pixelSize) {
      const idx = (y * props.size + x) * 4
      // 检查亮度：黑色像素 RGB 都接近 0，白色像素 RGB 都是 255
      // 使用三通道平均值判断是否为深色模块
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      const luminance = (r + g + b) / 3
      
      if (luminance < 128) {
        const cx = x + radius
        const cy = y + radius
        const dotRadius = radius * 0.85

        const gradient = ctx.createRadialGradient(
          cx - dotRadius * 0.3, cy - dotRadius * 0.3, 0,
          cx, cy, dotRadius
        )
        gradient.addColorStop(0, '#ff8a8a')
        gradient.addColorStop(0.6, '#ff6b6b')
        gradient.addColorStop(1, '#ee5a6f')
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(cx, cy, dotRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }
  }
}

async function generateGradient(canvas: HTMLCanvasElement) {
  const tempCanvas = document.createElement('canvas')
  tempCanvas.width = props.size
  tempCanvas.height = props.size

  // 传递 canvas 元素，而非 context
  await QRCodeLib.toCanvas(tempCanvas, props.text, {
    width: props.size,
    margin: 2,
    errorCorrectionLevel: props.errorLevel,
    color: { dark: '#000000', light: '#ffffff' },
  })

  const ctx = canvas.getContext('2d')!
  const gradient = ctx.createLinearGradient(0, 0, props.size, props.size)
  gradient.addColorStop(0, props.color1)
  gradient.addColorStop(1, props.color2)

  ctx.clearRect(0, 0, props.size, props.size)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, props.size, props.size)

  ctx.save()
  ctx.fillStyle = gradient
  ctx.globalCompositeOperation = 'source-in'
  ctx.drawImage(tempCanvas, 0, 0)
  ctx.restore()
}

// 监听 props 变化自动重新生成
watch(
  () => [props.text, props.qrStyle, props.size, props.errorLevel, props.color1, props.color2, props.logo],
  () => {
    generateQR()
  }
)

onMounted(async () => {
  await nextTick()
  generateQR()
})

// 暴露方法给父组件
defineExpose({
  download(filename?: string) {
    if (!canvasRef.value) return
    const link = document.createElement('a')
    link.download = filename || `qrcode-${props.qrStyle}.png`
    link.href = canvasRef.value.toDataURL('image/png')
    link.click()
  },
  getDataUrl() {
    return canvasRef.value?.toDataURL('image/png') || ''
  }
})
</script>

<style scoped lang="scss">
.qr-code {
  position: relative;
  display: inline-block;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;

  canvas {
    display: block;
  }
}
</style>
