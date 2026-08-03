<template>
  <!-- 没有子菜单 -->
  <el-menu-item v-if="!item.children?.length && !item.meta?.hidden" :index="getMenuItemIndex()"
    @click="handleMenuClick">
    <IconView v-if="item.meta?.icon" :name="item.meta.icon" class="menu-icon" />
    <span v-ellipsis class="menu-title">{{ item.meta?.title || item.name }}</span>
  </el-menu-item>

  <!-- 有子菜单 -->
  <el-sub-menu v-else-if="!item.meta?.hidden" :index="item.path">
    <template #title>
      <IconView v-if="item.meta?.icon" :name="item.meta.icon" class="menu-icon" />
      <span v-ellipsis class="menu-title">{{ item.meta?.title || item.name }}</span>
    </template>

    <TopMenuItem v-for="child in item.children" :key="child.path"
      :item="{ ...child, path: resolvePath(basePath, child.path) }" :base-path="resolvePath(basePath, child.path)" />
  </el-sub-menu>
</template>

<script setup lang="ts">

interface Props {
  item: Record<string, any>
  basePath?: string
}

const props = withDefaults(defineProps<Props>(), {
  basePath: '',
})

function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

function isExternalLink(item: any): boolean {
  if (item.meta?.isLink && item.meta?.linkUrl) return true
  const path = item.path || ''
  return isExternal(path)
}

function getMenuItemIndex(): string {
  // 为外部链接生成一个唯一的index，使用linkUrl或path
  if (isExternalLink(props.item)) {
    const url = getExternalUrl(props.item)
    return url || props.item.path || String(Date.now())
  }
  return props.item.path
}

function getExternalUrl(item: any): string | null {
  if (item.meta?.linkUrl && isExternal(item.meta.linkUrl)) {
    return item.meta.linkUrl
  }
  if (isExternal(item.path)) {
    return item.path
  }
  return null
}

function handleMenuClick() {
  const url = getExternalUrl(props.item)
  if (url) {
    window.open(url, '_blank')
  }
}

function resolvePath(basePath: string, path: string): string {
  if (path.startsWith('/')) {
    return path
  }
  const base = basePath.endsWith('/') ? basePath : basePath + '/'
  return base + path
}
</script>

<style scoped lang="scss">
.menu-icon {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 22px;
}

.menu-title {
  flex: 1;
  min-width: 0;
  max-width: 70%;
  overflow: hidden;
}

.external-link-icon {
  margin-left: 4px;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
}
</style>
