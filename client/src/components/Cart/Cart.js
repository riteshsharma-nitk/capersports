import React, { Fragment } from "react";
import CartItemCard from "./CartItemCard";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import { Button, Container, createTheme, Divider, Grid, Paper, ThemeProvider, Typography } from"@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";


const Cart = () => {
  const theme = createTheme()
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  
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
    <Box display='flex' sx={{marginTop:1}}> 
      <ThemeProvider theme={theme}>

      <Grid container rowSpacing={2} sx={{padding:{md:4,xs:0.5}}}>
      <Grid item md={6} xs={12}>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
      <Typography textAlign='left' sx={{color:'black', fontSize:'1.4rem', fontWeight:500}}> Bag</Typography>
      <br></br>



        {cartItems.length === 0 ? (
          <>
          <Typography fontsize='0.85rem'>There are no items in your bag.</Typography>
          </>
        
        ) : (
            <>
            {cartItems &&
              cartItems.map((item) => (
                <div key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} increaseQuantity = {increaseQuantity} decreaseQuantity = {decreaseQuantity} />
                  <br></br>
                </div>
              ))}
             </>
              )}
               </Container>
                 </Grid>
                 
                

            <Grid item md={6} xs={12}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>

            <Typography textAlign='left' sx={{color:'black', fontSize:'1.5rem', fontWeight:500}}> Summary</Typography>
            <br></br>
              <Box sx={{display:'flex', justifyContent:'space-between', flexDirection:'row'}}>
                <Typography sx={{fontSize:'1rem', fontWeight:'medium'}}>Total</Typography>
                <Typography sx={{fontSize:'1.1rem', fontWeight:500}}>{`₹ ${cartItems.reduce(
                  (acc, item) => acc + item.quantity * item.price,
                  0
                )}`}</Typography>
              </Box>
            <br></br> 
            <Divider/>
            <br></br>
           
              <Box display='flex' justifyContent='center'>
                <Button fullWidth sx={{color:'white', backgroundColor:'black', borderRadius:5, textTransform:'none', fontSize:'1rem'}} variant="contained" onClick={checkoutHandler}>Checkout</Button>
              </Box>
              </Container>
            </Grid>
          </Grid>
          </ThemeProvider>
          </Box>
       
  );
};

export default Cart;