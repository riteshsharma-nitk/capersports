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
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormHelperText,
  FormControlLabel,
} from '@mui/material';
// hooks

// components
import useResponsive from '../../hooks/useResponsive'
import Iconify from '../../helper/Iconify';
import Image from '../../helper/Image';


export default function CheckoutPaymentMethods() {

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Payment options" />
      <CardContent>
        
      </CardContent>
      </Card>
  );
}
