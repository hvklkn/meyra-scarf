const fs   = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '../data/orders.json');

const readOrders = () => {
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
};

const writeOrders = (orders) => {
  fs.writeFileSync(DATA_FILE, JSON.stringify(orders, null, 2), 'utf-8');
};

module.exports = { readOrders, writeOrders };
