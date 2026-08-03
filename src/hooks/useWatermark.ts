import { ref, onMounted, onUnmounted, watch, computed, isRef } from 'vue'
import type { Ref } from 'vue'

export interface WatermarkOptions {
  text: string | string[]
  fontSize?: number
  color?: string
  opacity?: number
  rotate?: number
  spacingX?: number
  spacingY?: number
  container?: HTMLElement | null
}

export function useWatermark(options: WatermarkOptions | Ref<WatermarkOptions>) {
  const visible = ref(false)
  const canvasRef = ref<HTMLCanvasElement | null>(null)
  let containerElement: HTMLElement | null = null

  const optionsRef = isRef(options) ? options : ref(options)

  const textLines = computed(() => {
    const text = optionsRef.value.text
    if (Array.isArray(text)) return text
    return [text]
  })

  function createCanvas() {
    if (!containerElement) {
      containerElement = optionsRef.value.container || document.body
    }

    if (!canvasRef.value) {
      const canvas = document.createElement('canvas')
      canvas.style.position = 'fixed'
      canvas.style.top = '0'
      canvas.style.left = '0'
      canvas.style.pointerEvents = 'none'
      canvas.style.zIndex = '99999'
      containerElement.appendChild(canvas)
      canvasRef.value = canvas
    }
  }

  function drawWatermark() {
    if (!canvasRef.value || !visible.value) return

    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')

    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const opts = optionsRef.value
    const fontSize = opts.fontSize || 16
    const color = opts.color || '#ccc'
    const opacity = opts.opacity ?? 0.15
    const rotate = opts.rotate ?? -15
    const spacingX = opts.spacingX ?? 150
    const spacingY = opts.spacingY ?? 100

    ctx.font = `${fontSize}px Microsoft YaHei, sans-serif`
    ctx.fillStyle = color

    let maxTextWidth = 0
    for (const line of textLines.value) {
      const w = ctx.measureText(line).width
      if (w > maxTextWidth) maxTextWidth = w
    }
    const lineHeight = fontSize * 1.4
    const totalTextHeight = lineHeight * textLines.value.length

    const rotateRad = (rotate * Math.PI) / 180
    const rotatedWidth = Math.abs(maxTextWidth * Math.cos(rotateRad)) + Math.abs(totalTextHeight * Math.sin(rotateRad))
    const rotatedHeight = Math.abs(totalTextHeight * Math.cos(rotateRad)) + Math.abs(maxTextWidth * Math.sin(rotateRad))

    const cols = Math.ceil(canvas.width / (spacingX + rotatedWidth)) + 2
    const rows = Math.ceil(canvas.height / (spacingY + rotatedHeight)) + 2

    for (let i = -1; i < cols; i++) {
      for (let j = -1; j < rows; j++) {
        ctx.save()
        const x = i * (spacingX + rotatedWidth) + rotatedWidth / 2
        const y = j * (spacingY + rotatedHeight) + rotatedHeight / 2
        ctx.translate(x, y)
        ctx.rotate(rotateRad)
        ctx.globalAlpha = opacity

        textLines.value.forEach((line, idx) => {
          const lineWidth = ctx.measureText(line).width
          const yOffset = idx * lineHeight - (totalTextHeight - lineHeight) / 2
          ctx.fillText(line, -lineWidth / 2, yOffset + lineHeight / 3)
        })
        ctx.restore()
      }
    }
  }

  function show() {
    visible.value = true
    createCanvas()
    drawWatermark()
  }

  function hide() {
    visible.value = false
    if (canvasRef.value) {
      canvasRef.value.remove()
      canvasRef.value = null
    }
  }

  function toggle() {
    if (visible.value) {
      hide()
    } else {
      show()
    }
  }

  function handleResize() {
    drawWatermark()
  }

  onMounted(() => {
    if (visible.value) {
      show()
    }
    window.addEventListener('resize', handleResize)
  })

  onUnmounted(() => {
    hide()
    window.removeEventListener('resize', handleResize)
  })

  watch(
    () => [
      optionsRef.value.text,
      optionsRef.value.fontSize,
      optionsRef.value.color,
      optionsRef.value.opacity,
      optionsRef.value.rotate,
      optionsRef.value.spacingX,
      optionsRef.value.spacingY,
    ],
    () => {
      if (visible.value) {
        drawWatermark()
      }
    },
    { deep: true }
  )

  return {
    visible,
    show,
    hide,
    toggle,
    options: optionsRef,
  }
}
