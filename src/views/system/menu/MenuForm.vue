<template>
  <Dialog
    v-model="visible"
    :title="title"
    width="600px"
    destroy-on-close
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="上级菜单">
        <el-tree-select
          v-model="form.parentId"
          :data="menuOptions"
          :props="{ value: 'id', label: 'name', children: 'children' } as any"
          check-strictly
          clearable
          placeholder="请选择上级菜单"
          style="width: 100%"
        />
      </el-form-item>
      <el-form-item label="菜单类型" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio value="directory">目录</el-radio>
          <el-radio value="menu">菜单</el-radio>
          <el-radio value="button">按钮</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单名称" prop="name">
        <el-input v-model="form.name" placeholder="菜单名称" />
      </el-form-item>
      <el-form-item label="图标" v-if="form.type !== 'button'">
        <IconSelect v-model="form.icon" />
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input-number v-model="form.sort" :min="0" :max="999" />
      </el-form-item>
      <el-form-item label="路由路径" v-if="form.type !== 'button' && !form.isLink">
        <el-input v-model="form.path" placeholder="路由路径" />
      </el-form-item>
      <el-form-item label="是否外链" v-if="form.type === 'menu'">
        <el-radio-group v-model="form.isLink" @change="handleIsLinkChange">
          <el-radio :value="false">否</el-radio>
          <el-radio :value="true">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="组件路径" v-if="form.type === 'menu' && !form.isLink">
        <el-input v-model="form.component" placeholder="组件路径" />
      </el-form-item>
      <el-form-item label="外链地址" v-if="form.type === 'menu' && form.isLink">
        <el-input v-model="form.linkUrl" placeholder="外链地址" />
      </el-form-item>
      <el-form-item label="权限标识" v-if="form.type === 'button'">
        <el-input v-model="form.permission" placeholder="权限标识" />
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio :value="1">正常</el-radio>
          <el-radio :value="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="handleSubmit">确定</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import { ElMessage } from 'element-plus'
import IconSelect from '@/components/IconSelect/index.vue'

interface MenuItem {
  id?: number
  parentId: number
  name: string
  icon?: string
  sort: number
  path?: string
  component?: string
  permission?: string
  type: 'directory' | 'menu' | 'button'
  status: number
  isLink?: boolean
  linkUrl?: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<MenuItem>
  menuList?: MenuItem[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: MenuItem): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref()

const form = ref<Partial<MenuItem>>({
  parentId: 0,
  type: 'menu',
  name: '',
  sort: 0,
  status: 1,
  isLink: false,
})

const rules = {
  type: [{ required: true, message: '请选择菜单类型', trigger: 'change' }],
  name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
  sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
}

const menuOptions = computed(() => [
  { id: 0, name: '主类目', children: props.menuList || [] },
])

watch(
  () => props.formData,
  (data) => {
    if (data) form.value = { ...data }
  },
  { immediate: true },
)

function handleIsLinkChange(isLink: string | number | boolean | undefined) {
  if (isLink) {
    form.value.path = undefined
    form.value.component = undefined
  } else {
    form.value.linkUrl = undefined
  }
}

async function handleSubmit() {
  await formRef.value?.validate()
  ElMessage.success(props.title.includes('新增') ? '新增成功' : '修改成功')
  emit('submit', { ...form.value } as MenuItem)
  visible.value = false
}
</script>
