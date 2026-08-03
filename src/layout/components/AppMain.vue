<template>
  <section 
    class="app-main" 
    :class="{ 'has-tags-view': hasTagsView, 'has-fixed-header': hasFixedHeader }"
  >
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="cachedViews">
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    
    <FooterRight v-if="layoutConfig.showCopyright" />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLayoutStore, useTagsViewStore } from '@/stores'
import FooterRight from './FooterRight.vue'

const { layoutConfig } = useLayoutStore()
const tagsViewStore = useTagsViewStore()

const hasTagsView = computed(() => layoutConfig.showTagsView)
const hasFixedHeader = computed(() => layoutConfig.fixedHeader)

// 从 tagsView store 获取需要缓存的视图名称列表
const cachedViews = computed(() => tagsViewStore.cachedViews)
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.app-main {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 12px;
  background-color: map.get($light-theme, page-content-bg);

  // 移动端适配
  @media screen and (max-width: 768px) {
    padding: 12px;

    &.has-tags-view {
      padding-top: 12px;
    }
  }
}

// 路由切换动画
.fade-transform-enter-active,
.fade-transform-leave-active {
  transition: all 0.28s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>