import { Box, Card, CardMedia, Container,Divider,IconButton, Paper, Typography } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import logo from '../../images/logo.png'
import React from 'react';

function About() {
  return (
  
        <Container component="main" maxWidth="md">
          <Paper variant="outlined" sx={{ my: { xs: 20, md: 15 }, p: { xs: 2, md: 5 }, alignItems:'center', textAlign:'center' }}>
            <Box sx={{m:2}}>
            <img style={{maxWidth:150}} src={logo} alt='logo'/>
            </Box>
            
            <Typography fontSize='1.1rem' fontWeight='medium'>A platform to sell sports accessories</Typography>
            <br></br>
            <br></br>    
            <Typography fontSize='1rem' fontWeight='medium'>Connect us <br></br> on</Typography>  
            
            <IconButton>
              <FacebookIcon sx={{fontSize:'2rem'}} color="primary"/>
            </IconButton>

            <IconButton>
               <InstagramIcon sx={{fontSize:'2rem'}} color="secondary"/>
            </IconButton>

            <IconButton>
              <TwitterIcon sx={{fontSize:'2rem'}} color="primary"/>
            </IconButton>

            <IconButton>
              <YouTubeIcon sx={{fontSize:'2rem'}} color="warning"/>
            </IconButton>
        </Paper>
      </Container>
 
    )
}

export default About;