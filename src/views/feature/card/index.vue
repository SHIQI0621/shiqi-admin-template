<template>
  <div class="card-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">Card 卡片</h2>
        <p class="intro-text">
          Card 组件是一个通用的内容容器，支持标题栏、图标、操作区、页脚等区域。
          可自定义边框、圆角、阴影等视觉属性，适用于表单面板、数据统计、说明块等后台常见内容承载场景。
        </p>
        <div class="intro-tips">
          <p>
            Card 组件提供了 header、header-right、footer、default
            四个插槽，可灵活定制卡片各区域。bordered 默认为
            false，需手动开启边框。 支持 icon
            属性在标题左侧显示图标，description 属性快速设置内容文字。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制组件源码到自己的项目中使用。Card
            主要依赖于
            <code class="code-inline">element-plus</code>。源码地址：<a href="#"
              >Card.vue</a
            >，欢迎直接使用或根据需求进行二次开发。
          </p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">Card 效果预览</span>
        </div>
      </template>

      <div class="preview-section">
        <h3 class="section-title">五种类型一览：</h3>
        <div class="card-grid">
          <!-- 1. 基础卡片 -->
          <Card
            icon="MagicStick"
            title="基础卡片"
            description="适合承载表单、图表、统计卡片、说明块等常见后台内容区域。"
          />

          <!-- 2. 无边框卡片（默认） -->
          <Card
            icon="Minus"
            title="无边框卡片"
            description="bordered 默认为 false，不显示边框，适合简洁布局。"
          />

          <!-- 3. 带边框卡片 -->
          <Card
            icon="Link"
            title="带边框卡片"
            description="设置 bordered 属性后显示边框，与其他卡片形成视觉分隔。"
            bordered
          />

          <!-- 3. 带操作区卡片 -->
          <Card
            icon="Setting"
            title="带操作区卡片"
            description="通过 header-right 插槽可以在右侧放按钮、状态、筛选器等操作内容。"
          >
            <template #header-right>
              <el-button type="primary" link>编辑</el-button>
              <el-button type="danger" link>删除</el-button>
            </template>
          </Card>

          <!-- 4. 自定义圆角 -->
          <Card
            icon="Star"
            title="自定义圆角"
            description="通过 borderRadius 可以控制卡片圆角大小，支持数字或字符串。"
            :border-radius="16"
          />

          <!-- 5. 带页脚卡片 -->
          <Card
            icon="Document"
            title="带页脚卡片"
            description="除默认内容区域外，还支持 footer 插槽，适合放操作按钮或补充说明。"
            footer-align="right"
          >
            <template #footer>
              <el-button>取消</el-button>
              <el-button type="primary">保存</el-button>
            </template>
          </Card>
        </div>

        <!-- 补充预览：多种阴影模式 -->
        <h3 class="section-title">阴影模式：</h3>
        <div class="card-grid">
          <Card title="永不显示阴影" shadow="never" description="shadow='never'（默认）" />
          <Card title="悬浮显示阴影" shadow="hover" description="鼠标悬浮查看效果" />
          <Card
            shadow="hover"
            title="自定义圆角悬浮显示阴影"
            description="自定义圆角悬浮显示阴影"
            :border-radius="16"
          />
          <Card title="始终显示阴影" shadow="always" description="shadow='always'" />
        </div>

        <!-- 补充预览：自定义 body 样式 -->
        <h3 class="section-title">自定义 body 样式：</h3>
        <div class="card-grid">
          <Card
            title="自定义 body 样式"
            shadow="always"
            :body-style="{
              padding: '32px',
              background: 'var(--el-fill-color-lighter)',
            }"
            description="通过 bodyStyle 属性自定义内容区样式。"
          />
        </div>
      </div>
    </Card>

    <!-- 基础用法 -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <span class="header-title">基础用法</span>
      </template>

      <div class="usage-section">
        <h3 class="usage-subtitle">1. 基础卡片</h3>
        <pre class="code-block"><code>&lt;Card title="基础卡片" description="卡片内容" /&gt;</code></pre>

        <h3 class="usage-subtitle">2. 带图标和边框</h3>
        <pre class="code-block">
          <code>
            &lt;Card
                icon="Setting"
                title="带边框卡片"
                description="通过 bordered 属性控制边框"
                bordered
            /&gt;
          </code>
        </pre>

        <h3 class="usage-subtitle">3. 带操作区（header-right 插槽）</h3>
        <pre class="code-block">
          <code>
            &lt;Card title="带操作区卡片" description="..."&gt;
              &lt;template #header-right&gt;
                &lt;el-button type="primary" link&gt;编辑&lt;/el-button&gt;
                &lt;el-button type="danger" link&gt;删除&lt;/el-button&gt;
              &lt;/template&gt;
            &lt;/Card&gt;
          </code>
        </pre>

        <h3 class="usage-subtitle">4. 自定义圆角</h3>
        <pre class="code-block"><code>&lt;Card title="自定义圆角" :border-radius="16" description="..." /&gt;</code></pre>

        <h3 class="usage-subtitle">5. 带页脚（footer 插槽）</h3>
        <pre class="code-block">
          <code>
            &lt;Card title="带页脚卡片" description="..." footer-align="right"&gt;
              &lt;template #footer&gt;
                &lt;el-button&gt;取消&lt;/el-button&gt;
                &lt;el-button type="primary"&gt;保存&lt;/el-button&gt;
              &lt;/template&gt;
            &lt;/Card&gt;
          </code>
        </pre>
      </div>
    </Card>

    <!-- 属性说明 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">属性说明</span>
      </template>

      <el-table
        :data="propsData"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="160" />
        <el-table-column prop="type" label="类型" width="240" />
        <el-table-column prop="default" label="默认值" width="100" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 插槽说明 -->
    <Card class="slots-card" :border-radius="16">
      <template #header>
        <span class="header-title">插槽说明</span>
      </template>

      <el-table
        :data="slotsData"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="插槽名" width="160" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 实际应用 -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <span class="header-title">实际应用</span>
      </template>

      <div class="app-examples">
        <div class="example-title">表单面板</div>
        <div class="example-row">
          <Card
            icon="User"
            title="用户信息"
            bordered
            :body-style="{ padding: '24px' }"
          >
            <template #header-right>
              <el-tag type="success">已激活</el-tag>
            </template>
            <p style="margin: 0 0 12px">姓名：张三</p>
            <p style="margin: 0 0 12px">邮箱：zhangsan@example.com</p>
            <p style="margin: 0">角色：管理员</p>
            <template #footer>
              <el-button type="primary">保存修改</el-button>
            </template>
          </Card>
        </div>

        <div class="example-title">数据统计卡片</div>
        <div class="example-row">
          <Card
            icon="TrendCharts"
            title="本月访问量"
            shadow="hover"
            :border-radius="12"
            :body-style="{ textAlign: 'center', padding: '32px' }"
          >
            <div
              style="
                font-size: 28px;
                font-weight: 700;
                color: var(--el-color-primary);
              "
            >
              12,846
            </div>
            <p style="color: var(--el-text-color-secondary); margin: 8px 0 0">
              较上月增长 12.5%
            </p>
          </Card>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/Card/index.vue";

defineOptions({ name: "CardDemo" });

// 属性列表
const propsData = ref([
  {
    name: "title",
    type: "string",
    default: "''",
    description: "卡片标题",
  },
  {
    name: "icon",
    type: "string",
    default: "''",
    description: "标题左侧图标（Element Plus 图标名称）",
  },
  {
    name: "iconSize",
    type: "number",
    default: "18",
    description: "图标大小（px）",
  },
  {
    name: "description",
    type: "string",
    default: "''",
    description: "卡片描述文字（当无默认插槽时作为内容）",
  },
  {
    name: "bordered",
    type: "boolean",
    default: "false",
    description: "是否显示边框",
  },
  {
    name: "borderRadius",
    type: "string | number",
    default: "''",
    description: "自定义圆角大小",
  },
  {
    name: "shadow",
    type: "'always' | 'hover' | 'never'",
    default: "'never'",
    description: "阴影显示方式",
  },
  {
    name: "footerAlign",
    type: "'left' | 'center' | 'right'",
    default: "'right'",
    description: "页脚对齐方式",
  },
  {
    name: "bodyStyle",
    type: "Record<string, string>",
    default: "{}",
    description: "自定义 body 样式",
  },
]);

// 插槽列表
const slotsData = ref([
  {
    name: "default",
    description: "卡片主体内容（未设置时使用 description 属性）",
  },
  {
    name: "header",
    description: "自定义 header 左侧区域（覆盖 title + icon）",
  },
  { name: "header-right", description: "header 右侧区域（按钮、状态等）" },
  { name: "footer", description: "底部区域" },
]);
</script>

<style scoped lang="scss">
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  background-color: var(--el-fill-color-lighter);
  padding: 16px;
  border-radius: 8px;
}
</style>
