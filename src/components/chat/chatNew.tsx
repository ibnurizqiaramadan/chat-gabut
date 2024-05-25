'use client';
import { chatServer } from '@/server';
import { chatListStore } from '@/store';

export default function ChatNew() {
  const { checkUserExist, createChat } = chatListStore((state) => state);

  const newChatHandler = async () => {
    const checkUserId = async (userId: string) => {
      const user = await chatServer.createNewChat(userId);
      if (user) {
        return user;
      }
      return null;
    };
    const userId = prompt('Enter ID');
    if (!userId) return;
    checkUserExist(userId as string);
    if (chatListStore.getState().user) return alert('Already in chat');
    const user = await checkUserId(userId as string);
    if (!user) return alert('User not found');
    createChat(user);
    alert(`New Chat with '${user.name}'`);
    localStorage.setItem('chatList', JSON.stringify(chatListStore.getState().chatList));
  };

  return (
    <div>
      <button onClick={newChatHandler}>
        +
      </button>
    </div>
  );
}
