import React, { Fragment, useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, Container, createTheme, Divider, FormControl, Grid, InputLabel, Link, List, ListItem, ListItemText, MenuItem, Paper, Select, ThemeProvider, Typography } from "@mui/material";
import Page from "../../../helper/Page";

import useSettings from "../../../hooks/useSettings";
import HeaderBreadcrumbs from "../../../helper/HeaderBreadcrumbs";
import Iconify from "../../../helper/Iconify";
import LoadingScreen from '../../../helper/LoadingScreen'

import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../../Layout/Loader";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import Sidebar from "../Sidebar";
import Invoice from "./InvoiceDetails";
const theme = createTheme();
const ProcessOrder = () => {
  const { themeStretch } = useSettings();

  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);
  const navigate = useNavigate();

  const {id} = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
  };





  useEffect(() => {
    
    if (error) {
      dispatch(clearErrors());
    }
    if (updateError) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
    {loading ? (<LoadingScreen/>) : (
    <Page title="Order: View">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Order Details"
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          {
            name: 'Orders',
            href: '/admin/orders',
          },
          { name: order?._id || '' },
        ]}
      />

        {<Invoice invoice={order} />}

         <br></br>
            
        <Box component='form' onSubmit={updateOrderSubmitHandler}>
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
                  size="large"
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
          
            </Container>
            </Page>)}

        
          
        </>
        
  );
};

export default ProcessOrder;