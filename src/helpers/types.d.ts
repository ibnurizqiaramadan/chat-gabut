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
  changePending: (chatData: Chat) => void
}

export type User = {
  id: string
  username: string
  name: string
  avatar: string
  isOnline: boolean
}

export type Users = User[]

export type ChatListStore = {
  chatList: Users
  user: User | null
  createChat: (user: User) => void
  removeChat: (uuid: string) => void
  clearChatlist: () => void
  checkUserExist: (userId: string) => void
}

export type UserStore = {
  user: User | null
  setUser: (user: User) => void
  clearUser: () => void
}
