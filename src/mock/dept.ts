// 部门树形结构数据
const deptTree = [
  {
    id: 100,
    name: '总公司',
    parentId: 0,
    sort: 0,
    leader: '张总',
    phone: '13800138000',
    email: 'zong@company.com',
    status: 1,
    children: [
      {
        id: 101,
        name: '技术部',
        parentId: 100,
        sort: 1,
        leader: '李工',
        phone: '13800138001',
        email: 'tech@company.com',
        status: 1,
        children: [
          { id: 1011, name: '前端组', parentId: 101, sort: 1, leader: '王组长', phone: '13800138011', email: 'frontend@company.com', status: 1, children: [] },
          { id: 1012, name: '后端组', parentId: 101, sort: 2, leader: '赵组长', phone: '13800138012', email: 'backend@company.com', status: 1, children: [] },
          { id: 1013, name: '测试组', parentId: 101, sort: 3, leader: '钱组长', phone: '13800138013', email: 'test@company.com', status: 1, children: [] },
        ],
      },
      {
        id: 102,
        name: '市场部',
        parentId: 100,
        sort: 2,
        leader: '刘经理',
        phone: '13800138002',
        email: 'market@company.com',
        status: 1,
        children: [
          { id: 1021, name: '销售组', parentId: 102, sort: 1, leader: '孙组长', phone: '13800138021', email: 'sales@company.com', status: 1, children: [] },
          { id: 1022, name: '推广组', parentId: 102, sort: 2, leader: '周组长', phone: '13800138022', email: 'promo@company.com', status: 1, children: [] },
        ],
      },
      {
        id: 103,
        name: '财务部',
        parentId: 100,
        sort: 3,
        leader: '陈经理',
        phone: '13800138003',
        email: 'finance@company.com',
        status: 1,
        children: [],
      },
      {
        id: 104,
        name: '人事部',
        parentId: 100,
        sort: 4,
        leader: '吴经理',
        phone: '13800138004',
        email: 'hr@company.com',
        status: 1,
        children: [],
      },
    ],
  },
]

// 扁平化部门列表
function flattenDept(tree: any[], result: any[] = []) {
  tree.forEach((node) => {
    result.push(node)
    if (node.children?.length) {
      flattenDept(node.children, result)
    }
  })
  return result
}

// 部门相关Mock接口
export default [
  // 获取部门树
  {
    url: '/api/dept/tree',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: deptTree,
      }
    },
  },

  // 获取部门列表（扁平）
  {
    url: '/api/dept/list',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: flattenDept(deptTree),
      }
    },
  },

  // 创建部门
  {
    url: '/api/dept/create',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const newDept = {
        id: Date.now(),
        ...parsedBody,
        children: [],
      }
      
      // 添加到父节点
      function addToParent(tree: any[], parentId: number, newNode: any): boolean {
        for (const node of tree) {
          if (node.id === parentId) {
            node.children = node.children || []
            node.children.push(newNode)
            return true
          }
          if (node.children?.length && addToParent(node.children, parentId, newNode)) {
            return true
          }
        }
        return false
      }
      
      addToParent(deptTree, parsedBody.parentId || 0, newDept)
      
      return { code: 200, message: '创建成功', data: newDept }
    },
  },

  // 更新部门
  {
    url: '/api/dept/update',
    method: 'put',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { id, ...data } = parsedBody
      
      function updateInTree(tree: any[]): boolean {
        for (const node of tree) {
          if (node.id === id) {
            Object.assign(node, data)
            return true
          }
          if (node.children?.length && updateInTree(node.children)) {
            return true
          }
        }
        return false
      }
      
      if (updateInTree(deptTree)) {
        return { code: 200, message: '更新成功' }
      }
      return { code: 404, message: '部门不存在' }
    },
  },

  // 删除部门
  {
    url: '/api/dept/delete',
    method: 'delete',
    response: ({ body, query }: any) => {
      let id: number
      if (query.id) {
        id = parseInt(query.id)
      } else {
        const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
        id = parsedBody.id
      }
      
      function deleteFromTree(tree: any[]): boolean {
        for (let i = 0; i < tree.length; i++) {
          if (tree[i].id === id) {
            tree.splice(i, 1)
            return true
          }
          if (tree[i].children?.length && deleteFromTree(tree[i].children)) {
            return true
          }
        }
        return false
      }
      
      if (deleteFromTree(deptTree)) {
        return { code: 200, message: '删除成功' }
      }
      return { code: 404, message: '部门不存在或存在子部门' }
    },
  },
]