// 图标/字典类型数据
const dictTypes = [
  { id: 1, type: 'gender', name: '性别', status: 1, remark: '用户性别', createTime: '2024-01-01 10:00:00' },
  { id: 2, type: 'sys_status', name: '系统状态', status: 1, remark: '系统开关状态', createTime: '2024-01-02 10:00:00' },
  { id: 3, type: 'notice_type', name: '通知类型', status: 1, remark: '通知公告类型', createTime: '2024-01-03 10:00:00' },
  { id: 4, type: 'job_type', name: '岗位类型', status: 1, remark: '员工岗位分类', createTime: '2024-01-04 10:00:00' },
  { id: 5, type: 'dept_category', name: '部门类别', status: 1, remark: '部门分类标识', createTime: '2024-01-05 10:00:00' },
]

// 字典数据
const dictData: Record<string, any[]> = {
  gender: [
    { id: 1, label: '男', value: '1', sort: 1, status: 1, color: '#409EFF' },
    { id: 2, label: '女', value: '2', sort: 2, status: 1, color: '#F56C6C' },
    { id: 3, label: '未知', value: '0', sort: 3, status: 1, color: '#909399' },
  ],
  sys_status: [
    { id: 1, label: '开启', value: '1', sort: 1, status: 1, color: '#67C23A' },
    { id: 2, label: '关闭', value: '0', sort: 2, status: 1, color: '#F56C6C' },
  ],
  notice_type: [
    { id: 1, label: '通知', value: '1', sort: 1, status: 1, color: '#409EFF' },
    { id: 2, label: '公告', value: '2', sort: 2, status: 1, color: '#E6A23C' },
    { id: 3, label: '提醒', value: '3', sort: 3, status: 1, color: '#F56C6C' },
  ],
  job_type: [
    { id: 1, label: '全职', value: '1', sort: 1, status: 1, color: '#67C23A' },
    { id: 2, label: '兼职', value: '2', sort: 2, status: 1, color: '#E6A23C' },
    { id: 3, label: '实习', value: '3', sort: 3, status: 1, color: '#909399' },
  ],
  dept_category: [
    { id: 1, label: '研发', value: 'rd', sort: 1, status: 1, color: '#409EFF' },
    { id: 2, label: '运营', value: 'ops', sort: 2, status: 1, color: '#67C23A' },
    { id: 3, label: '职能', value: 'func', sort: 3, status: 1, color: '#E6A23C' },
  ],
}

// 字典相关Mock接口
export default [
  // 获取字典类型列表
  {
    url: '/api/dict/type/list',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, name } = query || {}
      
      let filteredList = [...dictTypes]
      if (name) {
        filteredList = filteredList.filter((item) => item.name.includes(name))
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

  // 根据类型获取字典数据
  {
    url: '/api/dict/data/get',
    method: 'get',
    response: ({ query }: any) => {
      const type = query.type
      const data = dictData[type] || []
      
      return {
        code: 200,
        message: 'success',
        data,
      }
    },
  },

  // 创建字典类型
  {
    url: '/api/dict/type/create',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const newItem = {
        id: dictTypes.length + 1,
        ...parsedBody,
        createTime: new Date().toISOString().replace('T', ' ').substring(0, 19),
      }
      dictTypes.push(newItem)
      return { code: 200, message: '创建成功', data: newItem }
    },
  },

  // 更新字典类型
  {
    url: '/api/dict/type/update',
    method: 'put',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { id, ...data } = parsedBody
      const index = dictTypes.findIndex((item) => item.id === id)
      
      if (index !== -1) {
        dictTypes[index] = { ...dictTypes[index], ...data }
        return { code: 200, message: '更新成功', data: dictTypes[index] }
      }
      return { code: 404, message: '字典类型不存在' }
    },
  },

  // 删除字典类型
  {
    url: '/api/dict/type/delete',
    method: 'delete',
    response: ({ body, query }: any) => {
      let id: number
      if (query.id) {
        id = parseInt(query.id)
      } else {
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
        id = parsedBody.id
      }
      
      const index = dictTypes.findIndex((item) => item.id === id)
      
      if (index !== -1) {
        dictTypes.splice(index, 1)
        return { code: 200, message: '删除成功' }
      }
      return { code: 404, message: '字典类型不存在' }
    },
  },

  // 创建字典数据
  {
    url: '/api/dict/data/create',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const type = parsedBody.type
      
      if (!dictData[type]) {
        dictData[type] = []
      }
      
      const newData = {
        id: Date.now(),
        ...parsedBody,
      }
      dictData[type].push(newData)
      
      return { code: 200, message: '创建成功', data: newData }
    },
  },

  // 更新字典数据
  {
    url: '/api/dict/data/update',
    method: 'put',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { id, ...data } = parsedBody
      
      // 在所有字典数据中查找并更新
      for (const type in dictData) {
        const index = dictData[type].findIndex((item) => item.id === id)
        if (index !== -1) {
          dictData[type][index] = { ...dictData[type][index], ...data }
          return { code: 200, message: '更新成功', data: dictData[type][index] }
        }
      }
      
      return { code: 404, message: '字典数据不存在' }
    },
  },

  // 删除字典数据
  {
    url: '/api/dict/data/delete',
    method: 'delete',
    response: ({ body, query }: any) => {
      let id: number
      if (query.id) {
        id = parseInt(query.id)
      } else {
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
        id = parsedBody.id
      }
      
      for (const type in dictData) {
        const index = dictData[type].findIndex((item) => item.id === id)
        if (index !== -1) {
          dictData[type].splice(index, 1)
          return { code: 200, message: '删除成功' }
        }
      }
      
      return { code: 404, message: '字典数据不存在' }
    },
  },
]