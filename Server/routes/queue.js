import express from 'express';
import mongoose from 'mongoose';
import Queue from '../models/Queue.js';

const router = express.Router();
router.get('/:restaurantId/stats', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: 'Invalid restaurantId format' });
    }

    const queue = await Queue.find({ restaurantId });

    const inQueue = queue.length;

    // Calculate average wait time (example: 5 minutes per person)
    const avgWaitTime = inQueue * 3; // adjust logic if needed

    res.json({
      inQueue,
      avgWaitTime,
    });
  } catch (err) {
    console.error('Error getting queue stats:', err);
    res.status(500).json({ message: 'Server error' });
  }
});
// Get all queue entries for a specific restaurant
router.get('/:restaurantId', async (req, res) => {
  try {
    const { restaurantId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(restaurantId)) {
      return res.status(400).json({ message: 'Invalid restaurantId format' });
    }

    const queue = await Queue.find({ restaurantId }).sort({ joinedAt: 1 });
    res.json(queue);
  } catch (err) {
    console.error('Error fetching queue:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Join the queue for a restaurant
router.post('/join', async (req, res) => {
  try {
    const { name, restaurantId, seats } = req.body;

    if (!name || !restaurantId) {
      return res.status(400).json({ message: 'Name and restaurantId are required' });
    }

    if (!seats || seats < 1) {
      return res.status(400).json({ message: 'Number of seats must be at least 1' });
    }

    // Prevent duplicate entries
    const existing = await Queue.findOne({ name, restaurantId });
    if (existing) {
      return res.status(409).json({ message: 'Already in queue' });
    }

    const newEntry = new Queue({
      name: name.trim(),
      restaurantId,
      seats,
    });

    await newEntry.save();

    res.status(201).json({ message: 'Joined the queue successfully' });
  } catch (err) {
    console.error('Error joining queue:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Leave the queue
router.post('/leave', async (req, res) => {
  try {
    const { name, restaurantId } = req.body;
    if (!name || !restaurantId) {
      return res.status(400).json({ message: 'Name and restaurantId are required' });
    }

    const result = await Queue.findOneAndDelete({ name, restaurantId });
    if (!result) {
      return res.status(404).json({ message: 'Not found in queue' });
    }

    res.status(200).json({ message: 'Left the queue successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post("/mark-seated", async (req, res) => {
  let { name, restaurantId } = req.body;

  try {
    // Trim and sanitize name
    name = name.trim();

    // Use case-insensitive regex for name match
    const removed = await Queue.findOneAndDelete({
      name: { $regex: `^${name}$`, $options: 'i' },
      restaurantId
    });

    if (!removed) {
      return res.status(404).json({ message: "User not found in queue" });
    }

    res.status(200).json({ message: "User marked as seated and removed from queue" });
  } catch (err) {
    console.error("Error in /mark-seated:", err);
    res.status(500).json({ message: "Server error" });
  }
});



export default router;
