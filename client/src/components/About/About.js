import { styled, Typography } from '@mui/material'
import React from 'react';
import Page from '../../helper/Page';
import AboutHero from './AboutHero';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));


function About() {
  return (
    <Page title="About us">
       <RootStyle>
        <AboutHero/>
       </RootStyle> 
   </Page>
    )
}

export default About;