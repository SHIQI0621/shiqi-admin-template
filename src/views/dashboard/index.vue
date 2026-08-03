<template>
  <div class="dashboard-container">
    <!-- 统计卡片 -->
    <el-row :gutter="16" class="stat-cards">
      <el-col :xs="24" :sm="12" :md="6" v-for="(stat, index) in statsData" :key="index">
        <Card shadow="hover" :border-radius="16" class="stat-card" :style="{ '--accent-color': stat.color }">
          <div class="stat-content">
            <div class="stat-info">
              <h3>{{ formatNumber(stat.value) }}</h3>
              <p>{{ stat.label }}</p>
              <span class="trend" :class="stat.trend > 0 ? 'up' : 'down'">
                {{ stat.trend > 0 ? '+' : '' }}{{ stat.trend }}%
                <el-icon>
                  <Top v-if="stat.trend > 0" />
                  <Bottom v-else />
                </el-icon>
              </span>
            </div>
            <div class="stat-icon" :style="{ backgroundColor: stat.color + '20' }">
              <el-icon :size="32" :color="stat.color">
                <component :is="stat.icon" />
              </el-icon>
            </div>
          </div>
        </Card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top: 16px;">
      <!-- 访问趋势图 -->
      <el-col :xs="24" :lg="16">
        <Card shadow="hover" :border-radius="16" class="chart-card">
          <template #header>
            <div class="card-header">
              <span>访问趋势</span>
              <el-radio-group v-model="chartType" size="small">
                <el-radio-button value="pv">PV</el-radio-button>
                <el-radio-button value="uv">UV</el-radio-button>
              </el-radio-group>
            </div>
          </template>
          <div class="chart-wrapper">
            <div class="bar-chart">
              <div v-for="(item, index) in chartData" :key="index" class="bar-item">
                <div class="bar" :style="{
                  height: getBarHeight(item.value) + '%',
                  background: `linear-gradient(to top, ${getGradientColor(index)})`
                }"></div>
                <span class="label">{{ item.label }}</span>
              </div>
            </div>
          </div>
        </Card>
      </el-col>

      <!-- 快捷操作 -->
      <el-col :xs="24" :lg="8" style="margin-top: 16px;" class="hidden-lg-and-up">
        <Card shadow="hover" :border-radius="16" class="action-card">
          <template #header>
            <span>快捷操作</span>
          </template>
          <div class="quick-actions">
            <div v-for="action in quickActions" :key="action.title" class="action-item"
              @click="$router.push(action.path)">
              <div class="action-icon" :style="{ backgroundColor: action.color + '20' }">
                <el-icon :size="24" :color="action.color">
                  <component :is="action.icon" />
                </el-icon>
              </div>
              <span>{{ action.title }}</span>
            </div>
          </div>
        </Card>
      </el-col>

      <!-- 热门页面 -->
      <el-col :xs="24" :lg="8">
        <Card shadow="hover" :border-radius="16" class="page-card">
          <template #header>
            <span>热门页面 TOP5</span>
          </template>
          <div class="page-list">
            <div v-for="(page, index) in hotPages.slice(0, 5)" :key="page.path" class="page-item">
              <span class="rank" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
              <span class="title">{{ page.title }}</span>
              <div class="progress-bar">
                <div class="progress" :style="{ width: (page.pv / hotPages[0].pv * 100) + '%' }"></div>
              </div>
              <span class="count">{{ page.pv.toLocaleString() }}</span>
            </div>
          </div>
        </Card>
      </el-col>
    </el-row>

    <el-row :gutter="16" style="margin-top: 16px;">
      <!-- 最近日志 -->
      <el-col :xs="24" :lg="14">
        <Card shadow="hover" :border-radius="16" class="log-card">
          <template #header>
            <div class="card-header">
              <span>最近操作日志</span>
              <el-button type="primary" link size="small">查看更多</el-button>
            </div>
          </template>
          <el-table :data="recentLogs" size="small" style="width: 100%">
            <el-table-column prop="user" label="操作人" width="100" />
            <el-table-column prop="action" label="操作内容" />
            <el-table-column prop="module" label="模块" width="100" />
            <el-table-column prop="time" label="时间" width="120" />
            <el-table-column prop="status" label="状态" width="80">
              <template #default="{ row }">
                <el-tag :type="row.status === 'success' ? 'success' : 'danger'" size="small">
                  {{ row.status === 'success' ? '成功' : '失败' }}
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </Card>
      </el-col>

      <!-- 系统状态 -->
      <el-col :xs="24" :lg="10">
        <Card shadow="hover" :border-radius="16" class="system-card">
          <template #header>
            <span>系统状态</span>
          </template>
          <div class="system-status">
            <div class="status-item" v-for="item in systemStatus" :key="item.label">
              <div class="status-header">
                <span class="label">{{ item.label }}</span>
                <span class="value">{{ item.value }}%</span>
              </div>
              <el-progress :percentage="item.value" :color="getStatusColor(item.value)" :stroke-width="8" />
            </div>
          </div>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Dashboard' })
import { ref, onMounted } from 'vue'
import { Top, Bottom } from '@element-plus/icons-vue'
import request from '@/utils/request'

const statsData = ref([
  { label: '用户总数', value: 12580, trend: 12.5, icon: 'User', color: '#409EFF' },
  { label: '今日订单', value: 356, trend: 8.3, icon: 'ShoppingCart', color: '#67C23A' },
  { label: '今日访问', value: 45689, trend: -2.1, icon: 'View', color: '#E6A23C' },
  { label: '在线用户', value: 256, trend: 15.2, icon: 'Monitor', color: '#F56C6C' },
])

const chartType = ref<'pv' | 'uv'>('pv')

const chartData = ref<{ label: string; value: number }[]>([])

const quickActions = ref([
  { icon: 'User', title: '新建用户', path: '/system/user', color: '#409EFF' },
  { icon: 'UserFilled', title: '角色配置', path: '/system/role', color: '#67C23A' },
  { icon: 'Document', title: '生成报表', path: '', color: '#E6A23C' },
  { icon: 'Message', title: '发送通知', path: '', color: '#F56C6C' },
  { icon: 'Setting', title: '系统设置', path: '', color: '#909399' },
  { icon: 'Files', title: '文件管理', path: '', color: '#00CED1' },
])

const hotPages = ref([
  { path: '/dashboard', title: '首页', pv: 15689, uv: 4523 },
  { path: '/system/user', title: '用户管理', pv: 8932, uv: 2156 },
  { path: '/system/role', title: '角色管理', pv: 6543, uv: 1892 },
  { path: '/system/dept', title: '部门管理', pv: 5421, uv: 1654 },
  { path: '/system/dict', title: '字典管理', pv: 4235, uv: 1234 },
])

const recentLogs = ref([
  { user: '张三', action: '登录系统', module: '系统管理', time: '07-24 09:32:15', status: 'success' },
  { user: '李四', action: '新增用户王小明', module: '用户管理', time: '07-24 09:28:42', status: 'success' },
  { user: '王五', action: '修改角色权限', module: '角色管理', time: '07-24 09:15:33', status: 'fail' },
  { user: '赵六', action: '导出部门数据', module: '部门管理', time: '07-24 08:58:21', status: 'success' },
  { user: '钱七', action: '更新字典配置', module: '参数设置', time: '07-24 08:45:10', status: 'success' },
])

const systemStatus = ref([
  { label: 'CPU 使用率', value: 65.2 },
  { label: '内存使用率', value: 72.8 },
  { label: '磁盘使用率', value: 58.4 },
])

function formatNumber(num: number): string {
  if (num >= 10000) {
    return (num / 10000).toFixed(1) + 'w'
  }
  return num.toLocaleString()
}

function getBarHeight(value: number): number {
  const maxValue = Math.max(...chartData.value.map(item => item.value))
  return (value / maxValue) * 100
}

function getGradientColor(index: number): string {
  const colors = ['#667eea', '#764ba2']
  return colors[index % colors.length]
}

function getStatusColor(value: number): string {
  if (value >= 80) return '#F56C6C'
  if (value >= 60) return '#E6A23C'
  return '#67C23A'
}

onMounted(async () => {
  try {
    const res = await request.get('/api/dashboard/visit-trend')
    if (res.data) {
      chartData.value = res.data.dates.map((date: string, i: number) => ({
        label: date,
        value: chartType.value === 'pv' ? res.data.pvData[i] : res.data.uvData[i],
      }))
    }
  } catch (error) {
    console.error('加载图表数据失败:', error)
    for (let i = 29; i >= 0; i--) {
      const date = new Date()
      date.setDate(date.getDate() - i)
      chartData.value.push({
        label: date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
        value: Math.floor(Math.random() * 30000) + 30000,
      })
    }
  }
})
</script>

<style scoped lang="scss">
@use 'sass:map';
@use '@/styles/variables' as *;
@use '@/styles/mixins' as *;

.dashboard-container {
  .stat-cards {
    .stat-card {

      .stat-content {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .stat-info {
          h3 {
            font-size: 28px;
            font-weight: 600;
            @include theme-var(color, text-primary);
            margin-bottom: 4px;
          }

          p {
            font-size: 14px;
            @include theme-var(color, text-secondary);
            margin-bottom: 8px;
          }

          .trend {
            font-size: 13px;
            display: flex;
            align-items: center;
            gap: 4px;

            &.up {
              color: #67C23A;
            }

            &.down {
              color: #F56C6C;
            }
          }
        }

        .stat-icon {
          width: 64px;
          height: 64px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }

  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    >span {
      @include theme-var(color, text-primary);
    }
  }

  .chart-card {
    .chart-wrapper {
      height: 320px;

      .bar-chart {
        height: 100%;
        display: flex;
        align-items: flex-end;
        gap: 4px;

        .bar-item {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100%;
          justify-content: flex-end;

          .bar {
            width: 100%;
            min-height: 4px;
            border-radius: 4px;
            transition: height 0.3s;
          }

          .label {
            font-size: 11px;
            @include theme-var(color, text-secondary);
            margin-top: 8px;
            writing-mode: vertical-lr;
          }
        }
      }
    }
  }

  .action-card {
    .quick-actions {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;

      .action-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        cursor: pointer;
        padding: 12px;
        border-radius: 8px;
        transition: all 0.3s;

        &:hover {
          background-color: map.get($light-theme, fill-color-light);
          transform: translateY(-2px);
        }

        .action-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        span {
          font-size: 13px;
          @include theme-var(color, text-regular);
        }
      }
    }
  }

  .page-card {
    .page-list {
      .page-item {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 12px 0;
        border-bottom: 1px solid map.get($light-theme, border-color-lighter);

        &:last-child {
          border-bottom: none;
        }

        .rank {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background-color: map.get($light-theme, fill-color-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          @include theme-var(color, text-secondary);
          font-weight: 500;

          &.top-three {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
          }
        }

        .title {
          flex: 1;
          font-size: 14px;
          @include theme-var(color, text-primary);
        }

        .progress-bar {
          width: 80px;
          height: 4px;
          background-color: map.get($light-theme, fill-color-light);
          border-radius: 2px;
          overflow: hidden;

          .progress {
            height: 100%;
            background: linear-gradient(90deg, #667eea, #764ba2);
            border-radius: 2px;
            transition: width 0.3s;
          }
        }

        .count {
          font-size: 13px;
          @include theme-var(color, text-secondary);
          min-width: 60px;
          text-align: right;
        }
      }
    }
  }

  .log-card {
    :deep(.el-table) {
      th {
        background-color: map.get($light-theme, table-header-bg) !important;
      }
    }
  }

  .system-card {
    .system-status {
      .status-item {
        margin-bottom: 20px;

        &:last-child {
          margin-bottom: 0;
        }

        .status-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;

          .label {
            font-size: 14px;
            @include theme-var(color, text-regular);
          }

          .value {
            font-size: 14px;
            font-weight: 500;
            @include theme-var(color, text-primary);
          }
        }
      }
    }
  }
}

@media screen and (max-width: 992px) {
  .stat-cards .el-col {
    margin-bottom: 16px;
  }
}
</style>
