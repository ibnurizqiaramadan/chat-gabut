'use server';

import { ChatInputType, Chat, User } from '@/helpers/types';
import db from '@/helpers/mongodb';
import ChatModel from '@/models/chatModel';
import { escapeHtml, createID } from '@/helpers/funtions';

export const sendChat = (chatData: ChatInputType): Promise<Chat> => {
  return new Promise((resolve) => {
    const data: Chat = {
      id: chatData.id,
      text: escapeHtml(chatData.text),
      sender: chatData.sender,
      target: chatData.target,
      timestamp: Date.now(),
    };

    const insertChat = async () => {
      try {
        await db();
        const chat = new ChatModel(data);
        await chat.save();
      } catch (err) {
        console.log(err);
      }
      resolve(data);
    };
    insertChat();
  });
};

export const createNewChat = (): Promise<User> => {
  return new Promise((resolve) => {
    resolve({
      avatar: 'https://flowbite.com/docs/images/logo.svg',
      name: createID(),
      uuid: createID(),
      isOnline: true,
      username: createID(),
    });
  });
};
