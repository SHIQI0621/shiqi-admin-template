// 主题配置
export interface ThemeConfig {
  primaryColor: string      // 主题色
  isGrey: boolean           // 是否色弱模式
  sidebarTheme: 'black' | 'light' | 'header-color'  // 侧边栏主题
  showWatermark: boolean    // 是否显示水印
  watermarkText: string     // 水印内容
  watermarkOpacity: number  // 水印透明度
  watermarkFontSize: number // 水印字体大小
}

// 用户信息
export interface UserInfo {
  userId: number
  username: string
  nickname: string
  avatar: string
  email: string
  phone: string
  roles: string[]
  permissions: string[]
}

// 登录响应
export interface LoginResponse {
  token: string
  user: UserInfo
}

// 布局配置
export interface LayoutConfig {
  mode: 'left' | 'top'   // 布局模式
  fixedHeader: boolean            // 固定顶栏
  showSidebarLogo: boolean        // 显示侧边栏Logo
  showTagsView: boolean           // 显示标签页导航
  showBreadcrumb: boolean         // 显示面包屑
  showCopyright: boolean          // 显示 版权信息
  isCollapse: boolean             // 侧边栏折叠状态
  isMobile: boolean               // 移动端状态
  showSettings: boolean           // 显示设置面板
  tagsViewStyle: '' | 'card'      // 标签页样式：谷歌标签页 / 卡片 / 谷歌卡片
  menuBgColor: string             // 菜单背景色（混合模式）
  dynamicTitle: boolean           // 动态标题（显示路由标题）
  uniqueOpened: boolean           // 唯一打开标签页（点击标签页时只打开一个标签页）
}

// 默认主题配置
export const defaultThemeConfig: ThemeConfig = {
  primaryColor: '#1890ff',
  isGrey: false,
  sidebarTheme: 'black',
  showWatermark: false,
  watermarkText: '拾柒管理系统',
  watermarkOpacity: 0.15,
  watermarkFontSize: 16,
}

// 默认布局配置
export const defaultLayoutConfig: LayoutConfig = {
  mode: 'left',
  fixedHeader: true,
  showSidebarLogo: true,
  showTagsView: true,
  showBreadcrumb: true,
  showCopyright: true,
  isCollapse: false,
  isMobile: false,
  showSettings: false,
  tagsViewStyle: 'card',
  menuBgColor: '#001529',
  dynamicTitle: true,
  uniqueOpened: true,
}
