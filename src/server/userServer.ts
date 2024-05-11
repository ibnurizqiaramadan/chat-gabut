'use server';

import { User } from '@/helpers/types';
import db from '@/helpers/mongodb';
import { UserModel } from '@/models';
import { createID } from '@/helpers/funtions';

export const createNewUser = (name: string): Promise<User> => {
  return new Promise((resolve) => {
    const data: User = {
      id: createID(),
      name: name,
      username: name.replace(/ /g, '-').toLowerCase(),
      avatar: 'https://flowbite.com/docs/images/logo.svg',
      isOnline: true,
    };

    const insertUser = async () => {
      try {
        await db();
        const user = new UserModel(data);
        await user.save();
      } catch (err) {
        console.log(err);
      }
      resolve(data);
    };
    insertUser();
  });
};

export const getUser = (id: string): Promise<User> => {
  return new Promise((resolve) => {
    const getUser = async () => {
      try {
        await db();
        const user = await UserModel.findOne({ id: id }).lean();
        resolve(user as unknown as User);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  });
};
