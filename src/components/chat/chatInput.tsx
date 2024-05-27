'use client';

import { ChatInputType, User } from '@/helpers/types';
import { chatStore, userStore, appStore } from '@/store';
import { chatServer } from '@/server';
import { useCallback } from 'react';
import { createID } from '@/helpers/funtions';

export default function ChatInput() {
  const { addChat, changePending } = chatStore((state) => state);
  const { user } = userStore((state) => state);
  const { appState } = appStore((state) => state);
  const socket = appState.socket;

  const sendChatToServer = useCallback(async (chatData: ChatInputType) => {
    const data = await chatServer.sendChat(chatData);
    changePending(appState.openedChat as User, data);
    socket?.emit('chatSend', {
      target: appState.openedChat,
      sender: user,
      data,
    });
  }, [ appState.openedChat, changePending, socket, user ]);

  return (
    <div className="chat-input h-full flex gap-3">
      <textarea
        disabled={appState.openedChat == null}
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
            if (value.trim() == '') return;
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
