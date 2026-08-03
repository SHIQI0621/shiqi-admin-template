<template>
  <div class="dict-management">
    <!-- 左侧字典类型列表 -->
    <el-row :gutter="16">
      <el-col :xs="24" :sm="8" :md="6">
        <Card shadow="never" class="type-card" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>字典类型</span>
              <el-button type="primary" link size="small" @click="handleAddType">新增</el-button>
            </div>
          </template>
          
          <el-input
            v-model="typeSearch"
            placeholder="搜索字典类型"
            clearable
            style="margin-bottom: 12px"
          />
          
          <div class="type-list">
            <div
              v-for="item in filteredTypeList"
              :key="item.id"
              class="type-item"
              :class="{ active: currentTypeId === item.id }"
              @click="handleSelectType(item)"
            >
              <div class="type-info">
                <span class="name">{{ item.name }}</span>
                <span class="code">{{ item.type }}</span>
              </div>
              <el-dropdown trigger="click" @command="(cmd: string) => handleTypeCommand(cmd, item)">
                <el-icon class="more-btn"><MoreFilled /></el-icon>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="edit">编辑</el-dropdown-item>
                    <el-dropdown-item command="delete">删除</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </div>
            
            <el-empty v-if="!filteredTypeList.length" description="暂无数据" :image-size="80" />
          </div>
        </Card>
      </el-col>

      <!-- 右侧字典数据 -->
      <el-col :xs="24" :sm="16" :md="18">
        <Card shadow="never" class="data-card" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>{{ currentTypeName ? `${currentTypeName} - 字典数据` : '请选择字典类型' }}</span>
              <el-button 
                type="primary" 
                size="small" 
                :disabled="!currentTypeId"
                @click="handleAddData"
              >
                新增数据
              </el-button>
            </div>
          </template>

          <el-table 
            v-loading="dataLoading" 
            :data="currentDataList" 
            border 
            stripe
            v-if="currentTypeId"
          >
            <el-table-column prop="label" label="标签" min-width="120" />
            <el-table-column prop="value" label="值" min-width="100" />
            <el-table-column prop="sort" label="排序" width="80" align="center" />
            <el-table-column prop="status" label="状态" width="90" align="center">
              <template #default="{ row }">
                <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
                  {{ row.status === 1 ? '启用' : '停用' }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="color" label="颜色" width="100" align="center">
              <template #default="{ row }">
                <div class="color-block" :style="{ backgroundColor: row.color }"></div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" align="center">
              <template #default="{ row }">
                <el-button type="primary" link size="small" @click="handleEditData(row)">编辑</el-button>
                <el-button type="danger" link size="small" @click="handleDeleteData(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-empty v-else description="请先选择左侧的字典类型" :image-size="120" />
        </Card>
      </el-col>
    </el-row>

    <!-- 字典类型对话框 -->
    <DictTypeForm
      v-model="typeDialogVisible"
      :title="typeDialogTitle"
      :form-data="typeFormData"
      @submit="handleSubmitType"
    />

    <!-- 字典数据对话框 -->
    <DictDataForm
      v-model="dataDialogVisible"
      :title="dataDialogTitle"
      :form-data="dataFormData"
      @submit="handleSubmitData"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'DictManagement' })
import { ref, computed, onMounted } from 'vue'
import { MoreFilled } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'
import DictTypeForm from './DictTypeForm.vue'
import DictDataForm from './DictDataForm.vue'

// 字典类型相关
const typeSearch = ref('')
const typeList = ref<any[]>([])
const currentTypeId = ref<number | null>(null)
const currentTypeName = ref('')

const filteredTypeList = computed(() => {
  if (!typeSearch.value) return typeList.value
  return typeList.value.filter(
    (item) => item.name.includes(typeSearch.value) || item.type.includes(typeSearch.value)
  )
})

// 字典数据相关
const dataLoading = ref(false)
const currentDataList = ref<any[]>([])

// 对话框相关
const typeDialogVisible = ref(false)
const typeDialogTitle = ref('新增字典类型')
const typeFormData = ref<any>({
  id: undefined as number | undefined,
  name: '',
  type: '',
  status: 1,
  remark: '',
})

const dataDialogVisible = ref(false)
const dataDialogTitle = ref('新增字典数据')
const dataFormData = ref<any>({
  id: undefined as number | undefined,
  type: '',
  label: '',
  value: '',
  sort: 0,
  status: 1,
  color: '#409EFF',
})

// 获取字典类型列表
async function getTypeList() {
  try {
    const res = await request.get('/api/dict/type/list', { params: { page: 1, pageSize: 100 } })
    typeList.value = res?.data?.list || []
  } catch (error) {
    console.error('获取字典类型失败:', error)
  }
}

// 选择字典类型
function handleSelectType(item: any) {
  currentTypeId.value = item.id
  currentTypeName.value = item.name
  getDataList(item.type)
}

// 获取字典数据
async function getDataList(type: string) {
  dataLoading.value = true
  try {
    const res = await request.get('/api/dict/data/get', { params: { type } })
    currentDataList.value = res.data || []
  } catch (error) {
    console.error('获取字典数据失败:', error)
  } finally {
    dataLoading.value = false
  }
}

// 字典类型操作
function handleAddType() {
  typeDialogTitle.value = '新增字典类型'
  typeFormData.value = { id: undefined, name: '', type: '', status: 1, remark: '' }
  typeDialogVisible.value = true
}

function handleTypeCommand(command: string, item: any) {
  if (command === 'edit') {
    typeDialogTitle.value = '编辑字典类型'
    typeFormData.value = { ...item }
    typeDialogVisible.value = true
  } else if (command === 'delete') {
    ElMessageBox.confirm(`确定要删除字典类型 "${item.name}" 吗？`, '警告', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      try {
        await request.delete('/api/dict/type/delete', { params: { id: item.id } })
        ElMessage.success('删除成功')
        getTypeList()
        if (currentTypeId.value === item.id) {
          currentTypeId.value = null
          currentTypeName.value = ''
          currentDataList.value = []
        }
      } catch (error) {
        console.error('删除失败:', error)
      }
    }).catch(() => {})
  }
}

function handleSubmitType(data: any) {
  if (data.id) {
    request.put('/api/dict/type/update', { id: data.id, ...data })
    ElMessage.success('更新成功')
  } else {
    request.post('/api/dict/type/create', data)
    ElMessage.success('创建成功')
  }
  getTypeList()
}

// 字典数据操作
function handleAddData() {
  dataDialogTitle.value = '新增字典数据'
  dataFormData.value = {
    id: undefined,
    type: typeList.value.find((t: any) => t.id === currentTypeId.value)?.type || '',
    label: '',
    value: '',
    sort: 0,
    status: 1,
    color: '#409EFF',
  }
  dataDialogVisible.value = true
}

function handleEditData(row: any) {
  dataDialogTitle.value = '编辑字典数据'
  dataFormData.value = { ...row }
  dataDialogVisible.value = true
}

function handleSubmitData(data: any) {
  if (data.id) {
    request.put('/api/dict/data/update', { id: data.id, ...data })
    ElMessage.success('更新成功')
  } else {
    request.post('/api/dict/data/create', data)
    ElMessage.success('创建成功')
  }
  if (currentTypeId.value) {
    const type = typeList.value.find((t: any) => t.id === currentTypeId.value)?.type
    if (type) getDataList(type)
  }
}

function handleDeleteData(row: any) {
  ElMessageBox.confirm('确定要删除该条字典数据吗？', '警告', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(async () => {
    try {
      await request.delete('/api/dict/data/delete', { params: { id: row.id } })
      ElMessage.success('删除成功')
      const type = typeList.value.find((t: any) => t.id === currentTypeId.value)?.type
      if (type) getDataList(type)
    } catch (error) {
      console.error('删除失败:', error)
    }
  }).catch(() => {})
}

onMounted(() => {
  getTypeList()
})
</script>

<style scoped lang="scss">
.dict-management {
  .type-card {
    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .type-list {
      max-height: calc(100vh - 250px);
      overflow-y: auto;

      .type-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 12px;
        border-radius: 6px;
        cursor: pointer;
        transition: all 0.2s;
        margin-bottom: 4px;

        &:hover {
          background-color: #f5f7fa;
        }

        &.active {
          background-color: rgba(64, 158, 255, 0.1);
          color: var(--el-color-primary);
        }

        .type-info {
          display: flex;
          flex-direction: column;
          gap: 4px;

          .name {
            font-size: 14px;
            font-weight: 500;
          }

          .code {
            font-size: 12px;
            color: #909399;
          }
        }

        .more-btn {
          opacity: 0;
          transition: opacity 0.2s;
          cursor: pointer;
        }

        &:hover .more-btn {
          opacity: 1;
        }
      }
    }
  }

  .data-card {
    min-height: 400px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .color-block {
      width: 40px;
      height: 20px;
      border-radius: 4px;
      margin: 0 auto;
      border: 1px solid #dcdfe6;
    }
  }
}
</style>