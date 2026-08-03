/**
 * 图标接口
 */
export interface TProps {
    size?: string | number;
    spin?: boolean;
    fill?: boolean;
    color?: string;
}
/**
 * 按钮样式接口
 */
export interface TIconStyle {
    '--icon-size': string | number;
    '--icon-color': string;
}
