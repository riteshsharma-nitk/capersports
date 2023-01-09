import React, { Fragment, useEffect, useRef } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector, useDispatch } from "react-redux";
import { Button, Container, Grid, Paper, Typography } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom'

import { clearErrors } from "../../actions/orderAction";
import { useNavigate } from "react-router";
import Page from "../../helper/Page";
import useSettings from "../../hooks/useSettings";
import Iconify from "../../helper/Iconify";
import CheckoutDelivery from "./CheckoutDelivery";
import CheckoutPaymentMethods from './CheckoutPaymentMethods'
import CheckoutBillingInfo from "./CheckoutBillingInfo";
import CheckoutSummary from "./CheckoutSummary";

const Payment = () => {
  const { themeStretch } = useSettings();

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const dispatch = useDispatch();

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

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }
  }, [dispatch, error]);

  return (
    <Page title="Ecommerce: Checkout">
    <Container maxWidth={themeStretch ? false : 'lg' }  sx={{mt:'88px'}}>
      <CheckoutSteps activeStep={2} />

      <form>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
        <CheckoutDelivery  />
        <CheckoutPaymentMethods  />
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