import { m } from 'framer-motion';
// @mui
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// components
import Image from '../../helper/Image';
import { MotionViewport, varFade } from '../../helper/animate';
import React, { useRef } from 'react'
import Banner from '../../images/Banner.webp'
import { CarouselArrows } from '../../helper/carousel';
import Slider from 'react-slick';



const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingBottom: theme.spacing(15),
  },
}));
function HomePromotion() {
  const carouselRef = useRef(null);
  const theme = useTheme();


  const settings = {
    arrows: false,
    slidesToShow: 1,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };
  return (
    <RootStyle>
    <Box component={MotionViewport} sx={{ pb: 10, textAlign: 'center', p:{lg:4, md:3, sm:2, xs:1}}}>
        <m.div variants={varFade().inDown}>
          <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>Caper Sports</Typography>
        </m.div>
        
        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 3 }}>Our clients</Typography>
        </m.div>
                   
      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
          <Box component={m.div} variants={varFade().in} sx={{ p: 6, }}>
            <Image alt="dark mode" src={Banner} />
</Box>
           
          </Slider>
        </CarouselArrows>
      </Box>

      
  </Box>
  </RootStyle>
    
  )
}

export default HomePromotion;


