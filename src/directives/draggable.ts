import type { Directive } from 'vue'

interface DraggableOptions {
  boundary?: 'viewport' | 'parent' | HTMLElement
  handle?: string
  disabled?: boolean
  onStart?: (rect: DOMRect) => void
  onMove?: (x: number, y: number) => void
  onEnd?: (x: number, y: number) => void
}

interface DraggableState {
  isDragging: boolean
  startX: number
  startY: number
  startLeft: number
  startTop: number
  maxLeft: number
  maxTop: number
}

const draggable: Directive<HTMLElement, DraggableOptions | undefined> = {
  mounted(el, binding) {
    const options = binding.value || {}
    const state: DraggableState = {
      isDragging: false,
      startX: 0,
      startY: 0,
      startLeft: 0,
      startTop: 0,
      maxLeft: 0,
      maxTop: 0,
    }

    const handleSelector = options.handle
    const handleElement = handleSelector ? el.querySelector(handleSelector) : el
    const targetElement = el

    if (!handleElement) return

    function calculateBounds() {
      const rect = targetElement.getBoundingClientRect()
      const boundary = options.boundary || 'viewport'

      let maxLeft = 0
      let maxTop = 0

      if (boundary === 'viewport') {
        maxLeft = window.innerWidth - rect.width - targetElement.offsetLeft
        maxTop = window.innerHeight - rect.height - targetElement.offsetTop
      } else if (boundary === 'parent') {
        const parent = targetElement.parentElement
        if (parent) {
          const parentRect = parent.getBoundingClientRect()
          maxLeft = parentRect.width - rect.width - targetElement.offsetLeft
          maxTop = parentRect.height - rect.height - targetElement.offsetTop
        }
      } else if (boundary instanceof HTMLElement) {
        const boundaryRect = boundary.getBoundingClientRect()
        maxLeft = boundaryRect.width - rect.width - (targetElement.offsetLeft - boundaryRect.left)
        maxTop = boundaryRect.height - rect.height - (targetElement.offsetTop - boundaryRect.top)
      }

      // 限制最小值不为负
      state.maxLeft = Math.max(0, maxLeft)
      state.maxTop = Math.max(0, maxTop)
    }

    function onMouseDown(e: MouseEvent) {
      if (options.disabled) return
      if (e.button !== 0) return

      state.isDragging = true
      state.startX = e.clientX
      state.startY = e.clientY
      state.startLeft = targetElement.offsetLeft
      state.startTop = targetElement.offsetTop

      calculateBounds()

      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)

      if (options.onStart) {
        options.onStart(targetElement.getBoundingClientRect())
      }

      e.preventDefault()
      e.stopPropagation()
    }

    function onMouseMove(e: MouseEvent) {
      if (!state.isDragging) return

      const deltaX = e.clientX - state.startX
      const deltaY = e.clientY - state.startY

      let newLeft = state.startLeft + deltaX
      let newTop = state.startTop + deltaY

      // 限制在有效区域内
      newLeft = Math.min(Math.max(0, newLeft), state.maxLeft)
      newTop = Math.min(Math.max(0, newTop), state.maxTop)

      targetElement.style.left = `${newLeft}px`
      targetElement.style.top = `${newTop}px`

      if (options.onMove) {
        options.onMove(newLeft, newTop)
      }
    }

    function onMouseUp(e: MouseEvent) {
      if (!state.isDragging) return

      state.isDragging = false
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseup', onMouseUp)

      const rect = targetElement.getBoundingClientRect()
      const deltaX = e.clientX - state.startX
      const deltaY = e.clientY - state.startY
      const finalLeft = state.startLeft + deltaX
      const finalTop = state.startTop + deltaY

      if (options.onEnd) {
        options.onEnd(finalLeft, finalTop)
      }

      void rect
    }

    // 触屏支持
    function onTouchStart(e: TouchEvent) {
      if (options.disabled) return
      const touch = e.touches[0]
      onMouseDown({
        clientX: touch.clientX,
        clientY: touch.clientY,
        button: 0,
        preventDefault: () => e.preventDefault(),
        stopPropagation: () => e.stopPropagation(),
      } as unknown as MouseEvent)

      document.addEventListener('touchmove', onTouchMove, { passive: false })
      document.addEventListener('touchend', onTouchEnd)
    }

    function onTouchMove(e: TouchEvent) {
      if (!state.isDragging) return
      const touch = e.touches[0]
      onMouseMove({
        clientX: touch.clientX,
        clientY: touch.clientY,
      } as unknown as MouseEvent)
      e.preventDefault()
    }

    function onTouchEnd(e: TouchEvent) {
      if (!state.isDragging) return
      const touch = e.changedTouches[0]
      onMouseUp({
        clientX: touch.clientX,
        clientY: touch.clientY,
      } as unknown as MouseEvent)
      document.removeEventListener('touchmove', onTouchMove)
      document.removeEventListener('touchend', onTouchEnd)
    }

    // 保存引用以便在 unmounted 时清理
    ;(el as any)._draggableCleanup = () => {
      handleElement.removeEventListener('mousedown', onMouseDown as EventListener)
      handleElement.removeEventListener('touchstart', onTouchStart as EventListener)
    }

    handleElement.addEventListener('mousedown', onMouseDown as EventListener)
    handleElement.addEventListener('touchstart', onTouchStart as EventListener, { passive: false })

    // 窗口大小变化时重新计算边界
    window.addEventListener('resize', calculateBounds)
    ;(el as any)._draggableResize = calculateBounds
  },

  updated(el, binding) {
    const options = binding.value || {}
    if ((el as any)._draggableResize) {
      ;(el as any)._draggableResize()
    }
    void options
  },

  unmounted(el) {
    const cleanup = (el as any)._draggableCleanup
    if (cleanup) {
      cleanup()
      delete (el as any)._draggableCleanup
    }
    if ((el as any)._draggableResize) {
      window.removeEventListener('resize', (el as any)._draggableResize)
      delete (el as any)._draggableResize
    }
  },
}

export default draggable
