// imports
import React, { useEffect } from 'react';
import {styled} from '@mui/material';
import HomeHero from './HomeHero';
import HomeFeatureProduct from './HomeFeatureProduct';
import HomePromotion from './HomePromotion';

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));


const Home = () => {
  useEffect(() => {
    document.title = 'Home | Caper Sports' 
}, [])
  
  
  return (
    <>

  
        <RootStyle>
                   <HomeHero/>

           <ContentStyle>
       
        <HomePromotion/>
        <HomeFeatureProduct/>
          
           
        </ContentStyle>  
        </RootStyle>
      </>
              
   
 
  
  ) 
}

export default Home;