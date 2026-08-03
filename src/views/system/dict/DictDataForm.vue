<template>
  <Dialog
    v-model="visible"
    :title="title"
    width="500px"
    destroy-on-close
    @close="resetForm"
  >
    <el-form ref="formRef" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="标签" prop="label">
        <el-input v-model="form.label" placeholder="请输入标签" />
      </el-form-item>
      <el-form-item label="值" prop="value">
        <el-input v-model="form.value" placeholder="请输入值" />
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
              <el-radio :value="1">启用</el-radio>
              <el-radio :value="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="颜色" prop="color">
        <el-color-picker v-model="form.color" show-alpha />
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

interface DictDataForm {
  id?: number
  type: string
  label: string
  value: string
  sort: number
  status: number
  color: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<DictDataForm>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: DictDataForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive<DictDataForm>({
  type: '',
  label: '',
  value: '',
  sort: 0,
  status: 1,
  color: '#409EFF',
})

const rules: FormRules = {
  label: [{ required: true, message: '请输入标签', trigger: 'blur' }],
  value: [{ required: true, message: '请输入值', trigger: 'blur' }],
}

watch(() => props.formData, (data) => {
  if (data) Object.assign(form, data)
}, { immediate: true })

function resetForm() {
  form.id = undefined
  form.type = ''
  form.label = ''
  form.value = ''
  form.sort = 0
  form.status = 1
  form.color = '#409EFF'
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