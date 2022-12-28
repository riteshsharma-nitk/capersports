import { Box, Container, createTheme, Grid, IconButton, ThemeProvider, Typography } from '@mui/material'
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import Divider from '@mui/material/Divider';
import EmailIcon from '@mui/icons-material/Email';
import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function ContactUs() {
  const theme = createTheme();
  return (
    <Box display='flex' sx={{marginTop:1}}> 
    <ThemeProvider theme={theme}>
    <Grid backgroundColor='#f5f5f5' container rowSpacing={2} padding={5}>
        <Typography fontSize='1.5rem' fontWeight="bold">Contact Us</Typography>
        <br></br>
    <Divider width='100%'/>
    <br></br>
    
  
   <Grid textAlign='center' item md={4} xs={12}>
    <IconButton>
        < PhoneIphoneIcon style={{ fontSize: '5rem', color:'black' }} />
    </IconButton>
   <Typography fontWeight="medium" fontSize='1rem' variant="body2">Query Regarding Samples: </Typography>
   <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary"> Dhananjay Sharma  </Typography>
    <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary"> 8920541867, 7835999030  </Typography>
    <br></br>
    <Typography fontWeight="medium" fontSize='1rem' variant="body2">Query Regarding Designs: </Typography>
    <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary"> Abhishek Sharma  </Typography>
    <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary"> 8750858914 </Typography>
    <br></br>
    <Typography fontWeight="medium" fontSize='1rem' variant="body2">Company & Products Info: 10:00 - 18:00, </Typography> 
    <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary">Monday - Saturday </Typography>
    </Grid> 

    <Grid textAlign='center' item md={4} xs={12}>
    <IconButton>
        < EmailIcon style={{ fontSize: '5rem', color:'#b71c1c' }} />
    </IconButton>

   <Typography fontWeight="medium" fontSize='1rem' variant="body2">We'll reply within </Typography>
   <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary">five business days </Typography>
    </Grid>

    <Grid textAlign='center' item md={4} xs={12}>
    <IconButton>
        < LocationOnIcon style={{ fontSize: '5rem', color:'1b5e20' }} />
    </IconButton>
   <Typography fontWeight="medium" fontSize='1rem' variant="body2">Store Location</Typography>
   <Typography fontWeight="medium" fontSize='0.8rem' variant="body2" color="text.secondary">Noida, Uttar Pradesh</Typography>
    </Grid>

   
    </Grid>
    </ThemeProvider>
    </Box>
  )
}
