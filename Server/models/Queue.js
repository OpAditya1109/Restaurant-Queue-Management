// models/Queue.js
import mongoose from 'mongoose';

const QueueSchema = new mongoose.Schema({
  name: { type: String, required: true },
  seats: { type: Number, default: 1, min: 1 }, // <--- Add this line
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  joinedAt: { type: Date, default: Date.now },
});


export default mongoose.model('Queue', QueueSchema);
