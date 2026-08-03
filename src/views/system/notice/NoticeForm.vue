<template>
  <Dialog v-model="visible" title="公告详情" width="700px" destroy-on-close>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="公告标题" prop="noticeTitle">
        <el-input v-model="form.noticeTitle" placeholder="请输入公告标题" />
      </el-form-item>
      <el-form-item label="公告类型" prop="noticeType">
        <el-radio-group v-model="form.noticeType">
          <el-radio value="1">通知</el-radio>
          <el-radio value="2">公告</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态">
        <el-radio-group v-model="form.status">
          <el-radio value="0">正常</el-radio>
          <el-radio value="1">关闭</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="内容" prop="noticeContent">
        <editor v-model="form.noticeContent" :min-height="200" />
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
import Editor from '@/components/Editor/index.vue'

interface NoticeForm {
  noticeId?: number
  noticeTitle: string
  noticeType: string
  noticeContent: string
  status: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<NoticeForm>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: NoticeForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const form = ref<Partial<NoticeForm>>({
  noticeTitle: '',
  noticeType: '1',
  noticeContent: '',
  status: '0',
})

const rules: FormRules = {
  noticeTitle: [{ required: true, message: '请输入公告标题', trigger: 'blur' }],
  noticeType: [{ required: true, message: '请选择公告类型', trigger: 'change' }],
  noticeContent: [{ required: true, message: '请输入公告内容', trigger: 'blur' }],
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
  emit('submit', { ...form.value } as NoticeForm)
  visible.value = false
}
</script>
