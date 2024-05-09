import mongoose, { Schema, model } from 'mongoose';
import { Chat } from '@/helpers/types';

const chatsData = new Schema<Chat>({
  uuid: {
    type: String,
    unique: true,
    required: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  sender: {
    type: String,
    required: true,
  },
  target: {
    type: String,
    required: true,
  },
  timestamp: Number,
});

const ChatModel = mongoose.models.Chat || model<Chat>('Chat', chatsData);

export default ChatModel;

