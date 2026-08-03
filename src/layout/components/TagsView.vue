<template>
  <div
    class="tags-view-container"
    :class="[
      layoutConfig.tagsViewStyle,
      { 'tags-view-fixed': layoutConfig.fixedHeader },
    ]"
  >
    <!-- 左侧滚动按钮 -->
    <div
      class="scroll-btn scroll-left"
      :class="{ disabled: !canScrollLeft }"
      @click="handleScrollLeft"
    >
      <el-icon>
        <DArrowLeft />
      </el-icon>
    </div>

    <!-- 标签滚动区域 -->
    <el-scrollbar
      ref="scrollbarRef"
      class="tags-scrollbar"
      @scroll="handleScroll"
    >
      <div class="tags-view-wrapper" ref="wrapperRef">
        <router-link
          v-for="tag in visitedViews"
          :key="tag.path"
          :class="[
            'tags-view-item',
            isActive(tag) ? 'active' : '',
            { 'is-affix': isAffix(tag) },
          ]"
          :to="{ path: tag.path, query: tag.query }"
          @contextmenu.prevent="openMenu(tag, $event)"
        >
          {{ tag.title }}
          <el-icon
            v-show="!isAffix(tag)"
            class="close-icon"
            @click.prevent.stop="closeSelectedTag(tag)"
          >
            <Close />
          </el-icon>
        </router-link>
      </div>
    </el-scrollbar>

    <!-- 右侧滚动按钮 -->
    <div
      class="scroll-btn scroll-right"
      :class="{ disabled: !canScrollRight }"
      @click="handleScrollRight"
    >
      <el-icon>
        <DArrowRight />
      </el-icon>
    </div>

    <!-- 右键菜单 -->
    <ul
      v-show="visible"
      class="context-menu"
      :style="{ left: left + 'px', top: top + 'px' }"
      @click="handleMenuClick"
      @contextmenu.prevent="handleMenuClick"
    >
      <li @click="refreshSelectedTag(selectedTag)">
        <el-icon> <Refresh /> </el-icon>刷新
      </li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">
        <el-icon> <Close /> </el-icon>关闭当前
      </li>
      <li @click="closeOthersTags">
        <el-icon> <CircleClose /> </el-icon>关闭其他
      </li>
      <li @click="closeAllTags">
        <el-icon> <Delete /> </el-icon>关闭所有
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, nextTick } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Close,
  Refresh,
  CircleClose,
  Delete,
  DArrowLeft,
  DArrowRight,
} from "@element-plus/icons-vue";
import { useLayoutStore, useTagsViewStore } from "@/stores";

const route = useRoute();
const router = useRouter();
const { layoutConfig } = useLayoutStore();
const tagsViewStore = useTagsViewStore();

const visitedViews = computed(() => tagsViewStore.visitedViews);

const visible = ref(false);
const top = ref(0);
const left = ref(0);
const selectedTag = ref<any>({});

// 滚动相关
const scrollbarRef = ref();
const wrapperRef = ref<HTMLElement>();
const canScrollLeft = ref(false);
const canScrollRight = ref(false);

// 是否是当前激活的标签
function isActive(tag: any) {
  return tag.path === route.path;
}

// 是否是固定标签
function isAffix(tag: any) {
  return tagsViewStore.isAffix(tag);
}

// 关闭选中的标签
function closeSelectedTag(view: any) {
  const isCurrent = isActive(view);
  tagsViewStore.removeView(view.path);
  if (isCurrent) {
    toLastView();
  }
}

// 跳转到最后一个视图
function toLastView() {
  const lastView = tagsViewStore.getLastView();
  if (lastView) {
    router.push(lastView.fullPath);
  } else {
    router.push("/dashboard");
  }
}

// 关闭其他标签
function closeOthersTags() {
  tagsViewStore.removeOthers(selectedTag.value?.path || route.path);
  if (!visitedViews.value.some((v) => v.path === selectedTag.value?.path)) {
    toLastView();
  }
}

// 关闭所有标签
function closeAllTags() {
  tagsViewStore.removeAll();
  toLastView();
}

// 刷新选中标签
function refreshSelectedTag(view: any) {
  const { path, fullPath } = view;
  // 移除缓存和标签
  tagsViewStore.removeView(path);
  // 通过 redirect 路由刷新页面（redirect路由已配置noTagsView，不会被添加到标签页）
  router.replace({ path: "/redirect" + fullPath });
}

// 打开右键菜单
function openMenu(tag: any, e: MouseEvent) {
  e.preventDefault();
  e.stopPropagation();

  const menuMinWidth = 105;
  const target = e.currentTarget as HTMLElement;
  const rect = target.getBoundingClientRect();
  const maxLeft = window.innerWidth - menuMinWidth;
  const maxTop = window.innerHeight - 120;

  left.value = rect.left + rect.width / 2 - menuMinWidth / 2;
  top.value = e.clientY + 10;

  if (left.value > maxLeft) {
    left.value = maxLeft;
  }
  if (left.value < 0) {
    left.value = 10;
  }
  if (top.value > maxTop) {
    top.value = e.clientY - 100;
  }

  visible.value = true;
  selectedTag.value = tag;
}

// 关闭右键菜单
function closeMenu(e?: MouseEvent) {
  if (e) {
    e.stopPropagation();
  }
  visible.value = false;
}

// 处理菜单点击事件（阻止事件冒泡到 document）
function handleMenuClick(e: MouseEvent) {
  e.stopPropagation();
}

watch(visible, (val) => {
  if (val) {
    document.body.addEventListener("click", closeMenu);
    document.body.addEventListener("contextmenu", closeMenu);
  } else {
    document.body.removeEventListener("click", closeMenu);
    document.body.removeEventListener("contextmenu", closeMenu);
  }
});

// 监听路由变化，添加到标签页
watch(
  () => route.fullPath,
  () => {
    // 跳过 redirect 路由（用于刷新页面的中间路由）
    if (route.name === "Redirect" || route.fullPath.includes("/redirect")) {
      return;
    }
    // 获取最后一个匹配的路由（最具体的子路由）
    const matchedRoute = route.matched[route.matched.length - 1];
    const view = {
      path: route.path,
      fullPath: route.fullPath,
      name: route.name as string | undefined,
      title: String(
        matchedRoute?.meta?.title ?? route.meta?.title ?? "no-name",
      ),
      query: route.query,
      meta: matchedRoute?.meta ?? route.meta,
    };
    tagsViewStore.addView(view);
    scrollToActiveTag();
  },
  { immediate: true },
);

onMounted(() => {
  tagsViewStore.initAffixTags();
  const matchedRoute = route.matched[route.matched.length - 1];
  const view = {
    path: route.path,
    fullPath: route.fullPath,
    name: route.name as string | undefined,
    title: String(matchedRoute?.meta?.title ?? route.meta?.title ?? "no-name"),
    query: route.query,
    meta: matchedRoute?.meta ?? route.meta,
  };
  tagsViewStore.addView(view);
  nextTick(() => updateScrollState());
});

// ========== 滚动相关方法 ==========
function getScrollContainer() {
  return scrollbarRef.value?.wrapRef;
}

function handleScroll({ scrollLeft }: { scrollLeft: number }) {
  const container = getScrollContainer();
  if (!container) return;
  const maxScroll = container.scrollWidth - container.clientWidth;
  canScrollLeft.value = scrollLeft > 0;
  canScrollRight.value = scrollLeft < maxScroll - 1;
}

function updateScrollState() {
  const container = getScrollContainer();
  if (!container) return;
  canScrollLeft.value = container.scrollLeft > 0;
  canScrollRight.value =
    container.scrollLeft < container.scrollWidth - container.clientWidth - 1;
}

function handleScrollLeft() {
  const container = getScrollContainer();
  if (!container) return;
  container.scrollBy({ left: -200, behavior: "smooth" });
}

function handleScrollRight() {
  const container = getScrollContainer();
  if (!container) return;
  container.scrollBy({ left: 200, behavior: "smooth" });
}

// 将当前激活的标签滚动到可视区域
function scrollToActiveTag() {
  nextTick(() => {
    const activeTag = wrapperRef.value?.querySelector(
      ".tags-view-item.active",
    ) as HTMLElement;
    const container = getScrollContainer();
    if (!activeTag || !container) return;

    const tagLeft = activeTag.offsetLeft;
    const tagRight = tagLeft + activeTag.offsetWidth;
    const containerLeft = container.scrollLeft;
    const containerRight = containerLeft + container.clientWidth;

    if (tagLeft < containerLeft) {
      container.scrollTo({ left: tagLeft - 10, behavior: "smooth" });
    } else if (tagRight > containerRight) {
      container.scrollTo({
        left: tagRight - container.clientWidth + 10,
        behavior: "smooth",
      });
    }
  });
}

// 监听标签数量变化更新滚动状态
watch(
  visitedViews,
  () => {
    nextTick(() => updateScrollState());
  },
  { deep: true },
);
</script>

<style scoped lang="scss">
@use "sass:map";
@use "@/styles/variables" as *;
@use "@/styles/mixins" as *;

// Chrome 标签页 CSS 变量
$tags-bar-height: 36px;
$wing-r: 10px;

.tags-view-container {
  height: $tags-bar-height;
  width: 100%;
  background: map.get($light-theme, card-bg);
  transition: background-color 0.25s;
  display: flex;
  align-items: center;

  // 滚动按钮
  .scroll-btn {
    flex-shrink: 0;
    width: 28px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: #383b41;
    transition: all 0.2s;
    background: inherit;

    &:hover:not(.disabled) {
      color: var(--el-color-primary);
      background-color: rgba(0, 0, 0, 0.02);
    }

    &.disabled {
      // color: #c0c4cc;
      cursor: not-allowed;
      opacity: 0.5;
    }

    .el-icon {
      font-size: 14px;
    }
  }

  .scroll-left {
    border-left: none;
  }

  .scroll-right {
    border-right: none;
  }

  // 滚动区域
  .tags-scrollbar {
    flex: 1;
    height: 100%;

    :deep(.el-scrollbar__wrap) {
      overflow-x: auto;
      overflow-y: hidden;
    }

    :deep(.el-scrollbar__bar.is-horizontal) {
      display: none;
    }
  }

  // ========== 统一的基础布局 ==========
  .tags-view-wrapper {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 4px 12px;
    width: max-content;
    min-width: 100%;

    .tags-view-item {
      display: inline-flex;
      align-items: center;
      height: 26px;
      line-height: 26px;
      padding: 0 10px;
      font-size: 12px;
      cursor: pointer;
      white-space: nowrap;
      flex-shrink: 0;
      transition: all 0.12s ease;
      position: relative;
      text-decoration: none;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      margin-left: 5px;
      border-radius: 5px;

      &:first-of-type {
        margin-left: 6px;
      }

      &:hover {
        color: var(--el-color-primary);
        // border-color: var(--el-color-primary);
      }

      &.active {
        color: var(--el-color-primary);
        border-color: var(--el-color-primary);

        .close-icon:hover {
          background-color: rgba(255, 255, 255, 0.25);
          color: #fff;
        }
      }

      .close-icon {
        width: 14px;
        height: 14px;
        border-radius: 50%;
        margin-left: 4px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        opacity: 0;
        transform: scale(0.6);
        transition:
          opacity 0.2s ease,
          transform 0.2s ease;

        :deep(svg) {
          width: 10px;
          height: 10px;
        }

        &:hover {
          background-color: rgba(0, 0, 0, 0.15);
          color: #fff;
        }
      }

      &:hover:not(.is-affix) .close-icon,
      &.active:not(.is-affix) .close-icon {
        opacity: 1;
        transform: scale(1);
      }
    }
  }

  // ========== 卡片样式 ==========
  &.card {
    background: map.get($light-theme, bg-color);

    .tags-view-wrapper {
      gap: 6px;

      .tags-view-item {
        display: inline-flex;
        align-items: center;
        height: 28px;
        line-height: 28px;
        margin: 0 6px 0 0;
        padding: 4px 12px;
        font-size: 12px;
        font-weight: 400;
        border: 1px solid map.get($light-theme, border-color);
        border-radius: 2px;
        color: map.get($light-theme, text-primary);
        transition: all 0.2s ease;

        &:hover {
          color: var(--el-color-primary);
          border-color: var(--el-color-primary);
        }

        &.active {
          background-color: var(--el-color-primary);
          color: #fff;
          border-color: var(--el-color-primary);

          .close-icon:hover {
            background-color: rgba(255, 255, 255, 0.25);
            color: #fff;
          }
        }

        .close-icon {
          display: flex;
          opacity: 0;
          transform: scale(0.6);
          transition:
            opacity 0.2s ease,
            transform 0.2s ease;
        }

        &:hover:not(.is-affix) .close-icon,
        &.active:not(.is-affix) .close-icon {
          opacity: 1;
          transform: scale(1);
        }
      }
    }
  }

  // 右键菜单
  .context-menu {
    margin: 0;
    background: map.get($light-theme, card-bg);
    z-index: 3000;
    position: fixed;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    @include theme-var(color, text-primary);
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 6px;

      &:hover {
        background: #eee;
      }
    }
  }
}
</style>
