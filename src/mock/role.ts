// 生成角色列表数据
const roleList = [
  { id: 1, name: '超级管理员', code: 'super_admin', status: 1, remark: '拥有所有权限', createTime: '2024-01-01 10:00:00', menuIds: [1, 2, 3, 4, 5, 6] },
  { id: 2, name: '普通管理员', code: 'admin', status: 1, remark: '管理大部分功能', createTime: '2024-01-02 10:00:00', menuIds: [2, 3, 4, 5] },
  { id: 3, name: '普通用户', code: 'user', status: 1, remark: '基本权限', createTime: '2024-01-03 10:00:00', menuIds: [6] },
  { id: 4, name: '访客', code: 'guest', status: 0, remark: '只读权限', createTime: '2024-01-04 10:00:00', menuIds: [] },
]

// 角色相关Mock接口
export default [
  // 获取角色列表
  {
    url: '/api/role/list',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, name, status } = query || {}
      
      let filteredList = [...roleList]
      
      if (name) {
        filteredList = filteredList.filter((item) =>
          item.name.includes(name) || item.code.includes(name)
        )
      }
      
      if (status !== undefined && status !== '') {
        filteredList = filteredList.filter((item) => item.status === Number(status))
      }

      const start = (page - 1) * pageSize
      const end = start + parseInt(pageSize)
      
      return {
        code: 200,
        message: 'success',
        data: {
          list: filteredList.slice(start, end),
          total: filteredList.length,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
        },
      }
    },
  },

  // 获取所有角色（下拉选择用）
  {
    url: '/api/role/all',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: roleList.filter((r) => r.status === 1),
      }
    },
  },

  // 创建角色
  {
    url: '/api/role/create',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const newRole = {
        id: roleList.length + 1,
        ...parsedBody,
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      }
      roleList.push(newRole)
      return { code: 200, message: '创建成功', data: newRole }
    },
  },

  // 更新角色
  {
    url: '/api/role/update',
    method: 'put',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { id, ...data } = parsedBody
      const index = roleList.findIndex((item) => item.id === id)
      
      if (index !== -1) {
        roleList[index] = { ...roleList[index], ...data }
        return { code: 200, message: '更新成功', data: roleList[index] }
      }
      return { code: 404, message: '角色不存在' }
    },
  },

  // 删除角色
  {
    url: '/api/role/delete',
    method: 'delete',
    response: ({ body, query }: any) => {
      let id: number
      if (query.id) {
        id = parseInt(query.id)
      } else {
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
        id = parsedBody.id
      }
      
      const index = roleList.findIndex((item) => item.id === id)
      
      if (index !== -1) {
        roleList.splice(index, 1)
        return { code: 200, message: '删除成功' }
      }
      return { code: 404, message: '角色不存在' }
    },
  },
]