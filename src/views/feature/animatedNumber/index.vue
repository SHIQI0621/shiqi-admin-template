<template>
    <div class="animated-number-page">
        <!-- 介绍 -->
        <Card :border-radius="16" class="intro-card">
            <div class="intro-section">
                <h2 class="intro-title">AnimatedNumber 数字动画</h2>
                <p class="intro-text">
                    AnimatedNumber 是一个轻量级数字滚动动画组件，支持从起始值到目标值的平滑过渡。适用于数据看板、统计报表、仪表盘等需要数字动态展示的场景。
                </p>

                <div class="intro-tips">
                    <p>组件支持前缀、后缀、千分位分隔符、小数位数等配置，同时暴露 start 和 reset 方法供外部手动控制动画的播放与重置。</p>
                </div>

                <div class="intro-usage">
                    <div class="usage-title">📦 独立使用</div>
                    <p>如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。AnimatedNumber 组件主要依赖于 <code class="code-inline">vue</code>，无其他第三方依赖。组件源码地址：<a href="#">AnimatedNumber.vue</a>，欢迎直接使用或根据需求进行二次开发。</p>
                </div>
            </div>
        </Card>

        <!-- 效果预览 -->
        <Card :border-radius="16" class="preview-card">
            <template #header>
                <div class="card-header">
                    <span class="header-title">AnimatedNumber 效果预览</span>
                </div>
            </template>

            <div class="preview-section">
                <h3 class="section-title">基础演示：</h3>
                <el-row :gutter="16">
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--primary">
                            <div class="demo-label">销售额</div>
                            <AnimatedNumber :start-value="0" :end-value="125000" :duration="2000" prefix="¥" separator class="demo-value" />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--success">
                            <div class="demo-label">访问量</div>
                            <AnimatedNumber :start-value="0" :end-value="9865" :duration="1500" suffix="次" class="demo-value" />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--warning">
                            <div class="demo-label">完成率</div>
                            <AnimatedNumber :start-value="0" :end-value="86.5" :duration="1800" :decimals="1" suffix="%" class="demo-value" />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--danger">
                            <div class="demo-label">用户数</div>
                            <AnimatedNumber :start-value="0" :end-value="1285630" :duration="2500" separator class="demo-value" />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--info">
                            <div class="demo-label">增长率</div>
                            <AnimatedNumber :start-value="0" :end-value="128.6" :duration="2000" :decimals="1" prefix="+" suffix="%" class="demo-value" />
                        </div>
                    </el-col>
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--primary">
                            <div class="demo-label">动态更新</div>
                            <AnimatedNumber ref="dynamicRef" :start-value="0" :end-value="dynamicValue" :duration="800" separator prefix="¥" class="demo-value" />
                            <el-button type="primary" size="small" @click="updateValue" class="demo-btn">更新数据</el-button>
                        </div>
                    </el-col>
                </el-row>

                <h3 class="section-title">手动触发动画：</h3>
                <el-row :gutter="16">
                    <el-col :xs="24" :sm="12" :md="8">
                        <div class="demo-card demo-card--success">
                            <div class="demo-label">点击按钮重新播放</div>
                            <AnimatedNumber ref="replayRef" :start-value="0" :end-value="5000000" :duration="3000" separator prefix="$" class="demo-value" />
                            <div class="demo-btn-group">
                                <el-button type="success" size="small" @click="replay">重新播放</el-button>
                                <el-button size="small" @click="reset">重置</el-button>
                            </div>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </Card>

        <!-- 基础用法 -->
        <Card :border-radius="16" class="usage-card">
            <template #header>
                <span class="header-title">基础用法</span>
            </template>

            <div class="usage-section">
                <h3 class="usage-subtitle">1. 基础数字动画</h3>
                <pre class="code-block">
                    <code>
                        &lt;template&gt;
                            &lt;AnimatedNumber
                                :start-value="0"
                                :end-value="125000"
                                :duration="2000"
                                prefix="¥"
                                separator
                            /&gt;
                        &lt;/template&gt;

                        &lt;script setup lang="ts"&gt;
                        import AnimatedNumber from '@/components/AnimatedNumber/index.vue'
                        &lt;/script&gt;
                    </code>
                </pre>

                <h3 class="usage-subtitle">2. 小数位与后缀</h3>
                <pre class="code-block">
                    <code>
                        &lt;AnimatedNumber
                            :start-value="0"
                            :end-value="86.5"
                            :duration="1800"
                            :decimals="1"
                            suffix="%"
                        /&gt;
                    </code>
                </pre>

                <h3 class="usage-subtitle">3. 手动控制动画</h3>
                <pre class="code-block">
                    <code>
                        &lt;template&gt;
                            &lt;AnimatedNumber ref="numberRef" :end-value="5000000" separator prefix="$" /&gt;
                            &lt;el-button @click="replay"&gt;重新播放&lt;/el-button&gt;
                            &lt;el-button @click="stop"&gt;重置&lt;/el-button&gt;
                        &lt;/template&gt;

                        &lt;script setup lang="ts"&gt;
                        import { ref } from 'vue'
                        import AnimatedNumber from '@/components/AnimatedNumber/index.vue'

                        const numberRef = ref&lt;InstanceType&lt;typeof AnimatedNumber&gt;&gt;()

                        function replay() {
                          numberRef.value?.reset()
                          setTimeout(() =&gt; numberRef.value?.start(0, 5000000), 100)
                        }

                        function stop() {
                          numberRef.value?.reset()
                        }
                        &lt;/script&gt;</code></pre>
            </div>
        </Card>

        <!-- 组件属性说明 -->
        <Card :border-radius="16" class="props-card">
            <template #header>
                <span class="header-title">组件属性说明</span>
            </template>

            <el-table :data="propsList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="属性" width="140" />
                <el-table-column prop="type" label="类型" width="100" />
                <el-table-column prop="default" label="默认值" width="100" />
                <el-table-column prop="required" label="必填" width="60" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 暴露方法 -->
        <Card :border-radius="16" class="events-card">
            <template #header>
                <span class="header-title">暴露方法 (Expose)</span>
            </template>

            <el-table :data="exposedList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="方法名" width="120" />
                <el-table-column prop="params" label="参数" width="220" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 实际应用预览 -->
        <Card :border-radius="16" class="app-preview-card">
            <template #header>
                <span class="header-title">实际应用预览</span>
            </template>

            <div class="app-examples">
                <h3 class="example-title">数据统计卡片</h3>
                <div class="example-row">
                    <el-row :gutter="20" style="width: 100%;">
                        <el-col :xs="24" :sm="8">
                            <div class="stat-item stat-item--primary">
                                <div class="stat-label">总订单</div>
                                <AnimatedNumber :start-value="0" :end-value="stats.orders" :duration="2000" separator prefix="#" class="stat-value" />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="8">
                            <div class="stat-item stat-item--success">
                                <div class="stat-label">总营收</div>
                                <AnimatedNumber :start-value="0" :end-value="stats.revenue" :duration="2200" separator prefix="¥" class="stat-value" />
                            </div>
                        </el-col>
                        <el-col :xs="24" :sm="8">
                            <div class="stat-item stat-item--warning">
                                <div class="stat-label">转化率</div>
                                <AnimatedNumber :start-value="0" :end-value="stats.conversion" :duration="1800" :decimals="2" suffix="%" class="stat-value" />
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </Card>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import AnimatedNumber from '@/components/AnimatedNumber/index.vue'

defineOptions({ name: 'AnimatedNumber' })

const dynamicRef = ref<InstanceType<typeof AnimatedNumber>>()
void dynamicRef
const replayRef = ref<InstanceType<typeof AnimatedNumber>>()
void replayRef
const dynamicValue = ref(100000)

const stats = reactive({
    orders: 12658,
    revenue: 895623.5,
    conversion: 28.65,
})

function updateValue() {
    dynamicValue.value = Math.floor(Math.random() * 500000) + 50000
}

function replay() {
    if (replayRef.value) {
        replayRef.value.reset()
        setTimeout(() => {
            if (replayRef.value) {
                replayRef.value.start(0, 5000000)
            }
        }, 100)
    }
}

function reset() {
    if (replayRef.value) {
        replayRef.value.reset()
    }
}

// 属性列表
const propsList = [
    { name: 'startValue', type: 'number', default: '0', required: '否', description: '动画起始值' },
    { name: 'endValue', type: 'number', default: '-', required: '是', description: '动画目标值' },
    { name: 'duration', type: 'number', default: '1500', required: '否', description: '动画持续时间（毫秒）' },
    { name: 'prefix', type: 'string', default: "''", required: '否', description: '数字前缀' },
    { name: 'suffix', type: 'string', default: "''", required: '否', description: '数字后缀' },
    { name: 'separator', type: 'boolean', default: 'false', required: '否', description: '是否启用千分位分隔符' },
    { name: 'decimals', type: 'number', default: '0', required: '否', description: '小数位数' },
    { name: 'autoplay', type: 'boolean', default: 'true', required: '否', description: '是否自动播放动画' },
]

// 暴露方法列表
const exposedList = [
    { name: 'start', params: '(from?: number, to?: number)', description: '手动触发动画，可指定起止值' },
    { name: 'reset', params: '()', description: '重置动画到起始状态' },
]
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

// ---------- 预览卡片（网格拆卡 + 颜色变量化） ----------
.demo-card {
    text-align: center;
    padding: 24px 16px;
    margin-bottom: 16px;
    background: var(--el-fill-color-lighter);
    border-radius: 8px;
    border-top: 3px solid transparent;
    transition: box-shadow 0.2s ease;

    &:hover {
        box-shadow: var(--el-box-shadow-light);
    }

    .demo-label {
        font-size: 14px;
        color: var(--el-text-color-secondary);
        margin-bottom: 12px;
    }

    .demo-value {
        font-size: 32px;
        font-weight: 600;
    }

    .demo-btn,
    .demo-btn-group {
        margin-top: 12px;
    }

    .demo-btn-group {
        display: flex;
        gap: 10px;
        justify-content: center;
    }

    // 各卡片通过 CSS 变量驱动不同主题色
    &--primary {
        border-top-color: var(--el-color-primary);
        .demo-value { color: var(--el-color-primary); }
    }
    &--success {
        border-top-color: var(--el-color-success);
        .demo-value { color: var(--el-color-success); }
    }
    &--warning {
        border-top-color: var(--el-color-warning);
        .demo-value { color: var(--el-color-warning); }
    }
    &--danger {
        border-top-color: var(--el-color-danger);
        .demo-value { color: var(--el-color-danger); }
    }
    &--info {
        border-top-color: var(--el-color-info);
        .demo-value { color: var(--el-color-info); }
    }
}

// ---------- 统计卡片（颜色变量化） ----------
.stat-item {
    text-align: center;
    padding: 10px 0;

    .stat-label {
        font-size: 13px;
        color: var(--el-text-color-secondary);
        margin-bottom: 8px;
    }

    .stat-value {
        font-size: 24px;
        font-weight: 600;
    }

    &--primary .stat-value { color: var(--el-color-primary); }
    &--success .stat-value { color: var(--el-color-success); }
    &--warning .stat-value { color: var(--el-color-warning); }
}
</style>
