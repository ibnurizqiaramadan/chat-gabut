'use client';

import Image from 'next/image';
import { chatListStore } from '@/store';
import { ChatListStore } from '@/helpers/types';

export default function ChatList() {
  // eslint-disable-next-line no-unused-vars
  const { chatList } = chatListStore<ChatListStore>((state) => state);

  return (
    <div className='flex flex-col gap-4 p-4'>
      {chatList.map((user) =>
        <div key={user.uuid} className="flex gap-2 bg-slate-600 rounded-xl p-2 h-[4rem] select-none">
          <Image src={user.avatar} alt="" width={32} height={32} className='rounded-full' />
          <div className='flex flex-col'>
            <p className='font-bold'>{user.name}</p>
            <p className='overflow-hidden'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Suscipit beatae repudiandae quibusdam veniam eius consequuntur, quam provident ullam sunt debitis omnis ex saepe necessitatibus, sequi qui, dolores deleniti! Dolorum, molestias!</p>
          </div>
        </div>
      )}
    </div>
  );
}
