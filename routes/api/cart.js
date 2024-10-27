const express = require('express');
const router = express.Router()

const {isAuthenticatedUser, authorizeRoles} = require('../../middleware/auth')
const ApiFeatures = require('../../utils/apiFeatures')

// Load models
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const User = require('../../models/User');

// Create new Order
router.post('/cart/new', isAuthenticatedUser, async (req, res) => {
  const {
    cartItems,
  } = req.body;

  const cart = await Cart.create({
    cartItems,
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    cart,
  });
});

// get Single Order
router.get('/cart/:id', isAuthenticatedUser, async (req, res) => {
  const cart = await Cart.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!cart) {
    return res.status(404).json({
        success: true,
        message:"Cart not found with this Id"
      });
  }

  res.status(200).json({
    success: true,
    cart,
  });
});

// get logged in user Orders
router.get('/cart/me', isAuthenticatedUser, async (req, res) => {
  const cart = await Cart.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    cart,
  });
});


// delete Cart -- Admin
router.delete('/cart/:id',isAuthenticatedUser, async (req, res) => {
  const cart = await Cart.findById(req.params.id);

  if (!cart) {
    return res.status(404).json({
        success:false,
        message:"Cart not found with this Id"
    })
  }

  await cart.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = router;