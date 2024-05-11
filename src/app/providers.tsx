'use client';

import { NextUIProvider } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { User } from '@/helpers/types';
import { createID } from '@/helpers/funtions';
import { userStore } from '@/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser } = userStore((state) => state);

  useEffect(() => {
    const user: User = localStorage.getItem('user') as unknown as User;
    if (user) return setUser(JSON.parse(user as unknown as string));
    const newUser: User = {
      avatar: 'https://flowbite.com/docs/images/logo.svg',
      name: createID(),
      uuid: createID(),
      isOnline: true,
      username: createID(),
    };
    localStorage.setItem('user', JSON.stringify(newUser));
    setUser(newUser);
    console.log('new user created');
  }, [ setUser ]);

  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
