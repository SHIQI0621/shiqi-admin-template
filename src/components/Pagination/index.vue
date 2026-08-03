<template>
  <div class="pagination-container" v-if="total > 0">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="pageSizes"
      :total="total"
      :layout="layout"
      :background="background"
      :small="small"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  /** 当前页码 */
  currentPage?: number
  /** 每页条数 */
  pageSize?: number
  /** 总条数 */
  total: number
  /** 每页条数选项 */
  pageSizes?: number[]
  /** 布局 */
  layout?: string
  /** 是否带背景色 */
  background?: boolean
  /** 是否使用小型分页 */
  small?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
  pageSizes: () => [10, 20, 50, 100],
  layout: 'total, sizes, prev, pager, next, jumper',
  background: true,
  small: false,
})

const emit = defineEmits<{
  (e: 'update:currentPage', value: number): void
  (e: 'update:pageSize', value: number): void
  (e: 'change'): void
}>()

const currentPage = computed({
  get: () => props.currentPage,
  set: (val) => emit('update:currentPage', val),
})

const pageSize = computed({
  get: () => props.pageSize,
  set: (val) => emit('update:pageSize', val),
})

function handleSizeChange() {
  emit('update:currentPage', 1) // 切换每页条数时重置到第一页
  emit('change')
}

function handleCurrentChange() {
  emit('change')
}
</script>

<style scoped>
.pagination-container {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
