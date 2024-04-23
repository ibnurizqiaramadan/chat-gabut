import { Chat } from '@/helpers/types';
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
