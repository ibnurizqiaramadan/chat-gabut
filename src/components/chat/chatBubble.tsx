'use client';

import { Chat } from '@/helpers/types';
import { escapeHtml } from '@/helpers/funtions';
import { userStore } from '@/store';

export default function BubbleChat(props: Chat) {
  const { user } = userStore((state) => state);

  const parseText = (text: string) => {
    let result = '';

    result = escapeHtml(text)
        .replace(/(?:\r\n|\r|\n)/g, '<br>')
        .replace(/( +)/g, (match) => {
          return match.split('').map(() => '&nbsp;').join('');
        });

    return result;
  };

  return (
    <div className={`flex flex-col ${props.sender == user?.id ? 'items-end justify-end' : 'items-start justify-start'} ${props.isPending ? 'opacity-50' : ''}`}>
      <span className={`text-xs mb-1`}>
        {new Date(props.timestamp as number)?.toISOString()}
      </span>
      <div className="bg-gray-600 text-white p-3 rounded-xl">
        <span dangerouslySetInnerHTML={{ __html: parseText(props.text) }} />
      </div>
    </div>
  );
}
