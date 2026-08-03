// 登录认证相关Mock接口
export default [
  // 登录
  {
    url: '/api/auth/login',
    method: 'post',
    response: ({ body }: any) => {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body
      const { username, password } = parsedBody || {}
      if (!username || !password) {
        return { code: 400, message: '用户名和密码不能为空' }
      }

      const validUsers: Record<string, { pwd: string; user: any }> = {
        admin: {
          pwd: '123456',
          user: {
            userId: 1,
            username: 'admin',
            nickname: '超级管理员',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
            email: 'admin@shiqi.com',
            phone: '13800000001',
            roles: ['admin'],
            permissions: ['*:*:*'],
          },
        },
        editor: {
          pwd: '123456',
          user: {
            userId: 2,
            username: 'editor',
            nickname: '编辑员',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor',
            email: 'editor@shiqi.com',
            phone: '13800000002',
            roles: ['editor'],
            permissions: [
              'system:user:list',
              'system:user:add',
              'system:user:edit',
              'system:role:list',
              'system:menu:list',
            ],
          },
        },
        visitor: {
          pwd: '123456',
          user: {
            userId: 3,
            username: 'visitor',
            nickname: '访客',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=visitor',
            email: 'visitor@shiqi.com',
            phone: '13800000003',
            roles: ['visitor'],
            permissions: ['dashboard:view'],
          },
        },
      }

      const entry = validUsers[username]
      if (!entry || entry.pwd !== password) {
        return { code: 401, message: '用户名或密码错误' }
      }

      const token = `${username}-token-${Date.now()}`
      return {
        code: 200,
        message: '登录成功',
        token,
        user: entry.user,
      }
    },
  },

  // 获取用户信息
  {
    url: '/api/auth/userinfo',
    method: 'get',
    response: ({ headers }: any) => {
      const authHeader = headers?.Authorization || ''
      const token = authHeader.replace('Bearer ', '')
      const validTokens: Record<string, any> = {
        admin: {
          userId: 1,
          username: 'admin',
          nickname: '超级管理员',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
          email: 'admin@shiqi.com',
          phone: '13800000001',
          roles: ['admin'],
          permissions: ['*:*:*'],
        },
        editor: {
          userId: 2,
          username: 'editor',
          nickname: '编辑员',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=editor',
          email: 'editor@shiqi.com',
          phone: '13800000002',
          roles: ['editor'],
          permissions: [
            'system:user:list',
            'system:user:add',
            'system:user:edit',
            'system:role:list',
            'system:menu:list',
          ],
        },
        visitor: {
          userId: 3,
          username: 'visitor',
          nickname: '访客',
          avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=visitor',
          email: 'visitor@shiqi.com',
          phone: '13800000003',
          roles: ['visitor'],
          permissions: ['dashboard:view'],
        },
      }
      const username = token.split('-')[0]
      const user = validTokens[username]
      if (!user) {
        return { code: 401, message: 'Token无效或已过期' }
      }
      return { code: 200, message: 'success', ...user }
    },
  },

  // 退出登录
  {
    url: '/api/auth/logout',
    method: 'post',
    response: () => ({ code: 200, message: '退出成功' }),
  },
]