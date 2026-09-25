import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { protect } from '../middleware/auth.js';
import { isMongoConnected } from '../config/db.js';

const router = express.Router();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret123', {
    expiresIn: '30d',
  });
};

// In-memory fallback admin credentials
let inMemoryAdmin = {
  _id: 'default_admin_id',
  username: 'admin',
  password: 'admin123',
};

// @route   POST /api/admin/login
// @desc    Auth admin & get token
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!isMongoConnected) {
      if (
        (username === inMemoryAdmin.username && password === inMemoryAdmin.password) ||
        (username === 'Muhammad Ali' && password === inMemoryAdmin.password)
      ) {
        return res.json({
          _id: inMemoryAdmin._id,
          username: inMemoryAdmin.username,
          token: generateToken(inMemoryAdmin._id),
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

// @route   PUT /api/admin/password
// @desc    Update admin username and password
// @access  Private/Admin
router.put('/password', protect, async (req, res) => {
  try {
    const { newUsername, newPassword } = req.body;

    if (!newPassword || newPassword.length < 4) {
      return res.status(400).json({ message: 'New password must be at least 4 characters long' });
    }

    if (!isMongoConnected) {
      if (newUsername && newUsername.trim()) {
        inMemoryAdmin.username = newUsername.trim();
      }
      inMemoryAdmin.password = newPassword;

      return res.json({
        message: 'Password updated successfully!',
        username: inMemoryAdmin.username,
        token: generateToken(inMemoryAdmin._id),
      });
    }

    let admin = await Admin.findById(req.admin._id);
    if (!admin) {
      admin = await Admin.findOne({});
    }

    if (admin) {
      if (newUsername && newUsername.trim()) {
        admin.username = newUsername.trim();
      }

      const salt = await bcrypt.genSalt(10);
      admin.password = await bcrypt.hash(newPassword, salt);
      const updatedAdmin = await admin.save();

      res.json({
        message: 'Password updated successfully!',
        username: updatedAdmin.username,
        token: generateToken(updatedAdmin._id),
      });
    } else {
      res.status(404).json({ message: 'Admin account not found' });
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
      inMemoryAdmin.username = username;
      inMemoryAdmin.password = password;
      return res.json({
        _id: inMemoryAdmin._id,
        username,
        token: generateToken(inMemoryAdmin._id),
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
