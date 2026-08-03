<template>
  <el-drawer
    v-model="drawerVisible"
    title="系统设置"
    direction="rtl"
    size="320px"
    :with-header="true"
    :modal="true"
    :close-on-click-modal="true"
  >
    <div class="settings-body">
      <!-- 布局模式 -->
      <div class="setting-item">
        <div class="setting-label">布局导航</div>
        <div class="mode-list">
          <el-tooltip
            v-for="mode in modes"
            :key="mode.value"
            :content="mode.label"
            placement="bottom"
          >
            <div
              class="mode-item"
              :class="{ active: layoutConfig.mode === mode.value }"
              @click="setMode(mode.value as 'left' | 'top')"
            >
              <div class="mode-preview" :class="`mode-${mode.value}`">
                <div class="preview-header"></div>
                <div v-if="mode.value !== 'left'" class="preview-menu"></div>
                <div class="preview-body">
                  <div
                    v-if="mode.value === 'left'"
                    class="preview-sidebar"
                  ></div>
                  <div class="preview-main">
                    <div v-if="mode.value !== 'left'" class="preview-tag"></div>
                  </div>
                </div>
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>

      <!-- 主题风格设置 -->
      <div class="setting-item">
        <div class="setting-label">主题风格设置</div>
        <div class="theme-list">
          <el-tooltip
            v-for="theme in sidebarThemes"
            :key="theme.value"
            :content="theme.label"
            placement="bottom"
          >
            <div
              class="theme-item"
              :class="{ active: themeConfig.sidebarTheme === theme.value }"
              @click="setSidebarTheme(theme.value as 'black' | 'light')"
            >
              <div class="theme-preview" :class="`theme-${theme.value}`">
                <div class="preview-sidebar"></div>
                <div class="preview-right">
                  <div class="preview-header"></div>
                  <div class="preview-content">
                    <el-icon
                      v-if="themeConfig.sidebarTheme === theme.value"
                      class="check-icon"
                    >
                      <Check />
                    </el-icon>
                  </div>
                </div>
              </div>
            </div>
          </el-tooltip>
        </div>
      </div>

      <!-- 主题颜色 -->
      <div class="setting-item">
        <div class="setting-label">主题颜色</div>
        <div class="color-list">
          <div
            v-for="color in predefineColors"
            :key="color"
            class="color-item"
            :class="{ active: themeConfig.primaryColor === color }"
            :style="{ background: color }"
            @click="setPrimaryColor(color)"
          >
            <el-icon
              v-if="themeConfig.primaryColor === color"
              class="color-check"
            >
              <Check />
            </el-icon>
          </div>
        </div>
      </div>

      <!-- 系统布局配置 -->
      <div class="setting-item">
        <div class="setting-label">系统布局配置</div>
        <div class="switch-list">
          <div class="switch-item">
            <span>开启页签</span>
            <el-switch
              :model-value="layoutConfig.showTagsView"
              @change="(val: any) => updateLayoutConfig('showTagsView', val)"
            />
          </div>
          <div
            v-if="layoutConfig.showTagsView"
            class="switch-item tags-style-item"
          >
            <span>标签页样式</span>
            <div class="tags-style-btn-group">
              <div
                v-for="style in tagsViewStyles"
                :key="style.value"
                class="tags-style-btn"
                :class="{ active: layoutConfig.tagsViewStyle === style.value }"
                @click="setTagsViewStyle(style.value as '' | 'card')"
              >
                {{ style.label }}
              </div>
            </div>
          </div>
          <div class="switch-item">
            <span>固定 Header</span>
            <el-switch
              :model-value="layoutConfig.fixedHeader"
              @change="(val: any) => updateLayoutConfig('fixedHeader', val)"
            />
          </div>
          <div class="switch-item">
            <span>显示 Logo</span>
            <el-switch
              :model-value="layoutConfig.showSidebarLogo"
              @change="(val: any) => updateLayoutConfig('showSidebarLogo', val)"
            />
          </div>
          <div class="switch-item">
            <span>显示 版权</span>
            <el-switch
              :model-value="layoutConfig.showCopyright"
              @change="(val: any) => updateLayoutConfig('showCopyright', val)"
            />
          </div>
          <div class="switch-item">
            <span>动态标题</span>
            <el-switch
              :model-value="layoutConfig.dynamicTitle"
              @change="(val: any) => updateLayoutConfig('dynamicTitle', val)"
            />
          </div>
          <div class="switch-item">
            <span>菜单是否手风琴模式</span>
            <el-switch
              :model-value="layoutConfig.uniqueOpened"
              @change="(val: any) => updateLayoutConfig('uniqueOpened', val)"
            />
          </div>
        </div>
      </div>

      <!-- 色弱模式 -->
      <div class="setting-item">
        <div class="setting-label">界面设置</div>
        <div class="switch-list">
          <div class="switch-item">
            <span>色弱模式</span>
            <el-switch :model-value="themeConfig.isGrey" @change="toggleGrey" />
          </div>
        </div>
      </div>

      <!-- 水印设置 -->
      <div class="setting-item">
        <div class="setting-label">水印设置</div>
        <div class="switch-list">
          <div class="switch-item">
            <span>开启水印</span>
            <el-switch
              :model-value="themeConfig.showWatermark"
              @change="toggleWatermark"
            />
          </div>
        </div>
        <div class="watermark-config">
          <div class="watermark-item">
            <span class="watermark-label">水印内容</span>
            <el-input
              v-model="themeConfig.watermarkText"
              placeholder="请输入水印内容"
              @input="(val: any) => setWatermarkText(val)"
            />
          </div>
          <div class="watermark-item">
            <span class="watermark-label">字体大小</span>
            <el-input-number
              v-model="themeConfig.watermarkFontSize"
              :min="12"
              :max="48"
              @change="(val: any) => setWatermarkFontSize(val)"
            />
          </div>
          <div class="watermark-item">
            <span class="watermark-label">透明度</span>
            <el-slider
              v-model="themeConfig.watermarkOpacity"
              :min="0.01"
              :max="1"
              :step="0.01"
              :format-tooltip="(val: any) => `${(val * 100).toFixed(0)}%`"
              @change="(val: any) => setWatermarkOpacity(val)"
            />
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="setting-actions">
        <el-button type="primary" @click="handleCopyConfig">
          <el-icon>
            <DocumentCopy />
          </el-icon>
          保存配置
        </el-button>
        <el-button @click="handleResetConfig">
          <el-icon>
            <RefreshRight />
          </el-icon>
          重置默认
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ElMessage } from "element-plus";
import { Check, DocumentCopy, RefreshRight } from "@element-plus/icons-vue";
import { useLayoutStore, useThemeStore } from "@/stores";
import { removeCache, CacheKeys } from "@/utils/cache";

const { layoutConfig, setMode, setTagsViewStyle } = useLayoutStore();
const {
  themeConfig,
  setPrimaryColor,
  toggleGrey,
  setSidebarTheme,
  toggleWatermark,
  setWatermarkText,
  setWatermarkOpacity,
  setWatermarkFontSize,
} = useThemeStore();

// 抽屉显隐控制
const drawerVisible = computed({
  get: () => layoutConfig.showSettings,
  set: () => {
    // el-drawer 关闭时调用 toggleSettings
    layoutConfig.showSettings = false;
  },
});

// 更新布局配置
function updateLayoutConfig(key: string, value: any) {
  const config = layoutConfig as Record<string, any>;
  config[key] = value;
}

// 预设主题颜色
const predefineColors = [
  "#6952f5",
  "#2b8cf0",
  "#00bcd4",
  "#00a854",
  "#52c41a",
  "#faad14",
  "#f5222d",
  "#eb2f96",
  "#722ed1",
];

// 布局模式
const modes = [
  { value: "left", label: "左侧菜单" },
  { value: "top", label: "顶部菜单" },
];

// 侧边栏主题
const sidebarThemes = [
  { value: "light", label: "白色侧边栏", preview: "#ffffff" },
  { value: "black", label: "暗黑侧边栏", preview: "#001529" },
];

// 标签页样式
const tagsViewStyles = [
  { value: "", label: "默认" },
  { value: "card", label: "卡片" },
];

// 复制配置
function handleCopyConfig() {
  const config = {
    theme: themeConfig,
    layout: layoutConfig,
  };

  navigator.clipboard
    .writeText(JSON.stringify(config, null, 2))
    .then(() => {
      ElMessage.success("配置已保存");
    })
    .catch(() => {
      const textarea = document.createElement("textarea");
      textarea.value = JSON.stringify(config, null, 2);
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      ElMessage.success("配置已保存");
    });
}

// 重置配置
function handleResetConfig() {
  removeCache(CacheKeys.THEME);
  removeCache(CacheKeys.LAYOUT);
  window.location.reload();
}
</script>

<style scoped lang="scss">
.settings-body {
  padding: 0 16px;

  .setting-item {
    margin-bottom: 20px;

    .setting-label {
      margin-bottom: 12px;
      font-size: 13px;
      font-weight: 500;
      color: #333;
    }
  }

  // 布局模式选择器
  .mode-list {
    display: flex;
    gap: 12px;

    .mode-item {
      flex: 1;
      cursor: pointer;
      padding: 8px;
      border: 2px solid #e8e8e8;
      border-radius: 6px;
      transition: all 0.2s ease;
      background: #fafafa;

      &:hover {
        border-color: var(--el-color-primary-light-5);
      }

      &.active {
        border-color: var(--el-color-primary);
        background: #fff;
        box-shadow: 0 2px 8px rgba(24, 144, 255, 0.15);
      }

      .mode-preview {
        width: 100%;
        height: 56px;
        background: #f5f5f5;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        flex-direction: column;

        .preview-header {
          height: 12px;
          flex-shrink: 0;
          background: #fff;
          border-bottom: 1px solid #e8e8e8;
          position: relative;

          &::before {
            content: "";
            position: absolute;
            left: 4px;
            top: 3px;
            width: 6px;
            height: 6px;
            background: #1890ff;
            border-radius: 1px;
          }
        }

        .preview-menu {
          height: 10px;
          flex-shrink: 0;
          background: #fff;
          border-bottom: 1px solid #e8e8e8;
          position: relative;

          &::after {
            content: "";
            position: absolute;
            left: 20%;
            bottom: 0;
            width: 14px;
            height: 2px;
            background: #1890ff;
          }
        }

        .preview-body {
          flex: 1;
          display: flex;
          overflow: hidden;
        }

        .preview-sidebar {
          width: 28%;
          background: #001529;
          flex-shrink: 0;
        }

        .preview-main {
          flex: 1;
          background: #fff;
          padding: 3px;
          display: flex;
          flex-direction: column;

          .preview-tag {
            height: 6px;
            background: #e8e8e8;
            border-radius: 1px;
            margin-bottom: 2px;

            &::after {
              content: "";
              display: block;
              width: 30%;
              height: 100%;
              background: #1890ff;
              opacity: 0.3;
              border-radius: 1px;
            }
          }
        }

        &.mode-left {
          .preview-sidebar {
            background: #001529;
          }
        }

        &.mode-top {
          .preview-header {
            background: #001529;
            border-bottom: none;

            &::before {
              background: rgba(255, 255, 255, 0.9);
            }
          }

          .preview-menu {
            background: #001529;

            &::after {
              background: rgba(255, 255, 255, 0.7);
            }
          }

          .preview-main {
            background: #fafafa;
          }
        }
      }
    }
  }

  // 主题风格选择器
  .theme-list {
    display: flex;
    gap: 16px;

    .theme-item {
      flex: 1;
      cursor: pointer;

      .theme-preview {
        width: 100%;
        height: 56px;
        border-radius: 6px;
        border: 1px solid #dcdfe6;
        display: flex;
        overflow: hidden;
        transition: all 0.2s ease;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);

        &:hover {
          border-color: var(--el-color-primary-light-5);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
        }

        .preview-sidebar {
          width: 28%;
          height: 100%;
          flex-shrink: 0;
        }

        .preview-right {
          flex: 1;
          display: flex;
          flex-direction: column;
          height: 100%;

          .preview-header {
            height: 38%;
            flex-shrink: 0;
          }

          .preview-content {
            flex: 1;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            padding-right: 8px;

            .check-icon {
              color: var(--el-color-primary);
              font-size: 18px;
            }
          }
        }
      }

      &.active .theme-preview {
        border-color: var(--el-color-primary);
        box-shadow: 0 2px 12px rgba(24, 144, 255, 0.2);
      }

      .theme-black {
        .preview-sidebar {
          background: #001529;
        }

        .preview-header {
          background: #fff;
        }

        .preview-content {
          background: #f0f2f5;
        }
      }

      .theme-light {
        .preview-sidebar {
          background: #fff;
          border-right: 1px solid #e0e0e0;
        }

        .preview-header {
          background: #fafafa;
          border-bottom: 1px solid #eee;
        }

        .preview-content {
          background: #f5f7fa;
        }
      }
    }
  }

  // 颜色选择器
  .color-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;

    .color-item {
      width: 28px;
      height: 28px;
      border-radius: 4px;
      cursor: pointer;
      position: relative;
      transition: all 0.2s ease;
      border: 2px solid transparent;

      &:hover {
        transform: scale(1.1);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      }

      &.active {
        border-color: #fff;
        box-shadow: 0 0 0 2px var(--el-color-primary);
      }

      .color-check {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: #fff;
        font-size: 14px;
      }
    }
  }

  // 开关列表
  .switch-list {
    .switch-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      font-size: 13px;
      color: #606266;
      border-bottom: 1px solid #f5f5f5;

      &:last-child {
        border-bottom: none;
      }

      &.tags-style-item {
        align-items: center;
        justify-content: space-between;
        gap: 10px;

        .tags-style-btn-group {
          display: inline-flex;
          border: 1px solid #dcdfe6;
          border-radius: 4px;
          overflow: hidden;

          .tags-style-btn {
            padding: 5px 10px;
            font-size: 13px;
            cursor: pointer;
            background: #fff;
            color: #606266;
            border: none;
            transition: all 0.2s ease;
            white-space: nowrap;

            &:not(:last-child) {
              border-right: 1px solid #dcdfe6;
            }

            &:hover {
              color: var(--el-color-primary);
            }

            &.active {
              background: var(--el-color-primary);
              color: #fff;
            }
          }
        }
      }
    }
  }

  // 操作按钮
  .setting-actions {
    display: flex;
    gap: 10px;
    padding-top: 16px;
    margin-top: 16px;
    border-top: 1px solid #f0f0f0;

    .el-button {
      flex: 1;

      .el-icon {
        margin-right: 4px;
      }
    }
  }
}

// 水印配置样式
.watermark-config {
  margin-top: 12px;

  .watermark-item {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }

    .watermark-label {
      width: 70px;
      font-size: 13px;
      color: #606266;
      flex-shrink: 0;
    }

    .el-input {
      flex: 1;
    }

    .el-input-number {
      width: 120px;
    }

    .el-slider {
      flex: 1;
      width: auto;
    }

    .opacity-value {
      width: 50px;
      font-size: 12px;
      color: #909399;
      text-align: right;
    }
  }
}

// 覆盖 el-drawer 默认样式
:deep(.el-drawer__header) {
  margin-bottom: 0;
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 600;
}

:deep(.el-drawer__body) {
  padding: 0;
  overflow-x: hidden;
}
</style>
