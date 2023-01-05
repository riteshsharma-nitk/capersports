import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router";
import { Box, ButtonBase, Card, MenuItem, Select } from "@mui/material";
import {Button, Container, FormControl, Grid, InputLabel, Paper, TextField, Typography } from "@mui/material";
import Iconify from "../../helper/Iconify";
import { Link as RouterLink } from 'react-router-dom';
import CheckoutSummary from "./CheckoutSummary";
import Page from "../../helper/Page";
import HeaderBreadcrumbs from "../../helper/HeaderBreadcrumbs";
import useSettings from "../../hooks/useSettings";



const Shipping = () => {
  const { themeStretch } = useSettings();

  const { cartItems } = useSelector((state) => state.cart);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price, 0)
  
    const total = subtotal;
    var discount = 0;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);


  const shippingCharges = subtotal > 1000 ? 0 : 200;

  const tax = subtotal * 0.05;

  const totalPrice = subtotal + tax + shippingCharges;


  const proceedToPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };

    sessionStorage.setItem("orderInfo", JSON.stringify(data));

  };

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      // NotificationManager.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    proceedToPayment();
    navigate("/process/payment");
  };




 


  return (
    <Page title="Ecommerce: Checkout">
    <Container maxWidth={themeStretch ? false : 'lg' }  sx={{mt:'100px'}}>

    <CheckoutSteps activeStep={1} />

      <Grid container spacing={3}>
      <Grid item xs={12} md={8}>

        <Card sx={{p:4}}>    
      <Typography variant="h5">
        Shipping Details
      </Typography>
      <Box component="form" encType="multipart/form-data" onSubmit={shippingSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={3}>

      <Grid item xs={12}>
          <TextField
            required
            value={address}
            type='text'
            name="address"
            label="Address"
            multiline
            fullWidth
            onChange={(e) => setAddress(e.target.value)}
            autoComplete="shipping address"
           
          />
        </Grid>

        <Grid item xs={12} md={6}>

        <TextField
        type='text'
            required
            value={city}
            label="City"
            fullWidth
            onChange={(e) => setCity(e.target.value)}
            autoComplete="city"
           
          />
        </Grid>

        <Grid item xs={12} md={6}>

<TextField
    required
    type='number'
  
    label="Zip / Postal code"
    fullWidth
    value={pinCode}
    onChange={(e) => setPinCode(e.target.value)}
    autoComplete="pincode"
    
  />
</Grid>




            <Grid item xs={12} md={6}>
            <FormControl fullWidth>
            <InputLabel id="country">Country</InputLabel>
              <Select
                labelId="country"
                required
                value={country}
                autoWidth
                label="Country"
                onChange={(e) => setCountry(e.target.value)}
               

              >

<MenuItem value="">
            <em>None</em>
          </MenuItem>
        
          



              
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <MenuItem key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </MenuItem>
                  ))}
              </Select>
              </FormControl>
            </Grid>



            <Grid item xs={12} md={6}>
            
            

            {country && (
              
              <FormControl fullWidth>
                <InputLabel id="state">State</InputLabel>
                <Select
                labelId="state"
                  required
                
                  value={state}
                  label='State'
                  onChange={(e) => setState(e.target.value)}
             >
              <MenuItem value=""><em>None</em></MenuItem>                  
              {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <MenuItem key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
                </FormControl>

            )}

            </Grid>

            <Grid item xs={12} md={12}>
<TextField

          
              
                label="Phone Number"
                required
                fullWidth
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
               

              />
            </Grid>

            <Grid item xs={12} md={12}>
            <Button 
           
            sx={{ backgroundColor:'black', textTransform:'none' }}
              type="submit"
              size="large"
              fullWidth
              value="Continue"
              disabled={state ? false : true}
              variant='contained'
            >Continue</Button>
            </Grid>
           
        
     
     </Grid>
     </Box>
     </Card>   
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
            component={RouterLink}
              to='/cart'
              size="small"
              color="inherit"
              startIcon={<Iconify icon={'eva:arrow-ios-back-fill'} />}
            >
              Back
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <CheckoutSummary subtotal={subtotal} total={total} discount={discount} />
        </Grid>
        </Grid>
    </Container>
    </Page>
  );
};

export default Shipping;