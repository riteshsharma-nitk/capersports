import { AppBar, Avatar, Box, Button, Card, CardMedia, createTheme, Grid, IconButton, ThemeProvider, Toolbar, Tooltip, Typography } from '@mui/material'
import { useSelector } from 'react-redux';
import React, { Fragment, useEffect } from 'react'
import Loading from "../Layout/Loader";
import {useNavigate } from 'react-router';
import { Link as RouterLink } from 'react-router-dom';
import {Link} from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
export default function Profile() {
  const theme = createTheme();
    const navigate = useNavigate()
    const { user, loading, isAuthenticated } = useSelector((state) => state.user);
   

    useEffect(() => {
        if (isAuthenticated === false) {
            navigate("/login");
        }
      }, [isAuthenticated]);


  return (
    <Box display='flex' sx={{marginTop:'10vmax'}}> 
        <ThemeProvider theme={theme}>

    {loading ? (<Loading/>):(
         <Grid container rowSpacing={4}>
          <Grid item md={12} xs={12} sx={{display:'flex', justifyContent:'center'}}>
            <Card  sx={{padding:5, 
              borderRadius:5, 
              display:'flex', 
              justifyContent:'center', 
              alignItems:'center', 
              flexDirection:'column',
            
              boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'

              }}>       
                <Avatar sx={{ width: {md:"10vmax", xs:'8vmax'}, height: {md:"10vmax", xs:'8vmax'}}}  alt={user.name} src={user.avatar.url} />
                 <br></br>
                 <br></br>            
                <Typography sx={{fontWeight:"bold", fontSize:'1.6rem'}}>{user.name}</Typography>
                <Typography sx={{fontSize:'0.85rem'}} color='text.secondary' >Caper Sports Member Since {String(user.CreatedAt).substr(0, 10)}</Typography>
             </Card>
          </Grid>


        <Grid item md={12} xs={12} alignItems='center' justifyContent='center' display='flex'>
          <Card  
          sx={{
            padding:1.5,
            borderRadius:5,
            display:'flex', 
            justifyContent:'center',
            alignItems:'center', 
            flexDirection:'row', 
            gap:2,
            boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'


            }}>  
          
        
          <Tooltip title='Profile'>
          <Link underline='none' component={RouterLink} to="/account">
          <Box sx={{backgroundColor:'white', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', padding:0.5, boxShadow:'rgba(0, 0, 0, 0.35) 1px 1px 1px 1px'}}>
          <Avatar alt={user.name} src={user.avatar.url} />
          </Box>
          </Link>
          </Tooltip>
          
          
          <Tooltip title='Favourite'>
          <Link underline='none' component={RouterLink} to="/favourite">
          <Box sx={{backgroundColor:'white', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', padding:0.5,boxShadow:'rgba(0, 0, 0, 0.35) 1px 1px 1px 1px'}}>
            <IconButton>
            <FavoriteBorderOutlinedIcon fontSize='medium' sx={{color:'black'}}/>
            </IconButton>
          </Box>
          </Link>
          </Tooltip>
          
          
          <Tooltip title='Change Password'>
            <Link component={RouterLink}  underline='none' to='/password/update'>
              <Box sx={{backgroundColor:'white', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', padding:0.5,boxShadow:'rgba(0, 0, 0, 0.35) 1px 1px 1px 1px'}}>
              <IconButton>
              <VpnKeyOutlinedIcon fontSize='medium' sx={{color:'black'}}/>
              </IconButton>

              </Box>
            </Link>
          </Tooltip>

          <Tooltip title='Orders'>
            <Link component={RouterLink}  underline='none' to='/orders'>
              <Box sx={{backgroundColor:'white', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center', padding:0.5,boxShadow:'rgba(0, 0, 0, 0.35) 1px 1px 1px 1px'}}>
                <IconButton>
              <ShoppingBagOutlinedIcon fontSize='medium' sx={{color:'black'}}/>
              </IconButton>
              </Box>
            </Link>
         </Tooltip>
         
         <Tooltip title="Update Profile">
          <Link component={RouterLink}  underline='none' to="/me/update">
            <Box sx={{backgroundColor:'white', borderRadius:2, display:'flex', alignItems:'center', justifyContent:'center',  padding:0.5,boxShadow:'rgba(0, 0, 0, 0.35) 1px 1px 1px 1px'}}>
            <IconButton>
            <PersonOutlineOutlinedIcon fontSize='medium' sx={{color:'black'}}/>
            </IconButton>
            </Box>
           </Link>
          </Tooltip>


      
     

      
      
      
       </Card>
       </Grid>


</Grid>
        
       )}
      </ThemeProvider>
    </Box>
  )
}
