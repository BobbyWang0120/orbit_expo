/**
 * 模拟数据
 * 用于开发阶段展示UI效果
 */

import { ChatHistory, ChatMessage } from '../types/chat';

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

// 模拟的东京五日游对话数据
export const mockTokyoMessages: ChatMessage[] = [
  {
    id: '1',
    content: '你好，我想规划一次东京五日游，主要想体验当地美食和特色景点。',
    timestamp: new Date('2024-12-15T10:00:00'),
    sender: 'user',
  },
  {
    id: '2',
    content: '您好！我很乐意帮您规划东京之旅。东京是一个美食与文化并存的城市。请问您有特别想去的地方或者特别感兴趣的日本料理吗？',
    timestamp: new Date('2024-12-15T10:00:30'),
    sender: 'ai',
  },
  {
    id: '3',
    content: '我特别想去筑地市场吃新鲜寿司，还有想去浅草寺和明治神宫感受日本文化。',
    timestamp: new Date('2024-12-15T10:01:00'),
    sender: 'user',
  },
  {
    id: '4',
    content: '非常好的选择！根据您的兴趣，我为您规划了一个初步的行程安排：',
    timestamp: new Date('2024-12-15T10:01:30'),
    sender: 'ai',
    type: 'itinerary',
    metadata: {
      itinerary: [
        {
          day: 1,
          activities: [
            {
              time: '上午',
              description: '筑地市场寿司体验',
              location: '筑地市场'
            },
            {
              time: '下午',
              description: '浅草寺参观',
              location: '浅草寺'
            },
            {
              time: '晚上',
              description: '晴空塔夜景',
              location: '晴空塔'
            }
          ]
        }
      ]
    }
  },
  {
    id: '5',
    content: '这些地方听起来都很棒！请问筑地市场最好是什么时候去？',
    timestamp: new Date('2024-12-15T10:02:00'),
    sender: 'user',
  },
  {
    id: '6',
    content: '建议清晨5:30-6:00到达筑地市场，因为：\n1. 这时能看到最新鲜的海鲜\n2. 很多知名寿司店上午11点前就会满座\n3. 避开旅游高峰，体验更好\n\n我可以为您标记一下具体位置：',
    timestamp: new Date('2024-12-15T10:02:30'),
    sender: 'ai',
    type: 'location',
    metadata: {
      locations: [
        {
          name: '筑地市场',
          description: '世界最大的海鲜市场之一，以新鲜寿司闻名',
          coordinates: [139.7691, 35.6654]
        }
      ]
    }
  },
  {
    id: '7',
    content: '明白了，那其他几天的行程建议呢？',
    timestamp: new Date('2024-12-15T10:03:00'),
    sender: 'user',
  },
  {
    id: '8',
    content: '我来为您规划完整的五天行程：',
    timestamp: new Date('2024-12-15T10:03:30'),
    sender: 'ai',
    type: 'itinerary',
    metadata: {
      itinerary: [
        {
          day: 1,
          activities: [
            {
              time: '早上',
              description: '筑地市场寿司体验',
              location: '筑地市场'
            },
            {
              time: '下午',
              description: '浅草寺参观',
              location: '浅草寺'
            },
            {
              time: '晚上',
              description: '晴空塔夜景',
              location: '晴空塔'
            }
          ]
        },
        {
          day: 2,
          activities: [
            {
              time: '上午',
              description: '明治神宫参拜',
              location: '明治神宫'
            },
            {
              time: '下午',
              description: '原宿购物体验',
              location: '竹下通'
            },
            {
              time: '晚上',
              description: '涉谷夜生活',
              location: '涉谷站'
            }
          ]
        },
        {
          day: 3,
          activities: [
            {
              time: '全天',
              description: '迪士尼乐园',
              location: '东京迪士尼乐园'
            }
          ]
        },
        {
          day: 4,
          activities: [
            {
              time: '上午',
              description: '秋叶原电器街',
              location: '秋叶原'
            },
            {
              time: '下午',
              description: '银座购物',
              location: '银座'
            },
            {
              time: '晚上',
              description: '六本木美食',
              location: '六本木'
            }
          ]
        },
        {
          day: 5,
          activities: [
            {
              time: '上午',
              description: '皇居外苑',
              location: '皇居'
            },
            {
              time: '下午',
              description: '上野公园',
              location: '上野公园'
            },
            {
              time: '晚上',
              description: '羽田机场',
              location: '羽田机场'
            }
          ]
        }
      ]
    }
  }
];
