<template>
  <Teleport to="body">
    <transition name="fade">
      <div v-if="appStore.isLocked" class="lock-screen">
        <div class="lock-content">
          <div class="lock-time">
            <span class="time-hours">{{ currentTime.hours }}</span>
            <span class="time-separator">:</span>
            <span class="time-minutes">{{ currentTime.minutes }}</span>
          </div>
          <div class="lock-date">{{ currentDate }}</div>
          
          <div class="lock-user">
            <el-avatar :size="80" :src="userStore.userInfo?.avatar" class="lock-avatar">
              {{ userStore.userInfo?.nickname?.charAt(0) || 'U' }}
            </el-avatar>
            <div class="lock-username">{{ userStore.userInfo?.nickname || '用户' }}</div>
          </div>

          <el-form
            ref="formRef"
            :model="form"
            :rules="rules"
            class="lock-form"
            @keyup.enter="handleUnlock"
          >
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                type="password"
                placeholder="请输入密码解锁"
                :prefix-icon="Lock"
                size="large"
                show-password
                autofocus
              />
            </el-form-item>
          </el-form>

          <el-button
            type="primary"
            size="large"
            class="lock-btn"
            :loading="loading"
            @click="handleUnlock"
          >
            解锁
          </el-button>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { Lock } from '@element-plus/icons-vue'
import { type FormInstance, type FormRules } from 'element-plus'
import { useAppStore, useUserStore } from '@/stores'

const appStore = useAppStore()
const userStore = useUserStore()

const formRef = ref<FormInstance>()
const loading = ref(false)
let timer: number | null = null

const form = reactive({
  password: ''
})

const rules: FormRules = {
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

const currentTime = reactive({
  hours: '00',
  minutes: '00'
})

const currentDate = computed(() => {
  const now = new Date()
  const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  return `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${weekdays[now.getDay()]}`
})

function updateTime() {
  const now = new Date()
  currentTime.hours = String(now.getHours()).padStart(2, '0')
  currentTime.minutes = String(now.getMinutes()).padStart(2, '0')
}

async function handleUnlock() {
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      loading.value = true
      // 简单的解锁验证（实际项目中可以调用接口验证密码）
      // 这里为了演示，只要密码不为空就可以解锁
      setTimeout(() => {
        if (form.password) {
          appStore.unlockScreen()
          form.password = ''
          ElMessage.success('解锁成功')
        }
        loading.value = false
      }, 500)
    }
  })
}

onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

onUnmounted(() => {
  if (timer) {
    clearInterval(timer)
  }
})
</script>

<style scoped lang="scss">
.lock-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.lock-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.lock-time {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  
  .time-hours,
  .time-minutes {
    font-size: 72px;
    font-weight: 300;
    color: #fff;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    letter-spacing: 2px;
  }
  
  .time-separator {
    font-size: 60px;
    color: #fff;
    margin: 0 10px;
    animation: blink 1s infinite;
  }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0.3; }
}

.lock-date {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 40px;
}

.lock-user {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
}

.lock-avatar {
  background: rgba(255, 255, 255, 0.2);
  border: 3px solid rgba(255, 255, 255, 0.3);
}

.lock-username {
  margin-top: 12px;
  font-size: 18px;
  color: #fff;
  font-weight: 500;
}

.lock-form {
  width: 300px;
  
  :deep(.el-input__wrapper) {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 24px;
  }
}

.lock-btn {
  width: 300px;
  margin-top: 10px;
  border-radius: 24px;
  height: 44px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.95);
  color: #667eea;
  border: none;
  
  &:hover {
    background: #fff;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
