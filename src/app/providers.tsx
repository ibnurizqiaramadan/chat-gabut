'use client';

import { NextUIProvider } from '@nextui-org/react';
import React, { useCallback, useEffect } from 'react';
import { Chat, User } from '@/helpers/types';
import { createID } from '@/helpers/funtions';
import { userStore, chatListStore, appStore, chatStore } from '@/store';
import { userServer } from '@/server';
import { io } from 'socket.io-client';

/**
 * A React component that provides the necessary context for the application.
 *
 * The component initializes the Socket.IO connection and sets up the event
 * listeners for receiving chat messages from the server. It also retrieves the
 * user from the server based on the stored ID in local storage and sets the
 * user in the state. If the user is not found, it prompts the user to enter a
 * name and creates a new user with the provided name. The new user's ID is stored
 * in local storage and set in the state.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @return {JSX.Element} The JSX element representing the Providers component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser } = userStore((state) => state);
  const { addChat, loadChats } = chatStore((state) => state);
  const { appState, setSocket, setUserId } = appStore((state) => state);
  const { createChat } = chatListStore((state) => state);

  const connectSocket = useCallback(() => {
    let socket;

    if (appState.socket == null) {
      socket = io('https://seuneu.xyrus10.com');
      // socket = io('http://localhost:3004');
      setSocket(socket);
    }

    socket?.on('connect', () => {
      console.log('Connected to socket', appStore.getState().appState.userId);
      socket.emit('userLogin', appStore.getState().appState.userId);
    });

    socket?.on('chatReceive', (data) => {
      createChat(data.sender as User);
      addChat(data.sender as User, { ...data.data, isRead: false } as Chat);
    });
  }, [ appState.socket, setSocket, createChat, addChat ]);

  useEffect( () => {
    const getChatList = () => {
      const chatList = localStorage.getItem('chatList');
      if (chatList) {
        chatListStore.setState({ chatList: JSON.parse(chatList) });
      }
      loadChats();
      connectSocket();
    };
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
      setUserId(id as string);
      if (id) return (setUser(user), getChatList());
      const name = prompt('Enter Name');
      const newUser = await userServer.createNewUser(name?.trim() || createID());
      localStorage.setItem('uid', newUser.id);
      location.reload();
    };
    getUser();
  }, [ appState.socket, connectSocket, loadChats, setUser, setUserId ]);

  return (
    <NextUIProvider>
      {children}
    </NextUIProvider>
  );
}
