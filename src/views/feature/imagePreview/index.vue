<template>
    <div class="image-preview-page">
        <!-- 介绍 -->
        <Card class="intro-card" :border-radius="16">
            <div class="intro-section">
                <h2 class="intro-title">ImagePreview 图片预览</h2>
                <p class="intro-text">
                    ImagePreview 是一个全屏图片预览组件，支持多图切换、缩放拖拽、键盘导航等功能。通过 v-model 控制预览显示状态，配合图片数组实现图片画廊浏览体验。
                </p>

                <div class="intro-tips">
                    <p>组件通过 v-model 控制可见性，通过 index 属性或 v-model:index 控制当前展示的图片。支持 manual 模式通过 expose 的 show/hide
                        方法进行编程式控制。内部已集成图片切换、缩放、拖拽等交互，无需额外配置。</p>
                </div>

                <div class="intro-usage">
                    <div class="usage-title">📦 独立使用</div>
                    <p>如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。ImagePreview 主要依赖于 <code
                            class="code-inline">element-plus</code>，使用前请确保已安装该依赖。组件源码地址：<a
                            href="#">ImagePreview.vue</a>，欢迎直接使用或根据需求进行二次开发。</p>
                </div>
            </div>
        </Card>

        <!-- 效果预览 -->
        <Card class="preview-card" :border-radius="16">
            <template #header>
                <div class="card-header">
                    <span class="header-title">ImagePreview 效果预览</span>
                </div>
            </template>

            <div class="preview-section">
                <h3 class="section-title">基础图片预览：</h3>
                <div class="preview-group">
                    <div class="image-grid">
                        <div v-for="(img, index) in demoImages" :key="index" class="image-item"
                            @click="handlePreview(index)">
                            <img :src="img" :alt="'图片' + (index + 1)" />
                            <div class="image-item__overlay">
                                <el-icon :size="24">
                                    <ZoomIn />
                                </el-icon>
                            </div>
                        </div>
                    </div>
                    <ImagePreview v-model="previewVisible" :images="demoImages" :index="currentIndex"
                        @update:index="currentIndex = $event" />
                </div>

                <h3 class="section-title">图片切换控制：</h3>
                <div class="preview-group">
                    <div class="image-switcher">
                        <el-button @click="prevImage" :disabled="currentIndex <= 0">
                            <el-icon>
                                <ArrowLeft />
                            </el-icon>
                        </el-button>
                        <span class="current-index">{{ currentIndex + 1 }} / {{ demoImages.length }}</span>
                        <el-button @click="nextImage" :disabled="currentIndex >= demoImages.length - 1">
                            <el-icon>
                                <ArrowRight />
                            </el-icon>
                        </el-button>
                        <el-button type="primary" @click="previewVisible = true">
                            打开预览
                        </el-button>
                    </div>
                    <ImagePreview v-model="previewVisible" :images="demoImages" :index="currentIndex"
                        @update:index="currentIndex = $event" />
                </div>
            </div>
        </Card>

        <!-- 基础用法 -->
        <Card class="usage-card" :border-radius="16">
            <template #header>
                <span class="header-title">基础用法</span>
            </template>

            <div class="usage-section">
                <h3 class="usage-subtitle">1. 基础图片预览</h3>
                <pre class="code-block"><code>&lt;template&gt;
                &lt;img
                v-for="(img, index) in images"
                :src="img"
                @click="handlePreview(index)"
                /&gt;

                &lt;ImagePreview
                v-model="visible"
                :images="images"
                :index="currentIndex"
                @update:index="currentIndex = $event"
                /&gt;
                &lt;/template&gt;

                &lt;script setup lang="ts"&gt;
                import { ref } from 'vue'
                import ImagePreview from '@/components/ImagePreview/index.vue'

                const visible = ref(false)
                const currentIndex = ref(0)
                const images = ref([
                'https://example.com/image1.jpg',
                'https://example.com/image2.jpg',
                ])

                function handlePreview(index: number) {
                currentIndex.value = index
                visible.value = true
                }
                &lt;/script&gt;</code></pre>

                <h3 class="usage-subtitle">2. 使用 v-model:index</h3>
                <pre class="code-block"><code>&lt;ImagePreview
                v-model="visible"
                v-model:index="currentIndex"
                :images="images"
                /&gt;

                &lt;!-- currentIndex 会随用户切换图片自动更新 --&gt;</code></pre>

                <h3 class="usage-subtitle">3. 编程式控制（manual 模式）</h3>
                <pre class="code-block"><code>&lt;template&gt;
                &lt;el-button @click="showPreview"&gt;查看图片&lt;/el-button&gt;
                &lt;ImagePreview
                ref="previewRef"
                :images="images"
                preview-trigger="manual"
                /&gt;
                &lt;/template&gt;

                &lt;script setup lang="ts"&gt;
                import { ref } from 'vue'
                import ImagePreview from '@/components/ImagePreview/index.vue'

                const previewRef = ref()

                function showPreview() {
                previewRef.value?.show()
                }
                &lt;/script&gt;</code></pre>

                <h3 class="usage-subtitle">4. 自定义适应模式</h3>
                <pre class="code-block"><code>&lt;!-- 图片适应方式：contain / cover / fill / none / scale-down --&gt;
                &lt;ImagePreview
                v-model="visible"
                :images="images"
                fit="cover"
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
                <el-table-column prop="name" label="属性" width="160" />
                <el-table-column prop="type" label="类型" width="200" />
                <el-table-column prop="default" label="默认值" width="100" />
                <el-table-column prop="required" label="必填" width="60" />
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
                <el-table-column prop="name" label="事件名" width="160" />
                <el-table-column prop="args" label="参数" width="160" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- Expose 说明 -->
        <Card class="slots-card" :border-radius="16">
            <template #header>
                <span class="header-title">Expose 方法</span>
            </template>

            <el-table :data="exposeList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="方法名" width="120" />
                <el-table-column prop="args" label="参数" width="180" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 实际应用预览 -->
        <Card class="app-preview-card" :border-radius="16">
            <template #header>
                <span class="header-title">实际应用预览</span>
            </template>

            <div class="app-examples">
                <h3 class="example-title">商品图片画廊</h3>
                <div class="example-row">
                    <div class="product-gallery">
                        <div class="product-gallery__main">
                            <img :src="demoImages[currentGalleryIndex]" class="product-gallery__main-img" />
                        </div>
                        <div class="product-gallery__thumbs">
                            <div v-for="(img, index) in demoImages.slice(0, 4)" :key="index"
                                class="product-gallery__thumb" :class="{ active: index === currentGalleryIndex }"
                                @click="currentGalleryIndex = index; handleGalleryPreview()">
                                <img :src="img" />
                            </div>
                        </div>
                    </div>
                    <ImagePreview v-model="galleryVisible" :images="demoImages" :index="currentGalleryIndex"
                        @update:index="currentGalleryIndex = $event" />
                </div>

                <h3 class="example-title">相册浏览</h3>
                <div class="example-row">
                    <div class="photo-album">
                        <div v-for="(img, index) in demoImages" :key="index" class="photo-album__item"
                            @click="handleAlbumPreview(index)">
                            <img :src="img" />
                            <div class="photo-album__badge">{{ index + 1 }}</div>
                        </div>
                    </div>
                    <ImagePreview v-model="albumVisible" :images="demoImages" :index="albumIndex"
                        @update:index="albumIndex = $event" />
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from 'vue'
import { ArrowLeft, ArrowRight, ZoomIn } from '@element-plus/icons-vue'
import ImagePreview from '@/components/ImagePreview/index.vue'

defineOptions({ name: 'ImagePreviewDemo' })

const previewVisible = ref(false)
const currentIndex = ref(0)

const demoImages = ref([
    'https://picsum.photos/id/1015/400/300',
    'https://picsum.photos/id/1025/400/300',
    'https://picsum.photos/id/1035/400/300',
    'https://picsum.photos/id/1043/400/300',
    'https://picsum.photos/id/1050/400/300',
    'https://picsum.photos/id/1062/400/300',
])

function handlePreview(index: number) {
    currentIndex.value = index
    previewVisible.value = true
}

function prevImage() {
    if (currentIndex.value > 0) {
        currentIndex.value--
    }
}

function nextImage() {
    if (currentIndex.value < demoImages.value.length - 1) {
        currentIndex.value++
    }
}

// 商品画廊
const galleryVisible = ref(false)
const currentGalleryIndex = ref(0)

function handleGalleryPreview() {
    galleryVisible.value = true
}

// 相册浏览
const albumVisible = ref(false)
const albumIndex = ref(0)

function handleAlbumPreview(index: number) {
    albumIndex.value = index
    albumVisible.value = true
}

// 属性列表
const propsList = [
    { name: 'images', type: 'string[]', default: '-', required: '是', description: '图片 URL 数组，必填' },
    { name: 'modelValue', type: 'boolean', default: '-', required: '是', description: '控制预览组件的显示/隐藏（v-model 绑定）' },
    { name: 'index', type: 'number', default: '0', required: '否', description: '当前预览的图片索引，支持 v-model:index' },
    { name: 'fit', type: "'contain' | 'cover' | 'fill' | 'none' | 'scale-down'", default: "'contain'", required: '否', description: '图片在预览区域中的适应方式' },
    { name: 'previewTrigger', type: "'click' | 'manual'", default: "'manual'", required: '否', description: '预览触发方式，manual 模式需通过 expose 方法控制' },
]

// 事件列表
const eventsList = [
    { name: 'update:modelValue', args: '(value: boolean)', description: '预览显示状态变化时触发，用于 v-model 更新' },
    { name: 'update:index', args: '(index: number)', description: '当前图片索引变化时触发，用于 v-model:index' },
    { name: 'close', args: '()', description: '关闭预览时触发' },
    { name: 'switch', args: '(index: number)', description: '切换到指定图片时触发' },
]

// Expose 方法列表
const exposeList = [
    { name: 'show', args: '()', description: '手动打开预览（配合 previewTrigger="manual" 使用）' },
    { name: 'hide', args: '()', description: '手动关闭预览' },
]
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
}

.image-item {
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.2s, box-shadow 0.2s;
    position: relative;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

        .image-item__overlay {
            opacity: 1;
        }
    }

    img {
        width: 100%;
        height: 120px;
        object-fit: cover;
        display: block;
    }

    &__overlay {
        position: absolute;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
        opacity: 0;
        transition: opacity 0.2s;
    }
}

.image-switcher {
    display: flex;
    align-items: center;
    gap: 16px;

    .current-index {
        font-size: 14px;
        color: var(--el-text-color-regular);
    }
}

// 实际应用预览 - 商品画廊
.product-gallery {
    max-width: 400px;

    &__main {
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 12px;
        background: var(--el-fill-color-lighter);

        &-img {
            width: 100%;
            height: 250px;
            object-fit: contain;
            display: block;
        }
    }

    &__thumbs {
        display: flex;
        gap: 8px;
    }

    &__thumb {
        width: 80px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
        cursor: pointer;
        border: 2px solid transparent;
        transition: border-color 0.2s;

        &.active {
            border-color: var(--el-color-primary);
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        }
    }
}

// 实际应用预览 - 相册
.photo-album {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    gap: 12px;

    &__item {
        border-radius: 8px;
        overflow: hidden;
        cursor: pointer;
        position: relative;
        transition: transform 0.2s;

        &:hover {
            transform: scale(1.03);
        }

        img {
            width: 100%;
            height: 100px;
            object-fit: cover;
            display: block;
        }
    }

    &__badge {
        position: absolute;
        bottom: 8px;
        right: 8px;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
}
</style>
