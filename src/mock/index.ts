// Mock 入口文件
// vite-plugin-mock 会自动扫描当前目录下的所有 .ts 文件
// 每个文件只要导出一个数组，数组中的每个对象都会被当作 mock 接口
// 注意：此文件不需要导出 mock 数组，否则会导致接口重复注册

export function setupProdMockServer() {
  // 生产环境Mock初始化（如果需要）
}
