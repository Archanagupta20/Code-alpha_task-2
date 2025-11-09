const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword });
  await user.save();
  res.send('User registered successfully');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.send('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.send('Invalid password');
  res.send(`Welcome ${user.name}`);
});

module.exports = router;