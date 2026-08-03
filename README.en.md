# shiqi-admin-template

> Shiqi Admin Template - Modern Admin Management System Based on Vue3 + TypeScript + Vite

English | [简体中文](./README.md)

## Project Introduction

**shiqi-admin-template** is an enterprise-level admin management system template built with Vue3, TypeScript, and Vite. It integrates modern frontend technologies including the Element Plus component library, Pinia state management, and Vue Router. It provides complete system management features, permission control, dynamic routing, theme configuration, and ships with 18+ ready-to-use functional component demos. It can be quickly used to build various admin management applications.

## Tech Stack

| Technology | Version | Description |
|------------|---------|-------------|
| Vue | ^3.5.39 | Progressive JavaScript Framework |
| TypeScript | ~6.0.2 | Type-safe JavaScript Superset |
| Vite | ^8.1.1 | Next-generation Frontend Build Tool |
| Element Plus | ^2.14.3 | Vue3 Component Library |
| Pinia | ^4.0.2 | Vue State Management |
| Vue Router | ^4.6.4 | Vue Routing |
| Axios | ^1.18.1 | HTTP Client |
| ECharts | ^6.1.0 | Data Visualization Library |
| wangEditor | ^5.1.23 | Rich Text Editor |
| Sass | ^1.101.7 | CSS Preprocessor |
| Mock.js | ^1.1.0 | Data Mocking Tool |
| NProgress | ^0.2.0 | Page Loading Progress Bar |
| unplugin-auto-import | ^21.0.0 | API Auto Import |
| unplugin-vue-components | ^32.1.0 | Component Auto Import |
| vite-plugin-mock | ^3.0.2 | Local Mock Service |

## Features

### System Management

- **Authentication** - Complete login/logout flow with Token persistence
- **Permission Control** - Role-based route permission verification with dynamic routing
- **Role Management** - CRUD operations for roles with permission assignment
- **User Management** - User information management with status switching and batch operations
- **Menu Management** - Dynamic menu configuration with tree structure support
- **Department Management** - Department organization management with tree structure
- **Post Management** - Position information management
- **Dictionary Management** - Dictionary type and data management
- **Config Management** - System parameter configuration
- **Notice Management** - Notification and announcement publishing
- **Log Management** - Operation and login log viewing

### System Monitoring

- **Online Users** - View online users list with force logout capability
- **Scheduled Jobs** - Task scheduling management and log viewing
- **Data Monitoring** - Druid data source monitoring
- **Server Monitoring** - CPU, memory, disk resource monitoring
- **Cache Monitoring** - Redis cache monitoring

### System Tools

- **Form Builder** - Visual form designer
- **Code Generator** - Database table-based code generation
- **API Documentation** - Swagger-style API documentation

### Functional Component Library

18+ reusable functional component demos built-in, ready to be reused in business development:

| Component | Description |
|-----------|-------------|
| AnimatedNumber | Number animation (count up/down) |
| AvatarList | Avatar list (with overflow collapse) |
| BaseTag | Base tag (add/remove/edit) |
| Card | Card component |
| Chart | Chart component (based on ECharts) |
| CopyText | Click to copy text |
| DraggableDialog | Draggable dialog |
| HoverAnimate | Hover animation transition |
| Icon | Icon management / select |
| IconButton | Icon button |
| ImageCropper | Image cropping |
| ImagePreview | Image preview |
| Network | Network status detection |
| QRCode | QR code generation |
| RichEditor | Rich text editor (based on wangEditor) |
| RippleEffect | Ripple click effect |
| TextEllipsis | Text ellipsis (with Tooltip) |
| Watermark | Fullscreen watermark |

### User Experience

- **Multi-layout** - Support sidebar and top menu layout switching
- **Theme Configuration** - Visual configuration of theme color, sidebar theme, layout mode, etc.
- **TagsView** - Multi-tab navigation with page caching
- **Profile Center** - User profile viewing and editing
- **AI Chat** - Integrated AI intelligent conversation page
- **Internationalization** - Element Plus component-level Chinese/English language switching
- **Lock Screen** - One-click lock screen protection, restored after unlocking
- **Fullscreen Toggle** - One-click fullscreen toggle

## Project Structure

```
shiqi-admin-template/
├── public/                     # Public Static Assets
├── src/
│   ├── api/                    # API Interface Wrapper
│   ├── assets/                 # Static Assets (logo, icons, etc.)
│   ├── components/             # Common Components
│   │   ├── AnimatedNumber/     # Number Animation
│   │   ├── AvatarList/         # Avatar List
│   │   ├── BaseTag/            # Base Tag
│   │   ├── Card/               # Card Component
│   │   ├── Chart/              # Chart Component
│   │   ├── CopyText/           # Copy Text
│   │   ├── Dialog/             # Dialog Wrapper
│   │   ├── Draggable/          # Drag Component
│   │   ├── FullScreenToggle/   # Fullscreen Toggle
│   │   ├── HoverAnimateWrapper/# Hover Animation Wrapper
│   │   ├── IconButton/         # Icon Button
│   │   ├── IconSelect/         # Icon Selector
│   │   ├── IconView/           # Icon Preview
│   │   ├── ImageCropper/       # Image Cropper
│   │   ├── ImagePreview/       # Image Preview
│   │   ├── LanguageSelector/   # Language Selector
│   │   ├── LockScreen/         # Lock Screen
│   │   ├── Pagination/         # Pagination Component
│   │   ├── QRCode/             # QR Code
│   │   ├── RichEditor/         # Rich Text Editor
│   │   ├── RichParser/         # Rich Text Parser
│   │   ├── SettingsPanel/      # Settings Panel
│   │   ├── SizeSelector/       # Component Size Selector
│   │   ├── TextEllipsis/       # Text Ellipsis
│   │   └── Watermark/          # Watermark
│   ├── directives/             # Custom Directives
│   │   ├── draggable.ts        # Element Drag Directive
│   │   ├── ripple.ts           # Ripple Directive
│   │   └── index.ts            # Directive Registration Entry
│   ├── hooks/                  # Composables
│   │   ├── useCopyText.ts      # Copy Text
│   │   ├── useNetwork.ts       # Network Status
│   │   └── useWatermark.ts     # Watermark Generation
│   ├── layout/                 # Layout Components
│   │   ├── components/         # Layout Sub-components
│   │   │   ├── AppLogo.vue     # App Logo
│   │   │   ├── AppMain.vue     # Main Content Area
│   │   │   ├── Breadcrumb.vue  # Breadcrumb Navigation
│   │   │   ├── FooterRight.vue # Footer Right Action Area
│   │   │   ├── Navbar.vue      # Top Navbar
│   │   │   ├── Sidebar.vue     # Sidebar Menu
│   │   │   ├── SidebarItem.vue # Sidebar Menu Item
│   │   │   ├── TagsView.vue    # Tags Navigation
│   │   │   ├── TopMenu.vue     # Top Menu
│   │   │   └── TopMenuItem.vue # Top Menu Item
│   │   └── index.vue           # Layout Entry
│   ├── mock/                   # Mock Data
│   │   ├── auth.ts             # Authentication API
│   │   ├── dashboard.ts        # Dashboard Data
│   │   ├── dept.ts             # Department API
│   │   ├── dict.ts             # Dictionary API
│   │   ├── index.ts            # Mock Entry
│   │   ├── menu.ts             # Menu API (with permissions)
│   │   ├── online.ts           # Online Users API
│   │   ├── role.ts             # Role API
│   │   └── user.ts             # User API
│   ├── router/                 # Router Configuration (with dynamic routing & guards)
│   ├── stores/                 # Pinia State Management
│   │   ├── modules/            # Modular Stores
│   │   │   ├── app.ts          # App State (locale, size, lock, fullscreen)
│   │   │   ├── layout.ts       # Layout State
│   │   │   ├── menu.ts         # Menu / Dynamic Routing State
│   │   │   ├── tagsView.ts     # Tags State
│   │   │   ├── theme.ts        # Theme State
│   │   │   └── user.ts         # User State
│   │   └── index.ts            # Stores Entry
│   ├── styles/                 # Global Styles
│   │   ├── index.scss          # Styles Entry
│   │   ├── mixins.scss         # Style Mixins
│   │   └── variables.scss      # Style Variables
│   ├── types/                  # TypeScript Type Definitions
│   ├── utils/                  # Utility Functions
│   │   ├── cache.ts            # Cache Utilities
│   │   ├── performance.ts      # Performance Utilities
│   │   ├── request.ts          # Request Wrapper
│   │   └── router.ts           # Route Generation Utility
│   ├── views/                  # Page Views
│   │   ├── ai/                 # AI Chat
│   │   ├── dashboard/          # Dashboard
│   │   ├── error/              # Error Pages (403 / 404)
│   │   ├── feature/            # Functional Component Demos (18)
│   │   ├── login/              # Login Page
│   │   ├── monitor/            # System Monitoring
│   │   ├── profile/            # Profile Center
│   │   ├── system/             # System Management
│   │   └── tool/               # System Tools
│   ├── App.vue                 # Root Component
│   ├── main.ts                 # Entry File
│   └── setting.ts              # System Configuration
├── index.html                  # HTML Template
├── vite.config.ts              # Vite Configuration
├── tsconfig.json               # TypeScript Configuration
└── package.json                # Dependency Management
```

## Quick Start

### Requirements

- Node.js >= 18
- pnpm / npm / yarn (npm recommended)

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

The browser opens automatically on startup. Visit http://localhost:9000 to view the project.

### Build Production Version

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Usage

### Login Accounts

The system provides the following test accounts (password is `123456` for all):

| Username | Password | Role | Permission |
|----------|----------|------|------------|
| admin | 123456 | Super Admin | All menus and features |
| editor | 123456 | Editor | System management, partial monitoring and tools |
| visitor | 123456 | Visitor | Basic read-only permissions |

> Account data is served by the local Mock, so you can experience the full flow without a backend service.

### System Configuration

System configuration file is located at `src/setting.ts`:

- `TOKEN_KEY` - Token storage key (default `Shiqi-Token`)
- `APP_TITLE` - Application title (default `管理系统`)
- `APP_DIC` - Application document name (default `SHIQI ADMIN TEMPLATE`)
- `MAX_CACHE_COUNT` - Maximum cacheable pages (default `10`)

### Vite Configuration Highlights

`vite.config.ts` ships with the following out-of-the-box capabilities:

- **`@` path alias** - Points to the `src` directory
- **API / Component auto-import** - Via `unplugin-auto-import` and `unplugin-vue-components`, Vue, Vue Router, Pinia APIs and Element Plus components need no manual import
- **Mock service** - Via `vite-plugin-mock`, automatically enabled in development, watches the `src/mock` directory
- **Dev port** - Defaults to `9000`, opens the browser automatically on startup

### Cache Management

Cache operations are encapsulated in `src/utils/cache.ts`:

- `setCache` - Set cache
- `getCache` - Get cache
- `removeCache` - Remove cache
- `clearCache` - Clear all cache
- `getToken` / `setToken` / `removeToken` - Token shortcuts

### Permission & Dynamic Routing

- The route guard is located at `src/router/index.ts`. After login, it fetches menu data based on the user role and dynamically generates business routes
- `meta.roles` on a route controls page-level access; insufficient permission redirects to the `403` page
- The menu data source is in `src/mock/menu.ts`, where visible menus can be configured per role

## Contributing

Welcome to contribute! Please follow these steps:

1. Fork this repository
2. Create a new branch `Feat_xxx` or `Fix_xxx`
3. Commit your code (follow commit message conventions)
4. Create a Pull Request

## License

[MIT License](./LICENSE)

## Contact

If you have any questions or suggestions, feel free to contact via Issue or email.
