<template>
  <div class="server-monitor">
    <el-row :gutter="16">
      <el-col :span="24">
        <Card class="mb-16" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>CPU使用率</span>
              <el-tag type="success">{{ cpuInfo.usage }}%</el-tag>
            </div>
          </template>
          <el-progress :percentage="cpuInfo.usage" :color="getProgressColor(cpuInfo.usage)" :stroke-width="20" />
          <el-descriptions :column="4" border class="mt-16">
            <el-descriptions-item label="核心数">{{ cpuInfo.cpuNum }} 核</el-descriptions-item>
            <el-descriptions-item label="用户使用率">{{ cpuInfo.userUsage }}%</el-descriptions-item>
            <el-descriptions-item label="系统使用率">{{ cpuInfo.systemUsage }}%</el-descriptions-item>
            <el-descriptions-item label="当前空闲率">{{ cpuInfo.freeUsage }}%</el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>
      
      <el-col :span="12">
        <Card class="mb-16" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>内存使用情况</span>
              <el-tag type="warning">{{ memoryInfo.usedPercent }}%</el-tag>
            </div>
          </template>
          <el-progress 
            type="dashboard" 
            :percentage="memoryInfo.usedPercent" 
            :width="160"
            :color="getProgressColor(memoryInfo.usedPercent)"
          >
            <template #default="{ percentage }">
              <span style="font-size: 18px;">{{ percentage }}%</span>
            </template>
          </el-progress>
          <el-descriptions :column="1" border class="mt-16">
            <el-descriptions-item label="总内存">{{ formatBytes(memoryInfo.total) }}</el-descriptions-item>
            <el-descriptions-item label="已用内存">{{ formatBytes(memoryInfo.used) }}</el-descriptions-item>
            <el-descriptions-item label="剩余内存">{{ formatBytes(memoryInfo.free) }}</el-descriptions-item>
            <el-descriptions-item label="JVM已用内存">{{ formatBytes(memoryInfo.jvmUsed) }}</el-descriptions-item>
            <el-descriptions-item label="JVM可用内存">{{ formatBytes(memoryInfo.jvmFree) }}</el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>
      
      <el-col :span="12">
        <Card class="mb-16" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span>磁盘使用情况</span>
              <el-tag :type="diskInfo.usedPercent > 80 ? 'danger' : 'success'">{{ diskInfo.usedPercent }}%</el-tag>
            </div>
          </template>
          <el-progress 
            type="dashboard" 
            :percentage="diskInfo.usedPercent" 
            :width="160"
            :color="getProgressColor(diskInfo.usedPercent)"
          >
            <template #default="{ percentage }">
              <span style="font-size: 18px;">{{ percentage }}%</span>
            </template>
          </el-progress>
          <el-descriptions :column="1" border class="mt-16">
            <el-descriptions-item label="总容量">{{ formatBytes(diskInfo.total) }}</el-descriptions-item>
            <el-descriptions-item label="已用空间">{{ formatBytes(diskInfo.used) }}</el-descriptions-item>
            <el-descriptions-item label="剩余空间">{{ formatBytes(diskInfo.free) }}</el-descriptions-item>
            <el-descriptions-item label="挂载路径">{{ diskInfo.path }}</el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>
      
      <el-col :span="24">
        <Card class="mb-16" :border-radius="16">
          <template #header><span>JVM虚拟机信息</span></template>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="JVM名称">{{ jvmInfo.name }}</el-descriptions-item>
            <el-descriptions-item label="Java版本">{{ jvmInfo.version }}</el-descriptions-item>
            <el-descriptions-item label="启动时间">{{ jvmInfo.startTime }}</el-descriptions-item>
            <el-descriptions-item label="运行时长">{{ jvmInfo.runTime }}</el-descriptions-item>
            <el-descriptions-item label="安装路径" :span="2">{{ jvmInfo.home }}</el-descriptions-item>
            <el-descriptions-item label="项目路径" :span="3">{{ jvmInfo.projectPath }}</el-descriptions-item>
            <el-descriptions-item label="运行参数" :span="3">
              <el-tag v-for="(param, index) in jvmInfo.inputArgs" :key="index" size="small" class="mr-4 mb-4">
                {{ param }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>
      
      <el-col :span="24">
        <Card :border-radius="16">
          <template #header><span>服务器信息</span></template>
          <el-descriptions :column="3" border>
            <el-descriptions-item label="服务器名称">{{ serverInfo.computerName }}</el-descriptions-item>
            <el-descriptions-item label="操作系统">{{ serverInfo.osName }}</el-descriptions-item>
            <el-descriptions-item label="服务器IP">{{ serverInfo.ip }}</el-descriptions-item>
            <el-descriptions-item label="系统架构">{{ serverInfo.osArch }}</el-descriptions-item>
            <el-descriptions-item label="用户目录">{{ serverInfo.userDir }}</el-descriptions-item>
            <el-descriptions-item label="当前工作目录">{{ serverInfo.workDir }}</el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'ServerMonitor' })
import { reactive } from 'vue'

const cpuInfo = reactive({
  usage: 35,
  cpuNum: 8,
  userUsage: 25,
  systemUsage: 10,
  freeUsage: 65
})

const memoryInfo = reactive({
  total: 16 * 1024 * 1024 * 1024,
  used: 10 * 1024 * 1024 * 1024,
  free: 6 * 1024 * 1024 * 1024,
  usedPercent: 62,
  jvmUsed: 512 * 1024 * 1024,
  jvmFree: 256 * 1024 * 1024
})

const diskInfo = reactive({
  total: 500 * 1024 * 1024 * 1024,
  used: 280 * 1024 * 1024 * 1024,
  free: 220 * 1024 * 1024 * 1024,
  usedPercent: 56,
  path: '/data'
})

const jvmInfo = reactive({
  name: 'Java HotSpot(TM) 64-Bit Server VM',
  version: '17.0.9+11-LTS',
  startTime: '2024-07-13 08:00:00',
  runTime: '2天5小时32分',
  home: '/usr/lib/jvm/java-17-openjdk',
  projectPath: '/opt/shiqi-admin',
  inputArgs: [
    '-Xms512m',
    '-Xmx1024m',
    '-XX:+HeapDumpOnOutOfMemoryError',
    '-Djava.security.egd=file:/dev/./urandom'
  ]
})

const serverInfo = reactive({
  computerName: 'shiqi-server',
  osName: 'CentOS 7.9',
  ip: '192.168.1.100',
  osArch: 'amd64',
  userDir: '/root',
  workDir: '/opt/shiqi-admin'
})

function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

function getProgressColor(percentage: number): string {
  if (percentage < 60) return '#67c23a'
  if (percentage < 80) return '#e6a23c'
  return '#f56c6c'
}
</script>

<style scoped lang="scss">
.server-monitor {
  .mb-16 { margin-bottom: 16px; }
  .mt-16 { margin-top: 16px; }
  .mr-4 { margin-right: 4px; }
  .mb-4 { margin-bottom: 4px; }
  
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  :deep(.el-progress__text) {
    font-size: 16px !important;
  }
}
</style>