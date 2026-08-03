<template>
  <Dialog v-model="visible" :title="title" width="550px" destroy-on-close @close="resetForm">
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="上级部门" prop="parentId">
        <el-tree-select v-model="form.parentId" :data="treeData"
          :props="{ value: 'id', label: 'name', children: 'children' } as any" check-strictly filterable
          placeholder="请选择上级部门" style="width: 100%" />
      </el-form-item>
      <el-form-item label="部门名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入部门名称" />
      </el-form-item>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item label="排序" prop="sort">
            <el-input-number v-model="form.sort" :min="0" :max="999" style="width: 100%" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="状态" prop="status">
            <el-radio-group v-model="form.status">
              <el-radio :value="1">正常</el-radio>
              <el-radio :value="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="负责人" prop="leader">
        <el-input v-model="form.leader" placeholder="请输入负责人" />
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入联系电话" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">确定</el-button>
    </template>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import type { FormInstance, FormRules } from 'element-plus'

interface DeptForm {
  id?: number
  parentId: number
  name: string
  sort: number
  leader: string
  phone: string
  email: string
  status: number
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<DeptForm>
  treeData?: any[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: DeptForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive<DeptForm>({
  parentId: 0,
  name: '',
  sort: 0,
  leader: '',
  phone: '',
  email: '',
  status: 1,
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入部门名称', trigger: 'blur' }],
}

watch(() => props.formData, (data) => {
  if (data) Object.assign(form, data)
}, { immediate: true })

function resetForm() {
  form.id = undefined
  form.parentId = 0
  form.name = ''
  form.sort = 0
  form.leader = ''
  form.phone = ''
  form.email = ''
  form.status = 1
  formRef.value?.clearValidate()
}

async function handleSubmit() {
  if (!formRef.value) return
  await formRef.value.validate((valid) => {
    if (valid) emit('submit', { ...form })
  })
}

defineExpose({ resetForm })
</script>
