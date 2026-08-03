<template>
  <div class="timeline-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">Timeline 时间线</h1>
        <p class="intro-text">
          Timeline 组件用于展示时间线信息，支持默认（左侧轴线）和交替（左右交替）两种布局模式，
          可配置节点类型颜色、图标、时间戳等参数，通过 items 数组传入数据，
          同时支持自定义内容插槽。适用于流程追踪、操作日志、版本更新记录等场景。
        </p>
        <div class="intro-tips">
          <p>
            <strong>提示：</strong>
            每个 TimelineItem 可设置 type（primary/success/warning/danger/info）控制节点颜色，
            支持 icon 自定义图标，alternate 模式下内容会左右交替展示。
            通过 #content 插槽可完全自定义内容渲染。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            Timeline 是一个独立组件，可直接在页面中引入使用。
            导入路径：<span class="code-inline">import Timeline from '@/components/Timeline/index.vue'</span>
          </p>
        </div>
      </div>
    </Card>

    <!-- 2. preview-card -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">效果预览</span>
        </div>
      </template>

      <!-- 模式切换 -->
      <div class="preview-tabs">
        <el-radio-group v-model="activeMode">
          <el-radio-button value="default">默认模式</el-radio-button>
          <el-radio-button value="alternate">交替模式</el-radio-button>
          <el-radio-button value="custom">自定义内容</el-radio-button>
          <el-radio-button value="reverse">反转</el-radio-button>
        </el-radio-group>
      </div>

      <div class="preview-demo">
        <!-- 默认模式 -->
        <Timeline
          v-if="activeMode === 'default'"
          :items="previewItems"
        />

        <!-- 交替模式 -->
        <Timeline
          v-else-if="activeMode === 'alternate'"
          :items="previewItems"
          alternate
        />

        <!-- 自定义内容 -->
        <Timeline
          v-else-if="activeMode === 'custom'"
          :items="customItems"
        >
          <template #default="{ item }">
            <div class="custom-timeline-card" :class="`custom-timeline-card--${item.type}`">
              <div class="custom-card-header">
                <el-icon :size="18"><component :is="item.icon" /></el-icon>
                <span class="custom-card-title">{{ item.title }}</span>
              </div>
              <p class="custom-card-body">{{ item.content }}</p>
              <div class="custom-card-footer">
                <el-tag size="small" :type="item.type">{{ item.timestamp }}</el-tag>
              </div>
            </div>
          </template>
        </Timeline>

        <!-- 反转模式 -->
        <Timeline
          v-else-if="activeMode === 'reverse'"
          :items="[...previewItems].reverse()"
          reverse
        />
      </div>
    </Card>

    <!-- 3. usage-card -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">基础用法</span>
        </div>
      </template>
      <div class="usage-section">
        <h3 class="usage-subtitle">基础时间线</h3>
        <p class="demo-desc">传入 items 数组即可展示时间线。</p>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;Timeline :items="items" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import Timeline from '@/components/Timeline/index.vue'
import type { TimelineItem } from '@/components/Timeline/index.vue'

const items: TimelineItem[] = [
  { title: '创建项目', content: '初始化仓库', timestamp: '2024-01-01', type: 'primary' },
  { title: '开发功能', content: '完成核心模块', timestamp: '2024-01-15', type: 'success' },
  { title: '测试上线', content: '通过验收测试', timestamp: '2024-02-01', type: 'warning' },
]
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">交替模式</h3>
        <p class="demo-desc">使用 alternate 属性开启左右交替布局。</p>
        <pre class="code-block"><code>&lt;Timeline :items="items" alternate /&gt;</code></pre>

        <h3 class="usage-subtitle">节点类型与图标</h3>
        <p class="demo-desc">通过 type 控制颜色，icon 自定义图标。</p>
        <pre class="code-block"><code>const items: TimelineItem[] = [
  { title: '成功', type: 'success', icon: Check, timestamp: '10:00' },
  { title: '警告', type: 'warning', icon: Warning, timestamp: '11:00' },
  { title: '错误', type: 'danger', icon: Close, timestamp: '12:00' },
  { title: '信息', type: 'info', icon: InfoFilled, timestamp: '13:00' },
]</code></pre>

        <h3 class="usage-subtitle">自定义内容插槽</h3>
        <p class="demo-desc">通过默认插槽完全自定义每项的内容渲染。</p>
        <pre class="code-block" v-pre><code>&lt;Timeline :items="items"&gt;
  &lt;template #default="{ item, index }"&gt;
    &lt;div class="my-card"&gt;
      &lt;h4&gt;{{ item.title }}&lt;/h4&gt;
      &lt;p&gt;{{ item.content }}&lt;/p&gt;
      &lt;span&gt;{{ item.timestamp }}&lt;/span&gt;
    &lt;/div&gt;
  &lt;/template&gt;
&lt;/Timeline&gt;</code></pre>

        <h3 class="usage-subtitle">反转方向</h3>
        <p class="demo-desc">使用 reverse 属性反转时间线方向。</p>
        <pre class="code-block"><code>&lt;Timeline :items="items" reverse /&gt;

&lt;!-- 或手动反转数组 --&gt;
&lt;Timeline :items="[...items].reverse()" /&gt;</code></pre>
      </div>
    </Card>

    <!-- 4. props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">属性说明</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="propsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="参数" width="140" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="default" label="默认值" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 5. item-props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">TimelineItem 数据结构</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="itemPropsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="字段" width="120" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="default" label="默认值" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 6. slots-card -->
    <Card class="slots-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">插槽说明</span>
        </div>
      </template>
      <el-table class="api-table" size="small" :data="slotsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="插槽名" width="120" />
        <el-table-column prop="scope" label="作用域" width="220" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 7. app-preview-card -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">实际应用</span>
        </div>
      </template>
      <div class="app-examples">
        <div class="example-title">订单流程追踪</div>
        <div class="example-row">
          <Timeline :items="orderItems" />
        </div>

        <div class="example-title">版本更新日志</div>
        <div class="example-row">
          <Timeline :items="versionItems" alternate />
        </div>

        <div class="example-title">系统操作日志</div>
        <div class="example-row">
          <Timeline :items="logItems">
            <template #default="{ item }">
              <div class="log-item">
                <el-tag :type="item.type" size="small" effect="plain">{{ item.title }}</el-tag>
                <span class="log-desc">{{ item.content }}</span>
                <span class="log-time">{{ item.timestamp }}</span>
              </div>
            </template>
          </Timeline>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Card from '@/components/Card/index.vue'
import Timeline from '@/components/Timeline/index.vue'
import type { TimelineItem } from '@/components/Timeline/index.vue'
import {
  Check,
  Warning,
  InfoFilled,
  Upload,
  Bell,
  Edit,
  Delete,
} from '@element-plus/icons-vue'

const activeMode = ref<'default' | 'alternate' | 'custom' | 'reverse'>('default')

// 预览数据
const previewItems: TimelineItem[] = [
  {
    title: '项目启动',
    content: '需求确认，团队组建完毕',
    timestamp: '2024-01-01 09:00',
    type: 'primary',
    icon: Bell,
  },
  {
    title: '需求评审',
    content: '完成需求文档评审，确定开发范围',
    timestamp: '2024-01-03 14:00',
    type: 'info',
    icon: InfoFilled,
  },
  {
    title: '开发阶段',
    content: '前端 + 后端并行开发，每日站会同步进度',
    timestamp: '2024-01-05 10:00',
    type: 'warning',
    icon: Edit,
  },
  {
    title: '联调测试',
    content: '前后端联调，修复缺陷 12 个',
    timestamp: '2024-01-15 16:00',
    type: 'warning',
    icon: Warning,
  },
  {
    title: '上线发布',
    content: '通过验收，正式部署生产环境',
    timestamp: '2024-01-20 20:00',
    type: 'success',
    icon: Check,
  },
]

// 自定义内容数据
const customItems: TimelineItem[] = [
  { title: '上传文件', content: '用户上传了 avatar.jpg', timestamp: '10:32', type: 'primary', icon: Upload },
  { title: '编辑资料', content: '修改了昵称和头像', timestamp: '10:35', type: 'info', icon: Edit },
  { title: '删除记录', content: '删除了 3 条历史记录', timestamp: '10:40', type: 'danger', icon: Delete },
  { title: '操作完成', content: '所有操作已同步', timestamp: '10:45', type: 'success', icon: Check },
]

// 订单流程
const orderItems: TimelineItem[] = [
  { title: '提交订单', content: '订单号：ORD-2024-001', timestamp: '2024-03-01 08:00', type: 'primary' },
  { title: '支付成功', content: '微信支付 ¥299.00', timestamp: '2024-03-01 08:05', type: 'success' },
  { title: '商家发货', content: '快递单号：SF1234567890', timestamp: '2024-03-01 15:00', type: 'info' },
  { title: '确认收货', content: '用户已签收', timestamp: '2024-03-03 12:00', type: 'success' },
  { title: '交易完成', content: '订单已完结', timestamp: '2024-03-05 12:00', type: 'info' },
]

// 版本日志
const versionItems: TimelineItem[] = [
  { title: 'v2.0.0', content: '全新架构重构，性能提升 50%', timestamp: '2024-06-01', type: 'primary' },
  { title: 'v1.5.0', content: '新增文件上传组件，优化时间线', timestamp: '2024-05-15', type: 'success' },
  { title: 'v1.4.0', content: '修复若干已知问题', timestamp: '2024-04-20', type: 'info' },
  { title: 'v1.3.0', content: '新增暗色主题支持', timestamp: '2024-03-10', type: 'info' },
  { title: 'v1.0.0', content: '首次发布', timestamp: '2024-01-01', type: 'warning' },
]

// 操作日志
const logItems: TimelineItem[] = [
  { title: 'LOGIN', content: '管理员从 192.168.1.100 登录', timestamp: '09:00:12', type: 'success' },
  { title: 'CREATE', content: '新建用户「张三」', timestamp: '09:15:30', type: 'primary' },
  { title: 'UPDATE', content: '修改角色权限', timestamp: '09:30:45', type: 'warning' },
  { title: 'DELETE', content: '删除菜单项「旧功能」', timestamp: '10:00:00', type: 'danger' },
  { title: 'LOGOUT', content: '管理员退出登录', timestamp: '11:00:00', type: 'info' },
]

// Props 数据
const propsData = [
  { name: 'items', type: 'TimelineItem[]', default: '[]', description: '时间线数据数组（必填）' },
  { name: 'alternate', type: 'boolean', default: 'false', description: '是否左右交替展示' },
  { name: 'reverse', type: 'boolean', default: 'false', description: '是否反转方向（最新在上）' },
  { name: 'lineColor', type: 'string', default: 'var(--el-border-color)', description: '轴线颜色（CSS 变量）' },
  { name: 'nodeSize', type: 'number', default: '24', description: '节点圆点大小（像素）' },
]

// Item 字段
const itemPropsData = [
  { name: 'id', type: 'string | number', default: '-', description: '唯一标识（可选，用于 key）' },
  { name: 'title', type: 'string', default: '-', description: '标题' },
  { name: 'content', type: 'string', default: '-', description: '内容描述' },
  { name: 'timestamp', type: 'string', default: '-', description: '时间戳文字' },
  { name: 'type', type: "'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'primary'", description: '节点类型（控制颜色）' },
  { name: 'icon', type: 'Component', default: '-', description: '节点图标组件' },
]

// Slots 数据
const slotsData = [
  { name: 'default', scope: '{ item: TimelineItem, index: number }', description: '自定义每项内容（默认模式）' },
  { name: 'content', scope: '{ item: TimelineItem, index: number }', description: '自定义每项内容（alternate 模式左右通用）' },
]
</script>

<style scoped lang="scss">
.preview-tabs {
  margin-bottom: 20px;
}

.preview-demo {
  padding: 24px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
}

// 自定义内容卡片
.custom-timeline-card {
  display: inline-block;
  max-width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 1px solid var(--el-border-color-lighter);
  background: var(--el-bg-color);

  &--primary { border-left: 3px solid var(--el-color-primary); }
  &--success { border-left: 3px solid var(--el-color-success); }
  &--warning { border-left: 3px solid var(--el-color-warning); }
  &--danger { border-left: 3px solid var(--el-color-danger); }
  &--info { border-left: 3px solid var(--el-color-info); }

  .custom-card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
    color: var(--el-text-color-primary);
  }

  .custom-card-title {
    font-size: 14px;
    font-weight: 600;
  }

  .custom-card-body {
    margin: 0 0 8px;
    font-size: 13px;
    color: var(--el-text-color-regular);
    line-height: 1.6;
  }

  .custom-card-footer {
    display: flex;
    gap: 8px;
  }
}

// 日志项
.log-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  font-size: 13px;

  .log-desc {
    color: var(--el-text-color-regular);
    flex: 1;
  }

  .log-time {
    color: var(--el-text-color-secondary);
    font-size: 12px;
    white-space: nowrap;
  }
}
</style>
