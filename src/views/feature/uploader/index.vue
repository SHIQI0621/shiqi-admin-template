<template>
  <div class="uploader-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">Uploader 文件上传</h1>
        <p class="intro-text">
          Uploader 组件基于 Element Plus el-upload 封装，支持拖拽上传、点击上传、图片卡片上传三种模式，
          可配置文件类型、大小限制、上传数量等参数，内置 mock 上传模式（无需后端即可预览），
          同时支持真实 API 上传、文件预览、v-model 双向绑定文件列表。
        </p>
        <div class="intro-tips">
          <p>
            <strong>提示：</strong>
            当 action 为 <code class="code-inline">#</code> 或不传时，组件自动使用 mock 模式模拟上传进度和结果，
            适合前端独立开发和演示。真实上传只需配置 action 为后端接口地址即可。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            Uploader 是一个独立组件，可直接在页面中引入使用。
            导入路径：<span class="code-inline">import Uploader from '@/components/Uploader/index.vue'</span>
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

      <!-- 模式切换 -->
      <div class="preview-tabs">
        <el-radio-group v-model="activeMode" @change="handleModeChange">
          <el-radio-button value="drag">拖拽上传</el-radio-button>
          <el-radio-button value="button">按钮上传</el-radio-button>
          <el-radio-button value="card">卡片上传</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 拖拽上传 -->
      <div v-if="activeMode === 'drag'" class="preview-demo">
        <Uploader
          v-model="dragFiles"
          drag
          multiple
          :limit="5"
          :max-size="10"
          tip="支持任意格式文件，单个文件不超过 10MB"
          @success="handleSuccess"
          @error="handleError"
          @progress="handleProgress"
        />
      </div>

      <!-- 按钮上传 -->
      <div v-if="activeMode === 'button'" class="preview-demo">
        <Uploader
          v-model="buttonFiles"
          multiple
          :limit="5"
          :max-size="10"
          button-text="选择文件"
          tip="支持任意格式文件，单个文件不超过 10MB"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>

      <!-- 卡片上传（仅图片） -->
      <div v-if="activeMode === 'card'" class="preview-demo">
        <Uploader
          v-model="cardFiles"
          list-type="picture-card"
          multiple
          :limit="6"
          accept="image/*"
          :max-size="5"
          :allowed-exts="['jpg', 'jpeg', 'png', 'gif', 'webp']"
          tip="仅支持图片文件（jpg/png/gif/webp），单张不超过 5MB"
          @success="handleSuccess"
          @error="handleError"
        />
      </div>

      <!-- 文件列表信息 -->
      <div v-if="currentFiles.length > 0" class="preview-info">
        <div class="info-title">已上传文件（{{ currentFiles.length }}）</div>
        <el-table :data="currentFiles" size="small" class="api-table"
          :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
          <el-table-column prop="name" label="文件名" min-width="200" />
          <el-table-column label="大小" width="120">
            <template #default="{ row }">
              {{ formatSize(row.size) }}
            </template>
          </el-table-column>
          <el-table-column label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)" size="small">
                {{ getStatusLabel(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column label="进度" width="120">
            <template #default="{ row }">
              <el-progress :percentage="row.percentage || 0" :stroke-width="6" />
            </template>
          </el-table-column>
        </el-table>
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
        <h3 class="usage-subtitle">拖拽上传</h3>
        <p class="demo-desc">使用 drag 属性开启拖拽上传模式。</p>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;Uploader
    v-model="files"
    drag
    multiple
    :limit="5"
    :max-size="10"
    tip="支持任意格式文件，单个不超过 10MB"
    @success="onSuccess"
    @error="onError"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import Uploader from '@/components/Uploader/index.vue'

const files = ref([])

function onSuccess(file, response) {
  console.log('上传成功:', file.name)
}

function onError(file, err) {
  console.log('上传失败:', file.name)
}
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">图片卡片上传</h3>
        <p class="demo-desc">使用 list-type="picture-card" 显示图片缩略图卡片。</p>
        <pre class="code-block"><code>&lt;Uploader
  v-model="images"
  list-type="picture-card"
  multiple
  :limit="6"
  accept="image/*"
  :allowed-exts="['jpg', 'png', 'gif']"
  :max-size="5"
  tip="仅支持 jpg/png/gif，单张不超过 5MB"
/&gt;</code></pre>

        <h3 class="usage-subtitle">文件类型与大小限制</h3>
        <p class="demo-desc">通过 maxSize、allowedExts、accept 控制上传范围。</p>
        <pre class="code-block"><code>&lt;Uploader
  :max-size="2"                          &lt;!-- 最大 2MB --&gt;
  accept=".pdf,.doc,.docx"               &lt;!-- accept 属性 --&gt;
  :allowed-exts="['pdf', 'doc', 'docx']"  &lt;!-- 扩展名白名单 --&gt;
  tip="仅支持 PDF/DOC/DOCX，单个不超过 2MB"
/&gt;</code></pre>

        <h3 class="usage-subtitle">真实 API 上传</h3>
        <p class="demo-desc">配置 action 和 headers 即可对接后端接口。</p>
        <pre class="code-block"><code>&lt;Uploader
  v-model="files"
  action="/api/upload"
  :headers="{ Authorization: 'Bearer xxx' }"
  :data="{ bizType: 'avatar' }"
  name="file"
  @success="onSuccess"
  @error="onError"
/&gt;</code></pre>

        <h3 class="usage-subtitle">手动上传</h3>
        <p class="demo-desc">设置 auto-upload=false 后通过 ref.submit() 手动触发。</p>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;Uploader ref="uploaderRef" :auto-upload="false" /&gt;
  &lt;el-button type="primary" @click="startUpload"&gt;开始上传&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const uploaderRef = ref(null)

function startUpload() {
  uploaderRef.value.submit()
}
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">调用 Exposed 方法</h3>
        <pre class="code-block"><code>const uploaderRef = ref(null)

// 清空文件列表
uploaderRef.value.clear()

// 手动触发上传
uploaderRef.value.submit()

// 中止上传
uploaderRef.value.abort()</code></pre>
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
        <el-table-column prop="name" label="参数" width="140" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="default" label="默认值" width="100" />
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
        <el-table-column prop="params" label="参数" width="240" />
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
        <el-table-column prop="params" label="参数" width="120" />
        <el-table-column prop="return" label="返回值" width="120" />
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
        <div class="example-title">头像上传</div>
        <div class="example-row">
          <div class="avatar-upload-app">
            <Uploader
              v-model="avatarFiles"
              list-type="picture-card"
              :limit="1"
              accept="image/*"
              :allowed-exts="['jpg', 'jpeg', 'png']"
              :max-size="2"
              tip="上传头像（jpg/png，不超过 2MB）"
            />
            <div v-if="avatarFiles.length > 0" class="avatar-preview-app">
              <el-avatar :size="80" :src="avatarFiles[0]?.url">
                <el-icon><User /></el-icon>
              </el-avatar>
              <span>{{ avatarFiles[0]?.name }}</span>
            </div>
          </div>
        </div>

        <div class="example-title">文档上传</div>
        <div class="example-row">
          <div class="doc-upload-app">
            <Uploader
              v-model="docFiles"
              drag
              multiple
              :limit="3"
              accept=".pdf,.doc,.docx,.xls,.xlsx"
              :allowed-exts="['pdf', 'doc', 'docx', 'xls', 'xlsx']"
              :max-size="20"
              tip="支持 PDF/Word/Excel，单个文件不超过 20MB"
            />
            <div v-if="docFiles.length > 0" class="doc-list-app">
              <div v-for="f in docFiles" :key="f.uid" class="doc-item-app">
                <el-icon><Document /></el-icon>
                <span>{{ f.name }}</span>
                <span class="doc-size">{{ formatSize(f.size) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { User, Document } from '@element-plus/icons-vue'
import Card from '@/components/Card/index.vue'
import Uploader from '@/components/Uploader/index.vue'
import type { UploadFile } from 'element-plus'

const activeMode = ref<'drag' | 'button' | 'card'>('drag')

const dragFiles = ref<UploadFile[]>([])
const buttonFiles = ref<UploadFile[]>([])
const cardFiles = ref<UploadFile[]>([])
const avatarFiles = ref<UploadFile[]>([])
const docFiles = ref<UploadFile[]>([])

const currentFiles = computed(() => {
  if (activeMode.value === 'drag') return dragFiles.value
  if (activeMode.value === 'button') return buttonFiles.value
  return cardFiles.value
})

function handleModeChange() {
  // 切换模式时不清空文件
}

function formatSize(size: number | undefined): string {
  if (!size) return '-'
  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`
  return `${(size / 1024 / 1024).toFixed(1)}MB`
}

function getStatusType(status: string | undefined): 'success' | 'warning' | 'info' | 'primary' {
  if (status === 'success') return 'success'
  if (status === 'uploading') return 'warning'
  if (status === 'fail') return 'info'
  return 'primary'
}

function getStatusLabel(status: string | undefined): string {
  const map: Record<string, string> = {
    success: '已上传',
    uploading: '上传中',
    fail: '失败',
    ready: '等待中',
  }
  return map[status || ''] || status || '未知'
}

function handleSuccess(file: UploadFile, response: any) {
  // 成功回调
  ElMessage.success(`文件 ${file.name} 上传成功: ${response}`)
}

function handleError(file: UploadFile, err: any) {
  // 失败回调
  ElMessage.error(`文件 ${file.name} 上传失败: ${err.message}`)
}

function handleProgress(file: UploadFile, percent: number) {
  // 进度回调
  ElMessage.info(`文件 ${file.name} 上传进度: ${percent.toFixed(2)}%`)
}

// Props 数据
const propsData = [
  { name: 'modelValue', type: 'UploadFile[]', default: '[]', description: '文件列表（v-model 绑定）' },
  { name: 'action', type: 'string', default: "'#'", description: '上传地址，为 # 时使用 mock 模式' },
  { name: 'headers', type: 'Record<string, string>', default: '{}', description: '请求头' },
  { name: 'data', type: 'Record<string, any>', default: '{}', description: '额外上传参数' },
  { name: 'name', type: 'string', default: "'file'", description: '文件字段名' },
  { name: 'accept', type: 'string', default: "''", description: '接受的文件类型（原生 accept 属性）' },
  { name: 'multiple', type: 'boolean', default: 'false', description: '是否多选' },
  { name: 'limit', type: 'number', default: '5', description: '最大上传数量' },
  { name: 'maxSize', type: 'number', default: '10', description: '最大文件大小（MB）' },
  { name: 'allowedExts', type: 'string[]', default: '[]', description: '允许的文件扩展名（不含点）' },
  { name: 'autoUpload', type: 'boolean', default: 'true', description: '是否自动上传' },
  { name: 'drag', type: 'boolean', default: 'false', description: '是否拖拽上传模式' },
  { name: 'listType', type: "'text' | 'picture' | 'picture-card'", default: "'text'", description: '列表展示样式' },
  { name: 'buttonText', type: 'string', default: "'点击上传'", description: '按钮模式文字' },
  { name: 'tip', type: 'string', default: "''", description: '提示文字' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
]

// Events 数据
const eventsData = [
  { name: 'update:modelValue', params: '(files: UploadFile[])', description: '文件列表变化时触发' },
  { name: 'success', params: '(file: UploadFile, response: any)', description: '上传成功时触发' },
  { name: 'error', params: '(file: UploadFile, err: any)', description: '上传失败时触发' },
  { name: 'progress', params: '(file: UploadFile, percent: number)', description: '上传进度变化时触发' },
  { name: 'exceed', params: '(files: File[])', description: '超出数量限制时触发' },
  { name: 'remove', params: '(file: UploadFile)', description: '文件移除时触发' },
  { name: 'change', params: '(file: UploadFile, fileList: UploadFiles)', description: '文件状态变化时触发' },
]

// Exposed 数据
const exposedData = [
  { name: 'clear', params: '()', return: 'void', description: '清空文件列表' },
  { name: 'submit', params: '()', return: 'void', description: '手动触发上传' },
  { name: 'abort', params: '()', return: 'void', description: '中止上传' },
]
</script>

<style scoped lang="scss">
.preview-tabs {
  margin-bottom: 20px;
}

.preview-demo {
  padding: 24px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  margin-bottom: 16px;
}

.preview-info {
  padding: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;

  .info-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--el-text-color-primary);
  }
}

// 实际应用 - 头像上传
.avatar-upload-app {
  display: flex;
  align-items: center;
  gap: 24px;
}

.avatar-preview-app {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: var(--el-text-color-secondary);
}

// 实际应用 - 文档上传
.doc-upload-app {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

.doc-list-app {
  display: flex;
  flex-direction: column;
  gap: 8px;

  .doc-item-app {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    background: var(--el-bg-color);
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 6px;
    font-size: 13px;

    .doc-size {
      margin-left: auto;
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
