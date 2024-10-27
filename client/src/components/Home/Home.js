import React from 'react';
import { styled } from '@mui/material';
import HomeHero from './HomeHero';
import HomeFeatureProduct from './HomeFeatureProduct';
import HomePromotion from './HomePromotion';
import Page from '../../helper/Page';

const RootStyle = styled('div')(() => ({
  height: '100%',
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}));


const Home = () => {
  return (
  <Page title="Home">
  <RootStyle>
    <HomeHero/>
    <ContentStyle>
      <HomePromotion/>
      <HomeFeatureProduct/>
    </ContentStyle>  
  </RootStyle></Page>
  ) 
}

export default Home;