import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import Iconify from '../../helper/Iconify';
// redux

// components


// ----------------------------------------------------------------------



export default function OrderBillingInfo({ order }) {


  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
        {order?.user && order?.user?.name}
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
           {''}
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
        {order.shippingInfo && `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {order?.shippingInfo?.phoneNo}
        </Typography>
      </CardContent>
    </Card>
  );
}
