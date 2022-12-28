const express = require('express');
const router = express.Router();
const keys = require('../../config/keys');
const {isAuthenticatedUser} = require('../../middleware/auth')

const stripe = require("stripe")(keys.stripeSecretKey);


router.post('/payment/process', isAuthenticatedUser, async (req, res) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "Caper Sports",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myPayment.client_secret });
});



router.get('/stripeapikey', isAuthenticatedUser, (req, res) => {
  res.status(200).json({ stripeApiKey: keys.stripeApiKey });
});

module.exports = router;