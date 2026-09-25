import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PromoCode from './models/PromoCode.js';

dotenv.config();

const seedPromoCode = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected for seeding...');

    const promoExists = await PromoCode.findOne({ code: 'WALEED' });

    if (!promoExists) {
      await PromoCode.create({
        code: 'WALEED',
        discountPercent: 50,
      });
      console.log('Promo code WALEED seeded successfully');
    } else {
      console.log('Promo code WALEED already exists');
    }

    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

seedPromoCode();
