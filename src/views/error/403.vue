<template>
  <div class="error-page">
    <div class="error-content">
      <h1>403</h1>
      <p class="description">抱歉，您没有访问此页面的权限</p>
      <el-button type="primary" @click="goBack">返回上一页</el-button>
      <el-button @click="goHome">返回首页</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

function goBack() {
  router.go(-1)
}

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
    color: #e6a23c;
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
