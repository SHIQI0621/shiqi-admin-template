<template>
    <div class="copy-text-page">
        <!-- 介绍 -->
        <Card class="intro-card" :border-radius="16">
            <div class="intro-section">
                <h2 class="intro-title">CopyText 复制文本</h2>
                <p class="intro-text">
                    CopyText 提供了两种复制文本的方式：一是 CopyText 组件，用于在模板中快速展示可复制的文本片段；二是 useCopyText
                    组合式函数（Hook），提供更灵活的编程式调用能力，适合在表格、表单等复杂场景中使用。
                </p>

                <div class="intro-tips">
                    <p>组件内置了文本截断和 Tooltip 提示功能，适合展示较长的文本。Hook 则提供了更底层的复制控制，支持自定义成功提示文案和静默复制模式。</p>
                </div>

                <div class="intro-usage">
                    <div class="usage-title">📦 独立使用</div>
                    <p>如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。CopyText 组件和 useCopyText Hook 主要依赖于 <code
                            class="code-inline">element-plus</code>，使用前请确保已安装该依赖。组件源码地址：<a
                            href="#">CopyText.vue</a>，Hook 源码地址：<a href="#">useCopyText.ts</a>，欢迎直接使用或根据需求进行二次开发。</p>
                </div>
            </div>
        </Card>

        <!-- 效果预览 -->
        <Card class="preview-card" :border-radius="16">
            <template #header>
                <div class="card-header">
                    <span class="header-title">CopyText 效果预览</span>
                </div>
            </template>

            <div class="preview-section">
                <h3 class="section-title">Hook 基础用法：</h3>
                <div class="preview-group">
                    <div class="copy-demo">
                        <span class="copy-text">{{ demoText }}</span>
                        <el-button :type="copyText.copied ? 'success' : 'primary'" @click="copyText.copy(demoText)">
                            {{ copyText.copied ? '已复制' : '复制' }}
                        </el-button>
                    </div>
                </div>

                <h3 class="section-title">长文本截断：</h3>
                <div class="preview-group">
                    <div class="copy-demo">
                        <span class="copy-text">{{ longText }}</span>
                        <el-button :type="copyLong.copied ? 'success' : 'primary'" @click="copyLong.copy(longText)">
                            {{ copyLong.copied ? '已复制' : '复制' }}
                        </el-button>
                    </div>
                </div>

                <h3 class="section-title">表格中的使用：</h3>
                <div class="preview-group">
                    <el-table :data="tableData" border style="width: 100%">
                        <el-table-column prop="id" label="ID" width="80" />
                        <el-table-column prop="name" label="名称" />
                        <el-table-column label="编码">
                            <template #default="{ row }">
                                <div class="copy-demo">
                                    <span class="copy-text">{{ row.code }}</span>
                                    <el-button size="small" :type="getCopyState(row.code) ? 'success' : 'primary'"
                                        @click="handleRowCopy(row.code)">
                                        {{ getCopyState(row.code) ? '已复制' : '复制' }}
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column label="链接">
                            <template #default="{ row }">
                                <div class="copy-demo">
                                    <span class="copy-text">{{ row.url }}</span>
                                    <el-button size="small" :type="getCopyState(row.url) ? 'success' : 'primary'"
                                        @click="handleRowCopy(row.url)">
                                        {{ getCopyState(row.url) ? '已复制' : '复制' }}
                                    </el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </Card>

        <!-- 基础用法 -->
        <Card class="usage-card" :border-radius="16">
            <template #header>
                <span class="header-title">基础用法</span>
            </template>

            <div class="usage-section">
                <h3 class="usage-subtitle">1. 使用 useCopyText Hook</h3>
                <pre class="code-block"><code>import { useCopyText } from '@/hooks/useCopyText'

                const demoText = '这是一段需要复制的文本内容'
                const { copied, copy, copyToClipboard } = useCopyText({
                text: demoText,
                showMessage: true,
                message: '复制成功',
                })

                // 复制指定文本
                copy('需要复制的文本')

                // copied 状态会在 2 秒后自动重置</code></pre>

                <h3 class="usage-subtitle">2. 使用 CopyText 组件</h3>
                <pre class="code-block"><code>&lt;template&gt;
                &lt;CopyText text="这是一段可复制的文本" /&gt;

                &lt;!-- 自定义最大显示长度 --&gt;
                &lt;CopyText text="很长的文本..." :max-length="20" /&gt;

                &lt;!-- 关闭 Tooltip 提示 --&gt;
                &lt;CopyText text="文本内容" :show-tooltip="false" /&gt;
                &lt;/template&gt;

                &lt;script setup lang="ts"&gt;
                import CopyText from '@/components/CopyText/index.vue'
                &lt;/script&gt;</code></pre>

                <h3 class="usage-subtitle">3. 兼容旧浏览器（copyToClipboard）</h3>
                <pre class="code-block"><code>const { copyToClipboard } = useCopyText({
                text: '需要复制的文本',
                showMessage: false,
                })

                // copyToClipboard 会自动降级到 execCommand
                await copyToClipboard('需要复制的文本')</code></pre>
            </div>
        </Card>

        <!-- 组件属性说明 -->
        <Card class="props-card" :border-radius="16">
            <template #header>
                <span class="header-title">组件属性说明</span>
            </template>

            <el-table :data="componentPropsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="属性" width="120" />
                <el-table-column prop="type" label="类型" width="140" />
                <el-table-column prop="default" label="默认值" width="100" />
                <el-table-column prop="required" label="必填" width="60" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 组件事件 -->
        <Card class="events-card" :border-radius="16">
            <template #header>
                <span class="header-title">组件事件</span>
            </template>

            <el-table :data="componentEventsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="事件名" width="120" />
                <el-table-column prop="args" label="参数" width="180" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- Hook 参数说明 -->
        <Card class="props-card" :border-radius="16">
            <template #header>
                <span class="header-title">Hook 参数说明 (useCopyText)</span>
            </template>

            <el-table :data="hookParamsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="参数" width="140" />
                <el-table-column prop="type" label="类型" width="120" />
                <el-table-column prop="default" label="默认值" width="100" />
                <el-table-column prop="required" label="必填" width="60" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- Hook 返回值 -->
        <Card class="events-card" :border-radius="16">
            <template #header>
                <span class="header-title">Hook 返回值 (useCopyText)</span>
            </template>

            <el-table :data="hookReturnsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="属性/方法" width="160" />
                <el-table-column prop="type" label="类型" width="140" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 实际应用预览 -->
        <Card class="app-preview-card" :border-radius="16">
            <template #header>
                <span class="header-title">实际应用预览</span>
            </template>

            <div class="app-examples">
                <h3 class="example-title">API Key 复制场景</h3>
                <div class="example-row">
                    <el-descriptions :column="1" border size="small">
                        <el-descriptions-item label="API Key">
                            <div class="copy-demo">
                                <span class="copy-text">sk-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6</span>
                                <el-button size="small" type="primary" @click="copyApiKey">
                                    复制
                                </el-button>
                            </div>
                        </el-descriptions-item>
                        <el-descriptions-item label="Access Token">
                            <div class="copy-demo">
                                <span
                                    class="copy-text">eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkw</span>
                                <el-button size="small" type="primary" @click="copyAccessToken">
                                    复制
                                </el-button>
                            </div>
                        </el-descriptions-item>
                    </el-descriptions>
                </div>

                <h3 class="example-title">配置项复制场景</h3>
                <div class="example-row">
                    <el-table :data="configData" border style="width: 100%"
                        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                        <el-table-column prop="key" label="配置项" width="200" />
                        <el-table-column prop="value" label="值" />
                        <el-table-column label="操作" width="100">
                            <template #default="{ row }">
                                <el-button size="small" type="primary" @click="copyConfigValue(row.value)">
                                    复制
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref, reactive } from 'vue'
import { useCopyText } from '@/hooks/useCopyText'

defineOptions({ name: 'CopyText' })

// 基础用法
const demoText = '这是一段需要复制的文本内容'
const copyText = useCopyText({
    text: demoText,
    showMessage: true,
})

// 长文本
const longText = '这是一段非常长的需要复制的文本内容，当文本长度超过最大显示长度时会自动截断并显示省略号，点击按钮可以复制完整内容'
const copyLong = useCopyText({
    text: longText,
    showMessage: true,
})

// 表格中的复制状态
const copiedStates = reactive<Record<string, boolean>>({})

const tableData = ref([
    { id: 1, name: '用户管理', code: 'USER_MANAGE', url: '/system/user' },
    { id: 2, name: '角色管理', code: 'ROLE_MANAGE', url: '/system/role' },
    { id: 3, name: '菜单管理', code: 'MENU_MANAGE', url: '/system/menu' },
    { id: 4, name: '部门管理', code: 'DEPT_MANAGE', url: '/system/dept' },
])

async function handleRowCopy(text: string) {
    const { copy } = useCopyText({ text })
    await copy()
    copiedStates[text] = true
    setTimeout(() => {
        copiedStates[text] = false
    }, 2000)
}

function getCopyState(text: string) {
    return copiedStates[text] || false
}

// 实际应用预览 - API Key 复制
const copyApiKeyHook = useCopyText({ text: 'sk-a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6', showMessage: true })
function copyApiKey() {
    copyApiKeyHook.copy()
}

const copyAccessTokenHook = useCopyText({ text: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkw', showMessage: true })
function copyAccessToken() {
    copyAccessTokenHook.copy()
}

// 配置项数据
const configData = [
    { key: '数据库连接', value: 'mysql://root:password@localhost:3306/mydb' },
    { key: 'Redis 地址', value: 'redis://localhost:6379/0' },
    { key: 'API 地址', value: 'https://api.example.com/v1' },
    { key: 'WebSocket', value: 'wss://ws.example.com/socket' },
]

function copyConfigValue(value: string) {
    const { copy } = useCopyText({ text: value, showMessage: true })
    copy()
}

// 组件属性列表
const componentPropsList = [
    { name: 'text', type: 'string', default: '-', required: '是', description: '需要复制的文本内容' },
    { name: 'maxLength', type: 'number', default: '30', required: '否', description: '文本最大显示长度，超出部分显示省略号' },
    { name: 'showTooltip', type: 'boolean', default: 'true', required: '否', description: '是否在截断时显示完整文本的 Tooltip 提示' },
]

// 组件事件列表
const componentEventsList = [
    { name: 'copied', args: '(text: string)', description: '复制成功后触发，参数为被复制的文本' },
]

// Hook 参数列表
const hookParamsList = [
    { name: 'text', type: 'string', default: '-', required: '是', description: '需要复制的文本内容' },
    { name: 'showMessage', type: 'boolean', default: 'true', required: '否', description: '复制成功时是否显示消息提示' },
    { name: 'message', type: 'string', default: '"复制成功"', required: '否', description: '自定义成功提示文案' },
]

// Hook 返回值列表
const hookReturnsList = [
    { name: 'copied', type: 'Ref<boolean>', description: '复制状态，复制成功后短暂变为 true，2 秒后自动重置' },
    { name: 'copy', type: '(text?: string) => Promise<boolean>', description: '复制指定文本到剪贴板，不传参则复制初始化时的 text' },
    { name: 'copyToClipboard', type: '(text?: string) => Promise<boolean>', description: '兼容旧浏览器的复制方法，自动降级到 execCommand' },
]
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.copy-demo {
    display: flex;
    align-items: center;
    gap: 12px;

    .copy-text {
        font-size: 14px;
        color: var(--el-text-color-primary);
        padding: 4px 8px;
        background: #fff;
        border-radius: 4px;
        flex: 1;
        word-break: break-all;
    }
}
</style>
