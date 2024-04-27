import { create } from 'zustand';
import { ChatListStore, User } from '@/helpers/types';

export const chatListStore = create<ChatListStore>((set) => ({
  chatList: [ ],
  createChat: (user: User) => set((state) => (
    { chatList:
      [ ...state.chatList, user ],
    })
  ),
  removeChat: (uuid: string) => set((state) => ({ chatList: state.chatList.filter((chat) => chat.uuid !== uuid) })),
  clearChatlist: () => set(() => ({ chatList: [] })),
}));
