import express from 'express';
import Order from '../models/Order.js';
import { protect } from '../middleware/auth.js';
import { isMongoConnected } from '../config/db.js';

const router = express.Router();

// In-memory fallback orders
let inMemoryOrders = [
  {
    _id: 'ord_demo_101',
    customerName: 'Demo Customer',
    customerEmail: 'customer@example.com',
    customerPhone: '03001234567',
    paymentMethod: 'JazzCash',
    promoCode: 'WALEED',
    amount: 10,
    status: 'pending',
    transactionId: 'TXN-987654321',
    createdAt: new Date(),
  }
];

// @route   POST /api/orders
// @desc    Create new order
// @access  Public
router.post('/', async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      promoCode,
      amount,
      transactionId,
    } = req.body;

    if (!isMongoConnected) {
      const newOrder = {
        _id: `ord_${Date.now()}`,
        customerName,
        customerEmail,
        customerPhone,
        paymentMethod,
        promoCode: promoCode || '',
        amount: Number(amount) || 20,
        status: 'pending',
        transactionId: transactionId || '',
        createdAt: new Date(),
      };
      inMemoryOrders.unshift(newOrder);
      return res.status(201).json(newOrder);
    }

    const order = new Order({
      customerName,
      customerEmail,
      customerPhone,
      paymentMethod,
      promoCode,
      amount,
      transactionId,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/orders
// @desc    Get all orders
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    if (!isMongoConnected) {
      return res.json(inMemoryOrders);
    }
    const orders = await Order.find({}).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/orders/:id
// @desc    Get order by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    if (!isMongoConnected) {
      const order = inMemoryOrders.find((o) => o._id === req.params.id);
      if (order) {
        return res.json(order);
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PATCH /api/orders/:id/status
// @desc    Update order status
// @access  Private/Admin
router.patch('/:id/status', protect, async (req, res) => {
  try {
    const { status } = req.body;

    if (!isMongoConnected) {
      const order = inMemoryOrders.find((o) => o._id === req.params.id);
      if (order) {
        order.status = status;
        return res.json(order);
      } else {
        return res.status(404).json({ message: 'Order not found' });
      }
    }

    const order = await Order.findById(req.params.id);
    if (order) {
      order.status = status;
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
