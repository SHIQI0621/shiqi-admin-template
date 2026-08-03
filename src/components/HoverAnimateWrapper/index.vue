<template>
  <component
    :is="tag"
    class="hover-animate-wrapper"
    :class="wrapperClass"
    :style="wrapperStyle"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

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

type Intensity = 'light' | 'normal' | 'strong'

interface Props {
  name?: AnimationName | string
  duration?: number
  intensity?: Intensity
  tag?: string
  autoPlay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  name: 'scale',
  duration: 300,
  intensity: 'normal',
  tag: 'div',
  autoPlay: false
})

const isHovering = ref(false)
const isAnimating = ref(false)

const wrapperClass = computed(() => ({
  [`hover-${props.name}`]: true,
  [`intensity-${props.intensity}`]: true,
  'is-hovering': isHovering.value,
  'is-animating': isAnimating.value
}))

const wrapperStyle = computed(() => ({
  '--animation-duration': `${props.duration}ms`,
  '--animation-intensity': props.intensity === 'strong' ? 1.3 : props.intensity === 'light' ? 0.7 : 1
}))

function handleMouseEnter() {
  isHovering.value = true
  isAnimating.value = true

  setTimeout(() => {
    isAnimating.value = false
  }, props.duration)
}

function handleMouseLeave() {
  isHovering.value = false
}

// 自动播放支持
let autoPlayTimer: number | null = null

onMounted(() => {
  if (props.autoPlay) {
    startAutoPlay()
  }
})

onBeforeUnmount(() => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
  }
})

function startAutoPlay() {
  let playing = false
  autoPlayTimer = window.setInterval(() => {
    playing = !playing
    isAnimating.value = playing
    if (playing) {
      setTimeout(() => {
        isAnimating.value = false
      }, props.duration)
    }
  }, props.duration + 500)
}
</script>

<style scoped lang="scss">
.hover-animate-wrapper {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition-property: transform, box-shadow, filter, opacity;
  transition-duration: var(--animation-duration, 300ms);
  transition-timing-function: cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: center center;
  will-change: transform, box-shadow, filter;

  // ==================== 缩放效果 ====================

  &.hover-scale:hover,
  &.hover-scale.is-animating {
    transform: scale(calc(1.05 * var(--animation-intensity, 1)));
  }

  &.hover-scale.intensity-light:hover,
  &.hover-scale.intensity-light.is-animating {
    transform: scale(1.03);
  }

  &.hover-scale.intensity-strong:hover,
  &.hover-scale.intensity-strong.is-animating {
    transform: scale(1.15);
  }

  // ==================== 弹性效果 ====================

  &.hover-bounce:hover,
  &.hover-bounce.is-animating {
    animation: bounce var(--animation-duration, 300ms) cubic-bezier(0.34, 1.56, 0.64, 1);
  }

  @keyframes bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.15); }
    70% { transform: scale(0.95); }
    100% { transform: scale(1); }
  }

  // ==================== 抖动效果 ====================

  &.hover-shake:hover,
  &.hover-shake.is-animating {
    animation: shake var(--animation-duration, 300ms) ease-in-out;
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    10%, 30%, 50%, 70%, 90% { transform: translateX(-4px); }
    20%, 40%, 60%, 80% { transform: translateX(4px); }
  }

  // ==================== 摇摆效果 ====================

  &.hover-swing:hover,
  &.hover-swing.is-animating {
    animation: swing var(--animation-duration, 400ms) ease-in-out;
    transform-origin: top center;
  }

  @keyframes swing {
    20% { transform: rotate(15deg); }
    40% { transform: rotate(-10deg); }
    60% { transform: rotate(5deg); }
    80% { transform: rotate(-5deg); }
    100% { transform: rotate(0); }
  }

  // ==================== 翻转效果 ====================

  &.hover-flip:hover,
  &.hover-flip.is-animating {
    animation: flip var(--animation-duration, 500ms) ease-in-out;
  }

  @keyframes flip {
    0% { transform: perspective(400px) rotateY(0); }
    50% { transform: perspective(400px) rotateY(-180deg); }
    100% { transform: perspective(400px) rotateY(-360deg); }
  }

  // ==================== 淡出效果 ====================

  &.hover-fade:hover,
  &.hover-fade.is-animating {
    animation: fade var(--animation-duration, 300ms) ease-in-out;
  }

  @keyframes fade {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.7; transform: scale(0.98); }
  }

  // ==================== 脉冲效果 ====================

  &.hover-pulse:hover,
  &.hover-pulse.is-animating {
    animation: pulse var(--animation-duration, 400ms) ease-in-out;
  }

  @keyframes pulse {
    0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--el-color-primary-rgb, 105, 82, 245), 0.4); }
    70% { transform: scale(1.08); box-shadow: 0 0 0 12px rgba(var(--el-color-primary-rgb, 105, 82, 245), 0); }
    100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(var(--el-color-primary-rgb, 105, 82, 245), 0); }
  }

  // ==================== 橡皮筋效果 ====================

  &.hover-rubber-band:hover,
  &.hover-rubber-band.is-animating {
    animation: rubberBand var(--animation-duration, 500ms) ease-in-out;
  }

  @keyframes rubberBand {
    0% { transform: scale(1); }
    30% { transform: scaleX(1.25) scaleY(0.75); }
    40% { transform: scaleX(0.75) scaleY(1.25); }
    60% { transform: scaleX(1.15) scaleY(0.85); }
    100% { transform: scale(1); }
  }

  // ==================== Tada 效果 ====================

  &.hover-tada:hover,
  &.hover-tada.is-animating {
    animation: tada var(--animation-duration, 500ms) ease-in-out;
  }

  @keyframes tada {
    0% { transform: scale(1); }
    10%, 20% { transform: scale(0.9) rotate(-3deg); }
    30%, 50%, 70%, 90% { transform: scale(1.1) rotate(3deg); }
    40%, 60%, 80% { transform: scale(1.1) rotate(-3deg); }
    100% { transform: scale(1) rotate(0); }
  }

  // ==================== 摇摆抖动效果 ====================

  &.hover-wobble:hover,
  &.hover-wobble.is-animating {
    animation: wobble var(--animation-duration, 500ms) ease-in-out;
  }

  @keyframes wobble {
    0% { transform: translateX(0); }
    15% { transform: translateX(-25%) rotate(-5deg); }
    30% { transform: translateX(20%) rotate(3deg); }
    45% { transform: translateX(-15%) rotate(-3deg); }
    60% { transform: translateX(10%) rotate(2deg); }
    75% { transform: translateX(-5%) rotate(-1deg); }
    100% { transform: translateX(0); }
  }

  // ==================== Jello 效果 ====================

  &.hover-jello:hover,
  &.hover-jello.is-animating {
    animation: jello var(--animation-duration, 500ms) ease-in-out;
  }

  @keyframes jello {
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

  // ==================== 心跳效果 ====================

  &.hover-heartbeat:hover,
  &.hover-heartbeat.is-animating {
    animation: heartbeat var(--animation-duration, 500ms) ease-in-out;
  }

  @keyframes heartbeat {
    0% { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1); }
    42% { transform: scale(1.3); }
    70% { transform: scale(1); }
  }

  // ==================== 悬浮效果 ====================

  &.hover-float:hover,
  &.hover-float.is-animating {
    animation: float var(--animation-duration, 500ms) ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes float {
    0% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
    100% { transform: translateY(0); }
  }

  // ==================== 发光效果 ====================

  &.hover-glow:hover,
  &.hover-glow.is-animating {
    animation: glow var(--animation-duration, 400ms) ease-in-out;
    animation-fill-mode: forwards;
  }

  @keyframes glow {
    0% {
      box-shadow: 0 0 0 0 rgba(var(--el-color-primary-rgb, 105, 82, 245), 0);
      transform: scale(1);
    }
    50% {
      box-shadow: 0 0 20px 8px rgba(var(--el-color-primary-rgb, 105, 82, 245), 0.3);
      transform: scale(1.02);
    }
    100% {
      box-shadow: 0 0 10px 4px rgba(var(--el-color-primary-rgb, 105, 82, 245), 0.15);
      transform: scale(1);
    }
  }

  // ==================== 倾斜效果 ====================

  &.hover-tilt:hover,
  &.hover-tilt.is-animating {
    animation: tilt var(--animation-duration, 400ms) ease-in-out;
  }

  @keyframes tilt {
    0% { transform: perspective(500px) rotateX(0) rotateY(0); }
    25% { transform: perspective(500px) rotateX(-10deg) rotateY(5deg); }
    50% { transform: perspective(500px) rotateX(5deg) rotateY(-5deg); }
    75% { transform: perspective(500px) rotateX(-5deg) rotateY(10deg); }
    100% { transform: perspective(500px) rotateX(0) rotateY(0); }
  }

  // ==================== 挤压效果 ====================

  &.hover-squeeze:hover,
  &.hover-squeeze.is-animating {
    animation: squeeze var(--animation-duration, 300ms) ease-in-out;
  }

  @keyframes squeeze {
    0% { transform: scale(1); }
    50% { transform: scaleX(1.15) scaleY(0.9); }
    100% { transform: scale(1); }
  }

  // ==================== 压扁效果 ====================

  &.hover-squish:hover,
  &.hover-squish.is-animating {
    animation: squish var(--animation-duration, 300ms) ease-in-out;
  }

  @keyframes squish {
    0% { transform: scale(1); }
    50% { transform: scaleX(0.9) scaleY(1.15); }
    100% { transform: scale(1); }
  }
}
</style>
