const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const connectDB = require('./db');
const app      = require('./server');

let connected = false;

module.exports = async (req, res) => {
  if (!connected) {
    await connectDB();
    connected = true;
  }
  return app(req, res);
};
