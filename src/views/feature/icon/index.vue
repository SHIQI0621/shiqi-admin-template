<template>
    <div class="icon-management-page">
        <!-- 介绍 -->
        <Card class="intro-card" :border-radius="16">
            <div class="intro-section">
                <h2 class="intro-title">图标管理</h2>
                <p class="intro-text">
                    图标管理器集成了 Element Plus 图标和 Remix Icon 图标库，支持按名称搜索、按分类筛选，点击即可复制对应的使用代码。
                </p>

                <div class="intro-tips">
                    <p>💡 点击任意图标即可复制对应的 Vue 组件代码到剪贴板。</p>
                </div>
            </div>
        </Card>

        <!-- 图标浏览器 -->
        <Card :border-radius="16">
            <template #header>
                <div class="page-header">
                    <span class="page-title">图标浏览器</span>
                    <div class="header-stats">
                        <el-tag type="info">Element Plus: {{ elementIconList.length }}</el-tag>
                        <el-tag type="success">Remix Icon: {{ remixIconList.length }}</el-tag>
                        <el-tag type="warning">总计: {{ allIcons.length }}</el-tag>
                    </div>
                </div>
            </template>

            <!-- 工具栏 -->
            <div class="toolbar">
                <el-input v-model="searchText" placeholder="搜索图标名称..." clearable class="search-input">
                    <template #prefix>
                        <el-icon>
                            <Search />
                        </el-icon>
                    </template>
                </el-input>

                <div class="category-tabs">
                    <div class="tab-buttons">
                        <IconButton :type="activeCategory === 'all' ? 'primary' : 'default'"
                            :plain="activeCategory !== 'all'" @click="handleCategorySwitch('all')">
                            全部 ({{ allIcons.length }})
                        </IconButton>
                        <IconButton :type="activeCategory === 'element' ? 'primary' : 'default'"
                            :plain="activeCategory !== 'element'" @click="handleCategorySwitch('element')">
                            Element Plus
                        </IconButton>
                        <IconButton :type="activeCategory === 'remix' ? 'primary' : 'default'"
                            :plain="activeCategory !== 'remix'" @click="handleCategorySwitch('remix')">
                            Remix Icon
                        </IconButton>
                    </div>
                </div>
            </div>

            <!-- 图标网格 -->
            <div class="icons-container">
                <div v-if="filteredIcons.length > 0" class="icons-grid">
                    <div v-for="icon in filteredIcons" :key="icon.name" class="icon-card"
                        :class="{ 'is-copied': copiedIcon === icon.name }" @click="copyIconCode(icon)">
                        <div class="icon-display">
                            <IconView :name="icon.name" :type="icon.category === 'remix' ? 'remix' : 'element'"
                                :size="28" />
                        </div>
                        <div class="icon-info">
                            <span class="icon-name" :title="icon.name">{{ icon.name }}</span>
                        </div>
                        <div class="copy-tooltip" v-if="copiedIcon === icon.name">
                            <el-icon>
                                <Check />
                            </el-icon>
                            <span>已复制</span>
                        </div>
                    </div>
                </div>

                <!-- 空状态 -->
                <div v-else class="empty-state">
                    <el-empty description="未找到匹配的图标" :image-size="80" />
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref, computed } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Search, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { remixIconsList } from '@/components/IconSelect/remixIcons'
import IconButton from '@/components/IconButton/index.vue'
import IconView from '@/components/IconView/index.vue'

interface IconItem {
    name: string
    category: 'element' | 'remix'
}

// 搜索和筛选状态
const searchText = ref('')
const activeCategory = ref<'all' | 'element' | 'remix'>('all')
const copiedIcon = ref('')

// 分类切换
function handleCategorySwitch(category: 'all' | 'element' | 'remix') {
    activeCategory.value = category
    searchText.value = ''
}

// Element Plus 图标列表
const elementIconList = computed<IconItem[]>(() => {
    const excludeList = ['IconSelect', 'default']
    return Object.entries(ElementPlusIconsVue)
        .filter(([name]) => !excludeList.includes(name))
        .map(([name]) => ({
            name,
            category: 'element' as const
        }))
        .sort((a, b) => a.name.localeCompare(b.name))
})

// Remix Icon 图标列表
const remixIconList = computed<IconItem[]>(() => {
    return remixIconsList.map(icon => ({
        name: icon.name,
        category: 'remix' as const
    }))
})

// 所有图标
const allIcons = computed(() => [
    ...elementIconList.value,
    ...remixIconList.value
])

// 过滤后的图标
const filteredIcons = computed(() => {
    let list = activeCategory.value === 'element'
        ? elementIconList.value
        : activeCategory.value === 'remix'
            ? remixIconList.value
            : allIcons.value

    if (searchText.value.trim()) {
        const keyword = searchText.value.toLowerCase().trim()
        list = list.filter(item => item.name.toLowerCase().includes(keyword))
    }

    return list
})

// 生成复制的代码
function generateCode(icon: IconItem): string {
    return icon.category === 'element'
        ? `<el-icon><${icon.name} /></el-icon>`
        : `<i class="ri-${icon.name}"></i>`
}

// 复制图标代码
async function copyIconCode(icon: IconItem) {
    const code = generateCode(icon)

    try {
        await navigator.clipboard.writeText(code)
    } catch {
        const textarea = document.createElement('textarea')
        textarea.value = code
        document.body.appendChild(textarea)
        textarea.select()
        try {
            document.execCommand('copy')
        } catch {
            ElMessage.error('复制失败，请手动复制')
            document.body.removeChild(textarea)
            return
        }
        document.body.removeChild(textarea)
    }

    copiedIcon.value = icon.name
    ElMessage.success(`已复制: ${code}`)
    setTimeout(() => {
        copiedIcon.value = ''
    }, 1500)
}
</script>

<style scoped lang="scss">
// 公共骨架样式来自全局 demo.scss，此处仅保留页面专属样式

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .page-title {
        font-size: 18px;
        font-weight: 600;
    }

    .header-stats {
        display: flex;
        gap: 8px;
    }
}

.toolbar {
    display: flex;
    gap: 16px;
    margin-bottom: 16px;
    flex-wrap: wrap;
    align-items: center;

    .search-input {
        width: 300px;
    }

    .category-tabs {
        flex: 1;
        display: flex;
        justify-content: flex-end;
    }
}

.tab-buttons {
    display: flex;
    gap: 8px;
}

.icons-container {
    min-height: 300px;
}

.icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 12px;
}

.icon-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 16px 12px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s ease;
    background-color: var(--el-bg-color);

    &:hover {
        border-color: var(--el-color-primary-light-5);
        background-color: var(--el-color-primary-light-9);
        transform: translateY(-2px);

        .icon-display {
            color: var(--el-color-primary);
            transform: scale(1.1);
        }

        .icon-info .icon-name {
            color: var(--el-color-primary);
        }
    }

    &.is-copied {
        border-color: var(--el-color-success);
        background-color: var(--el-color-success-light-9);

        .icon-display {
            color: var(--el-color-success);
        }

        .icon-info .icon-name {
            color: var(--el-color-success);
        }
    }
}

.icon-display {
    width: 48px;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--el-text-color-regular);
    transition: all 0.2s ease;
}

.icon-info {
    width: 100%;
    margin-top: 8px;
    text-align: center;

    .icon-name {
        font-size: 12px;
        color: var(--el-text-color-secondary);
        display: block;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        transition: color 0.2s ease;
    }
}

.copy-tooltip {
    position: absolute;
    top: 8px;
    right: 8px;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 4px 8px;
    background-color: var(--el-color-success);
    color: #fff;
    font-size: 12px;
    border-radius: 4px;
    animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: scale(0.8);
    }

    to {
        opacity: 1;
        transform: scale(1);
    }
}

.empty-state {
    padding: 60px 0;
    text-align: center;
}
</style>
