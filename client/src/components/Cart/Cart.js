import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Button, Card, CardHeader, Container, Grid, Typography } from"@mui/material";
import { useNavigate } from "react-router-dom";
import { Link as RouterLink } from 'react-router-dom';
import Page from "../../helper/Page";
import Scrollbar from "../../helper/Scrollbar";
import CartProductList from '../../components/Cart/CartProductList'
import EmptyContent from "../../helper/EmptyContent";
import EmptyCartIcon from "../../assets/illustration/illustration_empty_cart.svg"
import CheckoutSummary from "./CheckoutSummary";
import CheckoutSteps from "./CheckoutSteps";
import Iconify from "../../helper/Iconify";
import { sum } from "lodash";

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const [ discount, setDiscount ] = useState(0)

  const isEmptyCart = cartItems.length === 0;
  const subtotal = sum(cartItems?.map((item) => item?.quantity * item?.price));

  const [total, setTotal] = useState(subtotal)

  const handleApplyDiscount = (value) => {
    setDiscount(value)
    setTotal(total - value)
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
       <Container maxWidth='lg'>
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