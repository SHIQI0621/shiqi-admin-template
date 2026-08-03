<template>
  <i :class="['ri', `ri-${name}`]" :style="iconStyle" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  name: string
  size?: number | string
  color?: string
}>(), {
  size: 16,
  color: ''
})

const iconStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color || undefined
}))
</script>

<style>
/* Remix Icon 样式已通过 remix-icon-vue 自动引入 */
</style>
