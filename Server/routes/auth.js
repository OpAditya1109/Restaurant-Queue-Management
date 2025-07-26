import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Restaurant from '../models/Owner.js';
import dotenv from 'dotenv';
dotenv.config();
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;


// Register
router.post('/register', async (req, res) => {
  const { name, email, password, phone, address } = req.body;

  // Check if restaurant already exists by email
  const existing = await Restaurant.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already in use' });

  const slug = name.toLowerCase().replace(/\s+/g, '');
  const passwordHash = await bcrypt.hash(password, 10);

  const newRestaurant = new Restaurant({
    name,
    slug,
    email,
    phone,       // ✅ Added
    address,     // ✅ Added
    passwordHash,
  });

  await newRestaurant.save();

  res.json({ message: 'Registered successfully' });
});


// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const restaurant = await Restaurant.findOne({ email });
  if (!restaurant) return res.status(400).json({ message: 'Invalid email' });

  const isMatch = await bcrypt.compare(password, restaurant.passwordHash);
  if (!isMatch) return res.status(400).json({ message: 'Invalid password' });

  const token = jwt.sign({ id: restaurant._id }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, restaurant: { _id: restaurant._id, name: restaurant.name, slug: restaurant.slug } });
});


export default router;
