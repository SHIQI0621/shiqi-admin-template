<template>
  <div class="error-page">
    <div class="error-content">
      <h1>404</h1>
      <p class="description">抱歉，您访问的页面不存在</p>
      <el-button type="primary" @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goHome() {
  router.push('/dashboard')
}
</script>

<style scoped lang="scss">
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #f5f7fa;
}

.error-content {
  text-align: center;

  h1 {
    font-size: 120px;
    font-weight: 700;
    color: var(--el-color-primary, #1890ff);
    margin-bottom: 0;
    line-height: 1;
  }

  .description {
    font-size: 18px;
    color: #606266;
    margin: 20px 0 30px;
  }
}
</style>
