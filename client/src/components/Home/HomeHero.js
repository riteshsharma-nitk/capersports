import { Box, Grid, styled} from '@mui/material'
import React from 'react'
import { m } from 'framer-motion';
import { MotionContainer, varFade } from '../../helper/animate'
import image1 from '../../images/003.webp'
import image2 from '../../images/005.webp'
import image3 from '../../images/007.webp'
import useResponsive from '../../hooks/useResponsive'
import Image from '../../helper/Image';


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
    right: '8%',
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
        <m.div variants={varFade().inLeft}>
          <Image
          alt="design1"
          src={image1}
          />
        </m.div>
   
      <m.div variants={varFade().inDown}>
          <Image
          alt="design2"
          src={image2}
          />
        </m.div>
     
      <m.div variants={varFade().inRight}>
          <Image
          alt="design3"
          src={image3}
          />
        </m.div>
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
          src={image1}
          variants={varFade().inRight}
        />
        </>
   
    
    }
   
   </RootStyle>

   <Box sx={{ height:'100vh'}} />

    </MotionContainer>
   



  )
}

