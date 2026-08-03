<template>
  <div class="role-management">
    <!-- 搜索区域 -->
    <Card shadow="never" class="search-card" :border-radius="16">
      <el-form :model="queryParams" inline>
        <el-form-item label="角色名称">
          <el-input
            v-model="queryParams.name"
            placeholder="请输入角色名称"
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

    <!-- 角色列表 -->
    <Card shadow="never" class="table-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>角色管理</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd">新增角色</el-button>
        </div>
      </template>

      <el-table v-loading="loading" :data="roleList" border stripe>
        <el-table-column prop="id" label="ID" width="80" align="center" />
        <el-table-column prop="name" label="角色名称" min-width="120" />
        <el-table-column prop="code" label="角色标识" min-width="120" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'" size="small">
              {{ row.status === 1 ? '启用' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" min-width="180" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" width="170" align="center" />
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link size="small" @click="handlePermission(row)">权限</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Pagination
        :current-page="queryParams.page"
        :page-size="queryParams.pageSize"
        :total="total"
        :page-sizes="[10, 20, 50]"
        layout="total, sizes, prev, pager, next"
        @update:current-page="(val) => queryParams.page = val"
        @update:page-size="(val) => queryParams.pageSize = val"
        @change="getList"
      />
    </Card>

    <!-- 新增/编辑对话框 -->
    <RoleForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      @submit="handleSubmit"
    />

    <!-- 权限配置对话框 -->
    <RolePermission
      v-model="permDialogVisible"
      :checked-keys="permCheckedKeys"
      @save="handleSavePermission"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'RoleManagement' })
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import RoleForm from './RoleForm.vue'
import RolePermission from './RolePermission.vue'

const queryParams = reactive({
  page: 1,
  pageSize: 10,
  name: '',
  status: undefined as number | undefined,
})

const loading = ref(false)
const roleList = ref<any[]>([])
const total = ref(0)

const dialogVisible = ref(false)
const dialogTitle = ref('新增角色')
const formData = ref<any>({
  id: undefined as number | undefined,
  name: '',
  code: '',
  status: 1,
  remark: '',
})

// 权限配置相关
const permDialogVisible = ref(false)
const currentRoleId = ref<number | null>(null)
const permCheckedKeys = ref<number[]>([])

async function getList() {
  loading.value = true
  try {
    const res: any = await request.get('/api/role/list', { params: queryParams })
    const data = res.data || res
    roleList.value = data.list || []
    total.value = data.total || 0
  } catch (error) {
    console.error('获取角色列表失败:', error)
    roleList.value = [
      { id: 1, name: '超级管理员', code: 'admin', status: 1, remark: '拥有系统所有权限', menuIds: [1, 2, 21, 22], createTime: '2024-01-01 10:00:00' },
      { id: 2, name: '普通管理员', code: 'manager', status: 1, remark: '拥有部分管理权限', menuIds: [1, 2, 21], createTime: '2024-01-05 11:00:00' },
      { id: 3, name: '普通用户', code: 'user', status: 1, remark: '普通用户角色', menuIds: [1], createTime: '2024-01-10 09:00:00' },
      { id: 4, name: '访客', code: 'guest', status: 0, remark: '仅可查看部分内容', menuIds: [1], createTime: '2024-02-01 14:00:00' },
    ]
    total.value = 4
  } finally {
    loading.value = false
  }
}

function handleQuery() {
  queryParams.page = 1
  getList()
}

function resetQuery() {
  queryParams.name = ''
  queryParams.status = undefined
  handleQuery()
}

function handleAdd() {
  dialogTitle.value = '新增角色'
  formData.value = { name: '', code: '', status: 1, remark: '' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑角色'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleSubmit(data: any) {
  if (data.id) {
    ElMessage.success('更新成功')
  } else {
    ElMessage.success('创建成功')
  }
  getList()
}

function handlePermission(row: any) {
  currentRoleId.value = row.id
  permCheckedKeys.value = row.menuIds || []
  permDialogVisible.value = true
}

function handleSavePermission(keys: number[]) {
  const role = roleList.value.find(r => r.id === currentRoleId.value)
  if (role) role.menuIds = keys
}

function handleDelete(row: any) {
  ElMessageBox.confirm(`确定要删除角色 "${row.name}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await request.delete('/api/role/delete', { params: { id: row.id } })
      ElMessage.success('删除成功')
      getList()
    } catch (error) {
      console.error('删除失败:', error)
    }
  }).catch(() => {})
}

onMounted(() => {
  getList()
})
</script>

<style scoped lang="scss">
.role-management {
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