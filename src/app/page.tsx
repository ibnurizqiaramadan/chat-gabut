'use client';

import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';
import { ChatStore } from '@/helpers/types';
import { useEffect } from 'react';
import { chatStore } from '@/store/chatStore';

export default function Home() {
  const data = chatStore((state: ChatStore) => state.chats);
  const addChat = chatStore((state: ChatStore) => state.addChat);

  useEffect(() => {
    const timer = setInterval(() => {
      addChat({
        uuid: String(+new Date()),
        text: `Hi ${data.length + 1} ${Math.random()}`,
        sender: Number((Math.random() * 100).toFixed(0)) % 2 === 0 ? true : false,
        timestamp: +new Date(),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [ addChat, data.length ]);

  return (
    <div className="maincontent flex flex-col">
      <ChatContainer data={data} />
      <ChatInput />
    </div>
  );
}
