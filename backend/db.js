const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log('MongoDB bağlantısı kuruldu');
  } catch (err) {
    console.error('MongoDB bağlantı hatası:', err.message);
    throw err;
  }
};

module.exports = connectDB;
