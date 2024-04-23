import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';
import { Chats } from '@/helpers/types';

export default function Home() {
  const data: Chats = [
    {
      uuid: '1',
      text: 'Hello',
      sender: true,
      timestamp: +new Date(),
    },
    {
      uuid: '2',
      text: 'How are you?',
      sender: false,
      timestamp: +new Date(),
    },
  ];
  return (
    <div className="maincontent flex flex-col">
      <ChatContainer data={data} />
      <ChatInput />
    </div>
  );
}
