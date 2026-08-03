<template>
  <div v-if="!item.meta?.hidden" :style="{ '--menu-level': level }">
    <!-- 没有子菜单 -->
    <el-menu-item 
      v-if="!item.children?.length" 
      :index="item.path"
      @click="handleMenuClick"
    >
      <IconView v-if="item.meta?.icon" :name="item.meta.icon" class="menu-icon" />
      <template #title>
        <span v-ellipsis class="menu-title">{{ item.meta?.title || item.name }}</span>
      </template>
    </el-menu-item>

    <!-- 有子菜单 -->
    <el-sub-menu v-else :index="item.path">
      <template #title>
        <IconView v-if="item.meta?.icon" :name="item.meta.icon" class="menu-icon" />
        <span v-ellipsis class="menu-title">{{ item.meta?.title || item.name }}</span>
        <el-icon 
          v-if="hasComponent" 
          class="menu-item-link" 
          @click.stop="handleMenuClick"
          title="跳转页面"
        >
          <ArrowRight />
        </el-icon>
      </template>
      
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :item="{ ...child, path: resolvePath(basePath, child.path) }"
        :base-path="resolvePath(basePath, child.path)"
        :level="level + 1"
      />
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ArrowRight } from '@element-plus/icons-vue'

interface Props {
  item: Record<string, any>
  basePath?: string
  level?: number
}

const props = withDefaults(defineProps<Props>(), {
  basePath: '',
  level: 1,
})

const router = useRouter()

// 判断菜单项是否有组件（即是否有自己的页面）
const hasComponent = computed(() => {
  return !!(props.item.component || props.item.meta?.component)
})

function isExternal(path: string): boolean {
  return /^(https?:|mailto:|tel:)/.test(path)
}

function getExternalUrl(): string | null {
  const { item } = props
  if (isExternal(item.path)) return item.path
  if (item.meta?.linkUrl && isExternal(item.meta.linkUrl)) {
    return item.meta.linkUrl
  }
  return null
}

function handleMenuClick() {
  const url = getExternalUrl()
  if (url) {
    window.open(url, '_blank')
  } else {
    router.push(props.item.path)
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
  width: 16px;
  height: 16px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 16px;
}

.menu-title {
  flex: 1;
  min-width: 0;
  max-width: 70%;
  overflow: hidden;
}

.menu-item-link {
  margin-left: auto;
  margin-right: 4px;
  font-size: 12px;
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
}
</style>
