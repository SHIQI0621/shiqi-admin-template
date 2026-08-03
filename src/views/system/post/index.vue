<template>
  <div class="post-management">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>岗位管理</span>
          <el-button type="primary" @click="handleAdd">新增岗位</el-button>
        </div>
      </template>
      
      <!-- 搜索栏 -->
      <el-form :inline="true" class="search-form">
        <el-form-item label="岗位编码">
          <el-input v-model="queryParams.postCode" placeholder="请输入岗位名称" clearable />
        </el-form-item>
        <el-form-item label="岗位名称">
          <el-input v-model="queryParams.postName" placeholder="请输入岗位名称" clearable />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="全部" clearable style="width: 120px">
            <el-option label="正常" :value="1" />
            <el-option label="停用" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      
      <!-- 表格 -->
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="postId" label="ID" width="100" />
        <el-table-column prop="postCode" label="岗位编码" width="120" />
        <el-table-column prop="postName" label="岗位名称" width="120" />
        <el-table-column prop="postSort" label="排序" width="100" align="center" />
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'danger'">
              {{ row.status === 1 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
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
    
    <!-- 新增/编辑对话框 -->
    <PostForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'PostManagement' })
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PostForm from './PostForm.vue'

interface PostItem {
  postId: number
  postCode: string
  postName: string
  postSort: number
  status: number
  remark: string
  createTime: string
}

// Mock 数据
const mockData: PostItem[] = [
  { postId: 1, postCode: 'ceo', postName: '董事长', postSort: 1, status: 1, remark: '', createTime: '2024-01-01 10:00:00' },
  { postId: 2, postCode: 'se', postName: '项目经理', postSort: 2, status: 1, remark: '', createTime: '2024-01-02 10:00:00' },
  { postId: 3, postCode: 'hr', postName: '人力资源', postSort: 3, status: 1, remark: '', createTime: '2024-01-03 10:00:00' },
  { postId: 4, postCode: 'user', postName: '普通员工', postSort: 4, status: 1, remark: '', createTime: '2024-01-04 10:00:00' },
  { postId: 5, postCode: 'test', postName: '测试岗位', postSort: 5, status: 0, remark: '已停用', createTime: '2024-01-05 10:00:00' },
]

const loading = ref(false)
const tableData = ref<PostItem[]>(mockData)
const total = ref(mockData.length)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  postCode: '',
  postName: '',
  status: undefined as number | undefined
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增岗位')
const formData = ref<Partial<PostItem>>({
  postName: '',
  postCode: '',
  postSort: 0,
  status: 1,
  remark: ''
})

function handleQuery() {
  loading.value = true
  setTimeout(() => {
    tableData.value = mockData.filter(item => {
      return (!queryParams.postCode || item.postCode.includes(queryParams.postCode)) &&
             (!queryParams.postName || item.postName.includes(queryParams.postName)) &&
             (queryParams.status === undefined || item.status === queryParams.status)
    })
    total.value = tableData.value.length
    loading.value = false
  }, 300)
}

function resetQuery() {
  queryParams.postCode = ''
  queryParams.postName = ''
  queryParams.status = undefined
  handleQuery()
}

function handleAdd() {
  dialogTitle.value = '新增岗位'
  formData.value = { postName: '', postCode: '', postSort: 0, status: 1, remark: '' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑岗位'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleSubmit(data: Partial<PostItem>) {
  if (data.postId) {
    const idx = tableData.value.findIndex(item => item.postId === data.postId)
    if (idx > -1) tableData.value[idx] = { ...tableData.value[idx], ...data }
    ElMessage.success('更新成功')
  } else {
    const newId = Date.now()
    tableData.value.push({ ...data, postId: newId, createTime: new Date().toLocaleString() } as PostItem)
    ElMessage.success('创建成功')
  }
  dialogVisible.value = false
  handleQuery()
}

function handleDelete(row: any) {
  ElMessageBox.confirm('确定删除该岗位吗？', '警告', { type: 'warning' })
    .then(() => {
      const idx = tableData.value.findIndex(item => item.postId === row.postId)
      if (idx > -1) tableData.value.splice(idx, 1)
      ElMessage.success('删除成功')
      handleQuery()
    })
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.post-management {
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