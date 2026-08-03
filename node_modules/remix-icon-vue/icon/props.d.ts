export declare const Props: {
    /**
     * 尺寸
     * @defaultValue `1em`
     */
    size: {
        type: (StringConstructor | NumberConstructor)[];
        default: () => null;
    };
    /**
     * 旋转
     */
    spin: {
        type: BooleanConstructor;
    };
    /**
     * 填充
     */
    fill: {
        type: BooleanConstructor;
    };
    /**
     * 图标颜色
     */
    color: {
        type: StringConstructor;
    };
};
