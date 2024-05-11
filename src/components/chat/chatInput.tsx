'use client';

import { ChatInputType } from '@/helpers/types';
import { chatStore } from '@/store';
import { sendChat } from '@/server/chatServer';
import { useCallback } from 'react';
import { createID } from '@/helpers/funtions';

export default function ChatInput() {
  const { addChat, changePending } = chatStore((state) => state);

  const sendChatToServer = useCallback(async (chatData: ChatInputType) => {
    const data = await sendChat(chatData);
    changePending(data);
  }, [ changePending ]);

  return (
    <div className="chat-input h-full flex gap-3">
      <textarea
        placeholder="Type a message"
        className="w-full rounded-xl p-2"
        style={{ height: 'var(--chat-input-height)', background: '#222'  }}
        onKeyDown={(e) => {
          if (!e.shiftKey && e.code === 'Enter') {
            const id = createID();
            e.preventDefault();
            const value = e.currentTarget.value;
            e.currentTarget.value = '';
            const data = {
              id,
              text: value,
              sender: id,
              target: id,
            };
            if (value.trim() == '') return;
            addChat({
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
