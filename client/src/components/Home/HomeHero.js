import { Box, styled} from '@mui/material'
import React from 'react'
import { m } from 'framer-motion';
import { MotionContainer, varFade } from '../../helper/animate'
import image1 from '../../images/006-1.png'
import image2 from '../../images/014-1.png'
import image3 from '../../images/020-1.png'
import image4 from '../../images/029-1.png'
import image5 from '../../images/044-1.png'
import useResponsive from '../../hooks/useResponsive'
import Image from '../../helper/Image';
import { alignProperty } from '@mui/material/styles/cssUtils';


const RootStyle = styled(m.div)(({ theme }) => ({
  backgroundColor: theme.palette.grey[400],
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  
}));


const HeroImgStyle = styled(m.img)(({ theme }) => ({
  zIndex: 8,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    top:'18%',
    right: '8%',
    width: 'auto',
    height: '100%',
  },
}));

const HeroImgStyle1 = styled(m.img)(({ theme }) => ({
  zIndex: 2,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    top:'0%',
    left: '0%',
    width: 'auto',
    height: '100%',
  },
}));
const HeroImgStyle2 = styled(m.img)(({ theme }) => ({
  zIndex: 4,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    top:'5%',
    left: '14%',
    width: 'auto',
    height: '100%',
  },
}));
const HeroImgStyle3 = styled(m.img)(({ theme }) => ({
  zIndex: 8,
  width: '20%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    top:'10%',
    left:'0%',
    right:'0%',
    width: 'auto',
    height: '100%',
  },
}));
const HeroImgStyle4 = styled(m.img)(({ theme }) => ({
  zIndex: 2,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    top:'5%',
    right: '14%',
    width: 'auto',
    height: '100%',
  },
}));
const HeroImgStyle5 = styled(m.img)(({ theme }) => ({
  zIndex: -4,
  width: '100%',
  margin: 'auto',
  position: 'absolute',
  [theme.breakpoints.up('lg')]: {
    top:'0%',
    right: '0%',
    width: 'auto',
    height: '100%',
  },
}));

export default function HomeHero() {
  const isDesktop = useResponsive('up', 'md');

  return (
    <MotionContainer>
     <RootStyle>
    
    {isDesktop && 
       <Box sx={{display:'flex', justifyContent:'center', alignItems:'center'}}>
         <HeroImgStyle1
          alt="hero"
          src={image2}
          variants={varFade().inLeft}
        />

<HeroImgStyle2
          alt="hero"
          src={image3}
          variants={varFade().inLeft}
        />

<HeroImgStyle3
          alt="hero"
          src={image4}
          variants={varFade().inDown}
        />

<HeroImgStyle4
          alt="hero"
          src={image1}
          variants={varFade().inRight}
        />

<HeroImgStyle5
          alt="hero"
          src={image5}
          variants={varFade().inRight}
        />
       
       
      
      </Box>
     
  }

    {!isDesktop && 

      <>
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
          src={image3}
          variants={varFade().inRight}
        />
        </>
   
    
    }
   
   </RootStyle>

   <Box sx={{ height:'100vh'}} />

    </MotionContainer>
   



  )
}

