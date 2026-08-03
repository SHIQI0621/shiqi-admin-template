<template>
  <div class="online-user-management">
    <el-row :gutter="16" class="stat-cards">
      <el-col :xs="12" :sm="6" v-for="(stat, index) in statsData" :key="index">
        <Card shadow="hover" class="stat-card" :border-radius="16">
          <div class="stat-content">
            <div class="stat-info">
              <h3>{{ stat.value }}</h3>
              <p>{{ stat.label }}</p>
            </div>
            <div class="stat-icon" :style="{ backgroundColor: stat.color + '15' }">
              <el-icon :size="28" :color="stat.color">
                <component :is="stat.icon" />
              </el-icon>
            </div>
          </div>
        </Card>
      </el-col>
    </el-row>

    <Card shadow="never" class="search-card" style="margin-top: 16px;" :border-radius="16">
      <el-form :model="queryParams" inline>
        <el-form-item label="用户名">
          <el-input
            v-model="queryParams.username"
            placeholder="用户名"
            clearable
            style="width: 200px"
            @keyup.enter="handleQuery"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :icon="Search" @click="handleQuery">搜索</el-button>
          <el-button :icon="Refresh" @click="resetQuery">重置</el-button>
          <el-button 
            type="danger" 
            :icon="SwitchButton" 
            :disabled="!selectedIds.length"
            @click="handleBatchForceLogout"
          >
            批量强制下线
          </el-button>
        </el-form-item>
      </el-form>
    </Card>

    <Card shadow="never" class="table-card" :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>在线用户列表</span>
          <el-tag type="success" effect="dark" round>在线 {{ onlineCount }} 人</el-tag>
        </div>
      </template>

      <el-table
        v-loading="loading"
        :data="userList"
        @selection-change="handleSelectionChange"
        border
        stripe
      >
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column prop="username" label="用户名" min-width="100" />
        <el-table-column prop="nickname" label="昵称" min-width="100" />
        <el-table-column prop="ip" label="IP" width="140" align="center" />
        <el-table-column prop="location" label="登录地点" min-width="150" show-overflow-tooltip />
        <el-table-column prop="browser" label="浏览器" width="100" align="center" />
        <el-table-column prop="os" label="操作系统" width="120" align="center" />
        <el-table-column prop="loginTime" label="登录时间" width="170" align="center" />
        <el-table-column prop="lastAccessTime" label="最后访问时间" width="170" align="center" />
        <el-table-column label="操作" width="100" align="center" fixed="right">
          <template #default="{ row }">
            <el-button type="danger" link size="small" @click="handleForceLogout(row)">
              强制下线
            </el-button>
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
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'OnlineUser' })
import { ref, reactive, onMounted } from 'vue'
import { Search, Refresh, SwitchButton } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import request from '@/utils/request'

const statsData = ref([
  { label: '当前在线', value: '-', icon: 'User', color: '#409EFF' },
  { label: '今日登录', value: '-', icon: 'Clock', color: '#67C23A' },
  { label: '历史峰值', value: '-', icon: 'TrendCharts', color: '#E6A23C' },
  { label: '平均时长', value: '-', icon: 'Timer', color: '#F56C6C' },
])

const queryParams = reactive({
  page: 1,
  pageSize: 10,
  username: '',
})

const loading = ref(false)
const userList = ref<any[]>([])
const total = ref(0)
const onlineCount = ref(0)
const selectedIds = ref<string[]>([])

async function getStats() {
  try {
    const res = await request.get('/api/online/stats')
    const data = res.data
    statsData.value[0].value = data.totalOnline.toString()
    statsData.value[1].value = data.todayLogin.toString()
    statsData.value[2].value = data.peakOnline.toString()
    statsData.value[3].value = data.avgOnlineTime
  } catch (error) {
    console.error('获取统计数据失败:', error)
  }
}

async function getList() {
  loading.value = true
  try {
    const res = await request.get('/api/online/list', { params: queryParams })
    userList.value = res.data.list
    total.value = res.data.total
    onlineCount.value = res.data.onlineCount || 0
  } catch (error) {
    console.error('获取在线用户列表失败:', error)
  } finally {
    loading.value = false
  }
}

function handleQuery() {
  queryParams.page = 1
  getList()
}

function resetQuery() {
  queryParams.username = ''
  handleQuery()
}

function handleSelectionChange(rows: any[]) {
  selectedIds.value = rows.map((row) => row.sessionId)
}

function handleForceLogout(row: any) {
  ElMessageBox.confirm(
    `确定要强制用户 "${row.nickname}" 下线吗？`,
    '警告',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await request.post('/api/online/force-logout', { sessionId: row.sessionId })
      ElMessage.success('已强制下线')
      getList()
      getStats()
    } catch (error) {
      console.error('强制下线失败:', error)
    }
  }).catch(() => {})
}

function handleBatchForceLogout() {
  ElMessageBox.confirm(
    `确定要强制选中的 ${selectedIds.value.length} 个用户下线吗？`,
    '批量强退确认',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(async () => {
    try {
      await request.post('/api/online/batch-force-logout', { sessionIds: selectedIds.value })
      ElMessage.success(`已强制${selectedIds.value.length}个用户下线`)
      getList()
      getStats()
    } catch (error) {
      console.error('批量强退失败:', error)
    }
  }).catch(() => {})
}

onMounted(() => {
  getList()
  getStats()
})
</script>

<style scoped lang="scss">
.online-user-management {
  .stat-cards {
    .stat-card {
      .stat-content {
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .stat-info {
          h3 {
            font-size: 24px;
            font-weight: 600;
            color: #303133;
            margin-bottom: 4px;
          }
          
          p {
            font-size: 13px;
            color: #909399;
          }
        }
        
        .stat-icon {
          width: 56px;
          height: 56px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .search-card {
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