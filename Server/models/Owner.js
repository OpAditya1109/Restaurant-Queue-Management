import mongoose from 'mongoose';

const RestaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, unique: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  address: { type: String, required: true },     // ✅ Added
  phone: { type: String, required: true },       // ✅ Added
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Restaurant', RestaurantSchema);
