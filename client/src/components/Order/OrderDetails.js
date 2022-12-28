import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {Box, Card, CardContent, CardMedia, Container, Divider, Grid, Link, List, ListItem, ListItemText, Paper, Typography} from '@mui/material'
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Layout/Loader";
import { NotificationManager } from 'react-notifications';
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);

  const dispatch = useDispatch();

  const {id} = useParams();

  useEffect(() => {
    if (error) {
      NotificationManager.error(error);
      dispatch(clearErrors());
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Box display='flex' sx={{marginTop:1}}>
            <Grid backgroundColor='#f5f5f5' container rowSpacing={2}>
            <Grid item md={6} xs={12}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Typography fontSize='1.5rem' fontWeight='bold'>Details of your order</Typography>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 
              <Box>
                <List disablePadding>
                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Order Number" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2">{order && order._id} </Typography>
                  </ListItem>
              </List>
              <br></br>
              <Divider/>
              <br></br>
              <List>
                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Nane" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2"> {order.user && order.user.name} </Typography>
                  </ListItem>

                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Phone" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2"> {order.shippingInfo && order.shippingInfo.phoneNo} </Typography>
                  </ListItem>

                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Address" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2"> {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`} </Typography>
                  </ListItem>
              </List>
              <br></br>
            <Divider/>
            <br></br>
            <List>
            <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Payment" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2"> {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"} </Typography>
                  </ListItem>

                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Amount" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2"> {order.totalPrice && order.totalPrice} </Typography>
                  </ListItem>

            </List>
            <br></br>
            <Divider/>
            <br></br>
            <List>

            <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Order Status" secondary=""/>
                    <Typography fontSize='0.85rem' variant="body2"> 
                {order.orderStatus && order.orderStatus} </Typography>
                  </ListItem>
        
              
            

              </List>
            </Box>
            </Paper>
            </Container>


            
            </Grid>


            <Grid item md={6} xs={12}>
            <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
            <Typography fontSize='1.5rem' fontWeight='bold'>Order Items:</Typography>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}> 
             
             
              <Box>
                {order.orderItems &&
                  order.orderItems.map((item) => (

                    <Card key={item.product} sx={{ display: 'flex', marginBottom:1}}>
              <CardMedia
                component="img"
                sx={{ width: 100}}
                image={item.image}
                alt="product"
              />
               <CardContent sx={{width:425}}>
               <Grid width='100%' sx={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
               <Link underline="none" component={RouterLink} to={`/product/${item.product}`}>
                  <Typography textAlign='left' sx={{color:'black', fontWeight:'medium', fontSize:'0.85rem'}}>
                  {item.name}
                  </Typography>
                </Link>

                <Typography textAlign='right' sx={{ fontSize:'0.85rem', fontWeight:'regular'}}>{`MRP: ₹ ${item.price * item.quantity}`}</Typography>

                    
                </Grid>
          <Typography sx={{color:'text.secondary', fontSize:'0.75rem'}}>{item.category}</Typography>
          <br></br>
          <Typography sx={{color:'text.secondary', fontSize:'0.75rem'}}>{`Quantity: ${item.quantity}`}</Typography>
      </CardContent>
    </Card>
                  ))}
              </Box>
              </Paper>
              </Container>
            </Grid>
          </Grid>
        </Box>
      )}
    </Fragment>
  );
};

export default OrderDetails;