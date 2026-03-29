const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    productId:   { type: String, required: true },
    productName: { type: String, required: true },
    quantity:    { type: Number, required: true },
    unitPrice:   { type: Number, required: true },
    subtotal:    { type: Number, required: true },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderNumber:     { type: String, required: true, unique: true },
    customerName:    { type: String, required: true },
    phone:           { type: String, required: true },
    email:           { type: String, required: true },
    address:         { type: String, required: true },
    city:            { type: String, required: true },
    district:        { type: String, default: '' },
    postalCode:      { type: String, default: '' },
    items:           [orderItemSchema],
    subtotal:        { type: Number, required: true },
    shippingFee:     { type: Number, required: true },
    total:           { type: Number, required: true },
    paymentMethod:   { type: String, default: 'credit_card' },
    paymentStatus:   { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
    orderStatus:     {
      type: String,
      enum: ['payment_pending', 'preparing', 'shipped', 'delivered', 'cancelled'],
      default: 'payment_pending',
    },
    cargoCompany:    { type: String, default: '' },
    trackingNumber:  { type: String, default: '' },
    cargoTrackingUrl:{ type: String, default: '' },
    cargoStatus:     {
      type: String,
      enum: ['not_created', 'shipped', 'in_transit', 'delivered'],
      default: 'not_created',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
