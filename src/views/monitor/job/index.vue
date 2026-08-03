<template>
  <div class="job-management">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>定时任务</span>
          <el-button type="primary" @click="handleAdd">新增任务</el-button>
        </div>
      </template>
      
      <el-form :inline="true" class="search-form">
        <el-form-item label="任务名称">
          <el-input v-model="queryParams.jobName" placeholder="请输入任务名称" clearable />
        </el-form-item>
        <el-form-item label="任务组名">
          <el-input v-model="queryParams.jobGroup" placeholder="请输入任务组名" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 120px">
            <el-option label="正常" value="0" />
            <el-option label="暂停" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column prop="jobId" label="任务编号" width="100" />
        <el-table-column prop="jobName" label="任务名称" width="150" show-overflow-tooltip />
        <el-table-column prop="jobGroup" label="任务组名" width="120" />
        <el-table-column prop="invokeTarget" label="调用目标字符串" min-width="250" show-overflow-tooltip />
        <el-table-column prop="cronExpression" label="cron执行表达式" width="150">
          <template #default="{ row }">
            <el-tooltip :content="parseCron(row.cronExpression)" placement="top">
              <span>{{ row.cronExpression }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-switch 
              v-model="row.status" 
              active-value="0" 
              inactive-value="1"
              @change="handleStatusChange(row)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="280" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="primary" @click="handleRun(row)" :disabled="row.status === '1'">执行</el-button>
            <el-button link type="info" @click="handleLog(row)">日志</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <Pagination
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        @update:current-page="(val) => queryParams.pageNum = val"
        @update:page-size="(val) => queryParams.pageSize = val"
        @change="handleQuery"
      />
    </Card>
    
    <JobForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      @submit="handleSubmit"
    />
    
    <JobLog v-model="logDialogVisible" :log-data="logData" />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'JobManagement' })
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import JobForm from './JobForm.vue'
import JobLog from './JobLog.vue'

interface JobItem {
  jobId: number
  jobName: string
  jobGroup: string
  invokeTarget: string
  cronExpression: string
  misfirePolicy: string
  concurrent: string
  status: string
  remark: string
  createTime: string
}

interface JobLog {
  logId: number
  jobName: string
  jobGroup: string
  invokeTarget: string
  jobMessage: string
  status: string
  createTime: string
}

const mockData: JobItem[] = [
  { jobId: 1, jobName: '系统默认（无参）', jobGroup: 'DEFAULT', invokeTarget: 'ryTask.ryNoParams()', cronExpression: '0/10 * * * * ?', misfirePolicy: 'default', concurrent: '0', status: '0', remark: '', createTime: '2024-01-01 00:00:00' },
  { jobId: 2, jobName: '系统默认（有参）', jobGroup: 'DEFAULT', invokeTarget: 'ryTask.ryParams(\'ry\')', cronExpression: '0/15 * * * * ?', misfirePolicy: 'default', concurrent: '0', status: '0', remark: '', createTime: '2024-01-02 00:00:00' },
  { jobId: 3, jobName: '数据清理任务', jobGroup: 'SYSTEM', invokeTarget: 'cleanTask.cleanExpiredData()', cronExpression: '0 0 2 * * ?', misfirePolicy: 'default', concurrent: '1', status: '0', remark: '每天凌晨2点清理过期数据', createTime: '2024-01-03 00:00:00' },
  { jobId: 4, jobName: '报表生成任务', jobGroup: 'SYSTEM', invokeTarget: 'reportTask.generateDailyReport()', cronExpression: '0 30 6 * * ?', misfirePolicy: 'immediate', concurrent: '1', status: '1', remark: '每天早上6:30生成日报', createTime: '2024-01-04 00:00:00' },
]

const mockLogData: JobLog[] = [
  { logId: 1, jobName: '系统默认（无参）', jobGroup: 'DEFAULT', invokeTarget: 'ryTask.ryNoParams()', jobMessage: '执行成功，耗时156ms', status: '0', createTime: '2024-07-15 10:00:00' },
  { logId: 2, jobName: '系统默认（无参）', jobGroup: 'DEFAULT', invokeTarget: 'ryTask.ryNoParams()', jobMessage: '执行成功，耗时148ms', status: '0', createTime: '2024-07-15 09:50:00' },
  { logId: 3, jobName: '系统默认（有参）', jobGroup: 'DEFAULT', invokeTarget: 'ryTask.ryParams(\'ry\')', jobMessage: '参数异常：参数不能为空', status: '1', createTime: '2024-07-14 16:20:00' },
]

const loading = ref(false)
const tableData = ref<JobItem[]>(mockData)
const total = ref(mockData.length)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  jobName: '',
  jobGroup: '',
  status: ''
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增任务')
const formRef = ref()
const formData = ref<Partial<JobItem>>({
  jobName: '',
  jobGroup: 'DEFAULT',
  invokeTarget: '',
  cronExpression: '',
  misfirePolicy: 'default',
  concurrent: '0',
  status: '0',
  remark: ''
})

const logDialogVisible = ref(false)
const logData = ref<JobLog[]>(mockLogData)


function parseCron(cron: string) {
  return `每${cron.includes('/') ? cron.split('/')[1] + (cron.split(' ')[2] === '*' ? '分钟' : '') : ''}执行`
}

function handleQuery() {
  loading.value = true
  setTimeout(() => {
    tableData.value = mockData.filter(item => {
      return (!queryParams.jobName || item.jobName.includes(queryParams.jobName)) &&
             (!queryParams.jobGroup || item.jobGroup === queryParams.jobGroup) &&
             (!queryParams.status || item.status === queryParams.status)
    })
    total.value = tableData.value.length
    loading.value = false
  }, 300)
}

function resetQuery() {
  queryParams.jobName = ''
  queryParams.jobGroup = ''
  queryParams.status = ''
  handleQuery()
}

function handleAdd() {
  dialogTitle.value = '新增任务'
  formData.value = { jobName: '', jobGroup: 'DEFAULT', invokeTarget: '', cronExpression: '', misfirePolicy: 'default', concurrent: '0', status: '0', remark: '' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑任务'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleStatusChange(row: any) {
  ElMessage.success(`状态更新成功: "${row.jobName}" ${row.status === '0' ? '启动' : '暂停'}`)
}

function handleRun(row: any) {
  ElMessageBox.confirm(`确认立即执行一次任务 "${row.jobName}"?`, '确认', { type: 'warning' })
    .then(() => ElMessage.success('执行成功'))
    .catch(() => {})
}

function handleLog(row: any) {
  logData.value = mockLogData.filter(log => log.jobName === row.jobName)
  logDialogVisible.value = true
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确认删除任务 "${row.jobName}"?`, '警告', { type: 'warning' })
    .then(() => ElMessage.success('删除成功'))
    .catch(() => {})
}

async function handleSubmit() {
  await formRef.value?.validate()
  ElMessage.success(dialogTitle.value === '新增任务' ? '新增成功' : '修改成功')
  dialogVisible.value = false
}
</script>

<style scoped lang="scss">
.job-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .search-form {
    margin-bottom: 16px;
  }
}
</style>