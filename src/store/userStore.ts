import { create } from 'zustand';
import { UserStore, User } from '@/helpers/types';

export const userStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user:User) => set(() => ({ user })),
  clearUser: () => set(() => ({ user: null })),
}));
