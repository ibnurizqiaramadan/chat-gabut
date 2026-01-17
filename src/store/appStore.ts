import { User } from '@/helpers/types';
import { create } from 'zustand';
import { AppStore } from '@/helpers/types';

export const appStore = create<AppStore>((set) => ({
  appState: {
    userId: null,
    openedChat: null,
  },
  setUserId: (userId: string) => set((state) => ({ appState: { ...state.appState, userId } })),
  setOpenedChat: (user: User) => set((state) => ({ appState: { ...state.appState, openedChat: user } })),
}));
