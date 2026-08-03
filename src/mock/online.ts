import Mock from 'mockjs'

// 在线用户列表
function generateOnlineUsers() {
  const users: any[] = []
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera']
  const osList = ['Windows 10', 'Windows 11', 'macOS', 'Linux', 'iOS', 'Android']
  
  for (let i = 0; i < 30; i++) {
    users.push({
      id: i + 1,
      sessionId: `session_${Mock.mock('@guid')}`,
      username: Mock.mock('@first'),
      nickname: Mock.mock('@cname'),
      ip: Mock.mock('@ip'),
      location: Mock.mock('@city(true)'),
      browser: browsers[Math.floor(Math.random() * browsers.length)],
      os: osList[Math.floor(Math.random() * osList.length)],
      loginTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      lastAccessTime: Mock.mock('@datetime("yyyy-MM-dd HH:mm:ss")'),
      status: Math.random() > 0.1 ? 'online' : 'offline',
    })
  }
  
  return users.sort((a, b) => 
    new Date(b.lastAccessTime).getTime() - new Date(a.lastAccessTime).getTime()
  )
}

const onlineUsers = generateOnlineUsers()

// 在线用户相关Mock接口
export default [
  // 获取在线用户列表
  {
    url: '/api/online/list',
    method: 'get',
    response: ({ query }: any) => {
      const { page = 1, pageSize = 10, username } = query || {}
      
      let filteredList = onlineUsers.filter((u) => u.status === 'online')
      
      if (username) {
        filteredList = filteredList.filter((item) =>
          item.username.includes(username) || item.nickname.includes(username)
        )
      }

      const start = (page - 1) * pageSize
      const end = start + parseInt(pageSize)
      
      return {
        code: 200,
        message: 'success',
        data: {
          list: filteredList.slice(start, end),
          total: filteredList.length,
          onlineCount: filteredList.length,
          totalCount: onlineUsers.length,
          page: parseInt(page),
          pageSize: parseInt(pageSize),
        },
      }
    },
  },

  // 强制下线
  {
    url: '/api/online/force-logout',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { sessionId } = parsedBody
      
      const user = onlineUsers.find((u) => u.sessionId === sessionId)
      if (user) {
        user.status = 'offline'
        return { code: 200, message: '已强制下线' }
      }
      
      return { code: 404, message: '会话不存在' }
    },
  },

  // 批量强制下线
  {
    url: '/api/online/batch-force-logout',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { sessionIds } = parsedBody
      
      let count = 0
      sessionIds.forEach((sessionId: string) => {
        const user = onlineUsers.find((u) => u.sessionId === sessionId)
        if (user && user.status === 'online') {
          user.status = 'offline'
          count++
        }
      })
      
      return { code: 200, message: `已强制下线${count}个用户` }
    },
  },

  // 获取在线统计
  {
    url: '/api/online/stats',
    method: 'get',
    response: () => {
      const onlineCount = onlineUsers.filter((u) => u.status === 'online').length
      const todayCount = onlineUsers.filter(
        (u) => u.loginTime.startsWith(new Date().toISOString().split('T')[0])
      ).length
      
      return {
        code: 200,
        message: 'success',
        data: {
          totalOnline: onlineCount,
          todayLogin: todayCount,
          peakOnline: Math.floor(onlineCount * 1.5),
          avgOnlineTime: '2h 35min',
        },
      }
    },
  },
]