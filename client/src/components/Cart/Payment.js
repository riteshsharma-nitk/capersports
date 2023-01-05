import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
import {FormProvider} from '../../helper/hook-form'
import './Payment.css'
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import axios from "axios";

import CreditCardIcon from "@mui/icons-material/CreditCard";
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { createOrder, clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router";
import Page from "../../helper/Page";
import useSettings from "../../hooks/useSettings";
import Iconify from "../../helper/Iconify";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutPaymentMethods from './CheckoutPaymentMethods'
import CheckoutBillingInfo from "./CheckoutBillingInfo";
import CheckoutSummary from "./CheckoutSummary";

const DELIVERY_OPTIONS = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered on Monday, August 12',
  },
  {
    value: 2,
    title: 'Fast delivery ($2,00)',
    description: 'Delivered on Monday, August 5',
  },
];

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: ['https://minimal-assets-api.vercel.app/assets/icons/ic_paypal.svg'],
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icons: [
      'https://minimal-assets-api.vercel.app/assets/icons/ic_mastercard.svg',
      'https://minimal-assets-api.vercel.app/assets/icons/ic_visa.svg',
    ],
  },
  {
    value: 'cash',
    title: 'Cash on CheckoutDelivery',
    description: 'Pay with cash when your order is delivered.',
    icons: [],
  },
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' },
];


const Payment = () => {
  const { themeStretch } = useSettings();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const payBtn = useRef(null);

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const paymentData = {
    amount: Math.round(orderInfo?.totalPrice * 100),
  };

  const order = {
    name:user?.name,
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo?.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  };

  const handleApplyShipping = () => {

  }

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Page title="Ecommerce: Checkout">
    <Container maxWidth={themeStretch ? false : 'lg' }  sx={{mt:'100px'}}>
      <CheckoutSteps activeStep={2} />

      <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
        <CheckoutDelivery deliveryOptions={DELIVERY_OPTIONS} />
        <CheckoutPaymentMethods cardOptions={CARDS_OPTIONS} paymentOptions={PAYMENT_OPTIONS} />
          <Button
          component={RouterLink}
          to="/shipping"
            size="small"
            color="inherit"
            startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
          >
            Back
          </Button>
        </Grid>

        <Grid item xs={12} md={4}>
          <CheckoutBillingInfo order = {order}/>

          <CheckoutSummary
            enableEdit
            total={order.itemsPrice}
            subtotal={order.itemsPrice}
            discount={0}
            shipping={200}
          />
          <Button fullWidth size="large" type="submit" variant="contained">
            Complete Order
          </Button>
        </Grid>
      </Grid>
    </form>


      
    </Container>
    </Page>
  );
};

export default Payment;