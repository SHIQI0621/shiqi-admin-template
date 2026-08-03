import { ref, onBeforeUnmount } from 'vue'
import JsBarcode from 'jsbarcode'

/** 条形码格式类型 */
export type BarcodeFormat =
  | 'CODE39'
  | 'CODE128'
  | 'CODE128A'
  | 'CODE128B'
  | 'CODE128C'
  | 'EAN13'
  | 'EAN8'
  | 'EAN5'
  | 'EAN2'
  | 'UPC'
  | 'ITF14'
  | 'ITF'
  | 'MSI'
  | 'MSI10'
  | 'MSI11'
  | 'MSI1010'
  | 'MSI1110'
  | 'pharmacode'
  | 'codabar'
  | 'CODE93'

/** 条形码文字位置 */
export type BarcodeTextPosition = 'top' | 'bottom'

/** 条形码文字对齐 */
export type BarcodeTextAlign = 'left' | 'center' | 'right'

/** 条形码配置项 */
export interface BarcodeOptions {
  /** 要编码的内容 */
  text: string
  /** 条形码格式 */
  format?: BarcodeFormat
  /** 条宽（px） */
  width?: number
  /** 条高度（px） */
  height?: number
  /** 是否显示文字 */
  displayValue?: boolean
  /** 字体附加样式（如 bold, italic） */
  fontOptions?: string
  /** 字体 */
  font?: string
  /** 自定义显示文字（覆盖原始内容） */
  textLabel?: string
  /** 文字对齐方式 */
  textAlign?: BarcodeTextAlign
  /** 文字位置 */
  textPosition?: BarcodeTextPosition
  /** 文字与条码的间距（px） */
  textMargin?: number
  /** 字体大小（px） */
  fontSize?: number
  /** 背景色 */
  background?: string
  /** 条码颜色 */
  lineColor?: string
  /** 整体外边距（px） */
  margin?: number
  /** 上边距 */
  marginTop?: number
  /** 下边距 */
  marginBottom?: number
  /** 左边距 */
  marginLeft?: number
  /** 右边距 */
  marginRight?: number
}

/** 条形码默认配置 */
const DEFAULT_OPTIONS: Required<Pick<BarcodeOptions, 'format' | 'width' | 'height' | 'displayValue' | 'textAlign' | 'textPosition' | 'textMargin' | 'fontSize' | 'background' | 'lineColor' | 'margin'>> = {
  format: 'CODE128',
  width: 2,
  height: 100,
  displayValue: true,
  textAlign: 'center',
  textPosition: 'bottom',
  textMargin: 2,
  fontSize: 20,
  background: '#ffffff',
  lineColor: '#000000',
  margin: 10,
}

/**
 * 条形码生成 Hook（基于 JsBarcode）
 *
 * @example
 * ```ts
 * const { generate, toDataURL, download, isValid } = useBarcode()
 *
 * // 在 canvas 上生成
 * generate(canvasEl, { text: 'HELLO', format: 'CODE39' })
 *
 * // 下载为 PNG
 * download('barcode.png')
 * ```
 */
export function useBarcode() {
  const isValid = ref(false)
  const dataUrl = ref<string>('')
  let targetElement: HTMLElement | SVGElement | null = null
  let lastOptions: BarcodeOptions | null = null

  /** 生成条形码 */
  function generate(
    element: HTMLElement | SVGElement | string,
    options: BarcodeOptions
  ): void {
    // 解析元素
    let el: HTMLElement | SVGElement | null
    if (typeof element === 'string') {
      el = document.getElementById(element) as HTMLElement | null
    } else {
      el = element
    }

    if (!el) {
      console.error('[useBarcode] Target element not found')
      return
    }

    targetElement = el
    lastOptions = options

    // 合并配置
    const config: JsBarcode.BaseOptions = {
      format: options.format ?? DEFAULT_OPTIONS.format,
      width: options.width ?? DEFAULT_OPTIONS.width,
      height: options.height ?? DEFAULT_OPTIONS.height,
      displayValue: options.displayValue ?? DEFAULT_OPTIONS.displayValue,
      textAlign: options.textAlign ?? DEFAULT_OPTIONS.textAlign,
      textPosition: options.textPosition ?? DEFAULT_OPTIONS.textPosition,
      textMargin: options.textMargin ?? DEFAULT_OPTIONS.textMargin,
      fontSize: options.fontSize ?? DEFAULT_OPTIONS.fontSize,
      background: options.background ?? DEFAULT_OPTIONS.background,
      lineColor: options.lineColor ?? DEFAULT_OPTIONS.lineColor,
      margin: options.margin ?? DEFAULT_OPTIONS.margin,
    }

    // 可选参数
    if (options.fontOptions) config.fontOptions = options.fontOptions
    if (options.font) config.font = options.font
    if (options.textLabel !== undefined) config.text = options.textLabel
    if (options.marginTop !== undefined) config.marginTop = options.marginTop
    if (options.marginBottom !== undefined) config.marginBottom = options.marginBottom
    if (options.marginLeft !== undefined) config.marginLeft = options.marginLeft
    if (options.marginRight !== undefined) config.marginRight = options.marginRight

    // 验证回调
    config.valid = (valid: boolean) => {
      isValid.value = valid
    }

    try {
      JsBarcode(el, options.text, config)
      // 生成 dataURL（仅 canvas 支持）
      if (el instanceof HTMLCanvasElement) {
        dataUrl.value = el.toDataURL('image/png')
      }
    } catch (err) {
      console.error('[useBarcode] Generation failed:', err)
      isValid.value = false
    }
  }

  /** 重新生成（使用上次配置） */
  function regenerate(): void {
    if (targetElement && lastOptions) {
      generate(targetElement, lastOptions)
    }
  }

  /** 获取 DataURL（仅 canvas 类型可用） */
  function toDataURL(type: string = 'image/png', quality?: number): string {
    if (targetElement instanceof HTMLCanvasElement) {
      return targetElement.toDataURL(type, quality)
    }
    return ''
  }

  /** 下载条形码为图片 */
  function download(filename: string = 'barcode.png'): void {
    let url = ''
    let needRevoke = false

    if (targetElement instanceof HTMLCanvasElement) {
      url = targetElement.toDataURL('image/png')
    } else if (targetElement instanceof SVGSVGElement) {
      // SVG 转 Canvas 再下载
      const svgData = new XMLSerializer().serializeToString(targetElement)
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
      url = URL.createObjectURL(svgBlob)
      needRevoke = true
    }

    if (!url) {
      console.error('[useBarcode] Download not supported for this element type')
      return
    }

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    if (needRevoke) {
      setTimeout(() => URL.revokeObjectURL(url), 1000)
    }
  }

  /** 清空条形码 */
  function clear(): void {
    if (targetElement instanceof HTMLCanvasElement) {
      const ctx = targetElement.getContext('2d')
      if (ctx) {
        ctx.clearRect(0, 0, targetElement.width, targetElement.height)
      }
    } else if (targetElement instanceof SVGSVGElement) {
      targetElement.innerHTML = ''
    }
    isValid.value = false
    dataUrl.value = ''
  }

  onBeforeUnmount(() => {
    clear()
    targetElement = null
    lastOptions = null
  })

  return {
    isValid,
    dataUrl,
    generate,
    regenerate,
    toDataURL,
    download,
    clear,
  }
}
