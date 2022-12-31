import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../helper/Image';
import { MotionViewport, varFade } from '../../helper/animate';
import React from 'react'
import Banner from '../../images/Banner.png'



const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));
function HomeShowcase() {
  return (
    <RootStyle>
              <Box component={MotionViewport}>
              <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 1, md: 2 },
          }}
        >
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Caper Sports
            </Typography>
            <Typography variant="h2">Hunter Boyz</Typography>


        </Box>
       
        
        <Image alt="dark mode" src={Banner} />
      
       
       

                </Box>
                

        </RootStyle>

    
  )
}

export default HomeShowcase