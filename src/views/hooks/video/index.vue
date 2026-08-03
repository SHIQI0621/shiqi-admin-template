<template>
  <div class="video-page">
    <!-- 1. intro-card -->
    <Card class="intro-card" :border-radius="16">
      <div class="intro-section">
        <h1 class="intro-title">useVideo 视频播放</h1>
        <p class="intro-text">
          基于西瓜播放器（xgplayer）封装的 useVideo
          Hook，支持视频播放、暂停、跳转、音量控制、
          播放速率调节、全屏、画中画、截图等功能。适用于视频课程、直播流、视频预览等场景。
        </p>
        <div class="intro-tips">
          <p>
            <strong>提示：</strong>
            依赖 <code class="code-inline">xgplayer</code> 库，已安装。通过 Hook
            返回的
            <code class="code-inline">init(containerId, options)</code>
            方法初始化播放器， 自动管理生命周期（onBeforeUnmount 自动销毁）。
          </p>
        </div>
        <div class="intro-usage">
          <div class="usage-title">📦 独立使用</div>
          <p>
            导入路径：<span class="code-inline"
              >import { useVideo } from '@/hooks/useVideo'</span
            >
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

      <!-- 播放器容器 -->
      <div class="player-wrapper">
        <div id="xg-player" class="xg-player-container"></div>
      </div>

      <!-- 播放器控制面板 -->
      <div class="player-controls">
        <div class="control-row">
          <span class="control-label">视频源：</span>
          <el-select
            v-model="currentVideo"
            placeholder="选择视频"
            style="width: 320px"
            @change="handleSwitchVideo"
          >
            <el-option
              v-for="v in videoList"
              :key="v.url"
              :label="v.title"
              :value="v.url"
            />
          </el-select>
          <el-button type="primary" @click="handleInit">初始化播放器</el-button>
        </div>

        <div class="control-row">
          <span class="control-label">播放控制：</span>
          <el-button
            :type="isPlaying ? 'warning' : 'success'"
            @click="togglePlay"
          >
            {{ isPlaying ? "暂停" : "播放" }}
          </el-button>
          <el-button @click="seek(currentTime - 10)">后退10s</el-button>
          <el-button @click="seek(currentTime + 10)">前进10s</el-button>
          <el-button @click="seek(0)">回到开头</el-button>
        </div>

        <div class="control-row">
          <span class="control-label">音量：</span>
          <el-slider
            v-model="volumeValue"
            :min="0"
            :max="1"
            :step="0.01"
            style="width: 200px"
            @input="handleVolumeChange"
          />
          <el-button @click="toggleMute">{{
            isMuted ? "取消静音" : "静音"
          }}</el-button>
        </div>

        <div class="control-row">
          <span class="control-label">倍速：</span>
          <el-select
            v-model="rateValue"
            style="width: 100px"
            @change="handleRateChange"
          >
            <el-option label="0.5x" :value="0.5" />
            <el-option label="1.0x" :value="1" />
            <el-option label="1.5x" :value="1.5" />
            <el-option label="2.0x" :value="2" />
          </el-select>
        </div>

        <div class="control-row">
          <span class="control-label">功能：</span>
          <el-button @click="toggleFullscreen">全屏</el-button>
          <el-button @click="togglePip">画中画</el-button>
          <el-button @click="handleScreenshot">截图</el-button>
        </div>
      </div>

      <!-- 状态信息 -->
      <div class="player-status">
        <div class="status-title">播放器状态</div>
        <el-descriptions :column="3" border size="small">
          <el-descriptions-item label="就绪状态">
            <el-tag :type="isReady ? 'success' : 'info'" size="small">
              {{ isReady ? "已就绪" : "未初始化" }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="播放状态">
            <el-tag :type="isPlaying ? 'success' : 'warning'" size="small">
              {{ isPlaying ? "播放中" : "已暂停" }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="静音状态">
            <el-tag :type="isMuted ? 'danger' : 'info'" size="small">
              {{ isMuted ? "已静音" : "正常" }}
            </el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="当前时间">{{
            formatTime(currentTime)
          }}</el-descriptions-item>
          <el-descriptions-item label="总时长">{{
            formatTime(duration)
          }}</el-descriptions-item>
          <el-descriptions-item label="播放速率"
            >{{ playbackRate }}x</el-descriptions-item
          >
        </el-descriptions>
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
        <h3 class="usage-subtitle">初始化播放器</h3>
        <p class="demo-desc">
          在 onMounted 中调用 init，传入容器 ID 和配置项。
        </p>
        <pre class="code-block" v-pre><code>&lt;template&gt;
  &lt;div id="xg-player"&gt;&lt;/div&gt;
&lt;/template&gt;

&lt;script setup lang="ts"&gt;
import { onMounted } from 'vue'
import { useVideo } from '@/hooks/useVideo'

const { init, play, pause, destroy } = useVideo()

onMounted(() => {
  init('xg-player', {
    url: 'https://example.com/video.mp4',
    poster: 'https://example.com/poster.jpg',
    autoplay: false,
    pip: true,
    screenShot: true,
  })
})
&lt;/script&gt;</code></pre>

        <h3 class="usage-subtitle">播放控制</h3>
        <p class="demo-desc">使用 play、pause、seek 等方法控制播放。</p>
        <pre
          class="code-block"
          v-pre
        ><code>const { play, pause, togglePlay, seek } = useVideo()

// 播放
play()

// 暂停
pause()

// 切换播放/暂停
togglePlay()

// 跳转到 60 秒
seek(60)</code></pre>

        <h3 class="usage-subtitle">音量与倍速</h3>
        <pre
          class="code-block"
          v-pre
        ><code>const { setVolume, toggleMute, setPlaybackRate } = useVideo()

// 设置音量为 50%
setVolume(0.5)

// 静音/取消静音
toggleMute()

// 设置 2 倍速
setPlaybackRate(2)</code></pre>

        <h3 class="usage-subtitle">切换视频源</h3>
        <p class="demo-desc">运行时动态切换视频地址。</p>
        <pre class="code-block" v-pre><code>const { switchUrl } = useVideo()

switchUrl('https://example.com/video2.mp4', 'https://example.com/poster2.jpg')</code></pre>

        <h3 class="usage-subtitle">全屏、画中画与截图</h3>
        <pre
          class="code-block"
          v-pre
        ><code>const { toggleFullscreen, togglePip, screenshot } = useVideo()

// 全屏
toggleFullscreen()

// 画中画
togglePip()

// 截图（自动下载）
screenshot('my-screenshot.png')</code></pre>
      </div>
    </Card>

    <!-- 4. props-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">VideoOptions 配置项</span>
        </div>
      </template>
      <el-table
        class="api-table"
        size="small"
        :data="optionsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="参数" width="140" />
        <el-table-column prop="type" label="类型" width="160" />
        <el-table-column prop="default" label="默认值" width="120" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 5. methods-card -->
    <Card class="props-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">返回值与方法</span>
        </div>
      </template>
      <el-table
        class="api-table"
        size="small"
        :data="methodsData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="名称" width="140" />
        <el-table-column prop="type" label="类型" width="120" />
        <el-table-column prop="params" label="参数" width="220" />
        <el-table-column prop="description" label="说明" />
      </el-table>
    </Card>

    <!-- 6. events-card -->
    <Card class="events-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span class="header-title">响应式状态</span>
        </div>
      </template>
      <el-table
        class="api-table"
        size="small"
        :data="stateData"
        :header-cell-style="{ background: 'var(--el-fill-color-lighter)' }"
      >
        <el-table-column prop="name" label="状态" width="140" />
        <el-table-column prop="type" label="类型" width="120" />
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
        <div class="example-title">视频列表播放器</div>
        <div class="example-row">
          <div class="video-list-demo">
            <div class="video-list">
              <div
                v-for="(v, index) in appVideoList"
                :key="index"
                class="video-list-item"
                :class="{ 'is-active': currentAppVideo === index }"
                @click="switchAppVideo(index)"
              >
                <img :src="v.poster" class="video-thumb" />
                <div class="video-info">
                  <span class="video-name">{{ v.title }}</span>
                  <span class="video-duration">{{ v.duration }}</span>
                </div>
              </div>
            </div>
            <div class="video-player-area">
              <div id="app-player" class="app-player-container"></div>
              <div v-if="!appReady" class="player-placeholder">
                <el-icon :size="48"><VideoPlay /></el-icon>
                <span>点击左侧视频开始播放</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeUnmount } from "vue";
import { ElMessage } from "element-plus";
import { VideoPlay } from "@element-plus/icons-vue";
import Card from "@/components/Card/index.vue";
import { useVideo } from "@/hooks/useVideo";

// 主播放器
const {
  isReady,
  isPlaying,
  isMuted,
  currentTime,
  duration,
  playbackRate,
  init,
  togglePlay,
  seek,
  setVolume,
  toggleMute,
  setPlaybackRate,
  toggleFullscreen,
  togglePip,
  screenshot,
  switchUrl,
  destroy,
} = useVideo();

// 应用区播放器
const {
  isReady: appReady,
  init: appInit,
  switchUrl: appSwitch,
  destroy: appDestroy,
} = useVideo();

// 视频列表
const videoList = [
  {
    title: "示例视频 - Sintel Trailer",
    url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    poster: "https://media.w3.org/2010/05/sintel/poster.png",
  },
  {
    title: "示例视频 - Bunny Trailer",
    url: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    poster: "https://media.w3.org/2010/05/bunny/poster.png",
  },
  {
    title: "示例视频 - Video Subtitle",
    url: "https://media.w3.org/2010/05/video/video.mp4",
    poster: "https://media.w3.org/2010/05/video/poster.png",
  },
];

const currentVideo = ref(videoList[0].url);
const volumeValue = ref(0.6);
const rateValue = ref(1);

function formatTime(seconds: number): string {
  if (!seconds || isNaN(seconds)) return "00:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

function handleInit() {
  const video =
    videoList.find((v) => v.url === currentVideo.value) || videoList[0];
  init("xg-player", {
    url: video.url,
    poster: video.poster,
    pip: true,
    screenShot: true,
    keyboard: true,
  });
  ElMessage.success("播放器已初始化");
}

function handleSwitchVideo(url: string) {
  const video = videoList.find((v) => v.url === url);
  switchUrl(url, video?.poster);
}

function handleVolumeChange(val: number | number[]) {
  setVolume(Array.isArray(val) ? val[0] : val);
}

function handleRateChange(val: number) {
  setPlaybackRate(val);
}

function handleScreenshot() {
  screenshot(`screenshot-${Date.now()}.png`);
  ElMessage.success("已截图");
}

// ==================== 应用区 ====================
const appVideoList = [
  {
    title: "Sintel Trailer",
    url: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    poster: "https://media.w3.org/2010/05/sintel/poster.png",
    duration: "00:52",
  },
  {
    title: "Bunny Trailer",
    url: "https://media.w3.org/2010/05/bunny/trailer.mp4",
    poster: "https://media.w3.org/2010/05/bunny/poster.png",
    duration: "00:48",
  },
  {
    title: "Video Subtitle",
    url: "https://media.w3.org/2010/05/video/video.mp4",
    poster: "https://media.w3.org/2010/05/video/poster.png",
    duration: "01:00",
  },
];

const currentAppVideo = ref(0);

function switchAppVideo(index: number) {
  currentAppVideo.value = index;
  const v = appVideoList[index];
  if (!appReady.value) {
    appInit("app-player", {
      url: v.url,
      poster: v.poster,
      pip: true,
      screenShot: true,
    });
  } else {
    appSwitch(v.url, v.poster);
  }
}

onBeforeUnmount(() => {
  destroy();
  appDestroy();
});

// 配置项表
const optionsData = [
  {
    name: "url",
    type: "string",
    default: "-",
    description: "视频地址（必填）",
  },
  { name: "poster", type: "string", default: "''", description: "封面图地址" },
  {
    name: "autoplay",
    type: "boolean",
    default: "false",
    description: "是否自动播放",
  },
  {
    name: "loop",
    type: "boolean",
    default: "false",
    description: "是否循环播放",
  },
  { name: "muted", type: "boolean", default: "false", description: "是否静音" },
  {
    name: "volume",
    type: "number",
    default: "1",
    description: "初始音量 (0~1)",
  },
  {
    name: "playbackRate",
    type: "number",
    default: "1",
    description: "播放速率",
  },
  {
    name: "isLive",
    type: "boolean",
    default: "false",
    description: "是否直播流",
  },
  { name: "pip", type: "boolean", default: "false", description: "画中画" },
  {
    name: "screenShot",
    type: "boolean",
    default: "false",
    description: "截图功能",
  },
  {
    name: "keyboard",
    type: "boolean",
    default: "false",
    description: "键盘快捷键",
  },
  {
    name: "download",
    type: "boolean",
    default: "false",
    description: "下载功能",
  },
];

// 方法表
const methodsData = [
  {
    name: "init",
    type: "function",
    params: "(id: string, options: VideoOptions)",
    description: "初始化播放器",
  },
  { name: "play", type: "function", params: "()", description: "播放" },
  { name: "pause", type: "function", params: "()", description: "暂停" },
  {
    name: "togglePlay",
    type: "function",
    params: "()",
    description: "切换播放/暂停",
  },
  {
    name: "seek",
    type: "function",
    params: "(time: number)",
    description: "跳转到指定时间（秒）",
  },
  {
    name: "setVolume",
    type: "function",
    params: "(vol: number)",
    description: "设置音量 (0~1)",
  },
  {
    name: "toggleMute",
    type: "function",
    params: "()",
    description: "静音/取消静音",
  },
  {
    name: "setPlaybackRate",
    type: "function",
    params: "(rate: number)",
    description: "设置播放速率",
  },
  {
    name: "toggleFullscreen",
    type: "function",
    params: "()",
    description: "全屏切换",
  },
  {
    name: "togglePip",
    type: "function",
    params: "()",
    description: "画中画切换",
  },
  {
    name: "screenshot",
    type: "function",
    params: "(filename?: string)",
    description: "截图",
  },
  {
    name: "switchUrl",
    type: "function",
    params: "(url: string, poster?: string)",
    description: "切换视频源",
  },
  {
    name: "destroy",
    type: "function",
    params: "()",
    description: "销毁播放器",
  },
];

// 响应式状态表
const stateData = [
  { name: "player", type: "Ref", description: "播放器实例" },
  { name: "isReady", type: "Ref<boolean>", description: "是否已就绪" },
  { name: "isPlaying", type: "Ref<boolean>", description: "是否播放中" },
  { name: "isMuted", type: "Ref<boolean>", description: "是否静音" },
  { name: "isFullscreen", type: "Ref<boolean>", description: "是否全屏" },
  {
    name: "currentTime",
    type: "Ref<number>",
    description: "当前播放时间（秒）",
  },
  { name: "duration", type: "Ref<number>", description: "视频总时长（秒）" },
  { name: "volume", type: "Ref<number>", description: "当前音量 (0~1)" },
  { name: "playbackRate", type: "Ref<number>", description: "当前播放速率" },
  { name: "buffered", type: "Ref<number>", description: "已缓冲时长（秒）" },
];
</script>

<style scoped lang="scss">
.player-wrapper {
  margin-bottom: 20px;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
}
:deep(.xg-player-container) {
  width: 100% !important;
  height: 400px;
}

.player-controls {
  padding: 20px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;
  margin-bottom: 16px;

  .control-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;

    &:last-child {
      margin-bottom: 0;
    }

    .control-label {
      min-width: 80px;
      font-weight: 500;
      color: var(--el-text-color-regular);
      flex-shrink: 0;
    }
  }
}

.player-status {
  padding: 16px;
  background: var(--el-fill-color-lighter);
  border-radius: 8px;

  .status-title {
    font-size: 14px;
    font-weight: 500;
    margin-bottom: 12px;
    color: var(--el-text-color-primary);
  }
}

// 实际应用
.video-list-demo {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.video-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 360px;
  overflow-y: auto;

  .video-list-item {
    display: flex;
    gap: 8px;
    padding: 8px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: var(--el-color-primary-light-5);
      background: var(--el-color-primary-light-9);
    }

    &.is-active {
      border-color: var(--el-color-primary);
      background: var(--el-color-primary-light-9);
    }

    .video-thumb {
      width: 100px;
      height: 56px;
      object-fit: cover;
      border-radius: 4px;
      flex-shrink: 0;
    }

    .video-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 4px;
      min-width: 0;

      .video-name {
        font-size: 13px;
        font-weight: 500;
        color: var(--el-text-color-primary);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .video-duration {
        font-size: 12px;
        color: var(--el-text-color-secondary);
      }
    }
  }
}

.video-player-area {
  position: relative;
  background: #000;
  border-radius: 8px;
  overflow: hidden;
  min-height: 360px;

  .app-player-container {
    width: 100%;
    height: 360px;
  }

  .player-placeholder {
    position: absolute;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    color: var(--el-text-color-placeholder);
    font-size: 14px;
    background: #000;
  }
}
</style>
