<template>
  <div class="ripple-effect-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">RippleEffect 水波纹指令</h2>
        <p class="intro-text">
          v-ripple 是一个自定义 Vue3 指令，可为任意 DOM
          元素添加点击时的水波纹扩散效果。灵感来源于 Material Design 的 Ripple
          视觉反馈，支持自定义颜色、持续时间和缓动函数。
        </p>

        <div class="intro-tips">
          <p>
            该指令通过
            <code class="code-inline">registerDirectives</code>
            全局注册后即可在任何元素上使用。指令会自动为元素设置
            <code class="code-inline">position: relative</code> 和
            <code class="code-inline">overflow: hidden</code
            >（如未设置），水波纹从点击位置扩散并自动消失。
          </p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制指令源码到自己的项目中使用。v-ripple
            指令不依赖任何第三方库，纯原生实现。指令源码地址：<a href="#"
              >src/directives/ripple.ts</a
            >，注册入口：<a href="#">src/directives/index.ts</a
            >，欢迎直接使用或根据需求进行二次开发。
          </p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">v-ripple 效果预览</span>
        </div>
      </template>

      <div class="preview-section">
        <h3 class="section-title">基础水波纹：</h3>
        <div class="preview-group">
          <div class="demo-item">
            <span class="demo-label">默认</span>
            <el-button v-ripple>点击我试试</el-button>
          </div>
          <div class="demo-item">
            <span class="demo-label">蓝色</span>
            <el-button v-ripple="{ color: 'rgba(64, 158, 255, 0.3)' }"
              >点击我试试</el-button
            >
          </div>
          <div class="demo-item">
            <span class="demo-label">绿色</span>
            <el-button v-ripple="{ color: 'rgba(103, 194, 58, 0.3)' }"
              >点击我试试</el-button
            >
          </div>
          <div class="demo-item">
            <span class="demo-label">红色</span>
            <el-button v-ripple="{ color: 'rgba(245, 108, 108, 0.3)' }"
              >点击我试试</el-button
            >
          </div>
        </div>

        <h3 class="section-title">自定义时长与缓动：</h3>
        <div class="preview-group">
          <div class="demo-item">
            <span class="demo-label">快速</span>
            <el-button v-ripple="{ duration: 300 }">点击我试试</el-button>
          </div>
          <div class="demo-item">
            <span class="demo-label">慢速</span>
            <el-button v-ripple="{ duration: 1000 }">点击我试试</el-button>
          </div>
          <div class="demo-item">
            <span class="demo-label">ease-out</span>
            <el-button v-ripple="{ easing: 'ease-out' }">点击我试试</el-button>
          </div>
        </div>

        <h3 class="section-title">任意元素使用：</h3>
        <div class="preview-group">
          <div class="demo-item">
            <span class="demo-label">自定义盒子</span>
            <div v-ripple class="ripple-box">点击我试试</div>
          </div>
          <div class="demo-item">
            <span class="demo-label">这是一个 span</span>
            <span v-ripple class="ripple-span">点击试试</span>
          </div>
          <div class="demo-item">
            <span class="demo-label">卡片</span>
            <div v-ripple class="ripple-card">
              <h4>卡片标题</h4>
              <p>点击查看水波纹效果</p>
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
        <h3 class="usage-subtitle">1. 全局注册指令</h3>
        <pre class="code-block"><code>// main.ts
                import { registerDirectives } from '@/directives'

                const app = createApp(App)
                registerDirectives(app)
                app.mount('#app')</code></pre>

        <h3 class="usage-subtitle">2. 基础使用（默认参数）</h3>
        <pre
          class="code-block"
        ><code>&lt;!-- 不传参数，使用默认水波纹效果 --&gt;
                &lt;el-button v-ripple&gt;点击我&lt;/el-button&gt;

                &lt;!-- 在任意元素上使用 --&gt;
                &lt;div v-ripple&gt;点击产生水波纹&lt;/div&gt;
                &lt;span v-ripple&gt;也可以是行内元素&lt;/span&gt;</code></pre>

        <h3 class="usage-subtitle">3. 自定义颜色</h3>
        <pre
          class="code-block"
        ><code>&lt;el-button v-ripple="{ color: 'rgba(64, 158, 255, 0.3)' }"&gt;
                蓝色水波纹
                &lt;/el-button&gt;

                &lt;el-button v-ripple="{ color: 'rgba(103, 194, 58, 0.3)' }"&gt;
                绿色水波纹
                &lt;/el-button&gt;</code></pre>

        <h3 class="usage-subtitle">4. 自定义时长与缓动</h3>
        <pre class="code-block"><code>&lt;!-- 快速水波纹 --&gt;
                &lt;el-button v-ripple="{ duration: 300 }"&gt;快速&lt;/el-button&gt;

                &lt;!-- 慢速水波纹 --&gt;
                &lt;el-button v-ripple="{ duration: 1500 }"&gt;慢速&lt;/el-button&gt;

                &lt;!-- 自定义缓动函数 --&gt;
                &lt;el-button v-ripple="{ easing: 'ease-out' }"&gt;ease-out&lt;/el-button&gt;

                &lt;!-- 组合使用 --&gt;
                &lt;el-button v-ripple="{ color: 'rgba(64, 158, 255, 0.3)', duration: 600, easing: 'ease-in-out' }"&gt;
                自定义组合
                &lt;/el-button&gt;</code></pre>
      </div>
    </Card>

    <!-- 指令参数说明 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">指令参数说明</span>
      </template>

      <el-table
        :data="directiveParamsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="120" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="default" label="默认值" width="160" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 回调说明 -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <span class="header-title">指令说明</span>
      </template>

      <el-table
        :data="directiveInfoList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="生命周期" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 实际应用预览 -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <span class="header-title">实际应用预览</span>
      </template>

      <div class="app-examples">
        <h3 class="example-title">列表项水波纹</h3>
        <div class="example-row">
          <div class="ripple-list">
            <div
              v-for="(item, index) in listItems"
              :key="index"
              v-ripple
              class="ripple-list-item"
            >
              <span class="ripple-list-item__title">{{ item.title }}</span>
              <span class="ripple-list-item__desc">{{ item.desc }}</span>
            </div>
          </div>
        </div>

        <h3 class="example-title">操作按钮组</h3>
        <div class="example-row">
          <el-button v-ripple type="primary">主要操作</el-button>
          <el-button v-ripple type="success">确认提交</el-button>
          <el-button v-ripple type="warning">警告操作</el-button>
          <el-button v-ripple type="danger">删除数据</el-button>
          <el-button v-ripple type="info">查看详情</el-button>
        </div>

        <h3 class="example-title">卡片点击反馈</h3>
        <div class="example-row">
          <div class="ripple-card-grid">
            <div
              v-for="(card, index) in cardItems"
              :key="index"
              v-ripple
              class="ripple-card-item"
            >
              <div
                class="ripple-card-item__icon"
                :style="{ color: card.color }"
              >
                {{ card.icon }}
              </div>
              <div class="ripple-card-item__title">{{ card.title }}</div>
              <div class="ripple-card-item__value">{{ card.value }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref } from "vue";

// 列表数据
const listItems = ref([
  { title: "用户管理", desc: "系统用户增删改查与权限配置" },
  { title: "角色管理", desc: "角色定义与权限分配" },
  { title: "菜单管理", desc: "菜单树配置与路由管理" },
  { title: "部门管理", desc: "组织架构与部门层级管理" },
]);

// 卡片数据
const cardItems = ref([
  {
    icon: "👥",
    title: "用户总数",
    value: "12,486",
    color: "var(--el-color-primary)",
  },
  {
    icon: "📦",
    title: "订单数量",
    value: "3,842",
    color: "var(--el-color-success)",
  },
  {
    icon: "💬",
    title: "消息通知",
    value: "586",
    color: "var(--el-color-warning)",
  },
  {
    icon: "📊",
    title: "数据报表",
    value: "1,204",
    color: "var(--el-color-danger)",
  },
]);

// 指令参数列表
const directiveParamsList = [
  {
    name: "color",
    type: "string",
    default: "'rgba(0, 0, 0, 0.15)'",
    description: "水波纹颜色，支持 rgba、hex 等标准 CSS 颜色值",
  },
  {
    name: "duration",
    type: "number",
    default: "800",
    description: "水波纹扩散持续时长（毫秒）",
  },
  {
    name: "easing",
    type: "string",
    default: "'cubic-bezier(0.4, 0, 0.2, 1)'",
    description: "CSS 缓动函数，如 ease、ease-in-out、cubic-bezier 等",
  },
];

// 指令信息
const directiveInfoList = [
  {
    name: "mounted",
    description: "指令绑定到元素时，注册 click 事件监听器，开始创建水波纹效果",
  },
  {
    name: "updated",
    description: "指令绑定值更新时，移除旧的监听器并重新绑定，确保参数实时生效",
  },
  {
    name: "unmounted",
    description: "指令从元素上解绑时，移除 click 事件监听器，清理副作用",
  },
];
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.demo-item {
  display: flex;
  align-items: center;
  gap: 16px;
}

.demo-label {
  min-width: 100px;
  color: var(--el-text-color-secondary);
  font-size: 13px;
}

.ripple-box {
  width: 150px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--el-fill-color-light);
  border-radius: 8px;
  cursor: pointer;
  color: var(--el-text-color-regular);
  transition: background 0.2s;

  &:hover {
    background: var(--el-fill-color);
  }
}

.ripple-span {
  display: inline-block;
  padding: 12px 20px;
  background: var(--el-color-primary-light-9);
  border-radius: 8px;
  cursor: pointer;
  color: var(--el-color-primary);
  transition: background 0.2s;

  &:hover {
    background: var(--el-color-primary-light-8);
  }
}

.ripple-card {
  width: 200px;
  padding: 16px;
  background: var(--el-color-success-light-9);
  border-radius: 8px;
  cursor: pointer;
  color: var(--el-color-success);
  transition: background 0.2s;

  &:hover {
    background: var(--el-color-success-light-8);
  }

  h4 {
    margin: 0 0 8px 0;
    color: var(--el-color-success-dark-2);
  }

  p {
    margin: 0;
    font-size: 12px;
  }
}

// 实际应用预览
.ripple-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 500px;
}

.ripple-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  cursor: pointer;

  &__title {
    font-weight: 500;
    color: var(--el-text-color-primary);
  }

  &__desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
  }
}

.ripple-card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.ripple-card-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  cursor: pointer;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  }

  &__icon {
    font-size: 32px;
  }

  &__title {
    font-size: 14px;
    color: var(--el-text-color-regular);
  }

  &__value {
    font-size: 20px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}
</style>
