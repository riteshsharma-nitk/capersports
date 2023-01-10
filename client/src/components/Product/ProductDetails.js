import { Box, Button, Card, Container, Divider, Grid, ListItem, Rating, TextField, Typography } from '@mui/material';
import { Dialog,  DialogActions, DialogContent, DialogTitle,} from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {clearErrors, getProductDetails, newReview} from '../../actions/productAction';
import ReviewItems from './ReviewItems' ;
import Loader from '../Layout/Loader';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
// import { NotificationManager } from 'react-notifications';
import {NEW_REVIEW_RESET} from "../../constants/productConstants";
import {styled} from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { addItemsToCart } from "../../actions/cartAction";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addItemsToWishlist } from '../../actions/wishlistAction';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ProductDetailsCarousel from './ProductDetailsCarousel';
import Markdown from '../../helper/Markdown';

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
  
  const dispatch = useDispatch();

  const [expandedReview, setExpandedReview] = React.useState(false);
  const [expandedInformation, setExpandedInformation] = React.useState(false);
  const handleExpandReviewClick = () => {
    setExpandedReview(!expandedReview);
  };

  const handleExpandInformationClick = () => {
    setExpandedInformation(!expandedInformation);
  };


  const {product, loading, error} = useSelector((state) => state.productDetails)
  const { id } = useParams();

  const { success, error: reviewError } = useSelector(
      (state) => state.newReview
  );

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
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
    // NotificationManager.success("Item Added To Cart");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };



  
  const [like, setLike] = useState(false);
  
  const addToWishlistHandler = () => {
    dispatch(addItemsToWishlist(product._id));
    // NotificationManager.success("Item Added To Wishlist");
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

 

  // someJsonArray.map(({id}) => id)


  return (
    <Fragment>
      {loading? <Loader/> :
      <Container sx={{mt:'100px'}} maxWidth='lg'>
        <Card>
        <Grid container>
        <Grid item xs={12} md={6} lg={7}>
        {product.images && <ProductDetailsCarousel product={product} />}
        </Grid>
        
        <Grid item xs={12} md={6} lg={5} sx={{p:2}}>
          <Typography variant='h4'>{product.name}</Typography>
          <Typography variant='body2' >{product.category}</Typography>
          <br></br>
           
           <Typography variant='h4'>{`MRP : ₹ ${product.price}`}</Typography>

           <br></br>
           <Divider sx={{ borderStyle: 'dashed' }} />
           <br></br>
  
           <Grid md={12} xs={12} sx={{m:1}}> 
           <Typography variant="subtitle1" sx={{ mb: 1 }}>Select Size</Typography>
          
     
     <ToggleButtonGroup
      value={size}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      fullWidth
      size='large'
    >
      <ToggleButton  sx={{fontSize:'0.85rem'}}  value="S">S</ToggleButton>
      <ToggleButton  sx={{fontSize:'0.85rem'}}  value="M">M</ToggleButton>
      <ToggleButton  sx={{fontSize:'0.85rem'}}  value="L">L</ToggleButton>
      <ToggleButton  sx={{fontSize:'0.85rem'}}  value="XL">XL</ToggleButton>
      <ToggleButton  sx={{fontSize:'0.85rem'}} value="2XL">2XL</ToggleButton>
    </ToggleButtonGroup>
   

     
    
     
 
   </Grid>
   <br></br>
   
  
  <Grid container>

<Grid item md={6} xs={12} sx={{p:1}}>
   <Button fullWidth  disabled={product.Stock < 1 ? true : false} onClick={addToCartHandler} 
   size="large"
   color="warning"
   variant="contained"
 >
      Add to Bag
    </Button>
    </Grid>
    <Grid item md={6} xs={12} sx={{p:1}}>

   <Button fullWidth  onClick={addToWishlistHandler} 
    size='large'
    variant='contained'>
      Favourite&nbsp;
      { like ? <FavoriteIcon sx={{fontSize:'0.95rem'}}/>:
      <FavoriteBorderIcon sx={{fontSize:'0.95rem'}}/>}</Button>
  

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

<ListItem disablePadding>

<Typography  sx={{fontSize:'1.1rem'}} textAlign='left'  fontWeight='bold'>{`Reviews(${product.numOfReviews})`}</Typography>
</ListItem>




           <Rating sx={{fontSize:'1.5rem'}} {...options}/>
  <ExpandMore
      expand={expandedReview}
      onClick={handleExpandReviewClick}
      aria-expanded={expandedReview}
      aria-label="show more"
  >


    <ExpandMoreIcon />

  </ExpandMore>
         </CardActions>


         <Collapse in={expandedReview} timeout="auto" unmountOnExit>
         <Button
             onClick={submitReviewToggle}
              sx={{textTransform:'none', fontWeight:'bold', backgroundColor:'black', fontSize:'0.95rem'}} variant='contained'>Submit Review</Button>

         </Collapse>
         <br></br>




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
             <Button onClick={submitReviewToggle} color="secondary">
               Cancel
             </Button>
             <Button onClick={reviewSubmitHandler} color="primary">
               Submit
             </Button>
           </DialogActions>
         </Dialog>
        
        <br></br>
        
        <Card>
        <Grid item md={12} xs={12}>
         <Typography textAlign='center' sx={{mt:1, mb:1}} variant='h5' fontWeight="bold">Reviews</Typography>
         <Divider/>
        </Grid>
         <Grid item md={12} xs={12}>
      
       {product.reviews && product.reviews[0] ? (

           <Box sx={{ display: 'flex',
           justifyContent:'flex-start',
           overflow:'auto',
           flexDirection:'row',
           gap:'2vmax',
         
       
           padding:1,
           borderRadius:2}}>
        {product.reviews && 
           product.reviews.map((review) => 
           
           <ReviewItems key={review._id} review = {review} />
          
)}
    
    
   
    </Box>

       ):(

         <Box sx={{alignContent:'center', textAlign:'center', padding:"10px"}}>
       <Typography fontWeight="medium" fontSize='1.5rem'>No review yet</Typography>
       
         </Box>
 
 
         
       )
     }
     
     </Grid>
     </Card>
     <br></br>
  
     </Container>
       }
    </Fragment>

   
  )
}

