import Mock from 'mockjs'

// Dashboard统计数据
export default [
  // 获取首页统计概览
  {
    url: '/api/dashboard/stats',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: {
          userStats: {
            total: 12580,
            todayNew: 128,
            weekGrowth: 12.5,
            monthGrowth: 28.3,
          },
          orderStats: {
            total: 8962,
            todayOrder: 356,
            todayAmount: 58960,
            completionRate: 94.8,
          },
          visitStats: {
            todayPv: 45689,
            todayUv: 12356,
            avgStayTime: '5m 32s',
            bounceRate: 38.6,
          },
          systemStats: {
            cpuUsage: 65.2,
            memoryUsage: 72.8,
            diskUsage: 58.4,
            onlineUsers: 256,
          },
        },
      }
    },
  },

  // 获取访问趋势数据
  {
    url: '/api/dashboard/visit-trend',
    method: 'get',
    response: () => {
      const dates = []
      const pvData = []
      const uvData = []
      
      for (let i = 29; i >= 0; i--) {
        const date = new Date()
        date.setDate(date.getDate() - i)
        dates.push(date.toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }))
        pvData.push(Mock.mock('@integer(30000, 60000)'))
        uvData.push(Mock.mock('@integer(8000, 15000)'))
      }
      
      return {
        code: 200,
        message: 'success',
        data: { dates, pvData, uvData },
      }
    },
  },

  // 获取热门页面排行
  {
    url: '/api/dashboard/hot-pages',
    method: 'get',
    response: () => {
      const pages = [
        { path: '/dashboard', title: '首页', pv: 15689, uv: 4523 },
        { path: '/system/user', title: '用户管理', pv: 8932, uv: 2156 },
        { path: '/system/role', title: '角色管理', pv: 6543, uv: 1892 },
        { path: '/system/dept', title: '部门管理', pv: 5421, uv: 1654 },
        { path: '/system/dict', title: '图标管理', pv: 4235, uv: 1234 },
        { path: '/system/online', title: '在线用户', pv: 3654, uv: 1087 },
        { path: '/profile', title: '个人中心', pv: 2876, uv: 956 },
        { path: '/settings', title: '系统设置', pv: 2134, uv: 789 },
      ]
      
      return {
        code: 200,
        message: 'success',
        data: pages,
      }
    },
  },

  // 获取最近操作日志
  {
    url: '/api/dashboard/recent-logs',
    method: 'get',
    response: () => {
      const logs = []
      const actions = ['登录系统', '修改密码', '新增用户', '删除角色', '导出数据', '上传文件']
      const modules = ['用户管理', '角色管理', '部门管理', '系统设置']
      
      for (let i = 0; i < 10; i++) {
        logs.push({
          id: i + 1,
          user: Mock.mock('@cname'),
          action: actions[Math.floor(Math.random() * actions.length)],
          module: modules[Math.floor(Math.random() * modules.length)],
          time: Mock.mock('@datetime("MM-dd HH:mm:ss")'),
          ip: Mock.mock('@ip'),
          status: Math.random() > 0.1 ? 'success' : 'fail',
        })
      }
      
      return {
        code: 200,
        message: 'success',
        data: logs,
      }
    },
  },

  // 获取快捷操作菜单
  {
    url: '/api/dashboard/quick-actions',
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'success',
        data: [
          { icon: 'User', title: '新建用户', path: '/system/user', color: '#409EFF' },
          { icon: 'UserFilled', title: '角色配置', path: '/system/role', color: '#67C23A' },
          { icon: 'Document', title: '生成报表', path: '', color: '#E6A23C' },
          { icon: 'Message', title: '发送通知', path: '', color: '#F56C6C' },
          { icon: 'Setting', title: '系统设置', path: '', color: '#909399' },
          { icon: 'Files', title: '文件管理', path: '', color: '#00CED1' },
        ],
      }
    },
  },
]