require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Product  = require('../models/Product');
const Order    = require('../models/Order');
const Settings = require('../models/Settings');

const PRODUCTS_FILE  = path.join(__dirname, '../data/products.json');
const ORDERS_FILE    = path.join(__dirname, '../data/orders.json');
const SETTINGS_FILE  = path.join(__dirname, '../data/siteSettings.json');

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log('MongoDB bağlantısı kuruldu');

  // ── Ürünler ─────────────────────────────────────────────────────────────
  if (fs.existsSync(PRODUCTS_FILE)) {
    const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf-8'));
    if (products.length > 0) {
      await Product.deleteMany({});
      const docs = products.map(({ id, ...rest }) => rest);
      await Product.insertMany(docs);
      console.log(`${docs.length} ürün aktarıldı`);
    }
  }

  // ── Siparişler ───────────────────────────────────────────────────────────
  if (fs.existsSync(ORDERS_FILE)) {
    const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf-8'));
    if (orders.length > 0) {
      await Order.deleteMany({});
      const docs = orders.map(({ id, createdAt, updatedAt, ...rest }) => ({
        ...rest,
        createdAt: createdAt ? new Date(createdAt) : undefined,
        updatedAt: updatedAt ? new Date(updatedAt) : undefined,
      }));
      await Order.insertMany(docs);
      console.log(`${docs.length} sipariş aktarıldı`);
    }
  }

  // ── Site Ayarları ────────────────────────────────────────────────────────
  if (fs.existsSync(SETTINGS_FILE)) {
    const settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    await Settings.deleteMany({});
    await Settings.create(settings);
    console.log('Site ayarları aktarıldı');
  }

  await mongoose.disconnect();
  console.log('Migration tamamlandı');
}

migrate().catch((err) => {
  console.error('Migration hatası:', err);
  process.exit(1);
});
