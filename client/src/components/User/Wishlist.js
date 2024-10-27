import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItemsFromWishlist } from "../../actions/wishlistAction";
import { Card, CardContent, IconButton, Link, Typography } from"@mui/material";
import { Box } from "@mui/material";
import {Link as RouterLink} from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Image from '../../helper/Image';




const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlistItems } = useSelector((state) => state.wishlist);


  const deleteWishlistItems = (id) => {
    dispatch(removeItemsFromWishlist(id));
  };

  return (
    <Box sx={{ mt: 5 }}>


          <Typography variant="h4" sx={{ mb: 3 }}>Favourite</Typography>
          
          {wishlistItems.length === 0 ? (
          <>
          <Typography fontsize='0.85rem'>There are no items in your wishlist.</Typography>
          </>
        
        ) : (
          <Card sx={{ p: 3 }}>
          <Box
      sx={{
        display: 'grid',
        gap: 2,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
      }}
    >
            {wishlistItems && wishlistItems.map((item, index) => (
                  
                 <Card sx={{m:1}} key={index}>
                <Link underline='none' color='inherit' component={RouterLink} to={`/product/${item.product}`}>
                <Box sx={{ position: 'relative', backgroundColor:'#eeeeee', m:1, borderRadius:1}}>
      <Image alt='product images' src={item?.image} ratio="1/1" />
      </Box>              
                
                <CardContent>
                    <Box sx={{display:'flex',justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
                        <Typography textAlign='left' variant="subtitle2"> {item.name} </Typography>
                        
                        <IconButton onClick={()=>deleteWishlistItems(item.product)}>
                         <FavoriteIcon sx={{color:'black', fontSize:'1.5rem'}}/>
                       </IconButton>
                    </Box>
                    
                    <Typography variant='subtitle2' color="text.secondary" >{item.category}</Typography>
                    <br></br>
                    <Typography variant="subtitle2">{`MRP : ₹ ${item.price}`}
                    </Typography>
                </CardContent> 
                </Link>
        </Card>
              ))}
             </Box>
             </Card>
              )}
                 </Box>
       
  );
};

export default Wishlist;