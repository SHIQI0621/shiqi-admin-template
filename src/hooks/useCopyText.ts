import { ref } from 'vue'
import { ElMessage } from 'element-plus'

export interface CopyTextOptions {
  text: string
  showMessage?: boolean
  message?: string
}

export function useCopyText(options: CopyTextOptions) {
  const copied = ref(false)

  async function copy(text?: string) {
    const copyText = text || options.text
    try {
      await navigator.clipboard.writeText(copyText)
      copied.value = true

      if (options.showMessage !== false) {
        ElMessage.success(options.message || '复制成功')
      }

      setTimeout(() => {
        copied.value = false
      }, 2000)

      return true
    } catch (err) {
      console.error('复制失败:', err)
      ElMessage.error('复制失败')
      return false
    }
  }

  async function copyToClipboard(text?: string) {
    const copyText = text || options.text
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(copyText)
        return true
      } else {
        const textarea = document.createElement('textarea')
        textarea.value = copyText
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.select()
        document.execCommand('copy')
        document.body.removeChild(textarea)
        return true
      }
    } catch (err) {
      console.error('复制失败:', err)
      return false
    }
  }

  return {
    copied,
    copy,
    copyToClipboard,
  }
}
