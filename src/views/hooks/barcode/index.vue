<template>
  <div class="barcode-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">useBarcode 条形码生成</h1>
        <p class="intro-text">
          基于 JsBarcode 封装的 useBarcode Hook，支持 CODE39、CODE128、EAN13、UPC-A、ITF14
          等多种条码格式，可自定义宽高、颜色、字体、边距等样式，支持 Canvas 和 SVG 两种渲染方式，
          支持下载为图片。适用于商品条码、物流追踪、库存管理等场景。
        </p>
        <div class="intro-tips">
          <p>
            <strong>提示：</strong>
            依赖 <code class="code-inline">jsbarcode</code> 库，已安装。通过 Hook 返回的
            <code class="code-inline">generate(element, options)</code> 方法生成条码，
            支持 Canvas 和 SVG 两种输出方式，自动管理生命周期。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            导入路径：<span class="code-inline">import { useBarcode } from '@/hooks/useBarcode'</span>
          </p>
        </div>
      </div>
    </Card>

    <!-- 2. preview-card -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">效果预览</span>
        </div>
      </template>

      <!-- 条码预览区 9 宫格 -->
      <div class="barcode-preview-grid">
        <div v-for="(item, i) in previewList" :key="i" class="barcode-preview-item">
          <div class="barcode-label">{{ item.label }}</div>
          <div class="barcode-canvas-wrapper" :style="item.wrapperStyle">
            <canvas :ref="(el) => setCanvasRef(i, el)"></canvas>
          </div>
          <div v-if="item.desc" class="barcode-desc">{{ item.desc }}</div>
        </div>
      </div>

      <!-- 控制区 Canvas -->
      <div class="control-canvas-area">
        <canvas ref="controlCanvasRef" class="control-canvas"></canvas>
      </div>

      <!-- 控制面板 -->
      <div class="barcode-controls">
        <div class="control-row">
          <span class="control-label">条码类型：</span>
          <el-select v-model="config.format" placeholder="选择格式" style="width: 160px">
            <el-option v-for="f in formatList" :key="f.value" :label="f.label" :value="f.value" />
          </el-select>
          <span class="control-label">内容：</span>
          <el-input v-model="config.text" placeholder="输入内容" style="width: 200px" />
          <el-button type="primary" @click="handleGenerate">生成条码</el-button>
          <el-button @click="handleDownload">下载</el-button>
        </div>

        <div class="control-row">
          <span class="control-label">条宽：</span>
          <el-slider v-model="config.width" :min="1" :max="6" :step="1" style="width: 150px" />
          <span class="control-label">条高：</span>
          <el-slider v-model="config.height" :min="40" :max="200" :step="10" style="width: 150px" />
        </div>

        <div class="control-row">
          <span class="control-label">颜色：</span>
          <el-color-picker v-model="config.lineColor" />
          <span class="control-label">背景：</span>
          <el-color-picker v-model="config.background" />
          <span class="control-label">字体大小：</span>
          <el-slider v-model="config.fontSize" :min="10" :max="40" :step="2" style="width: 120px" />
        </div>

        <div class="control-row">
          <span class="control-label">显示文字：</span>
          <el-switch v-model="config.displayValue" />
          <span class="control-label">文字位置：</span>
          <el-radio-group v-model="config.textPosition">
            <el-radio value="top">上方</el-radio>
            <el-radio value="bottom">下方</el-radio>
          </el-radio-group>
          <span class="control-label">边距：</span>
          <el-slider v-model="config.margin" :min="0" :max="40" :step="2" style="width: 120px" />
        </div>
      </div>

      <!-- 状态 -->
      <div class="barcode-status">
        <el-tag :type="isValid ? 'success' : 'danger'" size="small">
          {{ isValid ? '条码有效' : '条码无效' }}
        </el-tag>
      </div>
    </Card>

    <!-- 3. usage-card -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">基础用法</span>
        </div>
      </template>
      <div class="usage-section">
        <h3 class="usage-subtitle">基础生成</h3>
        <p class="demo-desc">传入 canvas 元素和配置项即可生成条形码。</p>
        <pre class="code-block" v-pre><code>&lt;template&gt;
  &lt;canvas ref="canvasRef"&gt;&lt;/canvas&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref, onMounted } from 'vue'
import { useBarcode } from '@/hooks/useBarcode'

const canvasRef = ref&lt;HTMLCanvasElement&gt;()
const { generate } = useBarcode()

onMounted(() => {
  generate(canvasRef.value!, {
    text: 'HELLO 2024',
    format: 'CODE128',
    width: 2,
    height: 100,
    lineColor: '#000000',
    background: '#ffffff',
    fontSize: 20,
  })
})
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">不同格式</h3>
        <p class="demo-desc">支持 CODE39、CODE128、EAN13、UPC、ITF14 等多种格式。</p>
        <pre class="code-block" v-pre><code>// CODE39（支持字母+数字）
generate(canvas, { text: 'HELLO', format: 'CODE39' })

// CODE128（紧凑型，支持 ASCII）
generate(canvas, { text: 'Soybean-2024', format: 'CODE128' })

// EAN-13（13 位数字商品条码）
generate(canvas, { text: '234567890128', format: 'EAN13' })

// UPC-A（12 位数字北美条码）
generate(canvas, { text: '23456789012', format: 'UPC' })

// ITF-14（14 位物流条码）
generate(canvas, { text: '12345678901234', format: 'ITF14' })</code></pre>

        <h3 class="usage-subtitle">自定义样式</h3>
        <p class="demo-desc">设置颜色、字体、边距等样式。</p>
        <pre class="code-block" v-pre><code>generate(canvas, {
  text: 'CUSTOM-001',
  format: 'CODE128',
  width: 3,            // 条宽
  height: 120,         // 条高
  lineColor: '#1e80ff',// 条码颜色
  background: '#f0f2f5',// 背景色
  fontSize: 24,        // 字体大小
  fontOptions: 'bold', // 字体加粗
  textPosition: 'top', // 文字在上方
  textMargin: 8,       // 文字间距
  margin: 20,          // 外边距
})</code></pre>

        <h3 class="usage-subtitle">SVG 输出与下载</h3>
        <pre class="code-block" v-pre><code>// SVG 渲染（矢量图，放大不失真）
const { generate, download } = useBarcode()
generate(svgElement, { text: 'SVG-001', format: 'CODE128' })

// 下载为 PNG
download('my-barcode.png')</code></pre>
      </div>
    </Card>

    <!-- 4. props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">BarcodeOptions 配置项</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="optionsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="参数" width="140" />
        <el-table-column prop="type" label="类型" width="160" />
        <el-table-column prop="default" label="默认值" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 5. methods-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">返回值与方法</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="methodsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="名称" width="140" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="params" label="参数" width="280" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 6. state-card -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">响应式状态</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="stateData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="状态" width="140" />
        <el-table-column prop="type" label="类型" width="140" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 7. app-preview-card -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">实际应用</span>
        </div>
      </template>
      <div class="app-examples">
        <div class="example-title">商品条码生成器</div>
        <div class="example-row">
          <div class="barcode-app">
            <div class="app-left">
              <div class="app-product" v-for="(p, i) in productList" :key="i"
                :class="{ 'is-active': currentProduct === i }"
                @click="switchProduct(i)">
                <div class="app-product-info">
                  <span class="app-product-name">{{ p.name }}</span>
                  <span class="app-product-code">{{ p.code }}</span>
                </div>
                <span class="app-product-format">{{ p.format }}</span>
              </div>
            </div>
            <div class="app-right">
              <canvas ref="appCanvasRef" class="app-canvas"></canvas>
              <div class="app-actions">
                <el-button type="primary" size="small" @click="downloadAppBarcode">下载条码</el-button>
                <el-button size="small" @click="printAppBarcode">打印</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import Card from '@/components/Card/index.vue'
import { useBarcode, type BarcodeFormat } from '@/hooks/useBarcode'

// ==================== 预览区 9 种条码 ====================
const canvasRefs: HTMLCanvasElement[] = []

function setCanvasRef(index: number, el: any) {
  if (el) {
    canvasRefs[index] = el as HTMLCanvasElement
  }
}

interface PreviewConfig {
  text: string
  format: BarcodeFormat
  width?: number
  height?: number
  lineColor?: string
  background?: string
  fontSize?: number
  textMargin?: number
  fontOptions?: string
  textPosition?: 'top' | 'bottom'
  margin?: number
}

const previewList = ref([
  {
    label: 'CODE 39',
    desc: '',
    wrapperStyle: {} as Record<string, string>,
    config: { text: 'HELLO', format: 'CODE39' as BarcodeFormat, width: 2, height: 80, fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: 'CODE 128',
    desc: '',
    wrapperStyle: {} as Record<string, string>,
    config: { text: 'Soybean-2024', format: 'CODE128' as BarcodeFormat, width: 2, height: 80, fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: 'EAN-13',
    desc: '',
    wrapperStyle: {} as Record<string, string>,
    config: { text: '234567890128', format: 'EAN13' as BarcodeFormat, width: 2, height: 80, fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: 'UPC-A',
    desc: '',
    wrapperStyle: {} as Record<string, string>,
    config: { text: '23456789012', format: 'UPC' as BarcodeFormat, width: 2, height: 80, fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: '不同高度 + 颜色',
    desc: '自定义高度与颜色',
    wrapperStyle: {} as Record<string, string>,
    config: { text: 'COLOR-001', format: 'CODE128' as BarcodeFormat, width: 2, height: 140, lineColor: '#1e80ff', fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: '加背景色',
    desc: '自定义背景色',
    wrapperStyle: { background: '#e8e8e8' } as Record<string, string>,
    config: { text: 'BG-002', format: 'CODE128' as BarcodeFormat, width: 2, height: 80, background: '#e0e0e0', lineColor: '#333', fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: '字体大',
    desc: 'fontSize: 32',
    wrapperStyle: {} as Record<string, string>,
    config: { text: 'BIG-FONT', format: 'CODE128' as BarcodeFormat, width: 2, height: 80, fontSize: 32, margin: 10 } as PreviewConfig,
  },
  {
    label: '文字远离条码',
    desc: 'textMargin: 20',
    wrapperStyle: {} as Record<string, string>,
    config: { text: 'FAR-TEXT', format: 'CODE128' as BarcodeFormat, width: 2, height: 80, textMargin: 20, fontSize: 16, margin: 10 } as PreviewConfig,
  },
  {
    label: '文字在上 + 粗体',
    desc: 'textPosition: top, bold',
    wrapperStyle: {} as Record<string, string>,
    config: { text: 'TOP-BOLD', format: 'CODE128' as BarcodeFormat, width: 2, height: 80, textPosition: 'top', fontOptions: 'bold', fontSize: 18, margin: 10 } as PreviewConfig,
  },
])

// 预览区 hook
const {
  generate: generatePreview,
} = useBarcode()

function renderPreviewList() {
  nextTick(() => {
    previewList.value.forEach((item, i) => {
      const canvas = canvasRefs[i]
      if (canvas) {
        generatePreview(canvas, item.config)
      }
    })
  })
}

// ==================== 控制面板 ====================
const {
  generate: generateControl,
  download: downloadControl,
  isValid,
} = useBarcode()

const controlCanvasRef = ref<HTMLCanvasElement>()

const formatList = [
  { label: 'CODE39', value: 'CODE39' },
  { label: 'CODE128', value: 'CODE128' },
  { label: 'CODE128A', value: 'CODE128A' },
  { label: 'CODE128B', value: 'CODE128B' },
  { label: 'CODE128C', value: 'CODE128C' },
  { label: 'EAN-13', value: 'EAN13' },
  { label: 'EAN-8', value: 'EAN8' },
  { label: 'UPC', value: 'UPC' },
  { label: 'ITF-14', value: 'ITF14' },
  { label: 'ITF', value: 'ITF' },
  { label: 'MSI', value: 'MSI' },
  { label: 'codabar', value: 'codabar' },
  { label: 'pharmacode', value: 'pharmacode' },
  { label: 'CODE93', value: 'CODE93' },
]

const config = ref({
  format: 'CODE128' as BarcodeFormat,
  text: 'HELLO 2024',
  width: 2,
  height: 100,
  lineColor: '#000000',
  background: '#ffffff',
  fontSize: 20,
  displayValue: true,
  textPosition: 'bottom' as 'top' | 'bottom',
  margin: 10,
})

function handleGenerate() {
  if (!config.value.text) {
    ElMessage.warning('请输入条码内容')
    return
  }
  if (controlCanvasRef.value) {
    generateControl(controlCanvasRef.value, { ...config.value })
  }
}

function handleDownload() {
  downloadControl('barcode.png')
  ElMessage.success('已下载')
}

// ==================== 应用区 ====================
const appCanvasRef = ref<HTMLCanvasElement>()
const {
  generate: generateApp,
  download: downloadApp,
} = useBarcode()

const productList = [
  { name: '可口可乐 330ml', code: '6901939621066', format: 'EAN13' as BarcodeFormat },
  { name: '农夫山泉 550ml', code: '6921168500992', format: 'EAN13' as BarcodeFormat },
  { name: '华为 Mate 60 Pro', code: 'HUAWEI-MT60PRO-2024', format: 'CODE128' as BarcodeFormat },
  { name: '物流箱 ITF-14', code: '12345678901234', format: 'ITF14' as BarcodeFormat },
]

const currentProduct = ref(0)

function switchProduct(index: number) {
  currentProduct.value = index
  const p = productList[index]
  if (appCanvasRef.value) {
    generateApp(appCanvasRef.value, {
      text: p.code,
      format: p.format,
      width: 2,
      height: 100,
      fontSize: 18,
      margin: 10,
    })
  }
}

function downloadAppBarcode() {
  downloadApp(`barcode-${productList[currentProduct.value].code}.png`)
  ElMessage.success('已下载')
}

function printAppBarcode() {
  if (!appCanvasRef.value) return
  const dataUrl = appCanvasRef.value.toDataURL('image/png')
  const win = window.open('', '_blank')
  if (!win) {
    ElMessage.error('请允许弹出窗口')
    return
  }
  const p = productList[currentProduct.value]
  win.document.write(`
    <html><head><title>打印条码</title></head><body style="text-align:center;padding:40px;">
    <h2>${p.name}</h2>
    <img src="${dataUrl}" />
    <p>${p.code}</p>
    </body></html>
  `)
  win.document.close()
  win.print()
}

// ==================== 生命周期 ====================
onMounted(() => {
  renderPreviewList()
  nextTick(() => {
    if (controlCanvasRef.value) {
      generateControl(controlCanvasRef.value, { ...config.value })
    }
    if (appCanvasRef.value) {
      const p = productList[0]
      generateApp(appCanvasRef.value, {
        text: p.code,
        format: p.format,
        width: 2,
        height: 100,
        fontSize: 18,
        margin: 10,
      })
    }
  })
})

// ==================== 配置表 ====================
const optionsData = [
  { name: 'text', type: 'string', default: '-', description: '要编码的内容（必填）' },
  { name: 'format', type: 'BarcodeFormat', default: "'CODE128'", description: '条码格式' },
  { name: 'width', type: 'number', default: '2', description: '条宽（px）' },
  { name: 'height', type: 'number', default: '100', description: '条高度（px）' },
  { name: 'displayValue', type: 'boolean', default: 'true', description: '是否显示文字' },
  { name: 'fontOptions', type: 'string', default: "''", description: '字体样式（bold, italic）' },
  { name: 'font', type: 'string', default: 'monospace', description: '字体' },
  { name: 'textLabel', type: 'string', default: "''", description: '自定义显示文字' },
  { name: 'textAlign', type: 'left|center|right', default: "'center'", description: '文字对齐' },
  { name: 'textPosition', type: 'top|bottom', default: "'bottom'", description: '文字位置' },
  { name: 'textMargin', type: 'number', default: '2', description: '文字与条码间距' },
  { name: 'fontSize', type: 'number', default: '20', description: '字体大小' },
  { name: 'background', type: 'string', default: '"#ffffff"', description: '背景色' },
  { name: 'lineColor', type: 'string', default: '"#000000"', description: '条码颜色' },
  { name: 'margin', type: 'number', default: '10', description: '外边距' },
  { name: 'marginTop', type: 'number', default: '-', description: '上边距（覆盖 margin）' },
  { name: 'marginBottom', type: 'number', default: '-', description: '下边距' },
  { name: 'marginLeft', type: 'number', default: '-', description: '左边距' },
  { name: 'marginRight', type: 'number', default: '-', description: '右边距' },
]

const methodsData = [
  { name: 'generate', type: 'function', params: '(element, options: BarcodeOptions)', description: '生成条码到指定元素' },
  { name: 'regenerate', type: 'function', params: '()', description: '使用上次配置重新生成' },
  { name: 'toDataURL', type: 'function', params: '(type?: string, quality?: number)', description: '获取 DataURL（仅 Canvas）' },
  { name: 'download', type: 'function', params: '(filename?: string)', description: '下载为图片' },
  { name: 'clear', type: 'function', params: '()', description: '清空条码' },
]

const stateData = [
  { name: 'isValid', type: 'Ref<boolean>', description: '条码是否有效' },
  { name: 'dataUrl', type: 'Ref<string>', description: '生成的 DataURL（Canvas 模式）' },
]
</script>

<style scoped lang="scss">
// 预览区 9 宫格
.barcode-preview-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.barcode-preview-item {
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  background: var(--el-bg-color);

  .barcode-label {
    font-size: 13px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }

  .barcode-canvas-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100px;
    padding: 8px;
    border-radius: 4px;
    width: 100%;
    overflow: hidden;

    canvas {
      max-width: 100%;
      height: auto;
    }
  }

  .barcode-desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}

// 控制区 Canvas
.control-canvas-area {
  margin-bottom: 16px;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  border: 1px solid var(--el-border-color-lighter);

  .control-canvas {
    max-width: 100%;
    height: auto;
  }
}

// 控制面板
.barcode-controls {
  padding: 20px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  margin-bottom: 16px;

  .control-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 12px;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .control-label {
      min-width: 70px;
      font-weight: 500;
      color: var(--el-text-color-regular);
      flex-shrink: 0;
      font-size: 13px;
    }
  }
}

.barcode-status {
  padding: 12px 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
}

// 应用区
.barcode-app {
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.app-left {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .app-product {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--el-color-primary-light-5);
      background: var(--el-color-primary-light-9);
    }

    &.is-active {
      border-color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .app-product-info {
      display: flex;
      flex-direction: column;
      gap: 4px;

      .app-product-name {
        font-size: 13px;
        font-weight: 500;
      }

      .app-product-code {
        font-size: 12px;
        color: var(--el-text-color-secondary);
        font-family: monospace;
      }
    }

    .app-product-format {
      font-size: 11px;
      padding: 2px 8px;
      border-radius: 4px;
      background: var(--el-fill-color);
      color: var(--el-text-color-regular);
    }
  }
}

.app-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  background: #fff;
  border-radius: 8px;
  padding: 20px;
  border: 1px solid var(--el-border-color-lighter);
  min-height: 200px;
  justify-content: center;

  .app-canvas {
    max-width: 100%;
    height: auto;
  }

  .app-actions {
    display: flex;
    gap: 8px;
  }
}
</style>
