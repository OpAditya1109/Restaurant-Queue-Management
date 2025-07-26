// models/Queue.js
import mongoose from 'mongoose';

const QueueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  joinedAt: { type: Date, default: Date.now },
});

export default mongoose.model('Queue', QueueSchema);
