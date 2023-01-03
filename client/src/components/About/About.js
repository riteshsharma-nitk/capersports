import { Box, Card, CardMedia, Container,Divider,IconButton, Paper, styled, Typography } from '@mui/material'
import React from 'react';
import Footer from '../Footer/Footer';
import NavBar from '../Header/NavBar'

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11),
  },
}));


function About() {
  return (
        
    <>
    <NavBar/>
       <RootStyle>
        <Footer/> 
       </RootStyle>
    </>
 
    )
}

export default About;