import type { Directive, DirectiveBinding } from 'vue'

/** v-ellipsis 指令配置项 */
interface EllipsisOptions {
  /** 截断行数，1 = 单行省略，>1 = 多行省略 */
  lines?: number
  /** 是否支持点击展开/收起 */
  expandable?: boolean
  /** 展开按钮文字 */
  expandText?: string
  /** 收起按钮文字 */
  collapseText?: string
  /** 截断时是否显示原生 title 提示 */
  tooltip?: boolean
  /** 限定的最大宽度（CSS 值，如 '200px' / '100%'） */
  width?: string
}

const defaults: Required<EllipsisOptions> = {
  lines: 1,
  expandable: false,
  expandText: '展开',
  collapseText: '收起',
  tooltip: true,
  width: '',
}

/** 全局 CSS 注入（只注入一次） */
let cssInjected = false

function injectStyles() {
  if (cssInjected) return
  cssInjected = true
  const style = document.createElement('style')
  style.id = 'v-ellipsis-styles'
  style.textContent = `
/* 单行省略 */
.v-ellipsis-1 {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

/* 多行省略（通过 CSS 变量 --ellipsis-lines 控制行数） */
.v-ellipsis-multi {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: var(--ellipsis-lines, 1);
  overflow: hidden;
  word-break: break-all;
  min-width: 0;
  max-width: 100%;
  box-sizing: border-box;
}

/* 展开状态 */
.v-ellipsis-expanded {
  -webkit-line-clamp: unset !important;
  white-space: normal !important;
  overflow: visible !important;
}

/* 展开/收起按钮 */
.v-ellipsis-toggle {
  color: var(--el-color-primary, #409eff);
  cursor: pointer;
  margin-left: 4px;
  user-select: none;
  white-space: nowrap;
  flex-shrink: 0;
}
.v-ellipsis-toggle:hover {
  text-decoration: underline;
}
`
  document.head.appendChild(style)
}

/** 解析 binding.value 为配置项 */
function parseOptions(binding: DirectiveBinding): Required<EllipsisOptions> {
  const val = binding.value
  if (val == null || typeof val === 'number') {
    return { ...defaults, lines: (val as number) ?? 1 }
  }
  if (typeof val === 'object') {
    return { ...defaults, ...val }
  }
  return defaults
}

/** 检测元素内容是否溢出（被截断） */
function isOverflowing(el: HTMLElement): boolean {
  return el.scrollWidth > el.clientWidth || el.scrollHeight > el.clientHeight
}

/** 应用截断样式 */
function applyEllipsis(el: HTMLElement, options: Required<EllipsisOptions>, expanded: boolean) {
  // 清除旧状态
  el.classList.remove('v-ellipsis-1', 'v-ellipsis-multi', 'v-ellipsis-expanded')

  // 设置宽度
  if (options.width) {
    el.style.maxWidth = options.width
  }

  // 展开状态
  if (expanded) {
    el.classList.add('v-ellipsis-expanded')
    return
  }

  // 单行
  if (options.lines <= 1) {
    el.classList.add('v-ellipsis-1')
  } else {
    // 多行
    el.classList.add('v-ellipsis-multi')
    el.style.setProperty('--ellipsis-lines', String(options.lines))
  }

  // tooltip
  if (options.tooltip) {
    if (isOverflowing(el)) {
      el.setAttribute('title', el.textContent || '')
    } else {
      el.removeAttribute('title')
    }
  }
}

/** 移除展开按钮 */
function removeToggle(el: HTMLElement) {
  const toggle = (el as any).__ellipsisToggle__ as HTMLElement | undefined
  if (toggle && toggle.parentNode) {
    toggle.parentNode.removeChild(toggle)
  }
  ;(el as any).__ellipsisToggle__ = null
}

/** 创建展开/收起按钮 */
function createToggle(el: HTMLElement, options: Required<EllipsisOptions>, expanded: boolean) {
  removeToggle(el)

  if (!options.expandable) return
  if (!isOverflowing(el) && !expanded) return

  const toggle = document.createElement('span')
  toggle.className = 'v-ellipsis-toggle'
  toggle.textContent = expanded ? options.collapseText : options.expandText

  toggle.addEventListener('click', (e: Event) => {
    e.stopPropagation()
    e.preventDefault()
    const newState = !(el as any).__ellipsisExpanded__
    ;(el as any).__ellipsisExpanded__ = newState
    applyEllipsis(el, options, newState)
    toggle.textContent = newState ? options.collapseText : options.expandText
  })

  // 将按钮插入到元素后面（同级）
  if (el.parentNode) {
    el.parentNode.insertBefore(toggle, el.nextSibling)
  }
  ;(el as any).__ellipsisToggle__ = toggle
}

const ellipsis: Directive<HTMLElement> = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    injectStyles()
    const options = parseOptions(binding)
    ;(el as any).__ellipsisOptions__ = options
    ;(el as any).__ellipsisExpanded__ = false

    // 延迟一帧确保 DOM 渲染完成后再检测溢出
    requestAnimationFrame(() => {
      applyEllipsis(el, options, false)
      createToggle(el, options, false)
    })
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    const options = parseOptions(binding)
    ;(el as any).__ellipsisOptions__ = options

    const expanded = (el as any).__ellipsisExpanded__ || false
    requestAnimationFrame(() => {
      applyEllipsis(el, options, expanded)
      createToggle(el, options, expanded)
    })
  },

  unmounted(el: HTMLElement) {
    removeToggle(el)
    el.removeAttribute('title')
    el.classList.remove('v-ellipsis-1', 'v-ellipsis-multi', 'v-ellipsis-expanded')
    el.style.removeProperty('--ellipsis-lines')
  },
}

export default ellipsis
