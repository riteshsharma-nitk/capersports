import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from './ProductCard';
import { Box, Button, Container, Link, styled, Typography, useTheme } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom'
import { m } from 'framer-motion';
import { MotionViewport, varFade } from '../../helper/animate';
import { CarouselArrows } from '../../helper/carousel';
import Slider from 'react-slick';
import Iconify from '../../helper/Iconify';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));


function HomeFeatureProduct() {
  const carouselRef = useRef(null);
  const theme = useTheme();

    const dispatch = useDispatch();
    const {loading, error, products } = useSelector((state)=>state.products)


  const settings = {
    arrows: false,
    slidesToShow: 4,
    centerMode: true,
    centerPadding: '0px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1279,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 959,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  const handlePrevious = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };

  useEffect(() => {

    if(error){
      //  NotificationManager.error(error);
       dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch, error])
  return (
    <RootStyle>
    <Box component={MotionViewport} sx={{ pb: 10, textAlign: 'center', p:{lg:4, md:3, sm:2, xs:1}}}>
        <m.div variants={varFade().inDown}>
          <Typography component="p" variant="overline" sx={{ mb: 2, color: 'text.secondary' }}>Caper Sports</Typography>
        </m.div>
        
        <m.div variants={varFade().inUp}>
          <Typography variant="h2" sx={{ mb: 3 }}>Featured products</Typography>
        </m.div>
                   
      <Box sx={{ position: 'relative' }}>
        <CarouselArrows filled onNext={handleNext} onPrevious={handlePrevious}>
          <Slider ref={carouselRef} {...settings}>
          { products && products.map((product) => (
          <Box key={product._id} component={m.div} variants={varFade().in} sx={{ py: 10 }}>
           <ProductCard  product={product}/>
           </Box>)
           ) } 
          </Slider>
        </CarouselArrows>
      </Box>

        <Button
        component={RouterLink}
        to="/products"
        variant="outlined"
        color="inherit"
        size="large"
        endIcon={<Iconify icon={'ic:round-arrow-right-alt'} width={24} height={24} />}
        sx={{ mx: 'auto' }}
      >
        Explore more
      </Button>
  </Box>
  </RootStyle>
  )
}

export default HomeFeatureProduct;