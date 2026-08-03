<template>
  <Dialog
    v-model="visible"
    :title="title"
    width="450px"
    destroy-on-close
    @close="resetForm"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <el-input v-model="form.type" placeholder="请输入类型" :disabled="!!form.id" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :value="1">启用</el-radio>
          <el-radio :value="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" placeholder="请输入备注" type="textarea" :rows="3" />
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

interface DictTypeForm {
  id?: number
  name: string
  type: string
  status: number
  remark: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<DictTypeForm>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: DictTypeForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive<DictTypeForm>({
  name: '',
  type: '',
  status: 1,
  remark: '',
})

const rules: FormRules = {
  name: [{ required: true, message: '请输入字典名称', trigger: 'blur' }],
  type: [{ required: true, message: '请输入字典标识', trigger: 'blur' }],
}

watch(() => props.formData, (data) => {
  if (data) Object.assign(form, data)
}, { immediate: true })

function resetForm() {
  form.id = undefined
  form.name = ''
  form.type = ''
  form.status = 1
  form.remark = ''
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