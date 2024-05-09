'use server';

import mongoose from 'mongoose';

const url = 'mongodb://xyrus10:5Zxmk89P868gf%2BmX@192.168.69.70:27017/chats';

const db = async () => {
  if (mongoose.connection?.readyState === 1) {
    return true;
  }
  try {
    await mongoose.connect(url);
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
export default db;
