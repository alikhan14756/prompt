import mongoose from 'mongoose';

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercent: { type: Number, required: true },
    isActive: { type: Boolean, default: true },
    usageCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const PromoCode = mongoose.model('PromoCode', promoCodeSchema);
export default PromoCode;
