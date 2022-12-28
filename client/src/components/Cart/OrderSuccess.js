import React, { useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Box, Grid, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import {removeItemsFromCart } from "../../actions/cartAction";
import { useSelector, useDispatch } from "react-redux";



import {Link} from '@mui/material'

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
  };


  for(var i=0;i<cartItems?.length;i++){
    deleteCartItems(cartItems[i].product)
  }


  return (
    <Grid sx={{textAlign:'center',  alignItems:'center', verticalAlign:'center', padding:'14%'}}>
      <CheckCircleIcon style={{fontSize:100}}/>

      <Typography fontSize='1rem'>Your Order has been Placed successfully </Typography>

      <Link underline="none" component={RouterLink} to="/orders">View Orders</Link>
    </Grid>
  );
};

export default OrderSuccess;