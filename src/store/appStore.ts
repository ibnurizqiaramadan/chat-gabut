import { User } from '@/helpers/types';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';
import { AppStore } from '@/helpers/types';

export const appStore = create<AppStore>((set) => ({
  appState: {
    socket: null,
    userId: null,
    openedChat: null,
  },
  setSocket: (socket: Socket) => set((state) => ({ appState: { ...state.appState, socket } })),
  setUserId: (userId: string) => set((state) => ({ appState: { ...state.appState, userId } })),
  setOpenedChat: (user: User) => set((state) => ({ appState: { ...state.appState, openedChat: user } })),
}));
