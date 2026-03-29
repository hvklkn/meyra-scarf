require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes  = require('./routes/products');
const adminRoutes    = require('./routes/admin');
const orderRoutes    = require('./routes/orders');
const paymentRoutes  = require('./routes/payments');
const settingsRoutes = require('./routes/settings');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/admin',    adminRoutes);
app.use('/api/orders',   orderRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/settings', settingsRoutes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint bulunamadı' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Sunucu hatası' });
});

app.listen(PORT, () => {
  console.log(`Meyra Scarf API sunucusu http://localhost:${PORT} adresinde çalışıyor`);
});
