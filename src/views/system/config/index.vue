<template>
  <div class="config-management">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>参数设置</span>
          <el-button type="primary" @click="handleAdd">新增参数</el-button>
        </div>
      </template>
      
      <el-form :inline="true" class="search-form">
        <el-form-item label="参数名称">
          <el-input v-model="queryParams.configName" placeholder="请输入参数名称" clearable />
        </el-form-item>
        <el-form-item label="参数键名">
          <el-input v-model="queryParams.configKey" placeholder="请输入参数键名" clearable />
        </el-form-item>
        <el-form-item label="系统内置">
          <el-select v-model="queryParams.configType" placeholder="全部" clearable style="width: 120px">
            <el-option label="是" value="Y" />
            <el-option label="否" value="N" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">搜索</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
      
      <el-table :data="tableData" border stripe v-loading="loading">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="configId" label="参数编号" width="100" />
        <el-table-column prop="configName" label="参数名称" width="150" />
        <el-table-column prop="configKey" label="参数键名" width="150" />
        <el-table-column prop="configValue" label="参数键值" show-overflow-tooltip />
        <el-table-column prop="configType" label="系统内置" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.configType === 'Y' ? 'danger' : 'success'">
              {{ row.configType === 'Y' ? '是' : '否' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注" show-overflow-tooltip />
        <el-table-column prop="createTime" label="创建时间" width="170" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="danger" @click="handleDelete(row)" :disabled="row.configType === 'Y'">删除</el-button>
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
    
    <ConfigForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      @submit="handleSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'ConfigManagement' })
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import ConfigForm from './ConfigForm.vue'

interface ConfigItem {
  configId: number
  configName: string
  configKey: string
  configValue: string
  configType: string
  remark: string
  createTime: string
}

const mockData: ConfigItem[] = [
  { configId: 1, configName: '主框架页-默认皮肤样式名称', configKey: 'sys.index.skinName', configValue: 'skin-blue', configType: 'Y', remark: '蓝色 skin-blue / 绿色 skin-green / 紫色 skin-purple / 红色 skin-red / 黄色 skin-yellow', createTime: '2024-01-01 10:00:00' },
  { configId: 2, configName: '用户管理-账号初始密码', configKey: 'sys.user.initPassword', configValue: '123456', configType: 'Y', remark: '初始化密码 123456', createTime: '2024-01-02 10:00:00' },
  { configId: 3, configName: '主框架页-是否开启页脚', configKey: 'sys.index.footer', configValue: 'true', configType: 'Y', remark: '是否开启底部页脚', createTime: '2024-01-03 10:00:00' },
  { configId: 4, configName: '账号自助-验证码开关', configKey: 'sys.account.captchaEnabled', configValue: 'true', configType: 'Y', remark: '是否开启验证码功能 true(是) false(否)', createTime: '2024-01-04 10:00:00' },
  { configId: 5, configName: '账号自助-是否开启用户注册功能', configKey: 'sys.account.registerUser', configValue: 'false', configType: 'N', remark: '是否开启注册用户功能 true(是) false(否)', createTime: '2024-01-05 10:00:00' },
]

const loading = ref(false)
const tableData = ref<ConfigItem[]>(mockData)
const total = ref(mockData.length)
const queryParams = reactive({
  pageNum: 1,
  pageSize: 10,
  configName: '',
  configKey: '',
  configType: ''
})

const dialogVisible = ref(false)
const dialogTitle = ref('新增参数')
const formData = ref<Partial<ConfigItem>>({
  configName: '',
  configKey: '',
  configValue: '',
  configType: 'N',
  remark: ''
})

function handleQuery() {
  loading.value = true
  setTimeout(() => {
    tableData.value = mockData.filter(item => {
      return (!queryParams.configName || item.configName.includes(queryParams.configName)) &&
             (!queryParams.configKey || item.configKey.includes(queryParams.configKey)) &&
             (!queryParams.configType || item.configType === queryParams.configType)
    })
    total.value = tableData.value.length
    loading.value = false
  }, 300)
}

function resetQuery() {
  queryParams.configName = ''
  queryParams.configKey = ''
  queryParams.configType = ''
  handleQuery()
}

function handleAdd() {
  dialogTitle.value = '新增参数'
  formData.value = { configName: '', configKey: '', configValue: '', configType: 'N', remark: '' }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑参数'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleDelete(row: any) {
  if (row.configType === 'Y') {
    ElMessage.warning('系统内置参数不能删除')
    return
  }
  ElMessageBox.confirm(`确认删除参数 "${row.configName}"?`, '警告', { type: 'warning' })
    .then(() => ElMessage.success('删除成功'))
    .catch(() => {})
}

function handleSubmit(_data: any) {
  handleQuery()
}
</script>

<style scoped lang="scss">
.config-management {
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