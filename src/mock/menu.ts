// 菜单相关Mock接口
export default [
  // 获取菜单列表（根据用户权限）
  {
    url: '/api/system/menu/list',
    method: 'get',
    response: ({ headers }: any) => {
      const authHeader = headers?.Authorization || headers?.authorization || ''
      const token = authHeader.replace('Bearer ', '')
      const username = token.split('-')[0]

      // 所有用户都能访问的基础菜单
      const baseMenus = [
        {
          id: 1,
          path: '/dashboard',
          name: 'Dashboard',
          title: '首页',
          icon: 'Odometer',
          component: 'views/dashboard/index.vue',
          affix: true,
          children: [],
        },
        {
          id: 2,
          path: '/ai',
          name: 'AIChat',
          title: 'AI对话',
          icon: 'ChatDotRound',
          component: 'views/ai/index.vue',
          children: [],
        },
        {
          id: 6,
          path: '/feature',
          name: 'Feature',
          title: '功能组件',
          icon: 'HelpFilled',
          children: [
            {
              id: 61,
              path: '/feature/avatarList',
              name: 'AvatarList',
              title: '头像列表',
              icon: 'User',
              component: 'views/feature/avatarList/index.vue'
            },
            {
              id: 63,
              path: '/feature/richEditor',
              name: 'RichEditor',
              title: '富文本编辑器',
              icon: 'Edit',
              component: 'views/feature/richEditor/index.vue',
            },
            {
              id: 64,
              path: '/feature/rippleEffect',
              name: 'RippleEffect',
              title: '水波纹效果',
              icon: 'MagicStick',
              component: 'views/feature/rippleEffect/index.vue',
            },
            {
              id: 65,
              path: '/feature/watermark',
              name: 'Watermark',
              title: '水印',
              icon: 'Opportunity',
              component: 'views/feature/watermark/index.vue',
            },
            {
              id: 66,
              path: '/feature/imageCropper',
              name: 'ImageCropper',
              title: '图片裁剪',
              icon: 'Crop',
              component: 'views/feature/imageCropper/index.vue',
            },
            {
              id: 67,
              path: '/feature/qrCode',
              name: 'QRCode',
              title: '二维码',
              icon: 'Connection',
              component: 'views/feature/qrCode/index.vue',
            },
            {
              id: 68,
              path: '/feature/animatedNumber',
              name: 'AnimatedNumber',
              title: '数字动画',
              icon: 'Odometer',
              component: 'views/feature/animatedNumber/index.vue',
            },
            {
              id: 69,
              path: '/feature/draggableDialog',
              name: 'DraggableDialog',
              title: '拖拽对话框',
              icon: 'Grid',
              component: 'views/feature/draggableDialog/index.vue',
            },
            {
              id: 70,
              path: '/feature/network',
              name: 'NetworkMonitor',
              title: '网络状态',
              icon: 'Connection',
              component: 'views/feature/network/index.vue',
            },
            {
              id: 71,
              path: '/feature/chart',
              name: 'ChartDemo',
              title: '图表组件',
              icon: 'TrendCharts',
              component: 'views/feature/chart/index.vue',
            },
            {
              id: 72,
              path: '/feature/imagePreview',
              name: 'ImagePreviewDemo',
              title: '图片预览',
              icon: 'Picture',
              component: 'views/feature/imagePreview/index.vue',
            },
            {
              id: 73,
              path: '/feature/iconButton',
              name: 'IconButtonDemo',
              title: '图标按钮',
              icon: 'HelpFilled',
              component: 'views/feature/iconButton/index.vue',
            },
            {
              id: 74,
              path: '/feature/card',
              name: 'CardDemo',
              title: '卡片组件',
              icon: 'Document',
              component: 'views/feature/card/index.vue',
            },
            {
              id: 75,
              path: '/feature/icon',
              name: 'IconManagement',
              title: '图标管理',
              icon: 'Star',
              component: 'views/feature/icon/index.vue',
            },
           
            {
              id: 77,
              path: '/feature/textEllipsis',
              name: 'TextEllipsisDemo',
              title: '文本省略',
              icon: 'Tickets',
              component: 'views/feature/textEllipsis/index.vue',
            },
            {
              id: 78,
              path: '/feature/baseTag',
              name: 'BaseTagDemo',
              title: '基础标签',
              icon: 'PriceTag',
              component: 'views/feature/baseTag/index.vue',
            },
            {
              id: 79,
              path: '/feature/signature',
              name: 'SignatureDemo',
              title: '电子签名',
              icon: 'EditPen',
              component: 'views/feature/signature/index.vue',
            },
            {
              id: 80,
              path: '/feature/uploader',
              name: 'UploaderDemo',
              title: '文件上传',
              icon: 'Upload',
              component: 'views/feature/uploader/index.vue',
            },
            {
              id: 81,
              path: '/feature/timeline',
              name: 'TimelineDemo',
              title: '时间线',
              icon: 'Clock',
              component: 'views/feature/timeline/index.vue',
            }
          ],
        },
        {
          id: 8,
          path: '/hooks',
          name: 'Hooks&插件',
          title: '自定义Hooks',
          icon: 'Box',
          children: [
            {
              id: 81,
              path: '/hooks/print',
              name: 'PrintDemo',
              title: '页面打印',
              icon: 'Printer',
              component: 'views/hooks/print/index.vue',
            },
             {
              id: 82,
              path: '/hooks/hoverAnimate',
              name: 'HoverAnimateDemo',
              title: 'Hover动画',
              icon: 'MagicStick',
              component: 'views/hooks/hoverAnimate/index.vue',
            },
            {
              id: 83,
              path: '/hooks/copyText',
              name: 'CopyText',
              title: '复制文本',
              icon: 'CopyDocument',
              component: 'views/hooks/copyText/index.vue',
            },
            {
              id: 84,
              path: '/hooks/video',
              name: 'VideoDemo',
              title: '视频播放',
              icon: 'VideoPlay',
              component: 'views/hooks/video/index.vue',
            },
            {
              id: 85,
              path: '/hooks/barcode',
              name: 'BarcodeDemo',
              title: '条形码生成',
              icon: 'Grid',
              component: 'views/hooks/barcode/index.vue',
            },
          ],
        }
      ]

      // 管理员菜单
      const adminMenus = [
        ...baseMenus,
        {
          id: 3,
          path: '/system',
          name: 'System',
          title: '系统管理',
          icon: 'Setting',
          children: [
            { id: 31, path: '/system/user', name: 'UserManagement', title: '用户管理', icon: 'User', component: 'views/system/user/index.vue' },
            { id: 32, path: '/system/role', name: 'RoleManagement', title: '角色管理', icon: 'UserFilled', component: 'views/system/role/index.vue' },
            { id: 33, path: '/system/menu', name: 'MenuManagement', title: '菜单管理', icon: 'Menu', component: 'views/system/menu/index.vue' },
            { id: 34, path: '/system/dept', name: 'DeptManagement', title: '部门管理', icon: 'OfficeBuilding', component: 'views/system/dept/index.vue' },
            { id: 35, path: '/system/post', name: 'PostManagement', title: '岗位管理', icon: 'Postcard', component: 'views/system/post/index.vue' },
            { id: 36, path: '/system/dict', name: 'DictManagement', title: '字典管理', icon: 'Document', component: 'views/system/dict/index.vue' },
            { id: 37, path: '/system/config', name: 'ConfigManagement', title: '参数设置', icon: 'Setting', component: 'views/system/config/index.vue' },
            { id: 38, path: '/system/notice', name: 'NoticeManagement', title: '通知公告', icon: 'Bell', component: 'views/system/notice/index.vue' },
            { id: 39, path: '/system/log', name: 'LogManagement', title: '日志管理', icon: 'Document', component: 'views/system/log/index.vue' },
          ],
        },
        {
          id: 4,
          path: '/monitor',
          name: 'Monitor',
          title: '系统监控',
          icon: 'Monitor',
          children: [
            { id: 41, path: '/monitor/online', name: 'OnlineUser', title: '在线用户', icon: 'Monitor', component: 'views/system/online/index.vue' },
            { id: 42, path: '/monitor/job', name: 'JobManagement', title: '定时任务', icon: 'Timer', component: 'views/monitor/job/index.vue' },
            { id: 43, path: '/monitor/druid', name: 'DruidMonitor', title: '数据监控', icon: 'DataAnalysis', component: 'views/monitor/druid/index.vue' },
            { id: 44, path: '/monitor/server', name: 'ServerMonitor', title: '服务监控', icon: 'Platform', component: 'views/monitor/server/index.vue' },
            { id: 45, path: '/monitor/cache', name: 'CacheMonitor', title: '缓存监控', icon: 'Coin', component: 'views/monitor/cache/index.vue' },
          ],
        },
        {
          id: 5,
          path: '/tool',
          name: 'Tool',
          title: '系统工具',
          icon: 'Tools',
          children: [
            { id: 51, path: '/tool/build', name: 'FormBuild', title: '表单构建', icon: 'EditPen', component: 'views/tool/build/index.vue' },
            { id: 52, path: '/tool/gen', name: 'CodeGen', title: '代码生成', icon: 'Cpu', component: 'views/tool/gen/index.vue' },
            { id: 53, path: '/tool/swagger', name: 'SwaggerApi', title: '系统接口', icon: 'Connection', component: 'views/tool/swagger/index.vue' },
          ],
        },
        {
          id: 8,
          path: '/external',
          name: 'External',
          title: '文档',
          icon: 'Link',
          children: [
            { id: 81, path: '/external/vue', name: 'ExternalVue', title: 'Vue官网', icon: 'Link', isLink: true, linkUrl: 'https://cn.vuejs.org/' },
            { id: 83, path: '/external/shiqiAdmin', name: 'ExternalShiqiAdmin', title: '项目文档', icon: 'Link', isLink: true, linkUrl: 'https://shiqi-admin.github.io/' },
            { id: 82, path: '/external/element', name: 'ExternalElement', title: 'Element Plus', icon: 'Link', isLink: true, linkUrl: 'https://element-plus.org/zh-CN/' },
            { id: 83, path: '/external/github', name: 'ExternalGithub', title: 'GitHub仓库', icon: 'Link', isLink: true, linkUrl: 'https://github.com/vuejs/core' },
          ],
        },
      ]

      // 编辑员菜单
      const editorMenus = [
        ...baseMenus,
        {
          id: 3,
          path: '/system',
          name: 'System',
          title: '系统管理',
          icon: 'Setting',
          children: [
            { id: 31, path: '/system/user', name: 'UserManagement', title: '用户管理', icon: 'User', component: 'views/system/user/index.vue' },
            { id: 32, path: '/system/role', name: 'RoleManagement', title: '角色管理', icon: 'UserFilled', component: 'views/system/role/index.vue' },
            { id: 33, path: '/system/menu', name: 'MenuManagement', title: '菜单管理', icon: 'Menu', component: 'views/system/menu/index.vue' },
            { id: 38, path: '/system/notice', name: 'NoticeManagement', title: '通知公告', icon: 'Bell', component: 'views/system/notice/index.vue' },
          ],
        },
        {
          id: 4,
          path: '/monitor',
          name: 'Monitor',
          title: '系统监控',
          icon: 'Monitor',
          children: [
            { id: 41, path: '/monitor/online', name: 'OnlineUser', title: '在线用户', icon: 'Monitor', component: 'views/system/online/index.vue' },
            { id: 44, path: '/monitor/server', name: 'ServerMonitor', title: '服务监控', icon: 'Platform', component: 'views/monitor/server/index.vue' },
          ],
        },
        {
          id: 5,
          path: '/tool',
          name: 'Tool',
          title: '系统工具',
          icon: 'Tools',
          children: [
            { id: 51, path: '/tool/build', name: 'FormBuild', title: '表单构建', icon: 'EditPen', component: 'views/tool/build/index.vue' },
          ],
        },
        {
          id: 8,
          path: '/external',
          name: 'External',
          title: '外部链接',
          icon: 'Link',
          children: [
            { id: 81, path: '/external/vue', name: 'ExternalVue', title: 'Vue官网', icon: 'Link', isLink: true, linkUrl: 'https://cn.vuejs.org/' },
            { id: 82, path: '/external/element', name: 'ExternalElement', title: 'Element Plus', icon: 'Link', isLink: true, linkUrl: 'https://element-plus.org/zh-CN/' },
          ],
        },
      ]

      // 访客菜单
      const visitorMenus = [
        ...baseMenus,
      ]

      const menusByRole: Record<string, any[]> = {
        admin: adminMenus,
        editor: editorMenus,
        visitor: visitorMenus,
      }

      const menus = menusByRole[username] || visitorMenus
      return {
        code: 200,
        message: 'success',
        data: menus,
      }
    },
  },
]
