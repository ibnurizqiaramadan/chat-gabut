import { User } from '@/helpers/types';
import { Socket } from 'socket.io-client';
import { create } from 'zustand';

type AppStore = {
  appState: {
    socket: Socket | null;
    openedChat: User | null;
    userId: string | null;
  };
  setSocket: (socket: Socket) => void;
  setOpenedChat: (chatId: User) => void;
  setUserId: (userId: string) => void;
};

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
