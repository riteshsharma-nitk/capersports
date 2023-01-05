import { styled } from '@mui/material'
import React from 'react';

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