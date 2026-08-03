import Mock from 'mockjs'

// 生成用户列表数据
function generateUserList() {
  const list: any[] = []
  for (let i = 0; i < 50; i++) {
    list.push(Mock.mock({
      'id|+1': i + 1,
      username: '@first',
      nickname: '@cname',
      email: '@email',
      phone: /^1[3-9]\d{9}$/,
      'status|1': [0, 1],
      'deptId|1': [100, 101, 102, 103, 104],
      deptName: function() {
        const depts = {
          100: '总公司',
          101: '技术部',
          102: '市场部',
          103: '财务部',
          104: '人事部'
        }
        return depts[this.deptId as keyof typeof depts]
      },
      roles: function() {
        const roles = ['管理员', '普通用户', '访客']
        return [roles[this.id % 3]]
      },
      createTime: '@datetime("yyyy-MM-dd HH:mm:ss")',
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 1}`,
    }))
  }
  return list
}

const userList = generateUserList()

// 用户相关Mock接口
export default [
  // 获取用户列表
  {
    url: '/api/user/list',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, username, status } = query || {}
      
      let filteredList = [...userList]
      
      if (username) {
        filteredList = filteredList.filter((item) =>
          item.username.includes(username) || item.nickname.includes(username)
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

  // 获取用户详情
  {
    url: '/api/user/detail',
    method: 'get',
    response: ({ query }: any) => {
      const id = parseInt(query.id)
      const user = userList.find((item) => item.id === id)
      
      if (user) {
        return { code: 200, message: 'success', data: user }
      }
      return { code: 404, message: '用户不存在' }
    },
  },

  // 创建用户
  {
    url: '/api/user/create',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const newUser = {
        id: userList.length + 1,
        ...parsedBody,
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      }
      userList.unshift(newUser)
      return { code: 200, message: '创建成功', data: newUser }
    },
  },

  // 更新用户
  {
    url: '/api/user/update',
    method: 'put',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { id, ...data } = parsedBody
      const index = userList.findIndex((item) => item.id === id)
      
      if (index !== -1) {
        userList[index] = { ...userList[index], ...data }
        return { code: 200, message: '更新成功', data: userList[index] }
      }
      return { code: 404, message: '用户不存在' }
    },
  },

  // 删除用户
  {
    url: '/api/user/delete',
    method: 'delete',
    response: ({ body, query }: any) => {
      let id: number
      if (query.id) {
        id = parseInt(query.id)
      } else {
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
        id = parsedBody.id || parsedBody.ids?.[0]
      }
      
      const index = userList.findIndex((item) => item.id === id)
      
      if (index !== -1) {
        userList.splice(index, 1)
        return { code: 200, message: '删除成功' }
      }
      return { code: 404, message: '用户不存在' }
    },
  },

  // 批量删除用户
  {
    url: '/api/user/batch',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { ids } = parsedBody
      
      ids.forEach((id: number) => {
        const index = userList.findIndex((item) => item.id === id)
        if (index !== -1) {
          userList.splice(index, 1)
        }
      })
      
      return { code: 200, message: `成功删除${ids.length}条数据` }
    },
  },
]