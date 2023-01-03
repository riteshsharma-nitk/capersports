// imports
import React, {Fragment, useEffect } from 'react';
import ProductCard from '../Home/ProductCard';
import {Link, Box, Button, Card, CardMedia, Grid, Typography, styled} from '@mui/material';
import { getProduct, clearErrors } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import SlideShow from './SlideShow';
import {Link as RouterLink} from 'react-router-dom'
import Loading from '../Layout/Loader'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import HomeShowcase from './HomeShowcase';
import HomeFeatureProduct from './HomeFeatureProduct';
import Page from '../../helper/Page';
import NavBar from '../Header/NavBar'


const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));

// funtions
const Home = () => {

  useEffect(() => {

    document.title = 'Home | Caper Sports'
    
  }, [])
  
  
  return (
    <>
    <NavBar/>

  
        <RootStyle>
                   <SlideShow/>

           <ContentStyle>
       
        <HomeShowcase/>
        <HomeFeatureProduct/>
          
           
        </ContentStyle>  
        </RootStyle>
      </>
              
   
 
  
  ) 
}

export default Home;