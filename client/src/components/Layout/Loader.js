import * as React from 'react';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <Stack marginTop={"30vh"} height={"35vh"} justifyContent='center' sx={{ color: 'grey.500' }} direction="row">
      
      <CircularProgress color="success" />
      
    </Stack>
  );
}