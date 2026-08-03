<template>
  <div class="editor-wrapper">
    <textarea
      ref="textareaRef"
      class="editor-textarea"
      :value="innerValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :style="{ minHeight: minHeight + 'px' }"
      @input="handleInput"
      @blur="handleBlur"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'

interface Props {
  modelValue?: string
  placeholder?: string
  disabled?: boolean
  minHeight?: number
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: '请输入内容...',
  disabled: false,
  minHeight: 200,
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
  (e: 'blur'): void
}>()

const textareaRef = ref<HTMLTextAreaElement | null>(null)

const innerValue = computed({
  get: () => props.modelValue ?? '',
  set: (val) => emit('update:modelValue', val),
})

function handleInput(e: Event) {
  const target = e.target as HTMLTextAreaElement
  emit('update:modelValue', target.value)
  emit('change', target.value)
}

function handleBlur() {
  emit('blur')
}

watch(
  () => props.modelValue,
  (newVal) => {
    const val = newVal ?? ''
    if (textareaRef.value && textareaRef.value.value !== val) {
      textareaRef.value.value = val
    }
  }
)
</script>

<style scoped lang="scss">
.editor-wrapper {
  width: 100%;

  .editor-textarea {
    width: 100%;
    padding: 8px 12px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;
    line-height: 1.6;
    color: #606266;
    resize: vertical;
    outline: none;
    transition: border-color 0.2s;
    font-family: inherit;

    &:focus {
      border-color: #409eff;
    }

    &:disabled {
      background-color: #f5f7fa;
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &::placeholder {
      color: #c0c4cc;
    }
  }
}
</style>
