import express from 'express';
import PromoCode from '../models/PromoCode.js';
import { protect } from '../middleware/auth.js';
import { isMongoConnected } from '../config/db.js';

const router = express.Router();

// In-memory fallback promo codes
let inMemoryPromos = [
  {
    _id: 'promo_waleed_id',
    code: 'WALEED',
    discountPercent: 50,
    isActive: true,
    usageCount: 0,
    createdAt: new Date(),
  }
];

// @route   POST /api/promo/validate
// @desc    Validate promo code
// @access  Public
router.post('/validate', async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({ message: 'Promo code is required' });
    }

    const upperCode = code.trim().toUpperCase();

    if (!isMongoConnected) {
      const promo = inMemoryPromos.find((p) => p.code === upperCode && p.isActive);
      if (promo) {
        return res.json({ discountPercent: promo.discountPercent });
      } else {
        return res.status(400).json({ message: 'Invalid or inactive promo code' });
      }
    }

    const promo = await PromoCode.findOne({ code: upperCode });
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
    const upperCode = code.trim().toUpperCase();

    if (!isMongoConnected) {
      const exists = inMemoryPromos.find((p) => p.code === upperCode);
      if (exists) {
        return res.status(400).json({ message: 'Promo code already exists' });
      }
      const newPromo = {
        _id: `promo_${Date.now()}`,
        code: upperCode,
        discountPercent: Number(discountPercent),
        isActive: true,
        usageCount: 0,
        createdAt: new Date(),
      };
      inMemoryPromos.push(newPromo);
      return res.status(201).json(newPromo);
    }

    const promoExists = await PromoCode.findOne({ code: upperCode });
    if (promoExists) {
      return res.status(400).json({ message: 'Promo code already exists' });
    }

    const promo = new PromoCode({
      code: upperCode,
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
    if (!isMongoConnected) {
      return res.json(inMemoryPromos);
    }
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
    if (!isMongoConnected) {
      inMemoryPromos = inMemoryPromos.filter((p) => p._id !== req.params.id);
      return res.json({ message: 'Promo code removed' });
    }

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
