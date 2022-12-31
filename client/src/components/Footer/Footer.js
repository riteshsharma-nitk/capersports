import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Grid, IconButton, Stack, useTheme } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Divider from '@mui/material/Divider';

function Copyright() {
  return (
    <Typography sx={{fontSize:'1rem'}} variant="body2" color='#ffffff'>
      {'Copyright © '}
      Caper Sports &nbsp;
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

export default function Footer() {
  const theme = useTheme();
  return (
   
      <Grid container component="footer" sx={{py:2, backgroundColor:'black', zIndex: theme.zIndex.drawer+1, position:'fixed'}}>
        
        <Grid item md={4} xs={12} sx={{textAlign:"center"}}>
        <br></br>
          <Typography sx={{fontSize:'1.1rem'}} color="white" fontWeight="bold">ABOUT CAPER SPORTS</Typography>
          <br></br>
          <Typography sx={{fontSize:'0.85rem'}} fontWeight="bold" variant="body2" color="#bdbdbd">We are a sportswear manufacturer <br></br> located in Uttar Pradesh</Typography>
        </Grid>
        
        <Grid item md={4} xs={12} sx={{textAlign:"center"}}>
        <br></br>
          <Typography sx={{fontSize:'1.1rem'}} color="white" fontWeight="bold">CONTACT US</Typography>
          <br></br>
          <Typography sx={{fontSize:'0.85rem'}} fontWeight="bold" variant="body2" color="#bdbdbd">
        
          Avinash Sharma
        </Typography>
          <Typography sx={{fontSize:'0.85rem'}} fontWeight="bold" variant="body2" color='#bdbdbd'>
         
          capersports9@gmail.com
        </Typography>

          <Typography sx={{fontSize:'0.85rem'}} fontWeight="bold" variant="body2" color='#bdbdbd'>
         
          +91 9999557455
        </Typography>

        
          
        </Grid>
        
        <Grid item md={4} xs={12} sx={{textAlign:"center"}}>
          <br></br>
          <Typography sx={{fontSize:'1.1rem'}}color='white' fontWeight="bold">FOLLOW US</Typography>
        
          
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
           
          
          
       </Grid>

        
        <Grid item md={12} xs={12} sx={{textAlign:"center"}}>
        <br></br>
       <Divider style={{width:'100%', backgroundColor:'white'}}/>
        <br></br>
          <Copyright />
        </Grid>
      </Grid>
      
  );
}

