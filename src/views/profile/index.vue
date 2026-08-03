<template>
  <div class="profile-container">
    <el-row :gutter="20">
      <!-- 左侧个人信息卡片 -->
      <el-col :xs="24" :sm="24" :md="8" :lg="6">
        <Card class="profile-card" :border-radius="16">
          <template #header>
            <span class="card-title">基本信息</span>
          </template>
          <div class="avatar-section">
            <el-avatar :size="80" :src="userStore.userInfo?.avatar" />
            <h3 class="nickname">{{ userStore.userInfo?.nickname }}</h3>
            <p class="username">@{{ userStore.userInfo?.username }}</p>
          </div>
          <el-descriptions :column="1" class="info-list" border>
            <el-descriptions-item label="用户ID">
              {{ userStore.userInfo?.userId }}
            </el-descriptions-item>
            <el-descriptions-item label="昵称">
              {{ userStore.userInfo?.nickname }}
            </el-descriptions-item>
            <el-descriptions-item label="用户名">
              {{ userStore.userInfo?.username }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ userStore.userInfo?.email || '—' }}
            </el-descriptions-item>
            <el-descriptions-item label="手机号">
              {{ userStore.userInfo?.phone || '—' }}
            </el-descriptions-item>
            <el-descriptions-item label="角色">
              <el-tag
                v-for="role in userStore.userInfo?.roles"
                :key="role"
                :type="role === 'admin' ? 'danger' : 'primary'"
                size="small"
                style="margin-right: 4px"
              >
                {{ getRoleLabel(role) }}
              </el-tag>
            </el-descriptions-item>
          </el-descriptions>
        </Card>
      </el-col>

      <!-- 右侧详细信息 -->
      <el-col :xs="24" :sm="24" :md="16" :lg="18">
        <!-- 基本资料 -->
        <Card class="detail-card" :border-radius="16">
          <template #header>
            <div class="card-header">
              <span class="card-title">基本资料</span>
              <el-button type="primary" link @click="editMode = !editMode">
                {{ editMode ? '取消编辑' : '编辑资料' }}
              </el-button>
            </div>
          </template>
          <el-form
            v-if="editMode"
            :model="editForm"
            label-width="100px"
            class="edit-form"
          >
            <el-form-item label="昵称">
              <el-input v-model="editForm.nickname" placeholder="请输入昵称" />
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="editForm.email" placeholder="请输入邮箱" />
            </el-form-item>
            <el-form-item label="手机号">
              <el-input v-model="editForm.phone" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleSave">保存</el-button>
            </el-form-item>
          </el-form>
          <el-descriptions v-else :column="2" border>
            <el-descriptions-item label="昵称">
              {{ userStore.userInfo?.nickname }}
            </el-descriptions-item>
            <el-descriptions-item label="用户名">
              {{ userStore.userInfo?.username }}
            </el-descriptions-item>
            <el-descriptions-item label="邮箱">
              {{ userStore.userInfo?.email || '—' }}
            </el-descriptions-item>
            <el-descriptions-item label="手机号">
              {{ userStore.userInfo?.phone || '—' }}
            </el-descriptions-item>
          </el-descriptions>
        </Card>

        <!-- 权限列表 -->
        <Card class="detail-card" :border-radius="16">
          <template #header>
            <span class="card-title">权限</span>
          </template>
          <div class="permission-list">
            <el-tag
              v-for="perm in userStore.permissions"
              :key="perm"
              type="success"
              size="small"
              effect="plain"
              class="perm-tag"
            >
              {{ perm }}
            </el-tag>
            <span v-if="!userStore.permissions.length" class="empty-text">暂无权限</span>
          </div>
        </Card>

        <!-- 操作日志 -->
        <Card class="detail-card" :border-radius="16">
          <template #header>
            <span class="card-title">最近活动</span>
          </template>
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :timestamp="activity.time"
              :type="activity.type"
            >
              {{ activity.content }}
            </el-timeline-item>
          </el-timeline>
        </Card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
import { ref, reactive, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'

defineOptions({ name: 'Profile' })

const userStore = useUserStore()
const editMode = ref(false)

const editForm = reactive({
  nickname: userStore.userInfo?.nickname || '',
  email: userStore.userInfo?.email || '',
  phone: userStore.userInfo?.phone || '',
})

const activities = computed(() => [
  { content: '登录系统', time: '刚刚', type: 'primary' as const },
  { content: '修改了个人资料', time: '2 小时前', type: 'success' as const },
  { content: '查看了用户管理', time: '昨天', type: 'warning' as const },
  { content: '登录系统', time: '3 天前', type: 'info' as const },
])

function getRoleLabel(role: string) {
  if (role === 'admin') return '管理员'
  if (role === 'editor') return '编辑'
  return '访客'
}

function handleSave() {
  if (!userStore.userInfo) return
  userStore.userInfo = {
    ...userStore.userInfo,
    nickname: editForm.nickname,
    email: editForm.email,
    phone: editForm.phone,
  }
  editMode.value = false
  ElMessage.success('资料已更新')
}
</script>

<style lang="scss" scoped>
.profile-container {
  padding: 16px;

  .profile-card {
    text-align: center;

    .avatar-section {
      padding: 16px 0;

      .nickname {
        margin: 12px 0 4px;
        font-size: 18px;
        color: #303133;
      }

      .username {
        font-size: 13px;
        color: #909399;
        margin-bottom: 16px;
      }
    }

    .info-list {
      text-align: left;
    }
  }

  .detail-card {
    margin-bottom: 16px;

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .card-title {
      font-size: 15px;
      font-weight: 600;
    }
  }

  .edit-form {
    max-width: 500px;
  }

  .permission-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;

    .perm-tag {
      font-family: monospace;
    }

    .empty-text {
      color: #909399;
    }
  }
}
</style>
