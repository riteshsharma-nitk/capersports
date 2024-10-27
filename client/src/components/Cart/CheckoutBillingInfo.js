import { Card, Button, Typography, CardHeader, CardContent } from '@mui/material';
import Iconify from '../../helper/Iconify';

export default function CheckoutBillingInfo({ order, user }) {
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
        {user?.name}
          <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
           {''}
          </Typography>
        </Typography>

        <Typography variant="body2" gutterBottom>
       {`${order?.address}, ${order?.city}, ${order?.state}, ${order?.country}, Pincode-${order?.pinCode}`}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {order?.phoneNo}
        </Typography>
      </CardContent>
    </Card>
  );
}
