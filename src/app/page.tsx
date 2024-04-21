import ChatContainer from '@/components/chat/chatContainer';
import ChatInput from '@/components/chat/chatInput';

export default function Home() {
  return (
    <div className="maincontent flex flex-col">
      <ChatContainer />
      <ChatInput />
    </div>
  );
}
