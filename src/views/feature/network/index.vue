<template>
  <div class="network-page">
    <!-- 介绍 -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h2 class="intro-title">useNetwork Hook 演示</h2>
        <p class="intro-text">
          useNetwork 是一个网络状态监听 Hook，封装了浏览器的 online/offline
          事件与 Network Information
          API，提供响应式的网络状态数据，适用于弱网提示、数据节省模式检测等场景。
        </p>

        <div class="intro-tips">
          <p>
            Hook 会自动监听网络连接状态变化、网络类型（4G/3G
            等）、下行带宽、往返时间等指标，并维护在线时长计时器。组件卸载时自动清理事件监听。
          </p>
        </div>

        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            如果你不想使用整个项目，也可以直接复制 Hook
            源码到自己的项目中使用。useNetwork 主要依赖于
            <code class="code-inline">vue</code>
            的响应式系统，无其他第三方依赖。Hook 源码地址：<a href="#"
              >useNetwork.ts</a
            >，欢迎直接使用或根据需求进行二次开发。
          </p>
        </div>
      </div>
    </Card>

    <!-- 效果预览 -->
    <Card class="preview-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">网络状态效果预览</span>
          <IconButton type="primary" plain size="small" @click="refresh">
            <template #icon>
              <el-icon><Refresh /></el-icon>
            </template>
            刷新状态
          </IconButton>
        </div>
      </template>

      <div class="preview-section">
        <h3 class="section-title">连接状态：</h3>
        <div class="preview-group">
          <div class="status-card" :class="online ? 'online' : 'offline'">
            <div class="status-icon">
              <el-icon :size="36">
                <Connection v-if="online" />
                <Warning v-else />
              </el-icon>
            </div>
            <div class="status-info">
              <div class="status-label">
                {{ online ? "网络已连接" : "网络已断开" }}
              </div>
              <div
                class="status-desc"
                :class="online ? 'text-success' : 'text-danger'"
              >
                {{ online ? "您当前处于在线状态" : "请检查网络连接" }}
              </div>
            </div>
          </div>
        </div>

        <h3 class="section-title">网络详细信息：</h3>
        <div class="preview-group">
          <el-descriptions
            :column="2"
            border
            :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
          >
            <el-descriptions-item label="连接状态">
              <BaseTag
                :type="online ? 'success' : 'danger'"
                round
                :text="online ? '在线' : '离线'"
              />
            </el-descriptions-item>
            <el-descriptions-item label="网络类型">
              <BaseTag type="info" :text="effectiveType || '未知'" />
            </el-descriptions-item>
            <el-descriptions-item label="下行带宽">
              {{ downlink ? downlink + " Mbps" : "未知" }}
            </el-descriptions-item>
            <el-descriptions-item label="往返时间">
              {{ rtt ? rtt + " ms" : "未知" }}
            </el-descriptions-item>
            <el-descriptions-item label="数据节省模式">
              <BaseTag v-if="saveData" type="warning" round text="已开启" />
              <BaseTag v-else type="success" round text="未开启" />
            </el-descriptions-item>
            <el-descriptions-item label="在线时间">
              {{ formatUptime(uptime) }}
            </el-descriptions-item>
          </el-descriptions>
        </div>

        <h3 class="section-title">手动测试：</h3>
        <div class="preview-group">
          <div class="demo-box">
            <el-button type="primary" @click="manualTest('online')"
              >模拟在线</el-button
            >
            <el-button type="danger" @click="manualTest('offline')"
              >模拟离线</el-button
            >
            <el-button @click="init">恢复真实状态</el-button>
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
        <pre
          class="code-block"
        ><code>import { useNetwork } from '@/hooks/useNetwork'

const { online, effectiveType, downlink, rtt, saveData, uptime } = useNetwork()

// online — 是否在线 (ComputedRef&lt;boolean&gt;)
// effectiveType — 网络类型 (ComputedRef&lt;string&gt;)
// downlink — 下行带宽 (ComputedRef&lt;number | null&gt;)
// rtt — 往返时间 (ComputedRef&lt;number | null&gt;)
// saveData — 是否节省流量 (ComputedRef&lt;boolean&gt;)
// uptime — 在线时长秒数 (Ref&lt;number&gt;)</code></pre>

        <h3 class="usage-subtitle">2. 带回调函数</h3>
        <pre
          class="code-block"
        ><code>const { online, init, destroy } = useNetwork({
  onOnline: () =&gt; {
    console.log('网络已连接')
  },
  onOffline: () =&gt; {
    console.log('网络已断开')
  },
})

// 手动初始化监听
init()

// 手动销毁监听
destroy()</code></pre>

        <h3 class="usage-subtitle">3. 在组件中使用</h3>
        <pre
          class="code-block"
        ><code>import { onMounted, onBeforeUnmount } from 'vue'
import { useNetwork } from '@/hooks/useNetwork'

const network = useNetwork()

onMounted(() =&gt; {
  network.init()
})

onBeforeUnmount(() =&gt; {
  network.destroy()
})</code></pre>
      </div>
    </Card>

    <!-- Hook 参数 -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <span class="header-title">Hook 参数 (UseNetworkOptions)</span>
      </template>

      <el-table
        :data="optionsList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="140" />
        <el-table-column prop="type" label="类型" width="200" />
        <el-table-column prop="default" label="默认值" width="80" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- Hook 返回值 -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <span class="header-title">Hook 返回值</span>
      </template>

      <el-table
        :data="returnList"
        class="api-table"
        size="small"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="属性/方法" width="140" />
        <el-table-column prop="type" label="类型" width="220" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { onMounted, onBeforeUnmount } from "vue";
import { useNetwork } from "@/hooks/useNetwork";

defineOptions({ name: "NetworkMonitor" });

const {
  online,
  effectiveType,
  downlink,
  rtt,
  saveData,
  uptime,
  isOnline,
  init,
  destroy,
  refresh,
} = useNetwork({
  onOnline: () => {
    console.log("网络已连接");
  },
  onOffline: () => {
    console.log("网络已断开");
  },
});

void isOnline;

const optionsList = [
  {
    name: "onOnline",
    type: "() => void",
    default: "-",
    description: "网络连接恢复时的回调函数",
  },
  {
    name: "onOffline",
    type: "() => void",
    default: "-",
    description: "网络连接断开时的回调函数",
  },
];

const returnList = [
  {
    name: "online",
    type: "ComputedRef<boolean>",
    description: "是否处于在线状态",
  },
  {
    name: "isOnline",
    type: "Ref<boolean>",
    description: "在线状态的原始响应式引用",
  },
  {
    name: "effectiveType",
    type: "ComputedRef<string>",
    description: "网络类型 (如 4G/3G/2G)",
  },
  {
    name: "downlink",
    type: "ComputedRef<number | null>",
    description: "下行带宽 (Mbps)",
  },
  {
    name: "rtt",
    type: "ComputedRef<number | null>",
    description: "往返时间 (ms)",
  },
  {
    name: "saveData",
    type: "ComputedRef<boolean>",
    description: "是否开启数据节省模式",
  },
  {
    name: "uptime",
    type: "Ref<number>",
    description: "在线时长 (秒)",
  },
  {
    name: "init",
    type: "() => void",
    description: "手动初始化事件监听",
  },
  {
    name: "destroy",
    type: "() => void",
    description: "手动销毁事件监听",
  },
  {
    name: "refresh",
    type: "() => void",
    description: "手动刷新网络详细信息",
  },
];

function formatUptime(seconds: number) {
  if (!seconds) return "0秒";
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(days + "天");
  if (hours > 0) parts.push(hours + "小时");
  if (minutes > 0) parts.push(minutes + "分钟");
  parts.push(secs + "秒");

  return parts.join("");
}

function manualTest(status: "online" | "offline") {
  if (status === "online") {
    isOnline.value = true;
  } else {
    isOnline.value = false;
  }
}

onMounted(() => {
  init();
});

onBeforeUnmount(() => {
  destroy();
});
</script>

<style scoped lang="scss">
// 通用样式来自全局 src/views/feature/styles/demo.scss，此处仅保留页面专属样式

.status-card {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 24px;
  background: var(--el-fill-color-lighter);
  border-radius: 12px;
  width: fit-content;

  .status-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 64px;
    height: 64px;
    border-radius: 50%;
  }

  &.online .status-icon {
    background: var(--el-color-success-light-9);
    color: var(--el-color-success);
  }

  &.offline .status-icon {
    background: var(--el-color-danger-light-9);
    color: var(--el-color-danger);
  }

  .status-info {
    .status-label {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .status-desc {
      font-size: 14px;
    }
  }

  .text-success {
    color: var(--el-color-success);
  }

  .text-danger {
    color: var(--el-color-danger);
  }
}
</style>
