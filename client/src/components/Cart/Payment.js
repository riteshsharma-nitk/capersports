import React, { useEffect } from "react";
import * as Yup from 'yup';

import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { clearErrors, createOrder } from "../../actions/orderAction";
import { useNavigate } from "react-router";
import Iconify from "../../helper/Iconify";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutPaymentMethods from './CheckoutPaymentMethods'
import CheckoutBillingInfo from "./CheckoutBillingInfo";
import CheckoutSummary from "./CheckoutSummary";
import { FormProvider } from "../../helper/hook-form";

const PAYMENT_OPTIONS = [
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
    title: 'Cash on Delivery',
    description: 'Pay with cash when your order is delivered.',
    icons: [],
  },
];

const CARDS_OPTIONS = [
  { value: 'Visa1', label: '**** **** **** 1212 - Ritesh Sharma' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Abhishek Sharma' },
];

const DELIVERY_OPTIONS = [
  {
    value: 0,
    title: 'Standard delivery (Free)',
    description: 'Delivered in two weeks',
  },
  {
    value: 2,
    title: 'Fast delivery (₹200)',
    description: 'Delivered in a week',
  },
];


const Payment = () => {
  const navigate = useNavigate();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();

  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.newOrder);

  const PaymentSchema = Yup.object().shape({
    payment: Yup.string().required('Payment is required!'),
  });

  const defaultValues = {
    delivery: 0,
    payment: '',
  };

  

  const handleApplyShipping = (value) => {
    
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

  const methods = useForm({
    resolver: yupResolver(PaymentSchema),
    defaultValues,
  });

  
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async () => {
    try {
      order.paymentInfo = {
        id: user?._id,
        status: 'Paid',
      };
  
      dispatch(createOrder(order));
      navigate("/success")
    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Container maxWidth='lg'>
      <CheckoutSteps activeStep={2} />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
        <CheckoutDelivery  onApplyShipping={handleApplyShipping} deliveryOptions={DELIVERY_OPTIONS}/>
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
          <CheckoutBillingInfo order = {shippingInfo} user = {user}/>

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
    </FormProvider>


      
    </Container>

  );
};

export default Payment;