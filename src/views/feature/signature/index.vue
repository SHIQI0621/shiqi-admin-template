<template>
  <div class="signature-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">Signature 电子签名</h1>
        <p class="intro-text">
          Signature 组件用于在网页中实现手写电子签名功能，支持鼠标和触控绘制，
          可配置画笔颜色、线宽、背景色等参数，并提供清空、撤销、生成图片、下载等能力。
          适用于合同签署、表单确认、审批流程等场景。
        </p>
        <div class="intro-tips">
          <p>
            <strong>提示：</strong>
            组件基于 HTML5 Canvas 实现，自动适配高清屏（devicePixelRatio）。
            通过 Exposed 暴露了 clear、undo、toDataURL、download、getIsEmpty 方法，
            支持 change / begin / end 事件。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            Signature 是一个独立组件，可直接在页面中引入使用。
            导入路径：<span class="code-inline">import Signature from '@/components/Signature/index.vue'</span>
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
      <div class="sig-config-panel">
        <el-form :inline="true" :model="config">
          <el-form-item label="画笔颜色">
            <el-color-picker v-model="config.color" />
          </el-form-item>
          <el-form-item label="线宽">
            <el-slider v-model="config.lineWidth" :min="1" :max="10" :step="0.5" show-input style="width: 200px" />
          </el-form-item>
          <el-form-item label="背景色">
            <el-color-picker v-model="config.bgColor" />
          </el-form-item>
          <el-form-item label="画布宽度">
            <el-input-number v-model="config.width" :min="300" :max="800" :step="50" controls-position="right" />
          </el-form-item>
          <el-form-item label="画布高度">
            <el-input-number v-model="config.height" :min="150" :max="500" :step="50" controls-position="right" />
          </el-form-item>
          <el-form-item label="禁用">
            <el-switch v-model="config.disabled" />
          </el-form-item>
        </el-form>
      </div>

      <!-- 签名区域 -->
      <div class="sig-canvas-area">
        <Signature
          ref="sigRef"
          :width="config.width"
          :height="config.height"
          :color="config.color"
          :line-width="config.lineWidth"
          :bg-color="config.bgColor"
          :disabled="config.disabled"
          placeholder="请在此处手写签名"
          @change="handleChange"
          @begin="handleBegin"
          @end="handleEnd"
        />
      </div>

      <!-- 操作按钮 -->
      <div class="sig-actions">
        <el-button @click="handleClear">清空画板</el-button>
        <el-button @click="handleUndo">撤销</el-button>
        <el-button type="primary" @click="handleGenerate">生成图片</el-button>
        <el-button type="success" @click="handleDownload">下载图片</el-button>
      </div>

      <!-- 生成结果 -->
      <div v-if="generatedUrl" class="sig-result">
        <div class="result-title">生成结果</div>
        <div class="result-preview">
          <img :src="generatedUrl" alt="签名图片" class="result-img" />
          <div class="result-info">
            <p>状态：{{ isEmpty ? '画板为空' : '已签名' }}</p>
            <p>格式：PNG (base64)</p>
            <p>尺寸：{{ config.width }}×{{ config.height }}</p>
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
        <h3 class="usage-subtitle">基础签名</h3>
        <p class="demo-desc">使用默认配置，直接在画布上手写签名。</p>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;Signature ref="sigRef" @change="onchange" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import Signature from '@/components/Signature/index.vue'

const sigRef = ref(null)

function onchange(isEmpty: boolean) {
  console.log('签名是否为空:', isEmpty)
}
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">自定义画笔与背景</h3>
        <p class="demo-desc">配置画笔颜色、线宽和背景色。</p>
        <pre class="code-block"><code>&lt;Signature
  :width="500"
  :height="250"
  color="#0066cc"
  :line-width="4"
  bg-color="#f5f5f5"
  placeholder="请在此处签名"
/&gt;</code></pre>

        <h3 class="usage-subtitle">禁用签名</h3>
        <p class="demo-desc">通过 disabled 属性禁用签名功能。</p>
        <pre class="code-block"><code>&lt;Signature :disabled="true" /&gt;</code></pre>

        <h3 class="usage-subtitle">调用 Exposed 方法</h3>
        <p class="demo-desc">通过 ref 调用 clear、undo、toDataURL、download 等方法。</p>
        <pre class="code-block"><code>const sigRef = ref(null)

// 清空
sigRef.value.clear()

// 撤销
sigRef.value.undo()

// 获取 base64
const dataUrl = sigRef.value.toDataURL('image/png')

// 下载图片
sigRef.value.download('my-signature.png')

// 检查是否为空
const empty = sigRef.value.getIsEmpty()</code></pre>
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
        <el-table-column prop="name" label="参数" width="120" />
        <el-table-column prop="type" label="类型" width="160" />
        <el-table-column prop="default" label="默认值" width="140" />
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
        <el-table-column prop="name" label="事件名" width="120" />
        <el-table-column prop="params" label="参数" width="200" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 6. exposed-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">暴露方法（Exposed）</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="exposedData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="方法名" width="120" />
        <el-table-column prop="params" label="参数" width="220" />
        <el-table-column prop="return" label="返回值" width="160" />
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
        <div class="example-title">合同签署</div>
        <div class="example-row">
          <div class="contract-demo">
            <p class="contract-text">
              甲方（签字）：________________<br />
              乙方（签字）：________________<br />
              日期：______年____月____日
            </p>
            <div class="contract-sig">
              <Signature
                ref="contractSigRef"
                :width="300"
                :height="120"
                color="#333"
                :line-width="2.5"
                placeholder="甲方签名"
              />
              <el-button size="small" @click="contractSigRef?.clear()">重签</el-button>
            </div>
          </div>
        </div>

        <div class="example-title">审批确认</div>
        <div class="example-row">
          <div class="approval-demo">
            <div class="approval-form">
              <el-form label-width="80px">
                <el-form-item label="审批人">
                  <el-input model-value="张三" readonly style="width: 120px" />
                </el-form-item>
                <el-form-item label="审批意见">
                  <el-input type="textarea" :rows="2" placeholder="同意" style="width: 240px" />
                </el-form-item>
                <el-form-item label="电子签名">
                  <Signature
                    ref="approvalSigRef"
                    :width="240"
                    :height="100"
                    color="#0066cc"
                    :line-width="2"
                    placeholder="签名确认"
                  />
                </el-form-item>
              </el-form>
            </div>
            <el-button size="small" @click="approvalSigRef?.clear()">重签</el-button>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import Card from '@/components/Card/index.vue'
import Signature from '@/components/Signature/index.vue'

const sigRef = ref<InstanceType<typeof Signature> | null>(null)
const contractSigRef = ref<InstanceType<typeof Signature> | null>(null)
const approvalSigRef = ref<InstanceType<typeof Signature> | null>(null)

const config = reactive({
  width: 600,
  height: 300,
  color: '#333333',
  lineWidth: 3,
  bgColor: '#ffffff',
  disabled: false,
})

const isEmpty = ref(true)
const generatedUrl = ref('')

function handleChange(empty: boolean) {
  isEmpty.value = empty
}

function handleBegin() {
  // 签名开始
}

function handleEnd() {
  // 签名结束
}

function handleClear() {
  sigRef.value?.clear()
  generatedUrl.value = ''
  ElMessage.info('已清空画板')
}

function handleUndo() {
  sigRef.value?.undo()
  ElMessage.info('已撤销')
}

function handleGenerate() {
  if (sigRef.value?.getIsEmpty()) {
    ElMessage.warning('画板为空，请先签名')
    return
  }
  generatedUrl.value = sigRef.value?.toDataURL('image/png') || ''
  ElMessage.success('图片已生成')
}

function handleDownload() {
  if (sigRef.value?.getIsEmpty()) {
    ElMessage.warning('画板为空，请先签名')
    return
  }
  sigRef.value?.download(`signature-${Date.now()}.png`)
  ElMessage.success('下载成功')
}

// Props 数据
const propsData = [
  { name: 'width', type: 'number', default: '600', description: '画布宽度（像素）' },
  { name: 'height', type: 'number', default: '300', description: '画布高度（像素）' },
  { name: 'color', type: 'string', default: "'#333333'", description: '画笔颜色' },
  { name: 'lineWidth', type: 'number', default: '3', description: '画笔线宽' },
  { name: 'bgColor', type: 'string', default: "'#ffffff'", description: '画布背景色' },
  { name: 'placeholder', type: 'string', default: "'请在此处签名'", description: '占位提示文字' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用签名' },
]

// Events 数据
const eventsData = [
  { name: 'change', params: '(isEmpty: boolean)', description: '签名状态变化时触发，参数为是否为空' },
  { name: 'begin', params: '()', description: '开始绘制时触发' },
  { name: 'end', params: '()', description: '结束绘制时触发' },
]

// Exposed 数据
const exposedData = [
  { name: 'clear', params: '()', return: 'void', description: '清空画板' },
  { name: 'undo', params: '()', return: 'void', description: '撤销上一笔（最多20步）' },
  { name: 'toDataURL', params: "(type?: string, quality?: number)", return: 'string', description: '获取签名图片 base64 DataURL' },
  { name: 'download', params: "(filename?: string)", return: 'void', description: '下载签名图片' },
  { name: 'getIsEmpty', params: '()', return: 'boolean', description: '获取画板是否为空' },
]
</script>

<style scoped lang="scss">
.sig-config-panel {
  margin-bottom: 20px;
  padding: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
}

.sig-canvas-area {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: var(--el-bg-color);
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
}

.sig-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 16px;
}

.sig-result {
  padding: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;

  .result-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--el-text-color-primary);
  }

  .result-preview {
    display: flex;
    gap: 24px;
    align-items: flex-start;
  }

  .result-img {
    max-width: 300px;
    border: 1px solid var(--el-border-color);
    border-radius: 8px;
  }

  .result-info {
    font-size: 13px;
    color: var(--el-text-color-secondary);

    p {
      margin: 4px 0;
    }
  }
}

// 实际应用 - 合同签署
.contract-demo {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .contract-text {
    line-height: 2;
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  .contract-sig {
    display: flex;
    align-items: flex-end;
    gap: 12px;
  }
}

// 实际应用 - 审批确认
.approval-demo {
  display: flex;
  align-items: flex-end;
  gap: 12px;

  .approval-form {
    flex: 1;
  }
}
</style>
