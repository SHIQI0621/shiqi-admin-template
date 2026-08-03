<template>
    <div class="base-tag-page">
        <!-- 介绍 -->
        <Card class="intro-card" :border-radius="16">
            <div class="intro-section">
                <h2 class="intro-title">BaseTag 组件演示</h2>
                <p class="intro-text">
                    BaseTag 是对 Element Plus 的 el-tag 做的一层轻量样式封装，保留了标签组件常用的交互能力，同时统一了项目中的视觉表现。
                </p>

                <div class="intro-tips">
                    <p>组件本身没有重新发明新的交互逻辑，主要做了圆角、边框、内边距、字重等样式优化，因此你可以像使用 el-tag 一样使用它。</p>
                </div>

                <div class="intro-usage">
                    <div class="usage-title">📦 独立使用</div>
                    <p>如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。BaseTag 主要依赖于 <code class="code-inline">element-plus</code>（使用
                        <code>el-tag</code> 组件），使用前请确保已安装该依赖。组件源码地址：<a href="#">BaseTag.vue</a>，欢迎直接使用或根据需求进行二次开发。</p>
                </div>
            </div>
        </Card>

        <!-- 效果预览 -->
        <Card class="preview-card" :border-radius="16">
            <template #header>
                <div class="card-header">
                    <span class="header-title">BaseTag 效果预览</span>
                    <IconButton type="primary" plain size="small" @click="copyCode">
                        <template #icon>
                            <el-icon>
                                <CopyDocument />
                            </el-icon>
                        </template>
                        复制代码
                    </IconButton>
                </div>
            </template>

            <div class="preview-section">
                <h3 class="section-title">基础类型：</h3>
                <div class="preview-group">
                    <BaseTag text="默认标签" />
                    <BaseTag type="primary" text="主要标签" />
                    <BaseTag type="success" text="成功标签" />
                    <BaseTag type="info" text="信息标签" />
                    <BaseTag type="warning" text="警告标签" />
                    <BaseTag type="danger" text="危险标签" />
                </div>

                <h3 class="section-title">主题风格：</h3>
                <div class="preview-group">
                    <BaseTag type="primary" effect="dark" text="dark" />
                    <BaseTag type="primary" effect="light" text="light" />
                    <BaseTag type="primary" effect="plain" text="plain" />
                </div>

                <h3 class="section-title">圆角标签：</h3>
                <div class="preview-group">
                    <BaseTag type="primary" text="默认圆角" />
                    <BaseTag type="primary" round text="主要圆角" />
                    <BaseTag type="success" round text="成功圆角" />
                    <BaseTag type="warning" round text="警告圆角" />
                </div>

                <h3 class="section-title">可关闭标签：</h3>
                <div class="preview-group">
                    <BaseTag type="info" closable text="点击关闭" @close="handleClose" />
                    <BaseTag type="success" closable text="操作完成" />
                    <BaseTag type="warning" closable text="待处理" />
                </div>

                <h3 class="section-title">自定义内容：</h3>
                <div class="preview-group">
                    <BaseTag type="primary">
                        <template #icon>
                            <el-icon>
                                <Promotion />
                            </el-icon>
                        </template>
                        推荐
                    </BaseTag>
                    <BaseTag type="success">
                        <template #icon>
                            <el-icon>
                                <CircleCheck />
                            </el-icon>
                        </template>
                        已认证
                    </BaseTag>
                    <BaseTag type="danger">
                        <template #icon>
                            <el-icon>
                                <Warning />
                            </el-icon>
                        </template>
                        高风险
                    </BaseTag>
                </div>
            </div>
        </Card>

        <!-- 基础用法 -->
        <Card class="usage-card" :border-radius="16">
            <template #header>
                <span class="header-title">基础用法</span>
            </template>

            <div class="usage-section">
                <h3 class="usage-subtitle">1. 通过 text 属性传入内容</h3>
                <pre class="code-block"><code>&lt;BaseTag text="默认标签" /&gt;

&lt;BaseTag type="success" text="审核通过" /&gt;

&lt;BaseTag type="danger" effect="plain" text="已禁用" /&gt;</code></pre>

                <h3 class="usage-subtitle">2. 通过默认插槽传入内容</h3>
                <pre class="code-block"><code>&lt;BaseTag type="primary"&gt;
  自定义内容
&lt;/BaseTag&gt;

&lt;BaseTag type="success" round closable @close="handleClose"&gt;
  可关闭标签
&lt;/BaseTag&gt;</code></pre>

                <h3 class="usage-subtitle">3. 使用图标</h3>
                <pre class="code-block"><code>&lt;BaseTag type="warning"&gt;
  &lt;template #icon&gt;
    &lt;el-icon&gt;&lt;Warning /&gt;&lt;/el-icon&gt;
  &lt;/template&gt;
  警告
&lt;/BaseTag&gt;

&lt;BaseTag type="info" icon="Bell" text="通知" /&gt;</code></pre>

                <h3 class="usage-subtitle">4. 尺寸和圆角</h3>
                <pre class="code-block"><code>&lt;BaseTag size="large" text="大标签" /&gt;
&lt;BaseTag size="default" text="默认标签" /&gt;
&lt;BaseTag size="small" text="小标签" /&gt;

&lt;BaseTag round text="圆角标签" /&gt;
&lt;BaseTag circle text="圆" /&gt;</code></pre>
            </div>
        </Card>

        <!-- 属性说明 -->
        <Card class="props-card" :border-radius="16">
            <template #header>
                <span class="header-title">属性说明</span>
            </template>

            <el-table :data="propsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="属性" width="120" />
                <el-table-column prop="type" label="类型" width="180" />
                <el-table-column prop="default" label="默认值" width="100" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 事件说明 -->
        <Card class="events-card" :border-radius="16">
            <template #header>
                <span class="header-title">事件说明</span>
            </template>

            <el-table :data="eventsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="事件名" width="120" />
                <el-table-column prop="args" label="参数" width="180" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 插槽说明 -->
        <Card class="slots-card" :border-radius="16">
            <template #header>
                <span class="header-title">插槽说明</span>
            </template>

            <el-table :data="slotsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="插槽名" width="120" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 实际应用预览 -->
        <Card class="app-preview-card" :border-radius="16">
            <template #header>
                <span class="header-title">实际应用预览</span>
            </template>

            <div class="app-examples">
                <h3 class="example-title">状态标签</h3>
                <div class="example-row">
                    <BaseTag type="success" round text="已完成" />
                    <BaseTag type="warning" round text="进行中" />
                    <BaseTag type="info" round text="待处理" />
                    <BaseTag type="danger" round text="已取消" />
                    <BaseTag text="草稿" />
                </div>

                <h3 class="example-title">用户角色</h3>
                <div class="example-row">
                    <BaseTag type="primary" text="管理员" />
                    <BaseTag type="success" text="编辑" />
                    <BaseTag type="warning" text="审核员" />
                    <BaseTag type="info" text="访客" />
                </div>

                <h3 class="example-title">表格中的标签</h3>
                <el-table :data="tableData" style="width: 100%"
                    :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                    <el-table-column prop="id" label="ID" width="80" />
                    <el-table-column prop="name" label="名称" width="150" />
                    <el-table-column label="状态" width="120">
                        <template #default="{ row }">
                            <BaseTag :type="getStatusType(row.status) as 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default'" round :text="row.status" />
                        </template>
                    </el-table-column>
                    <el-table-column label="标签">
                        <template #default="{ row }">
                            <div class="inline-tags">
                                <BaseTag v-for="(tag, idx) in row.tags" :key="idx" :type="tag.type" effect="plain"
                                    size="small" round style="margin-right: 4px;">
                                    {{ tag.text }}
                                </BaseTag>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>

                <h3 class="example-title">可关闭标签组</h3>
                <div class="example-row">
                    <BaseTag v-for="tag in closeableTags" :key="tag.id"
                        :type="tag.type as 'primary' | 'success' | 'warning' | 'info' | 'danger' | 'default'" round
                        closable :text="tag.text" @close="removeTag(tag)" style="margin-right: 8px;" />
                    <el-button size="small" @click="addTag">
                        <el-icon style="margin-right: 4px;">
                            <Plus />
                        </el-icon>
                        添加标签
                    </el-button>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { CopyDocument, Promotion, CircleCheck, Warning, Plus } from '@element-plus/icons-vue'
import BaseTag from '@/components/BaseTag/index.vue'
import IconButton from '@/components/IconButton/index.vue'

// 属性列表
const propsList = [
    { name: 'type', type: "'default' | 'primary' | 'success' | 'info' | 'warning' | 'danger'", default: "'default'", description: '标签类型' },
    { name: 'effect', type: "'dark' | 'light' | 'plain'", default: "'light'", description: '主题风格' },
    { name: 'size', type: "'large' | 'default' | 'small'", default: "'default'", description: '尺寸大小' },
    { name: 'round', type: 'boolean', default: 'false', description: '是否圆角' },
    { name: 'circle', type: 'boolean', default: 'false', description: '是否圆形' },
    { name: 'closable', type: 'boolean', default: 'false', description: '是否可关闭' },
    { name: 'disableTransitions', type: 'boolean', default: 'false', description: '是否禁用过渡动画' },
    { name: 'text', type: 'string', default: '-', description: '标签文本内容' },
    { name: 'icon', type: 'string | object', default: '-', description: '左侧图标，支持图标名称或组件' }
]

// 事件列表
const eventsList = [
    { name: 'close', args: '(event: MouseEvent)', description: '点击关闭按钮时触发' },
    { name: 'click', args: '(event: MouseEvent)', description: '点击标签时触发' }
]

// 插槽列表
const slotsList = [
    { name: 'default', description: '标签默认内容（未设置 text 属性时通过插槽传入文本）' },
    { name: 'icon', description: '自定义左侧图标内容' }
]

// 表格数据
const tableData = [
    {
        id: 1,
        name: '订单 A001',
        status: '已完成',
        tags: [
            { type: 'primary', text: 'VIP' },
            { type: 'success', text: '优惠' }
        ]
    },
    {
        id: 2,
        name: '订单 A002',
        status: '进行中',
        tags: [
            { type: 'warning', text: '加急' },
            { type: 'info', text: '预售' }
        ]
    },
    {
        id: 3,
        name: '订单 A003',
        status: '待处理',
        tags: [
            { type: 'danger', text: '超时' }
        ]
    },
    {
        id: 4,
        name: '订单 A004',
        status: '已取消',
        tags: []
    }
]

// 状态类型映射
function getStatusType(status: string) {
    const map: Record<string, string> = {
        '已完成': 'success',
        '进行中': 'warning',
        '待处理': 'info',
        '已取消': 'danger',
        '草稿': 'default'
    }
    return map[status] || 'default'
}

// 可关闭标签
const closeableTags = ref([
    { id: 1, type: 'primary', text: '前端' },
    { id: 2, type: 'success', text: '后端' },
    { id: 3, type: 'warning', text: '设计' },
    { id: 4, type: 'info', text: '测试' }
])

function removeTag(tag: { id: number; text: string }) {
    closeableTags.value = closeableTags.value.filter(t => t.id !== tag.id)
    ElMessage.info(`已移除: ${tag.text}`)
}

function addTag() {
    const types = ['primary', 'success', 'warning', 'info', 'danger']
    const texts = ['新标签', '额外', '补充']
    const id = Date.now()
    closeableTags.value.push({
        id,
        type: types[Math.floor(Math.random() * types.length)],
        text: texts[Math.floor(Math.random() * texts.length)] + ' ' + closeableTags.value.length
    })
}

// 关闭处理
function handleClose() {
    ElMessage.info('标签已关闭')
}

// 复制代码
async function copyCode() {
    const code = `<!-- 基础用法 -->
<BaseTag text="默认标签" />
<BaseTag type="primary" text="主要标签" />
<BaseTag type="success" effect="dark" text="成功标签" />

<!-- 圆角和可关闭 -->
<BaseTag type="warning" round closable @close="handleClose">
  点击关闭
</BaseTag>

<!-- 使用图标 -->
<BaseTag type="danger">
  <template #icon>
    <el-icon><Warning /></el-icon>
  </template>
  高风险
</BaseTag>`

    try {
        await navigator.clipboard.writeText(code)
        ElMessage.success('代码已复制到剪贴板')
    } catch {
        const textarea = document.createElement('textarea')
        textarea.value = code
        document.body.appendChild(textarea)
        textarea.select()
        try {
            document.execCommand('copy')
            ElMessage.success('代码已复制到剪贴板')
        } catch {
            ElMessage.error('复制失败')
        }
        document.body.removeChild(textarea)
    }
}
</script>

<style scoped lang="scss">
// 卡片骨架、介绍区、预览区、代码块、API 表、应用预览等通用样式
// 均来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.inline-tags {
    display: flex;
    flex-wrap: wrap;
}
</style>
