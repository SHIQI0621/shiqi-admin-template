import { ref, isRef, computed, onMounted, onBeforeUnmount, type Ref } from 'vue'

/** 支持的动画名称 */
export type AnimationName =
  | 'bounce'
  | 'scale'
  | 'shake'
  | 'swing'
  | 'flip'
  | 'fade'
  | 'pulse'
  | 'rubber-band'
  | 'tada'
  | 'wobble'
  | 'jello'
  | 'heartbeat'
  | 'float'
  | 'glow'
  | 'tilt'
  | 'squeeze'
  | 'squish'

/** 动画强度 */
export type Intensity = 'light' | 'normal' | 'strong'

/** Hook 配置项 */
export interface HoverAnimateOptions {
  /** 动画名称 */
  name?: AnimationName | string
  /** 动画时长 (ms) */
  duration?: number
  /** 动画强度 */
  intensity?: Intensity
  /** 是否自动播放 */
  autoPlay?: boolean
}

const defaultProps = {
  name: 'scale',
  duration: 300,
  intensity: 'normal',
  autoPlay: false,
}

/**
 * 悬浮动画 Hook
 *
 * 封装鼠标悬浮触发动画的核心逻辑，支持 16 种动画效果、
 * 强度控制、自动播放等功能。
 *
 * @example
 * ```ts
 * const { isHovering, isAnimating, wrapperClass, wrapperStyle, handleMouseEnter, handleMouseLeave } = useHoverAnimate({ name: 'bounce', duration: 500 })
 * ```
 */
export function useHoverAnimate(options: HoverAnimateOptions | Ref<HoverAnimateOptions> = {}) {
  const opts = isRef(options) ? options : ref({ ...defaultProps, ...options })

  const isHovering = ref(false)
  const isAnimating = ref(false)

  const wrapperClass = computed(() => ({
    [`hover-${opts.value.name}`]: true,
    [`intensity-${opts.value.intensity}`]: true,
    'is-hovering': isHovering.value,
    'is-animating': isAnimating.value,
  }))

  const wrapperStyle = computed(() => ({
    '--animation-duration': `${opts.value.duration ?? 300}ms`,
    '--animation-intensity':
      opts.value.intensity === 'strong' ? 1.3 : opts.value.intensity === 'light' ? 0.7 : 1,
  }))

  let animTimer: ReturnType<typeof setTimeout> | null = null

  function trigger() {
    isAnimating.value = true
    if (animTimer) clearTimeout(animTimer)
    animTimer = setTimeout(() => {
      isAnimating.value = false
    }, opts.value.duration ?? 300)
  }

  function handleMouseEnter() {
    isHovering.value = true
    trigger()
  }

  function handleMouseLeave() {
    isHovering.value = false
  }

  // ==================== 自动播放 ====================
  let autoPlayTimer: ReturnType<typeof setInterval> | null = null

  function startAutoPlay() {
    stopAutoPlay()
    let playing = false
    autoPlayTimer = setInterval(() => {
      playing = !playing
      isAnimating.value = playing
      if (playing) {
        setTimeout(() => {
          isAnimating.value = false
        }, opts.value.duration ?? 300)
      }
    }, (opts.value.duration ?? 300) + 500)
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer)
      autoPlayTimer = null
    }
  }

  onMounted(() => {
    if (opts.value.autoPlay) {
      startAutoPlay()
    }
  })

  onBeforeUnmount(() => {
    stopAutoPlay()
    if (animTimer) clearTimeout(animTimer)
  })

  return {
    isHovering,
    isAnimating,
    wrapperClass,
    wrapperStyle,
    handleMouseEnter,
    handleMouseLeave,
    trigger,
    startAutoPlay,
    stopAutoPlay,
  }
}
