const Props = {
  /**
   * 尺寸
   * @defaultValue `1em`
   */
  size: {
    type: [String, Number],
    default: () => null
  },
  /**
   * 旋转
   */
  spin: {
    type: Boolean
  },
  /**
   * 填充
   */
  fill: {
    type: Boolean
  },
  /**
   * 图标颜色
   */
  color: {
    type: String
  }
};
export {
  Props
};
