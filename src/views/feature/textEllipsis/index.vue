<template>
  <div class="text-ellipsis-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">TextEllipsis 组件演示</h2>
        <p class="intro-text">
          文本省略组件，支持多行文本截断、点击展开/收起、一键复制、Tooltip 提示等功能。
        </p>

        <div class="intro-tips">
          <p>以下功能为扩展功能，其余功能支持 Element Plus Tooltip
            的相关属性（如：<code>placement</code>、<code>effect</code>、<code>popper-class</code> 等），更多详情请查看 <a
              href="https://element-plus.org/zh-CN/component/tooltip.html" target="_blank">Element Plus Tooltip 文档</a>。
          </p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>如果你不想使用整个项目，也可以直接复制 <code class="code-inline">TextEllipsis</code> 组件源码到自己的项目中使用。该组件主要依赖于 <code
              class="code-inline">element-plus</code>（使用 <code>el-tooltip</code> 组件），使用前请确保已安装该依赖。组件源码地址：<a
              href="#">TextEllipsis.vue</a>，欢迎直接使用或根据需求进行二次开发。</p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">效果预览</span>
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

      <div class="preview-container">
        <div class="preview-row">
          <span class="row-label">单行截断：</span>
          <TextEllipsis :text="longText" :width="'300px'" :lines="1" />
        </div>

        <div class="preview-row">
          <span class="row-label">多行截断 (2行)：</span>
          <TextEllipsis :text="longText" :width="'400px'" :lines="2" />
        </div>

        <div class="preview-row">
          <span class="row-label">可展开/收起：</span>
          <TextEllipsis :text="longText" :width="'400px'" :lines="2" expandable />
        </div>

        <div class="preview-row">
          <span class="row-label">可复制：</span>
          <TextEllipsis :text="longText" :width="'400px'" :lines="2" copyable />
        </div>

        <div class="preview-row">
          <span class="row-label">展开+复制：</span>
          <TextEllipsis :text="longText" :width="'400px'" :lines="2" expandable copyable />
        </div>
      </div>
    </Card>

    <!-- 基础配置 -->
    <Card class="config-card" :border-radius="16">
      <template #header>
        <span class="header-title">基础配置</span>
      </template>

      <div class="config-form">
        <el-form :model="config" label-width="120px" label-position="right">
          <el-form-item label="展示行数">
            <el-input-number v-model="config.lines" :min="1" :max="10" controls-position="right" />
          </el-form-item>

          <el-form-item label="宽度">
            <el-input v-model="config.width" placeholder="如 200px 或 50%" />
          </el-form-item>

          <el-form-item label="是否可点击展开">
            <el-switch v-model="config.expandable" />
          </el-form-item>

          <el-form-item label="是否可复制">
            <el-switch v-model="config.copyable" />
          </el-form-item>

          <el-form-item label="Tooltip 类型">
            <el-select v-model="config.tooltipEffect">
              <el-option label="dark (深色)" value="dark" />
              <el-option label="light (浅色)" value="light" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </Card>

    <!-- Tooltip 原生属性 -->
    <Card class="tooltip-config-card" :border-radius="16">
      <template #header>
        <span class="header-title">Element Plus Tooltip 原生属性</span>
      </template>

      <div class="config-form">
        <el-form :model="tooltipConfig" label-width="140px" label-position="right">
          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="Tooltip 出现位置">
                <el-select v-model="tooltipConfig.placement">
                  <el-option-group label="上方">
                    <el-option label="top" value="top" />
                    <el-option label="top-start" value="top-start" />
                    <el-option label="top-end" value="top-end" />
                  </el-option-group>
                  <el-option-group label="下方">
                    <el-option label="bottom" value="bottom" />
                    <el-option label="bottom-start" value="bottom-start" />
                    <el-option label="bottom-end" value="bottom-end" />
                  </el-option-group>
                  <el-option-group label="左侧">
                    <el-option label="left" value="left" />
                    <el-option label="left-start" value="left-start" />
                    <el-option label="left-end" value="left-end" />
                  </el-option-group>
                  <el-option-group label="右侧">
                    <el-option label="right" value="right" />
                    <el-option label="right-start" value="right-start" />
                    <el-option label="right-end" value="right-end" />
                  </el-option-group>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="Tooltip 主题">
                <el-select v-model="tooltipConfig.effect">
                  <el-option label="dark (深色)" value="dark" />
                  <el-option label="light (浅色)" value="light" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="显示延迟 (毫秒)">
                <el-input-number v-model="tooltipConfig.showAfter" :min="0" :max="5000" :step="50"
                  controls-position="right" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="隐藏延迟 (毫秒)">
                <el-input-number v-model="tooltipConfig.hideAfter" :min="0" :max="5000" :step="50"
                  controls-position="right" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="24">
            <el-col :span="12">
              <el-form-item label="出现位置的偏移量">
                <el-input-number v-model="tooltipConfig.offset" :min="0" :max="100" controls-position="right" />
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="是否显示箭头">
                <el-switch v-model="tooltipConfig.showArrow" />
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </Card>

    <!-- 实际应用预览 -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <span class="header-title">实际应用预览</span>
      </template>

      <div class="app-examples">
        <h3 class="example-title">表格单元格文本截断</h3>
        <el-table :data="tableData" style="width: 100%"
          :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column prop="name" label="名称" width="150">
            <template #default="{ row }">
              <TextEllipsis :text="row.name" :width="'120px'" />
            </template>
          </el-table-column>
          <el-table-column prop="description" label="描述">
            <template #default="{ row }">
              <TextEllipsis :text="row.description" :width="'200px'" :lines="1" copyable />
            </template>
          </el-table-column>
          <el-table-column prop="tags" label="标签" width="200">
            <template #default="{ row }">
              <TextEllipsis :text="row.tags" :width="'180px'" :lines="1" expandable />
            </template>
          </el-table-column>
        </el-table>

        <h3 class="example-title">列表项文本截断</h3>
        <div class="list-examples">
          <div v-for="(item, index) in listData" :key="index" class="list-item">
            <el-avatar :size="40" :style="{ backgroundColor: getColor(index) }">
              {{ item.avatar }}
            </el-avatar>
            <div class="list-content">
              <div class="list-title">
                <TextEllipsis :text="item.title" :width="'300px'" />
              </div>
              <div class="list-desc">
                <TextEllipsis :text="item.description" :width="'400px'" :lines="2" />
              </div>
            </div>
            <IconButton size="small" @click="handleAction(item)">
              查看
            </IconButton>
          </div>
        </div>
      </div>
    </Card>

    <!-- 插槽使用说明 -->
    <Card class="slot-card" :border-radius="16">
      <template #header>
        <span class="header-title">插槽使用说明</span>
      </template>

      <div class="slot-section">
        <p>TextEllipsis 组件支持以下插槽，可以自定义组件的各个部分：</p>

        <el-table :data="slotList" style="width: 100%"
          :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
          <el-table-column prop="name" label="插槽名" width="150" />
          <el-table-column prop="description" label="说明" />
          <el-table-column prop="example" label="示例代码" width="350">
            <template #default="{ row }">
              <code class="code-inline">{{ row.example }}</code>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </Card>

    <!-- 使用示例 -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <span class="header-title">使用示例</span>
      </template>

      <div class="usage-section">
        <h3 class="usage-subtitle">基础用法</h3>
        <pre class="code-block"><code>&lt;template&gt;
        &lt;TextEllipsis
        :text="longText"
        :width="'200px'"
        :lines="1"
        /&gt;
        &lt;/template&gt;

        &lt;script setup lang="ts"&gt;
        import TextEllipsis from '@/components/TextEllipsis/index.vue'
        &lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">可展开+可复制</h3>
        <pre class="code-block"><code>&lt;TextEllipsis
        :text="longText"
        :width="'300px'"
        :lines="2"
        expandable
        copyable
        /&gt;</code></pre>

        <h3 class="usage-subtitle">自定义 Tooltip 属性</h3>
        <pre class="code-block"><code>&lt;TextEllipsis
        :text="longText"
        :width="'300px'"
        placement="bottom"
        effect="light"
        :show-after="300"
        :hide-after="100"
        :offset="15"
        /&gt;</code></pre>
      </div>
    </Card>

    <!-- v-ellipsis 指令用法 -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">v-ellipsis 指令用法</span>
          <el-tag type="success" size="small" effect="plain">指令</el-tag>
        </div>
      </template>

      <div class="usage-section">
        <p class="demo-desc">
          除了使用 TextEllipsis 组件，还可以通过 v-ellipsis 自定义指令在任意元素上快速实现文本省略。
          指令自动注入 CSS 样式、检测溢出、管理展开/收起状态，无需额外导入组件。
        </p>

        <!-- 指令效果预览 -->
        <div class="directive-preview">
          <div class="preview-row">
            <span class="row-label">单行省略：</span>
            <span v-ellipsis class="ellipsis-demo-text">{{ longText }}</span>
          </div>

          <div class="preview-row">
            <span class="row-label">多行省略 (2行)：</span>
            <span v-ellipsis="2" class="ellipsis-demo-text">{{ longText }}</span>
          </div>

          <div class="preview-row">
            <span class="row-label">可展开/收起：</span>
            <span v-ellipsis="{ lines: 2, expandable: true }" class="ellipsis-demo-text">{{ longText }}</span>
          </div>

          <div class="preview-row">
            <span class="row-label">限定宽度 + 多行：</span>
            <span v-ellipsis="{ lines: 2, width: '300px' }" class="ellipsis-demo-text">{{ longText }}</span>
          </div>

          <div class="preview-row">
            <span class="row-label">无 tooltip：</span>
            <span v-ellipsis="{ lines: 1, tooltip: false, width: '300px' }" class="ellipsis-demo-text">{{ longText }}</span>
          </div>
        </div>

        <h3 class="usage-subtitle">指令基础用法</h3>
        <p class="demo-desc">直接在元素上使用 v-ellipsis，默认单行截断。</p>
        <pre class="code-block" v-pre><code>&lt;template&gt;
  &lt;span v-ellipsis&gt;这是一段很长的文本内容...&lt;/span&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
// v-ellipsis 已全局注册，无需手动 import
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">多行截断</h3>
        <p class="demo-desc">传入数字指定截断行数。</p>
        <pre class="code-block" v-pre><code>&lt;!-- 截断为 2 行 --&gt;
&lt;span v-ellipsis="2"&gt;{{ longText }}&lt;/span&gt;

&lt;!-- 截断为 3 行 --&gt;
&lt;span v-ellipsis="3"&gt;{{ longText }}&lt;/span&gt;</code></pre>

        <h3 class="usage-subtitle">完整配置</h3>
        <p class="demo-desc">传入对象配置项，支持行数、展开、宽度、tooltip 等。</p>
        <pre class="code-block" v-pre><code>&lt;span
  v-ellipsis="{
    lines: 2,           &lt;!-- 截断行数 --&gt;
    expandable: true,  &lt;!-- 支持点击展开/收起 --&gt;
    expandText: '展开', &lt;!-- 展开按钮文字 --&gt;
    collapseText: '收起', &lt;!-- 收起按钮文字 --&gt;
    tooltip: true,     &lt;!-- 截断时显示原生 title 提示 --&gt;
    width: '300px',    &lt;!-- 限定最大宽度 --&gt;
  }"
&gt;
  {{ longText }}
&lt;/span&gt;</code></pre>

        <h3 class="usage-subtitle">指令参数说明</h3>
        <el-table :data="directiveParams" class="api-table" size="small"
          :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
          <el-table-column prop="name" label="参数" width="140" />
          <el-table-column prop="type" label="类型" width="160" />
          <el-table-column prop="default" label="默认值" width="100" />
          <el-table-column prop="description" label="说明" />
        </el-table>
      </div>
    </Card>

    <!-- 属性说明 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">属性说明</span>
      </template>
      <el-table :data="propsList" class="api-table" size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }">
        <el-table-column prop="name" label="属性" width="180" />
        <el-table-column prop="type" label="类型" width="150" />
        <el-table-column prop="default" label="默认值" width="100" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { CopyDocument } from '@element-plus/icons-vue'
import TextEllipsis from '@/components/TextEllipsis/index.vue'
import IconButton from '@/components/IconButton/index.vue'

// 长文本示例
const longText = '在一个宁静而古老的小镇上，少年李安每天放学都会经过那条铺满青石板的老街。街道两旁是年代久远的木屋，屋檐下挂着随风摇曳的灯笼，空气中弥漫着淡淡的茶香和花香。他总是喜欢在这里停留片刻，聆听老人们讲述那些关于这个小镇的传奇故事。'

// 基础配置
const config = reactive({
  lines: 1,
  width: '300px',
  expandable: false,
  copyable: false,
  tooltipEffect: 'dark' as 'dark' | 'light'
})

// Tooltip 配置
const tooltipConfig = reactive({
  placement: 'top' as 'top' | 'bottom' | 'left' | 'right' | string,
  effect: 'dark' as 'dark' | 'light',
  showAfter: 0,
  hideAfter: 200,
  offset: 12,
  showArrow: true
})

// 表格数据
const tableData = [
  {
    id: 1,
    name: '这是一个非常长的名称会被截断显示',
    description: '这是一段很长的描述文本，用来测试文本省略组件的截断效果是否正常工作',
    tags: '标签A, 标签B, 标签C, 标签D, 标签E'
  },
  {
    id: 2,
    name: '短名称',
    description: '短描述',
    tags: '标签1'
  },
  {
    id: 3,
    name: '中间长度的商品名称示例',
    description: '这是一段中等长度的描述内容',
    tags: '商品, 物品'
  }
]

// 列表数据
const listData = [
  {
    avatar: '张',
    title: '这是一个非常长的标题，用于测试单行文本截断效果是否正常工作',
    description: '这是一段非常长的描述文本，用于测试多行文本截断效果。当文本内容超过指定行数时，会自动显示省略号，用户可以点击展开查看完整内容。这有助于保持界面整洁，同时又不会丢失重要信息。'
  },
  {
    avatar: '李',
    title: '短标题',
    description: '这是一段较短的描述内容'
  },
  {
    avatar: '王',
    title: '另一个较长的标题示例文本',
    description: '中等长度的描述文本'
  }
]

function getColor(index: number) {
  const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']
  return colors[index % colors.length]
}

function handleAction(item: any) {
  ElMessage.info(`查看: ${item.title}`)
}

// 插槽列表
const slotList = [
  {
    name: 'default',
    description: '自定义显示内容（覆盖默认文本渲染）',
    example: '<template #default>\n  自定义内容\n</template>'
  }
]

// Props 列表
const propsList = [
  { name: 'text', type: 'string', default: '-', description: '要显示的文本内容' },
  { name: 'lines', type: 'number', default: '1', description: '显示行数，超过则截断' },
  { name: 'width', type: 'string | number', default: '-', description: '容器宽度，如 200px 或 50%' },
  { name: 'expandable', type: 'boolean', default: 'false', description: '是否可点击展开/收起' },
  { name: 'copyable', type: 'boolean', default: 'false', description: '是否显示复制按钮' },
  { name: 'showTooltip', type: 'boolean', default: 'true', description: '截断时是否显示 Tooltip' },
  { name: 'placement', type: 'string', default: 'top', description: 'Tooltip 出现位置' },
  { name: 'tooltipEffect', type: 'string', default: 'dark', description: 'Tooltip 主题 (dark/light)' },
  { name: 'popperClass', type: 'string', default: '-', description: 'Tooltip 自定义类名' },
  { name: 'showAfter', type: 'number', default: '0', description: '显示延迟（毫秒）' },
  { name: 'hideAfter', type: 'number', default: '200', description: '隐藏延迟（毫秒）' },
  { name: 'offset', type: 'number', default: '12', description: 'Tooltip 偏移量' },
  { name: 'showArrow', type: 'boolean', default: 'true', description: '是否显示箭头' },
  { name: 'expandText', type: 'string', default: '展开', description: '展开按钮文字' },
  { name: 'collapseText', type: 'string', default: '收起', description: '收起按钮文字' }
]

// 指令参数说明
const directiveParams = [
  { name: 'lines', type: 'number', default: '1', description: '截断行数，1=单行省略，>1=多行省略' },
  { name: 'expandable', type: 'boolean', default: 'false', description: '是否支持点击展开/收起' },
  { name: 'expandText', type: 'string', default: "'展开'", description: '展开按钮文字' },
  { name: 'collapseText', type: 'string', default: "'收起'", description: '收起按钮文字' },
  { name: 'tooltip', type: 'boolean', default: 'true', description: '截断时是否显示原生 title 提示' },
  { name: 'width', type: 'string', default: "''", description: '限定最大宽度（如 200px / 100%）' },
]

// 复制代码
async function copyCode() {
  const code = `<TextEllipsis
  :text="longText"
  :width="'${config.width}'"
  :lines="${config.lines}"
  ${config.expandable ? 'expandable' : ''}
  ${config.copyable ? 'copyable' : ''}
  placement="${tooltipConfig.placement}"
  effect="${tooltipConfig.effect}"
/>`

  try {
    await navigator.clipboard.writeText(code)
    ElMessage.success('代码已复制到剪贴板')
  } catch (err) {
    const textarea = document.createElement('textarea')
    textarea.value = code
    document.body.appendChild(textarea)
    textarea.select()
    try {
      document.execCommand('copy')
      ElMessage.success('代码已复制到剪贴板')
    } catch (e) {
      ElMessage.error('复制失败')
    }
    document.body.removeChild(textarea)
  }
}
</script>

<style scoped lang="scss">

.preview-container {
  display: flex;
  flex-direction: column;
  gap: 16px;

  .preview-row {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px;
    background-color: var(--el-fill-color-lighter);
    border-radius: 8px;

    .row-label {
      min-width: 140px;
      font-weight: 500;
      color: var(--el-text-color-regular);
    }

    >div:last-child {
      flex: 1;
    }
  }
}

.config-form {
  max-width: 800px;
}

.directive-preview {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
  padding: 20px;
  background-color: var(--el-fill-color-lighter);
  border-radius: 8px;

  .preview-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;

    .row-label {
      min-width: 140px;
      font-weight: 500;
      color: var(--el-text-color-regular);
      flex-shrink: 0;
    }

    .ellipsis-demo-text {
      flex: 1;
      min-width: 0;
      line-height: 1.6;
    }
  }
}

.app-examples {
  .list-examples {
    display: flex;
    flex-direction: column;
    gap: 12px;

    .list-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px;
      border: 1px solid var(--el-border-color-lighter);
      border-radius: 8px;
      transition: border-color 0.2s ease;

      &:hover {
        border-color: var(--el-color-primary-light-5);
      }

      .list-content {
        flex: 1;
        min-width: 0;

        .list-title {
          font-weight: 500;
          margin-bottom: 4px;
        }

        .list-desc {
          font-size: 13px;
          color: var(--el-text-color-secondary);
        }
      }
    }
  }
}

.slot-section {
  p {
    margin-bottom: 16px;
    line-height: 1.8;
  }

  .code-inline {
    background-color: var(--el-fill-color-lighter);
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'Courier New', monospace;
    font-size: 12px;
    color: var(--el-color-primary);
  }
}
</style>
