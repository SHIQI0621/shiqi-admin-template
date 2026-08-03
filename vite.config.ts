import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { viteMockServe } from 'vite-plugin-mock'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    // 自动导入 API（Vue、VueRouter、Pinia 等）
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      resolvers: [ElementPlusResolver()],
      dts: 'src/auto-imports.d.ts',
      eslintrc: {
        enabled: true,
      },
    }),
    // 自动导入组件（Element Plus 组件等）
    Components({
      resolvers: [ElementPlusResolver()],
      dts: 'src/components.d.ts',
    }),
    viteMockServe({
      mockPath: './src/mock',
      enable: true,           // 全局启用 mock
      watchFiles: true,       // 监听 mock 文件变化
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 9000,
    open: true,
    allowedHosts: [
      '5f38fb9.r12.cpolar.top', // 添加你的自定义域名或IP地址
    ]
  },
})
