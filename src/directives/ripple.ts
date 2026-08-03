import type { Directive, DirectiveBinding } from 'vue'

interface RippleOptions {
  color?: string
  duration?: number
  easing?: string
}

const defaultOptions: RippleOptions = {
  color: 'rgba(0, 0, 0, 0.15)',
  duration: 800,
  easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
}

const ripple: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options = { ...defaultOptions, ...(binding.value || {}) }

    const createRipple = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      // 计算水波纹所需的最大尺寸（确保覆盖整个元素）
      const size = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 1.8

      const ripple = document.createElement('span')
      ripple.style.position = 'absolute'
      ripple.style.borderRadius = '50%'
      ripple.style.background = options.color
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${x - size / 2}px`
      ripple.style.top = `${y - size / 2}px`
      // 从一个小的初始大小开始，而不是从0开始，更自然
      ripple.style.transform = 'scale(0.05)'
      ripple.style.opacity = '0.6'
      ripple.style.pointerEvents = 'none'
      // 使用分开的过渡效果，让缩放和透明度有不同的动画曲线
      ripple.style.transition = `transform ${options.duration}ms ${options.easing}`
      ripple.style.willChange = 'transform, opacity'

      // 确保元素是相对定位
      if (window.getComputedStyle(el).position === 'static') {
        el.style.position = 'relative'
      }

      // 确保元素设置了 overflow: hidden，防止水波纹超出边界
      if (window.getComputedStyle(el).overflow !== 'hidden') {
        el.style.overflow = 'hidden'
      }

      el.appendChild(ripple)

      // 触发动画
      requestAnimationFrame(() => {
        // 使用scale(1.2)让水波纹稍微超出元素边界，更符合真实水波纹效果
        ripple.style.transform = 'scale(1.2)'
      })

      // 延迟一段时间后开始淡出，让水波纹先扩散再消失
      const fadeDelay = options.duration * 0.4
      setTimeout(() => {
        ripple.style.transition = `opacity ${options.duration * 0.6}ms ease-out`
        ripple.style.opacity = '0'
        setTimeout(() => {
          ripple.remove()
        }, options.duration * 0.6)
      }, fadeDelay)
    }

    el.addEventListener('click', createRipple)
    ;(el as any).__rippleListener__ = createRipple
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    // 更新时移除旧的监听器并重新绑定
    const oldListener = (el as any).__rippleListener__
    if (oldListener) {
      el.removeEventListener('click', oldListener)
    }

    const options = { ...defaultOptions, ...(binding.value || {}) }

    const createRipple = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const size = Math.sqrt(Math.pow(rect.width, 2) + Math.pow(rect.height, 2)) * 1.2

      const ripple = document.createElement('span')
      ripple.style.position = 'absolute'
      ripple.style.borderRadius = '50%'
      ripple.style.background = options.color
      ripple.style.width = `${size}px`
      ripple.style.height = `${size}px`
      ripple.style.left = `${x - size / 2}px`
      ripple.style.top = `${y - size / 2}px`
      ripple.style.transform = 'scale(0.05)'
      ripple.style.opacity = '0.6'
      ripple.style.pointerEvents = 'none'
      ripple.style.transition = `transform ${options.duration}ms ${options.easing}`
      ripple.style.willChange = 'transform, opacity'

      if (window.getComputedStyle(el).position === 'static') {
        el.style.position = 'relative'
      }

      if (window.getComputedStyle(el).overflow !== 'hidden') {
        el.style.overflow = 'hidden'
      }

      el.appendChild(ripple)

      requestAnimationFrame(() => {
        ripple.style.transform = 'scale(1.2)'
      })

      const fadeDelay = options.duration * 0.4
      setTimeout(() => {
        ripple.style.transition = `opacity ${options.duration * 0.6}ms ease-out`
        ripple.style.opacity = '0'
        setTimeout(() => {
          ripple.remove()
        }, options.duration * 0.6)
      }, fadeDelay)
    }

    el.addEventListener('click', createRipple)
    ;(el as any).__rippleListener__ = createRipple
  },

  unmounted(el: HTMLElement) {
    const listener = (el as any).__rippleListener__
    if (listener) {
      el.removeEventListener('click', listener)
      delete (el as any).__rippleListener__
    }
  },
}

export default ripple
