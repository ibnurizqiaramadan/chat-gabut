'use client';

import { NextUIProvider } from '@nextui-org/react';
import React, { useEffect } from 'react';
import { User } from '@/helpers/types';
import { createID } from '@/helpers/funtions';
import { userStore } from '@/store';
import { userServer } from '@/server';

/**
 * A React component that provides the necessary context for the application.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @return {JSX.Element} The JSX element representing the Providers component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser } = userStore((state) => state);

  useEffect( () => {
    /**
     * Retrieves the user from the server based on the stored ID in local storage.
     * If the user is found, it sets the user in the state.
     * If the user is not found, it prompts the user to enter a name and creates a new user with the provided name.
     * The new user's ID is stored in local storage and set in the state.
     *
     * @return {Promise<void>} A promise that resolves when the user is set in the state.
     */
    const getUser = async (): Promise<void> => {
      const id = localStorage.getItem('uid');
      const user = await userServer.getUser(id as string) as User;
      if (id) return setUser(user);
      const name = prompt('Enter Name');
      const newUser = await userServer.createNewUser(name?.trim() || createID());
      localStorage.setItem('uid', newUser.id);
      setUser(newUser);
    };
    getUser();
  }, [ setUser ]);

  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
