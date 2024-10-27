import { Container, Grid, styled } from '@mui/material'
import React from 'react'
import ContactForm from './ContactForm';
import Page from '../../helper/Page'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));

export default function ContactUs() {
  return (
    <Page title="Contact us">
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
  </RootStyle>
</Page>
   
   
  )
}
