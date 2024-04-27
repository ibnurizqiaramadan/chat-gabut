export type Chat = {
  uuid: string
  text: string
  sender: boolean
  timestamp: number
}

export type Chats = Chat[]

export type ChatStore = {
  chats: Chats
  addChat: (newChat: Chat) => void
  clearChats: () => void
}

export type User = {
  uuid: string
  username: string
  name: string
  avatar: string
  isOnline: boolean
}

export type Users = User[]

export type ChatListStore = {
  chatList: Users
  createChat: (user: User) => void
  removeChat: (uuid: string) => void
  clearChatlist: () => void
}
