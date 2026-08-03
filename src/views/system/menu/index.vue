<template>
  <div class="menu-management">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>菜单管理</span>
          <el-button type="primary" @click="handleAdd">新增菜单</el-button>
        </div>
      </template>
      
      <!-- 菜单表格 -->
      <el-table
        :data="menuList"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column prop="name" label="菜单名称" width="200" />
        <el-table-column prop="icon" label="图标" width="80" align="center">
          <template #default="{ row }">
            <el-icon v-if="row.icon"><component :is="row.icon" /></el-icon>
          </template>
        </el-table-column>
        <el-table-column prop="sort" label="排序" width="80" align="center" />
        <el-table-column prop="path" label="路由路径" width="180" />
        <el-table-column prop="component" label="组件路径" width="200" />
        <el-table-column prop="isLink" label="是否外链" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.isLink" type="danger">外链</el-tag>
            <el-tag v-else type="success">内部</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="linkUrl" label="外链地址" min-width="200" show-overflow-tooltip>
          <template #default="{ row }">
            {{ row.isLink ? row.linkUrl : '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="permission" label="权限标识" width="150" />
        <el-table-column prop="type" label="菜单类型" width="100" align="center">
          <template #default="{ row }">
            <el-tag v-if="row.type === 'directory'" type="warning">目录</el-tag>
            <el-tag v-else-if="row.type === 'menu'" type="success">菜单</el-tag>
            <el-tag v-else type="info">按钮</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-switch v-model="row.status" :active-value="1" :inactive-value="0" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
            <el-button link type="primary" @click="handleAddChild(row)">新增</el-button>
            <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </Card>
    
    <!-- 新增/编辑对话框 -->
    <MenuForm
      v-model="dialogVisible"
      :title="dialogTitle"
      :form-data="formData"
      :menu-list="menuList"
      @submit="handleMenuSubmit"
    />
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'MenuManagement' })
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import MenuForm from './MenuForm.vue'

interface MenuItem {
  id: number
  parentId: number
  name: string
  icon?: string
  sort: number
  path?: string
  component?: string
  permission?: string
  type: 'directory' | 'menu' | 'button'
  status: number
  isLink?: boolean
  linkUrl?: string
  children?: MenuItem[]
}

// Mock 数据
const menuList = ref<MenuItem[]>([
  {
    id: 1, parentId: 0, name: '系统管理', icon: 'Setting', sort: 1, path: '/system', type: 'directory', status: 1,
    children: [
      { id: 11, parentId: 1, name: '用户管理', icon: 'User', sort: 1, path: '/system/user', component: 'system/user/index', type: 'menu', status: 1, isLink: false },
      { id: 12, parentId: 1, name: '角色管理', icon: 'UserFilled', sort: 2, path: '/system/role', component: 'system/role/index', type: 'menu', status: 1, isLink: false },
      { id: 13, parentId: 1, name: '菜单管理', icon: 'Menu', sort: 3, path: '/system/menu', component: 'system/menu/index', type: 'menu', status: 1, isLink: false },
      { id: 14, parentId: 1, name: '部门管理', icon: 'OfficeBuilding', sort: 4, path: '/system/dept', component: 'system/dept/index', type: 'menu', status: 1, isLink: false },
      { id: 15, parentId: 1, name: '岗位管理', icon: 'Postcard', sort: 5, path: '/system/post', component: 'system/post/index', type: 'menu', status: 1, isLink: false },
    ]
  },
  {
    id: 2, parentId: 0, name: '系统监控', icon: 'Monitor', sort: 2, path: '/monitor', type: 'directory', status: 1,
    children: [
      { id: 21, parentId: 2, name: '在线用户', icon: 'Monitor', sort: 1, path: '/monitor/online', component: 'monitor/online/index', type: 'menu', status: 1, isLink: false },
      { id: 22, parentId: 2, name: '定时任务', icon: 'Timer', sort: 2, path: '/monitor/job', component: 'monitor/job/index', type: 'menu', status: 1, isLink: false },
      { id: 23, parentId: 2, name: '服务监控', icon: 'Platform', sort: 3, path: '/monitor/server', component: 'monitor/server/index', type: 'menu', status: 1, isLink: false },
    ]
  },
  {
    id: 3, parentId: 0, name: '系统工具', icon: 'Tools', sort: 3, path: '/tool', type: 'directory', status: 1,
    children: [
      { id: 31, parentId: 3, name: '表单构建', icon: 'EditPen', sort: 1, path: '/tool/build', component: 'tool/build/index', type: 'menu', status: 1, isLink: false },
      { id: 32, parentId: 3, name: '代码生成', icon: 'Cpu', sort: 2, path: '/tool/gen', component: 'tool/gen/index', type: 'menu', status: 1, isLink: false },
    ]
  },
  {
    id: 4, parentId: 0, name: '外部链接', icon: 'Link', sort: 4, path: '/external', type: 'directory', status: 1,
    children: [
      { id: 41, parentId: 4, name: 'Vue官网', icon: 'Link', sort: 1, path: '/external/vue', type: 'menu', status: 1, isLink: true, linkUrl: 'https://cn.vuejs.org/' },
      { id: 42, parentId: 4, name: 'Element Plus', icon: 'Link', sort: 2, path: '/external/element', type: 'menu', status: 1, isLink: true, linkUrl: 'https://element-plus.org/zh-CN/' },
      { id: 43, parentId: 4, name: 'GitHub仓库', icon: 'Link', sort: 3, path: '/external/github', type: 'menu', status: 1, isLink: true, linkUrl: 'https://github.com/vuejs/core' },
    ]
  }
])

const dialogVisible = ref(false)
const dialogTitle = ref('新增菜单')
const formData = ref<Partial<MenuItem>>({
  parentId: 0,
  type: 'menu',
  name: '',
  sort: 0,
  status: 1,
  isLink: false
})

function handleAdd() {
  dialogTitle.value = '新增菜单'
  formData.value = { parentId: 0, type: 'menu', name: '', sort: 0, status: 1, isLink: false }
  dialogVisible.value = true
}

function handleEdit(row: any) {
  dialogTitle.value = '编辑菜单'
  formData.value = { ...row }
  dialogVisible.value = true
}

function handleAddChild(row: any) {
  dialogTitle.value = '新增子菜单'
  formData.value = { parentId: row.id, type: 'menu', name: '', sort: 0, status: 1, isLink: false }
  dialogVisible.value = true
}

function handleMenuSubmit(data: any) {
  if (data.id) {
    const idx = menuList.value.findIndex(item => item.id === data.id)
    if (idx > -1) menuList.value[idx] = { ...menuList.value[idx], ...data }
    ElMessage.success('更新成功')
  } else {
    const newId = Date.now()
    menuList.value.push({ ...data, id: newId } as MenuItem)
    ElMessage.success('创建成功')
  }
}

function handleDelete(row: any) {
  ElMessageBox.confirm('确认删除菜单' + `"${row.name}"?`, '警告', {
    type: 'warning'
  }).then(() => {
    ElMessage.success('删除成功')
  }).catch(() => {})
}
</script>

<style scoped lang="scss">
.menu-management {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
</style>