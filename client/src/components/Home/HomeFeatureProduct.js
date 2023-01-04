import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductCard from './ProductCard';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { Box, Button, Container, Link, styled, Typography } from '@mui/material';
import {Link as RouterLink} from 'react-router-dom'
import { m } from 'framer-motion';
import { MotionViewport, varFade } from '../../helper/animate';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));


function HomeFeatureProduct() {
    const dispatch = useDispatch();
    const {loading, error, products } = useSelector((state)=>state.products)

  useEffect(() => {

    if(error){
      //  NotificationManager.error(error);
       dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch, error])
  return (
   <RootStyle>
          <Container component={MotionViewport}>

 <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 1, md: 2 },
          }}
        >
                    <m.div variants={varFade().inUp}>

            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              Caper Sports
            </Typography>
            </m.div>
            <m.div variants={varFade().inUp}>

            <Typography variant="h2">Featured Products</Typography>
            </m.div>


        </Box>

{ products &&   <Carousel
  additionalTransfrom={0}
  arrows
  autoPlaySpeed={3000}
  centerMode={false}
  className=""
  containerClass="container-with-dots"
  dotListClass=""
  draggable
  focusOnSelect={false}
  infinite
  itemClass=""
  keyBoardControl
  minimumTouchDrag={80}
  pauseOnHover
  renderArrowsWhenDisabled={false}
  renderButtonGroupOutside={false}
  renderDotsOutside={false}
  responsive={{
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  }}
  rewind={false}
  rewindWithAnimation={false}
  rtl={false}
  shouldResetAutoplay
  showDots={false}
  sliderClass=""
  slidesToSlide={1}
  swipeable
>
  
  { products && products.map((product) => <ProductCard key={product._id} product={product}/>) } 
</Carousel>}

  <Box sx={{
    display:'flex',
    justifyContent:'center',  
    mt:2       
  }}>
    
  <Link underline='none' component={RouterLink} to="/products">
    <Button                 size="large"
 variant='contained'>Explore More</Button>
  </Link>
  </Box>
  </Container>
  </RootStyle>
  )
}

export default HomeFeatureProduct;