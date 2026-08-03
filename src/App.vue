<template>
  <ElConfigProvider
    :locale="appStore.elementLocale"
    :size="appStore.elementSize"
  >
          <router-view />
  </ElConfigProvider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import { useAppStore } from "@/stores";

const appStore = useAppStore();
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
