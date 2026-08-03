<template>
    <div class="chart-page">
        <!-- 介绍 -->
        <Card class="intro-card" :border-radius="16">
            <div class="intro-section">
                <h2 class="intro-title">Chart 图表组件</h2>
                <p class="intro-text">
                    Chart 是基于 ECharts 封装的轻量图表组件，通过 <code class="code-inline">type</code> 属性自动渲染对应图表配置，支持饼图、柱状图、折线图、环形图、雷达图五种类型，适用于数据可视化看板等场景。
                </p>

                <div class="intro-tips">
                    <p>组件内置主题色适配，自动读取 Element Plus CSS 变量与项目主题色，切换主题时图表配色同步更新。支持自定义颜色组、tooltip、legend 等配置。</p>
                </div>

                <div class="intro-usage">
                    <div class="usage-title">📦 独立使用</div>
                    <p>如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。Chart 主要依赖于 <code class="code-inline">echarts</code> 和 <code class="code-inline">vue-echarts</code>，使用前请确保已安装该依赖。组件源码地址：<a href="#">Chart.vue</a>，欢迎直接使用或根据需求进行二次开发。</p>
                </div>
            </div>
        </Card>

        <!-- 效果预览 -->
        <Card class="preview-card" :border-radius="16">
            <template #header>
                <div class="card-header">
                    <span class="header-title">Chart 效果预览</span>
                    <BaseTag type="primary" text="ECharts" />
                </div>
            </template>

            <div class="preview-section">
                <el-tabs v-model="activeTab">
                    <el-tab-pane label="饼图" name="pie">
                        <div class="chart-demo">
                            <div class="chart-info">
                                <h3 class="section-title">饼图 (Pie Chart)</h3>
                                <p class="chart-desc">展示数据占比分布，适合显示百分比数据</p>
                            </div>
                            <Chart v-if="activeTab === 'pie'" type="pie" :data="pieData" title="销售占比" height="350px" />
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="柱状图" name="bar">
                        <div class="chart-demo">
                            <div class="chart-info">
                                <h3 class="section-title">柱状图 (Bar Chart)</h3>
                                <p class="chart-desc">适合对比不同类别的数据大小</p>
                            </div>
                            <Chart v-if="activeTab === 'bar'" type="bar" :data="barData" :x-axis-data="barXAxis" title="月度销售额" height="350px" />
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="折线图" name="line">
                        <div class="chart-demo">
                            <div class="chart-info">
                                <h3 class="section-title">折线图 (Line Chart)</h3>
                                <p class="chart-desc">适合展示数据的趋势变化</p>
                            </div>
                            <Chart v-if="activeTab === 'line'" type="line" :data="lineData" :x-axis-data="lineXAxis" title="访问量趋势" height="350px" />
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="环形图" name="doughnut">
                        <div class="chart-demo">
                            <div class="chart-info">
                                <h3 class="section-title">环形图 (Doughnut Chart)</h3>
                                <p class="chart-desc">中间可以放置文本或图标，更具视觉吸引力</p>
                            </div>
                            <Chart v-if="activeTab === 'doughnut'" type="doughnut" :data="doughnutData" title="流量来源" height="350px" />
                        </div>
                    </el-tab-pane>

                    <el-tab-pane label="雷达图" name="radar">
                        <div class="chart-demo">
                            <div class="chart-info">
                                <h3 class="section-title">雷达图 (Radar Chart)</h3>
                                <p class="chart-desc">适合多维数据的对比分析</p>
                            </div>
                            <Chart v-if="activeTab === 'radar'" type="radar" :data="radarData" title="能力评估" height="350px" />
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </div>
        </Card>

        <!-- 基础用法 -->
        <Card class="usage-card" :border-radius="16">
            <template #header>
                <span class="header-title">基础用法</span>
            </template>

            <div class="usage-section">
                <h3 class="usage-subtitle">1. 饼图</h3>
                <pre class="code-block"><code>&lt;template&gt;
  &lt;Chart type="pie" :data="pieData" title="销售占比" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
const pieData = [
  { name: '直接访问', value: 1048 },
  { name: '邮件营销', value: 735 },
  { name: '联盟广告', value: 580 },
]
&lt;/script&gt;</code></pre>

                <h3 class="usage-subtitle">2. 柱状图</h3>
                <pre class="code-block"><code>&lt;Chart
  type="bar"
  :data="barData"
  :x-axis-data="['一月', '二月', '三月']"
  title="月度销售额"
/&gt;</code></pre>

                <h3 class="usage-subtitle">3. 折线图</h3>
                <pre class="code-block"><code>&lt;Chart
  type="line"
  :data="lineData"
  :x-axis-data="['周一', '周二', '周三']"
  title="访问量趋势"
/&gt;</code></pre>

                <h3 class="usage-subtitle">4. 雷达图</h3>
                <pre class="code-block"><code>&lt;Chart
  type="radar"
  :data="radarData"
  title="能力评估"
/&gt;

// 多系列柱状图/折线图
const multiSeries = [
  { name: '产品A', data: [{ name: '一月', value: 120 }, ...] },
  { name: '产品B', data: [{ name: '一月', value: 200 }, ...] },
]
&lt;Chart type="bar" :data="multiSeries" :x-axis-data="xAxis" /&gt;</code></pre>
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
                <el-table-column prop="type" label="类型" width="220" />
                <el-table-column prop="default" label="默认值" width="100" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>

        <!-- 暴露方法 -->
        <Card class="events-card" :border-radius="16">
            <template #header>
                <span class="header-title">暴露方法 (Expose)</span>
            </template>

            <el-table :data="exposedList" class="api-table" size="small"
                :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
                <el-table-column prop="name" label="方法名" width="180" />
                <el-table-column prop="params" label="返回值" width="200" />
                <el-table-column prop="description" label="说明" />
            </el-table>
        </Card>
    </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from 'vue'
import Chart from '@/components/Chart/index.vue'
import BaseTag from '@/components/BaseTag/index.vue'

defineOptions({ name: 'ChartDemo' })

const activeTab = ref('pie')

// 饼图数据
const pieData = ref([
    { name: '直接访问', value: 1048 },
    { name: '邮件营销', value: 735 },
    { name: '联盟广告', value: 580 },
    { name: '视频广告', value: 484 },
    { name: '搜索引擎', value: 300 },
])

// 柱状图数据
const barXAxis = ref(['一月', '二月', '三月', '四月', '五月', '六月', '七月'])
const barData = ref([
    { name: '一月', value: 120 },
    { name: '二月', value: 200 },
    { name: '三月', value: 150 },
    { name: '四月', value: 80 },
    { name: '五月', value: 70 },
    { name: '六月', value: 110 },
    { name: '七月', value: 130 },
])

// 折线图数据
const lineXAxis = ref(['周一', '周二', '周三', '周四', '周五', '周六', '周日'])
const lineData = ref([
    { name: '周一', value: 820 },
    { name: '周二', value: 932 },
    { name: '周三', value: 901 },
    { name: '周四', value: 934 },
    { name: '周五', value: 1290 },
    { name: '周六', value: 1330 },
    { name: '周日', value: 1320 },
])

// 环形图数据
const doughnutData = ref([
    { name: '搜索引擎', value: 1048 },
    { name: '直接访问', value: 735 },
    { name: '邮件营销', value: 580 },
    { name: '视频广告', value: 484 },
    { name: '联盟广告', value: 300 },
])

// 雷达图数据
const radarData = ref([
    { name: '技术', value: 80 },
    { name: '沟通', value: 65 },
    { name: '执行', value: 90 },
    { name: '创新', value: 70 },
    { name: '协作', value: 85 },
    { name: '学习', value: 75 },
])

// 属性列表
const propsList = [
    { name: 'type', type: "'pie' | 'bar' | 'line' | 'radar' | 'doughnut'", default: '-', description: '图表类型（必填）' },
    { name: 'data', type: 'ChartDataItem[] | SeriesConfig[]', default: '-', description: '图表数据（必填）' },
    { name: 'xAxisData', type: 'string[]', default: '-', description: 'X 轴标签数据（柱状图/折线图）' },
    { name: 'title', type: 'string', default: "''", description: '图表标题' },
    { name: 'legend', type: 'boolean', default: 'true', description: '是否显示图例' },
    { name: 'colors', type: 'string[]', default: '主题色板', description: '自定义颜色组' },
    { name: 'showTooltip', type: 'boolean', default: 'true', description: '是否显示提示框' },
    { name: 'height', type: 'string | number', default: "'350px'", description: '图表高度' },
    { name: 'pieRadius', type: 'string | string[]', default: "'50%'", description: '饼图半径' },
    { name: 'donutInnerRadius', type: 'string', default: "'40%'", description: '环形图内半径' },
    { name: 'donutOuterRadius', type: 'string', default: "'70%'", description: '环形图外半径' },
]

// 暴露方法列表
const exposedList = [
    { name: 'getChartInstance', params: 'ECharts | undefined', description: '获取 ECharts 实例，用于调用原生 API' },
]
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.chart-demo {
    padding: 16px 0;
}

.chart-info {
    margin-bottom: 16px;

    .chart-desc {
        margin: 0;
        color: var(--el-text-color-secondary);
        font-size: 14px;
    }
}
</style>
