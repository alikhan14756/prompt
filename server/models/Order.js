import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ['JazzCash', 'EasyPaisa', 'SadaPay', 'NayaPay', 'Binance'],
    },
    promoCode: { type: String, default: null },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ['pending', 'confirmed', 'delivered'],
      default: 'pending',
    },
    transactionId: { type: String, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
