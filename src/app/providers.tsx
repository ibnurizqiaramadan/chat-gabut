'use client';

import { HeroUIProvider } from '@heroui/react';
import React, { useCallback, useEffect, useMemo } from 'react';
import { Chat, User } from '@/helpers/types';
import { createID } from '@/helpers/funtions';
import { userStore, chatListStore, appStore, chatStore } from '@/store';
import { Client, Account } from 'appwrite';
import Script from 'next/script';

/**
 * A React component that provides the necessary context for the application.
 *
 * The component initializes Appwrite real-time subscriptions and handles
 * user authentication with Appwrite and Google OAuth.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The child components to be rendered.
 * @return {JSX.Element} The JSX element representing the Providers component.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const { setUser } = userStore((state) => state);
  const { addChat, loadChats } = chatStore((state) => state);
  const { appState, setUserId } = appStore((state) => state);
  const { createChat } = chatListStore((state) => state);

  // Initialize Appwrite client
  const client = useMemo(
    () =>
      new Client()
        .setEndpoint(
          process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT ||
            'https://cloud.appwrite.io/v1',
        )
        .setProject(
          process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || 'YOUR_PROJECT_ID',
        ),
    [],
  );

  const account = useMemo(() => new Account(client), [ client ]);

  const setupRealtime = useCallback(() => {
    // Subscribe to chat messages in real-time using Client's subscribe method
    const unsubscribe = client.subscribe('documents', (response) => {
      if (
        response.events.includes('databases.*.collections.*.documents.*.create')
      ) {
        const payload = response.payload as any;
        if (payload.collectionId === 'chats') {
          // Assuming your collection is named 'chats'
          const chatData = {
            id: payload.$id,
            text: payload.text,
            sender: payload.sender,
            target: payload.target,
            timestamp: payload.timestamp,
            isRead: false,
          } as Chat;

          // Find sender user or create a basic user object
          const sender: User = {
            id: payload.sender,
            name: `User ${payload.sender}`,
            username: payload.sender,
            avatar: 'https://i.pravatar.cc/300',
            isOnline: false,
          };

          createChat(sender);
          addChat(sender, chatData);
        }
      }
    });

    return unsubscribe;
  }, [ client, createChat, addChat ]);

  useEffect(() => {
    const getChatList = () => {
      const chatList = localStorage.getItem('chatList');
      if (chatList) {
        chatListStore.setState({ chatList: JSON.parse(chatList) });
      }
      loadChats();
    };

    /**
     * Handles user authentication with Appwrite and Google OAuth.
     * If user is not authenticated, redirects to Google OAuth.
     * If authenticated, sets user data from Appwrite account and sets up real-time.
     *
     * @return {Promise<void>} A promise that resolves when the user is authenticated.
     */
    const handleAuth = async (): Promise<void> => {
      try {
        const userData = await account.get();
        const user: User = {
          id: userData.$id,
          name: userData.name || 'Anonymous',
          username: userData.email || userData.$id,
          avatar: userData.prefs?.avatar || 'https://i.pravatar.cc/300',
          isOnline: true,
        };
        setUser(user);
        setUserId(user.id);
        localStorage.setItem('uid', user.id);
        getChatList();

        // Setup real-time subscriptions after authentication
        setupRealtime();
      } catch (error) {
        // User not authenticated, redirect to Google OAuth
        try {
          await account.createOAuth2Session(
            'google' as any,
            `${window.location.origin}/auth/callback`,
            `${window.location.origin}/auth/failure`,
          );
        } catch (oauthError) {
          console.error('OAuth error:', oauthError);
        }
      }
    };
    handleAuth();
  }, [ account, setupRealtime, loadChats, setUser, setUserId ]);

  return (
    <>
      <Script
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
      />
      <HeroUIProvider>{children}</HeroUIProvider>
    </>
  );
}
