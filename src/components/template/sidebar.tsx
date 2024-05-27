'use client';

import ChatList from '@/components/chat/chatList';
import { userStore } from '@/store';
import ChatNew from '@/components/chat/chatNew';

export default function Sidebar() {
  const user = userStore((state) => state.user);

  return (
    <aside className="sidebar bg-white text-black" aria-label="Sidebar">
      <div className='p-5 sidenav'>
        <p className="text-2xl font-bold">Chats - <span className='cursor-pointer' onClick={() => navigator.clipboard.writeText(user?.id as string)}>{user?.name}</span></p>
        <ChatNew/>
      </div>
      <hr className=""/>
      <div className='sidecontent overflow-auto'>
        <ChatList />
      </div>
    </aside>
  );
}
