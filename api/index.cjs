const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../backend/.env') });

const connectDB = require('../backend/db');
const app      = require('../backend/server');

let connected = false;

module.exports = async (req, res) => {
  if (!connected) {
    await connectDB();
    connected = true;
  }
  // Strip /api prefix so Express routes match correctly
  req.url = req.url.replace(/^\/api/, '') || '/';
  return app(req, res);
};
