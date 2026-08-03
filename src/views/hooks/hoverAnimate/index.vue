<template>
  <div class="hover-animate-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">Hover 动画演示</h2>
        <p class="intro-text">
          本项目封装了 17 种精美的 Hover
          动画效果，简化了使用方式，只需传入动画名称
          <code class="code-inline">name</code>
          属性即可开箱即用。这些动画涵盖了弹性、变换、特效、动感和创意等多种类型，可以满足各种交互场景的悬停反馈需求。
        </p>

        <div class="intro-tips">
          <div class="tip-item">
            <strong>与 Transition 内置动画的区别：</strong>
          </div>
          <ul>
            <li>
              <b>Transition 动画</b>：用于元素进入/离开页面时的过渡效果（基于
              <code>v-if</code> /
              <code>v-show</code> 的状态变化），适合页面切换、列表项出现等场景。
            </li>
            <li>
              <b>Hover 动画</b
              >：用于鼠标悬停时的交互反馈，增强用户体验和可点击性提示，适合按钮、卡片、图标等可交互元素。
            </li>
          </ul>
          <p class="tip-note">两者解决不同的问题，可以同时使用，互不冲突。</p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制
            <code class="code-inline">HoverAnimateWrapper</code>
            组件源码到自己的项目中使用。
          </p>
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
        <HoverAnimateWrapper
          :name="config.name"
          :duration="config.duration"
          :intensity="config.intensity"
        >
          <div class="preview-content">
            <el-icon :size="64" class="preview-icon">
              <component :is="currentIcon" />
            </el-icon>
            <span class="preview-label">{{ config.name }}</span>
          </div>
        </HoverAnimateWrapper>

        <p class="preview-hint">将鼠标悬停在上方元素上即可看到动画效果</p>
      </div>
    </Card>

    <!-- 基础配置 -->
    <Card class="config-card" :border-radius="16">
      <template #header>
        <span class="header-title">基础配置</span>
      </template>

      <div class="config-form">
        <el-form :model="config" label-width="120px" label-position="right">
          <el-form-item label="动画类型">
            <el-select v-model="config.name" placeholder="选择动画类型">
              <el-option-group label="缩放效果">
                <el-option label="scale (缩放效果)" value="scale" />
                <el-option label="bounce (弹性效果)" value="bounce" />
                <el-option label="squeeze (横向挤压)" value="squeeze" />
                <el-option label="squish (纵向压扁)" value="squish" />
              </el-option-group>
              <el-option-group label="变换效果">
                <el-option label="shake (水平抖动)" value="shake" />
                <el-option label="swing (摇摆效果)" value="swing" />
                <el-option label="flip (翻转动画)" value="flip" />
                <el-option label="tilt (3D倾斜)" value="tilt" />
              </el-option-group>
              <el-option-group label="特殊效果">
                <el-option label="fade (淡出效果)" value="fade" />
                <el-option label="pulse (脉冲效果)" value="pulse" />
                <el-option label="glow (发光效果)" value="glow" />
                <el-option label="float (悬浮效果)" value="float" />
              </el-option-group>
              <el-option-group label="创意效果">
                <el-option label="rubber-band (橡皮筋)" value="rubber-band" />
                <el-option label="tada (欢呼效果)" value="tada" />
                <el-option label="wobble (摇摆抖动)" value="wobble" />
                <el-option label="jello (果冻效果)" value="jello" />
                <el-option label="heartbeat (心跳效果)" value="heartbeat" />
              </el-option-group>
            </el-select>
          </el-form-item>

          <el-form-item label="动画时长">
            <el-input-number
              v-model="config.duration"
              :min="100"
              :max="2000"
              :step="50"
              controls-position="right"
            />
            <span class="form-suffix">毫秒</span>
          </el-form-item>

          <el-form-item label="动画强度">
            <el-select v-model="config.intensity">
              <el-option label="light (柔和)" value="light" />
              <el-option label="normal (正常)" value="normal" />
              <el-option label="strong (强烈)" value="strong" />
            </el-select>
          </el-form-item>

          <el-form-item label="标签类型">
            <el-select v-model="config.tag">
              <el-option label="div" value="div" />
              <el-option label="span" value="span" />
              <el-option label="button" value="button" />
              <el-option label="a" value="a" />
            </el-select>
          </el-form-item>
        </el-form>
      </div>
    </Card>

    <!-- 动画列表 -->
    <Card class="list-card" :border-radius="16">
      <template #header>
        <span class="header-title">全部动画效果</span>
      </template>

      <div class="animation-grid">
        <div
          v-for="anim in animationList"
          :key="anim.name"
          class="animation-item"
          @click="selectAnimation(anim)"
          :class="{ 'is-active': config.name === anim.name }"
        >
          <HoverAnimateWrapper
            :name="anim.name"
            :duration="300"
            intensity="normal"
          >
            <div class="anim-preview">
              <el-icon :size="32">
                <component :is="anim.icon" />
              </el-icon>
            </div>
          </HoverAnimateWrapper>
          <span class="anim-name">{{ anim.name }}</span>
          <span class="anim-category">{{ anim.category }}</span>
        </div>
      </div>
    </Card>

    <!-- 基础用法 -->
    <Card class="usage-card" :border-radius="16">
      <template #header>
        <span class="header-title">基础用法</span>
      </template>

      <div class="usage-section">
        <h3 class="usage-subtitle">基础用法</h3>
        <pre class="code-block">
          <code>
            &lt;template&gt;
            &lt;HoverAnimateWrapper name="bounce"&gt;
              &lt;el-button type="primary"&gt;点击我&lt;/el-button&gt;
            &lt;/HoverAnimateWrapper&gt;
            &lt;/template&gt;

            &lt;script setup lang="ts"&gt;
            import HoverAnimateWrapper from '@/components/HoverAnimateWrapper/index.vue'
            &lt;/script&gt;
          </code>
        </pre>

        <h3 class="usage-subtitle">自定义配置</h3>
        <pre class="code-block">
          <code>
            &lt;HoverAnimateWrapper
                name="glow"
                :duration="500"
                intensity="strong"
                tag="div"
            &gt;
            &lt;div class="my-card"&gt;卡片内容&lt;/div&gt;
            &lt;/HoverAnimateWrapper&gt;
          </code>
        </pre>
        <h3 class="usage-subtitle">自动循环播放</h3>
        <pre class="code-block">
          <code>
            &lt;HoverAnimateWrapper name="pulse" auto-play&gt;&lt;el-icon :size="32"&gt;&lt;Bell /&gt;&lt;/el-icon&gt;&lt;/HoverAnimateWrapper&gt;
          </code>
        </pre>

        <h3 class="usage-subtitle">useHoverAnimate Hook 用法</h3>
        <p class="demo-desc">使用 Hook 可以更灵活地控制动画状态，适合需要编程式触发的场景。</p>
        <pre class="code-block">
          <code>
            &lt;template&gt;
              &lt;div
                :class="wrapperClass"
                :style="wrapperStyle"
                @mouseenter="handleMouseEnter"
                @mouseleave="handleMouseLeave"
              &gt;
                &lt;el-button type="primary"&gt;{ { isHovering ? '悬停中' : '悬浮我' } }&lt;/el-button&gt;
              &lt;/div&gt;
            &lt;/template&gt;

            &lt;script setup lang="ts"&gt;
            import { useHoverAnimate } from '@/hooks/useHoverAnimate'

            const {
              isHovering,        // 是否正在悬停
              isAnimating,       // 是否正在播放动画
              wrapperClass,      // 绑定到元素的 class
              wrapperStyle,      // 绑定到元素的 style（CSS 变量）
              handleMouseEnter,  // mouseenter 事件处理
              handleMouseLeave,  // mouseleave 事件处理
            } = useHoverAnimate({
              name: 'bounce',
              duration: 500,
              intensity: 'strong',
            })
            &lt;/script&gt;
          </code>
        </pre>

        <h3 class="usage-subtitle">Hook 编程式触发 &amp; 自动播放</h3>
        <p class="demo-desc">通过 trigger() 手动触发动画，或通过 startAutoPlay/stopAutoPlay 控制循环播放。</p>
        <pre class="code-block">
          <code>
            &lt;script setup lang="ts"&gt;
            import { useHoverAnimate } from '@/hooks/useHoverAnimate'

            const {
              isAnimating,
              wrapperClass,
              wrapperStyle,
              trigger,        // 手动触发一次动画
              startAutoPlay,  // 开始自动循环播放
              stopAutoPlay,   // 停止自动循环播放
            } = useHoverAnimate({
              name: 'pulse',
              duration: 600,
              autoPlay: true,  // 挂载时自动开始播放
            })

            // 编程式触发：点击按钮时播放一次动画
            function handleClick() {
              trigger()
            }

            // 手动控制自动播放
            function toggleAutoPlay(on: boolean) {
              if (on) startAutoPlay()
              else stopAutoPlay()
            }
            &lt;/script&gt;
          </code>
        </pre>

        <h3 class="usage-subtitle">v-hover 自定义指令用法</h3>
        <p class="demo-desc">最简方式：直接在任意元素上使用 v-hover 指令，自动注入动画样式与事件绑定。</p>
        <pre class="code-block">
          <code>
            &lt;template&gt;
              &lt;!-- 基础用法：默认 squeeze 动画 --&gt;
              &lt;el-button v-hover&gt;按钮&lt;/el-button&gt;

              &lt;!-- 指定动画名称 --&gt;
              &lt;el-icon v-hover="{ name: 'bounce' }" :size="24"&gt;
                &lt;Star /&gt;
              &lt;/el-icon&gt;

              &lt;!-- 完整配置 --&gt;
              &lt;div v-hover="{ name: 'glow', duration: 500, intensity: 'strong' }"
                   class="my-card"&gt;
                卡片内容
              &lt;/div&gt;
            &lt;/template&gt;

            &lt;script setup lang="ts"&gt;
            // v-hover 已全局注册，无需手动 import
            &lt;/script&gt;
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
        :data="propsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性" width="100" />
        <el-table-column prop="type" label="类型" width="220" />
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
        :data="slotsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="插槽名" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 实际应用预览 -->
    <Card class="app-preview-card" :border-radius="16">
      <template #header>
        <span class="header-title">实际应用预览</span>
      </template>
      <div class="app-examples">
        <h3 class="example-title">按钮悬停效果</h3>
        <div class="example-row">
          <HoverAnimateWrapper
            v-for="anim in buttonAnims"
            :key="anim"
            :name="anim"
            :duration="300"
          >
            <el-button type="primary" plain>{{ anim }}</el-button>
          </HoverAnimateWrapper>
        </div>

        <h3 class="example-title">卡片悬停效果</h3>
        <div class="example-row">
          <HoverAnimateWrapper
            v-for="anim in cardAnims"
            :key="anim"
            :name="anim"
            :duration="400"
            intensity="light"
          >
            <div class="mini-card">
              <el-icon :size="24"><Star /></el-icon>
              <span>{{ anim }}</span>
            </div>
          </HoverAnimateWrapper>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import {
  CopyDocument,
  ZoomIn,
  Aim,
  MagicStick,
  Promotion,
  Medal,
  Sunny,
  Search,
  Star,
  Bell,
  Position,
  Refresh,
  Monitor,
  Menu,
  Key,
} from "@element-plus/icons-vue";
import type { AnimationName } from "@/components/HoverAnimateWrapper/index.vue";
import IconButton from "@/components/IconButton/index.vue";

interface AnimationItem {
  name: AnimationName;
  icon: any;
  category: string;
}

// 动画列表
const animationList: AnimationItem[] = [
  { name: "scale", icon: ZoomIn, category: "缩放" },
  { name: "bounce", icon: Aim, category: "缩放" },
  { name: "squeeze", icon: Menu, category: "缩放" },
  { name: "squish", icon: Key, category: "缩放" },
  { name: "shake", icon: Refresh, category: "变换" },
  { name: "swing", icon: Monitor, category: "变换" },
  { name: "flip", icon: MagicStick, category: "变换" },
  { name: "tilt", icon: Position, category: "变换" },
  { name: "fade", icon: Search, category: "特效" },
  { name: "pulse", icon: Star, category: "特效" },
  { name: "glow", icon: Sunny, category: "特效" },
  { name: "float", icon: Promotion, category: "特效" },
  { name: "rubber-band", icon: Medal, category: "创意" },
  { name: "tada", icon: Bell, category: "创意" },
  { name: "wobble", icon: Aim, category: "创意" },
  { name: "jello", icon: MagicStick, category: "创意" },
  { name: "heartbeat", icon: Star, category: "创意" },
];

// 属性列表
const propsList = [
  {
    name: "name",
    type: "'bounce' | 'scale' | 'shake' | 'swing' | 'flip' | 'fade' | 'pulse' | 'rubber-band' | 'tada' | 'wobble' | 'jello' | 'heartbeat' | 'float' | 'glow' | 'tilt' | 'squeeze' | 'squish'",
    default: "'scale'",
    description: "动画名称",
  },
  {
    name: "duration",
    type: "number",
    default: "300",
    description: "动画时长（毫秒）",
  },
  {
    name: "intensity",
    type: "'light' | 'normal' | 'strong'",
    default: "'normal'",
    description: "动画强度",
  },
  {
    name: "tag",
    type: "string",
    default: "'div'",
    description: "渲染的 HTML 标签",
  },
  {
    name: "autoPlay",
    type: "boolean",
    default: "false",
    description: "是否自动循环播放",
  },
];

// 插槽列表
const slotsList = [
  { name: "default", description: "包裹需要应用悬停动画的内容" },
];

// 当前配置
const config = reactive({
  name: "bounce" as AnimationName,
  duration: 300,
  intensity: "normal" as "light" | "normal" | "strong",
  tag: "div",
});

// 当前图标
const currentIcon = computed(() => {
  const found = animationList.find((a) => a.name === config.name);
  return found?.icon || Aim;
});

// 应用预览用的动画名
const buttonAnims: AnimationName[] = ["bounce", "pulse", "glow", "shake"];
const cardAnims: AnimationName[] = ["scale", "float", "tilt", "fade"];

// 选择动画
function selectAnimation(anim: AnimationItem) {
  config.name = anim.name;
  ElMessage.info(`已选择动画: ${anim.name}`);
}

// 复制代码
async function copyCode() {
  const code = `<HoverAnimateWrapper
  name="${config.name}"
  :duration="${config.duration}"
  intensity="${config.intensity}"
>
  <!-- 你的内容 -->
</HoverAnimateWrapper>`;

  try {
    await navigator.clipboard.writeText(code);
    ElMessage.success("代码已复制到剪贴板");
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = code;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      ElMessage.success("代码已复制到剪贴板");
    } catch {
      ElMessage.error("复制失败");
    }
    document.body.removeChild(textarea);
  }
}
</script>

<style scoped lang="scss">
// 卡片骨架、介绍区、预览区、代码块、API 表、应用预览等通用样式
// 均来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.intro-tips {
  .tip-item {
    margin-bottom: 8px;
    font-weight: 500;
  }

  ul {
    padding-left: 20px;
    line-height: 1.8;
  }

  .tip-note {
    margin-top: 8px;
    color: var(--el-text-color-secondary);
    font-size: 13px;
  }
}

.preview-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  padding: 40px;
  background-color: var(--el-fill-color-lighter);
  border-radius: 12px;
  border: 2px dashed var(--el-border-color);

  .preview-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    padding: 24px 40px;
    background: linear-gradient(
      135deg,
      var(--el-color-primary) 0%,
      var(--el-color-primary-light-3) 100%
    );
    border-radius: 16px;
    color: #fff;
    min-width: 120px;
    min-height: 120px;
  }

  .preview-icon {
    color: #fff;
  }

  .preview-label {
    font-size: 14px;
    font-weight: 500;
    text-transform: capitalize;
  }

  .preview-hint {
    margin-top: 20px;
    color: var(--el-text-color-secondary);
    font-size: 13px;
  }
}

.config-form {
  max-width: 600px;

  .form-suffix {
    margin-left: 8px;
    color: var(--el-text-color-secondary);
  }
}

.animation-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 12px;
}

.animation-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: var(--el-bg-color);

  &:hover {
    border-color: var(--el-color-primary-light-5);
  }

  &.is-active {
    border-color: var(--el-color-primary);
    background-color: var(--el-color-primary-light-9);

    .anim-name {
      color: var(--el-color-primary);
    }
  }

  .anim-preview {
    width: 56px;
    height: 56px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--el-fill-color-light);
    border-radius: 8px;
    color: var(--el-color-primary);
    margin-bottom: 8px;
  }

  .anim-name {
    font-size: 13px;
    font-weight: 500;
    margin-bottom: 4px;
    text-transform: capitalize;
  }

  .anim-category {
    font-size: 11px;
    color: var(--el-text-color-secondary);
  }
}

.mini-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  font-size: 13px;
}
</style>
