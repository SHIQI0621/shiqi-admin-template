/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'nprogress' {
  interface NProgressOptions {
    minimum: number
    speed: number
    trickleSpeed: number
    showSpinner: boolean
    template: string
    color: string
    trickle: boolean
  }

  interface NProgress {
    start(): NProgress
    done(): NProgress
    set(value: number): NProgress
    isStarted(): boolean
    configure(options: Partial<NProgressOptions>): NProgress
  }

  const nprogress: NProgress
  export default nprogress
}

// Mock 类型声明
declare module 'mockjs' {
  interface Mockjs {
    mock(template: any): any
    random: any
    '@guid'(): string
    '@first'(): string
    '@cname'(): string
    '@email'(): string
    '@ip'(): string
    '@city'(): string
    '@datetime'(format?: string): string
    '@integer'(min?: number, max?: number): number
  }
  
  const Mock: Mockjs
  export default Mock
}

// vite-plugin-mock 类型声明
declare module 'vite-plugin-mock' {
  import { Plugin } from 'vite'
  
  interface ViteMockServeOptions {
    mockPath?: string
    localEnabled?: boolean
    prodEnabled?: boolean
    injectCode?: string
  }
  
  export default function viteMockServe(options?: ViteMockServeOptions): Plugin
}
