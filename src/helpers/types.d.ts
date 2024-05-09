export type Chat = {
  id: string
  text: string
  sender: string
  target: string
  timestamp?: number
  isRead?: boolean
  isPending?: boolean
}

export type ChatInputType = {
  id: string
  text: string
  sender: string
  target: string
}

export type Chats = Chat[]

export type ChatStore = {
  chats: Chats
  addChat: (newChat: Chat) => void
  clearChats: () => void
  changePending: (id: string) => void
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
