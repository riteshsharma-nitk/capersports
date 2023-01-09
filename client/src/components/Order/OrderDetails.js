import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import {Box, Button, Card, CardContent, CardHeader, CardMedia, Container, Divider, Grid, Link, List, ListItem, ListItemText, Paper, Stack, Typography, useTheme} from '@mui/material'
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../Layout/Loader";
import { NotificationManager } from 'react-notifications';
import { useParams } from "react-router-dom";
import LoadingScreen from "../../helper/LoadingScreen";
import Page from "../../helper/Page";
import HeaderBreadcrumbs from "../../helper/HeaderBreadcrumbs";
import useSettings from "../../hooks/useSettings";
import OrderProductList from "./OrderProductList";
import Scrollbar from '../../helper/Scrollbar'
import OrderBillingInfo from "./OrderBillingInfo";
import Label from '../../helper/Label';


const OrderDetails = () => {
  const theme = useTheme();

  const { themeStretch } = useSettings();

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
        <LoadingScreen />
      ) : (
        <Page title="Order:  Details">
        <Container maxWidth={themeStretch ? false : 'lg'} sx={{pt:'88px'}}>
          <HeaderBreadcrumbs
            heading="Order Details"
            links={[
              { name: 'Account', href: '/account' },
              {
                name: 'Orders',
                href: '/orders',
              },
              { name: 'Order' },
            ]}
          />  
           <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                Card
                <Typography component="span" sx={{ color: 'text.secondary' }}>
                  &nbsp;({order?.orderItems?.length} item)
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

<Scrollbar>

          <OrderProductList 
          products = {order?.orderItems}
          /> 
                      </Scrollbar>

         </Card>
         </Grid>

         <Grid item xs={12} md={4}>
          <OrderBillingInfo order = {order}/>
          
          <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Order Summary"
       
      />
          <Grid container>
         <Grid item xs={12} sm={12} sx={{ mb: 5 }}>

         <Box sx={{ textAlign: { sm: 'right' }, pr:2 }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                  (order.orderStatus === 'Delivered' && 'success') ||
                  (order.orderStatus === 'Shipped' && 'warning') ||
                  (order.orderStatus === 'Processing' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {order.orderStatus}
              </Label>

              <Typography variant="body2">{order && order._id}</Typography>
            </Box>
            <CardContent>
            <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             Payment status
            </Typography>
            <Typography variant="subtitle2"> {order.paymentInfo && order.paymentInfo.status === "succeeded" ? "Paid" : "Not Paid"}</Typography>

              </Stack>

              <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Amount
            </Typography>
            <Typography variant="subtitle2">{order.totalPrice && `₹${order.totalPrice}`}</Typography>
          </Stack>

          
        





                  
                </Stack>
                </CardContent>
        </Grid>
        </Grid>
              
                </Card>  


</Grid>
            
            </Grid>


           
         
         
          </Container>
          </Page>
      )}
    </Fragment>
  );
};

export default OrderDetails;