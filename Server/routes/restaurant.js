// routes/restaurant.js
import express from 'express';
import authMiddleware from '../middleware/auth.js';
import Restaurant from '../models/Owner.js'; // Adjust as needed
const router = express.Router();



// Get restaurant by ID


router.get('/all', async (req, res) => {
  try {
    const restaurants = await Restaurant.find().select('name'); // Only fetch name
    res.json(restaurants);
  } catch (err) {
    console.error('Failed to fetch restaurants:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.user.id).select('-passwordHash');

    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }

    // Simulated stats (replace with actual logic as needed)
    const stats = {
      todayQueueCount: 12,
      inQueue: 5,
      served: 7,
      avgWaitTime: 15,
    };

    res.json({
      ...stats,
      profile: {
        name: restaurant.name,
        email: restaurant.email,
        phone: restaurant.phone || '',      // ✅ Include phone number
        address: restaurant.address || '',  // ✅ Already included
      },
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }
    res.json(restaurant);
  } catch (err) {
    console.error("Error fetching restaurant by ID:", err);
    res.status(500).json({ message: "Server error" });
  }
});
export default router;
