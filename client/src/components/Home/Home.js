// imports
import React, {Fragment, useEffect } from 'react';
import ProductCard from '../Home/ProductCard';
import {Link, Box, Button, Card, CardMedia, Grid, Typography} from '@mui/material';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import SlideShow from './SlideShow';
import { NotificationManager } from 'react-notifications';
import {Link as RouterLink} from 'react-router-dom'
import Banner from '../../images/Banner.png'
import Loading from '../Layout/Loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

// funtions
const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products } = useSelector((state)=>state.products)

  useEffect(() => {
    if(error){
       NotificationManager.error(error);
       dispatch(clearErrors())
    }
    dispatch(getProduct());
  }, [dispatch, error])
  
  
  return (
    <Fragment>
   {loading ? ( <Loading/>
      ):(
      <Fragment>
        <SlideShow/>
        <Grid container display='flex' justifyContent='center' alignItems='center' padding={1} rowSpacing={1}>
          <Grid item md={12} xs={12}>
            <Card>
              <Link underline='none' component={RouterLink} to="/products">
                <CardMedia component="img" image={Banner} alt="Product Images"/>
              </Link>
            </Card>
          </Grid>
          
          <Grid item md={12} xs={12}>
            <Typography textAlign='center' fontWeight='bold' sx={{fontSize:'1.5rem'}}> Featured Products </Typography>
          </Grid>

          <Grid item md={12} xs={12}>

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
              items: 4,
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
</Grid>
       
        <Grid item md={12} xs={12}>
          <Box sx={{
            display:'flex',
            justifyContent:'center',         
          }}>
            
          <Link underline='none' component={RouterLink} to="/products">
            <Button  sx={{textTransform:'none', backgroundColor:'black', borderRadius:4, fontSize:'1rem', fontWeight:'medium', ":hover":{backgroundColor:'#616161'}}} variant='contained'>Explore More</Button>
          </Link>
          </Box>
          </Grid>
        </Grid>
          
        </Fragment>  
    )}
   </Fragment>
  
  ) 
}

export default Home;