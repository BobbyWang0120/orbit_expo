/**
 * 聊天记录相关类型定义
 */

export interface ChatHistory {
  id: string;
  title: string;          // 对话标题
  timestamp: Date;        // 最后更新时间
  destination: string;    // 目的地
  duration: string;      // 行程时长
}

export interface ChatMessage {
  id: string;
  content: string;       // 消息内容
  timestamp: Date;       // 发送时间
  sender: 'user' | 'ai'; // 发送者
  type?: 'text' | 'location' | 'itinerary'; // 消息类型
  metadata?: {           // 额外的消息数据
    locations?: Array<{
      name: string;
      description?: string;
      coordinates?: [number, number]; // [经度, 纬度]
    }>;
    itinerary?: Array<{
      day: number;
      activities: Array<{
        time: string;
        description: string;
        location?: string;
      }>;
    }>;
  };
}
