import { create } from 'zustand';
import { Chat, ChatStore, User } from '@/helpers/types';

export const chatStore = create<ChatStore>((set) => ({
  chatsData: [],
  addChat: (user: User, newChat: Chat) => {
    set((state) => {
      const userIndex = state.chatsData.findIndex((data) => data.user.id === user.id);
      if (userIndex === -1) {
        return {
          chatsData: [ ...state.chatsData, { user, chats: [ newChat ] } ],
        };
      }
      return {
        chatsData: state.chatsData.map((data, index) =>
            index === userIndex ? { ...data, chats: [ ...data.chats, newChat ] } : data
        ),
      };
    });
    localStorage.setItem('chats', JSON.stringify(chatStore.getState().chatsData));
  },
  clearChats: (user: User) =>
    set((state) => ({
      chatsData: state.chatsData.map((data) =>
        data.user.id === user.id ? { ...data, chats: [] } : data
      ),
    })),
  changePending: (user: User, chatData: Chat) => {
    set((state) => ({
      chatsData: state.chatsData.map((data) =>
        data.user.id === user.id ?
          {
            ...data,
            chats: data.chats.map((chat) =>
                chat.id === chatData.id ? { ...chat, isPending: false } : chat
            ),
          } :
          data
      ),
    }));
    localStorage.setItem('chats', JSON.stringify(chatStore.getState().chatsData));
  },
  loadChats: () => {
    const chats = localStorage.getItem('chats');
    if (chats) {
      set({ chatsData: JSON.parse(chats) });
    }
  },
}));
