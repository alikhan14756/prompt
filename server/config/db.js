import mongoose from 'mongoose';

export let isMongoConnected = false;

const connectDB = async () => {
  if (!process.env.MONGO_URI || process.env.MONGO_URI.includes('your_username')) {
    console.log('⚠️  MONGO_URI not configured in server/.env. Running in local in-memory fallback mode.');
    isMongoConnected = false;
    return;
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    isMongoConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.warn(`⚠️  MongoDB connection failed (${error.message}). Running in in-memory fallback mode.`);
    isMongoConnected = false;
  }
};

export default connectDB;
