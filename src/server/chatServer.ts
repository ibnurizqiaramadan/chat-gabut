import { Chat, User } from '@/helpers/types';
import { v4 as uuid } from 'uuid';

export const sendChat = (): Promise<Chat> => {
  return new Promise((resolve) => {
    resolve({
      uuid: uuid(),
      text: `Hello ${Math.random()} ${uuid()}`,
      sender: Number((Math.random() * 100).toFixed(0)) % 2 === 0 ? true : false,
      timestamp: Date.now(),
    });
  });
};

export const createNewChat = (): Promise<User> => {
  return new Promise((resolve) => {
    resolve({
      avatar: 'https://flowbite.com/docs/images/logo.svg',
      name: uuid(),
      uuid: uuid(),
      isOnline: true,
      username: uuid(),
    });
  });
};
