'use client';

import Image from 'next/image';
import { chatListStore, appStore, chatStore } from '@/store';
import { ChatListStore } from '@/helpers/types';
import moment from 'moment';

export default function ChatList() {
  // eslint-disable-next-line no-unused-vars
  const { chatList } = chatListStore<ChatListStore>((state) => state);
  const { appState, setOpenedChat } = appStore((state) => state);
  const { chatsData } = chatStore((state) => state);

  const getLastMessage = (userId: string) => {
    const data = chatsData.filter((data) => data.user?.id === userId)[0]?.chats ?? [];
    return data[data.length - 1];
  };

  const getLastTimeMessage = (userId: string) => {
    const data = chatsData.filter((data) => data.user?.id === userId)[0]?.chats ?? [];
    if (data[data.length - 1]?.timestamp == undefined) return '';
    const time = moment(data[data.length - 1]?.timestamp);
    if (time == undefined) return '';
    const now = moment();
    if (time.isSame(now, 'day')) return time.format('HH:mm');
    if (time.isSame(moment().subtract(1, 'days'), 'day')) return 'yesterday';
    return time.format('YYYY-MM-DD');
  };

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
          <div className='flex flex-col flex-grow ml-2'>
            <p className='font-bold'>{user.name} {user.isOnline && <span className='text-green-500'>Online</span>}</p>
            <p className='overflow-hidden'>{getLastMessage(user.id)?.text ?? ''}</p>
          </div>
          <div className='flex flex-col items-end ml-2'>
            <p className='font-bold'>{getLastTimeMessage(user.id)}</p>
            <p className=''></p>
          </div>
        </div>
      )}
    </div>
  );
}
