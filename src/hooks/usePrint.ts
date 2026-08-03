import { ref, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'

export interface PrintOptions {
  /** 要打印的元素选择器、HTMLElement 或 ref */
  target?: string | HTMLElement | null
  /** 自定义打印 CSS（字符串） */
  css?: string
  /** 额外引入的样式表 URL 列表 */
  stylesheets?: string[]
  /** 打印文档标题 */
  title?: string
  /** 打印前回调 */
  beforePrint?: () => void | Promise<void>
  /** 打印后回调 */
  afterPrint?: () => void | Promise<void>
  /** 是否在打印完成后自动清理 iframe（默认 true） */
  autoCleanup?: boolean
}

/**
 * 打印页面内容的 Hook
 *
 * 支持：
 * - 通过选择器或 DOM 元素指定打印区域
 * - 自定义打印样式（CSS 字符串 / 外部样式表）
 * - 打印前后回调
 * - iframe 隔离打印（不影响原页面布局）
 *
 * @example
 * ```ts
 * const { print, printing } = usePrint()
 *
 * // 打印指定元素
 * function handlePrint() {
 *   print({
 *     target: '#print-area',
 *     title: '订单详情',
 *     css: '@page { size: A4; margin: 20mm } .no-print { display: none }',
 *   })
 * }
 * ```
 */
export function usePrint(defaultOptions?: PrintOptions) {
  const printing = ref(false)
  let iframe: HTMLIFrameElement | null = null

  function getTargetEl(target?: string | HTMLElement | null): HTMLElement | null {
    const t = target || defaultOptions?.target
    if (!t) return null
    if (typeof t === 'string') {
      return document.querySelector(t)
    }
    return t
  }

  function collectStyles(el: HTMLElement): string {
    // 收集元素及其子元素所用的 computed style，生成内联样式
    const styles: string[] = []
    const allEls = [el, ...el.querySelectorAll('*')] as HTMLElement[]

    for (const node of allEls) {
      const computed = window.getComputedStyle(node)
      let inline = ''
      for (let i = 0; i < computed.length; i++) {
        const prop = computed[i]
        const val = computed.getPropertyValue(prop)
        // 跳过不影响视觉的属性
        if (['visibility', 'display', 'opacity'].includes(prop)) continue
        inline += `${prop}:${val};`
      }
      if (inline) {
        const tag = node.tagName.toLowerCase()
        const cls = node.className && typeof node.className === 'string'
          ? '.' + node.className.trim().split(/\s+/).join('.')
          : ''
        styles.push(`${tag}${cls}{${inline}}`)
      }
    }

    return styles.join('\n')
  }

  function buildPrintHTML(el: HTMLElement, options: PrintOptions): string {
    const stylesheets = (options.stylesheets || defaultOptions?.stylesheets || [])
      .map(url => `<link rel="stylesheet" href="${url}">`)
      .join('\n')

    const customCss = options.css || defaultOptions?.css || ''
    const title = options.title || defaultOptions?.title || document.title

    // 收集页面上所有 <style> 和 <link rel="stylesheet"> 以保留样式
    const pageStyles: string[] = []
    document.querySelectorAll('style').forEach(node => {
      pageStyles.push(node.innerHTML)
    })

    // 收集元素自身的 computed style（兜底）
    const inlineStyles = collectStyles(el)

    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  ${stylesheets}
  <style>
    ${pageStyles.join('\n')}
    ${inlineStyles}
    ${customCss}
    @media print {
      body { margin: 0; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  ${el.outerHTML}
</body>
</html>`
  }

  function cleanupIframe() {
    if (iframe) {
      iframe.remove()
      iframe = null
    }
  }

  async function print(options?: PrintOptions): Promise<void> {
    if (printing.value) return

    const mergedOptions = { ...defaultOptions, ...options }
    const el = getTargetEl(mergedOptions.target)

    if (!el) {
      ElMessage.warning('未找到打印目标元素')
      return
    }

    printing.value = true

    try {
      // 打印前回调
      if (mergedOptions.beforePrint) {
        await mergedOptions.beforePrint()
      }

      // 创建隐藏 iframe
      cleanupIframe()
      iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.top = '-9999px'
      iframe.style.left = '-9999px'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = 'none'
      iframe.style.visibility = 'hidden'
      document.body.appendChild(iframe)

      const doc = iframe.contentWindow?.document
      if (!doc) {
        ElMessage.error('无法创建打印窗口')
        return
      }

      // 写入打印内容
      const html = buildPrintHTML(el, mergedOptions)
      doc.open()
      doc.write(html)
      doc.close()

      // 等待 iframe 内容和样式加载
      await new Promise<void>((resolve) => {
        const iframeWindow = iframe!.contentWindow
        if (!iframeWindow) {
          resolve()
          return
        }

        // 监听打印完成事件
        const afterPrintHandler = async () => {
          iframeWindow.removeEventListener('afterprint', afterPrintHandler)
          if (mergedOptions.afterPrint) {
            await mergedOptions.afterPrint()
          }
          if (mergedOptions.autoCleanup !== false) {
            setTimeout(cleanupIframe, 500)
          }
        }
        iframeWindow.addEventListener('afterprint', afterPrintHandler)

        // 兜底：如果 afterprint 不触发，5 秒后自动清理
        setTimeout(() => {
          if (iframe) {
            resolve()
            if (mergedOptions.autoCleanup !== false) {
              cleanupIframe()
            }
          }
        }, 5000)

        // 等待图片等资源加载
        const checkReady = () => {
          if (iframeWindow.document.readyState === 'complete') {
            resolve()
            // 延迟一点确保样式生效
            setTimeout(() => {
              try {
                iframe!.contentWindow?.focus()
                iframe!.contentWindow?.print()
              } catch (e) {
                console.error('打印失败:', e)
                ElMessage.error('打印失败')
              }
            }, 100)
          } else {
            setTimeout(checkReady, 50)
          }
        }
        checkReady()
      })
    } catch (err) {
      console.error('打印出错:', err)
      ElMessage.error('打印出错')
    } finally {
      printing.value = false
    }
  }

  /** 仅打印给定元素的 HTML（快速模式，不收集 computed style） */
  async function printHTML(html: string, options?: PrintOptions): Promise<void> {
    if (printing.value) return

    printing.value = true

    try {
      const mergedOptions = { ...defaultOptions, ...options }

      if (mergedOptions.beforePrint) {
        await mergedOptions.beforePrint()
      }

      cleanupIframe()
      iframe = document.createElement('iframe')
      iframe.style.position = 'fixed'
      iframe.style.top = '-9999px'
      iframe.style.left = '-9999px'
      iframe.style.width = '0'
      iframe.style.height = '0'
      iframe.style.border = 'none'
      iframe.style.visibility = 'hidden'
      document.body.appendChild(iframe)

      const doc = iframe.contentWindow?.document
      if (!doc) return

      const stylesheets = (mergedOptions.stylesheets || [])
        .map(url => `<link rel="stylesheet" href="${url}">`)
        .join('\n')
      const customCss = mergedOptions.css || ''
      const title = mergedOptions.title || document.title

      doc.open()
      doc.write(`<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><title>${title}</title>${stylesheets}<style>${customCss}@media print{body{margin:0}.no-print{display:none!important}}</style></head><body>${html}</body></html>`)
      doc.close()

      await new Promise<void>((resolve) => {
        const iframeWindow = iframe!.contentWindow
        if (!iframeWindow) { resolve(); return }

        const afterPrintHandler = async () => {
          iframeWindow.removeEventListener('afterprint', afterPrintHandler)
          if (mergedOptions.afterPrint) await mergedOptions.afterPrint()
          if (mergedOptions.autoCleanup !== false) setTimeout(cleanupIframe, 500)
        }
        iframeWindow.addEventListener('afterprint', afterPrintHandler)

        const checkReady = () => {
          if (iframeWindow.document.readyState === 'complete') {
            resolve()
            setTimeout(() => {
              try {
                iframe!.contentWindow?.focus()
                iframe!.contentWindow?.print()
              } catch (e) {
                console.error('打印失败:', e)
              }
            }, 100)
          } else {
            setTimeout(checkReady, 50)
          }
        }
        checkReady()
      })
    } catch (err) {
      console.error('打印出错:', err)
      ElMessage.error('打印出错')
    } finally {
      printing.value = false
    }
  }

  onUnmounted(() => {
    cleanupIframe()
  })

  return {
    printing,
    print,
    printHTML,
  }
}
