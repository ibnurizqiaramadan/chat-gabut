'use client';

import { Chats, Chat } from '@/helpers/types';
import ChatBubble from './chatBubble';
import { useEffect, useRef } from 'react';

export default function ChatContainer(props: {
  data: Chats;
}) {
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (chatContainer) {
      const currentScrollPosition = (chatContainer.scrollTop + chatContainer.clientHeight);
      const maxScrollPosition = chatContainer.scrollHeight;

      if (currentScrollPosition <= maxScrollPosition) {
        chatContainer.scrollTop = maxScrollPosition;
      }
    }
  }, [ props.data ]);

  return (
    <div
      ref={chatContainerRef}
      className="p-4 chat-container overflow-auto"
    >
      <div className="flex flex-col gap-3">
        {props.data.map((data: Chat) => <ChatBubble
          isPending={data.isPending}
          isRead={data.isRead}
          target={data.target}
          key={data.id}
          id={data.id}
          text={data.text}
          sender={data.sender}
          timestamp={data.timestamp}
        />)}
      </div>
    </div>
  );
}
