const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/place', async (req, res) => {
  const { userId, products } = req.body;
  let totalPrice = 0;
  products.forEach(p => totalPrice += p.price * p.quantity);
  const order = new Order({ userId, products, totalPrice });
  await order.save();
  res.send('Order placed successfully');
});

router.get('/all', async (req, res) => {
  const orders = await Order.find().populate('userId').populate('products.productId');
  res.send(orders);
});

module.exports = router;