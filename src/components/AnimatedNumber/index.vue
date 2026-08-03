<template>
  <span class="animated-number">{{ formattedValue }}</span>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'

interface Props {
  startValue?: number
  endValue: number
  duration?: number
  prefix?: string
  suffix?: string
  separator?: boolean
  decimals?: number
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  startValue: 0,
  duration: 1500,
  prefix: '',
  suffix: '',
  separator: false,
  decimals: 0,
  autoplay: true,
})

const displayValue = ref(props.startValue)
let animationTimer: number | null = null
let startTime: number | null = null
let startAnimateValue = props.startValue

const formattedValue = computed(() => {
  let value = displayValue.value
  if (props.decimals > 0) {
    value = Number(value.toFixed(props.decimals))
  } else {
    value = Math.round(value)
  }
  
  let strValue = String(value)
  if (props.separator) {
    const parts = strValue.split('.')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    strValue = parts.join('.')
  }
  
  return `${props.prefix}${strValue}${props.suffix}`
})

function easeOutCubic(currentTime: number, startValue: number, changeInValue: number, duration: number): number {
  const time = currentTime / duration
  return startValue + changeInValue * (Math.pow(time, 3) - 1)
}

function animate(timestamp: number) {
  if (!startTime) startTime = timestamp
  const progress = timestamp - startTime
  const changeValue = props.endValue - startAnimateValue
  
  displayValue.value = easeOutCubic(progress, startAnimateValue, changeValue, props.duration)
  
  if (progress < props.duration) {
    animationTimer = requestAnimationFrame(animate)
  } else {
    displayValue.value = props.endValue
    startTime = null
  }
}

function startAnimation(from?: number, to?: number) {
  if (animationTimer) {
    cancelAnimationFrame(animationTimer)
    animationTimer = null
  }
  
  startAnimateValue = from ?? props.startValue
  displayValue.value = startAnimateValue
  startTime = null
  
  if (to !== undefined) {
    // 临时修改 endValue，通过重新赋值触发动画
    animate(performance.now())
  } else {
    animate(performance.now())
  }
}

function reset() {
  if (animationTimer) {
    cancelAnimationFrame(animationTimer)
    animationTimer = null
  }
  displayValue.value = props.startValue
  startTime = null
}

watch(() => props.endValue, () => {
  startAnimateValue = displayValue.value
  if (animationTimer) {
    cancelAnimationFrame(animationTimer)
    animationTimer = null
  }
  startTime = null
  animate(performance.now())
})

onMounted(() => {
  if (props.autoplay) {
    startAnimation()
  }
})

onUnmounted(() => {
  if (animationTimer) {
    cancelAnimationFrame(animationTimer)
  }
})

defineExpose({
  start: startAnimation,
  reset,
})
</script>

<style scoped lang="scss">
.animated-number {
  display: inline-block;
  font-variant-numeric: tabular-nums;
  font-feature-settings: "tnum";
}
</style>
