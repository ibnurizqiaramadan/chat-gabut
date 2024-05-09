/* eslint-disable no-unused-vars */
'use client';

import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';
import { ChatStore } from '@/helpers/types';
import { chatStore } from '@/store/chatStore';

export default function Home() {
  const { chats } = chatStore((state: ChatStore) => state);

  return (
    <div className="maincontent flex flex-col">
      <ChatContainer data={chats} />
      <ChatInput />
    </div>
  );
}
