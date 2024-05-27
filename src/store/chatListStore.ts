import { create } from 'zustand';
import { ChatListStore, User } from '@/helpers/types';

export const chatListStore = create<ChatListStore>((set) => ({
  chatList: [ ],
  user: null as User | null,
  createChat: (user: User) => {
    const userExist = chatListStore.getState().chatList.find((chat) => chat.id === user.id);
    if (userExist) return;
    set((state) => ({
      chatList: [
        ...state.chatList,
        user,
      ],
    }));
    localStorage.setItem('chatList', JSON.stringify(chatListStore.getState().chatList));
  },

  removeChat: (id: string) => set((state) => ({ chatList: state.chatList.filter((chat) => chat.id !== id) })),
  clearChatlist: () => set(() => ({ chatList: [] })),
  checkUserExist: (userId: string) => set((state) => (
    { user: state.chatList.find((chat) => chat.id === userId) || null as User | null }
  )),
}));
