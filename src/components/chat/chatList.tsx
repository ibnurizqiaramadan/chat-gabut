'use client';

import Image from 'next/image';
import { chatListStore, appStore } from '@/store';
import { ChatListStore } from '@/helpers/types';

export default function ChatList() {
  // eslint-disable-next-line no-unused-vars
  const { chatList } = chatListStore<ChatListStore>((state) => state);
  const { appState, setOpenedChat } = appStore((state) => state);

  return (
    <div className='flex flex-col gap-1 px-2 py-3'>
      {chatList.length === 0 && <p>No Chats</p>}
      {chatList.map((user) =>
        <div
          key={user.id}
          className={`flex gap-2 ${appState.openedChat?.id == user.id ? 'bg-slate-700 hover:bg-slate-600' : ''} rounded-xl p-2 h-[4rem] select-none cursor-pointer hover:bg-slate-800`}
          onClick={() => {
            setOpenedChat(user);
          }}
        >
          <Image src={user.avatar} alt="" width={32} height={32} className='rounded-full' />
          <div className='flex flex-col'>
            <p className='font-bold'>{user.name} {user.isOnline && <span className='text-green-500'>Online</span>}</p>
            <p className='overflow-hidden'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit beatae repudiandae quibusdam veniam eius consequuntur, quam provident ullam sunt debitis omnis ex saepe necessitatibus, sequi qui, dolores deleniti! Dolorum, molestias!</p>
          </div>
        </div>
      )}
    </div>
  );
}
