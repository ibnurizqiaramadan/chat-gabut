import { create } from 'zustand';
import { Chat, ChatStore } from '@/helpers/types';

export const chatStore = create<ChatStore>((set) => ({
  chats: [ ],
  addChat: (newChat: Chat) => set((state) => ({ chats: [ ...state.chats, newChat ] })),
  clearChats: () => set(() => ({ chats: [] })),
}));
