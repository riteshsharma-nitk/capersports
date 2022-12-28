import { Button, Card, CardContent, CardMedia, Grid, IconButton, Link, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const CartItemCard = ({ item, deleteCartItems, increaseQuantity, decreaseQuantity }) => {
  const dispatch = useDispatch();

  return (

    <Card sx={{ display: 'flex', maxWidth:700}}>
      <CardMedia 
        component="img"
        sx={{ width: {md:175, xs:100}}}
        image={item.image}
        alt="Live from space album cover"
      />

   
      <CardContent
      sx={{width:{md:525, xs:600}}}>
      <Grid width='100%' sx={{display:'flex',justifyContent:'space-between', flexDirection:'row'}}>
        <Link underline="none" component={RouterLink} to={`/product/${item.product}`}>
          <Typography textAlign='left' sx={{color:'black', fontSize:'0.8rem', fontWeight:500}}>
          {item.name}
          </Typography>
          </Link>
          <Typography textAlign='right' sx={{ fontSize:'0.8rem', fontWeight:'medium'}}>{`MRP: ₹ ${item.price * item.quantity}`}</Typography>

          </Grid>
          <Typography sx={{color:'text.secondary', fontSize:'0.7rem'}}>{item.category}</Typography>


          <Box sx={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
          <Typography textAlign='left' sx={{color:'text.secondary', fontSize:'0.7rem', marginRight:4}}>{`Size ${item.size}`}</Typography>

          <Typography textAlign='right' sx={{color:'text.secondary', fontSize:'0.7rem'}}>Quantity</Typography>
          <IconButton onClick={() =>
                        decreaseQuantity(item.product, item.quantity, item.size)
                      }
                    >
                      <RemoveCircleOutlineIcon sx={{fontSize:"0.8rem"}}/>
                    </IconButton>
                    <span>{item.quantity}</span>
                   
                    <IconButton
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.quantity,
                          item.stock,
                          item.size
                        )
                      }
                    >
                     <ControlPointIcon sx={{fontSize:"0.8rem"}}/>
                    </IconButton>
                    </Box>
                  
                    

    
        <Tooltip title='remove'>
        <IconButton onClick={() => deleteCartItems(item.product)}>
          <DeleteIcon fontSize="0.8rem"/>
        </IconButton>
        </Tooltip>
      
      
    

      </CardContent>
     
 
    </Card>
  );
};

export default CartItemCard;