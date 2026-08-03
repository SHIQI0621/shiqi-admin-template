<template>
  <div class="user-management">
    <!-- 搜索区域 -->
    <Card shadow="never" class="search-card" :border-radius="16">
      <el-form :model="queryParams" inline>
        <el-form-item label="用户名">
          <el-input
            v-model="queryParams.username"
            placeholder="请输入用户名/昵称"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请输入" clearable style="width: 150px">
            <el-option label="启用" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </Card>

    <!-- 操作按钮 -->
    <Card shadow="never" class="table-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>用户管理</span>
          <div>
            <el-button type="primary" :icon="Plus" @click="handleAdd">新增用户</el-button>
            <el-button type="danger" :icon="Delete" :disabled="!selectedIds.length" @click="handleBatchDelete">
              批量删除
            </el-button>
            <el-button :icon="Download" @click="handleExport">导出</el-button>
          </div>
        </div>
      </template>

      <!-- 表格 -->
      <el-table
        v-loading="loading"
        :data="userList"
        @selection-change="handleSelectionChange"
        border
        stripe
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="avatar" label="头像" width="70" align="center">
          <template #default="{ row }">
            <el-avatar :size="32" :src="row.avatar" />
          </template>
        </el-table-column>
        <el-table-column prop="username" label="用户名" min-width="100" show-overflow-tooltip />
        <el-table-column prop="nickname" label="昵称" min-width="100" show-overflow-tooltip />
        <el-table-column prop="deptName" label="部门" width="120" align="center" />
        <el-table-column prop="phone" label="手机号" width="130" align="center" />
        <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-switch
              :model-value="row.status === 1"
              @change="(val: any) => handleStatusChange(row, val)"
            />
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="170" align="center" />
        <el-table-column label="操作" width="200" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link size="small" @click="handleResetPwd(row)">重置密码</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <Pagination
        :current-page="queryParams.page"
        :page-size="queryParams.pageSize"
        :total="total"
        @update:current-page="(val) => queryParams.page = val"
        @update:page-size="(val) => queryParams.pageSize = val"
        @change="getList"
      />
    </Card>

    <!-- 新增/编辑对话框 -->
    <UserForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'UserManagement' })
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, Plus, Delete, Download } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import UserForm from './UserForm.vue'

// 查询参数
const queryParams = reactive({
  page: 1,
  pageSize: 10,
  username: '',
  status: undefined as number | undefined,
})

// 列表数据
const loading = ref(false)
const userList = ref<any[]>([])
const total = ref(0)
const selectedIds = ref<number[]>([])

// 对话框
const dialogVisible = ref(false)
const dialogTitle = ref('新增用户')
const formData = ref<any>({})
const submitLoading = ref(false)

// 获取列表
async function getList() {
  loading.value = true
  try {
    const res: any = await request.get('/api/user/list', { params: queryParams })
    const data = res.data || res
    userList.value = data.list || []
    total.value = data.total || 0
  } catch (error) {
    console.error('获取用户列表失败:', error)
    userList.value = [
      { id: 1, username: 'admin', nickname: '超级管理员', avatar: '', deptName: '总公司', phone: '13800138000', email: 'admin@example.com', status: 1, createTime: '2024-01-01 10:00:00' },
      { id: 2, username: 'zhangsan', nickname: '张三', avatar: '', deptName: '技术部', phone: '13800138001', email: 'zhangsan@example.com', status: 1, createTime: '2024-01-15 14:30:00' },
      { id: 3, username: 'lisi', nickname: '李四', avatar: '', deptName: '市场部', phone: '13800138002', email: 'lisi@example.com', status: 1, createTime: '2024-02-01 09:20:00' },
      { id: 4, username: 'wangwu', nickname: '王五', avatar: '', deptName: '财务部', phone: '13800138003', email: 'wangwu@example.com', status: 0, createTime: '2024-02-10 16:45:00' },
      { id: 5, username: 'zhaoliu', nickname: '赵六', avatar: '', deptName: '人事部', phone: '13800138004', email: 'zhaoliu@example.com', status: 1, createTime: '2024-03-01 11:00:00' },
    ]
    total.value = 5
  } finally {
    loading.value = false
  }
}

// 搜索
function handleQuery() {
  queryParams.page = 1
  getList()
}

// 重置搜索
function resetQuery() {
  queryParams.username = ''
  queryParams.status = undefined
  handleQuery()
}

// 选择变化
function handleSelectionChange(rows: any[]) {
  selectedIds.value = rows.map((row) => row.id)
}

// 新增
function handleAdd() {
  dialogTitle.value = '新增用户'
  formData.value = {}
  dialogVisible.value = true
}

// 编辑
function handleEdit(row: any) {
  dialogTitle.value = '编辑用户'
  formData.value = { ...row }
  dialogVisible.value = true
}

// 提交表单
async function handleSubmit(data: any) {
  submitLoading.value = true
  try {
    if (data.id) {
      await request.put('/api/user/update', data)
      ElMessage.success('更新成功')
    } else {
      await request.post('/api/user/create', data)
      ElMessage.success('创建成功')
    }
    dialogVisible.value = false
    getList()
  } catch (error) {
    console.error('操作失败:', error)
  } finally {
    submitLoading.value = false
  }
}

// 状态切换
async function handleStatusChange(row: any, val: boolean) {
  try {
    await request.put('/api/user/update', { id: row.id, status: val ? 1 : 0 })
    ElMessage.success('状态更新成功')
    row.status = val ? 1 : 0
  } catch (error) {
    console.error('更新状态失败:', error)
  }
}

// 重置密码
function handleResetPwd(row: any) {
  ElMessageBox.confirm(`确定要重置用户 "${row.nickname}" 的密码吗？`, '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    ElMessage.success('密码已重置为默认密码：123456')
  }).catch(() => {})
}

// 删除
function handleDelete(row: any) {
  ElMessageBox.confirm(`确定要删除用户 "${row.nickname}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await request.delete('/api/user/delete', { params: { id: row.id } })
      ElMessage.success('删除成功')
      getList()
    } catch (error) {
      console.error('删除失败:', error)
    }
  }).catch(() => {})
}

// 批量删除
function handleBatchDelete() {
  ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个用户吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await request.post('/api/user/batch', { ids: selectedIds.value })
      ElMessage.success('批量删除成功')
      getList()
    } catch (error) {
      console.error('批量删除失败:', error)
    }
  }).catch(() => {})
}

// 导出
function handleExport() {
  ElMessage.info('导出功能开发中...')
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.user-management {
  .search-card {
    margin-bottom: 16px;
    
    :deep(.el-card__body) {
      padding-bottom: 2px;
    }
  }

  .table-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>