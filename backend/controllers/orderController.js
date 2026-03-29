const { v4: uuidv4 } = require('uuid');
const { readOrders, writeOrders } = require('../utils/ordersDb');

// GET /api/orders  — admin
exports.getAll = (req, res) => {
  try {
    const orders = readOrders();
    // Sort newest first
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Siparişler alınamadı' });
  }
};

// GET /api/orders/:id  — admin
exports.getById = (req, res) => {
  try {
    const orders  = readOrders();
    const order   = orders.find((o) => o.id === req.params.id);
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Sipariş alınamadı' });
  }
};

// GET /api/orders/tracking/:orderNumber  — public (requires email or phone query param)
exports.getByOrderNumber = (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { email, phone } = req.query;

    if (!email && !phone) {
      return res.status(400).json({ error: 'E-posta veya telefon numarası gerekli' });
    }

    const orders = readOrders();
    const order  = orders.find((o) => o.orderNumber === orderNumber);

    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });

    // Verify ownership
    const emailMatch = email && order.email.toLowerCase() === email.toLowerCase();
    const phoneMatch = phone && order.phone.replace(/\s/g, '') === phone.replace(/\s/g, '');

    if (!emailMatch && !phoneMatch) {
      return res.status(403).json({ error: 'Sipariş bilgileri eşleşmiyor' });
    }

    // Return a safe subset — don't expose full card data (we don't store it anyway)
    res.json({
      orderNumber  : order.orderNumber,
      createdAt    : order.createdAt,
      customerName : order.customerName,
      items        : order.items,
      subtotal     : order.subtotal,
      shippingFee  : order.shippingFee,
      total        : order.total,
      paymentStatus: order.paymentStatus,
      orderStatus  : order.orderStatus,
      cargoCompany : order.cargoCompany,
      trackingNumber: order.trackingNumber,
      cargoTrackingUrl: order.cargoTrackingUrl,
      cargoStatus  : order.cargoStatus,
    });
  } catch (err) {
    res.status(500).json({ error: 'Sipariş alınamadı' });
  }
};

// PUT /api/orders/:id/status  — admin
exports.updateStatus = (req, res) => {
  try {
    const { paymentStatus, orderStatus } = req.body;
    const orders = readOrders();
    const index  = orders.findIndex((o) => o.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Sipariş bulunamadı' });

    if (paymentStatus) orders[index].paymentStatus = paymentStatus;
    if (orderStatus)   orders[index].orderStatus   = orderStatus;
    orders[index].updatedAt = new Date().toISOString();

    writeOrders(orders);
    res.json(orders[index]);
  } catch (err) {
    res.status(500).json({ error: 'Durum güncellenemedi' });
  }
};

// PUT /api/orders/:id/cargo  — admin
exports.updateCargo = (req, res) => {
  try {
    const { cargoCompany, trackingNumber, cargoTrackingUrl, cargoStatus } = req.body;
    const orders = readOrders();
    const index  = orders.findIndex((o) => o.id === req.params.id);

    if (index === -1) return res.status(404).json({ error: 'Sipariş bulunamadı' });

    if (cargoCompany     !== undefined) orders[index].cargoCompany     = cargoCompany;
    if (trackingNumber   !== undefined) orders[index].trackingNumber   = trackingNumber;
    if (cargoTrackingUrl !== undefined) orders[index].cargoTrackingUrl = cargoTrackingUrl;
    if (cargoStatus      !== undefined) orders[index].cargoStatus      = cargoStatus;

    // Auto-update orderStatus to shipped if cargo is shipped
    if (cargoStatus === 'shipped' || cargoStatus === 'in_transit') {
      orders[index].orderStatus = 'shipped';
    }
    if (cargoStatus === 'delivered') {
      orders[index].orderStatus = 'delivered';
    }

    orders[index].updatedAt = new Date().toISOString();
    writeOrders(orders);
    res.json(orders[index]);
  } catch (err) {
    res.status(500).json({ error: 'Kargo bilgileri güncellenemedi' });
  }
};
