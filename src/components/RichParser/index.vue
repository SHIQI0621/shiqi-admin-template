<template>
  <div class="rich-parser" v-html="safeContent"></div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  content: string
}

const props = defineProps<Props>()

const safeContent = computed(() => {
  if (!props.content) return ''
  return sanitizeHtml(props.content)
})

function sanitizeHtml(html: string): string {
  // 移除危险标签和属性
  let safeHtml = html
    // 移除 script 标签
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    // 移除 style 标签
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    // 移除 iframe 标签
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, '')
    // 移除 on* 事件属性
    .replace(/\s+on\w+="[^"]*"/gi, '')
    // 移除 javascript: 协议
    .replace(/javascript:/gi, '')
    // 移除 onclick/onload 等事件处理器
    .replace(/(<[a-z][^>]+\s)(on\w+="[^"]*")/gi, '$1')

  return safeHtml
}
</script>

<style scoped lang="scss">
.rich-parser {
  padding: 12px;
  font-size: 14px;
  line-height: 1.8;
  color: #303133;
  background: #ffffff;
  border-radius: 4px;

  :deep(p) {
    margin: 0 0 12px 0;
  }

  :deep(p:last-child) {
    margin-bottom: 0;
  }

  :deep(ul),
  :deep(ol) {
    margin: 12px 0;
    padding-left: 24px;
  }

  :deep(li) {
    margin: 6px 0;
  }

  :deep(b),
  :deep(strong) {
    font-weight: bold;
    color: #303133;
  }

  :deep(i),
  :deep(em) {
    font-style: italic;
  }

  :deep(u) {
    text-decoration: underline;
  }

  :deep(h1),
  :deep(h2),
  :deep(h3),
  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-weight: bold;
    margin: 16px 0 8px 0;
    color: #303133;
  }

  :deep(h1) {
    font-size: 24px;
  }

  :deep(h2) {
    font-size: 20px;
  }

  :deep(h3) {
    font-size: 18px;
  }

  :deep(h4),
  :deep(h5),
  :deep(h6) {
    font-size: 16px;
  }

  :deep(a) {
    color: #409eff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(blockquote) {
    margin: 12px 0;
    padding: 8px 16px;
    background: #f5f7fa;
    border-left: 4px solid #409eff;
    color: #606266;
    font-style: italic;
  }

  :deep(code) {
    padding: 2px 4px;
    background: #f5f7fa;
    border-radius: 4px;
    font-family: monospace;
    font-size: 13px;
  }

  :deep(pre) {
    margin: 12px 0;
    padding: 12px;
    background: #1e1e1e;
    border-radius: 4px;
    overflow-x: auto;

    :deep(code) {
      background: transparent;
      color: #d4d4d4;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 12px 0;
    font-size: 14px;
  }

  :deep(th),
  :deep(td) {
    padding: 8px 12px;
    border: 1px solid #e4e7ed;
    text-align: left;
  }

  :deep(th) {
    background: #f5f7fa;
    font-weight: bold;
  }

  :deep(img) {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
  }
}
</style>
