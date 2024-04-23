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
}
