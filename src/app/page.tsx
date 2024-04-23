'use client';

import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';
import { ChatStore } from '@/helpers/types';
import { useEffect, useCallback } from 'react';
import { chatStore } from '@/store/chatStore';
import { sendChat } from '@/server/chatServer';

export default function Home() {
  const data = chatStore((state: ChatStore) => state.chats);
  const addChat = chatStore((state: ChatStore) => state.addChat);

  const sendChatToServer = useCallback(async () => {
    const data = await sendChat();
    addChat(data);
  }, [ addChat ]);

  useEffect(() => {
    const timer = setInterval(() => {
      sendChatToServer();
    }, 1000);

    return () => clearInterval(timer);
  }, [ sendChatToServer ]);

  return (
    <div className="maincontent flex flex-col">
      <ChatContainer data={data} />
      <ChatInput />
    </div>
  );
}
