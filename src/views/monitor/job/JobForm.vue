<template>
  <Dialog v-model="visible" :title="title" width="650px" destroy-on-close>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="120px">
      <el-form-item label="任务名称" prop="jobName">
        <el-input v-model="form.jobName" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="任务组名" prop="jobGroup">
        <el-select v-model="form.jobGroup" placeholder="请输入" style="width: 100%">
          <el-option label="默认" value="DEFAULT" />
          <el-option label="系统" value="SYSTEM" />
        </el-select>
      </el-form-item>
      <el-form-item label="调用目标字符串" prop="invokeTarget">
        <el-input v-model="form.invokeTarget" placeholder="请输入调用目标字符串" />
      </el-form-item>
      <el-form-item label="cron执行表达式" prop="cronExpression">
        <el-input v-model="form.cronExpression" placeholder="请输入cron表达式">
          <template #append>
            <el-button>生成</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="执行策略">
        <el-radio-group v-model="form.misfirePolicy">
          <el-radio value="default">默认策略</el-radio>
          <el-radio value="immediate">立即执行</el-radio>
          <el-radio value="discard">执行一次</el-radio>
          <el-radio value="none">放弃执行</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="是否并发">
        <el-radio-group v-model="form.concurrent">
          <el-radio value="0">允许</el-radio>
          <el-radio value="1">禁止</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio value="0">正常</el-radio>
          <el-radio value="1">暂停</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="form.remark" type="textarea" :rows="3" />
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

interface JobForm {
  jobId?: number
  jobName: string
  jobGroup: string
  invokeTarget: string
  cronExpression: string
  misfirePolicy: string
  concurrent: string
  status: string
  remark: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<JobForm>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: JobForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const form = ref<Partial<JobForm>>({
  jobName: '',
  jobGroup: 'DEFAULT',
  invokeTarget: '',
  cronExpression: '',
  misfirePolicy: 'default',
  concurrent: '0',
  status: '0',
  remark: '',
})

const rules: FormRules = {
  jobName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }],
  jobGroup: [{ required: true, message: '请选择任务组名', trigger: 'change' }],
  invokeTarget: [{ required: true, message: '请输入调用目标字符串', trigger: 'blur' }],
  cronExpression: [{ required: true, message: '请输入cron表达式', trigger: 'blur' }],
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
  emit('submit', { ...form.value } as JobForm)
  visible.value = false
}
</script>
