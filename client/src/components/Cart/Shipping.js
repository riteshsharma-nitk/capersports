import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingInfo } from "../../actions/cartAction";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps";
import { useNavigate } from "react-router";
import { Box, ButtonBase, MenuItem, Select } from "@mui/material";
import {Button, Container, FormControl, Grid, InputLabel, Paper, TextField, Typography } from "@mui/material";


const Shipping = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      // NotificationManager.error("Phone Number should be 10 digits Long");
      return;
    }
    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );
    navigate("/order/confirm");
  };

  return (
    <Fragment>

      <CheckoutSteps activeStep={0} />

      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
               
      <Typography fontSize='1.2rem' gutterBottom>
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
              fullWidth
              value="Continue"
              disabled={state ? false : true}
              variant='contained'
            >Continue</Button>
            </Grid>
           
        
     
     </Grid>
     </Box>
        </Paper>
        </Container>
    </Fragment>
  );
};

export default Shipping;