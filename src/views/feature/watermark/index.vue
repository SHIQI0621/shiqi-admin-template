<template>
  <div class="watermark-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">Watermark 水印</h2>
        <p class="intro-text">
          Watermark 提供页面水印能力，包含一个声明式组件
          <code class="code-inline">Watermark</code> 和一个命令式 Hook
          <code class="code-inline">useWatermark</code
          >，支持自定义文字、透明度、旋转角度、间距等配置，适用于系统内部资料防截图等场景。
        </p>

        <div class="intro-tips">
          <p>
            组件方式通过 props 驱动渲染，适合简单场景；Hook 方式返回 show / hide
            / toggle
            方法，适合需要编程式控制的场景。两者均支持响应式配置，参数变化时自动重绘。
          </p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制组件或 Hook
            源码到自己的项目中使用。Watermark 组件和 useWatermark Hook
            主要依赖于
            <code class="code-inline">vue</code>
            的响应式系统，无其他第三方依赖。源码地址：<a href="#"
              >Watermark.vue</a
            >
            /
            <a href="#">useWatermark.ts</a
            >，欢迎直接使用或根据需求进行二次开发。
          </p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">Watermark 效果预览</span>
        </div>
      </template>

      <div class="preview-section">
        <h3 class="section-title">组件方式 — 基础水印：</h3>
        <div class="preview-group">
          <div class="demo-box">
            <div class="demo-content">
              <h4>水印内容</h4>
              <p>这是一段用于演示的页面内容，水印会覆盖在整个页面上方。</p>
              <p>点击下方按钮可以控制水印的显示与隐藏。</p>
            </div>
            <div class="demo-actions">
              <el-button type="primary" @click="showComponent = !showComponent">
                {{ showComponent ? "隐藏水印" : "显示水印" }}
              </el-button>
            </div>
          </div>
          <Watermark
            v-if="showComponent"
            :text="componentConfig.text"
            :font-size="componentConfig.fontSize"
            :opacity="componentConfig.opacity"
            :rotate="componentConfig.rotate"
            :spacing-x="componentConfig.spacingX"
            :spacing-y="componentConfig.spacingY"
          />
        </div>

        <h3 class="section-title">Hook 方式 — 自定义水印：</h3>
        <div class="preview-group">
          <div class="demo-box">
            <div class="demo-controls">
              <el-form :inline="true">
                <el-form-item label="水印文字">
                  <el-input v-model="customConfig.text" style="width: 200px" />
                </el-form-item>
                <el-form-item label="透明度">
                  <el-slider
                    v-model="customConfig.opacity"
                    :min="0.1"
                    :max="1"
                    :step="0.1"
                    style="width: 150px"
                  />
                </el-form-item>
                <el-form-item label="旋转角度">
                  <el-slider
                    v-model="customConfig.rotate"
                    :min="-90"
                    :max="90"
                    style="width: 150px"
                  />
                </el-form-item>
                <el-form-item label="字体大小">
                  <el-input-number
                    v-model="customConfig.fontSize"
                    :min="12"
                    :max="48"
                  />
                </el-form-item>
              </el-form>
            </div>
            <div class="demo-actions">
              <el-button type="primary" @click="applyCustom"
                >应用水印</el-button
              >
              <el-button @click="clearCustom">清除水印</el-button>
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
        <h3 class="usage-subtitle">1. 组件方式</h3>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;Watermark
    text="系统内部资料"
    :font-size="16"
    :opacity="0.15"
    :rotate="-15"
    :spacing-x="150"
    :spacing-y="100"
  /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import Watermark from '@/components/Watermark/index.vue'
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">2. Hook 方式</h3>
        <pre class="code-block"><code>import { ref } from 'vue'
import { useWatermark } from '@/hooks/useWatermark'

// 使用响应式配置
const config = ref({
  text: '系统内部资料',
  fontSize: 16,
  opacity: 0.15,
  rotate: -15,
  spacingX: 150,
  spacingY: 100,
})

const { visible, show, hide, toggle, options } = useWatermark(config)

// 更新配置时，水印会自动重绘
options.value.text = '新的水印文字'

// 显示/隐藏水印
show()
hide()
toggle()</code></pre>

        <h3 class="usage-subtitle">3. 多行文字水印</h3>
        <pre class="code-block"><code>const { show } = useWatermark({
  text: ['第一行文字', '第二行文字'],
  fontSize: 16,
  opacity: 0.15,
})</code></pre>
      </div>
    </Card>

    <!-- 属性说明 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">属性说明 (WatermarkOptions / Props)</span>
      </template>

      <el-table
        :data="propsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性" width="120" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="default" label="默认值" width="100" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- Hook 返回值 -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <span class="header-title">Hook 返回值 (useWatermark)</span>
      </template>

      <el-table
        :data="returnList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性/方法" width="120" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { useWatermark } from "@/hooks/useWatermark";

defineOptions({ name: "Watermark" });

// 组件方式
const showComponent = ref(false);

const componentConfig = reactive({
  text: "系统内部资料",
  fontSize: 16,
  opacity: 0.15,
  rotate: -15,
  spacingX: 150,
  spacingY: 100,
});

// Hook 方式
const customConfig = ref({
  text: "机密文件",
  fontSize: 18,
  opacity: 0.2,
  rotate: -22,
  spacingX: 150,
  spacingY: 100,
});

const watermarkCustom = useWatermark(customConfig);

function applyCustom() {
  watermarkCustom.show();
}

function clearCustom() {
  watermarkCustom.hide();
}

// 属性说明表格数据
const propsList = ref([
  {
    name: "text",
    type: "string | string[]",
    default: "'水印'",
    description: "水印文字内容，传入数组可显示多行文字",
  },
  {
    name: "fontSize",
    type: "number",
    default: "16",
    description: "字体大小（px）",
  },
  {
    name: "color",
    type: "string",
    default: "'#ccc'",
    description: "水印文字颜色",
  },
  {
    name: "opacity",
    type: "number",
    default: "0.15",
    description: "水印透明度（0-1）",
  },
  {
    name: "rotate",
    type: "number",
    default: "-15",
    description: "水印旋转角度（-90 到 90）",
  },
  {
    name: "spacingX",
    type: "number",
    default: "150",
    description: "水印横向间距（px）",
  },
  {
    name: "spacingY",
    type: "number",
    default: "100",
    description: "水印纵向间距（px）",
  },
  {
    name: "visible",
    type: "boolean",
    default: "true",
    description: "是否显示水印（仅组件方式）",
  },
  {
    name: "container",
    type: "HTMLElement | null",
    default: "document.body",
    description: "水印挂载容器（仅 Hook 方式）",
  },
]);

// Hook 返回值表格数据
const returnList = ref([
  {
    name: "visible",
    type: "Ref<boolean>",
    description: "水印是否显示（响应式）",
  },
  {
    name: "show",
    type: "() => void",
    description: "显示水印",
  },
  {
    name: "hide",
    type: "() => void",
    description: "隐藏水印",
  },
  {
    name: "toggle",
    type: "() => void",
    description: "切换水印显示/隐藏",
  },
  {
    name: "options",
    type: "Ref<WatermarkOptions>",
    description: "水印配置（响应式），修改后自动重绘",
  },
]);
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.demo-content {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
  min-height: 100px;

  h4 {
    margin: 0 0 8px 0;
    color: var(--el-text-color-primary);
  }

  p {
    margin: 0 0 8px 0;
    color: var(--el-text-color-regular);
  }
}

.demo-controls {
  margin-bottom: 16px;
}

.demo-actions {
  margin-top: 12px;
  display: flex;
  gap: 12px;
}
</style>
