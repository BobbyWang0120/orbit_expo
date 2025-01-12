/**
 * Mock Data
 * For UI development and testing
 */

import { ChatHistory, ChatMessage } from '../types/chat';

// Mock map location data
export interface MapLocation {
  name: string;
  description: string;
  coordinate: {
    latitude: number;
    longitude: number;
  };
}

// Map locations grouped by day
export const mockMapLocationsByDay: { [key: number]: MapLocation[] } = {
  1: [
    {
      name: 'Tsukiji Market',
      description: 'One of the world\'s largest fish markets',
      coordinate: { latitude: 35.6654, longitude: 139.7691 }
    },
    {
      name: 'Senso-ji Temple',
      description: 'Tokyo\'s oldest Buddhist temple',
      coordinate: { latitude: 35.7147, longitude: 139.7966 }
    },
    {
      name: 'Tokyo Skytree',
      description: 'Tokyo\'s landmark tower',
      coordinate: { latitude: 35.7100, longitude: 139.8107 }
    }
  ],
  2: [
    {
      name: 'Meiji Shrine',
      description: 'Important Shinto shrine in Tokyo',
      coordinate: { latitude: 35.6764, longitude: 139.6993 }
    },
    {
      name: 'Takeshita Street',
      description: 'Harajuku shopping street',
      coordinate: { latitude: 35.6722, longitude: 139.7034 }
    },
    {
      name: 'Shibuya Station',
      description: 'Famous Shibuya Crossing',
      coordinate: { latitude: 35.6580, longitude: 139.7016 }
    }
  ],
  3: [
    {
      name: 'Tokyo Disneyland',
      description: 'First Disney park in Asia',
      coordinate: { latitude: 35.6329, longitude: 139.8804 }
    }
  ],
  4: [
    {
      name: 'Akihabara',
      description: 'Electronics and anime culture center',
      coordinate: { latitude: 35.6987, longitude: 139.7714 }
    },
    {
      name: 'Ginza',
      description: 'Upscale shopping district',
      coordinate: { latitude: 35.6721, longitude: 139.7636 }
    },
    {
      name: 'Roppongi',
      description: 'Nightlife and dining area',
      coordinate: { latitude: 35.6627, longitude: 139.7307 }
    }
  ],
  5: [
    {
      name: 'Imperial Palace',
      description: 'Residence of Japan\'s Imperial Family',
      coordinate: { latitude: 35.6852, longitude: 139.7528 }
    },
    {
      name: 'Ueno Park',
      description: 'Hub of museums and art galleries',
      coordinate: { latitude: 35.7147, longitude: 139.7713 }
    },
    {
      name: 'Haneda Airport',
      description: 'Tokyo International Airport',
      coordinate: { latitude: 35.5493, longitude: 139.7798 }
    }
  ]
};

export const mockChatHistories: ChatHistory[] = [
  {
    id: '1',
    title: '5 Days in Tokyo',
    destination: 'Tokyo',
    duration: '5 days',
    timestamp: new Date('2024-12-15T10:00:00'),
  },
  {
    id: '2',
    title: 'Romantic Paris Trip',
    destination: 'Paris',
    duration: '7 days',
    timestamp: new Date('2024-12-14T15:30:00'),
  },
  {
    id: '3',
    title: 'New York City Explorer',
    destination: 'New York',
    duration: '6 days',
    timestamp: new Date('2024-12-13T09:15:00'),
  },
  {
    id: '4',
    title: 'Luxury Dubai Experience',
    destination: 'Dubai',
    duration: '4 days',
    timestamp: new Date('2024-12-12T14:20:00'),
  },
  {
    id: '5',
    title: 'Sydney Beach Holiday',
    destination: 'Sydney',
    duration: '8 days',
    timestamp: new Date('2024-12-11T16:45:00'),
  },
  {
    id: '6',
    title: 'Cultural London Tour',
    destination: 'London',
    duration: '6 days',
    timestamp: new Date('2024-12-10T11:30:00'),
  },
  {
    id: '7',
    title: 'Maldives Getaway',
    destination: 'Maldives',
    duration: '5 days',
    timestamp: new Date('2024-12-09T13:20:00'),
  },
  {
    id: '8',
    title: 'Historic Rome Explorer',
    destination: 'Rome',
    duration: '6 days',
    timestamp: new Date('2024-12-08T10:15:00'),
  },
];

// Simplified mock messages for testing
export const mockTokyoMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Hi, I\'d like to plan a 5-day trip to Tokyo, focusing on local food and attractions.',
    timestamp: new Date('2024-12-15T10:00:00'),
    sender: 'user',
  },
  {
    id: '2',
    content: 'Hello! I\'d be happy to help plan your Tokyo trip. Tokyo is a city where food and culture come together beautifully. Do you have any specific places you\'d like to visit or Japanese dishes you\'d like to try?',
    timestamp: new Date('2024-12-15T10:00:30'),
    sender: 'ai',
  },
  {
    id: '3',
    content: 'I really want to try fresh sushi at Tsukiji Market, and I\'d love to visit Senso-ji Temple and Meiji Shrine.',
    timestamp: new Date('2024-12-15T10:01:00'),
    sender: 'user',
  },
  {
    id: '4',
    content: 'Those are excellent choices! Tsukiji Market is famous for its fresh sushi, especially in the early morning. Senso-ji Temple and Meiji Shrine are both iconic cultural sites that will give you a great sense of Japanese tradition.',
    timestamp: new Date('2024-12-15T10:01:30'),
    sender: 'ai',
  }
];
