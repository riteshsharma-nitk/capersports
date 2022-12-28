import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Container, createTheme, Divider, FormControl, Grid, InputLabel, Link, List, ListItem, ListItemText, MenuItem, Paper, Select, ThemeProvider, Typography } from "@mui/material";


import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../Layout/Loader";
import { NotificationManager } from 'react-notifications';
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
const theme = createTheme();
const ProcessOrder = () => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const {id} = useParams();

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };

  const dispatch = useDispatch();

  const [status, setStatus] = useState("");



  useEffect(() => {
    if (error) {
      NotificationManager.error(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      NotificationManager.error(updateError);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      NotificationManager.success("Order Updated Successfully");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <Box display='flex' sx={{marginTop:1}}>
    <Sidebar/>

      
    <ThemeProvider theme={theme}>
          {loading ? (
            <Loader />
          ) : (
            <Grid backgroundColor='#f5f5f5' container rowSpacing={2}>
            <Grid item md={6} xs={12}>
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px' }}> 
         
                  <List>
                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText disableTypography sx={{fontSize:'0.8rem'}} primary="Name" secondary=""/>
                    <Typography  sx={{fontSize:'0.7rem'}} variant="body2"> {order.user && order.user.name} </Typography>
                  </ListItem>

                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText disableTypography sx={{fontSize:'0.8rem'}} primary="Phone" secondary=""/>
                    <Typography  sx={{fontSize:'0.7rem'}} variant="body2"> {order.shippingInfo && order.shippingInfo.phoneNo} </Typography>
                  </ListItem>

                  <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText disableTypography sx={{fontSize:'0.8rem'}} primary="Address" secondary=""/>
                    <Typography  sx={{fontSize:'0.7rem'}} variant="body2"> {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`} </Typography>
                  </ListItem>
              </List>

             <Divider/>
            
              <List>
                <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText disableTypography sx={{fontSize:'0.8rem'}} primary="Payment" secondary=""/>
                    <Typography   sx={{fontSize:'0.7rem'}} variant="body2"> {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"} </Typography>
                </ListItem>

                <ListItem  sx={{ py: 1, px: 0 }}>
                    <ListItemText disableTypography sx={{fontSize:'0.8rem'}} primary="Amount" secondary=""/>
                    <Typography  sx={{fontSize:'0.7rem'}} variant="body2"> {order.totalPrice && order.totalPrice} </Typography>
                </ListItem>
            </List>
          
            <Divider/>
            
            <List>
              <ListItem  sx={{ py: 1, px: 0 }}>
                <ListItemText disableTypography sx={{fontSize:'0.8rem'}} primary="Order Status" secondary=""/>
                <Typography  sx={{fontSize:'0.7rem'}} variant="body2"> 
                {order.orderStatus && order.orderStatus} </Typography>
              </ListItem>
            </List>
              <br></br>
              <Divider/>
              <br></br>

                {order.orderItems &&
                  order.orderItems.map((item) => (

                    <Card key={item.product} sx={{ display: 'flex', maxWidth:700, marginBottom:1}}>
              <CardMedia
                component="img"
                sx={{ width: 100}}
                image={item.image}
                alt="product"
              />
               <CardContent sx={{width:{md:600}}}>
               <Grid width='100%' sx={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
               <Link underline="none" component={RouterLink} to={`/product/${item.product}`}>
                  <Typography textAlign='left' sx={{color:'black', fontWeight:'medium', fontSize:'0.8rem'}}>
                  {item.name}
                  </Typography>
                </Link>

                <Typography textAlign='right' sx={{ fontSize:'0.8rem', fontWeight:'regular'}}>{`MRP: ₹ ${item.price * item.quantity}`}</Typography>

                    
                </Grid>
          <Typography sx={{color:'text.secondary', fontSize:'0.6rem'}}>{item.category}</Typography>
          <br></br>
          <Typography sx={{color:'text.secondary', fontSize:'0.6rem'}}>{`Quantity: ${item.quantity}`}</Typography>
      </CardContent>
    </Card>
                  ))}
            




             

                 

                </Paper>
                </Container>
              </Grid>
           
              <Grid item md={6} xs={12}>
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
              <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px' }}> 
              <Typography variant="h5" fontWeight='bold'>Process Order</Typography>



                <Box
                sx={{       
                  marginTop: 2,
                  marginBottom: 2,
                  
              }}
                 component='form' onSubmit={updateOrderSubmitHandler} >
                 





                     
                      <FormControl fullWidth>
                      <InputLabel>Choose category</InputLabel>



                    <Select 
                    onChange={(e) => setStatus(e.target.value)}
                    required
                    fullWidth
                    label="Choose Category"
                   
                    >

                      <MenuItem value="">Choose Category</MenuItem>
                      {order.orderStatus === "Processing" && (
                        <MenuItem value="Shipped">Shipped</MenuItem>
                      )}

                      {order.orderStatus === "Shipped" && (
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </Select>
                    </FormControl>
                  
                
                <br></br>
                <br></br>

                  <Button variant="contained"
                  fullWidth
                  sx={{backgroundColor:"black"}}
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </Box>
            </Paper>
            </Container>
            </Grid>

            </Grid>
          )}
        
        </ThemeProvider>
       </Box>  
  );
};

export default ProcessOrder;