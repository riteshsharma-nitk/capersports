const express = require('express');
const router = express.Router()

const {isAuthenticatedUser, authorizeRoles} = require('../../middleware/auth')
const ApiFeatures = require('../../utils/apiFeatures')

// Load models
const Order = require('../../models/Order');
const Product = require('../../models/Product');
const User = require('../../models/User');

// Create new Order
router.post('/order/new', isAuthenticatedUser, async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const order = await Order.create({
    shippingInfo,
    orderItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});

// get Single Order
router.get('/order/:id', isAuthenticatedUser, async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!order) {
    return res.status(404).json({
        success: true,
        message:"Order not found with this Id"
      });
  }

  res.status(200).json({
    success: true,
    order,
  });
});

// get logged in user  Orders
router.get('/orders/me', isAuthenticatedUser, async (req, res) => {
  const orders = await Order.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    orders,
  });
});


// get all Orders -- Admin
router.get('/admin/orders', isAuthenticatedUser, authorizeRoles("admin"), async (req, res) => {
  const orders = await Order.find();

  let totalAmount = 0;

  orders.forEach((order) => {
    totalAmount += order.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders,
  });
});

// update Order Status -- Admin
router.put('/admin/order/:id', isAuthenticatedUser,authorizeRoles("admin"), async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
        success:false,
        message:"Order not found with this Id"
    })
  }

  if (order.orderStatus === "Delivered") {
    return res.status(400).json({
        success:false,
        message:"You have already delivered this order"
    })
  }

  if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (o) => {
      await updateStock(o.product, o.quantity);
    });
  }
  order.orderStatus = req.body.status;

  if (req.body.status === "Delivered") {
    order.deliveredAt = Date.now();
  }

  await order.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const product = await Product.findById(id);

  product.Stock -= quantity;

  await product.save({ validateBeforeSave: false });
}

// delete Order -- Admin
router.delete('/admin/order/:id',isAuthenticatedUser, async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return res.status(404).json({
        success:false,
        message:"Order not found with this Id"
    })
  }

  await order.remove();

  res.status(200).json({
    success: true,
  });
});

module.exports = router;