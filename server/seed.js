import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import PromoCode from './models/PromoCode.js';
import Admin from './models/Admin.js';

dotenv.config();

const seedData = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.log('No MONGO_URI specified in .env, skipping seed.');
      process.exit(0);
    }
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    // 1. Seed Promo Code
    const promoExists = await PromoCode.findOne({ code: 'WALEED' });
    if (!promoExists) {
      await PromoCode.create({
        code: 'WALEED',
        discountPercent: 50,
      });
      console.log('Promo code WALEED seeded successfully (50% OFF)');
    } else {
      console.log('Promo code WALEED already exists');
    }

    // 2. Seed Default Admin
    const adminExists = await Admin.findOne({ username: 'admin' });
    if (!adminExists) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      await Admin.create({
        username: 'admin',
        password: hashedPassword,
      });
      console.log('Default admin created:');
      console.log('  Username: admin');
      console.log('  Password: admin123');
    } else {
      console.log('Admin account already exists');
    }

    process.exit(0);
  } catch (error) {
    console.error(`Seed error: ${error.message}`);
    process.exit(1);
  }
};

seedData();
