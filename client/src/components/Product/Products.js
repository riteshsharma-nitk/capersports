import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Loading from '../Layout/Loader';
import ProductItems from './ProductItems';
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import CancelIcon from '@mui/icons-material/Cancel';
import {Box, Button, createTheme, CssBaseline, Divider, Drawer, GlobalStyles, Grid, IconButton, List, ListItem, ListItemButton, ListItemText, Skeleton, styled, SwipeableDrawer, TextField, ThemeProvider, Typography } from '@mui/material';
import "./Products.css";
import Slider from '@mui/material/Slider';
import Collapse from '@mui/material/Collapse';
import { NotificationManager } from 'react-notifications';
import TuneIcon from '@mui/icons-material/Tune';
import InputAdornment from '@mui/material/InputAdornment';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';


const categories = [
  'T-Shirts',
  'Hoodies',
  'Sweatshirts',
 ' Jackets',
  'Tracksuits',
  'Shorts',
  'Socks',
  'Trouser',
  'Cap',
  'Basketball Kit'
]

export default function Products() {

  const theme = createTheme();
  
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)


  const [filterOptionLarge, setFilterOptionLarge] = useState(false)
  const [filterOptionSmall, setFilterOptionSmall] = useState(false)
  
  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount } = useSelector((state)=>state.products)
  const {keyword} = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler =() => {
    setPrice(price);
  }

  useEffect(() => {
    if(error){
      NotificationManager.error(error);
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch,keyword,currentPage, price, category, ratings, error ])


  let count = filteredProductsCount;

 

  return (
    <Fragment>
  

    {loading ? (
       <Loading/>       
       ):(
        <Fragment>
        <Box display='flex'> 
            <div className='container'>
              <AppBar style={{ background: '#ffffff', color:'black', boxShadow:'none'}} position="sticky">
                <Toolbar>
                  <div className='header'>
                    <div className='header_title'>
                      <Typography sx={{fontSize:'1rem'}}> {`${count} Results`}</Typography>
                    </div>
                  <div className='header_action'>
                  <Button id='desktopFilterButton' sx={{textTransform:'none', borderRadius:5, borderColor:'black'}} variant='outlined' onClick={()=>setFilterOptionLarge(!filterOptionLarge)}>
                  <Typography sx={{fontSize:'1rem', color:'black'}} >{filterOptionLarge ? 'Hide Filters': 'Show Filters'} &nbsp;</Typography>
                  <TuneIcon sx={{fontSize:'1rem', color:'black'}}/>
                 </Button>

                  <Button id='mobileFilterButton' sx={{textTransform:'none', borderRadius:5, borderColor:'black'}} variant='outlined' onClick={()=>setFilterOptionSmall(!filterOptionSmall)}>
                  <Typography sx={{fontSize:'1rem', color:'black'}} >{filterOptionSmall ? 'Hide Filters': 'Show Filters'} &nbsp;</Typography>
                  <TuneIcon sx={{fontSize:'1rem', color:'black'}}/>
                 </Button>
                </div>
              </div> 
            </Toolbar>
          </AppBar>
          
          <div className='body_wrapper'>
            <div className='sidebar'>
              <Collapse sx={{ marginLeft:( filterOptionLarge ? '40px' : '0px')}}  className='simplebar_wrapper' orientation="horizontal" in={filterOptionLarge}>
                <Typography sx={{fontSize:'1rem'}} fontWeight='medium'>By Categories</Typography>
                {
                categories.map((category) => (
                  <ListItemButton
                    key={category}
                    sx={{ py: 0, minHeight: 32 }}
                    onClick={() => setCategory(category)}>

                    <ListItemText
                      color='black'
                      primary={category}
                      primaryTypographyProps={{ fontSize:'0.8rem', variant:'body2'}}
                    />
                  </ListItemButton>
                )) }

            <div style={{paddingRight:'10ch'}}>
            <br></br>
            <Divider/>
            <br></br>
            <Typography sx={{fontSize:'1rem'}} fontWeight='medium'>By Price</Typography>
              <Slider
                  value={price}
                  onChange={priceHandler}
                  fontSize='0.8rem'
                  min={0}
                  max={25000}
                  aria-labelledby="range-slider"
                  disableSwap
                  valueLabelDisplay="auto"
              />

              <div>
                <TextField
                fontSize='0.8rem'
                    label="min price"
                    sx={{ m: 1, width:{md: '16ch',xs:'12ch'},fontSize:'0.8rem' }}
                    value ={price[0]}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}/>
              </div>

              <div>
              <TextField
                  label="max price"
                  value={price[1]}
                  sx={{ m: 1, width:{md: '16ch',xs:'12ch'},  fontSize:'0.8rem' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                  }}/>
        </div>
      </div>

      <div style={{paddingRight:'10ch'}}>
        <br></br>
        <Divider/>
        <br></br>
        <Typography  sx={{ fontSize:'1rem' }} fontWeight='medium'>By Rating</Typography>
         <Slider
         value={ratings}
         fontSize='0.8rem'
         onChange={(e, newRating) => {
         setRatings(newRating);}}
         min={0}
         max={5}
         valueLabelDisplay="auto">
      </Slider>
      
      <div>
        <TextField
          label="rating"
          id="outlined-start-adornment"
          sx={{ m: 1, width:{md: '16ch',xs:'12ch'}, fontSize:'0.8rem' }}
          value ={ratings}
          InputProps={{
            startAdornment: <InputAdornment position="start">★</InputAdornment>,
          }}
        />
    </div>
    
    </div>
    </Collapse>
    </div>
    <Box>
      <Drawer sx={{display:{md:'none', sm:'none'}}}
            anchor='bottom'
            open={filterOptionSmall}
            onClose={()=>setFilterOptionSmall(!filterOptionSmall)}>
            <div className='mobileSideBar'> 

            <Box display='flex' justifyContent='flex-end'>
              <IconButton onClick={() => setFilterOptionSmall(!filterOptionSmall)}>
                <CancelIcon style={{fontSize:'2rem', color:'black'}}/>
              </IconButton>

            </Box>


             <Typography sx={{fontSize:'1rem'}} fontWeight='medium'>By Categories</Typography>
            {
                categories.map((category) => (
                  <ListItemButton
                    key={category}
                    sx={{ py: 0, minHeight: 32 }}
                    onClick={() => setCategory(category)}
                    >

                    <ListItemText
                    
                      color='black'
                      primary={category}
                      primaryTypographyProps={{ fontSize:'0.8rem', variant:'body2'}}
                    />
                  </ListItemButton>
                )) }

            <div>
            <br></br>
            <Divider/>
            <br></br>
            <Typography sx={{fontSize:'1rem'}} fontWeight='medium'>By Price</Typography>
              <Slider
                  value={price}
                  onChange={priceHandler}
                  fontSize='0.8rem'
                  min={0}
                  max={25000}
                  aria-labelledby="range-slider"
                  disableSwap
                  valueLabelDisplay="auto"
              />

              <Grid container spacing={2}>
                <Grid item md={6} xs={6}>
            
                <TextField
                fullWidth
                fontSize='0.8rem'
                    label="min price"
                    sx={{fontSize:'0.8rem' }}
                    value ={price[0]}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    }}
                />
                </Grid>
            

                <Grid item md={6} xs={6}>
              <TextField
                  label="max price"
                 fullWidth
                
                  value={price[1]}
                  sx={{ fontSize:'0.8rem' }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
          }}
        />
    </Grid>
        </Grid>
      
      </div>

      <div>
      <br></br>
      <Divider/>
      <br></br>
    <Typography  sx={{ fontSize:'1rem' }} fontWeight='medium'>By Rating</Typography>
    <Slider
    value={ratings}
    fontSize='0.8rem'
    onChange={(e, newRating) => {
      setRatings(newRating);
    }}
    min={0}
    max={5}
    valueLabelDisplay="auto"
    >

    </Slider>

    <Grid container spacing={1}>
      <Grid item md={6} xs={6} spacing={2}>
<TextField
          label="rating"
          fullWidth
          id="outlined-start-adornment"
          sx={{ fontSize:'0.8rem' }}
          value ={ratings}
         
          InputProps={{
            startAdornment: <InputAdornment position="start">★</InputAdornment>,
          }}
        />
    </Grid>
    </Grid>
  
</div>
</div>
</Drawer>
</Box>

<div className='product_wrapper'> 
 <Grid container spacing={2}>
  {products && products.map((product) => <ProductItems key={product._id} product={product}/>)}
  </Grid>
  </div>
</div>

{resultPerPage < count && 
<Box xs={12} justifyContent='center' display='flex' sx={{paddingBottom:'16px'}}>
  <Pagination
  activePage={currentPage}
  itemsCountPerPage={resultPerPage}
  totalItemsCount={productsCount}
  onChange={setCurrentPageNo}
  nextPageText="Next"
  prevPageText="Prev"
  firstPageText="1st"
  lastPageText="Last"
  itemClass="page-item"
  linkClass="page-link"
  activeClass="pageItemActive"
  activeLinkClass="pageLinkActive"/>
</Box>
}


</div>
     </Box>
     </Fragment>
          )}
   
      </Fragment>
     
  )
}
