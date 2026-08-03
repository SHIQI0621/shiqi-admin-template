<template>
  <Dialog v-model="visible" title="调度日志" width="800px">
    <el-table :data="logData" border stripe max-height="400">
      <el-table-column prop="logId" label="日志编号" width="80" />
      <el-table-column prop="jobName" label="任务名称" width="120" />
      <el-table-column prop="jobGroup" label="任务组名" width="80" />
      <el-table-column prop="invokeTarget" label="调用目标字符串" min-width="200" show-overflow-tooltip />
      <el-table-column prop="jobMessage" label="日志信息" min-width="150" show-overflow-tooltip />
      <el-table-column prop="status" label="执行状态" width="90" align="center">
        <template #default="{ row }">
          <el-tag :type="row.status === '0' ? 'success' : 'danger'" size="small">
            {{ row.status === '0' ? '成功' : '失败' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="执行时间" width="160" />
    </el-table>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from '@/components/Dialog/index.vue'

interface JobLog {
  logId: number
  jobName: string
  jobGroup: string
  invokeTarget: string
  jobMessage: string
  status: string
  createTime: string
}

const props = defineProps<{
  modelValue: boolean
  logData?: JobLog[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
</script>
