<template>
  <div class="rich-editor-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">RichEditor 富文本编辑器</h2>
        <p class="intro-text">
          RichEditor 是基于 WangEditor
          封装的富文本编辑组件，支持文字格式化、列表、引用、图片和链接插入等功能。配套
          <code class="code-inline">RichParser</code>
          组件可安全地渲染富文本内容。
        </p>

        <div class="intro-tips">
          <p>
            编辑器内置图片/视频 Base64
            上传、点击外部自动关闭工具栏下拉菜单等能力。组件卸载时自动销毁编辑器实例，避免内存泄漏。
          </p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。RichEditor
            主要依赖于 <code class="code-inline">@wangeditor/editor</code> 和
            <code class="code-inline">@wangeditor/editor-for-vue</code
            >，使用前请确保已安装该依赖。组件源码地址：<a href="#"
              >RichEditor.vue</a
            >，欢迎直接使用或根据需求进行二次开发。
          </p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">RichEditor 效果预览</span>
        </div>
      </template>

      <div class="preview-section">
        <h3 class="section-title">编辑器：</h3>
        <div class="preview-group">
          <div class="demo-box">
            <RichEditor v-model="editorContent" />
          </div>
        </div>

        <h3 class="section-title">解析预览：</h3>
        <div class="preview-group">
          <div class="demo-box">
            <RichParser :content="editorContent" />
          </div>
        </div>

        <h3 class="section-title">源码预览：</h3>
        <div class="preview-group">
          <div class="demo-box">
            <el-collapse v-model="activeNames">
              <el-collapse-item name="content" title="编辑内容">
                <pre class="code-block">{{ editorContent }}</pre>
              </el-collapse-item>
            </el-collapse>
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
        <h3 class="usage-subtitle">1. 基础用法</h3>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;RichEditor v-model="content" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { ref } from 'vue'
import RichEditor from '@/components/RichEditor/index.vue'

const content = ref('&lt;h1&gt;欢迎使用富文本编辑器&lt;/h1&gt;')
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">2. 禁用编辑</h3>
        <pre
          class="code-block"
        ><code>&lt;RichEditor v-model="content" disabled /&gt;</code></pre>

        <h3 class="usage-subtitle">3. 富文本解析渲染</h3>
        <pre class="code-block"><code>&lt;template&gt;
  &lt;RichParser :content="content" /&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import RichParser from '@/components/RichParser/index.vue'
&lt;/script&gt;</code></pre>
      </div>
    </Card>

    <!-- 属性说明 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">属性说明 (RichEditor)</span>
      </template>

      <el-table
        :data="propsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性" width="140" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="default" label="默认值" width="140" />
        <el-table-column prop="required" label="必填" width="60" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 事件说明 -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <span class="header-title">事件说明 (RichEditor)</span>
      </template>

      <el-table
        :data="eventsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="事件名" width="180" />
        <el-table-column prop="args" label="参数" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- RichParser 属性说明 -->
    <Card class="slots-card" :border-radius="16">
      <template #header>
        <span class="header-title">属性说明 (RichParser)</span>
      </template>

      <el-table
        :data="parserPropsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性" width="140" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="default" label="默认值" width="80" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from "vue";
import RichEditor from "@/components/RichEditor/index.vue";
import RichParser from "@/components/RichParser/index.vue";

defineOptions({ name: "RichEditorDemo" });

const editorContent = ref(`<h1>欢迎使用富文本编辑器</h1>
<p>这是一个基于 WangEditor 实现的富文本编辑组件</p>
<ul>
  <li>支持文字格式化</li>
  <li>支持列表和引用</li>
  <li>支持插入图片和链接</li>
</ul>
<blockquote>提示：编辑完成后，下方会实时显示解析后的内容。</blockquote>
<p><strong>粗体文字</strong> <em>斜体文字</em></p>`);

const activeNames = ref<string[]>(["content"]);

// RichEditor 属性列表
const propsList = [
  {
    name: "modelValue",
    type: "string",
    default: "-",
    required: "是",
    description: "富文本内容（v-model）",
  },
  {
    name: "placeholder",
    type: "string",
    default: "'请输入内容...'",
    required: "否",
    description: "占位提示文字",
  },
  {
    name: "disabled",
    type: "boolean",
    default: "false",
    required: "否",
    description: "是否禁用编辑",
  },
];

// RichEditor 事件列表
const eventsList = [
  {
    name: "update:modelValue",
    args: "(value: string)",
    description: "内容变化时触发",
  },
  { name: "change", args: "(value: string)", description: "内容变化时触发" },
];

// RichParser 属性列表
const parserPropsList = [
  {
    name: "content",
    type: "string",
    default: "-",
    description: "要渲染的富文本 HTML 内容（自动过滤 script/iframe/事件属性）",
  },
];
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专用样式
</style>
