<template>
  <div class="druid-monitor">
    <el-row :gutter="16">
      <el-col :span="24">
        <Card class="mb-16" :border-radius="16">
          <template #header>
            <span>基本信息</span>
          </template>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="Java版本">{{ info.javaVersion }}</el-descriptions-item>
            <el-descriptions-item label="JDK版本">{{ info.jdkVersion }}</el-descriptions-item>
            <el-descriptions-item label="驱动版本">{{ info.driverVersion }}</el-descriptions-item>
            <el-descriptions-item label="操作系统">{{ info.osName }}</el-descriptions-item>
            <el-descriptions-item label="启动时间">{{ info.startTime }}</el-descriptions-item>
            <el-descriptions-item label="运行时长">{{ info.runTime }}</el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>
      
      <el-col :span="8">
        <Card class="stat-card" :border-radius="16">
          <template #header><span>连接池统计</span></template>
          <div class="stat-content">
            <div class="stat-item">
              <span class="label">活跃连接数</span>
              <span class="value active">{{ dataSource.activeCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">空闲连接数</span>
              <span class="value success">{{ dataSource.poolingCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">总连接数</span>
              <span class="value primary">{{ dataSource.activeCount + dataSource.poolingCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">等待获取连接数</span>
              <span class="value warning">{{ dataSource.waitThreadCount }}</span>
            </div>
          </div>
        </Card>
      </el-col>
      
      <el-col :span="8">
        <Card class="stat-card" :border-radius="16">
          <template #header><span>SQL统计</span></template>
          <div class="stat-content">
            <div class="stat-item">
              <span class="label">执行次数</span>
              <span class="value">{{ sqlStat.executeCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">错误次数</span>
              <span class="value danger">{{ sqlStat.errorCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">总耗时(ms)</span>
              <span class="value">{{ sqlStat.totalTime }}</span>
            </div>
            <div class="stat-item">
              <span class="label">最大耗时(ms)</span>
              <span class="value warning">{{ sqlStat.maxTime }}</span>
            </div>
          </div>
        </Card>
      </el-col>
      
      <el-col :span="8">
        <Card class="stat-card" :border-radius="16">
          <template #header><span>Spring监控</span></template>
          <div class="stat-content">
            <div class="stat-item">
              <span class="label">映射数量</span>
              <span class="value">{{ springStat.mappingCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">URI数量</span>
              <span class="value">{{ springStat.uriCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">请求次数</span>
              <span class="value primary">{{ springStat.requestCount }}</span>
            </div>
            <div class="stat-item">
              <span class="label">并发数</span>
              <span class="value success">{{ springStat.concurrent }}</span>
            </div>
          </div>
        </Card>
      </el-col>
      
      <el-col :span="24" class="mt-16">
        <Card :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>SQL监控</span>
              <el-switch v-model="showSqlTable" active-text="显示SQL" inactive-text="隐藏SQL" />
            </div>
          </template>
          
          <el-table :data="sqlList" border stripe>
            <el-table-column prop="id" label="#" width="60" align="center" />
            <el-table-column prop="sql" label="SQL语句" min-width="300" show-overflow-tooltip v-if="showSqlTable" />
            <el-table-column prop="executeCount" label="执行次数" width="100" align="center" sortable />
            <el-table-column prop="timeMillis" label="执行时间(ms)" width="130" align="center" sortable />
            <el-table-column prop="maxTimespan" label="最大耗时(ms)" width="130" align="center" sortable />
            <el-table-column prop="errorCount" label="错误次数" width="90" align="center" sortable />
            <el-table-column prop="lastTime" label="最后执行时间" width="170" />
          </el-table>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'DruidMonitor' })
import { ref, reactive } from 'vue'

const info = reactive({
  javaVersion: '17.0.9',
  jdkVersion: '17.0.9+11-LTS',
  driverVersion: 'mysql-connector-j-8.0.33',
  osName: 'Windows 10 / Linux',
  startTime: '2024-07-15 08:00:00',
  runTime: '2天5小时32分'
})

const dataSource = reactive({
  activeCount: 5,
  poolingCount: 15,
  waitThreadCount: 0,
  initialSize: 10,
  maxActive: 20
})

const sqlStat = reactive({
  executeCount: 15823,
  errorCount: 12,
  totalTime: 456789,
  maxTime: 2356
})

const springStat = reactive({
  mappingCount: 48,
  uriCount: 52,
  requestCount: 89234,
  concurrent: 23
})

const showSqlTable = ref(true)
const sqlList = ref([
  { id: 1, sql: 'SELECT * FROM sys_user WHERE user_id = ?', executeCount: 1523, timeMillis: 1234, maxTimespan: 156, errorCount: 0, lastTime: '2024-07-15 10:59:59' },
  { id: 2, sql: 'SELECT * FROM sys_role WHERE role_id IN (?)', executeCount: 987, timeMillis: 567, maxTimespan: 89, errorCount: 0, lastTime: '2024-07-15 10:59:58' },
  { id: 3, sql: 'SELECT * FROM sys_menu WHERE parent_id = 0 ORDER BY order_num', executeCount: 654, timeMillis: 234, maxTimespan: 67, errorCount: 0, lastTime: '2024-07-15 10:59:57' },
  { id: 4, sql: 'INSERT INTO sys_oper_log (...) VALUES (...)', executeCount: 3421, timeMillis: 1890, maxTimespan: 567, errorCount: 3, lastTime: '2024-07-15 10:59:55' },
  { id: 5, sql: 'UPDATE sys_user SET login_date = ?, login_ip = ? WHERE user_id = ?', executeCount: 2156, timeMillis: 876, maxTimespan: 234, errorCount: 1, lastTime: '2024-07-15 10:59:54' },
  { id: 6, sql: 'DELETE FROM sys_dict_data WHERE dict_type = ? AND dict_value = ?', executeCount: 123, timeMillis: 145, maxTimespan: 89, errorCount: 0, lastTime: '2024-07-15 10:58:00' },
])
</script>

<style scoped lang="scss">
.druid-monitor {
  .mb-16 { margin-bottom: 16px; }
  .mt-16 { margin-top: 16px; }
  
  .stat-card {
    .stat-content {
      padding: 10px 0;
      
      .stat-item {
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        border-bottom: 1px solid #f0f0f0;
        
        &:last-child { border-bottom: none; }
        
        .label { color: #666; font-size: 14px; }
        .value { 
          font-size: 18px; 
          font-weight: 600;
          &.active { color: #409eff; }
          &.success { color: #67c23a; }
          &.primary { color: #409eff; }
          &.warning { color: #e6a23c; }
          &.danger { color: #f56c6c; }
        }
      }
    }
  }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>