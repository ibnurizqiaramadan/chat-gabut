'use client';

import { ChatInputType } from '@/helpers/types';
import { chatStore } from '@/store/chatStore';
import { sendChat } from '@/server/chatServer';
import { useCallback } from 'react';
// import { nanoid } from 'nanoid';

export default function ChatInput() {
  const { addChat } = chatStore((state) => state);

  const sendChatToServer = useCallback(async (chatData: ChatInputType) => {
    const data = await sendChat(chatData);
    addChat(data);
  }, [ addChat ]);

  return (
    <div className="chat-input h-full flex gap-3">
      <textarea
        placeholder="Type a message"
        className="w-full rounded-xl p-2"
        style={{ height: 'var(--chat-input-height)', background: '#222'  }}
        onKeyDown={(e) => {
          if (!e.shiftKey && e.code === 'Enter') {
            // const tempId = nanoid();
            e.preventDefault();
            const value = e.currentTarget.value;
            e.currentTarget.value = '';
            if (value.trim() == '') return;
            sendChatToServer({
              text: value,
              sender: 'user',
              target: 'user',
            });
          }
        }}
      />
    </div>
  );
}
