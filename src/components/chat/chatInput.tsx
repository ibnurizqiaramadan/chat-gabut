'use client';

import { chatStore } from '@/store/chatStore';

export default function ChatInput() {
  const clearChats = chatStore((state) => state.clearChats);
  return (
    <div className="chat-input h-full flex gap-3">
      <textarea
        placeholder="Type a message"
        className="w-full rounded-xl p-2"
        style={{ height: 'var(--chat-input-height)', background: '#222'  }}
      />
      <button onClick={clearChats}>Send</button>
    </div>
  );
}
