<template>
  <div class="qr-code-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">QRCode 二维码生成</h1>
        <p class="intro-text">
          QRCode 组件用于生成二维码，支持标准、反色、圆角、圆点、渐变、带 Logo 六种视觉样式。
          可配置尺寸、容错级别、渐变颜色等参数，并提供下载和获取 DataURL 的能力。
        </p>
        <div class="intro-tips">
          <p><strong>提示：</strong>text 属性为必填项。gradient 样式下可使用 color1 和 color2 配置渐变色；logo 样式下需通过 logo 属性传入 Logo 图片的 base64
            字符串。组件通过 Exposed 暴露了 download 和 getDataUrl 方法。</p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">独立使用</div>
          <p>
            QRCode 是一个独立组件，可直接在页面中引入使用。
            导入路径：<span class="code-inline">import QRCode from '@/components/QRCode/index.vue'</span>
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

      <!-- 配置面板 -->
      <div class="qr-config-panel">
        <el-form :inline="true" :model="config">
          <el-form-item label="内容">
            <el-input v-model="config.text" type="textarea" :rows="2" :maxlength="500" show-word-limit
              placeholder="请输入文本或URL" style="width: 300px" />
          </el-form-item>
          <el-form-item label="样式">
            <el-select v-model="config.qrStyle" style="width: 140px">
              <el-option v-for="s in styleOptions" :key="s.value" :label="getStyleLabel(s.value)" :value="s.value" />
            </el-select>
          </el-form-item>
          <el-form-item label="尺寸">
            <el-slider v-model="config.size" :min="100" :max="400" :step="10" show-input style="width: 200px" />
          </el-form-item>
          <el-form-item v-if="config.qrStyle === 'logo' || config.qrStyle === 'gradient'" label="容错级别">
            <el-select v-model="config.errorLevel" style="width: 100px">
              <el-option label="L" value="L" />
              <el-option label="M" value="M" />
              <el-option label="Q" value="Q" />
              <el-option label="H" value="H" />
            </el-select>
          </el-form-item>
          <el-form-item v-if="config.qrStyle === 'gradient'" label="渐变色">
            <el-color-picker v-model="config.color1" />
            <span style="margin: 0 8px">→</span>
            <el-color-picker v-model="config.color2" />
          </el-form-item>
          <el-form-item v-if="config.qrStyle === 'logo'" label="Logo">
            <el-upload :show-file-list="false" :before-upload="handleLogoUpload" accept="image/*">
              <el-button size="small">上传Logo</el-button>
            </el-upload>
            <el-button v-if="config.logo" size="small" link @click="config.logo = ''">
              移除Logo
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :icon="Download" @click="handleDownload">
              下载
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 预览区域 -->
      <div class="qr-preview-area">
        <div class="qr-preview-item">
          <QRCode ref="qrCodeRef" :text="config.text" :qrStyle="config.qrStyle" :size="config.size"
            :error-level="config.errorLevel" :color1="config.color1" :color2="config.color2" :logo="config.logo"
            @change="handleChange" @error="handleError" />
          <div class="qr-preview-info">
            <p>字符数: {{ config.text.length }}</p>
            <p>尺寸: {{ config.size }}×{{ config.size }}</p>
            <p>样式: {{ getStyleLabel(config.qrStyle) }}</p>
          </div>
        </div>

        <div v-if="errorMsg" class="qr-error-msg">
          <el-alert :title="errorMsg" type="warning" show-icon :closable="false" />
        </div>
      </div>

      <div class="preview-section">
        <div class="section-title">多种样式一览</div>
        <div class="qr-style-showcase">
          <div class="qr-style-item" v-for="(s, index) in styleOptions" :key="s.value">
            <div class="qr-style-item__preview">
              <QRCode v-if="renderedStyles[index]" :text="'qrcode-' + s.value" :qrStyle="s.value" :size="100"
                error-level="L" :color1="config.color1" :color2="config.color2" />
            </div>
            <div class="qr-style-item__label">{{ getStyleLabel(s.value) }}</div>
          </div>
        </div>
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
        <h3 class="usage-subtitle">基础二维码</h3>
        <pre class="code-block"><code>&lt;QRCode text="Hello QRCode" /&gt;</code></pre>

        <h3 class="usage-subtitle">指定样式与尺寸</h3>
        <pre class="code-block"><code>&lt;QRCode text="https://example.com" qrStyle="rounded" :size="200" error-level="H"
        /&gt;</code></pre>

        <h3 class="usage-subtitle">渐变样式</h3>
        <pre class="code-block"><code>&lt;QRCode
        text="https://example.com"
        qrStyle="gradient"
        color1="#667eea"
        color2="#764ba2"
        error-level="M"
        /&gt;</code></pre>

        <h3 class="usage-subtitle">带 Logo 样式</h3>
        <pre class="code-block"><code>&lt;QRCode
        ref="qrCodeRef"
        text="https://example.com"
        qrStyle="logo"
        :logo="logoBase64"
        error-level="H"
        /&gt;</code></pre>

        <h3 class="usage-subtitle">调用 Exposed 方法下载</h3>
        <pre class="code-block"><code>const qrCodeRef = ref(null)
        qrCodeRef.value.download('my-qrcode.png')

        // 或获取 DataURL
        const dataUrl = qrCodeRef.value.getDataUrl()</code></pre>
      </div>
    </Card>

    <!-- 4. props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">属性说明</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="propsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="参数" width="160" />
        <el-table-column prop="type" label="类型" width="220" />
        <el-table-column prop="default" label="默认值" width="180" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 5. events-card -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">事件说明</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="eventsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="事件名" width="160" />
        <el-table-column prop="params" label="参数" width="220" />
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
        <div class="example-title">分享链接</div>
        <div class="example-row">
          <div>
            <p style="margin: 0 0 12px; color: var(--el-text-color-secondary); font-size: 13px;">扫描二维码访问分享页面</p>
            <QRCode text="https://example.com/share/abc123" qrStyle="rounded" :size="120" error-level="M" />
          </div>
        </div>

        <div class="example-title">分享链接</div>
        <div class="example-row">
          <div>
            <p style="margin: 0 0 12px; color: var(--el-text-color-secondary); font-size: 13px;">扫描二维码访问分享页面</p>
            <QRCode text="https://example.com/share/abc" qrStyle="logo" :logo="logoBase64" :size="120" error-level="M" />
          </div>
        </div>

        <div class="example-title">联系方式名片</div>
        <div class="example-row">
          <div>
            <p style="margin: 0 0 12px; color: var(--el-text-color-secondary); font-size: 13px;">扫描二维码添加联系人</p>
            <QRCode text="BEGIN:VCARD\nVERSION:3.0\nFN:张三\nTEL:13800138000\nEND:VCARD" qrStyle="gradient" :size="120"
              error-level="H" />
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import logoBase64 from '@/assets/logo.png'
import { ref, reactive, onMounted } from 'vue'
import { Download } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import QRCode from '@/components/QRCode/index.vue'
import type { QRStyle } from '@/components/QRCode/index.vue'

const styleLabelMap: Record<string, string> = {
  standard: '标准',
  inverted: '反色',
  rounded: '圆角',
  dots: '圆点',
  gradient: '渐变',
  logo: '带Logo',
}

function getStyleLabel(style: string) {
  return styleLabelMap[style] || style
}

// 配置参数
const config = reactive({
  text: 'Hello QRCode',
  qrStyle: 'standard' as QRStyle,
  size: 200,
  errorLevel: 'L' as 'L' | 'M' | 'Q' | 'H',
  color1: '#667eea',
  color2: '#764ba2',
  logo: '',
})

// 样式选项
const styleOptions: { value: QRStyle }[] = [
  { value: 'standard' },
  { value: 'inverted' },
  { value: 'rounded' },
  { value: 'dots' },
  { value: 'gradient' },
  { value: 'logo' },
]

const qrCodeRef = ref<InstanceType<typeof QRCode> | null>(null)

// 错误信息
const errorMsg = ref('')

// 生成结果
const generatedUrl = ref('')

// 分批渲染标志
const renderedStyles = ref<boolean[]>([true, false, false, false, false, false])

onMounted(() => {
  styleOptions.forEach((_, index) => {
    if (index === 0) return
    setTimeout(() => {
      renderedStyles.value[index] = true
    }, index * 100)
  })
})

// 处理 logo 上传
function handleLogoUpload(file: File) {
  if (!file.type.startsWith('image/')) {
    ElMessage.error('请上传图片文件')
    return false
  }
  const reader = new FileReader()
  reader.onload = (e) => {
    config.logo = e.target?.result as string
  }
  reader.readAsDataURL(file)
  return false
}

// 下载
function handleDownload() {
  if (qrCodeRef.value) {
    qrCodeRef.value?.download(`qrcode-${config.qrStyle}.png`)
    ElMessage.success('下载成功')
  }
}

// 处理 change 事件
function handleChange(dataUrl: string) {
  generatedUrl.value = dataUrl
  errorMsg.value = ''
}

// 处理 error 事件
function handleError(err: Error) {
  if (err.message.includes('too big')) {
    errorMsg.value = '内容过长，请减少文字或增大尺寸'
  } else {
    errorMsg.value = '二维码生成失败'
  }
}

// Props 数据
const propsData = [
  { name: 'text', type: 'string (必填)', default: '-', description: '二维码内容' },
  { name: 'style', type: "'standard' | 'inverted' | 'rounded' | 'gradient' | 'logo' | 'dots'", default: "'standard'", description: '二维码视觉样式' },
  { name: 'size', type: 'number', default: '200', description: '二维码尺寸（像素）' },
  { name: 'errorLevel', type: "'L' | 'M' | 'Q' | 'H'", default: "'L'", description: '容错级别' },
  { name: 'color1', type: 'string', default: "'#667eea'", description: '渐变色起始色（gradient 样式使用）' },
  { name: 'color2', type: 'string', default: "'#764ba2'", description: '渐变色结束色（gradient 样式使用）' },
  { name: 'logo', type: 'string', default: "''", description: 'Logo 图片 base64 字符串（logo 样式使用）' },
]

// Events 数据
const eventsData = [
  { name: 'change', params: '(dataUrl: string)', description: '二维码生成成功时触发，参数为生成的 Data URL' },
  { name: 'error', params: '(err: Error)', description: '二维码生成失败时触发' },
]
</script>

<style scoped lang="scss">
.qr-config-panel {
  margin-bottom: 20px;
  padding: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
}

.qr-preview-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: var(--el-bg-color);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 24px;
}

.qr-preview-item {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.qr-preview-info {
  padding: 12px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);

  p {
    margin: 4px 0;
  }
}

.qr-error-msg {
  width: 100%;
  max-width: 400px;
}

.qr-style-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.qr-style-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }

  &__preview {
    margin-bottom: 8px;
  }

  &__label {
    font-size: 12px;
    font-weight: 500;
    color: var(--el-text-color-primary);
  }
}
</style>
