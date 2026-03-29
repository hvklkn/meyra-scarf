const { v4: uuidv4 }          = require('uuid');
const { readOrders, writeOrders } = require('../utils/ordersDb');
const { generateOrderNumber }     = require('../utils/orderNumber');
const { processPayment }          = require('../services/paymentService');

const SHIPPING_FEE = 50; // TL — free shipping threshold can be added here

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

  // ── Create order in pending state ────────────────────────────────────────
  const orderId     = uuidv4();
  const orderNumber = generateOrderNumber();
  const now         = new Date().toISOString();

  const newOrder = {
    id           : orderId,
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
    cargoCompany    : '',
    trackingNumber  : '',
    cargoTrackingUrl: '',
    cargoStatus  : 'not_created',
    createdAt    : now,
    updatedAt    : now,
  };

  const orders = readOrders();
  orders.push(newOrder);
  writeOrders(orders);

  // ── Process payment ──────────────────────────────────────────────────────
  let paymentResult;
  try {
    paymentResult = await processPayment({ amount: total, orderId, card });
  } catch (err) {
    // Unexpected error from payment service
    _updateOrderStatus(orderId, { paymentStatus: 'failed', orderStatus: 'cancelled' });
    return res.status(500).json({ success: false, error: 'Ödeme işlemi başlatılamadı' });
  }

  // ── Update order based on result ─────────────────────────────────────────
  if (paymentResult.success) {
    _updateOrderStatus(orderId, { paymentStatus: 'paid', orderStatus: 'preparing' });
    return res.json({ success: true, orderNumber, orderId });
  } else {
    _updateOrderStatus(orderId, { paymentStatus: 'failed', orderStatus: 'cancelled' });
    return res.status(402).json({
      success: false,
      error  : paymentResult.errorMessage || 'Ödeme reddedildi',
    });
  }
};

// GET /api/payments/:orderId/status  — admin
exports.getStatus = (req, res) => {
  try {
    const orders = readOrders();
    const order  = orders.find((o) => o.id === req.params.orderId);
    if (!order) return res.status(404).json({ error: 'Sipariş bulunamadı' });
    res.json({
      orderId      : order.id,
      orderNumber  : order.orderNumber,
      paymentStatus: order.paymentStatus,
      orderStatus  : order.orderStatus,
    });
  } catch (err) {
    res.status(500).json({ error: 'Durum alınamadı' });
  }
};

// POST /api/payments/callback  — webhook stub for future provider integration
exports.callback = (req, res) => {
  // TODO: Validate webhook signature from payment provider
  // TODO: Update order status based on provider event
  console.log('Payment callback received:', req.body);
  res.json({ received: true });
};

// ── Helpers ──────────────────────────────────────────────────────────────────
function _updateOrderStatus(orderId, patch) {
  try {
    const orders = readOrders();
    const index  = orders.findIndex((o) => o.id === orderId);
    if (index === -1) return;
    orders[index] = { ...orders[index], ...patch, updatedAt: new Date().toISOString() };
    writeOrders(orders);
  } catch (e) {
    console.error('Order status update failed:', e);
  }
}
