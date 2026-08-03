/**
 * IconFont 图标组件
 * 用于支持阿里巴巴 iconfont 图标库
 * 
 * 使用方法：
 * 1. 在 index.html 中引入 iconfont 的 CSS 链接
 * 2. 使用 <IconFont name="icon-xxx" /> 组件
 */

import { defineComponent, h } from 'vue'

const IconFont = defineComponent({
  name: 'IconFont',
  props: {
    // 图标名称（不包含 icon- 前缀）
    name: {
      type: String,
      required: true
    },
    // 图标大小
    size: {
      type: [Number, String],
      default: 16
    },
    // 图标颜色
    color: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () => h(
      'svg',
      {
        class: 'iconfont',
        'aria-hidden': 'true',
        style: {
          fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
          color: props.color || undefined,
          width: '1em',
          height: '1em',
          verticalAlign: 'middle',
          fill: 'currentColor'
        }
      },
      [
        h('use', {
          href: `#icon-${props.name}`
        })
      ]
    )
  }
})

export default IconFont

/**
 * 常用的 iconfont 图标列表示例
 * 实际使用时请根据你的 iconfont 项目修改
 */
export const commonIconFonts = [
  { name: 'home', label: '首页' },
  { name: 'user', label: '用户' },
  { name: 'setting', label: '设置' },
  { name: 'menu', label: '菜单' },
  { name: 'role', label: '角色' },
  { name: 'dept', label: '部门' },
  { name: 'post', label: '岗位' },
  { name: 'dict', label: '字典' },
  { name: 'monitor', label: '监控' },
  { name: 'job', label: '任务' },
  { name: 'server', label: '服务器' },
  { name: 'online', label: '在线' },
  { name: 'tool', label: '工具' },
  { name: 'build', label: '构建' },
  { name: 'code', label: '代码' },
  { name: 'link', label: '链接' },
  { name: 'edit', label: '编辑' },
  { name: 'delete', label: '删除' },
  { name: 'search', label: '搜索' },
  { name: 'add', label: '添加' },
]
