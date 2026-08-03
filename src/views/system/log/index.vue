<template>
  <div class="log-management">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>日志管理</span>
          <el-button type="danger" :disabled="!selectedIds.length" @click="handleBatchDelete">
            批量删除
          </el-button>
        </div>
      </template>
      
      <el-tabs v-model="activeTab" @tab-change="handleTabChange">
        <el-tab-pane label="操作日志" name="oper" />
        <el-tab-pane label="登录日志" name="login" />
      </el-tabs>
      
      <el-form :inline="true" class="search-form">
        <el-form-item label="标题" v-if="activeTab === 'oper'">
          <el-input v-model="queryParams.title" placeholder="标题" clearable />
        </el-form-item>
        <el-form-item label="操作人">
          <el-input v-model="queryParams.operName" placeholder="操作人" clearable />
        </el-form-item>
        <el-form-item label="类型" v-if="activeTab === 'login'">
          <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 120px">
            <el-option label="登录成功" value="0" />
            <el-option label="退出" value="1" />
            <el-option label="登录失败" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="操作时间">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
          <el-button type="warning" @click="handleExport">导出</el-button>
        </el-form-item>
      </el-form>
      
      <el-table 
        v-if="activeTab === 'oper'"
        :data="operLogData" 
        border 
        stripe 
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="operId" label="日志ID" width="100" />
        <el-table-column prop="title" label="标题" width="120" />
        <el-table-column prop="operatorType" label="操作类型" width="100" align="center">
          <template #default="{ row }">
            <el-tag size="small">{{ getOperTypeLabel(row.operatorType) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operName" label="操作人" width="100" />
        <el-table-column prop="deptName" label="部门" width="120" />
        <el-table-column prop="operIp" label="操作IP" width="130" />
        <el-table-column prop="operLocation" label="操作地点" width="120" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '0' ? 'success' : 'danger'" size="small">
              {{ row.status === '0' ? '正常' : '异常' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="operTime" label="操作时间" width="170" />
        <el-table-column label="操作" width="80" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleDetail(row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <el-table 
        v-else
        :data="loginLogData" 
        border 
        stripe 
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="infoId" label="信息ID" width="100" />
        <el-table-column prop="userName" label="用户名" width="120" />
        <el-table-column prop="ipaddr" label="IP地址" width="130" />
        <el-table-column prop="loginLocation" label="登录地点" width="120" />
        <el-table-column prop="browser" label="浏览器" width="120" />
        <el-table-column prop="os" label="操作系统" width="120" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '0' ? 'success' : 'danger'" size="small">
              {{ getLoginStatusLabel(row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="msg" label="登录信息" show-overflow-tooltip />
        <el-table-column prop="loginTime" label="登录时间" width="170" />
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
    
    <Dialog v-model="detailVisible" title="操作详情" width="650px">
      <el-descriptions :column="2" border>
        <el-descriptions-item label="标题">{{ detailData.title }}</el-descriptions-item>
        <el-descriptions-item label="请求参数">{{ detailData.operParam }}</el-descriptions-item>
        <el-descriptions-item label="操作人">{{ detailData.operName }}</el-descriptions-item>
        <el-descriptions-item label="部门">{{ detailData.deptName }}</el-descriptions-item>
        <el-descriptions-item label="操作IP">{{ detailData.operIp }}</el-descriptions-item>
        <el-descriptions-item label="操作地点">{{ detailData.operLocation }}</el-descriptions-item>
        <el-descriptions-item label="请求方式" :span="2">{{ detailData.requestMethod }}</el-descriptions-item>
        <el-descriptions-item label="请求URL" :span="2">{{ detailData.operUrl }}</el-descriptions-item>
        <el-descriptions-item label="操作时间" :span="2">{{ detailData.operTime }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag :type="detailData.status === '0' ? 'success' : 'danger'">
            {{ detailData.status === '0' ? '正常' : '异常' }}
          </el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="耗时">{{ detailData.costTime }}毫秒</el-descriptions-item>
        <el-descriptions-item label="错误信息" :span="2" v-if="detailData.errorMsg">
          <div style="color: #f56c6c; white-space: pre-wrap;">{{ detailData.errorMsg }}</div>
        </el-descriptions-item>
      </el-descriptions>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'LogManagement' })
import { ref, reactive } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

interface OperLog {
  operId: number
  title: string
  operatorType: number
  operName: string
  deptName: string
  operIp: string
  operLocation: string
  status: string
  operTime: string
  operParam: string
  requestMethod: string
  operUrl: string
  costTime: number
  errorMsg?: string
}

interface LoginLog {
  infoId: number
  userName: string
  ipaddr: string
  loginLocation: string
  browser: string
  os: string
  status: string
  msg: string
  loginTime: string
}

const mockOperLog: OperLog[] = [
  { operId: 1, title: '用户管理', operatorType: 1, operName: 'admin', deptName: '技术部', operIp: '127.0.0.1', operLocation: '本地', status: '0', operTime: '2024-07-15 10:00:00', operParam: '{"userId":"1"}', requestMethod: 'POST', operUrl: '/system/user', costTime: 156 },
  { operId: 2, title: '角色管理', operatorType: 2, operName: 'admin', deptName: '技术部', operIp: '127.0.0.1', operLocation: '本地', status: '0', operTime: '2024-07-15 10:05:00', operParam: '{"roleId":"1"}', requestMethod: 'PUT', operUrl: '/system/role/1', costTime: 89 },
  { operId: 3, title: '字典管理', operatorType: 3, operName: 'admin', deptName: '技术部', operIp: '192.168.1.100', operLocation: '北京', status: '1', operTime: '2024-07-15 10:10:00', operParam: '{}', requestMethod: 'DELETE', operUrl: '/system/dict/5', costTime: 234, errorMsg: '删除失败：该字典正在使用中' },
  { operId: 4, title: '参数设置', operatorType: 1, operName: 'test', deptName: '测试部', operIp: '192.168.1.101', operLocation: '上海', status: '0', operTime: '2024-07-15 11:00:00', operParam: '{"key":"skin"}', requestMethod: 'POST', operUrl: '/system/config', costTime: 78 },
]

const mockLoginLog: LoginLog[] = [
  { infoId: 1, userName: 'admin', ipaddr: '127.0.0.1', loginLocation: '本地', browser: 'Chrome 120', os: 'Windows 10', status: '0', msg: '登录成功', loginTime: '2024-07-15 09:00:00' },
  { infoId: 2, userName: 'admin', ipaddr: '127.0.0.1', loginLocation: '本地', browser: 'Chrome 120', os: 'Windows 10', status: '1', msg: '退出成功', loginTime: '2024-07-15 18:00:00' },
  { infoId: 3, userName: 'test', ipaddr: '192.168.1.102', loginLocation: '广州', browser: 'Firefox 115', os: 'Mac OS X', status: '2', msg: '密码错误', loginTime: '2024-07-15 10:30:00' },
  { infoId: 4, userName: 'ry', ipaddr: '192.168.1.103', loginLocation: '深圳', browser: 'Edge 120', os: 'Windows 11', status: '0', msg: '登录成功', loginTime: '2024-07-15 14:00:00' },
]

const activeTab = ref('oper')
const loading = ref(false)
const operLogData = ref<OperLog[]>(mockOperLog)
const loginLogData = ref<LoginLog[]>(mockLoginLog)
const total = ref(activeTab.value === 'oper' ? mockOperLog.length : mockLoginLog.length)
const selectedIds = ref<number[]>([])
const dateRange = ref<string[]>()
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  title: '',
  operName: '',
  status: ''
})

const detailVisible = ref(false)
const detailData = ref<OperLog>({} as OperLog)

const operTypeMap: Record<number, string> = { 
  1: '新增', 2: '修改', 3: '删除', 4: '授权', 
  5: '导出', 6: '导入', 7: '强退', 
  8: '生成代码', 9: '清空数据', 10: '其他' 
}

function getOperTypeLabel(type: number) {
  return operTypeMap[type] || '其他'
}

const loginStatusMap: Record<string, string> = { '0': '登录成功', '1': '退出', '2': '登录失败' }

function getLoginStatusLabel(status: string) {
  return loginStatusMap[status] || '未知'
}

function handleTabChange() {
  queryParams.title = ''
  queryParams.status = ''
  handleQuery()
}

function handleSelectionChange(rows: any[]) {
  selectedIds.value = rows.map((r: any) => r[activeTab.value === 'oper' ? 'operId' : 'infoId'])
}

function handleQuery() {
  loading.value = true
  setTimeout(() => {
    if (activeTab.value === 'oper') {
      operLogData.value = mockOperLog.filter(item => {
        return (!queryParams.title || item.title.includes(queryParams.title)) &&
               (!queryParams.operName || item.operName.includes(queryParams.operName))
      })
      total.value = operLogData.value.length
    } else {
      loginLogData.value = mockLoginLog.filter(item => {
        return (!queryParams.operName || item.userName.includes(queryParams.operName)) &&
               (!queryParams.status || item.status === queryParams.status)
      })
      total.value = loginLogData.value.length
    }
    loading.value = false
  }, 300)
}

function resetQuery() {
  queryParams.title = ''
  queryParams.operName = ''
  queryParams.status = ''
  dateRange.value = undefined
  handleQuery()
}

function handleBatchDelete() {
  ElMessageBox.confirm(`确认删除选中的${selectedIds.value.length}条记录吗？`, '警告', { type: 'warning' })
    .then(() => ElMessage.success('删除成功'))
    .catch(() => {})
}

function handleExport() {
  ElMessage.success('导出成功')
}

function handleDetail(row: any) {
  detailData.value = row
  detailVisible.value = true
}
</script>

<style scoped lang="scss">
.log-management {
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