/**
 * 聊天记录相关类型定义
 */

export interface ChatHistory {
  id: string;
  title: string;          // 对话标题
  lastMessage: string;    // 最后一条消息
  timestamp: Date;        // 最后更新时间
  destination?: string;   // 目的地
  duration?: string;      // 行程时长
  status: 'planning' | 'completed' | 'cancelled';  // 规划状态
}
