/* eslint-disable no-unused-vars */
'use client';

import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';
import { ChatStore } from '@/helpers/types';
import { chatStore, appStore } from '@/store';

export default function Home() {
  const { chatsData } = chatStore((state: ChatStore) => state);
  const { appState } = appStore((state) => state);

  const data = chatsData.filter((data) => data.user?.id === appState.openedChat?.id)[0]?.chats ?? [];

  return (
    <div className="maincontent flex flex-col">
      <ChatContainer data={data} />
      <ChatInput />
    </div>
  );
}
