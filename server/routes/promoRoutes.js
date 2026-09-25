import express from 'express';
import PromoCode from '../models/PromoCode.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @route   POST /api/promo/validate
// @desc    Validate promo code
// @access  Public
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    const promo = await PromoCode.findOne({ code: code.toUpperCase() });

    if (promo && promo.isActive) {
      res.json({ discountPercent: promo.discountPercent });
    } else {
      res.status(400).json({ message: 'Invalid or inactive promo code' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/promo
// @desc    Create promo code
// @access  Private/Admin
router.post('/', protect, async (req, res) => {
  try {
    const { code, discountPercent } = req.body;
    const promoExists = await PromoCode.findOne({ code: code.toUpperCase() });

    if (promoExists) {
      return res.status(400).json({ message: 'Promo code already exists' });
    }

    const promo = new PromoCode({
      code,
      discountPercent,
    });

    const createdPromo = await promo.save();
    res.status(201).json(createdPromo);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/promo
// @desc    Get all promo codes
// @access  Private/Admin
router.get('/', protect, async (req, res) => {
  try {
    const promos = await PromoCode.find({});
    res.json(promos);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/promo/:id
// @desc    Delete a promo code
// @access  Private/Admin
router.delete('/:id', protect, async (req, res) => {
  try {
    const promo = await PromoCode.findById(req.params.id);

    if (promo) {
      await promo.deleteOne();
      res.json({ message: 'Promo code removed' });
    } else {
      res.status(404).json({ message: 'Promo code not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
