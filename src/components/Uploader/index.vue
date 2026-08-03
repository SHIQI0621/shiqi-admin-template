<template>
  <div class="uploader-wrap">
    <!-- 拖拽上传模式 -->
    <el-upload
      v-if="drag"
      ref="uploadRef"
      :action="action"
      :headers="headers"
      :data="data"
      :name="name"
      :multiple="multiple"
      :limit="limit"
      :accept="accept"
      :auto-upload="autoUpload"
      :show-file-list="false"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :http-request="httpRequest"
      :disabled="disabled"
      drag
      class="uploader-drag"
    >
      <div class="uploader-drag__inner">
        <el-icon class="uploader-drag__icon"><UploadFilled /></el-icon>
        <div class="uploader-drag__text">
          将文件拖到此处，或<em>点击上传</em>
        </div>
        <div v-if="tip" class="uploader-drag__tip">{{ tip }}</div>
      </div>
    </el-upload>

    <!-- 点击上传模式（卡片 / 按钮） -->
    <el-upload
      v-else
      ref="uploadRef"
      :action="action"
      :headers="headers"
      :data="data"
      :name="name"
      :list-type="listType"
      :multiple="multiple"
      :limit="limit"
      :accept="accept"
      :auto-upload="autoUpload"
      :file-list="fileList"
      :before-upload="handleBeforeUpload"
      :on-success="handleSuccess"
      :on-error="handleError"
      :on-progress="handleProgress"
      :on-exceed="handleExceed"
      :on-change="handleChange"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :http-request="httpRequest"
      :disabled="disabled"
    >
      <!-- 卡片样式触发区 -->
      <template v-if="listType === 'picture-card'">
        <el-icon><Plus /></el-icon>
      </template>

      <!-- 按钮样式触发区 -->
      <template v-if="listType !== 'picture-card'" #trigger>
        <el-button type="primary" :icon="Upload" :disabled="disabled">
          {{ buttonText }}
        </el-button>
      </template>

      <!-- 提示文字 -->
      <template v-if="tip && listType !== 'picture-card'" #tip>
        <div class="uploader-tip">{{ tip }}</div>
      </template>
    </el-upload>

    <!-- 图片预览 -->
    <el-image-viewer
      v-if="previewVisible && previewUrl"
      :url-list="[previewUrl]"
      @close="previewVisible = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { UploadFilled, Plus, Upload } from '@element-plus/icons-vue'
import type { UploadInstance, UploadProps, UploadFile, UploadFiles, UploadRequestOptions } from 'element-plus'

type ListType = 'text' | 'picture' | 'picture-card'

interface UploaderProps {
  /** 上传地址（不传则使用 httpRequest 自定义上传） */
  action?: string
  /** 请求头 */
  headers?: Record<string, string>
  /** 额外数据 */
  data?: Record<string, any>
  /** 文件字段名 */
  name?: string
  /** 接受的文件类型 */
  accept?: string
  /** 是否多选 */
  multiple?: boolean
  /** 最大上传数量 */
  limit?: number
  /** 最大文件大小（MB） */
  maxSize?: number
  /** 允许的文件扩展名（不含点） */
  allowedExts?: string[]
  /** 是否自动上传 */
  autoUpload?: boolean
  /** 是否拖拽模式 */
  drag?: boolean
  /** 列表样式 */
  listType?: ListType
  /** 按钮文字 */
  buttonText?: string
  /** 提示文字 */
  tip?: string
  /** 是否禁用 */
  disabled?: boolean
  /** v-model 绑定的文件列表 */
  modelValue?: UploadFile[]
}

const props = withDefaults(defineProps<UploaderProps>(), {
  action: '#',
  name: 'file',
  multiple: false,
  limit: 5,
  maxSize: 10,
  autoUpload: true,
  drag: false,
  listType: 'text',
  buttonText: '点击上传',
  disabled: false,
  modelValue: () => [],
})

const emit = defineEmits<{
  (e: 'update:modelValue', files: UploadFile[]): void
  (e: 'success', file: UploadFile, response: any): void
  (e: 'error', file: UploadFile, err: any): void
  (e: 'progress', file: UploadFile, percent: number): void
  (e: 'exceed', files: File[]): void
  (e: 'remove', file: UploadFile): void
  (e: 'change', file: UploadFile, fileList: UploadFiles): void
}>()

const uploadRef = ref<UploadInstance>()
const fileList = ref<UploadFile[]>([...props.modelValue])
const previewVisible = ref(false)
const previewUrl = ref('')

// 同步外部 modelValue 变化
watch(
  () => props.modelValue,
  (val) => {
    fileList.value = [...val]
  }
)

// 同步内部 fileList 变化到外部
function syncModelValue() {
  emit('update:modelValue', [...fileList.value])
}

/** 获取文件扩展名 */
function getExt(file: File): string {
  const name = file.name || ''
  const dot = name.lastIndexOf('.')
  return dot > -1 ? name.slice(dot + 1).toLowerCase() : ''
}

/** 格式化文件大小 */
function formatSize(size: number): string {
  if (size < 1024) return `${size}B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)}KB`
  return `${(size / 1024 / 1024).toFixed(1)}MB`
}

/** 上传前校验 */
const handleBeforeUpload: UploadProps['beforeUpload'] = (rawFile: File) => {
  // 大小校验
  if (props.maxSize > 0) {
    const sizeMB = rawFile.size / 1024 / 1024
    if (sizeMB > props.maxSize) {
      ElMessage.error(`文件大小不能超过 ${props.maxSize}MB（当前 ${formatSize(rawFile.size)}）`)
      return false
    }
  }

  // 扩展名校验
  if (props.allowedExts && props.allowedExts.length > 0) {
    const ext = getExt(rawFile)
    if (!props.allowedExts.includes(ext)) {
      ElMessage.error(`不支持的文件格式 .${ext}，仅支持：${props.allowedExts.map((e) => '.' + e).join('、')}`)
      return false
    }
  }

  return true
}

/** 自定义上传（mock 模式） */
function httpRequest(options: UploadRequestOptions): XMLHttpRequest {
  const { file, onProgress, onSuccess, onError } = options

  // 如果 action 是 '#'，使用 mock 模拟上传
  if (props.action === '#' || !props.action) {
    const xhr = new XMLHttpRequest()
    let progress = 0
    const timer = setInterval(() => {
      progress += Math.random() * 30
      if (progress >= 100) {
        progress = 100
        clearInterval(timer)
        const response = {
          code: 200,
          message: 'success',
          data: {
            url: URL.createObjectURL(file),
            name: file.name,
            size: file.size,
          },
        }
        onSuccess(response)
      }
      onProgress({ percent: Math.round(progress) } as any)
    }, 200)
    return xhr
  }

  // 真实上传
  const formData = new FormData()
  formData.append(props.name, file)
  if (props.data) {
    Object.entries(props.data).forEach(([key, val]) => {
      formData.append(key, String(val))
    })
  }

  const xhr = new XMLHttpRequest()
  xhr.upload.addEventListener('progress', (e) => {
    if (e.lengthComputable) {
      onProgress({ percent: Math.round((e.loaded / e.total) * 100) } as any)
    }
  })
  xhr.addEventListener('load', () => {
    try {
      const response = JSON.parse(xhr.responseText)
      onSuccess(response)
    } catch {
      onSuccess(xhr.responseText)
    }
  })
  xhr.addEventListener('error', () => {
    onError(new Error('上传失败') as any)
  })
  xhr.open('POST', props.action)

  // 添加 headers
  if (props.headers) {
    Object.entries(props.headers).forEach(([key, val]) => {
      xhr.setRequestHeader(key, val)
    })
  }

  xhr.send(formData)
  return xhr
}

/** 上传成功 */
const handleSuccess: UploadProps['onSuccess'] = (response, file, files) => {
  fileList.value = files
  syncModelValue()
  emit('success', file, response)
  ElMessage.success(`${file.name} 上传成功`)
}

/** 上传失败 */
const handleError: UploadProps['onError'] = (err, file, files) => {
  fileList.value = files
  syncModelValue()
  emit('error', file, err)
  ElMessage.error(`${file.name} 上传失败`)
}

/** 上传进度 */
const handleProgress: UploadProps['onProgress'] = (event, file) => {
  emit('progress', file, Math.round(event.percent))
}

/** 超出数量限制 */
const handleExceed: UploadProps['onExceed'] = (files) => {
  ElMessage.warning(`最多只能上传 ${props.limit} 个文件`)
  emit('exceed', files)
}

/** 文件变化 */
const handleChange: UploadProps['onChange'] = (file, files) => {
  fileList.value = files
  syncModelValue()
  emit('change', file, files)
}

/** 文件移除 */
const handleRemove: UploadProps['onRemove'] = (file, files) => {
  fileList.value = files
  syncModelValue()
  emit('remove', file)
}

/** 文件预览 */
const handlePreview: UploadProps['onPreview'] = (file) => {
  // 图片预览
  if (file.url || (file.raw as any)) {
    previewUrl.value = file.url || URL.createObjectURL(file.raw!)
    previewVisible.value = true
  }
}

/** 清空文件列表 */
function clear() {
  uploadRef.value?.clearFiles()
  fileList.value = []
  syncModelValue()
}

/** 手动上传 */
function submit() {
  uploadRef.value?.submit()
}

/** 中止上传 */
function abort() {
  uploadRef.value?.abort()
}

// 暴露方法
defineExpose({
  clear,
  submit,
  abort,
})
</script>

<style scoped lang="scss">
.uploader-wrap {
  display: inline-block;
  width: 100%;

  .uploader-drag {
    width: 100%;

    :deep(.el-upload-dragger) {
      width: 100%;
      padding: 32px 20px;
      border-radius: 8px;
      transition: border-color 0.2s;

      &:hover {
        border-color: var(--el-color-primary);
      }
    }

    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }

    &__icon {
      font-size: 48px;
      color: var(--el-text-color-placeholder);
    }

    &__text {
      font-size: 14px;
      color: var(--el-text-color-regular);

      em {
        color: var(--el-color-primary);
        font-style: normal;
      }
    }

    &__tip {
      font-size: 12px;
      color: var(--el-text-color-placeholder);
    }
  }

  .uploader-tip {
    font-size: 12px;
    color: var(--el-text-color-placeholder);
    margin-top: 8px;
  }

  // picture-card 样式优化
  :deep(.el-upload--picture-card) {
    width: 120px;
    height: 120px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :deep(.el-upload-list--picture-card) {
    .el-upload-list__item {
      width: 120px;
      height: 120px;
      border-radius: 8px;
    }
  }
}
</style>
