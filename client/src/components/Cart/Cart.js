import React, { Fragment, useState } from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Button, Card, CardHeader, Container, createTheme, Divider, Grid, Paper, ThemeProvider, Typography } from"@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';

import { Box } from "@mui/material";
import Page from "../../helper/Page";
import useSettings from "../../hooks/useSettings";
import HeaderBreadcrumbs from "../../helper/HeaderBreadcrumbs";
import Scrollbar from "../../helper/Scrollbar";
import CartProductList from '../../components/Cart/CartProductList'
import EmptyContent from "../../helper/EmptyContent";
import EmptyCartIcon from "../../assets/illustration/illustration_empty_cart.svg"
import CheckoutSummary from "./CheckoutSummary";
import CheckoutSteps from "./CheckoutSteps";
import Iconify from "../../helper/Iconify";


const Cart = () => {
  const { themeStretch } = useSettings();

  const theme = createTheme()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const isEmptyCart = cartItems.length === 0;


  const subtotal = cartItems.reduce(
  (acc, item) => acc + item.quantity * item.price, 0)

  const total = subtotal;
  var discount = 0;

  const handleApplyDiscount = (value) => {
    discount = value;
  };
  

  const increaseQuantity = (id, quantity, stock, size) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }


    dispatch(addItemsToCart(id, newQty, size));
  };

  const decreaseQuantity = (id, quantity, size) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty, size));
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/shipping");
  };

  return (
    <Page title="Checkout : Caper Sports">
       <Container maxWidth={themeStretch ? false : 'lg'}>
  
<CheckoutSteps activeStep={0}/>


<Grid container spacing={3}>
<Grid item xs={12} md={8}>
<Card sx={{ mb: 3 }}>
<CardHeader
            title={
              <Typography variant="h6">
                Cart items
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({cartItems?.length} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

        {!isEmptyCart ? (
        <Scrollbar>
          <CartProductList products={cartItems} onDelete={deleteCartItems} onIncreaseQuantity = {increaseQuantity} onDecreaseQuantity = {decreaseQuantity} />
        </Scrollbar>
        ):(
          <EmptyContent
          title="Cart is empty"
          description="Look like you have no items in your shopping cart."
          img={EmptyCartIcon}
        />

        )}
        </Card>
        <Button
          color="inherit"
          component={RouterLink}
          to={'/products'}
          startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
        >
          Continue Shopping
        </Button>
        </Grid>
                 
               
                <Grid item xs={12} md={4}>
                <CheckoutSummary
                  enableDiscount
                  total={total}
                  discount={discount}
                  subtotal={subtotal}
                  onApplyDiscount={handleApplyDiscount}
                />



<Button
          fullWidth
          size="large"
          type="submit"
          variant="contained"
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
        >
          Checkout
        </Button>
             
           
           

              </Grid>
              </Grid>
          

          </Container>
          </Page>
       
  );
};

export default Cart;