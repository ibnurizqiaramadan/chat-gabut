'use client';

import { ChatInputType, User } from '@/helpers/types';
import { chatStore, userStore, appStore } from '@/store';
import { useCallback, useMemo } from 'react';
import { createID } from '@/helpers/funtions';
import { Client, Databases } from 'appwrite';

export default function ChatInput() {
  const { addChat, changePending } = chatStore((state) => state);
  const { user } = userStore((state) => state);
  const { appState } = appStore((state) => state);

  // Initialize Appwrite client and databases
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

  const databases = useMemo(() => new Databases(client), [ client ]);

  const sendChatToServer = useCallback(async (chatData: ChatInputType) => {
    const data = {
      ...chatData,
      timestamp: +new Date(),
      isRead: false,
    };
    changePending(appState.openedChat as User, data);

    try {
      // Save chat message to Appwrite database
      await databases.createDocument(
        'YOUR_DATABASE_ID', // Replace with your database ID
        'chats', // Replace with your collection ID
        chatData.id,
        {
          text: chatData.text,
          sender: chatData.sender,
          target: chatData.target,
          timestamp: data.timestamp,
          isRead: false,
        },
      );
    } catch (error) {
      console.error('Error sending chat message:', error);
      // You might want to show an error message to the user here
    }
  }, [ appState.openedChat, changePending, databases ]);

  return (
    <div className="chat-input h-full flex gap-3">
      <textarea
        disabled={appState.openedChat === null}
        placeholder="Type a message"
        className="w-full rounded-xl p-2"
        style={{ height: 'var(--chat-input-height)', background: '#222' }}
        onKeyDown={(e) => {
          if (!e.shiftKey && e.key === 'Enter') {
            const id = createID();
            e.preventDefault();
            const value = e.currentTarget.value;
            e.currentTarget.value = '';
            const data = {
              id,
              text: value,
              sender: user?.id as string,
              target: appState.openedChat?.id as string,
            };
            if (value.trim() === '') { return; }
            addChat(appState.openedChat as User, {
              ...data,
              isPending: true,
              timestamp: +new Date(),
            });
            sendChatToServer(data);
          }
        }}
      />
    </div>
  );
}
