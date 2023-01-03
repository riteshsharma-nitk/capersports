import { Box, styled} from '@mui/material'
import React from 'react'
import { m } from 'framer-motion';
import { MotionContainer, varFade } from '../../helper/animate'
import image1 from '../../images/003.webp'
import image2 from '../../images/005.webp'
import image3 from '../../images/007.webp'
import useResponsive from '../../hooks/useResponsive'


const RootStyle = styled(m.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}));


const HeroImgStyle = styled(m.img)(({ theme }) => ({
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '8%',
    width: 'auto',
    height: '100%',
  },
}));

const HeroImgStyle1 = styled(m.img)(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 8,

  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    left: '2%',
    width: 'auto',
    height: '100%',
  },
}));

const HeroImgStyle2 = styled(m.img)(({ theme }) => ({
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    left: '28%',
    width: 'auto',
    height: '100%',
  },
}));

const HeroImgStyle3 = styled(m.img)(({ theme }) => ({
  top: 0,
  right: 0,
  bottom: 0,
  zIndex: 8,

  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    right: '2%',
    width: 'auto',
    height: '100%',
  },
}));







export default function SlideShow() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <MotionContainer>
     <RootStyle>
    
    {isDesktop && 
    <>
<HeroImgStyle1
          alt="hero"
          src={image1}
          variants={varFade().inLeft}
        />
        <HeroImgStyle2
          alt="hero"
          src={image2}
          variants={varFade().inDown}
        />
        <HeroImgStyle3
          alt="hero"
          src={image3}
          variants={varFade().inRight}
        />
    </>

    

  }

    {!isDesktop && 

    <Box>
      <HeroImgStyle
          alt="hero"
          src={image1}
          variants={varFade().inLeft}
        />

         <HeroImgStyle
          alt="hero"
          src={image2}
          variants={varFade().inDown}
        />

         <HeroImgStyle
          alt="hero"
          src={image1}
          variants={varFade().inRight}
        />
    </Box>
    
    }
    
       
        
     
        

   
   </RootStyle>

   <Box sx={{ height: { md: '100vh', sm:'100vh', xs:'40vh' } }} />

    </MotionContainer>
   



  )
}

