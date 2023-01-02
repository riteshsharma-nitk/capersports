import { Box, Container, createTheme, Grid, IconButton, styled, ThemeProvider, Typography } from '@mui/material'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Footer from '../Footer/Footer';
import ContactForm from './ContactForm';
import Page from '../../helper/Page'
const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));
export default function ContactUs() {
  const theme = createTheme();
  return (

    
    <RootStyle>
       <Container sx={{ my: 10 }}>
       <Grid container spacing={10}>
       <Grid item xs={12} md={6}>
       <ContactForm />
       </Grid>
       <Grid item xs={12} md={6}>
           
            </Grid>


       </Grid>


       </Container>
          <Footer/>

    </RootStyle>
   
   
  )
}
