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
import ShopTagFilterDesktop from './ShopTagFilterDesktop';
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../helper/Iconify';
import NavBar from '../Header/NavBar'

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

const RootStyle = styled('div')({
  flexGrow: 1,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
});

export default function Products() {

  const theme = createTheme();
  
  const dispatch = useDispatch();
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)


  const [filterOptionLarge, setFilterOptionLarge] = useState(false)
  const [filterOptionSmall, setFilterOptionSmall] = useState(false)
  
  const { loading, error, products, productsCount, filteredProductsCount } = useSelector((state)=>state.products)
  const {keyword} = useParams();


  const priceHandler =() => {
    setPrice(price);
  }

  useEffect(() => {
    document.title = 'Products | Caper Sports'
    if(error){
      NotificationManager.error(error);
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, price, category, ratings));
  }, [dispatch,keyword, price, category, ratings, error ])


  let count = filteredProductsCount;

 
  const isDesktop = useResponsive('up', 'md');

  return (
    <Fragment>
      <NavBar/>
  

    {loading ? (
       <Loading/>       
       ):(
        <Fragment>
        <Box display='flex' sx={{mt:'64px'}}> 
            <div className='container'>
              <AppBar style={{ background: '#ffffff', color:'black', boxShadow:'none'}} position="sticky">
                <Toolbar>
                  <div className='header'>
                    <div className='header_title'>
                      <Typography sx={{fontSize:'1rem'}}> {`${count} Results`}</Typography>
                    </div>
                  <div className='header_action'>
                  <Button color='inherit' id='desktopFilterButton' sx={{borderRadius:5, borderColor:'inherit'}} variant='outlined' endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={()=>setFilterOptionLarge(!filterOptionLarge)}>
{filterOptionLarge ? 'Hide Filters': 'Show Filters'} 
                 
                 </Button>

                  <Button id='mobileFilterButton' color='inherit' sx={{borderRadius:5, borderColor:'inherit'}} variant='outlined' endIcon={<Iconify icon={'ic:round-filter-list'}/>} onClick={()=>setFilterOptionSmall(!filterOptionSmall)}>
                 {filterOptionSmall ? 'Hide Filters': 'Show Filters'}
                 </Button>
                </div>
              </div> 
            </Toolbar>
          </AppBar>
          
          <div className='body_wrapper'>
            {isDesktop &&  <Collapse sx={{ marginLeft:( filterOptionLarge ? '40px' : '0px')}}  orientation="horizontal" in={filterOptionLarge}>

                <ShopTagFilterDesktop setCategory = {setCategory}/>

              </Collapse>}
            
         {!isDesktop && 
              <Drawer sx={{display:{md:'none', sm:'none'}}}
              anchor='bottom'
              open={filterOptionSmall}
              onClose={()=>setFilterOptionSmall(!filterOptionSmall)}>
                                <ShopTagFilterDesktop setCategory = {setCategory}/>


              </Drawer>}
            

<div className='product_wrapper'> 
<Box
      sx={{
        display: 'grid',
        gap: 3,
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(3, 1fr)',
        },
      }}
    >
  { products && products.map((product) => <ProductItems key={product._id} product={product}/>)}
  </Box>
  </div>





</div>



</div>
     </Box>
     </Fragment>
          )}
   
      </Fragment>
     
  )
}
