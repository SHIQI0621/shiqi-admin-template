<template>
  <div class="rich-editor">
    <Toolbar
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
      style="border-bottom: 1px solid #dcdfe6"
    />
    <Editor
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      style="height: 300px; overflow-y: hidden"
      @onCreated="handleCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import '@wangeditor/editor/dist/css/style.css'
// @ts-ignore 忽略类型声明解析问题，库的 package.json exports 配置导致类型文件无法被正确解析
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import type { IDomEditor, IToolbarConfig, IEditorConfig } from '@wangeditor/editor'

interface Props {
  modelValue: string
  placeholder?: string
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入内容...',
  disabled: false,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const editorRef = ref<IDomEditor | null>(null)
const html = ref(props.modelValue)

const mode = 'default'

// 使用默认工具栏配置，避免 key 名称错误
const toolbarConfig: Partial<IToolbarConfig> = {
  // 不指定 toolbarKeys，使用默认配置
}

const editorConfig: Partial<IEditorConfig> = {
  placeholder: props.placeholder,
  readOnly: props.disabled,
  // 配置上传（图片、视频等）
  MENU_CONF: {
    insertImage: {
      // 自定义上传，这里使用 base64 作为示例
      async customUpload(file: File, insertFn: (url: string, alt?: string, href?: string) => void) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const url = e.target?.result as string
          insertFn(url)
        }
        reader.readAsDataURL(file)
      },
    },
    insertVideo: {
      async customUpload(file: File, insertFn: (url: string, poster?: string) => void) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const url = e.target?.result as string
          insertFn(url)
        }
        reader.readAsDataURL(file)
      },
    },
  },
}

function handleCreated(editor: IDomEditor) {
  editorRef.value = editor
}

function handleChange(editor: IDomEditor) {
  const content = editor.getHtml()
  html.value = content
  emit('update:modelValue', content)
  emit('change', content)
}

// 监听外部传入的 modelValue 变化
watch(
  () => props.modelValue,
  (newValue) => {
    if (editorRef.value && newValue !== html.value) {
      html.value = newValue
    }
  },
  { immediate: true }
)

// 监听 disabled 状态变化
watch(
  () => props.disabled,
  (disabled) => {
    if (editorRef.value) {
      if (disabled) {
        editorRef.value.disable()
      } else {
        editorRef.value.enable()
      }
    }
  }
)

// 点击外部关闭工具栏下拉菜单
function handleClickOutside(e: MouseEvent) {
  const target = e.target as HTMLElement
  const toolbarEle = target.closest('.w-e-toolbar')
  const panelEle = target.closest('.w-e-panel')
  
  if (!toolbarEle && !panelEle) {
    // 点击外部，关闭所有弹出面板
    // 找到所有打开的面板并移除激活状态
    const activePanel = document.querySelector('.w-e-panel.w-e-active')
    if (activePanel) {
      activePanel.classList.remove('w-e-active')
    }
    // 移除工具栏按钮的激活状态
    const activeBtn = document.querySelector('.w-e-toolbar .w-e-active')
    if (activeBtn) {
      activeBtn.classList.remove('w-e-active')
    }
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

// 组件卸载时销毁编辑器
onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  if (editorRef.value) {
    editorRef.value.destroy()
    editorRef.value = null
  }
})
</script>

<style scoped lang="scss">
.rich-editor {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;

  &:focus-within {
    border-color: #409eff;
    box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.2);
  }
}
</style>
