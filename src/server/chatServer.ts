'use server';

import { ChatInputType, Chat, User } from '@/helpers/types';
import db from '@/helpers/mongodb';
import ChatModel from '@/models/chatModel';
import { escapeHtml } from '@/helpers/funtions';
import { UserModel } from '@/models';

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

export const createNewChat = (userId: string): Promise<User> => {
  return new Promise((resolve) => {
    const checkUser = async () => {
      try {
        await db();
        const user = await UserModel.findOne({ id: userId }).lean();
        resolve(user as unknown as User);
      } catch (error) {
        resolve(null as unknown as User);
      }
    };
    checkUser();
  });
};
