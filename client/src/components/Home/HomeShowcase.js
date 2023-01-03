import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../helper/Image';
import { MotionViewport, varFade } from '../../helper/animate';
import React from 'react'
import Banner from '../../images/Banner.webp'



const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));
function HomeShowcase() {
  return (
    <RootStyle>
      <Box component={MotionViewport}>
              <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 2, md: 4 },
          }}
        >
                    <m.div variants={varFade().inUp}>

            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Caper Sports
            </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>

            <Typography variant="h2">Hunter Boyz</Typography>
            </m.div>


        </Box>
       
       

        <Image alt="dark mode" src={Banner} />
      
      
       
       

                </Box>
                

        </RootStyle>

    
  )
}

export default HomeShowcase;