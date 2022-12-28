import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItemsToWishlist, removeItemsFromWishlist } from "../../actions/wishlistAction";
import { Button, Card, CardContent, CardMedia, Container, createTheme, Divider, Grid, IconButton, Link, Paper, ThemeProvider, Typography } from"@mui/material";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import ProductItems from "../Product/ProductItems";
import {Link as RouterLink} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';



const Wishlist = () => {
  const theme = createTheme()
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const navigate = useNavigate();


  const deleteWishlistItems = (id) => {
    dispatch(removeItemsFromWishlist(id));
  };

  return (
    <Box display='flex' sx={{marginTop:1}}> 
      <ThemeProvider theme={theme}>
      <Grid container rowSpacing={2} sx={{padding:{md:4,xs:0.5}}}>
      <Grid item md={12} xs={12}>
      <Typography textAlign='left' sx={{color:'black', fontSize:'1.4rem', fontWeight:500}}>Favourite</Typography>
      <br></br>



        {wishlistItems.length === 0 ? (
          <>
          <Typography fontsize='0.85rem'>There are no items in your wishlist.</Typography>
          </>
        
        ) : (
            <Box
            sx={{ 
                display: 'flex',
                justifyContent:'flex-start',
                overflow:'auto',
                gap:'1vmax',
                alignItems:'center',
                paddingBottom:2,
                borderRadius:2}}>
            {wishlistItems &&
              wishlistItems.map((item) => (
                <div key={item.product}>
                 <Card sx={{width:{md:340, xs:240}}}>
                <Link underline='none' component={RouterLink} to={`/product/${item.product}`}>
                  <CardMedia component="img" image={item?.image} alt="Product Images"/>
                </Link>
                
                <CardContent sx={{textAlign:"left"}}>
                    <Box sx={{display:'flex',justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                        <Typography textAlign='left'  fontWeight='bold' sx={{fontSize:'0.85rem'}}> {item.name} </Typography>
                        
                        <IconButton onClick={()=>deleteWishlistItems(item.product)}>
                         <FavoriteIcon sx={{color:'red', fontSize:'1.2rem'}}/>
                       </IconButton>
                    </Box>
                    
                    <Typography sx={{fontSize:'0.7rem'}} color="text.secondary"  variant='body2'>{item.category}</Typography>
                    <br></br>
                    <Typography sx={{fontSize:'1rem'}} fontWeight='medium'>{`MRP : ₹ ${item.price}`}
                    </Typography>
                </CardContent> 
        </Card>
                  <br></br>
                </div>
              ))}
             </Box>
              )}
                 </Grid>
          </Grid>
          </ThemeProvider>
          </Box>
       
  );
};

export default Wishlist;