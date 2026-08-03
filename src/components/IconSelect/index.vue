<template>
  <div class="icon-select">
    <!-- 触发器 -->
    <div class="icon-select-trigger" @click="dialogVisible = true">
      <el-input
        :model-value="modelValue"
        placeholder="请选择图标"
        readonly
      >
        <template #prefix>
          <IconView :name="modelValue" :size="16" v-if="modelValue" />
          <el-icon v-else :size="16"><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 弹窗 -->
    <Dialog
      v-model="dialogVisible"
      title="选择图标"
      width="920px"
      destroy-on-close
      :append-to-body="true"
    >
      <!-- 搜索框 -->
      <div style="margin-bottom: 16px">
        <el-input
          v-model="searchText"
          placeholder="搜索图标名称..."
          clearable
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>

      <!-- 分类标签 -->
      <div class="tabs-container">
        <el-radio-group v-model="activeCategory" size="small">
          <el-radio-button value="all">全部 ({{ allIcons.length }})</el-radio-button>
          <el-radio-button value="element">Element Plus</el-radio-button>
          <el-radio-button value="remix">Remix Icon ({{ remixIcons.length }})</el-radio-button>
          <el-radio-button value="custom">自定义 ({{ customIcons.length }})</el-radio-button>
        </el-radio-group>
      </div>

      <!-- 图标网格 -->
      <div class="icons-wrapper">
        <ul class="icons-grid" v-if="filteredIcons.length > 0">
          <li
            v-for="icon in filteredIcons"
            :key="`${icon.category}-${icon.name}`"
            class="icon-item"
            :class="{ active: modelValue === icon.name }"
            @click="selectIcon(icon)"
          >
            <div class="icon-box">
              <!-- 使用通用 Icon 组件显示图标 -->
              <IconView 
                :name="icon.name" 
                :type="icon.category === 'remix' ? 'remix' : icon.category === 'element' ? 'element' : 'text'"
                :size="22"
              />
            </div>
            <span class="icon-name">{{ icon.name }}</span>
          </li>
        </ul>

        <!-- 空状态 -->
        <div v-else class="empty-box">
          <el-empty description="未找到匹配的图标" :image-size="80" />
        </div>
      </div>

      <!-- 底部操作栏 -->
      <template #footer>
        <div class="footer-content">
          <div class="selected-info" v-if="modelValue">
            已选：
            <el-tag size="small" type="primary">
              <IconView :name="modelValue" :size="12" style="margin-right: 4px; vertical-align: middle;" />
              {{ modelValue }}
            </el-tag>
          </div>
          <div class="footer-buttons">
            <el-button size="small" @click="clearSelection">清空</el-button>
            <el-button size="small" type="primary" @click="closeDialog">确定</el-button>
          </div>
        </div>
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'
import IconView from '@/components/IconView/index.vue'
import { remixIconsList } from './remixIcons'
import Dialog from '@/components/Dialog/index.vue'

// 定义接口
interface IconItem {
  name: string | undefined
  component?: any
  category: 'element' | 'remix' | 'custom'
}

// Props & Emits
const props = defineProps<{
  modelValue: string | undefined
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | undefined): void
}>()

// 状态
const dialogVisible = ref(false)
const searchText = ref('')
const activeCategory = ref('all')
const customIcons = ref<IconItem[]>([])

// 获取 Element Plus 图标列表
const elementIcons = computed<IconItem[]>(() => {
  const excludeList = ['IconSelect', 'default']
  return Object.entries(ElementPlusIconsVue)
    .filter(([name]) => !excludeList.includes(name))
    .map(([name, component]) => ({
      name,
      component,
      category: 'element' as const
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
})

// 获取 Remix Icon 列表
const remixIcons = computed<IconItem[]>(() => {
  return remixIconsList.map(icon => ({
    name: icon.name,
    category: 'remix' as const
  }))
})

// 所有图标
const allIcons = computed(() => [
  ...elementIcons.value,
  ...remixIcons.value,
  ...customIcons.value
])

// 过滤后的图标
const filteredIcons = computed(() => {
  let list = allIcons.value

  // 按分类过滤
  if (activeCategory.value !== 'all') {
    list = list.filter(item => item.category === activeCategory.value)
  }

  // 按搜索文本过滤
  if (searchText.value.trim()) {
    const keyword = searchText.value.toLowerCase().trim()
    list = list.filter(item =>
      item.name?.toLowerCase().includes(keyword)
    )
  }

  return list
})

// 选择图标
function selectIcon(icon: IconItem) {
  emit('update:modelValue', icon.name)
}

// 清空选择
function clearSelection() {
  emit('update:modelValue', '')
}

// 关闭弹窗
function closeDialog() {
  dialogVisible.value = false
}

// 监听弹窗打开
watch(dialogVisible, (val) => {
  if (val) {
    searchText.value = ''
    activeCategory.value = 'all'
  }
})

// 暴露方法：添加自定义图标
defineExpose({
  addCustomIcons: (icons: Array<{ name: string; component: any }>) => {
    customIcons.value.push(
      ...icons.map(icon => ({ ...icon, category: 'custom' as const }))
    )
  }
})
</script>

<style scoped>
.icon-select { width: 100%; }

.icon-select-trigger { cursor: pointer; }

.icon-select-trigger:hover :deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px var(--el-color-primary) inset;
}

.tabs-container {
  margin-bottom: 16px;
  text-align: center;
}

.icons-wrapper {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  background-color: #fafafa;
  height: 450px;
  overflow-y: auto;
}

.icons-grid {
  list-style: none;
  margin: 0;
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(8, minmax(90px, 1fr));
  gap: 10px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px 4px;
  border: 1px solid transparent;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.icon-item:hover {
  background-color: #ecf5ff;
  border-color: #b3d8ff;
  
  .icon-box {
    transform: scale(1.15);
  }
}

.icon-item.active {
  background-color: #ecf5ff;
  border-color: var(--el-color-primary);

  .icon-name {
    color: var(--el-color-primary);
    font-weight: 600;
  }
}

.icon-box {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #606266;
  margin-bottom: 6px;
  transition: transform 0.2s ease;
}

.icon-name {
  font-size: 11px;
  color: #909399;
  text-align: center;
  line-height: 1.2;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}

.empty-box {
  padding: 80px 0;
  text-align: center;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.selected-info {
  font-size: 14px;
  color: #606266;
  display: flex;
  align-items: center;
  gap: 8px;
}

.footer-buttons {
  display: flex;
  gap: 12px;
}

/* 滚动条样式 */
.icons-wrapper::-webkit-scrollbar {
  width: 6px;
}

.icons-wrapper::-webkit-scrollbar-track {
  background: transparent;
}

.icons-wrapper::-webkit-scrollbar-thumb {
  background-color: #c0c4cc;
  border-radius: 3px;
}

.icons-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #909399;
}
</style>
