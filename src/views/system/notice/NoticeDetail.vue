<template>
  <Dialog v-model="visible" title="公告详情" width="700px">
    <el-descriptions :column="1" border>
      <el-descriptions-item label="公告标题">{{ data.noticeTitle }}</el-descriptions-item>
      <el-descriptions-item label="公告类型">
        <el-tag :type="data.noticeType === '1' ? 'success' : 'warning'">
          {{ data.noticeType === '1' ? '通知' : '公告' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="状态">
        <el-tag :type="data.status === '0' ? 'success' : 'info'">
          {{ data.status === '0' ? '正常' : '关闭' }}
        </el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="创建者">{{ data.createBy }}</el-descriptions-item>
      <el-descriptions-item label="创建时间">{{ data.createTime }}</el-descriptions-item>
      <el-descriptions-item label="内容">
        <div style="white-space: pre-wrap">{{ data.noticeContent }}</div>
      </el-descriptions-item>
    </el-descriptions>
  </Dialog>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import Dialog from '@/components/Dialog/index.vue'

interface NoticeItem {
  noticeId: number
  noticeTitle: string
  noticeType: string
  noticeContent: string
  status: string
  createBy: string
  createTime: string
}

const props = defineProps<{
  modelValue: boolean
  data?: NoticeItem
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: boolean): void
}>()

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})

const defaultData: NoticeItem = {
  noticeId: 0,
  noticeTitle: '',
  noticeType: '',
  noticeContent: '',
  status: '',
  createBy: '',
  createTime: '',
}

const data = computed(() => props.data || defaultData)
</script>
