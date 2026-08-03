import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { ThemeConfig } from '@/types'
import { getCache, setCache, CacheKeys } from '@/utils/cache'
import { APP_TITLE } from '@/setting'

export const useThemeStore = defineStore('theme', () => {
  const storedTheme = getCache<ThemeConfig>(CacheKeys.THEME)
  const themeConfig = ref<ThemeConfig>(storedTheme || {
    primaryColor: '#6952f5',
    isGrey: false,
    sidebarTheme: 'light',
    showWatermark: false,
    watermarkText: APP_TITLE,
    watermarkOpacity: 0.15,
    watermarkFontSize: 18,
  })

  watch(themeConfig, (newVal) => {
    setCache(CacheKeys.THEME, newVal)
    applyTheme(newVal)
  }, { deep: true })

  /**
   * 应用主题配置
   * @param config 主题配置
   */
  function applyTheme(config: ThemeConfig) {
    const root = document.documentElement

    root.style.setProperty('--el-color-primary', config.primaryColor)

    // 设置 RGB 变量，方便使用 rgba() 透明度
    const rgbValues = hexToRgbString(config.primaryColor)
    if (rgbValues) {
      root.style.setProperty('--el-color-primary-rgb', rgbValues)
    }

    const colors = generateColorPalette(config.primaryColor)
    Object.entries(colors).forEach(([key, value]) => {
      root.style.setProperty(`--el-color-primary-${key}`, value)
    })

    if (config.isGrey) {
      root.classList.add('grey-mode')
      document.body.style.filter = 'grayscale(100%)'
    } else {
      root.classList.remove('grey-mode')
      document.body.style.filter = ''
    }
  }

  /**
   * 将十六进制颜色转换为 RGB 值字符串
   * @param hex 十六进制颜色
   * @returns RGB 值字符串 (如 "105, 82, 245")
   */
  function hexToRgbString(hex: string): string | null {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return null
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
  }

  /**
   * 生成颜色调色板
   * @param primary 主色
   * @returns 颜色调色板
   */
  function generateColorPalette(primary: string): Record<string, string> {
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      } : null
    }

    const rgb = hexToRgb(primary)
    if (!rgb) return {}

    const mix = (color1: number[], color2: number[], weight: number) => {
      return color1.map((c, i) => Math.round(c * weight + color2[i] * (1 - weight)))
    }

    const white = [255, 255, 255]
    const black = [0, 0, 0]
    const base = [rgb.r, rgb.g, rgb.b]

    return {
      'light-3': `rgb(${mix(base, white, 0.85).join(',')})`,
      'light-5': `rgb(${mix(base, white, 0.7).join(',')})`,
      'light-7': `rgb(${mix(base, white, 0.55).join(',')})`,
      'light-8': `rgb(${mix(base, white, 0.45).join(',')})`,
      'light-9': `rgb(${mix(base, white, 0.35).join(',')})`,
      'dark-2': `rgb(${mix(base, black, 0.85).join(',')})`,
    }
  }

  /**
   * 设置主色
   * @param color 主色
   */
  function setPrimaryColor(color: string) {
    themeConfig.value.primaryColor = color
  }

  /**
   * 切换灰度模式
   */
  function toggleGrey() {
    themeConfig.value.isGrey = !themeConfig.value.isGrey
  }

  /**
   * 设置侧边栏主题
   * @param theme 侧边栏主题
   */
  function setSidebarTheme(theme: 'black' | 'light' | 'header-color') {
    themeConfig.value.sidebarTheme = theme
  }

  /**
   * 切换水印状态
   */
  function toggleWatermark() {
    themeConfig.value.showWatermark = !themeConfig.value.showWatermark
  }

  /**
   * 设置水印文本
   * @param text 水印文本
   */
  function setWatermarkText(text: string) {
    themeConfig.value.watermarkText = text
  }

  /**
   * 设置水印透明度
   * @param opacity 水印透明度
   */
  function setWatermarkOpacity(opacity: number) {
    themeConfig.value.watermarkOpacity = opacity
  }

  /**
   * 设置水印字体大小
   * @param fontSize 水印字体大小
   */
  function setWatermarkFontSize(fontSize: number) {
    themeConfig.value.watermarkFontSize = fontSize
  }

  applyTheme(themeConfig.value)

  return {
    themeConfig,
    setPrimaryColor,
    toggleGrey,
    setSidebarTheme,
    toggleWatermark,
    setWatermarkText,
    setWatermarkOpacity,
    setWatermarkFontSize,
  }
})
