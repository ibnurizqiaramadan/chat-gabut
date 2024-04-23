import { Chats, Chat } from '@/helpers/types';
import BubbleChat from './bubbleChat';

export default function ChatContainer(props: {
  data: Chats;
}) {
  return (
    <div className="p-4 chat-container overflow-auto">
      <div className="flex flex-col gap-3">
        {props.data.map((data: Chat) => (
          <>
            <BubbleChat
              key={data.uuid}
              uuid={data.uuid}
              text={data.text}
              sender={data.sender}
              timestamp={data.timestamp}
            />
          </>
        ))}
      </div>
    </div>
  );
}
