<template>
  <el-dropdown trigger="click" @command="handleSwitch" class="lang-selector">
    <div class="lang-trigger">
     <el-tooltip content="语言" placement="top">
       <img src="@/assets/language.svg" alt="语言" class="language-img" />
       </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item 
          v-for="lang in languages" 
          :key="lang.value" 
          :command="lang.value"
        >
          <span>{{ lang.label }}</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { useAppStore } from '@/stores'

const appStore = useAppStore()

// 语言列表
const languages = [
  { value: 'zh-CN', label: '中文' },
  { value: 'en', label: 'English' },
]

// 切换语言
function handleSwitch(lang: string) {
  appStore.setLocale(lang)
}
</script>

<style scoped lang="scss">
.lang-selector {
  .lang-trigger {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 8px;
    height: 50px;
    cursor: pointer;
    transition: background-color 0.2s;
    
    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
    
    span {
      font-size: 14px;
      color: var(--el-text-color-primary, #303133);
    }
  }
}
</style>
