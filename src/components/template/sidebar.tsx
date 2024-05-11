'use client';

import ChatList from '@/components/chat/chatList';

export default function Sidebar() {
  return (
    <aside className="sidebar bg-white text-black" aria-label="Sidebar">
      <div className='p-5 sidenav'>
        <p className="text-2xl font-bold">Chats</p>
      </div>
      <hr className=""/>
      <div className='sidecontent overflow-auto'>
        <ChatList />
      </div>
    </aside>
  );
}
