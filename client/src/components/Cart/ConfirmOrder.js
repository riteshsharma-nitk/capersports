import React, { Fragment } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Link, Box, Card, CardContent, CardMedia, Container, Grid, List, ListItem, ListItemText, Paper, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {Divider} from "@mui/material";

const ConfirmOrder = () => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    navigate("/process/payment");
  };

  return (
    <Fragment>

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>        <div>
          <Box>
            <Typography fontSize='1.2rem' >Shipping Info</Typography>
            <List disablePadding>

            <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Name" secondary=""/>
            <Typography fontSize='0.85rem' variant="body2">{user.name}</Typography>
          </ListItem>

          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}}  primary="Phone No." secondary=""/>
            <Typography fontSize='0.85rem' variant="body2">{shippingInfo.phoneNo}</Typography>
          </ListItem>

          <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}}  primary="Address" secondary=""/>
            <Typography fontSize='0.85rem' variant="body2">{address}</Typography>
          </ListItem>

              </List>
           
           <br></br>
               <Divider/>
               <br></br>
            
          </Box>
          
          <Box>
            <Typography fontSize='1.2rem' variant="h6">Your Cart Items:</Typography>
            <br></br>


            <div>
              {cartItems &&
                cartItems.map((item) => (


                   <Card key={item.product} sx={{ display: 'flex', mb:1}}>
                    <CardMedia
                    component="img"
                    sx={{ width: {md:100, xs:75}}}
                    image={item.image}
                    alt="product"
              />
               <CardContent sx={{width:{md:425, xs:375}}}>
               <Grid width='100%' sx={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
               <Link underline="none" component={RouterLink} to={`/product/${item.product}`}>
                  <Typography textAlign='left' sx={{color:'black', fontWeight:'medium', fontSize:'0.85rem'}}>{item.name}</Typography>
                </Link>

                <Typography textAlign='right' sx={{ fontSize:'0.80rem', fontWeight:'regular'}}>{`MRP: ₹ ${item.price * item.quantity}`}</Typography>

                    
                </Grid>
          <Typography sx={{color:'text.secondary', fontSize:'0.75rem'}}>{item.category}</Typography>
          <br></br>
          <Typography sx={{color:'text.secondary', fontSize:'0.75rem'}}>{`Quantity: ${item.quantity}`}</Typography>
      </CardContent>
    </Card>
   
                ))}

            </div>

            
          </Box>
        </div>
        <br></br>
               <Divider/>
               <br></br>

      
        <Box>
          <div className="orderSummary">
            <Typography fontSize='1.2rem'>Order Summery</Typography>
            <div>

            <List disablePadding>
            <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Subtotal" secondary=""/>
            <Typography fontSize='0.85rem' variant="body2">₹{subtotal}</Typography>
            </ListItem>

            <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Shipping Charges" secondary=""/>
            <Typography fontSize='0.85rem' variant="body2">₹{shippingCharges}</Typography>
            </ListItem>

            <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="GST" secondary=""/>
            <Typography fontSize='0.85rem' variant="body2">₹{tax}</Typography>
            </ListItem>


            <ListItem  sx={{ py: 1, px: 0 }}>
            <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Total" secondary=""/>
            <Typography fontSize='0.95rem' sx={{fontWeight:'bold'}} variant="primary">₹{totalPrice}</Typography>
            </ListItem>


         
          </List>

             
            
             
            </div>

           
            <Box display='flex' justifyContent='center'>
            <Button sx={{color:'white', backgroundColor:'black', borderRadius:5, textTransform:'none', fontSize:'1rem'}} variant="contained" onClick={proceedToPayment}>Proceed To Payment</Button>
            </Box>
          </div>
        </Box>
      </Paper>
      </Container>
    </Fragment>
  );
};

export default ConfirmOrder;