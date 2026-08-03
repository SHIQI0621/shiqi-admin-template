<template>
    <div class="image-cropper" ref="containerRef">
        <!-- 工具栏 -->
        <div class="image-cropper__toolbar">
            <el-upload :show-file-list="false" :before-upload="handleFileChange" accept="image/*"
                class="image-cropper__upload">
                <el-button type="primary" :icon="Upload">
                    上传图片
                </el-button>
            </el-upload>
            <el-button :icon="RefreshLeft" @click="rotate(-90)" :disabled="!imageObj">
                左旋90°
            </el-button>
            <el-button :icon="RefreshRight" @click="rotate(90)" :disabled="!imageObj">
                右旋90°
            </el-button>
            <el-button :icon="FullScreen" @click="reset" :disabled="!imageObj">
                重置
            </el-button>
            <el-button type="success" :icon="Check" @click="crop" :disabled="!imageObj">
                确认裁剪
            </el-button>
        </div>

        <!-- 画布区域 -->
        <div class="image-cropper__canvas-wrapper" ref="canvasWrapperRef">
            <canvas ref="canvasRef" class="image-cropper__canvas"></canvas>

            <!-- 裁剪框 -->
            <div v-if="showCropper" class="image-cropper__box" :style="cropperStyle" @mousedown="startCropperDrag">
                <!-- 裁剪框内部 -->
                <div class="image-cropper__mask"></div>

                <!-- 8个控制点 -->
                <div v-for="pos in controlPositions" :key="pos"
                    :class="['image-cropper__handle', `image-cropper__handle--${pos}`]"
                    @mousedown.stop="startResize(pos, $event)"></div>
            </div>
        </div>

        <!-- Base64 输出区域 -->
        <div class="image-cropper__base64">
            <div class="image-cropper__base64-header">
                <span class="image-cropper__base64-title">Base64 输出</span>
                <el-button :icon="CopyDocument" size="small" link @click="copyBase64">
                    复制
                </el-button>
            </div>
            <el-input v-model="croppedImage" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" :readonly="true"
                show-word-limit :maxlength="-1" resize="none" />
        </div>

        <!-- 预览区域 -->
        <div v-if="croppedImage" class="image-cropper__preview">
            <div class="image-cropper__preview-title">预览效果</div>
            <div class="image-cropper__preview-sizes">
                <div v-for="size in previewSizes" :key="size.label" class="image-cropper__preview-item"
                    @click="selectSize(size)">
                    <img :src="croppedImage" :style="getPreviewStyle(size)" />
                    <span>{{ size.label }}</span>
                </div>
            </div>

            <div class="image-cropper__actions">
                <el-button type="primary" :icon="Download" @click="download" size="small">
                    下载图片
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted, watch } from 'vue'
import { Upload, RefreshLeft, RefreshRight, FullScreen, Check, Download, CopyDocument } from '@element-plus/icons-vue'

interface Props {
    modelValue?: string
    aspectRatio?: number
    minWidth?: number
    minHeight?: number
    maxWidth?: number
    maxHeight?: number
    format?: 'image/png' | 'image/jpeg' | 'image/webp'
    quality?: number
}

const props = withDefaults(defineProps<Props>(), {
    aspectRatio: 0,
    minWidth: 0,
    minHeight: 0,
    maxWidth: 0,
    maxHeight: 0,
    format: 'image/png',
    quality: 0.92,
})

const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void
    (e: 'change', dataUrl: string): void
    (e: 'error', message: string): void
    (e: 'message', type: 'success' | 'error' | 'warning' | 'info', message: string): void
}>()

const containerRef = ref<HTMLElement | null>(null)
void containerRef
const canvasWrapperRef = ref<HTMLElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)

const imageSrc = ref('')
const imageObj = ref<HTMLImageElement | null>(null)
const croppedImage = ref('')
const showCropper = ref(false)
const isCropping = ref(false)

// 图片变换状态
const scale = ref(1)
const rotation = ref(0)
const translate = ref({ x: 0, y: 0 })

// 画布尺寸
const canvasWidth = ref(0)
const canvasHeight = ref(400)

// 裁剪框位置
const cropBox = ref({ x: 0, y: 0, width: 0, height: 0 })

// 拖拽状态
const isDragging = ref(false)
const isResizing = ref(false)
const dragStart = ref({ x: 0, y: 0 })
const cropBoxStart = ref({ x: 0, y: 0, width: 0, height: 0 })
const resizeHandle = ref('')

// 预览尺寸
const previewSizes = [
    { label: '40x40', width: 40, height: 40, radius: '50%' },
    { label: '80x80', width: 80, height: 80, radius: '50%' },
    { label: '120x120', width: 120, height: 120, radius: '50%' },
    { label: '200x200', width: 200, height: 200, radius: '50%' },
]
const selectedSize = ref(previewSizes[1])

const controlPositions = ['nw', 'n', 'ne', 'e', 'se', 's', 'sw', 'w'] as const

const cropperStyle = computed(() => ({
    left: `${cropBox.value.x}px`,
    top: `${cropBox.value.y}px`,
    width: `${cropBox.value.width}px`,
    height: `${cropBox.value.height}px`,
}))

function getPreviewStyle(size: { width: number; height: number; radius: string }) {
    return {
      width: `${size.width}px`,
      height: `${size.height}px`,
      borderRadius: size.radius,
      objectFit: 'cover' as const,
    }
}

function selectSize(size: typeof previewSizes[0]) {
    selectedSize.value = size
}

function handleFileChange(file: File) {
    if (!file.type.startsWith('image/')) {
        emit('message', 'error', '请选择图片文件')
        return false
    }

    const reader = new FileReader()
    reader.onload = (e) => {
        imageSrc.value = e.target?.result as string
        loadImage()
    }
    reader.readAsDataURL(file)
    return false
}

function loadImage() {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.onload = () => {
        imageObj.value = img
        rotation.value = 0
        nextTick(() => {
            // 等待 DOM 更新后再获取尺寸
            requestAnimationFrame(() => {
                setupCanvas()
                initCropBox()
                drawCanvas()
                showCropper.value = true
            })
        })
    }
    img.src = imageSrc.value
}

function setupCanvas() {
    if (!canvasWrapperRef.value || !canvasRef.value) return

    const wrapper = canvasWrapperRef.value
    canvasWidth.value = wrapper.clientWidth
    canvasHeight.value = 400

    const canvas = canvasRef.value
    canvas.width = canvasWidth.value
    canvas.height = canvasHeight.value

    if (!imageObj.value) return

    const img = imageObj.value
    // 根据旋转角度计算实际显示的图片尺寸
    const rad = (rotation.value * Math.PI) / 180
    const cos = Math.abs(Math.cos(rad))
    const sin = Math.abs(Math.sin(rad))
    const rotatedWidth = img.width * cos + img.height * sin
    const rotatedHeight = img.width * sin + img.height * cos

    // 计算缩放比例，使图片适应画布
    const scaleX = canvasWidth.value / rotatedWidth
    const scaleY = canvasHeight.value / rotatedHeight
    scale.value = Math.min(scaleX, scaleY) * 0.85

    // 居中显示
    const displayWidth = rotatedWidth * scale.value
    const displayHeight = rotatedHeight * scale.value
    translate.value = {
        x: (canvasWidth.value - displayWidth) / 2,
        y: (canvasHeight.value - displayHeight) / 2,
    }
}

function initCropBox() {
    if (!imageObj.value) return

    const img = imageObj.value
    // 根据旋转计算显示尺寸
    const rad = (rotation.value * Math.PI) / 180
    const cos = Math.abs(Math.cos(rad))
    const sin = Math.abs(Math.sin(rad))
    const rotatedWidth = img.width * cos + img.height * sin
    const rotatedHeight = img.width * sin + img.height * cos

    const imgDisplayWidth = rotatedWidth * scale.value
    const imgDisplayHeight = rotatedHeight * scale.value

    let boxWidth = imgDisplayWidth * 0.6
    let boxHeight = imgDisplayHeight * 0.6

    // 应用宽高比约束
    if (props.aspectRatio > 0) {
        if (boxWidth / boxHeight > props.aspectRatio) {
            boxWidth = boxHeight * props.aspectRatio
        } else {
            boxHeight = boxWidth / props.aspectRatio
        }
    }

    // 最小尺寸限制
    const minSize = 80
    if (boxWidth < minSize) boxWidth = minSize
    if (boxHeight < minSize) boxHeight = minSize

    // 确保裁剪框不超过画布
    const maxWidth = Math.min(imgDisplayWidth, canvasWidth.value - translate.value.x * 2)
    const maxHeight = Math.min(imgDisplayHeight, canvasHeight.value - translate.value.y * 2)
    boxWidth = Math.min(boxWidth, maxWidth)
    boxHeight = Math.min(boxHeight, maxHeight)

    cropBox.value = {
        x: translate.value.x + (imgDisplayWidth - boxWidth) / 2,
        y: translate.value.y + (imgDisplayHeight - boxHeight) / 2,
        width: boxWidth,
        height: boxHeight,
    }
}

function drawCheckerboard(ctx: CanvasRenderingContext2D, width: number, height: number, cellSize = 20) {
    const lightColor = '#e0e0e0'
    const darkColor = '#c0c0c0'

    for (let y = 0; y < height; y += cellSize) {
        for (let x = 0; x < width; x += cellSize) {
            const isLight = ((x / cellSize) + (y / cellSize)) % 2 === 0
            ctx.fillStyle = isLight ? lightColor : darkColor
            ctx.fillRect(x, y, cellSize, cellSize)
        }
    }
}

function drawCanvas() {
    if (!canvasRef.value || !imageObj.value) return

    const canvas = canvasRef.value
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 清空画布并绘制棋盘格背景
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawCheckerboard(ctx, canvas.width, canvas.height)

    // 绘制图片（带旋转）
    const img = imageObj.value
    const rad = (rotation.value * Math.PI) / 180
    const cos = Math.abs(Math.cos(rad))
    const sin = Math.abs(Math.sin(rad))
    const rotatedWidth = img.width * cos + img.height * sin
    const rotatedHeight = img.width * sin + img.height * cos

    // 图片中心点
    const centerX = translate.value.x + rotatedWidth * scale.value / 2
    const centerY = translate.value.y + rotatedHeight * scale.value / 2

    ctx.save()
    ctx.translate(centerX, centerY)
    ctx.rotate(rad)
    ctx.scale(scale.value, scale.value)
    ctx.translate(-img.width / 2, -img.height / 2)
    ctx.drawImage(img, 0, 0)
    ctx.restore()

    // 绘制遮罩
    if (showCropper.value) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
        ctx.fillRect(0, 0, cropBox.value.x, canvas.height)
        ctx.fillRect(cropBox.value.x + cropBox.value.width, 0, canvas.width - cropBox.value.x - cropBox.value.width, canvas.height)
        ctx.fillRect(cropBox.value.x, 0, cropBox.value.width, cropBox.value.y)
        ctx.fillRect(cropBox.value.x, cropBox.value.y + cropBox.value.height, cropBox.value.width, canvas.height - cropBox.value.y - cropBox.value.height)

        // 绘制裁剪框边框
        ctx.strokeStyle = '#409eff'
        ctx.lineWidth = 2
        ctx.strokeRect(cropBox.value.x, cropBox.value.y, cropBox.value.width, cropBox.value.height)

        // 绘制网格线（三分法）
        ctx.strokeStyle = 'rgba(64, 158, 255, 0.3)'
        ctx.lineWidth = 1
        for (let i = 1; i < 3; i++) {
            const x = cropBox.value.x + (cropBox.value.width / 3) * i
            ctx.beginPath()
            ctx.moveTo(x, cropBox.value.y)
            ctx.lineTo(x, cropBox.value.y + cropBox.value.height)
            ctx.stroke()

            const y = cropBox.value.y + (cropBox.value.height / 3) * i
            ctx.beginPath()
            ctx.moveTo(cropBox.value.x, y)
            ctx.lineTo(cropBox.value.x + cropBox.value.width, y)
            ctx.stroke()
        }
    }
}

function startCropperDrag(e: MouseEvent) {
    if (!imageObj.value) return
    isDragging.value = true
    isResizing.value = false
    dragStart.value = { x: e.clientX, y: e.clientY }
    cropBoxStart.value = { ...cropBox.value }
    e.stopPropagation()
    e.preventDefault()
}

function startResize(handle: string, e: MouseEvent) {
    if (!imageObj.value) return
    isDragging.value = true
    isResizing.value = true
    resizeHandle.value = handle
    dragStart.value = { x: e.clientX, y: e.clientY }
    cropBoxStart.value = { ...cropBox.value }
    e.stopPropagation()
    e.preventDefault()
}

function onMouseMove(e: MouseEvent) {
    if (!isDragging.value) return

    const dx = e.clientX - dragStart.value.x
    const dy = e.clientY - dragStart.value.y

    if (isResizing.value) {
        resizeCropBox(dx, dy)
    } else {
        moveCropBox(dx, dy)
    }

    drawCanvas()
}

function moveCropBox(dx: number, dy: number) {
    const newX = cropBoxStart.value.x + dx
    const newY = cropBoxStart.value.y + dy

    cropBox.value = {
        ...cropBox.value,
        x: Math.max(0, Math.min(canvasWidth.value - cropBox.value.width, newX)),
        y: Math.max(0, Math.min(canvasHeight.value - cropBox.value.height, newY)),
    }
}

function resizeCropBox(dx: number, dy: number) {
    const handle = resizeHandle.value
    const start = cropBoxStart.value
    const newBox = { ...start }

    const minSize = 80

    if (handle.includes('e')) {
        newBox.width = Math.max(minSize, Math.min(canvasWidth.value - start.x, start.width + dx))
    }
    if (handle.includes('s')) {
        newBox.height = Math.max(minSize, Math.min(canvasHeight.value - start.y, start.height + dy))
    }
    if (handle.includes('w')) {
        const newX = Math.min(start.x + start.width - minSize, Math.max(0, start.x + dx))
        newBox.width = start.width + (start.x - newX)
        newBox.x = newX
    }
    if (handle.includes('n')) {
        const newY = Math.min(start.y + start.height - minSize, Math.max(0, start.y + dy))
        newBox.height = start.height + (start.y - newY)
        newBox.y = newY
    }

    // 如果设置了固定宽高比
    if (props.aspectRatio > 0) {
        if (handle === 'e' || handle === 'w') {
            newBox.height = newBox.width / props.aspectRatio
            // 保持中心点不变
            const centerY = start.y + start.height / 2
            newBox.y = centerY - newBox.height / 2
        } else {
            newBox.width = newBox.height * props.aspectRatio
            // 保持中心点不变
            const centerX = start.x + start.width / 2
            newBox.x = centerX - newBox.width / 2
        }
    }

    cropBox.value = newBox
}

function onMouseUp() {
    isDragging.value = false
    isResizing.value = false
    resizeHandle.value = ''
}

function rotate(degrees: number) {
    if (!imageObj.value) return
    rotation.value = (rotation.value + degrees) % 360
    if (rotation.value < 0) rotation.value += 360

    // 重新设置画布并保持裁剪框中心位置
    const centerX = cropBox.value.x + cropBox.value.width / 2
    const centerY = cropBox.value.y + cropBox.value.height / 2

    setupCanvas()
    initCropBox()

    // 尝试保持裁剪框中心位置
    const newCenterX = cropBox.value.x + cropBox.value.width / 2
    const newCenterY = cropBox.value.y + cropBox.value.height / 2
    const diffX = centerX - newCenterX
    const diffY = centerY - newCenterY

    cropBox.value = {
        ...cropBox.value,
        x: Math.max(0, Math.min(canvasWidth.value - cropBox.value.width, cropBox.value.x + diffX)),
        y: Math.max(0, Math.min(canvasHeight.value - cropBox.value.height, cropBox.value.y + diffY)),
    }

    drawCanvas()
}

function reset() {
    croppedImage.value = ''
    if (imageObj.value) {
        rotation.value = 0
        setupCanvas()
        initCropBox()
        drawCanvas()
    }
}

function crop() {
    if (!imageObj.value) return

    const img = imageObj.value
    const displayScale = scale.value

    // 计算裁剪框相对于旋转后图片的位置
    const sx = (cropBox.value.x - translate.value.x) / displayScale
    const sy = (cropBox.value.y - translate.value.y) / displayScale
    const sw = cropBox.value.width / displayScale
    const sh = cropBox.value.height / displayScale

    // 创建临时canvas进行裁剪
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    // 如果有旋转，先绘制旋转后的图片
    if (rotation.value !== 0) {
        const rotatedCanvas = document.createElement('canvas')
        const rotatedCtx = rotatedCanvas.getContext('2d')
        if (!rotatedCtx) return

        const rad = (rotation.value * Math.PI) / 180
        rotatedCanvas.width = canvasWidth.value
        rotatedCanvas.height = canvasHeight.value

        rotatedCtx.save()
        rotatedCtx.translate(canvasWidth.value / 2, canvasHeight.value / 2)
        rotatedCtx.rotate(rad)
        rotatedCtx.scale(scale.value, scale.value)
        rotatedCtx.drawImage(img, -img.width / 2, -img.height / 2)
        rotatedCtx.restore()

        tempCanvas.width = sw
        tempCanvas.height = sh
        tempCtx.drawImage(rotatedCanvas, sx, sy, sw, sh, 0, 0, sw, sh)
    } else {
        tempCanvas.width = sw
        tempCanvas.height = sh
        tempCtx.drawImage(img, sx, sy, sw, sh, 0, 0, sw, sh)
    }

    const dataUrl = tempCanvas.toDataURL(props.format, props.quality)
    croppedImage.value = dataUrl
    isCropping.value = true
    emit('update:modelValue', dataUrl)
    emit('change', dataUrl)
    emit('message', 'success', '裁剪成功')
    // 重置标志，防止watch触发重新加载图片
    setTimeout(() => {
        isCropping.value = false
    }, 0)
}

function download() {
    if (!croppedImage.value) return
    const link = document.createElement('a')
    link.download = `cropped-image.${props.format.split('/')[1]}`
    link.href = croppedImage.value
    link.click()
}

async function copyBase64() {
    if (!croppedImage.value) return
    try {
        await navigator.clipboard.writeText(croppedImage.value)
        emit('message', 'success', '复制成功')
    } catch {
        // 降级方案
        const textarea = document.createElement('textarea')
        textarea.value = croppedImage.value
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        emit('message', 'success', '复制成功')
    }
}

// 监听 aspectRatio 变化
watch(() => props.aspectRatio, () => {
    if (imageObj.value) {
        initCropBox()
        drawCanvas()
    }
})

// 双向绑定回显
watch(() => props.modelValue, (val) => {
    // 裁剪操作时不重新加载图片
    if (isCropping.value) return
    if (val && val !== imageSrc.value) {
        imageSrc.value = val
        loadImage()
    }
})

onMounted(() => {
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
})

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
})
</script>

<style scoped lang="scss">
.image-cropper {
    width: 100%;

    &__toolbar {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
        flex-wrap: wrap;
    }

    &__upload {
        :deep(.el-upload) {
            display: inline-block;
        }
    }

    &__canvas-wrapper {
        position: relative;
        background-color: #e0e0e0;
        background-image:
            linear-gradient(45deg, #c0c0c0 25%, transparent 25%),
            linear-gradient(-45deg, #c0c0c0 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #c0c0c0 75%),
            linear-gradient(-45deg, transparent 75%, #c0c0c0 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        border: 1px solid var(--el-border-color);
        border-radius: 8px;
        overflow: hidden;
        width: 100%;
        min-height: 400px;
    }

    &__canvas {
        display: block;
        width: 100%;
        height: 400px;
        cursor: crosshair;
        background: transparent;
    }

    &__box {
        position: absolute;
        cursor: move;
        border: 2px solid #409eff;
        box-sizing: border-box;
    }

    &__mask {
        position: absolute;
        inset: 0;
        pointer-events: none;
    }

    &__handle {
        position: absolute;
        width: 10px;
        height: 10px;
        background: #409eff;
        border: 1px solid #fff;
        z-index: 10;
        box-sizing: border-box;

        &--nw {
            top: -5px;
            left: -5px;
            cursor: nw-resize;
        }

        &--n {
            top: -5px;
            left: 50%;
            margin-left: -5px;
            cursor: n-resize;
        }

        &--ne {
            top: -5px;
            right: -5px;
            cursor: ne-resize;
        }

        &--e {
            top: 50%;
            right: -5px;
            margin-top: -5px;
            cursor: e-resize;
        }

        &--se {
            bottom: -5px;
            right: -5px;
            cursor: se-resize;
        }

        &--s {
            bottom: -5px;
            left: 50%;
            margin-left: -5px;
            cursor: s-resize;
        }

        &--sw {
            bottom: -5px;
            left: -5px;
            cursor: sw-resize;
        }

        &--w {
            top: 50%;
            left: -5px;
            margin-top: -5px;
            cursor: w-resize;
        }
    }

    &__preview {
        margin-top: 16px;
        padding: 16px;
        background: var(--el-fill-color-lighter);
        border-radius: 8px;
    }

    &__preview-title {
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--el-text-color-primary);
    }

    &__preview-sizes {
        display: flex;
        gap: 16px;
        flex-wrap: wrap;
    }

    &__preview-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        cursor: pointer;
        transition: transform 0.2s;

        img {
            border: 2px solid transparent;
            padding: 2px;
        }

        span {
            font-size: 12px;
            color: var(--el-text-color-secondary);
        }

        &:hover img {
            border-color: var(--el-color-primary);
        }
    }

    &__base64 {
        margin-top: 16px;
        padding: 12px;
        background: #fff;
        border-radius: 6px;
        border: 1px solid var(--el-border-color-lighter);

        &-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }

        &-title {
            font-size: 13px;
            font-weight: 500;
            color: var(--el-text-color-primary);
        }

        :deep(.el-textarea__inner) {
            font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
            font-size: 12px;
            color: var(--el-text-color-regular);
            background: var(--el-fill-color-lighter);
        }
    }

    &__actions {
        margin-top: 16px;
        display: flex;
        gap: 8px;
    }
}
</style>
