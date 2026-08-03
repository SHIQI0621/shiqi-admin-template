import type { Directive, DirectiveBinding } from 'vue'
import type { AnimationName, Intensity } from '@/hooks/useHoverAnimate'

interface HoverOptions {
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
  name: 'scale' as AnimationName,
  duration: 300,
  intensity: 'normal' as Intensity,
  autoPlay: false,
}

// ==================== CSS 注入（全局只注入一次） ====================
let cssInjected = false

function injectStyles() {
  if (cssInjected) return
  const style = document.createElement('style')
  style.id = 'v-hover-styles'
  style.textContent = `
.v-hover-anim {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-property: transform, box-shadow, filter, opacity;
  transition-duration: var(--v-hover-duration, 300ms);
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center center;
  will-change: transform, box-shadow, filter;
}

/* 缩放 */
.v-hover-anim.hover-scale:hover,
.v-hover-anim.hover-scale.is-animating {
  transform: scale(calc(1.05 * var(--v-hover-intensity, 1)));
}
.v-hover-anim.hover-scale.intensity-light:hover,
.v-hover-anim.hover-scale.intensity-light.is-animating {
  transform: scale(1.03);
}
.v-hover-anim.hover-scale.intensity-strong:hover,
.v-hover-anim.hover-scale.intensity-strong.is-animating {
  transform: scale(1.15);
}

/* 弹性 */
.v-hover-anim.hover-bounce:hover,
.v-hover-anim.hover-bounce.is-animating {
  animation: vHoverBounce var(--v-hover-duration, 300ms) cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes vHoverBounce {
  0% { transform: scale(1); }
  50% { transform: scale(1.15); }
  70% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

/* 抖动 */
.v-hover-anim.hover-shake:hover,
.v-hover-anim.hover-shake.is-animating {
  animation: vHoverShake var(--v-hover-duration, 300ms) ease-in-out;
}
@keyframes vHoverShake {
  0%, 100% { transform: translateX(0); }
  10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
  20%, 40%, 60%, 80% { transform: translateX(4px); }
}

/* 摇摆 */
.v-hover-anim.hover-swing:hover,
.v-hover-anim.hover-swing.is-animating {
  animation: vHoverSwing var(--v-hover-duration, 400ms) ease-in-out;
  transform-origin: top center;
}
@keyframes vHoverSwing {
  20% { transform: rotate(15deg); }
  40% { transform: rotate(-10deg); }
  60% { transform: rotate(5deg); }
  80% { transform: rotate(-5deg); }
  100% { transform: rotate(0); }
}

/* 翻转 */
.v-hover-anim.hover-flip:hover,
.v-hover-anim.hover-flip.is-animating {
  animation: vHoverFlip var(--v-hover-duration, 500ms) ease-in-out;
}
@keyframes vHoverFlip {
  0% { transform: perspective(400px) rotateY(0); }
  50% { transform: perspective(400px) rotateY(-180deg); }
  100% { transform: perspective(400px) rotateY(-360deg); }
}

/* 淡出 */
.v-hover-anim.hover-fade:hover,
.v-hover-anim.hover-fade.is-animating {
  animation: vHoverFade var(--v-hover-duration, 300ms) ease-in-out;
}
@keyframes vHoverFade {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.7; transform: scale(0.98); }
}

/* 脉冲 */
.v-hover-anim.hover-pulse:hover,
.v-hover-anim.hover-pulse.is-animating {
  animation: vHoverPulse var(--v-hover-duration, 400ms) ease-in-out;
}
@keyframes vHoverPulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(105, 82, 245, 0.4); }
  70% { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(105, 82, 245, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(105, 82, 245, 0); }
}

/* 橡皮筋 */
.v-hover-anim.hover-rubber-band:hover,
.v-hover-anim.hover-rubber-band.is-animating {
  animation: vHoverRubberBand var(--v-hover-duration, 500ms) ease-in-out;
}
@keyframes vHoverRubberBand {
  0% { transform: scale(1); }
  30% { transform: scaleX(1.25) scaleY(0.75); }
  40% { transform: scaleX(0.75) scaleY(1.25); }
  60% { transform: scaleX(1.15) scaleY(0.85); }
  100% { transform: scale(1); }
}

/* Tada */
.v-hover-anim.hover-tada:hover,
.v-hover-anim.hover-tada.is-animating {
  animation: vHoverTada var(--v-hover-duration, 500ms) ease-in-out;
}
@keyframes vHoverTada {
  0% { transform: scale(1); }
  10%, 20% { transform: scale(0.9) rotate(-3deg); }
  30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
  40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
  100% { transform: scale(1) rotate(0); }
}

/* 摇摆抖动 */
.v-hover-anim.hover-wobble:hover,
.v-hover-anim.hover-wobble.is-animating {
  animation: vHoverWobble var(--v-hover-duration, 500ms) ease-in-out;
}
@keyframes vHoverWobble {
  0% { transform: translateX(0); }
  15% { transform: translateX(-25%) rotate(-5deg); }
  30% { transform: translateX(20%) rotate(3deg); }
  45% { transform: translateX(-15%) rotate(-3deg); }
  60% { transform: translateX(10%) rotate(2deg); }
  75% { transform: translateX(-5%) rotate(-1deg); }
  100% { transform: translateX(0); }
}

/* Jello */
.v-hover-anim.hover-jello:hover,
.v-hover-anim.hover-jello.is-animating {
  animation: vHoverJello var(--v-hover-duration, 500ms) ease-in-out;
}
@keyframes vHoverJello {
  0%, 100% { transform: skewX(0deg) skewY(0deg); }
  11% { transform: skewX(-12.5deg) skewY(-12.5deg); }
  22% { transform: skewX(6.25deg) skewY(6.25deg); }
  33% { transform: skewX(-3.125deg) skewY(-3.125deg); }
  44% { transform: skewX(1.5625deg) skewY(1.5625deg); }
  55% { transform: skewX(-0.78125deg) skewY(-0.78125deg); }
  66% { transform: skewX(0.390625deg) skewY(0.390625deg); }
  77% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); }
  88% { transform: skewX(0.09765625deg) skewY(0.09765625deg); }
}

/* 心跳 */
.v-hover-anim.hover-heartbeat:hover,
.v-hover-anim.hover-heartbeat.is-animating {
  animation: vHoverHeartbeat var(--v-hover-duration, 500ms) ease-in-out;
}
@keyframes vHoverHeartbeat {
  0% { transform: scale(1); }
  14% { transform: scale(1.3); }
  28% { transform: scale(1); }
  42% { transform: scale(1.3); }
  70% { transform: scale(1); }
}

/* 悬浮 */
.v-hover-anim.hover-float:hover,
.v-hover-anim.hover-float.is-animating {
  animation: vHoverFloat var(--v-hover-duration, 500ms) ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes vHoverFloat {
  0% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0); }
}

/* 发光 */
.v-hover-anim.hover-glow:hover,
.v-hover-anim.hover-glow.is-animating {
  animation: vHoverGlow var(--v-hover-duration, 400ms) ease-in-out;
  animation-fill-mode: forwards;
}
@keyframes vHoverGlow {
  0% { box-shadow: 0 0 0 0 rgba(105, 82, 245, 0); transform: scale(1); }
  50% { box-shadow: 0 0 20px 8px rgba(105, 82, 245, 0.3); transform: scale(1.02); }
  100% { box-shadow: 0 0 10px 4px rgba(105, 82, 245, 0.15); transform: scale(1); }
}

/* 倾斜 */
.v-hover-anim.hover-tilt:hover,
.v-hover-anim.hover-tilt.is-animating {
  animation: vHoverTilt var(--v-hover-duration, 400ms) ease-in-out;
}
@keyframes vHoverTilt {
  0% { transform: perspective(500px) rotateX(0) rotateY(0); }
  25% { transform: perspective(500px) rotateX(-10deg) rotateY(5deg); }
  50% { transform: perspective(500px) rotateX(5deg) rotateY(-5deg); }
  75% { transform: perspective(500px) rotateX(-5deg) rotateY(10deg); }
  100% { transform: perspective(500px) rotateX(0) rotateY(0); }
}

/* 挤压 */
.v-hover-anim.hover-squeeze:hover,
.v-hover-anim.hover-squeeze.is-animating {
  animation: vHoverSqueeze var(--v-hover-duration, 300ms) ease-in-out;
}
@keyframes vHoverSqueeze {
  0% { transform: scale(1); }
  50% { transform: scaleX(1.15) scaleY(0.9); }
  100% { transform: scale(1); }
}

/* 压扁 */
.v-hover-anim.hover-squish:hover,
.v-hover-anim.hover-squish.is-animating {
  animation: vHoverSquish var(--v-hover-duration, 300ms) ease-in-out;
}
@keyframes vHoverSquish {
  0% { transform: scale(1); }
  50% { transform: scaleX(0.9) scaleY(1.15); }
  100% { transform: scale(1); }
}
  `
  document.head.appendChild(style)
  cssInjected = true
}

/** v-hover 指令状态 */
interface HoverState {
  isHovering: boolean
  isAnimating: boolean
  animTimer: ReturnType<typeof setTimeout> | null
  autoPlayTimer: ReturnType<typeof setInterval> | null
  options: Required<HoverOptions>
}

function resolveOptions(binding: DirectiveBinding): Required<HoverOptions> {
  const value = binding.value || {}
  return {
    name: value.name ?? defaultProps.name,
    duration: value.duration ?? defaultProps.duration,
    intensity: value.intensity ?? defaultProps.intensity,
    autoPlay: value.autoPlay ?? defaultProps.autoPlay,
  }
}

function applyClasses(el: HTMLElement, state: HoverState) {
  const opts = state.options
  el.style.setProperty('--v-hover-duration', `${opts.duration}ms`)
  el.style.setProperty(
    '--v-hover-intensity',
    opts.intensity === 'strong' ? '1.3' : opts.intensity === 'light' ? '0.7' : '1'
  )

  el.classList.add('v-hover-anim')
  el.classList.add(`hover-${opts.name}`)
  el.classList.add(`intensity-${opts.intensity}`)

  el.classList.toggle('is-hovering', state.isHovering)
  el.classList.toggle('is-animating', state.isAnimating)
}

function trigger(el: HTMLElement, state: HoverState) {
  state.isAnimating = true
  el.classList.add('is-animating')
  if (state.animTimer) clearTimeout(state.animTimer)
  state.animTimer = setTimeout(() => {
    state.isAnimating = false
    el.classList.remove('is-animating')
  }, state.options.duration)
}

const hover: Directive<HTMLElement, HoverOptions | string | undefined> = {
  mounted(el, binding) {
    injectStyles()

    const state: HoverState = {
      isHovering: false,
      isAnimating: false,
      animTimer: null,
      autoPlayTimer: null,
      options: resolveOptions(binding),
    }
    ;(el as any)._vHover = state

    applyClasses(el, state)

    // 事件绑定
    const onMouseEnter = () => {
      state.isHovering = true
      el.classList.add('is-hovering')
      trigger(el, state)
    }
    const onMouseLeave = () => {
      state.isHovering = false
      el.classList.remove('is-hovering')
    }

    el.addEventListener('mouseenter', onMouseEnter)
    el.addEventListener('mouseleave', onMouseLeave)
    ;(el as any)._vHoverEnter = onMouseEnter
    ;(el as any)._vHoverLeave = onMouseLeave

    // 自动播放
    if (state.options.autoPlay) {
      let playing = false
      state.autoPlayTimer = setInterval(() => {
        playing = !playing
        state.isAnimating = playing
        el.classList.toggle('is-animating', playing)
        if (playing) {
          setTimeout(() => {
            state.isAnimating = false
            el.classList.remove('is-animating')
          }, state.options.duration)
        }
      }, state.options.duration + 500)
    }
  },

  updated(el, binding) {
    const state: HoverState = (el as any)._vHover
    if (!state) return

    state.options = resolveOptions(binding)
    applyClasses(el, state)
  },

  unmounted(el) {
    const state: HoverState = (el as any)._vHover
    if (state) {
      if (state.animTimer) clearTimeout(state.animTimer)
      if (state.autoPlayTimer) clearInterval(state.autoPlayTimer)
    }
    const enter = (el as any)._vHoverEnter
    const leave = (el as any)._vHoverLeave
    if (enter) el.removeEventListener('mouseenter', enter)
    if (leave) el.removeEventListener('mouseleave', leave)
    delete (el as any)._vHover
    delete (el as any)._vHoverEnter
    delete (el as any)._vHoverLeave
  },
}

export default hover
