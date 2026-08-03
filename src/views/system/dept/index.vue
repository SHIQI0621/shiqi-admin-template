<template>
  <div class="dept-management">
    <Card shadow="never" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>部门管理</span>
          <el-button type="primary" :icon="Plus" @click="handleAdd(null)">新增部门</el-button>
        </div>
      </template>

      <!-- 部门树形表格 -->
      <el-table
        v-loading="loading"
        :data="deptList"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
      >
        <el-table-column prop="name" label="部门名称" min-width="200" />
        <el-table-column prop="sort" label="排序" width="80" align="center" />
        <el-table-column prop="leader" label="负责人" width="120" align="center" />
        <el-table-column prop="phone" label="联系电话" width="130" align="center" />
        <el-table-column prop="email" label="邮箱" min-width="180" show-overflow-tooltip />
        <el-table-column prop="status" label="状态" width="90" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
              {{ row.status === 1 ? '正常' : '停用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="250" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" link size="small" @click="handleAdd(row)">新增</el-button>
            <el-button type="primary" link size="small" @click="handleEdit(row)">编辑</el-button>
            <el-button type="danger" link size="small" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Card>

    <!-- 新增/编辑对话框 -->
    <DeptForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      :tree-data="deptTreeData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'DeptManagement' })
import { ref, onMounted } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import DeptForm from './DeptForm.vue'

const loading = ref(false)
const deptList = ref<any[]>([])
const deptTreeData = ref<any[]>([])

const dialogVisible = ref(false)
const dialogTitle = ref('新增部门')
const formData = ref<any>({
  id: undefined as number | undefined,
  parentId: 0,
  name: '',
  sort: 0,
  leader: '',
  phone: '',
  email: '',
  status: 1,
})

async function getDeptTree() {
  loading.value = true
  try {
    const res = await request.get('/api/dept/tree')
    deptTreeData.value = res.data
    deptList.value = res.data
  } catch (error) {
    console.error('获取部门数据失败:', error)
  } finally {
    loading.value = false
  }
}

function handleAdd(parentRow: any | null) {
  dialogTitle.value = '新增部门'
  formData.value = {
    id: undefined,
    parentId: parentRow ? parentRow.id : 0,
    name: '',
    sort: 0,
    leader: '',
    phone: '',
    email: '',
    status: 1,
  }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑部门'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleSubmit(data: any) {
  if (data.id) {
    ElMessage.success('更新成功')
  } else {
    ElMessage.success('创建成功')
  }
  getDeptTree()
}

function handleDelete(row: any) {
  if (row.children?.length) {
    ElMessage.warning('存在子部门，无法删除')
    return
  }
  
  ElMessageBox.confirm(`确定要删除部门 "${row.name}" 吗？`, '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await request.delete('/api/dept/delete', { params: { id: row.id } })
      ElMessage.success('删除成功')
      getDeptTree()
    } catch (error) {
      console.error('删除失败:', error)
    }
  }).catch(() => {})
}

onMounted(() => {
  getDeptTree()
})
</script>

<style scoped lang="scss">
.dept-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>