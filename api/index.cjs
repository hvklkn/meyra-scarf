const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const connectDB = require('../backend/db');
const app = require('../backend/server');

let isConnected = false;

module.exports = async (req, res) => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
  return app(req, res);
};
