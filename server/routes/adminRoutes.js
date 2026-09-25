import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { isMongoConnected } from '../config/db.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// In-memory fallback admin
let inMemoryAdmins = [
  {
    _id: 'default_admin_id',
    username: 'admin',
    passwordHash: '$2a$10$sXz7.pvhYJ.U5Z9Z4q2jqu5jHn8qT7m5e0WvU1Xh3b4n5m6k7l8i9', // admin123
  }
];

// @route   POST /api/admin/login
// @desc    Auth admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isMongoConnected) {
      // Check fallback admin
      if ((username === 'admin' && password === 'admin123') || (username === 'Muhammad Ali' && password === 'admin123')) {
        return res.json({
          _id: 'default_admin_id',
          username: username,
          token: generateToken('default_admin_id'),
        });
      }
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const admin = await Admin.findOne({ username });

    if (admin && (await bcrypt.compare(password, admin.password))) {
      res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/admin/setup
// @desc    One-time setup to create admin user
// @access  Public (only if no admin exists)
router.post('/setup', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isMongoConnected) {
      return res.json({
        _id: 'default_admin_id',
        username,
        token: generateToken('default_admin_id'),
        message: 'Admin created in local session'
      });
    }

    const adminExists = await Admin.findOne({});
    if (adminExists) {
      return res.status(400).json({ message: 'Admin already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = await Admin.create({
      username,
      password: hashedPassword,
    });

    if (admin) {
      res.status(201).json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid admin data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
