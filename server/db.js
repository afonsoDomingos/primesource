import dns from 'dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Configure DNS servers to resolve MongoDB SRV records reliably on Windows
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
  console.warn('DNS server configuration fallback:', e.message);
}

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://karinganastudio23:VIbemongodb@cluster0.oe0akin.mongodb.net/primesourcedb?retryWrites=true&w=majority';

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) {
    return mongoose.connection;
  }

  try {
    const conn = await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000,
    });
    console.log(`[MongoDB] Ligado com sucesso à base de dados: ${conn.connection.name}`);
    return conn;
  } catch (error) {
    console.error('[MongoDB] Erro ao ligar ao MongoDB:', error.message);
    throw error;
  }
}

export default connectDB;
