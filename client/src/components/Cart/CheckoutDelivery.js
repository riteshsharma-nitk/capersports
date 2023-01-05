import PropTypes from 'prop-types';
// form
import { Controller, useFormContext } from 'react-hook-form';
// @mui
import { styled } from '@mui/material/styles';
import {
  Box,
  Card,
  Radio,
  Stack,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel,
} from '@mui/material';
import Iconify from '../../helper/Iconify';
// components


// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.divider}`,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
}));

// ----------------------------------------------------------------------

CheckoutDelivery.propTypes = {
  deliveryOptions: PropTypes.array,

};

export default function CheckoutDelivery({ deliveryOptions }) {

  return (
    <Card>
      <CardHeader title="Delivery options" />
      <CardContent>
        
           
             
        
      </CardContent>
    </Card>
  );
}
