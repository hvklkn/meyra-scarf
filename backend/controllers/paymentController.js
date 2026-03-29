const { generateOrderNumber }  = require('../utils/orderNumber');
const { processPayment }       = require('../services/paymentService');
const Order                    = require('../models/Order');

const SHIPPING_FEE = 50;

// POST /api/payments/initiate
exports.initiate = async (req, res) => {
  const { customer, items, card } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────
  if (!customer || !items || !card) {
    return res.status(400).json({ error: 'Eksik ödeme bilgileri' });
  }

  const { customerName, phone, email, address, city, district, postalCode } = customer;
  if (!customerName || !phone || !email || !address || !city) {
    return res.status(400).json({ error: 'Müşteri bilgileri eksik' });
  }

  if (!card.cardNumber || !card.cardHolder || !card.expiryMonth || !card.expiryYear || !card.cvv) {
    return res.status(400).json({ error: 'Kart bilgileri eksik' });
  }

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Sepet boş' });
  }

  // ── Build order items & totals ───────────────────────────────────────────
  const orderItems = items.map((item) => ({
    productId  : item.id,
    productName: item.name,
    quantity   : item.quantity,
    unitPrice  : item.price,
    subtotal   : item.price * item.quantity,
  }));

  const subtotal = orderItems.reduce((sum, i) => sum + i.subtotal, 0);
  const total    = subtotal + SHIPPING_FEE;

  const orderNumber = generateOrderNumber();

  const newOrder = await Order.create({
    orderNumber,
    customerName,
    phone,
    email,
    address,
    city,
    district     : district || '',
    postalCode   : postalCode || '',
    items        : orderItems,
    subtotal,
    shippingFee  : SHIPPING_FEE,
    total,
    paymentMethod: 'credit_card',
    paymentStatus: 'pending',
    orderStatus  : 'payment_pending',
  });

  // ── Process payment ──────────────────────────────────────────────────────
  let paymentResult;
  try {
    paymentResult = await processPayment({ amount: total, orderId: newOrder._id.toString(), card });
  } catch (err) {
    await Order.findByIdAndUpdate(newOrder._id, { paymentStatus: 'failed', orderStatus: 'cancelled' });
    return res.status(500).json({ success: false, error: 'Ödeme işlemi başlatılamadı' });
  }

  if (paymentResult.success) {
    await Order.findByIdAndUpdate(newOrder._id, { paymentStatus: 'paid', orderStatus: 'preparing' });
    return res.json({ success: true, orderNumber, orderId: newOrder._id.toString() });
  } else {
    await Order.findByIdAndUpdate(newOrder._id, { paymentStatus: 'failed', orderStatus: 'cancelled' });
    return res.status(402).json({
      success: false,
      error  : paymentResult.errorMessage || 'Ödeme reddedildi',
    });
  }
};

// GET /api/payments/:orderId/status
exports.getStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json({
      orderId      : order._id.toString(),
      orderNumber  : order.orderNumber,
      paymentStatus: order.paymentStatus,
      orderStatus  : order.orderStatus,
    });
  } catch (err) {
    res.status(500).json({ error: 'Durum alınamadı' });
  }
};

// POST /api/payments/callback
exports.callback = (req, res) => {
  console.log('Payment callback received:', req.body);
  res.json({ received: true });
};
