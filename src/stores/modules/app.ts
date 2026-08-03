import { defineStore } from 'pinia'
import { ref, onMounted, onUnmounted } from 'vue'
import zhCnElement from 'element-plus/es/locale/lang/zh-cn'
import enElement from 'element-plus/es/locale/lang/en'

type ElementSize = '' | 'default' | 'small' | 'large'

export const useAppStore = defineStore('app', () => {
  const elementSize = ref<ElementSize>((localStorage.getItem('elementSize') as ElementSize) || 'default')

  const savedLocale = localStorage.getItem('locale') || 'zh-CN'
  const elementLocale = ref(savedLocale === 'en' ? enElement : zhCnElement)

  const isFullscreen = ref(false)

  const isLocked = ref(false)

  /**
   * 锁屏
   */
  function lockScreen() {
    isLocked.value = true
  }

  /**
   * 解锁
   */
  function unlockScreen() {
    isLocked.value = false
  }

  /**
   * 设置语言
   * @param lang 语言
   */
  function setLocale(lang: string) {
    localStorage.setItem('locale', lang)
    elementLocale.value = lang === 'en' ? enElement : zhCnElement
  }

  /**
   * 设置元素大小
   * @param size 元素大小
   */
  function setElementSize(size: ElementSize) {
    elementSize.value = size
    localStorage.setItem('elementSize', size)
    document.documentElement.style.setProperty('--el-size', size)
  }

  /**
   * 切换全屏状态
   */
  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  /**
   * 全屏状态变化监听
   */
  function handleFullscreenChange() {
    isFullscreen.value = !!document.fullscreenElement
  }

  onMounted(() => {
    document.addEventListener('fullscreenchange', handleFullscreenChange)
  })

  onUnmounted(() => {
    document.removeEventListener('fullscreenchange', handleFullscreenChange)
  })

  document.documentElement.style.setProperty('--el-size', elementSize.value || 'default')

  return {
    elementSize,
    elementLocale,
    isFullscreen,
    isLocked,
    setLocale,
    setElementSize,
    toggleFullscreen,
    lockScreen,
    unlockScreen,
  }
})