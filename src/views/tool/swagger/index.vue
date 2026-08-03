<template>
  <div class="swagger-api">
    <Card :border-radius="16">
      <template #header>
        <div class="card-header">
          <span>系统接口文档 (Swagger)</span>
          <el-input v-model="searchKeyword" placeholder="搜索接口..." clearable
            style="width: 250px">
            <template #prefix>
              <el-icon>
                <Search />
              </el-icon>
            </template>
          </el-input>
        </div>
      </template>

      <el-collapse v-model="activeGroups">
        <el-collapse-item v-for="group in filteredGroups" :key="group.name" :name="group.name">
          <template #title>
            <div class="group-title">
              <el-tag :type="getMethodColor(group.methods[0])" size="small">{{ group.methods[0] }}</el-tag>
              <span class="group-name">{{ group.name }}</span>
              <span class="api-count">{{ group.apis.length }} 个接口</span>
            </div>
          </template>

          <div class="api-list">
            <div v-for="api in group.apis" :key="api.path" class="api-item" @click="handleViewApi(api)">
              <div class="api-method" :class="api.method.toLowerCase()">
                {{ api.method }}
              </div>
              <div class="api-info">
                <div class="api-path">{{ api.path }}</div>
                <div class="api-summary">{{ api.summary }}</div>
              </div>
              <el-icon class="arrow-right">
                <ArrowRight />
              </el-icon>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </Card>

    <Dialog v-model="detailVisible" :title="currentApi?.summary || '系统接口文档 (Swagger)'" width="750px" top="5vh">
      <div v-if="currentApi" class="api-detail">
        <el-descriptions :column="2" border class="mb-16">
          <el-descriptions-item label="请求类型">
            <el-tag :type="getMethodColor(currentApi.method)" size="small">{{ currentApi.method }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="请求路径">
            <code>{{ currentApi.path }}</code>
          </el-descriptions-item>
          <el-descriptions-item label="所属分组">{{ currentApi.group }}</el-descriptions-item>
          <el-descriptions-item label="安全认证">
            <el-tag type="warning" size="small">需要登录</el-tag>
          </el-descriptions-item>
        </el-descriptions>

        <h4 class="section-title">请求参数</h4>
        <el-table :data="currentApi.params" border size="small" class="mb-16">
          <el-table-column prop="name" label="参数名" width="150" />
          <el-table-column prop="type" label="类型" width="100" align="center" />
          <el-table-column prop="required" label="必填" width="70" align="center">
            <template #default="{ row }">
              <el-tag :type="row.required ? 'danger' : 'info'" size="small">{{ row.required ? '确定' :
                '取消' }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="description" label="说明" show-overflow-tooltip />
          <el-table-column prop="example" label="示例" width="150" show-overflow-tooltip />
        </el-table>

        <h4 class="section-title">响应示例</h4>
        <pre class="response-example"><code>{{ currentApi.responseExample }}</code></pre>

        <h4 class="section-title mt-16">在线调试</h4>
        <el-form :inline="true" size="small">
          <el-form-item v-for="param in currentApi.params.filter(p => p.in === 'query')" :key="param.name"
            :label="param.name">
            <el-input v-model="debugParams[param.name]" :placeholder="param.example || param.description"
              style="width: 200px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleDebug">提交</el-button>
          </el-form-item>
        </el-form>

        <div v-if="debugResponse" class="debug-response">
          <h4 class="section-title">响应结果</h4>
          <pre><code>{{ debugResponse }}</code></pre>
        </div>
      </div>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import Card from "@/components/Card/index.vue";
defineOptions({ name: 'SwaggerApi' })
import { ref, computed, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Search, ArrowRight } from '@element-plus/icons-vue'
import Dialog from '@/components/Dialog/index.vue'

interface ApiParam {
  name: string
  type: string
  in: string
  required: boolean
  description: string
  example?: string
}

interface ApiItem {
  method: string
  path: string
  summary: string
  group: string
  params: ApiParam[]
  responseExample: string
}

interface ApiGroup {
  name: string
  methods: string[]
  apis: ApiItem[]
}

const apiGroups = ref<ApiGroup[]>([
  {
    name: '用户管理模块',
    methods: ['GET'],
    apis: [
      {
        method: 'GET', path: '/system/user/list', summary: '获取用户列表', group: '用户管理模块',
        params: [
          { name: 'pageNum', type: 'integer', in: 'query', required: false, description: '页码', example: '1' },
          { name: 'pageSize', type: 'integer', in: 'query', required: false, description: '每页数量', example: '10' },
          { name: 'userName', type: 'string', in: 'query', required: false, description: '用户名' },
          { name: 'status', type: 'string', in: 'query', required: false, description: '状态 0正常 1停用' },
        ],
        responseExample: `{
  "code": 200,
  "msg": "操作成功",
  "total": 100,
  "rows": [
    {
      "userId": 1,
      "userName": "admin",
      "nickName": "管理员",
      "status": "0",
      "createTime": "2024-01-01 00:00:00"
    }
  ]
}`
      },
      {
        method: 'GET', path: '/system/user/{userId}', summary: '根据用户ID获取详细信息', group: '用户管理模块',
        params: [
          { name: 'userId', type: 'long', in: 'path', required: true, description: '用户ID', example: '1' },
        ],
        responseExample: `{
  "code": 200,
  "msg": "操作成功",
  "data": {
    "userId": 1,
    "userName": "admin",
    "nickName": "管理员",
    "email": "admin@shiqi.com",
    "phonenumber": "13800138000",
    "sex": "1",
    "status": "0",
    "roles": ["admin"],
    "createTime": "2024-01-01 00:00:00"
  }
}`
      },
      {
        method: 'POST', path: '/system/user', summary: '新增用户', group: '用户管理模块',
        params: [
          { name: 'userName', type: 'string', in: 'body', required: true, description: '用户名', example: 'testuser' },
          { name: 'nickName', type: 'string', in: 'body', required: true, description: '昵称', example: '测试用户' },
          { name: 'password', type: 'string', in: 'body', required: true, description: '密码', example: '123456' },
          { name: 'email', type: 'string', in: 'body', required: false, description: '邮箱' },
          { name: 'phonenumber', type: 'string', in: 'body', required: false, description: '手机号' },
          { name: 'status', type: 'string', in: 'body', required: false, description: '状态', example: '0' },
          { name: 'roleIds', type: 'array', in: 'body', required: false, description: '角色ID数组' },
        ],
        responseExample: `{ "code": 200, "msg": "新增成功" }`
      },
      {
        method: 'PUT', path: '/system/user', summary: '修改用户', group: '用户管理模块',
        params: [
          { name: 'userId', type: 'long', in: 'body', required: true, description: '用户ID' },
          { name: 'userName', type: 'string', in: 'body', required: false, description: '用户名' },
          { name: 'nickName', type: 'string', in: 'body', required: false, description: '昵称' },
          { name: 'status', type: 'string', in: 'body', required: false, description: '状态' },
        ],
        responseExample: `{ "code": 200, "msg": "修改成功" }`
      },
      {
        method: 'DELETE', path: '/system/user/{userIds}', summary: '删除用户', group: '用户管理模块',
        params: [
          { name: 'userIds', type: 'string', in: 'path', required: true, description: '用户ID数组，逗号分隔', example: '1,2,3' },
        ],
        responseExample: `{ "code": 200, "msg": "删除成功" }`
      },
    ]
  },
  {
    name: '角色管理模块',
    methods: ['GET'],
    apis: [
      {
        method: 'GET', path: '/system/role/list', summary: '获取角色列表', group: '角色管理模块',
        params: [
          { name: 'pageNum', type: 'integer', in: 'query', required: false, description: '页码' },
          { name: 'pageSize', type: 'integer', in: 'query', required: false, description: '每页数量' },
          { name: 'roleName', type: 'string', in: 'query', required: false, description: '角色名称' },
        ],
        responseExample: `{
  "code": 200,
  "msg": "操作成功",
  "rows": [
    { "roleId": 1, "roleName": "超级管理员", "roleKey": "admin", "sort": 1, "status": "0" },
    { "roleId": 2, "roleName": "普通角色", "roleKey": "common", "sort": 2, "status": "0" }
  ]
}`
      },
      {
        method: 'GET', path: '/system/role/{roleId}/menuTree', summary: '获取角色的菜单树', group: '角色管理模块',
        params: [
          { name: 'roleId', type: 'long', in: 'path', required: true, description: '角色ID' },
        ],
        responseExample: `{
  "code": 200,
  "data": [
    { "id": 1, "label": "系统管理", "children": [...] },
    { "id": 2, "label": "系统监控", "children": [...] }
  ]
}`
      },
    ]
  },
  {
    name: '部门管理模块',
    methods: ['GET'],
    apis: [
      {
        method: 'GET', path: '/system/dept/tree', summary: '获取部门树形结构', group: '部门管理模块',
        params: [],
        responseExample: `{
  "code": 200,
  "data": [
    { "deptId": 100, "deptName": "总公司", "parentId": 0, "children": [
      { "deptId": 101, "deptName": "深圳分公司", "parentId": 100, "children": [] },
      { "deptId": 102, "deptName": "长沙分公司", "parentId": 100, "children": [] }
    ]}
  ]
}`
      },
    ]
  },
  {
    name: '字典管理模块',
    methods: ['GET'],
    apis: [
      {
        method: 'GET', path: '/system/dict/type/list', summary: '获取字典类型列表', group: '字典管理模块',
        params: [
          { name: 'dictName', type: 'string', in: 'query', required: false, description: '字典名称' },
          { name: 'dictType', type: 'string', in: 'query', required: false, description: '字典类型' },
        ],
        responseExample: `{
  "code": 200,
  "rows": [
    { "dictId": 1, "dictName": "用户性别", "dictType": "sys_user_sex", "status": "0" },
    { "dictId": 2, "dictName": "菜单状态", "dictType": "sys_show_hide", "status": "0" }
  ]
}`
      },
      {
        method: 'GET', path: '/system/dict/data/type/{dictType}', summary: '根据字典类型查询字典数据', group: '字典管理模块',
        params: [
          { name: 'dictType', type: 'string', in: 'path', required: true, description: '字典类型', example: 'sys_user_sex' },
        ],
        responseExample: `{
  "code": 200,
  "data": [
    { "dictCode": 1, "dictLabel": "男", "dictValue": "0", "dictSort": 1 },
    { "dictCode": 2, "dictLabel": "女", "dictValue": "1", "dictSort": 2 }
  ]
}`
      },
    ]
  },
  {
    name: '系统监控模块',
    methods: ['GET'],
    apis: [
      {
        method: 'GET', path: '/monitor/online/list', summary: '获取在线用户列表', group: '系统监控模块',
        params: [
          { name: 'ipaddr', type: 'string', in: 'query', required: false, description: '登录IP' },
          { name: 'userName', type: 'string', in: 'query', required: false, description: '用户名' },
        ],
        responseExample: `{
  "code": 200,
  "rows": [
    { "sessionId": "abc123", "loginName": "admin", "ipaddr": "127.0.0.1", "loginLocation": "本地", "browser": "Chrome 120", "os": "Windows 10", "loginTime": "2024-07-15 09:00:00" }
  ]
}`
      },
      {
        method: 'DELETE', path: '/monitor/online/{tokenId}', summary: '强退用户', group: '系统监控模块',
        params: [
          { name: 'tokenId', type: 'string', in: 'path', required: true, description: '会话标识' },
        ],
        responseExample: `{ "code": 200, "msg": "强退成功" }`
      },
    ]
  },
])

const searchKeyword = ref('')
const activeGroups = ref(['用户管理模块'])
const detailVisible = ref(false)
const currentApi = ref<ApiItem>()
const debugParams = reactive<Record<string, string>>({})
const debugResponse = ref('')

const filteredGroups = computed(() => {
  if (!searchKeyword.value) return apiGroups.value

  return apiGroups.value.map(group => ({
    ...group,
    apis: group.apis.filter(api =>
      api.summary.toLowerCase().includes(searchKeyword.value.toLowerCase()) ||
      api.path.toLowerCase().includes(searchKeyword.value.toLowerCase())
    )
  })).filter(group => group.apis.length > 0)
})

function getMethodColor(method: string) {
  const colors: Record<string, string> = {
    GET: 'success',
    POST: 'primary',
    PUT: 'warning',
    DELETE: 'danger',
    PATCH: 'info'
  }
  return (colors[method.toUpperCase()] as 'success' | 'primary' | 'warning' | 'danger' | 'info') || 'info'
}

function handleViewApi(api: ApiItem) {
  currentApi.value = api
  Object.keys(debugParams).forEach(key => delete debugParams[key])
  api.params.filter(p => p.in === 'query').forEach(p => {
    debugParams[p.name] = p.example || ''
  })
  debugResponse.value = ''
  detailVisible.value = true
}

function handleDebug() {
  debugResponse.value = JSON.stringify({
    code: 200,
    msg: '操作成功',
    data: null,
    timestamp: new Date().toISOString()
  }, null, 2)
  ElMessage.success('请求成功')
}
</script>

<style scoped lang="scss">
.swagger-api {
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .group-title {
    display: flex;
    align-items: center;
    gap: 12px;

    .group-name {
      font-weight: 600;
      color: #303133;
    }

    .api-count {
      color: #909399;
      font-size: 13px;
    }
  }

  .api-list {
    .api-item {
      display: flex;
      align-items: center;
      padding: 12px 16px;
      border: 1px solid #ebeef5;
      border-radius: 6px;
      margin-bottom: 10px;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        border-color: #409eff;
        box-shadow: 0 2px 8px rgba(64, 158, 255, 0.15);
      }

      .api-method {
        width: 60px;
        height: 24px;
        line-height: 24px;
        text-align: center;
        border-radius: 4px;
        font-size: 12px;
        font-weight: 600;
        color: #fff;
        flex-shrink: 0;

        &.get {
          background: #67c23a;
        }

        &.post {
          background: #409eff;
        }

        &.put {
          background: #e6a23c;
        }

        &.delete {
          background: #f56c6c;
        }
      }

      .api-info {
        flex: 1;
        margin-left: 16px;

        .api-path {
          font-size: 14px;
          color: #303133;
          font-family: monospace;
        }

        .api-summary {
          font-size: 12px;
          color: #909399;
          margin-top: 4px;
        }
      }

      .arrow-right {
        color: #c0c4cc;
      }
    }
  }

  .api-detail {
    .mb-16 {
      margin-bottom: 16px;
    }

    .mt-16 {
      margin-top: 16px;
    }

    .section-title {
      font-size: 15px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 12px;
      padding-bottom: 8px;
      border-bottom: 1px solid #ebeef5;
    }

    .response-example,
    pre {
      background: #f5f7fa;
      padding: 16px;
      border-radius: 6px;
      overflow-x: auto;
      font-size: 13px;
      line-height: 1.6;

      code {
        font-family: 'Monaco', 'Menlo', monospace;
        color: #303133;
      }
    }

    .debug-response {
      margin-top: 16px;
    }
  }
}
</style>