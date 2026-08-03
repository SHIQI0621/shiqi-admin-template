// 导出所有组件和工具
export { default as IconSelect } from './index.vue'
export { default as Icon } from './Icon.vue'  // 通用图标组件
export { default as IconFont } from './IconFont'  // iconfont 组件
export { default as RemixIcon } from './RemixIcon.vue'  // remix icon 组件

// 导出工具函数和数据
export {
  remixIconsList,
  getAllRemixIcons,
  getRemixIconsByCategory,
  remixIconCategories,
  type RemixIconItem
} from './remixIcons'

// 默认导出 IconSelect
export { default as default } from './index.vue'
