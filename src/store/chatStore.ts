import { create } from 'zustand';
import { Chat, ChatStore } from '@/helpers/types';

export const chatStore = create<ChatStore>((set) => ({
  chats: [ {
    uuid: '1',
    text: 'Hello',
    sender: true,
    timestamp: 123123,
  },
  {
    uuid: '2',
    text: 'How are you?',
    sender: false,
    timestamp: 123123,
  } ],
  addChat: (newChat: Chat) => set((state) => ({ chats: [ ...state.chats, newChat ] })),
}));
