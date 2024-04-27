'use client';

import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';
import { ChatListStore, ChatStore } from '@/helpers/types';
import { useEffect, useCallback } from 'react';
import { chatStore } from '@/store/chatStore';
import { sendChat, createNewChat } from '@/server/chatServer';
import { chatListStore } from '@/store/chatListStore';

export default function Home() {
  const { chats, addChat, clearChats } = chatStore((state: ChatStore) => state);
  const { createChat, clearChatlist } = chatListStore<ChatListStore>((state) => state);

  const sendChatToServer = useCallback(async () => {
    const data = await sendChat();
    addChat(data);
  }, [ addChat ]);

  const addUser = useCallback(async () => {
    const data = await createNewChat();
    createChat(data);
  }, [ createChat ]);

  useEffect(() => {
    const timer = setInterval(() => {
      sendChatToServer();
      addUser();
      chats.length >= 100 && (clearChats(), clearChatlist());
    }, 1000);

    return () => clearInterval(timer);
  }, [ clearChats, chats.length, sendChatToServer, createChat, clearChatlist, addUser ]);

  return (
    <div className="maincontent flex flex-col">
      <ChatContainer data={chats} />
      <ChatInput />
    </div>
  );
}
