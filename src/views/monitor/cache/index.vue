<template>
  <div class="cache-monitor">
    <el-row :gutter="16">
      <el-col :span="24">
        <Card class="mb-16" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>缓存监控</span>
              <el-button type="danger" size="small" @click="handleClearAll">清空全部缓存</el-button>
            </div>
          </template>
          
          <el-row :gutter="20">
            <el-col :span="6" v-for="item in cacheStats" :key="item.name">
              <div class="cache-stat-item">
                <div class="stat-icon" :style="{ background: item.color }">
                  <el-icon :size="28"><component :is="item.icon" /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ item.value }}</div>
                  <div class="stat-label">{{ item.name }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </Card>
      </el-col>
      
      <el-col :span="24">
        <Card :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>缓存列表</span>
              <el-input 
                v-model="cacheName" 
                placeholder="搜索缓存名称" 
                clearable 
                style="width: 200px"
                @input="handleSearch"
              >
                <template #prefix>
                  <el-icon><Search /></el-icon>
                </template>
              </el-input>
            </div>
          </template>
          
          <el-table :data="filteredCacheList" border stripe>
            <el-table-column prop="name" label="缓存名称" min-width="200" show-overflow-tooltip />
            <el-table-column prop="keys" label="键数量" width="100" align="center" sortable />
            <el-table-column prop="size" label="内存占用" width="120" align="center" sortable />
            <el-table-column prop="hits" label="命中数" width="100" align="center" sortable />
            <el-table-column prop="misses" label="未命中数" width="110" align="center" sortable />
            <el-table-column prop="hitRate" label="命中率" width="100" align="center" sortable>
              <template #default="{ row }">
                <el-progress 
                  :percentage="row.hitRate" 
                  :stroke-width="10"
                  :text-inside="true"
                  :color="row.hitRate > 80 ? '#67c23a' : row.hitRate > 50 ? '#e6a23c' : '#f56c6c'"
                />
              </template>
            </el-table-column>
            <el-table-column prop="expireTime" label="过期时间" width="170" />
            <el-table-column label="操作" width="180" fixed="right">
              <template #default="{ row }">
                <el-button link type="primary" @click="handleViewKeys(row)">查看键名</el-button>
                <el-button link type="danger" @click="handleClearCache(row)">清空</el-button>
              </template>
            </el-table-column>
          </el-table>
        </Card>
      </el-col>
    </el-row>
    
    <Dialog v-model="keyDialogVisible" title="缓存键名列表" width="700px">
      <el-table :data="currentKeys" border stripe max-height="400">
        <el-table-column prop="key" label="键名" min-width="250" show-overflow-tooltip />
        <el-table-column prop="type" label="类型" width="100" align="center" />
        <el-table-column prop="ttl" label="剩余过期时间" width="140" align="center" />
        <el-table-column prop="size" label="大小" width="100" align="center" />
      </el-table>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'CacheMonitor' })
import { ref, computed } from 'vue'
import Dialog from '@/components/Dialog/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search } from '@element-plus/icons-vue'

interface CacheItem {
  name: string
  keys: number
  size: string
  hits: number
  misses: number
  hitRate: number
  expireTime: string
  keyList?: CacheKey[]
}

interface CacheKey {
  key: string
  type: string
  ttl: string
  size: string
}

const cacheStats = [
  { name: '缓存总数', value: 12, icon: 'Coin', color: '#409eff' },
  { name: '总键数量', value: 2856, icon: 'Document', color: '#67c23a' },
  { name: '总内存占用', value: '128 MB', icon: 'DataAnalysis', color: '#e6a23c' },
  { name: '平均命中率', value: '92.5%', icon: 'Timer', color: '#f56c6c' }
]

const cacheList = ref<CacheItem[]>([
  { 
    name: 'login_tokens:', 
    keys: 156, 
    size: '25.6 MB', 
    hits: 12580, 
    misses: 320, 
    hitRate: 97.5, 
    expireTime: '30分钟',
    keyList: [
      { key: 'login_tokens:user_001', type: 'String', ttl: '29m 30s', size: '256 B' },
      { key: 'login_tokens:user_002', type: 'String', ttl: '28m 15s', size: '256 B' },
      { key: 'login_tokens:user_003', type: 'String', ttl: '25m 42s', size: '256 B' },
    ]
  },
  { 
    name: 'sys_config:', 
    keys: 45, 
    size: '12.3 MB', 
    hits: 8920, 
    misses: 450, 
    hitRate: 95.2, 
    expireTime: '不过期',
    keyList: [
      { key: 'sys_config:skin_name', type: 'String', ttl: '永不过期', size: '64 B' },
      { key: 'sys_config:init_password', type: 'String', ttl: '永不过期', size: '64 B' },
    ]
  },
  { 
    name: 'sys_dict:', 
    keys: 230, 
    size: '35.8 MB', 
    hits: 15670, 
    misses: 890, 
    hitRate: 94.6, 
    expireTime: '1小时',
    keyList: [
      { key: 'sys_dict:sys_normal_disable', type: 'Hash', ttl: '58m 20s', size: '1.2 KB' },
      { key: 'sys_dict:sys_yes_no', type: 'Hash', ttl: '45m 10s', size: '896 B' },
    ]
  },
  { 
    name: 'captcha_codes:', 
    keys: 89, 
    size: '8.5 MB', 
    hits: 5200, 
    misses: 2100, 
    hitRate: 71.2, 
    expireTime: '2分钟',
    keyList: [
      { key: 'captcha_codes:session_abc123', type: 'String', ttl: '1m 45s', size: '128 B' },
    ]
  },
  { 
    name: 'user_info:', 
    keys: 340, 
    size: '22.4 MB', 
    hits: 23450, 
    misses: 670, 
    hitRate: 97.2, 
    expireTime: '30分钟',
    keyList: [
      { key: 'user_info:1001', type: 'Hash', ttl: '29m 10s', size: '512 B' },
      { key: 'user_info:1002', type: 'Hash', ttl: '28m 55s', size: '498 B' },
    ]
  },
  { 
    name: 'role_perms:', 
    keys: 68, 
    size: '15.2 MB', 
    hits: 9870, 
    misses: 340, 
    hitRate: 96.7, 
    expireTime: '1小时',
    keyList: [
      { key: 'role_perms:admin', type: 'Set', ttl: '55m 30s', size: '2.1 KB' },
      { key: 'role_perms:test', type: 'Set', ttl: '42m 15s', size: '1.5 KB' },
    ]
  },
])

const cacheName = ref('')
const keyDialogVisible = ref(false)
const currentKeys = ref<CacheKey[]>([])

const filteredCacheList = computed(() => {
  if (!cacheName.value) return cacheList.value
  return cacheList.value.filter(item => 
    item.name.toLowerCase().includes(cacheName.value.toLowerCase())
  )
})

function handleSearch() {
}

function handleViewKeys(row: any) {
  currentKeys.value = row.keyList || []
  keyDialogVisible.value = true
}

function handleClearCache(row: any) {
  ElMessageBox.confirm(`确认清空缓存 "${row.name}"?`, '确认', { type: 'warning' })
    .then(() => ElMessage.success('清空成功'))
    .catch(() => {})
}

function handleClearAll() {
  ElMessageBox.confirm('确认清空所有缓存吗？此操作不可恢复！', '确认', { type: 'error' })
    .then(() => ElMessage.success('已清空全部缓存'))
    .catch(() => {})
}
</script>

<style scoped lang="scss">
.cache-monitor {
  .mb-16 { margin-bottom: 16px; }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .cache-stat-item {
    display: flex;
    align-items: center;
    padding: 20px;
    background: #f5f7fa;
    border-radius: 8px;
    
    .stat-icon {
      width: 60px;
      height: 60px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      margin-right: 16px;
      flex-shrink: 0;
    }
    
    .stat-info {
      .stat-value {
        font-size: 24px;
        font-weight: 600;
        color: #303133;
      }
      
      .stat-label {
        font-size: 14px;
        color: #909399;
        margin-top: 4px;
      }
    }
  }
}
</style>