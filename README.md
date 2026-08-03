# shiqi-admin-template

> 拾柒后台管理系统 - 基于 Vue3 + TypeScript + Vite 的现代化后台管理模板

[English](./README.en.md) | 简体中文

## 项目简介

**shiqi-admin-template** 是一个基于 Vue3、TypeScript 和 Vite 构建的企业级后台管理系统模板。它集成了 Element Plus 组件库、Pinia 状态管理、Vue Router 路由管理等现代化前端技术栈，提供了完整的系统管理功能、权限控制、动态路由、主题配置等特性，并内置了 28+ 个开箱即用的功能组件与 7 个自定义 Hooks，可快速用于构建各类后台管理应用。

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue | ^3.5.39 | 渐进式 JavaScript 框架 |
| TypeScript | ~6.0.2 | 类型安全的 JavaScript 超集 |
| Vite | ^8.1.1 | 下一代前端构建工具 |
| Element Plus | ^2.14.3 | Vue3 组件库 |
| Pinia | ^4.0.2 | Vue 状态管理库 |
| Vue Router | ^4.6.4 | Vue 路由管理 |
| Axios | ^1.18.1 | HTTP 客户端 |
| ECharts | ^6.1.0 | 数据可视化图表库 |
| wangEditor | ^5.1.23 | 富文本编辑器 |
| Sass | ^1.101.7 | CSS 预处理器 |
| Mock.js | ^1.1.0 | 数据模拟工具 |
| NProgress | ^0.2.0 | 页面加载进度条 |
| unplugin-auto-import | ^21.0.0 | API 自动导入 |
| unplugin-vue-components | ^32.1.0 | 组件自动导入 |
| vite-plugin-mock | ^3.0.2 | 本地 Mock 服务 |

## 功能特性

### 系统功能

- **登录认证** - 完整的登录、退出流程，支持 Token 持久化存储
- **权限控制** - 基于角色的路由权限校验，支持动态路由生成
- **角色管理** - 角色的增删改查，支持权限分配
- **用户管理** - 用户信息管理，支持状态切换、批量操作
- **菜单管理** - 动态菜单配置，支持树形结构
- **部门管理** - 部门组织架构管理，支持树形结构
- **岗位管理** - 岗位信息管理
- **字典管理** - 字典类型和字典数据的管理
- **参数设置** - 系统参数配置管理
- **通知公告** - 通知公告的发布和管理
- **日志管理** - 操作日志和登录日志的查看

### 系统监控

- **在线用户** - 查看当前在线用户列表，支持强制下线
- **定时任务** - 定时任务的管理和日志查看
- **数据监控** - Druid 数据源监控信息
- **服务监控** - 服务器 CPU、内存、磁盘等资源监控
- **缓存监控** - Redis 缓存监控信息

### 系统工具

- **表单构建** - 可视化表单设计器
- **代码生成** - 基于数据库表的代码生成工具
- **系统接口** - API 文档管理（Swagger 风格）

### 功能组件库

内置 28+ 个通用功能组件，每个组件均有独立的演示页面，可直接复用于业务开发：

| 组件 | 说明 |
|------|------|
| AnimatedNumber | 数字动画（递增/递减展示） |
| AvatarList | 头像列表（含溢出折叠） |
| BaseTag | 基础标签（多类型/主题/可关闭） |
| Card | 卡片组件（二次封装 el-card） |
| Chart | 图表组件（基于 ECharts，支持主题联动） |
| CopyText | 点击复制文本 |
| Dialog | 对话框封装 |
| Draggable | 拖拽组件 |
| FullScreenToggle | 全屏切换 |
| HoverAnimateWrapper | 悬停动画包装器（17 种动画效果） |
| IconButton | 图标按钮（防抖/节流） |
| IconSelect | 图标选择器 |
| IconView | 图标预览（支持 Element Plus / Remix Icon） |
| ImageCropper | 图片裁剪 |
| ImagePreview | 图片预览 |
| LanguageSelector | 语言切换 |
| LockScreen | 锁屏 |
| Pagination | 分页组件 |
| QRCode | 二维码生成（6 种样式：标准/反色/圆角/圆点/渐变/带 Logo） |
| RichEditor | 富文本编辑器（基于 wangEditor） |
| RichParser | 富文本解析 |
| SettingsPanel | 设置面板（主题/布局可视化配置） |
| Signature | 电子签名（Canvas 手写签名） |
| SizeSelector | 组件尺寸切换 |
| TextEllipsis | 文本省略（支持展开/收起/复制/Tooltip） |
| Timeline | 时间线（自定义节点/图标/颜色） |
| Uploader | 文件上传（拖拽/多选/预览） |
| Watermark | 全屏水印 |

### 自定义 Hooks

内置 7 个实用的组合式函数，每个 Hook 均配有独立的演示页面：

| Hook | 说明 |
|------|------|
| useBarcode | 条形码生成（支持多种码制） |
| useCopyText | 复制文本到剪贴板（含降级方案） |
| useHoverAnimate | 悬停动画控制（编程式触发/自动播放） |
| useNetwork | 网络状态检测（在线/离线监听） |
| usePrint | 页面打印（指定区域/打印预览） |
| useVideo | 视频播放控制（播放/暂停/全屏） |
| useWatermark | 水印生成与销毁 |

### 自定义指令

| 指令 | 说明 |
|------|------|
| v-draggable | 元素拖拽 |
| v-ripple | 水波纹点击效果 |
| v-hover | 悬停动画（自动注入样式与事件） |
| v-ellipsis | 文本省略（指令式自动截断） |

### 用户体验

- **多布局模式** - 支持侧边栏和顶部菜单布局切换
- **主题配置** - 支持主题色、侧边栏主题、布局模式等可视化配置
- **标签页导航** - 支持多标签页管理，可缓存已访问页面
- **个人中心** - 用户个人信息查看和修改
- **AI 对话** - 集成 AI 智能对话页面
- **国际化** - Element Plus 组件级中/英文语言切换
- **锁屏** - 一键锁屏保护，解锁后恢复
- **全屏切换** - 全屏 / 退出全屏一键切换
- **响应式布局** - 移动端自动切换为抽屉式菜单

## 项目结构

```
shiqi-admin-template/
├── public/                     # 公共静态资源
├── src/
│   ├── api/                    # API 接口封装
│   ├── assets/                 # 静态资源（logo、图标等）
│   ├── components/             # 公共组件（28+）
│   │   ├── AnimatedNumber/     # 数字动画
│   │   ├── AvatarList/         # 头像列表
│   │   ├── BaseTag/            # 基础标签
│   │   ├── Card/               # 卡片组件
│   │   ├── Chart/              # 图表组件
│   │   ├── CopyText/           # 复制文本
│   │   ├── Dialog/             # 对话框封装
│   │   ├── Draggable/          # 拖拽组件
│   │   ├── FullScreenToggle/   # 全屏切换
│   │   ├── HoverAnimateWrapper/# 悬停动画包装器
│   │   ├── IconButton/         # 图标按钮
│   │   ├── IconSelect/         # 图标选择器
│   │   ├── IconView/           # 图标预览
│   │   ├── ImageCropper/       # 图片裁剪
│   │   ├── ImagePreview/       # 图片预览
│   │   ├── LanguageSelector/   # 语言切换
│   │   ├── LockScreen/         # 锁屏
│   │   ├── Pagination/         # 分页组件
│   │   ├── QRCode/             # 二维码
│   │   ├── RichEditor/         # 富文本编辑器
│   │   ├── RichParser/         # 富文本解析
│   │   ├── SettingsPanel/      # 设置面板
│   │   ├── Signature/          # 电子签名
│   │   ├── SizeSelector/       # 组件尺寸切换
│   │   ├── TextEllipsis/       # 文本省略
│   │   ├── Timeline/           # 时间线
│   │   ├── Uploader/           # 文件上传
│   │   └── Watermark/          # 水印
│   ├── directives/             # 自定义指令
│   │   ├── draggable.ts        # 元素拖拽指令
│   │   ├── ellipsis.ts         # 文本省略指令
│   │   ├── hover.ts            # 悬停动画指令
│   │   ├── ripple.ts           # 水波纹指令
│   │   └── index.ts            # 指令注册入口
│   ├── hooks/                  # 组合式函数（7 个）
│   │   ├── useBarcode.ts       # 条形码生成
│   │   ├── useCopyText.ts      # 复制文本
│   │   ├── useHoverAnimate.ts  # 悬停动画
│   │   ├── useNetwork.ts       # 网络状态
│   │   ├── usePrint.ts         # 页面打印
│   │   ├── useVideo.ts         # 视频播放
│   │   └── useWatermark.ts     # 水印生成
│   ├── layout/                 # 布局组件
│   │   ├── components/         # 布局子组件
│   │   │   ├── AppLogo.vue     # 应用 Logo
│   │   │   ├── AppMain.vue     # 主内容区域
│   │   │   ├── Breadcrumb.vue  # 面包屑导航
│   │   │   ├── FooterRight.vue # 底部右侧操作区
│   │   │   ├── Navbar.vue      # 顶部导航栏
│   │   │   ├── Sidebar.vue     # 侧边栏菜单
│   │   │   ├── SidebarItem.vue # 侧边栏菜单项
│   │   │   ├── TagsView.vue    # 标签页导航
│   │   │   ├── TopMenu.vue     # 顶部菜单
│   │   │   └── TopMenuItem.vue # 顶部菜单项（递归）
│   │   └── index.vue           # 布局入口
│   ├── mock/                   # Mock 数据
│   │   ├── auth.ts             # 认证相关接口
│   │   ├── dashboard.ts        # 仪表盘数据
│   │   ├── dept.ts             # 部门接口
│   │   ├── dict.ts             # 字典接口
│   │   ├── index.ts            # Mock 入口
│   │   ├── menu.ts             # 菜单接口（含权限）
│   │   ├── online.ts           # 在线用户接口
│   │   ├── role.ts             # 角色接口
│   │   └── user.ts             # 用户接口
│   ├── router/                 # 路由配置（含动态路由、权限守卫）
│   ├── stores/                 # Pinia 状态管理
│   │   ├── modules/            # 模块化 store
│   │   │   ├── app.ts          # 应用状态（语言、尺寸、锁屏、全屏）
│   │   │   ├── layout.ts       # 布局状态
│   │   │   ├── menu.ts         # 菜单 / 动态路由状态
│   │   │   ├── tagsView.ts     # 标签页状态
│   │   │   ├── theme.ts        # 主题状态
│   │   │   └── user.ts         # 用户状态
│   │   └── index.ts            # store 入口
│   ├── styles/                 # 全局样式
│   │   ├── index.scss          # 样式入口
│   │   ├── mixins.scss         # 样式混合
│   │   └── variables.scss      # 样式变量
│   ├── types/                  # TypeScript 类型定义
│   ├── utils/                  # 工具函数
│   │   ├── cache.ts            # 缓存工具
│   │   ├── performance.ts      # 性能工具
│   │   ├── request.ts          # 请求封装
│   │   └── router.ts           # 路由生成工具
│   ├── views/                  # 页面视图
│   │   ├── ai/                 # AI 对话
│   │   ├── dashboard/          # 首页仪表盘
│   │   ├── error/              # 错误页面（403 / 404）
│   │   ├── feature/            # 功能组件演示（19 个）
│   │   ├── hooks/              # 自定义 Hooks 演示（5 个）
│   │   ├── login/              # 登录页
│   │   ├── monitor/            # 系统监控
│   │   ├── profile/            # 个人中心
│   │   ├── system/             # 系统管理
│   │   └── tool/               # 系统工具
│   ├── App.vue                 # 根组件
│   ├── main.ts                 # 入口文件
│   └── setting.ts              # 系统配置
├── index.html                  # HTML 模板
├── vite.config.ts              # Vite 配置
├── tsconfig.json               # TypeScript 配置
└── package.json                # 依赖管理
```

## 快速开始

### 环境要求

- Node.js >= 18
- pnpm / npm / yarn（推荐 npm）

### 安装依赖

```bash
npm install
```

### 启动开发服务器

```bash
npm run dev
```

启动后自动打开浏览器，访问 http://localhost:9000 查看项目。

### 构建生产版本

```bash
npm run build
```

### 预览生产构建

```bash
npm run preview
```

## 使用说明

### 登录账号

系统提供以下测试账号（密码统一为 `123456`）：

| 用户名 | 密码 | 角色 | 权限说明 |
|--------|------|------|----------|
| admin | 123456 | 超级管理员 | 拥有所有菜单与功能权限 |
| editor | 123456 | 编辑员 | 拥有系统管理、部分监控与工具权限 |
| visitor | 123456 | 访客 | 仅拥有基础查看权限 |

> 账号数据由本地 Mock 提供，无需后端服务即可体验完整流程。

### 系统配置

系统配置文件位于 `src/setting.ts`，可配置以下项：

- `TOKEN_KEY` - Token 存储的 key 值（默认 `Shiqi-Token`）
- `APP_TITLE` - 系统标题名称（默认 `管理系统`）
- `APP_DIC` - 系统文档名称（默认 `SHIQI ADMIN TEMPLATE`）
- `MAX_CACHE_COUNT` - 可缓存的最大页面数量（默认 `10`）

### Vite 配置要点

`vite.config.ts` 已集成以下开箱即用能力：

- **`@` 路径别名** - 指向 `src` 目录
- **API / 组件自动导入** - 通过 `unplugin-auto-import` 与 `unplugin-vue-components`，Vue、Vue Router、Pinia API 及 Element Plus 组件均无需手动 import
- **Mock 服务** - 通过 `vite-plugin-mock`，开发环境自动启用，监听 `src/mock` 目录
- **开发端口** - 默认 `9000`，启动自动打开浏览器

### 缓存管理

缓存操作封装在 `src/utils/cache.ts`，支持：

- `setCache` - 设置缓存
- `getCache` - 获取缓存
- `removeCache` - 删除缓存
- `clearCache` - 清空缓存
- `getToken` / `setToken` / `removeToken` - Token 快捷操作

### 权限与动态路由

- 路由守卫位于 `src/router/index.ts`，登录后根据用户角色拉取菜单数据并动态生成业务路由
- 路由 `meta.roles` 控制页面级访问权限，权限不足将跳转至 `403` 页面
- 菜单数据源见 `src/mock/menu.ts`，可按角色配置可见菜单
- 支持任意层级嵌套菜单，无需修改路由配置，仅修改菜单数据即可

## 参与贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 本仓库
2. 新建 `Feat_xxx` 或 `Fix_xxx` 分支
3. 提交代码（提交信息请遵循规范）
4. 创建 Pull Request

## 许可证

[MIT License](./LICENSE)

## 联系方式

如有问题或建议，欢迎通过 Issue 或邮件联系。
