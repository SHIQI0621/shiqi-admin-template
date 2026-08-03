<template>
  <Dialog v-model="visible" title="分配权限" width="500px" destroy-on-close>
    <el-tree
      ref="treeRef"
      :data="menuTree"
      :props="{ label: 'name', children: 'children' }"
      show-checkbox
      node-key="id"
      default-expand-all
      :default-checked-keys="checkedKeys"
    />
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  checkedKeys?: number[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'save', keys: number[]): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const treeRef = ref()
const checkedKeys = ref<number[]>([])

const menuTree = ref([
  { id: 1, name: '首页', children: [] },
  { id: 2, name: '系统管理', children: [
    { id: 21, name: '用户管理' },
    { id: 22, name: '角色管理' },
    { id: 23, name: '部门管理' },
    { id: 24, name: '图标管理' },
    { id: 25, name: '在线用户' },
  ]},
])

watch(() => props.checkedKeys, (keys) => {
  if (keys) checkedKeys.value = [...keys]
}, { immediate: true })

function handleSave() {
  const keys = treeRef.value?.getCheckedKeys(false) || []
  ElMessage.success('权限保存成功')
  emit('save', keys)
  visible.value = false
}
</script>
