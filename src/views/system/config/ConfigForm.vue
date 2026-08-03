<template>
  <Dialog v-model="visible" :title="title" width="500px" destroy-on-close>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="参数名称" prop="configName">
        <el-input v-model="form.configName" placeholder="请输入参数名称" />
      </el-form-item>
      <el-form-item label="参数键名" prop="configKey">
        <el-input v-model="form.configKey" placeholder="请输入参数键名" />
      </el-form-item>
      <el-form-item label="参数键值" prop="configValue">
        <el-input v-model="form.configValue" placeholder="请输入参数键值" />
      </el-form-item>
      <el-form-item label="系统内置">
        <el-radio-group v-model="form.configType">
          <el-radio value="N">否</el-radio>
          <el-radio value="Y">是</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="请输入内容" />
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
import type { FormInstance, FormRules } from 'element-plus'

interface ConfigForm {
  configId?: number
  configName: string
  configKey: string
  configValue: string
  configType: string
  remark: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<ConfigForm>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: ConfigForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const form = ref<Partial<ConfigForm>>({
  configName: '',
  configKey: '',
  configValue: '',
  configType: 'N',
  remark: '',
})

const rules: FormRules = {
  configName: [{ required: true, message: '请输入参数名称', trigger: 'blur' }],
  configKey: [{ required: true, message: '请输入参数键名', trigger: 'blur' }],
  configValue: [{ required: true, message: '请输入参数键值', trigger: 'blur' }],
}

watch(
  () => props.formData,
  (data) => {
    if (data) form.value = { ...data }
  },
  { immediate: true },
)

async function handleSubmit() {
  await formRef.value?.validate()
  ElMessage.success(props.title.includes('新增') ? '新增成功' : '修改成功')
  emit('submit', { ...form.value } as ConfigForm)
  visible.value = false
}
</script>
