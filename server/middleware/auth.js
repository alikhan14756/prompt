import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
import { isMongoConnected } from '../config/db.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret123');

      if (isMongoConnected) {
        req.admin = await Admin.findById(decoded.id).select('-password');
      } else {
        req.admin = { _id: decoded.id, username: 'admin' };
      }

      return next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};
