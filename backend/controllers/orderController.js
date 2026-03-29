const Order = require('../models/Order');

// GET /api/orders  — admin
exports.getAll = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Siparişler alınamadı' });
  }
};

// GET /api/orders/:id  — admin
exports.getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Sipariş alınamadı' });
  }
};

// GET /api/orders/tracking/:orderNumber  — public (requires email or phone query param)
exports.getByOrderNumber = async (req, res) => {
  try {
    const { orderNumber } = req.params;
    const { email, phone } = req.query;

    if (!email && !phone) {
      return res.status(400).json({ error: 'E-posta veya telefon numarası gerekli' });
    }

    const order = await Order.findOne({ orderNumber });
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });

    // Verify ownership
    const emailMatch = email && order.email.toLowerCase() === email.toLowerCase();
    const phoneMatch = phone && order.phone.replace(/\s/g, '') === phone.replace(/\s/g, '');

    if (!emailMatch && !phoneMatch) {
      return res.status(403).json({ error: 'Sipariş bilgileri eşleşmiyor' });
    }

    res.json({
      orderNumber      : order.orderNumber,
      createdAt        : order.createdAt,
      customerName     : order.customerName,
      items            : order.items,
      subtotal         : order.subtotal,
      shippingFee      : order.shippingFee,
      total            : order.total,
      paymentStatus    : order.paymentStatus,
      orderStatus      : order.orderStatus,
      cargoCompany     : order.cargoCompany,
      trackingNumber   : order.trackingNumber,
      cargoTrackingUrl : order.cargoTrackingUrl,
      cargoStatus      : order.cargoStatus,
    });
  } catch (err) {
    res.status(500).json({ error: 'Sipariş alınamadı' });
  }
};

// PUT /api/orders/:id/status  — admin
exports.updateStatus = async (req, res) => {
  try {
    const { paymentStatus, orderStatus } = req.body;
    const patch = {};
    if (paymentStatus) patch.paymentStatus = paymentStatus;
    if (orderStatus)   patch.orderStatus   = orderStatus;

    const order = await Order.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Durum güncellenemedi' });
  }
};

// PUT /api/orders/:id/cargo  — admin
exports.updateCargo = async (req, res) => {
  try {
    const { cargoCompany, trackingNumber, cargoTrackingUrl, cargoStatus } = req.body;
    const patch = {};
    if (cargoCompany     !== undefined) patch.cargoCompany     = cargoCompany;
    if (trackingNumber   !== undefined) patch.trackingNumber   = trackingNumber;
    if (cargoTrackingUrl !== undefined) patch.cargoTrackingUrl = cargoTrackingUrl;
    if (cargoStatus      !== undefined) patch.cargoStatus      = cargoStatus;

    if (cargoStatus === 'shipped' || cargoStatus === 'in_transit') {
      patch.orderStatus = 'shipped';
    }
    if (cargoStatus === 'delivered') {
      patch.orderStatus = 'delivered';
    }

    const order = await Order.findByIdAndUpdate(req.params.id, patch, { new: true });
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Kargo bilgileri güncellenemedi' });
  }
};
