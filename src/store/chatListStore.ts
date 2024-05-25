import { create } from 'zustand';
import { ChatListStore, User } from '@/helpers/types';

export const chatListStore = create<ChatListStore>((set) => ({
  chatList: [ ],
  user: null as User | null,
  createChat: (user: User) => set((state) => (
    { chatList:
      [ ...state.chatList, user ],
    })
  ),
  removeChat: (id: string) => set((state) => ({ chatList: state.chatList.filter((chat) => chat.id !== id) })),
  clearChatlist: () => set(() => ({ chatList: [] })),
  checkUserExist: (userId: string) => set((state) => (
    { user: state.chatList.find((chat) => chat.id === userId) || null as User | null }
  )),
}));
