import React from "react";
import {Link as RouterLink} from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Link, Typography } from "@mui/material";
const NotFound = () => {
  return (
    <Box display='flex' flexDirection='column' justifyContent='center' sx={{marginTop:1 ,backgroundColor:'#f5f5f5', alignItems:'center', marginTop:'10%'}}>
    <ErrorIcon sx={{fontSize:"5rem"}}/>

      <Typography fontSize='1.5rem'>Page Not Found </Typography>
      <br></br>
      <Link underline="none" component={RouterLink} to="/">Home</Link>
    </Box>
  );
};

export default NotFound;