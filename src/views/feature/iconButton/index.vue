<template>
  <div class="icon-button-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">IconButton 图标按钮</h1>
        <p class="intro-text">
          IconButton 组件在 Element Plus 按钮基础上增强了防抖/节流和自动 loading 能力。
          支持多种类型、尺寸、形状配置，可通过 trigger 属性选择防抖或节流模式，
          并通过 loadingDelay 避免 loading 状态闪烁。适用于表单提交、数据请求等高频操作场景。
        </p>
        <div class="intro-tips">
          <p><strong>提示：</strong>autoLoading 默认为 true，点击后会自动显示 loading 状态（需异步操作返回 Promise）；loadingDelay 可控制 loading 最短显示时间，避免快速操作时的闪烁。</p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">独立使用</div>
          <p>
            IconButton 是一个独立组件，可直接在页面中引入使用。
            导入路径：<span class="code-inline">import IconButton from '@/components/IconButton/index.vue'</span>
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

      <div class="preview-section">
        <div class="section-title">基础使用（点击按钮，自动显示 loading）</div>
        <div class="preview-group">
          <IconButton type="primary" @click="handleAsync('异步操作')">点击我（异步操作）</IconButton>
          <IconButton type="success" @click="handleSuccess">成功按钮</IconButton>
          <IconButton type="warning" @click="handleWarning">警告按钮</IconButton>
          <IconButton type="danger" @click="handleDanger">危险按钮</IconButton>
        </div>

        <div class="section-title">延迟显示 loading（设置 loading-delay）</div>
        <div class="preview-group">
          <IconButton
            type="primary"
            :loading-delay="100"
            @click="handleQuick('快速操作')"
          >
            快速操作（100ms 延迟，会显示 loading）
          </IconButton>
          <IconButton
            type="primary"
            :loading-delay="500"
            @click="handleQuick2('快速操作')"
          >
            快速操作（500ms 延迟，不会显示 loading）
          </IconButton>
        </div>

        <div class="section-title">使用插槽自定义内容</div>
        <div class="preview-group">
          <IconButton type="primary" @click="handleCustom">
            <template #icon>
              <el-icon><Search /></el-icon>
            </template>
            自定义按钮文本
          </IconButton>
          <IconButton type="success" round @click="handleCustom">
            <template #icon>
              <el-icon><Edit /></el-icon>
            </template>
            编辑
          </IconButton>
          <IconButton type="danger" circle @click="handleCustom">
            <el-icon><Delete /></el-icon>
          </IconButton>
        </div>

        <div class="section-title">防抖/节流配置</div>
        <div class="preview-group">
          <IconButton
            type="primary"
            :debounce-time="500"
            trigger="debounce"
            @click="handleDebounce"
          >
            防抖按钮（500ms）
          </IconButton>
          <IconButton
            type="warning"
            :throttle-time="1000"
            trigger="throttle"
            @click="handleThrottle"
          >
            节流按钮（1000ms）
          </IconButton>
          <IconButton
            type="primary"
            :auto-loading="false"
            @click="handleNoLoading"
          >
            不自动显示 loading
          </IconButton>
        </div>

        <div class="section-title">不同尺寸</div>
        <div class="demo-box">
          <div class="demo-item">
            <span class="demo-label">小号</span>
            <IconButton type="primary" size="small" @click="handleSuccess">小按钮</IconButton>
          </div>
          <div class="demo-item">
            <span class="demo-label">默认</span>
            <IconButton type="primary" @click="handleSuccess">默认按钮</IconButton>
          </div>
          <div class="demo-item">
            <span class="demo-label">大号</span>
            <IconButton type="primary" size="large" @click="handleSuccess">大按钮</IconButton>
          </div>
        </div>

        <div class="section-title">禁用状态</div>
        <div class="preview-group">
          <IconButton type="primary" disabled>禁用按钮</IconButton>
          <IconButton type="success" disabled>禁用按钮</IconButton>
          <IconButton type="warning" disabled>禁用按钮</IconButton>
          <IconButton type="danger" disabled>禁用按钮</IconButton>
        </div>
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
        <h3 class="usage-subtitle">基础按钮</h3>
        <pre class="code-block"><code>&lt;IconButton type="primary" @click="handleSubmit"&gt;提交&lt;/IconButton&gt;</code></pre>

        <h3 class="usage-subtitle">防抖模式</h3>
        <pre class="code-block"><code>&lt;IconButton type="primary" :debounce-time="500" trigger="debounce" @click="handleSave"&gt;
  保存
&lt;/IconButton&gt;</code></pre>

        <h3 class="usage-subtitle">节流模式</h3>
        <pre class="code-block"><code>&lt;IconButton type="warning" :throttle-time="1000" trigger="throttle" @click="handleRefresh"&gt;
  刷新
&lt;/IconButton&gt;</code></pre>

        <h3 class="usage-subtitle">使用 icon 插槽</h3>
        <pre class="code-block"><code>&lt;IconButton type="primary" round @click="handleEdit"&gt;
  &lt;template #icon&gt;
    &lt;el-icon&gt;&lt;Edit /&gt;&lt;/el-icon&gt;
  &lt;/template&gt;
  编辑
&lt;/IconButton&gt;</code></pre>

        <h3 class="usage-subtitle">圆形图标按钮</h3>
        <pre class="code-block"><code>&lt;IconButton type="danger" circle @click="handleDelete"&gt;
  &lt;el-icon&gt;&lt;Delete /&gt;&lt;/el-icon&gt;
&lt;/IconButton&gt;</code></pre>
      </div>
    </Card>

    <!-- 4. props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">属性说明</span>
        </div>
      </template>
      <el-table
        class="api-table"
        size="small"
        :data="propsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="180" />
        <el-table-column prop="type" label="类型" width="220" />
        <el-table-column prop="default" label="默认值" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 5. events-card -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">事件说明</span>
        </div>
      </template>
      <el-table
        class="api-table"
        size="small"
        :data="eventsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="事件名" width="160" />
        <el-table-column prop="params" label="参数" width="220" />
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
      <el-table
        class="api-table"
        size="small"
        :data="slotsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="插槽名" width="160" />
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
        <div class="example-title">表格操作列</div>
        <div class="example-row">
          <IconButton type="primary" size="small" @click="handleCustom">
            <template #icon><el-icon><Search /></el-icon></template>
            查看
          </IconButton>
          <IconButton type="warning" size="small" @click="handleCustom">
            <template #icon><el-icon><Edit /></el-icon></template>
            编辑
          </IconButton>
          <IconButton type="danger" size="small" @click="handleDanger">
            <template #icon><el-icon><Delete /></el-icon></template>
            删除
          </IconButton>
        </div>

        <div class="example-title">工具栏操作</div>
        <div class="example-row">
          <IconButton type="primary" :debounce-time="300" @click="handleCustom">
            <template #icon><el-icon><Search /></el-icon></template>
            搜索
          </IconButton>
          <IconButton type="success" :debounce-time="300" @click="handleCustom">
            <template #icon><el-icon><Edit /></el-icon></template>
            新增
          </IconButton>
          <IconButton type="info" :throttle-time="2000" trigger="throttle" @click="handleCustom">
            <template #icon><el-icon><Search /></el-icon></template>
            导出
          </IconButton>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from 'vue'
import { Search, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// Props 数据
const propsData = ref([
  { name: 'type', type: "'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info'", default: "'default'", description: '按钮类型' },
  { name: 'size', type: "'large' | 'default' | 'small'", default: "'default'", description: '按钮尺寸' },
  { name: 'plain', type: 'boolean', default: 'false', description: '是否朴素按钮' },
  { name: 'round', type: 'boolean', default: 'false', description: '是否圆角按钮' },
  { name: 'circle', type: 'boolean', default: 'false', description: '是否圆形按钮' },
  { name: 'disabled', type: 'boolean', default: 'false', description: '是否禁用' },
  { name: 'icon', type: 'string | object', default: "''", description: '按钮图标' },
  { name: 'debounceTime', type: 'number', default: '300', description: '防抖时间（毫秒）' },
  { name: 'throttleTime', type: 'number', default: '300', description: '节流时间（毫秒）' },
  { name: 'trigger', type: "'debounce' | 'throttle'", default: "'debounce'", description: '触发模式：防抖或节流' },
  { name: 'loadingDelay', type: 'number', default: '200', description: 'loading 延迟显示时间（毫秒），避免闪烁' },
  { name: 'autoLoading', type: 'boolean', default: 'true', description: '是否自动显示 loading 状态' },
])

// Events 数据
const eventsData = ref([
  { name: 'click', params: '(event: MouseEvent)', description: '按钮点击事件，经过防抖/节流处理后触发' },
])

// Slots 数据
const slotsData = ref([
  { name: 'icon', description: '自定义图标内容' },
  { name: 'default', description: '按钮文字内容' },
])

const handleAsync = (msg: string) => {
  ElMessage.success(`${msg} - 点击成功`)
}

const handleSuccess = () => {
  ElMessage.success('操作成功！')
}

const handleWarning = () => {
  ElMessage.warning('这是一个警告！')
}

const handleDanger = () => {
  ElMessage.error('危险操作！')
}

const handleQuick = (msg: string) => {
  ElMessage.info(`${msg} - 完成`)
}

const handleQuick2 = (msg: string) => {
  setTimeout(() => {
    ElMessage.info(`${msg} - 完成`)
  }, 600)
}

const handleCustom = () => {
  ElMessage.success('自定义按钮被点击')
}

const handleDebounce = () => {
  ElMessage.info('防抖触发')
}

const handleThrottle = () => {
  ElMessage.info('节流触发')
}

const handleNoLoading = () => {
  ElMessage.success('无 loading 按钮')
}
</script>

<style scoped lang="scss">
.icon-button-page .demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.icon-button-page .demo-item {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>
