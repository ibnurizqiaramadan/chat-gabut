'use client';

import Navbar from '@/components/template/navbar';
import ChatNew from '@/components/chat/chatNew';
import React from 'react';
import { chatListStore } from '@/store';

export default function MainContent({ children }: { children: React.ReactNode }) {
  const { chatList } = chatListStore((state) => state);

  return (
    <div className={chatList.length > 0 ? 'maincontent' : 'maincontent-newchat'}>
      {chatList.length > 0 ? (
        <>
          <Navbar />
          {children}
        </>
      ) : (
        <ChatNew />
      )}
    </div>
  );
}
