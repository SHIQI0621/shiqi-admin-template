<template>
  <div class="notice-management">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>通知公告</span>
          <el-button type="primary" @click="handleAdd">新增公告</el-button>
        </div>
      </template>
      
      <el-form :inline="true" class="search-form">
        <el-form-item label="公告标题">
          <el-input v-model="queryParams.noticeTitle" placeholder="请输入公告标题" clearable />
        </el-form-item>
        <el-form-item label="创建者">
          <el-input v-model="queryParams.createBy" placeholder="请输入操作人员" clearable />
        </el-form-item>
        <el-form-item label="公告类型">
          <el-select v-model="queryParams.noticeType" placeholder="全部" clearable style="width: 120px">
            <el-option label="通知" value="1" />
            <el-option label="公告" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="noticeId" label="公告编号" width="100" />
        <el-table-column prop="noticeTitle" label="公告标题" min-width="200" show-overflow-tooltip />
        <el-table-column prop="noticeType" label="公告类型" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.noticeType === '1' ? 'success' : 'warning'">
              {{ row.noticeType === '1' ? '通知' : '公告' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === '0' ? 'success' : 'info'">
              {{ row.status === '0' ? '正常' : '关闭' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createBy" label="创建者" width="100" />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleView(row)">查看</el-button>
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
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
    
    <NoticeForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      @submit="handleSubmit"
    />
    
    <NoticeDetail v-model="viewDialogVisible" :data="viewData" />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'NoticeManagement' })
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import NoticeForm from './NoticeForm.vue'
import NoticeDetail from './NoticeDetail.vue'

interface NoticeItem {
  noticeId: number
  noticeTitle: string
  noticeType: string
  noticeContent: string
  status: string
  createBy: string
  createTime: string
}

const mockData: NoticeItem[] = [
  { noticeId: 1, noticeTitle: '温馨提醒：2018-07-08 新版本发布', noticeType: '1', noticeContent: '尊敬的用户：\n\n我们很高兴地通知您，系统将于2018年7月8日发布新版本。\n\n本次更新包含以下内容：\n1. 新增XX功能\n2. 优化XX体验\n3. 修复已知问题\n\n感谢您的支持！', status: '0', createBy: 'admin', createTime: '2024-07-08 10:00:00' },
  { noticeId: 2, noticeTitle: '系统维护通知', noticeType: '2', noticeContent: '各位用户：\n\n为了提供更好的服务，系统将于本周六凌晨2:00-6:00进行维护升级。\n\n届时系统将暂停服务，请您提前做好相关工作安排。\n\n给您带来的不便敬请谅解！', status: '0', createBy: 'admin', createTime: '2024-07-10 14:30:00' },
  { noticeId: 3, noticeTitle: '关于账号安全的重要提示', noticeType: '1', noticeContent: '尊敬的用户：\n\n近期发现有不法分子利用钓鱼网站窃取用户信息。\n\n请注意以下几点：\n1. 请勿点击不明链接\n2. 定期修改密码\n3. 开启两步验证\n\n如有疑问请联系客服。', status: '0', createBy: 'admin', createTime: '2024-07-15 09:00:00' },
]

const loading = ref(false)
const tableData = ref<NoticeItem[]>(mockData)
const total = ref(mockData.length)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  noticeTitle: '',
  createBy: '',
  noticeType: ''
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增公告')
const formData = ref<Partial<NoticeItem>>({
  noticeTitle: '',
  noticeType: '1',
  noticeContent: '',
  status: '0'
})

const viewDialogVisible = ref(false)
const viewData = ref<NoticeItem>({} as NoticeItem)

function handleQuery() {
  loading.value = true
  setTimeout(() => {
    tableData.value = mockData.filter(item => {
      return (!queryParams.noticeTitle || item.noticeTitle.includes(queryParams.noticeTitle)) &&
             (!queryParams.createBy || item.createBy.includes(queryParams.createBy)) &&
             (!queryParams.noticeType || item.noticeType === queryParams.noticeType)
    })
    total.value = tableData.value.length
    loading.value = false
  }, 300)
}

function resetQuery() {
  queryParams.noticeTitle = ''
  queryParams.createBy = ''
  queryParams.noticeType = ''
  handleQuery()
}

function handleAdd() {
  dialogTitle.value = '新增公告'
  formData.value = { noticeTitle: '', noticeType: '1', noticeContent: '', status: '0' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑公告'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleView(row: any) {
  viewData.value = row
  viewDialogVisible.value = true
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确认删除公告 "${row.noticeTitle}"?`, '警告', { type: 'warning' })
    .then(() => ElMessage.success('删除成功'))
    .catch(() => {})
}

function handleSubmit(_data: any) {
  handleQuery()
}
</script>

<style scoped lang="scss">
.notice-management {
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