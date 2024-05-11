import mongoose, { Schema, model } from 'mongoose';
import { User } from '@/helpers/types';

const usersData = new Schema<User>({
  id: {
    type: String,
    unique: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
    default: 'https://i.pravatar.cc/300',
  },
});

const UserModel = mongoose.models.User || model<User>('User', usersData);

export default UserModel;

