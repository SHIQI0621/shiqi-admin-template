<template>
  <div class="login-container">
    <!-- 背景动画 -->
    <div class="bg-animation">
      <div class="circle circle-1"></div>
      <div class="circle circle-2"></div>
      <div class="circle circle-3"></div>
    </div>

    <div class="login-card">
      <div class="login-header">
        <img src="@/assets/logo.png" alt="logo" class="logo" />
        <h1>{{ appTitle }}</h1>
        <p>{{ appDoc }}</p>
      </div>

      <el-form ref="formRef" :model="form" :rules="rules" class="login-form">
        <el-form-item prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" size="large" :prefix-icon="User" />
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" size="large" :prefix-icon="Lock"
            show-password @keyup.enter="handleLogin" />
        </el-form-item>

        <el-form-item>
          <div class="form-options">
            <el-checkbox v-model="form.remember">记住密码</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" class="login-btn" :loading="loading" @click="handleLogin">
            登录
          </el-button>
        </el-form-item>
      </el-form>

      <div class="login-footer">
        <span>其他登录方式</span>
        <div class="other-login">
          <el-icon :size="24">
            <ChatDotRound />
          </el-icon>
          <el-icon :size="24">
            <Message />
          </el-icon>
          <el-icon :size="24">
            <Iphone />
          </el-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { APP_TITLE, APP_DIC } from '@/setting'
import { useUserStore, useMenuStore } from '@/stores'

const appTitle = APP_TITLE;
const appDoc = APP_DIC;
const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const menuStore = useMenuStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  username: 'admin',
  password: '123456',
  remember: true,
})

const rules: FormRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
  ],
}

async function handleLogin() {
  if (!formRef.value) return

  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      try {
        await userStore.login(form.username, form.password)
        await menuStore.fetchMenus()
        ElMessage.success('登录成功')
        const redirect = (route.query.redirect as string) || '/'
        router.push(redirect)
      } catch {
        // 错误信息已在响应拦截器中处理
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
  overflow: hidden;

  .bg-animation {
    position: absolute;
    width: 100%;
    height: 100%;

    .circle {
      position: absolute;
      border-radius: 50%;
      opacity: 0.1;

      &.circle-1 {
        width: 400px;
        height: 400px;
        background: #fff;
        top: -100px;
        right: -100px;
        animation: float 6s ease-in-out infinite;
      }

      &.circle-2 {
        width: 300px;
        height: 300px;
        background: #fff;
        bottom: -80px;
        left: -80px;
        animation: float 8s ease-in-out infinite reverse;
      }

      &.circle-3 {
        width: 200px;
        height: 200px;
        background: #fff;
        top: 50%;
        left: 20%;
        animation: float 10s ease-in-out infinite;
      }
    }
  }

  @keyframes float {

    0%,
    100% {
      transform: translateY(0) scale(1);
    }

    50% {
      transform: translateY(-30px) scale(1.05);
    }
  }

  .login-card {
    width: 420px;
    padding: 40px;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
    position: relative;
    z-index: 10;

    .login-header {
      text-align: center;
      margin-bottom: 32px;

      .logo {
        width: 64px;
        height: 64px;
        margin-bottom: 16px;
      }

      h1 {
        font-size: 24px;
        color: #303133;
        margin-bottom: 8px;
        font-weight: 600;
      }

      p {
        font-size: 14px;
        color: #909399;
      }
    }

    .login-form {
      .form-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
      }

      .login-btn {
        width: 100%;
        height: 44px;
        font-size: 16px;
        border-radius: 8px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;

        &:hover {
          opacity: 0.9;
        }
      }
    }

    .login-footer {
      text-align: center;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #ebeef5;

      span {
        font-size: 12px;
        color: #909399;
        display: block;
        margin-bottom: 12px;
      }

      .other-login {
        display: flex;
        justify-content: center;
        gap: 20px;

        .el-icon {
          cursor: pointer;
          color: #606266;
          transition: all 0.3s;

          &:hover {
            color: var(--el-color-primary);
            transform: translateY(-2px);
          }
        }
      }
    }
  }

  // 移动端适配
  @media screen and (max-width: 480px) {
    .login-card {
      width: 90%;
      padding: 24px;
      margin: 16px;
    }
  }
}
</style>
