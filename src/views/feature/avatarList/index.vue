<template>
  <div class="avatar-list-page">
    <Card :border-radius="16" class="intro-card">
      <div class="intro-section">
        <h1 class="intro-title">AvatarList 头像列表</h1>
        <p class="intro-text">
          AvatarList 组件用于展示一组用户头像，支持堆叠、网格、列表三种布局模式。
          可配置头像尺寸、重叠比例、折叠展开、状态标识等，适用于团队成员展示、协作者列表、在线用户列表等场景。
        </p>
        <div class="intro-tips">
          <p><strong>提示：</strong>AvatarList 的 list 属性为必填项，每项数据遵循 AvatarItem 接口，支持 name、avatar、email、status 等字段，也可通过 [key:string]:any 扩展自定义字段。</p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">独立使用</div>
          <p>
            AvatarList 是一个独立组件，可直接在页面中引入使用，无需额外配置。
            导入路径：<span class="code-inline">import AvatarList from '@/components/AvatarList/index.vue'</span>
          </p>
        </div>
      </div>
    </Card>

    
    <Card :border-radius="16" class="preview-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">效果预览</span>
        </div>
      </template>

      <div class="preview-section">
        <div class="section-title">堆叠模式</div>
        <div class="preview-group">
          <AvatarList :list="avatarList" />
        </div>

        <div class="section-title">不同重叠度</div>
        <div class="demo-box">
          <div class="demo-item">
            <span class="demo-label">overlap: 0.3</span>
            <AvatarList :list="avatarList.slice(0, 5)" :overlap="0.3" />
          </div>
          <div class="demo-item">
            <span class="demo-label">overlap: 0.5</span>
            <AvatarList :list="avatarList.slice(0, 5)" :overlap="0.5" />
          </div>
          <div class="demo-item">
            <span class="demo-label">overlap: 0.7</span>
            <AvatarList :list="avatarList.slice(0, 5)" :overlap="0.7" />
          </div>
        </div>

        <div class="section-title">展示模式</div>
        <div class="demo-box">
          <div class="demo-item">
            <span class="demo-label">堆叠模式</span>
            <AvatarList :list="avatarList" mode="stack" :max="4" />
          </div>
          <div class="demo-item">
            <span class="demo-label">网格模式</span>
            <AvatarList :list="avatarList" mode="grid" :max="4" />
          </div>
          <div class="demo-item">
            <span class="demo-label">列表模式</span>
            <AvatarList :list="avatarList" mode="list" />
          </div>
        </div>

        <div class="section-title">不同尺寸</div>
        <div class="demo-box">
          <div class="demo-item">
            <span class="demo-label">小号 (24px)</span>
            <AvatarList :list="avatarList.slice(0, 4)" :size="24" />
          </div>
          <div class="demo-item">
            <span class="demo-label">中号 (36px)</span>
            <AvatarList :list="avatarList.slice(0, 4)" :size="36" />
          </div>
          <div class="demo-item">
            <span class="demo-label">大号 (56px)</span>
            <AvatarList :list="avatarList.slice(0, 4)" :size="56" />
          </div>
        </div>

        <div class="section-title">状态标识</div>
        <div class="preview-group">
          <AvatarList :list="statusList" :max="5" />
        </div>

        <div class="section-title">折叠展开</div>
        <div class="demo-box">
          <div class="demo-item">
            <span class="demo-label">折叠状态</span>
            <AvatarList :list="avatarList" :max="3" :collapsed="true" />
          </div>
          <div class="demo-item">
            <span class="demo-label">展开状态</span>
            <AvatarList :list="avatarList" :max="3" :collapsed="false" />
          </div>
        </div>

        <div class="section-title">边框样式</div>
        <div class="preview-group">
          <AvatarList :list="avatarList.slice(0, 5)" :bordered="true" />
        </div>

        <div class="section-title">点击事件</div>
        <div class="preview-group">
          <AvatarList :list="avatarList" @click="handleAvatarClick" />
        </div>
        <el-message v-if="clickInfo" type="success" :closable="false" style="margin-top: 12px;">
          {{ clickInfo }}
        </el-message>

        <div class="section-title">空数据</div>
        <div class="preview-group">
          <AvatarList :list="[]" />
        </div>
      </div>
    </Card>

    <Card :border-radius="16" class="usage-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">基础用法</span>
        </div>
      </template>
      <div class="usage-section">
        <h3 class="usage-subtitle">基础堆叠模式</h3>
        <pre class="code-block"><code>&lt;AvatarList :list="avatarList" /&gt;</code></pre>

        <h3 class="usage-subtitle">指定模式与数量限制</h3>
        <pre class="code-block"><code>&lt;AvatarList :list="avatarList" mode="grid" :max="4" /&gt;</code></pre>

        <h3 class="usage-subtitle">监听点击事件</h3>
        <pre class="code-block"><code>&lt;AvatarList :list="avatarList" @click="handleAvatarClick" /&gt;</code></pre>
      </div>
    </Card>

    <Card :border-radius="16" class="props-card">
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
        <el-table-column prop="name" label="参数" width="200" />
        <el-table-column prop="type" label="类型" width="220" />
        <el-table-column prop="default" label="默认值" width="180" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <Card :border-radius="16" class="events-card">
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
        <el-table-column prop="params" label="参数" width="280" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <Card :border-radius="16" class="app-preview-card">
      <template #header>
        <div class="card-header">
          <span class="header-title">实际应用</span>
        </div>
      </template>
      <div class="app-examples">
        <div class="example-title">项目成员列表</div>
        <div class="example-row">
          <AvatarList :list="statusList" mode="stack" :max="5" show-name :bordered="true" />
        </div>

        <div class="example-title">协作编辑人员</div>
        <div class="example-row">
          <AvatarList :list="avatarList.slice(0, 6)" mode="grid" :size="48" :bordered="true" />
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { AvatarItem } from '@/components/AvatarList/index.vue'

// 示例数据
const avatarList = ref<AvatarItem[]>([
  { name: 'Alice', avatar: 'https://picsum.photos/id/1025/400/300' },
  { name: 'Bob', avatar: 'https://picsum.photos/id/1026/400/300' },
  { name: 'Charlie', avatar: 'https://picsum.photos/id/1027/400/300' },
  { name: 'Diana', avatar: 'https://picsum.photos/id/1028/400/300' },
  { name: 'Eve', avatar: 'https://picsum.photos/id/1029/400/300' },
  { name: 'Frank', avatar: 'https://picsum.photos/id/1030/300/300' },
  { name: 'Grace', avatar: 'https://picsum.photos/id/1031/300/300' },
  { name: 'Henry', avatar: 'https://picsum.photos/id/1032/300/300' },
])

// 带状态的数据
const statusList = ref<AvatarItem[]>([
  { name: 'Alice', avatar: 'https://picsum.photos/id/1025/400/300', status: 'online' },
  { name: 'Bob', avatar: 'https://picsum.photos/id/1026/400/300', status: 'busy' },
  { name: 'Charlie', avatar: 'https://picsum.photos/id/1027/400/300', status: 'offline' },
  { name: 'Diana', avatar: 'https://picsum.photos/id/1028/400/300', status: 'away' },
  { name: 'Eve', avatar: 'https://picsum.photos/id/1029/400/300', status: 'online' },
])

// 点击信息
const clickInfo = ref('')

function handleAvatarClick(item: AvatarItem, index: number) {
  clickInfo.value = `点击了 ${item.name || '未知'}，索引 ${index}`
  setTimeout(() => {
    clickInfo.value = ''
  }, 2000)
}

// Props 数据
const propsData = ref([
  { name: 'list', type: 'AvatarItem[] (必填)', default: '-', description: '头像列表数据，每项包含 name、avatar、email、status 等字段' },
  { name: 'mode', type: "'stack' | 'grid' | 'list'", default: "'stack'", description: '展示模式：堆叠、网格或列表' },
  { name: 'size', type: 'number', default: '36', description: '头像大小（像素）' },
  { name: 'max', type: 'number', default: '5', description: '折叠模式下最多显示的头像数量' },
  { name: 'collapsed', type: 'boolean', default: 'true', description: '是否启用折叠模式，超过 max 数量显示 +N' },
  { name: 'showName', type: 'boolean', default: 'true', description: '网格模式是否显示头像下方的名称' },
  { name: 'bordered', type: 'boolean', default: 'false', description: '是否显示边框' },
  { name: 'tooltipPlacement', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Tooltip 弹出位置' },
  { name: 'overlap', type: 'number', default: '0.4', description: '堆叠模式下头像重叠比例（0-1）' },
])

// Events 数据
const eventsData = ref([
  { name: 'click', params: '(item: AvatarItem, index: number)', description: '点击头像时触发' },
  { name: 'toggle', params: '(collapsed: boolean)', description: '折叠/展开状态切换时触发' },
])
</script>

<style scoped lang="scss">
.avatar-list-page .demo-box {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.avatar-list-page .demo-item {
  display: flex;
  align-items: center;
  gap: 16px;
}
</style>
