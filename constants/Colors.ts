/**
 * 旅游AI应用的颜色主题配置
 * 设计灵感来自Airbnb的品牌设计语言，采用简洁现代的风格
 * 主色调：使用Airbnb标志性的珊瑚红色，搭配温暖的中性色调
 * 整体风格：简洁、现代、温馨
 */

// 主题色定义
const primary = '#FF5A5F';     // Airbnb的标志性珊瑚红
const secondary = '#00A699';   // 清新的青绿色，用于次要强调
const dark = '#484848';        // 主要文字颜色
const grey = '#767676';        // 次要文字颜色
const lightGrey = '#EBEBEB';   // 边框、分割线颜色
const white = '#FFFFFF';       // 背景色

export const Colors = {
  light: {
    // 基础颜色
    primary: primary,          // 主题色，用于重要按钮和强调
    secondary: secondary,      // 次要主题色，用于辅助强调
    background: white,         // 页面背景色
    card: white,              // 卡片背景色
    
    // 文字颜色
    text: dark,               // 主要文字
    textSecondary: grey,      // 次要文字
    textLight: '#717171',     // 浅色文字
    
    // 功能色
    tint: primary,            // 主要强调色
    link: secondary,          // 链接颜色
    success: '#008489',       // 成功状态
    error: '#FF5A5F',         // 错误状态
    warning: '#FFB400',       // 警告状态
    
    // 边框和分割线
    border: lightGrey,        // 边框颜色
    separator: '#F7F7F7',     // 分割线颜色
    
    // 导航和标签
    tabIconDefault: grey,     // 未选中的标签图标
    tabIconSelected: primary, // 选中的标签图标
    
    // 地图相关
    mapMarker: primary,       // 地图标记点
    mapRoute: secondary,      // 地图路线
  },
  dark: {
    // 基础颜色
    primary: primary,         // 保持主题色一致
    secondary: '#1FBFB8',     // 深色模式下的次要主题色
    background: '#1A1A1A',    // 深色背景
    card: '#2D2D2D',         // 深色卡片背景
    
    // 文字颜色
    text: '#F7F7F7',         // 主要文字
    textSecondary: '#B0B0B0', // 次要文字
    textLight: '#8F8F8F',    // 浅色文字
    
    // 功能色
    tint: primary,           // 主要强调色
    link: '#00C2B3',         // 深色模式链接色
    success: '#00A699',      // 成功状态
    error: '#FF5A5F',        // 错误状态
    warning: '#FFC400',      // 警告状态
    
    // 边框和分割线
    border: '#3D3D3D',       // 深色边框
    separator: '#2D2D2D',    // 深色分割线
    
    // 导航和标签
    tabIconDefault: '#8F8F8F', // 未选中的标签图标
    tabIconSelected: primary,  // 选中的标签图标
    
    // 地图相关
    mapMarker: primary,       // 地图标记点
    mapRoute: '#00C2B3',      // 深色模式地图路线
  },
} as const;
