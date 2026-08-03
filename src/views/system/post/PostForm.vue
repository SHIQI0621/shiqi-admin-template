<template>
  <Dialog v-model="visible" :title="title" width="500px" destroy-on-close>
    <el-form ref="formRef" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="岗位名称" prop="postName">
        <el-input v-model="form.postName" placeholder="岗位名称" />
      </el-form-item>
      <el-form-item label="岗位编码" prop="postCode">
        <el-input v-model="form.postCode" placeholder="请输入编码名称" />
      </el-form-item>
      <el-form-item label="排序" prop="postSort">
        <el-input-number v-model="form.postSort" :min="0" :max="999" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :value="1">正常</el-radio>
          <el-radio :value="0">停用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="form.remark" type="textarea" :rows="3" placeholder="备注" />
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
import type { FormInstance } from 'element-plus'

interface PostForm {
  postId?: number
  postName: string
  postCode: string
  postSort: number
  status: number
  remark: string
}

const props = defineProps<{
  modelValue: boolean
  title: string
  formData?: Partial<PostForm>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
  (e: 'submit', data: PostForm): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const formRef = ref<FormInstance>()
const form = ref<Partial<PostForm>>({
  postName: '',
  postCode: '',
  postSort: 0,
  status: 1,
  remark: '',
})

const rules = {
  postName: [{ required: true, message: '请输入岗位名称', trigger: 'blur' }],
  postCode: [{ required: true, message: '请输入岗位编码', trigger: 'blur' }],
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
  emit('submit', { ...form.value } as PostForm)
  visible.value = false
}
</script>