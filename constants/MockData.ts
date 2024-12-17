/**
 * 模拟数据
 * 用于开发阶段展示UI效果
 */

import { ChatHistory } from '../types/chat';

export const mockChatHistories: ChatHistory[] = [
  {
    id: '1',
    title: '东京五日游规划',
    lastMessage: '已为您规划好5天的东京美食和景点游览路线',
    timestamp: new Date('2024-12-15T14:30:00'),
    destination: '东京',
    duration: '5天',
    status: 'completed',
  },
  {
    id: '2',
    title: '巴黎浪漫之旅',
    lastMessage: '正在为您优化卢浮宫和埃菲尔铁塔的参观时间',
    timestamp: new Date('2024-12-16T09:15:00'),
    destination: '巴黎',
    duration: '7天',
    status: 'planning',
  },
  {
    id: '3',
    title: '北京文化之旅',
    lastMessage: '故宫、长城、颐和园的行程已规划完成',
    timestamp: new Date('2024-12-14T18:20:00'),
    destination: '北京',
    duration: '4天',
    status: 'completed',
  },
  {
    id: '4',
    title: '纽约城市探索',
    lastMessage: '自由女神像和中央公园的游览建议已更新',
    timestamp: new Date('2024-12-16T11:45:00'),
    destination: '纽约',
    duration: '6天',
    status: 'planning',
  },
  {
    id: '5',
    title: '京都传统文化体验',
    lastMessage: '已取消规划',
    timestamp: new Date('2024-12-13T16:00:00'),
    destination: '京都',
    duration: '3天',
    status: 'cancelled',
  },
];
