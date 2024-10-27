import { Box, Button, Card, Container, Divider, Grid, Rating, Stack, TextField, Typography, useTheme } from '@mui/material';
import { Dialog,  DialogActions, DialogContent, DialogTitle,} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {NEW_REVIEW_RESET} from "../../constants/productConstants";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addItemsToCart } from "../../actions/cartAction";
import { addItemsToWishlist } from '../../actions/wishlistAction';
import ProductDetailsCarousel from './ProductDetailsCarousel';
import Markdown from '../../helper/Markdown';
import Page from '../../helper/Page';
import Iconify from '../../helper/Iconify';
import LoadingScreen from '../../helper/LoadingScreen';
import Label from '../../helper/Label';
import ProductDetailsReviewOverview from './ProductDetailsReviewOverview';
import ProductDetailsReviewList from './ProductDetailsReviewList';

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8),
  },
}));

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ProductDetails() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const [expandedInformation, setExpandedInformation] = React.useState(false);
 
  const {product, loading, error} = useSelector((state) => state.productDetails)
  const { id } = useParams();

  const { success, error: reviewError } = useSelector((state) => state.newReview);

  const handleExpandInformationClick = () => {
    setExpandedInformation(!expandedInformation);
  };

  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = React.useState('S');
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");


  const handleChange = (event, newSize) => {
    setSize(newSize);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(id, quantity, size));
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };



  
  const [like, setLike] = useState(false);
  
  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(product._id));
    setLike(!like)
  };
  

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);
    dispatch(newReview(myForm));

    setOpen(false);
  };

  useEffect(() => {
   
    if (error) {
      // NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      // NotificationManager.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      // NotificationManager.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(id));
  }, [dispatch, id, error, reviewError, success]);

  return (
    <Page title="Product Details">
      {loading? <LoadingScreen/> :
      <Container maxWidth='lg' sx={{mt:'88px'}}>
      <Card>
        <Grid container>
        <Grid item xs={12} md={6} lg={7}>
        {product.images && <ProductDetailsCarousel product={product} />}
        </Grid>
        
        <Grid item xs={12} md={6} lg={5}>
        <RootStyle>
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={product?.inStock ? 'success' : 'error'}
          sx={{ textTransform: 'uppercase', mb:1}}
        >
          {product?.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
        </Label>

        <Stack direction="column" spacing={2} sx={{ mb: 2 }}>

          <Typography variant='h5'>{product.name}</Typography>
          <Typography variant='subtitle1' >{`${product?.gender}'s ${product.category}`}</Typography>
           
          <Stack direction="row" spacing={0.5}>
          <Typography variant="h4" sx={{ pl:2, mb:3 }}>MRP : </Typography>

          {product?.priceSale?(
          <>
          <Typography variant='h4'>{` ₹${product?.priceSale}`}</Typography> 
          <Typography variant="h4" sx={{ color: 'text.disabled', textDecoration:'line-through', pl:2, mb:3}}>{` ₹${product?.price}`}</Typography>
          </>
          ):
          <Typography variant="h4" sx={{mb:3}}>{`MRP : ₹${product?.price}`}</Typography>
          }
          </Stack>
          </Stack>

           <Divider sx={{ borderStyle: 'dashed' }} />

  
           <Grid item md={12} xs={12}> 
           <Typography variant="subtitle1" sx={{ mt: 1, mb:1 }}>Select Size</Typography>
          
     
     <ToggleButtonGroup
      value={size}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      fullWidth
      size='large'
    >
      <ToggleButton value="S">S</ToggleButton>
      <ToggleButton value="M">M</ToggleButton>
      <ToggleButton value="L">L</ToggleButton>
      <ToggleButton value="XL">XL</ToggleButton>
      <ToggleButton value="2XL">2XL</ToggleButton>

    </ToggleButtonGroup>
   

     
    
     
 
   </Grid>
   <br></br>
   
  
  <Grid container>

<Grid item md={6} xs={12} sx={{p:1}}>
   <Button fullWidth  disabled={product?.inStock ? false : true} onClick={addToCartHandler} 
   size="large"
   color="warning"
   variant="contained"
   startIcon={<Iconify icon={'ic:round-add-shopping-cart'} />}
   sx={{ whiteSpace: 'nowrap' }}
 >
      Add to Bag
    </Button>
    </Grid>
    <Grid item md={6} xs={12} sx={{p:1}}>

   <Button 
   fullWidth 
  onClick={addToWishlistHandler} 
  startIcon={like ? <Iconify icon={'icon-park-outline:like'} /> : <Iconify icon={'icon-park-solid:like'} />}
  sx={{ whiteSpace: 'nowrap' }}


    size='large'
    variant='contained'>
      Favourite
</Button>
  

   </Grid>
   </Grid>
         
          
    
   <br></br>
   <br></br>
   
   <Typography sx={{fontSize:'1.1rem'}} fontWeight="bold">Product Description</Typography>
   <Markdown children={product.description} />
<br></br>
         <Divider variant='middle'/>
<br></br>

    

         <CardActions disableSpacing>
         <Typography sx={{fontSize:'1.1rem'}} fontWeight="bold">Product Information</Typography>
         <ExpandMore
             expand={expandedInformation}
             onClick={handleExpandInformationClick}
             aria-expanded={expandedInformation}
             aria-label="show more"
         >


             <ExpandMoreIcon />

         </ExpandMore>
         </CardActions>

         <Collapse in={expandedInformation} timeout="auto" unmountOnExit>

         <Markdown children={product.information} />

         </Collapse>

</RootStyle>

       </Grid>

       </Grid>
       </Card>
       
     

         <Dialog
             aria-labelledby="simple-dialog-title"
             open={open}
             onClose={submitReviewToggle}
         >
           <DialogTitle>Submit Review</DialogTitle>
           <DialogContent style={{display:'flex', flexDirection:'column'}}>
             <Rating
                 onChange={(e) => setRating(e.target.value)}
                 value={rating}
                 size="large"
             />

             <br></br>


             <TextField
             multiline
             
               
                 cols="100"
                 rows="5"
                 value={comment}
                 onChange={(e) => setComment(e.target.value)}
             ></TextField>
           </DialogContent>
           <DialogActions>
             <Button size='large' variant='contained' onClick={submitReviewToggle} color="secondary">
               Cancel
             </Button>
             <Button size='large' variant='contained' onClick={reviewSubmitHandler} color="primary">
               Submit
             </Button>
           </DialogActions>
         </Dialog>
        
        <br></br>
        

        <Card>
          <Grid container>
        <Grid item md={12} xs={12}>
        <Box sx={{ pt: 2, pb:2, bgcolor: 'background.neutral' }}>
         <Typography textAlign='center' variant='subtitle1'>{`Reviews (${product?.reviews?.length})`}</Typography>
         </Box>
         <Divider/>
       
       <ProductDetailsReviewOverview product={product} submitReviewToggle = {submitReviewToggle}/>
       <Divider />

       <ProductDetailsReviewList product={product} />
     
     </Grid>
     </Grid>
     </Card>
     <br></br>
  
     </Container>
    
       }
      </Page>

   
  )
}

