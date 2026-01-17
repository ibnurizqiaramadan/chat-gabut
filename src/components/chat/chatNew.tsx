'use client';
import { chatListStore } from '@/store';
import { User } from '@/helpers/types';
import { createID } from '@/helpers/funtions';

export default function ChatNew() {
  const { checkUserExist, createChat } = chatListStore((state) => state);

  const newChatHandler = async () => {
    const userId = prompt('Enter User ID');
    if (!userId) { return; }

    checkUserExist(userId as string);
    if (chatListStore.getState().user) { return alert('Already in chat'); }

    // For now, create a basic user object - in a real app, you'd fetch user data from Appwrite
    const user: User = {
      id: userId,
      name: `User ${userId}`,
      username: userId,
      avatar: 'https://i.pravatar.cc/300',
      isOnline: false,
    };

    createChat(user);
    alert(`New Chat with '${user.name}'`);
  };

  return (
    <div>
      <button onClick={newChatHandler}>
        +
      </button>
    </div>
  );
}
