<template>
  <div class="dialog-demo-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">Dialog 对话框 & v-draggable 指令</h2>
        <p class="intro-text">
          Dialog 组件在 Element Plus el-dialog 基础上增加了可拖拽能力，通过
          <code class="code-inline">draggable</code> 和
          <code class="code-inline">dragBoundary</code> 属性即可开启。配套
          <code class="code-inline">v-draggable</code>
          指令可对任意元素实现拖拽移动。
        </p>

        <div class="intro-tips">
          <p>
            Dialog 组件内置拖拽边界控制（viewport /
            parent）、打开时自动定位、重置位置等方法。v-draggable
            指令支持指定拖拽把手、边界限制、拖拽回调等配置，同时兼容触屏操作。
          </p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制组件或指令源码到自己的项目中使用。Dialog
            主要依赖于
            <code class="code-inline">element-plus</code>，v-draggable
            指令仅依赖 <code class="code-inline">vue</code>。源码地址：<a
              href="#"
              >Dialog.vue</a
            >
            / <a href="#">draggable.ts</a>，欢迎直接使用或根据需求进行二次开发。
          </p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 - Dialog 组件 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">Dialog 组件演示</span>
        </div>
      </template>

      <div class="preview-section">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="8">
            <div class="demo-card demo-card--primary">
              <div class="demo-card-icon">
                <el-icon :size="32"><Monitor /></el-icon>
              </div>
              <h3 class="demo-card-title">基础对话框</h3>
              <p class="demo-card-desc">
                普通的 el-dialog 封装，支持标题、内容、底部按钮
              </p>
              <el-button type="primary" @click="basicVisible = true"
                >打开对话框</el-button
              >
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="demo-card demo-card--success">
              <div class="demo-card-icon">
                <el-icon :size="32"><Rank /></el-icon>
              </div>
              <h3 class="demo-card-title">可拖拽对话框</h3>
              <p class="demo-card-desc">
                支持鼠标拖拽移动对话框，不会超出视口边界
              </p>
              <el-button type="success" @click="dragVisible = true"
                >打开可拖拽对话框</el-button
              >
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="demo-card demo-card--warning">
              <div class="demo-card-icon">
                <el-icon :size="32"><Aim /></el-icon>
              </div>
              <h3 class="demo-card-title">重置位置</h3>
              <p class="demo-card-desc">
                拖拽后可调用 resetPosition 方法恢复初始位置
              </p>
              <el-button type="warning" @click="trackVisible = true"
                >打开追踪对话框</el-button
              >
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="demo-card demo-card--danger">
              <div class="demo-card-icon">
                <el-icon :size="32"><Document /></el-icon>
              </div>
              <h3 class="demo-card-title">自定义内容</h3>
              <p class="demo-card-desc">通过插槽自定义对话框头部和内容</p>
              <el-button type="danger" @click="customVisible = true"
                >打开自定义对话框</el-button
              >
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="demo-card demo-card--primary">
              <div class="demo-card-icon">
                <el-icon :size="32"><Rank /></el-icon>
              </div>
              <h3 class="demo-card-title">不同尺寸</h3>
              <p class="demo-card-desc">通过 width 属性控制对话框宽度</p>
              <el-button type="primary" @click="sizeVisible = true"
                >打开尺寸对话框</el-button
              >
            </div>
          </el-col>
          <el-col :xs="24" :sm="8">
            <div class="demo-card demo-card--primary">
              <div class="demo-card-icon">
                <el-icon :size="32"><WarningFilled /></el-icon>
              </div>
              <h3 class="demo-card-title">不可关闭遮罩</h3>
              <p class="demo-card-desc">点击遮罩不关闭，ESC 不可关闭</p>
              <el-button type="primary" @click="noCloseVisible = true"
                >打开严格对话框</el-button
              >
            </div>
          </el-col>
        </el-row>
      </div>
    </Card>

    <!-- 效果预览 - v-draggable 指令 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">v-draggable 指令演示</span>
        </div>
      </template>

      <div class="preview-section">
        <el-row :gutter="16">
          <el-col :xs="24" :sm="12">
            <div class="demo-card">
              <h3 class="demo-card-title">基础用法</h3>
              <p class="demo-card-desc">
                使用 v-draggable 指令实现任意元素拖拽，边界限制在父容器内
              </p>
              <div class="draggable-area">
                <div
                  class="draggable-box"
                  v-draggable="{
                    boundary: 'parent',
                    onStart: handleDragStart,
                    onMove: handleDragMove,
                    onEnd: handleDragEnd,
                  }"
                >
                  <span class="drag-handle">拖动我</span>
                </div>
              </div>
              <div class="drag-info" v-if="dragInfo.status">
                状态: {{ dragInfo.status }} | 位置: x={{ dragInfo.x }}, y={{
                  dragInfo.y
                }}
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :sm="12">
            <div class="demo-card">
              <h3 class="demo-card-title">指定拖拽把手</h3>
              <p class="demo-card-desc">
                只有 header 区域可以拖拽，内容区域不受影响
              </p>
              <div class="draggable-area">
                <div
                  class="draggable-box with-handle"
                  v-draggable="{
                    boundary: 'parent',
                    handle: '.box-header',
                  }"
                >
                  <div class="box-header">拖拽把手区域</div>
                  <div class="box-content">
                    <p>此内容区域不可拖拽</p>
                    <el-button size="small">点击按钮</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </Card>

    <!-- 基础用法 -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <span class="header-title">基础用法</span>
      </template>

      <div class="usage-section">
        <h3 class="usage-subtitle">1. 基础对话框</h3>
        <pre
          class="code-block"
        ><code>&lt;Dialog v-model="visible" title="基础对话框" width="400px"&gt;
  &lt;p&gt;对话框内容&lt;/p&gt;
  &lt;template #footer&gt;
    &lt;el-button @click="visible = false"&gt;取消&lt;/el-button&gt;
    &lt;el-button type="primary" @click="visible = false"&gt;确定&lt;/el-button&gt;
  &lt;/template&gt;
&lt;/Dialog&gt;</code></pre>

        <h3 class="usage-subtitle">2. 可拖拽对话框</h3>
        <pre class="code-block"><code>&lt;Dialog
  v-model="visible"
  title="可拖拽对话框"
  :draggable="true"
  drag-boundary="viewport"
/&gt;</code></pre>

        <h3 class="usage-subtitle">3. v-draggable 指令</h3>
        <pre class="code-block"><code>&lt;div
  v-draggable="{
    boundary: 'parent',
    handle: '.drag-handle',
    onStart: (rect) =&gt; console.log('开始', rect),
    onMove: (x, y) =&gt; console.log('移动', x, y),
    onEnd: (x, y) =&gt; console.log('结束', x, y),
  }"
/&gt;
  拖动我
&lt;/div&gt;</code></pre>

        <h3 class="usage-subtitle">4. 重置对话框位置</h3>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;Dialog ref="dialogRef" v-model="visible" :draggable="true" /&gt;
  &lt;el-button @click="dialogRef?.resetPosition()"&gt;重置位置&lt;/el-button&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import Dialog from '@/components/Dialog/index.vue'

const dialogRef = ref&lt;InstanceType&lt;typeof Dialog&gt;&gt;()
&lt;/script&gt;</code></pre>
      </div>
    </Card>

    <!-- Dialog 属性 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">Dialog 属性说明</span>
      </template>

      <el-table
        :data="dialogPropsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性" width="180" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="default" label="默认值" width="100" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- Dialog 事件 & 暴露方法 -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <span class="header-title">Dialog 事件 & 暴露方法</span>
      </template>

      <el-table
        :data="dialogEventsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="事件/方法" width="180" />
        <el-table-column prop="args" label="参数" width="200" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- Dialog 插槽 -->
    <Card class="slots-card" :border-radius="16">
      <template #header>
        <span class="header-title">Dialog 插槽</span>
      </template>

      <el-table
        :data="dialogSlotsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="插槽名" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- v-draggable 指令参数 -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <span class="header-title">v-draggable 指令参数</span>
      </template>

      <el-table
        :data="directivePropsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="120" />
        <el-table-column prop="type" label="类型" width="240" />
        <el-table-column prop="default" label="默认值" width="100" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 基础对话框 -->
    <Dialog v-model="basicVisible" title="基础对话框" width="400px">
      <p>这是一个基础的对话框</p>
      <p>点击右上角的 × 或底部按钮关闭</p>
      <template #footer>
        <el-button @click="basicVisible = false">取消</el-button>
        <el-button type="primary" @click="basicVisible = false">确定</el-button>
      </template>
    </Dialog>

    <!-- 可拖拽对话框 -->
    <Dialog
      v-model="dragVisible"
      title="可拖拽对话框"
      width="400px"
      :draggable="true"
      drag-boundary="viewport"
    >
      <p>这是一个可以拖拽的对话框</p>
      <p>按住标题栏可以拖动对话框</p>
      <p>对话框不会超出视口边界</p>
      <template #footer>
        <el-button @click="dragVisible = false">取消</el-button>
        <el-button type="primary" @click="dragVisible = false">确定</el-button>
      </template>
    </Dialog>

    <!-- 重置位置对话框 -->
    <Dialog
      ref="trackRef"
      v-model="trackVisible"
      title="重置位置对话框"
      width="400px"
      :draggable="true"
      drag-boundary="viewport"
    >
      <div class="track-content">
        <p>拖动此对话框后，点击下方按钮可重置位置</p>
        <el-button type="primary" @click="trackRef?.resetPosition()"
          >重置位置</el-button
        >
      </div>
    </Dialog>

    <!-- 自定义内容对话框 -->
    <Dialog v-model="customVisible" width="500px">
      <template #header>
        <div class="custom-header">
          <el-icon><Star /></el-icon>
          <span>自定义标题</span>
        </div>
      </template>
      <p>通过 header 插槽可以完全自定义对话框标题区域。</p>
      <p>同样，通过 footer 插槽可以自定义底部按钮区域。</p>
      <template #footer>
        <el-button @click="customVisible = false">关闭</el-button>
      </template>
    </Dialog>

    <!-- 不同尺寸对话框 -->
    <Dialog v-model="sizeVisible" title="宽尺寸对话框" width="700px">
      <p>通过 width 属性可以控制对话框宽度。</p>
      <p>当前宽度为 700px，适合展示较多内容的场景。</p>
      <template #footer>
        <el-button @click="sizeVisible = false">取消</el-button>
        <el-button type="primary" @click="sizeVisible = false">确定</el-button>
      </template>
    </Dialog>

    <!-- 不可关闭遮罩对话框 -->
    <Dialog
      v-model="noCloseVisible"
      title="严格对话框"
      width="400px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <p>此对话框点击遮罩不关闭，ESC 键也不可关闭。</p>
      <p>只能通过点击按钮或右上角 × 关闭。</p>
      <template #footer>
        <el-button @click="noCloseVisible = false">取消</el-button>
        <el-button type="primary" @click="noCloseVisible = false"
          >确定</el-button
        >
      </template>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref, reactive } from "vue";
import {
  Monitor,
  Rank,
  Aim,
  Document,
  WarningFilled,
  Star,
} from "@element-plus/icons-vue";
import Dialog from "@/components/Dialog/index.vue";

const basicVisible = ref(false);
const dragVisible = ref(false);
const trackVisible = ref(false);
const customVisible = ref(false);
const sizeVisible = ref(false);
const noCloseVisible = ref(false);

const trackRef = ref<InstanceType<typeof Dialog>>();

// 拖拽指令测试
const dragInfo = reactive({
  status: "",
  x: 0,
  y: 0,
});

function handleDragStart() {
  dragInfo.status = "开始拖拽";
}

function handleDragMove(x: number, y: number) {
  dragInfo.status = "拖拽中";
  dragInfo.x = Math.round(x);
  dragInfo.y = Math.round(y);
}

function handleDragEnd() {
  dragInfo.status = "拖拽结束";
}

// Dialog 属性列表
const dialogPropsList = [
  {
    name: "modelValue",
    type: "boolean",
    default: "false",
    description: "是否显示对话框（v-model）",
  },
  { name: "title", type: "string", default: "''", description: "对话框标题" },
  {
    name: "width",
    type: "string | number",
    default: "'50%'",
    description: "对话框宽度",
  },
  {
    name: "top",
    type: "string",
    default: "'15vh'",
    description: "对话框距离顶部的距离",
  },
  {
    name: "modal",
    type: "boolean",
    default: "true",
    description: "是否显示遮罩层",
  },
  {
    name: "appendToBody",
    type: "boolean",
    default: "false",
    description: "是否插入至 body 元素",
  },
  {
    name: "lockScroll",
    type: "boolean",
    default: "true",
    description: "是否在对话框出现时锁定 body 滚动",
  },
  {
    name: "closeOnClickModal",
    type: "boolean",
    default: "true",
    description: "是否点击遮罩关闭",
  },
  {
    name: "closeOnPressEscape",
    type: "boolean",
    default: "true",
    description: "是否 ESC 关闭",
  },
  {
    name: "showClose",
    type: "boolean",
    default: "true",
    description: "是否显示关闭按钮",
  },
  {
    name: "center",
    type: "boolean",
    default: "false",
    description: "是否居中布局",
  },
  {
    name: "alignCenter",
    type: "boolean",
    default: "true",
    description: "是否垂直水平居中",
  },
  {
    name: "destroyOnClose",
    type: "boolean",
    default: "false",
    description: "关闭时销毁内容",
  },
  {
    name: "draggable",
    type: "boolean",
    default: "false",
    description: "是否可拖拽（封装扩展）",
  },
  {
    name: "dragBoundary",
    type: "'viewport' | 'parent'",
    default: "'viewport'",
    description: "拖拽边界（封装扩展）",
  },
  {
    name: "dragOnOpen",
    type: "boolean",
    default: "true",
    description: "打开时是否自动设置拖拽定位（封装扩展）",
  },
  {
    name: "borderRadius",
    type: "string | number",
    default: "16",
    description: "对话框圆角大小（封装扩展）",
  },
  {
    name: "showFullscreen",
    type: "boolean",
    default: "false",
    description: "是否显示全屏切换按钮（封装扩展）",
  },
  {
    name: "defaultFullscreen",
    type: "boolean",
    default: "false",
    description: "是否默认全屏显示（封装扩展）",
  },
];

// Dialog 事件 & 暴露方法列表
const dialogEventsList = [
  {
    name: "update:modelValue",
    args: "(value: boolean)",
    description: "对话框显示状态变化时触发",
  },
  { name: "open", args: "()", description: "对话框打开时触发" },
  { name: "opened", args: "()", description: "对话框打开动画结束时触发" },
  { name: "close", args: "()", description: "对话框关闭时触发" },
  { name: "closed", args: "()", description: "对话框关闭动画结束时触发" },
  {
    name: "resetPosition()",
    args: "()",
    description: "暴露方法：重置对话框到初始位置",
  },
  {
    name: "toggleFullscreen()",
    args: "()",
    description: "暴露方法：切换全屏/还原",
  },
  {
    name: "fullscreen",
    args: "(value: boolean)",
    description: "全屏状态变化时触发（封装扩展）",
  },
];

// Dialog 插槽列表
const dialogSlotsList = [
  { name: "default", description: "对话框主体内容" },
  { name: "header", description: "自定义标题区域内容" },
  { name: "title", description: "自定义标题文字（与 header 互斥）" },
  { name: "footer", description: "自定义底部按钮区域" },
];

// v-draggable 指令参数列表
const directivePropsList = [
  {
    name: "boundary",
    type: "'viewport' | 'parent' | HTMLElement",
    default: "'viewport'",
    description: "拖拽边界限制",
  },
  {
    name: "handle",
    type: "string",
    default: "-",
    description: "拖拽把手选择器，仅该区域可拖拽",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    description: "是否禁用拖拽",
  },
  {
    name: "onStart",
    type: "(rect: DOMRect) => void",
    default: "-",
    description: "拖拽开始回调",
  },
  {
    name: "onMove",
    type: "(x: number, y: number) => void",
    default: "-",
    description: "拖拽移动回调，参数为实时坐标",
  },
  {
    name: "onEnd",
    type: "(x: number, y: number) => void",
    default: "-",
    description: "拖拽结束回调，参数为最终坐标",
  },
];
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

// ---------- 演示卡片 ----------
.demo-card {
  padding: 24px 16px;
  margin-bottom: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  border-top: 3px solid transparent;
  text-align: center;
  height: calc(100% - 16px);

  .demo-card-icon {
    color: var(--el-text-color-secondary);
    margin-bottom: 12px;
  }

  .demo-card-title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px;
    color: var(--el-text-color-primary);
  }

  .demo-card-desc {
    font-size: 13px;
    color: var(--el-text-color-secondary);
    margin: 0 0 16px;
    line-height: 1.6;
  }

  &--primary {
    border-top-color: var(--el-color-primary);
    .demo-card-icon {
      color: var(--el-color-primary);
    }
  }
  &--success {
    border-top-color: var(--el-color-success);
    .demo-card-icon {
      color: var(--el-color-success);
    }
  }
  &--warning {
    border-top-color: var(--el-color-warning);
    .demo-card-icon {
      color: var(--el-color-warning);
    }
  }
  &--danger {
    border-top-color: var(--el-color-danger);
    .demo-card-icon {
      color: var(--el-color-danger);
    }
  }
  &--info {
    border-top-color: var(--el-color-info);
    .demo-card-icon {
      color: var(--el-color-info);
    }
  }
}

// ---------- v-draggable 拖拽区域 ----------
.draggable-area {
  position: relative;
  width: 100%;
  height: 200px;
  background: var(--el-fill-color-lighter);
  border: 1px dashed var(--el-border-color);
  border-radius: 8px;
  margin-top: 12px;
  overflow: hidden;
}

.draggable-box {
  position: absolute;
  width: 120px;
  height: 80px;
  background: var(--el-color-primary);
  color: var(--el-color-white, #fff);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: move;
  user-select: none;

  .drag-handle {
    font-size: 14px;
    font-weight: 500;
  }

  &.with-handle {
    width: 200px;
    height: 120px;
    background: var(--el-bg-color);
    color: var(--el-text-color-primary);
    border: 1px solid var(--el-border-color);
    flex-direction: column;
    align-items: stretch;
    cursor: default;

    .box-header {
      background: var(--el-color-primary);
      color: var(--el-color-white, #fff);
      padding: 8px 12px;
      font-size: 13px;
      border-radius: 8px 8px 0 0;
      cursor: move;
    }

    .box-content {
      padding: 12px;
      flex: 1;
    }
  }
}

.drag-info {
  margin-top: 10px;
  padding: 8px 12px;
  background: var(--el-color-primary-light-9);
  border: 1px solid var(--el-color-primary-light-7);
  border-radius: 8px;
  font-size: 13px;
  color: var(--el-color-primary);
}

// ---------- 对话框内样式 ----------
.track-content {
  text-align: center;
  padding: 10px 0;
}

.custom-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: 600;
}
</style>
