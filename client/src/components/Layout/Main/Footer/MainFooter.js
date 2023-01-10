import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, IconButton, Link, Stack, styled, useTheme } from '@mui/material';
import Divider from '@mui/material/Divider';
import {Link as RouterLink} from 'react-router-dom'
import logo from '../../../../images/logo.png'
import SocialsButton from '../../../../helper/SocialsButton';


function Copyright() {
  return (


    <Typography
    component="p"
    variant="body2"
    sx={{
      mt: 10,
      pb: 5,
      fontSize: 13,
      textAlign: { xs: 'center', md: 'left' },
    }}
  >
     {'Copyright © '}
      Caper Sports &nbsp;
      {new Date().getFullYear()}
      {'.'}
  </Typography>

  
  );
}

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

const LINKS = [
  {
    headline: 'Caper Sports',
    children: [
      { name: 'About us', href: '/about-us' },
      { name: 'Contact us', href: '/contact-us' },
      { name: 'FAQs', href: 'faqs' },
    ],
  },
  {
    headline: 'Legal',
    children: [
      { name: 'Terms and Condition', href: '/terms' },
      { name: 'Privacy Policy', href: '/policy' },
    ],
  },
  {
    headline: 'Contact',
    children: [
      { name: 'capersports.in@gmail.com', href: '/support' },
      { name: 'Uttar Pradesh, India', href: '/location' },
    ],
  },
];

export default function MainFooter() {
  const theme = useTheme();
  return (
    <RootStyle>
      <Divider/>
      <Container sx={{ pt: 10 }}>
        <Grid
          container
          justifyContent={{ xs: 'center', md: 'space-between' }}
          sx={{ textAlign: { xs: 'center', md: 'left' } }}
        >
          <Grid item xs={12} sx={{ mb: 3 }}>
          <Link component={RouterLink} to="/">
                <Box component='img' src={logo} sx={{height:40}}></Box>
              </Link>
          </Grid>
          <Grid item xs={8} md={3}>
            <Typography variant="body2" sx={{ pr: { md: 5 } }}>
              Sportswear Manufacturer
            </Typography>

            <Stack
              direction="row"
              justifyContent={{ xs: 'center', md: 'flex-start' }}
              sx={{ mt: 5, mb: { xs: 5, md: 0 } }}
            >
              <SocialsButton sx={{ mx: 0.5 }} initialColor />
            </Stack>
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack
              spacing={5}
              direction={{ xs: 'column', md: 'row' }}
              justifyContent="space-between"
            >
              {LINKS.map((list) => (
                <Stack key={list.headline} spacing={2}>
                  <Typography component="p" variant="overline">
                    {list.headline}
                  </Typography>
                  {list.children.map((link) => (
                    <Link
                      to={link.href}
                      key={link.name}
                      color="inherit"
                      variant="body2"
                      component={RouterLink}
                      sx={{ display: 'block' }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </Stack>
              ))}
            </Stack>
          </Grid>
        </Grid>

       <Copyright/>
      </Container>

    </RootStyle>
   
     
      
  );
}

