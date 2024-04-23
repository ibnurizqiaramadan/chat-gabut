import { create } from 'zustand';
import { Chat, ChatStore, Chats } from '@/helpers/types';

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
  } ] as Chats,
  addChat: (newChat: Chat) => set((state) => ({ chats: [ ...state.chats, newChat ] })),
}));
