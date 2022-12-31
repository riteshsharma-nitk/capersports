import { Box, Card, CardMedia, Container,Divider,IconButton, Paper, styled, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../../images/logo.png'
import React from 'react';
import AboutHero from './AboutHero';
import AboutWhat from './AboutWhat';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));


function About() {
  return (
  
       <RootStyle>
        
       
       </RootStyle>
 
    )
}

export default About;