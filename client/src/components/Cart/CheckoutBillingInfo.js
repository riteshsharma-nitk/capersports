import PropTypes from 'prop-types';
// @mui
import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import Iconify from '../../helper/Iconify';
// redux

// components


// ----------------------------------------------------------------------



export default function CheckoutBillingInfo({ order }) {


  return (
    <Card sx={{ mb: 3 }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button size="small" startIcon={<Iconify icon={'eva:edit-fill'} />}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
        {order?.name}
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
           {''}
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
         {order?.shippingInfo?.address}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {order?.shippingInfo?.phoneNo}
        </Typography>
      </CardContent>
    </Card>
  );
}
