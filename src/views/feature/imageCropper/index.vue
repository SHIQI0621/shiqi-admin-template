<template>
    <div class="image-cropper-page">
        <!-- 介绍 -->
        <Card class="intro-card" :border-radius="16">
            <div class="intro-section">
                <h2 class="intro-title">ImageCropper 图片裁剪</h2>
                <p class="intro-text">
                    ImageCropper 是一个基于 Cropper.js 封装的图片裁剪组件，支持自由裁剪、固定宽高比、多种输出格式与质量调节，适合头像上传、图片编辑等场景。
                </p>

                <div class="intro-tips">
                    <p>组件通过 v-model 绑定裁剪结果（base64 DataURL），同时提供 message 事件用于通知操作状态（成功、错误、警告、信息）。</p>
                </div>

                <div class="intro-usage">
                    <div class="usage-title">📦 独立使用</div>
                    <p>如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。ImageCropper 主要依赖于 <code class="code-inline">cropperjs</code> 和
                        <code class="code-inline">element-plus</code>，使用前请确保已安装这些依赖。组件源码地址：<a
                            href="#">ImageCropper.vue</a>，欢迎直接使用或根据需求进行二次开发。</p>
                </div>
            </div>
        </Card>

        <!-- 效果预览 -->
        <Card class="preview-card" :border-radius="16">
            <template #header>
                <div class="card-header">
                    <span class="header-title">ImageCropper 效果预览</span>
                </div>
            </template>

            <div class="preview-section">
                <h3 class="section-title">基础裁剪：</h3>
                <div class="preview-group">
                    <ImageCropper v-model="basicResult" @message="handleMessage" />
                </div>

                <h3 class="section-title">固定宽高比：</h3>
                <div class="preview-group">
                    <div class="demo-controls">
                        <el-form :inline="true">
                            <el-form-item label="宽高比">
                                <el-radio-group v-model="currentRatio" @change="handleRatioChange">
                                    <el-radio-button :value="0">自由</el-radio-button>
                                    <el-radio-button :value="1">1:1</el-radio-button>
                                    <el-radio-button :value="1.33">4:3</el-radio-button>
                                    <el-radio-button :value="1.77">16:9</el-radio-button>
                                </el-radio-group>
                            </el-form-item>
                        </el-form>
                    </div>
                    <ImageCropper v-model="ratioResult" :aspect-ratio="currentRatio" @message="handleMessage" />
                </div>

                <h3 class="section-title">自定义输出格式：</h3>
                <div class="preview-group">
                    <div class="demo-controls">
                        <el-form :inline="true">
                            <el-form-item label="格式">
                                <el-select v-model="format" style="width: 150px">
                                    <el-option label="PNG" value="image/png" />
                                    <el-option label="JPEG" value="image/jpeg" />
                                    <el-option label="WebP" value="image/webp" />
                                </el-select>
                            </el-form-item>
                            <el-form-item label="质量">
                                <el-slider v-model="quality" :min="0.1" :max="1" :step="0.1" style="width: 150px" />
                            </el-form-item>
                        </el-form>
                    </div>
                    <ImageCropper v-model="formatResult" :format="format" :quality="quality" @message="handleMessage" />
                </div>

                <h3 class="section-title">头像裁剪：</h3>
                <div class="preview-group">
                    <div class="avatar-demo">
                        <ImageCropper v-model="avatarResult" :aspect-ratio="1" @message="handleMessage" />
                        <div v-if="avatarResult" class="avatar-preview">
                            <div class="avatar-preview__title">效果预览</div>
                            <div class="avatar-preview__sizes">
                                <div class="avatar-preview__item" v-for="size in [40, 64, 100, 150]" :key="size">
                                    <img :src="avatarResult"
                                        :style="{ width: size + 'px', height: size + 'px', borderRadius: '50%', objectFit: 'cover' as const }" />
                                    <span>{{ size }}x{{ size }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Card>

        <!-- 基础用法 -->
        <Card class="usage-card" :border-radius="16">
            <template #header>
                <span class="header-title">基础用法</span>
            </template>

            <div class="usage-section">
                <h3 class="usage-subtitle">1. 基础裁剪</h3>
                <pre class="code-block"><code>&lt;template&gt;
                &lt;ImageCropper v-model="result" @message="handleMessage" /&gt;
                &lt;/template&gt;

                &lt;script setup lang="ts"&gt;
                import { ref } from 'vue'
                import { ElMessage } from 'element-plus'

                const result = ref('')

                function handleMessage(type, message) {
                ElMessage[type](message)
                }
                &lt;/script&gt;</code></pre>

                <h3 class="usage-subtitle">2. 固定宽高比</h3>
                <pre class="code-block"><code>&lt;ImageCropper v-model="result" :aspect-ratio="1" @message="handleMessage" /&gt;

                &lt;!-- 1:1 正方形 --&gt;
                &lt;ImageCropper v-model="result" :aspect-ratio="1" /&gt;
                &lt;!-- 4:3 --&gt;
                &lt;ImageCropper v-model="result" :aspect-ratio="1.33" /&gt;
                &lt;!-- 16:9 --&gt;
                &lt;ImageCropper v-model="result" :aspect-ratio="1.77" /&gt;
                &lt;!-- 自由比例 --&gt;
                &lt;ImageCropper v-model="result" :aspect-ratio="0" /&gt;</code></pre>

                <h3 class="usage-subtitle">3. 自定义输出格式与质量</h3>
                <pre class="code-block"><code>&lt;ImageCropper
                v-model="result"
                format="image/jpeg"
                :quality="0.8"
                @message="handleMessage"
                /&gt;

                &lt;!-- 支持的格式：image/png、image/jpeg、image/webp --&gt;
                &lt;!-- quality 仅对 jpeg 和 webp 格式有效，取值范围 0.1 ~ 1 --&gt;</code></pre>

                <h3 class="usage-subtitle">4. 限制裁剪尺寸</h3>
                <pre class="code-block"><code>&lt;ImageCropper
                v-model="result"
                :min-width="100"
                :min-height="100"
                :max-width="800"
                :max-height="800"
                @message="handleMessage"
                /&gt;</code></pre>
            </div>
        </Card>

        <!-- 属性说明 -->
        <Card class="props-card" :border-radius="16">
            <template #header>
                <span class="header-title">属性说明</span>
            </template>

            <el-table :data="propsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="属性" width="140" />
                <el-table-column prop="type" label="类型" width="220" />
                <el-table-column prop="default" label="默认值" width="120" />
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
                <el-table-column prop="name" label="事件名" width="180" />
                <el-table-column prop="args" label="参数" width="200" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 实际应用预览 -->
        <Card class="app-preview-card" :border-radius="16">
            <template #header>
                <span class="header-title">实际应用预览</span>
            </template>

            <div class="app-examples">
                <h3 class="example-title">头像上传场景</h3>
                <div class="example-row">
                    <div class="avatar-upload-demo">
                        <ImageCropper v-model="avatarAppResult" :aspect-ratio="1" @message="handleMessage" />
                        <div class="avatar-upload-preview">
                            <el-avatar :size="80" :src="avatarAppResult" v-if="avatarAppResult">
                                <el-icon>
                                    <User />
                                </el-icon>
                            </el-avatar>
                            <el-empty v-else description="请先裁剪头像" :image-size="80" />
                        </div>
                    </div>
                </div>

                <h3 class="example-title">封面图裁剪</h3>
                <div class="example-row">
                    <ImageCropper v-model="coverResult" :aspect-ratio="1.77" @message="handleMessage" />
                    <div v-if="coverResult" class="cover-preview">
                        <div class="cover-preview__title">封面效果预览</div>
                        <img :src="coverResult" style="width: 100%; border-radius: 8px;" />
                    </div>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { User } from '@element-plus/icons-vue'

// 基础用法结果
const basicResult = ref('')

// 固定比例
const currentRatio = ref(0)
const ratioResult = ref('')

function handleRatioChange(val: string | number | boolean | undefined): any {
    currentRatio.value = Number(val) || 0
}

// 自定义格式
const format = ref<'image/png' | 'image/jpeg' | 'image/webp'>('image/png')
const quality = ref(0.92)
const formatResult = ref('')

// 头像使用
const avatarResult = ref('')

// 实际应用预览
const avatarAppResult = ref('')
const coverResult = ref('')

// 处理组件消息
function handleMessage(type: 'success' | 'error' | 'warning' | 'info', message: string) {
    ElMessage[type](message)
}

// 属性列表
const propsList = [
    { name: 'modelValue', type: 'string', default: '-', description: '裁剪后的图片 base64 数据（v-model 绑定）' },
    { name: 'aspectRatio', type: 'number', default: '0', description: '裁剪框固定宽高比，0 表示自由比例' },
    { name: 'minWidth', type: 'number', default: '0', description: '裁剪最小宽度限制（像素）' },
    { name: 'minHeight', type: 'number', default: '0', description: '裁剪最小高度限制（像素）' },
    { name: 'maxWidth', type: 'number', default: '0', description: '裁剪最大宽度限制（像素）' },
    { name: 'maxHeight', type: 'number', default: '0', description: '裁剪最大高度限制（像素）' },
    { name: 'format', type: "'image/png' | 'image/jpeg' | 'image/webp'", default: "'image/png'", description: '输出图片格式' },
    { name: 'quality', type: 'number', default: '0.92', description: '输出图片质量（仅对 jpeg/webp 有效，取值 0.1 ~ 1）' },
]

// 事件列表
const eventsList = [
    { name: 'update:modelValue', args: '(value: string)', description: '裁剪结果变化时触发，用于 v-model 更新' },
    { name: 'change', args: '(dataUrl: string)', description: '裁剪完成后触发，返回裁剪结果的 DataURL' },
    { name: 'error', args: '(message: string)', description: '裁剪过程中出现错误时触发' },
    { name: 'message', args: '(type: "success" | "error" | "warning" | "info", message: string)', description: '组件操作状态消息通知' },
]
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.demo-controls {
    margin-bottom: 16px;
}

.avatar-demo {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 16px;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.avatar-preview {
    padding: 16px;
    background: #fff;
    border-radius: 8px;
    border: 1px solid var(--el-border-color-lighter);

    &__title {
        font-weight: 500;
        margin-bottom: 12px;
        color: var(--el-text-color-primary);
    }

    &__sizes {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    &__item {
        display: flex;
        align-items: center;
        gap: 12px;

        img {
            border: 2px solid var(--el-border-color);
        }

        span {
            color: var(--el-text-color-secondary);
            font-size: 12px;
        }
    }
}

.avatar-upload-demo {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 16px;
    align-items: start;

    @media (max-width: 768px) {
        grid-template-columns: 1fr;
    }
}

.avatar-upload-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding-top: 16px;
}

.cover-preview {
    margin-top: 16px;

    &__title {
        font-weight: 500;
        margin-bottom: 8px;
        color: var(--el-text-color-primary);
    }
}
</style>
