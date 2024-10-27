import React, { Fragment, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import ProductItems from './ProductItems';
import { useParams } from 'react-router-dom';
import {Box, Button, Drawer, Typography } from '@mui/material';
import "./Products.css";
import Collapse from '@mui/material/Collapse';
import useResponsive from '../../hooks/useResponsive';
import Iconify from '../../helper/Iconify';
import Page from '../../helper/Page';
import LoadingScreen from '../../helper/LoadingScreen';
import ProductFilter from './ProductFilter';
import { FormProvider } from '../../helper/hook-form';
import { useForm } from 'react-hook-form';

export default function Products() {

  const mdUp = useResponsive('up', 'md');
  
  const dispatch = useDispatch();
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('')
  const [ratings, setRatings] = useState('')

  const [openFilter, setOpenFilter] = useState(false);

  const { loading, error, products, productsCount, filteredProductsCount } = useSelector((state)=>state.products)
  const {keyword} = useParams();

  const defaultValues = {
    category: category,
    price: price,
    ratings: ratings,
  };

  const methods = useForm({
    defaultValues,
  });

  const { reset, watch, setValue } = methods;

  const values = watch();

  useEffect(() => {
    setCategory(values?.category)
    setPrice(values?.price)
    setRatings(values?.ratings)
   
  }, [values]);

  useEffect(() => {
    if(error){
      // NotificationManager.error(error);
      dispatch(clearErrors())
    }

    dispatch(getProduct(keyword, price, category, ratings));
  }, [dispatch,keyword, price, category, ratings, error])


  let count = filteredProductsCount;

 
  const handleFilter = () => {
    setOpenFilter(!openFilter);
  };

  const handleResetFilter = () => {
    reset();
    handleFilter();
  };



  return (
    <Page title = 'Producrs'>
      { loading ? (
      <LoadingScreen/>       
       ) : (
       <Fragment>
        <Box display='flex' sx={{mt:'100px'}}> 
            <Box width='100%'>
              <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', pl:{lg:7, md:7.2, sm:7, xs:2.5}, pr:{lg:7, md:7.2, sm:7, xs:2.5}, pt:1, pb:1}}>
                <Typography variant='subtitle1'> {`${count} Results`}</Typography>

             <Button color='inherit' sx={{borderRadius:5}} variant='contained' endIcon={<Iconify icon={'ic:round-filter-list'} />} onClick={handleFilter}>
                  {openFilter ? 'Hide Filters': 'Show Filters'} 
                </Button>

               
              </Box> 
              
              <Box sx={{display:'flex'}}>

              <FormProvider methods={methods}>


                {mdUp &&  
                <Collapse sx={{ marginLeft:( openFilter ? '40px' : '0px')}}  orientation="horizontal" in={openFilter}>
                  <ProductFilter 
                  onResetAll = {handleResetFilter}
                  isOpen = {openFilter}
                  onOpen = {handleFilter}
                  />
                </Collapse>}
                
                {!mdUp && 
                <Drawer
                anchor='bottom'
                open={openFilter}
                onClose={handleFilter}>
                  <ProductFilter  
                  onResetAll = {handleResetFilter}
                  isOpen = {openFilter}
                  onOpen = {handleFilter}/>
              </Drawer>}

              </FormProvider>
              
              <div className='product_wrapper'>
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
                { products && products.map((product) => <ProductItems key={product._id} product={product}/>)}
                </Box>
              </div>
           </Box>
        </Box>
     </Box>
  </Fragment>)}
</Page>
     
  )
}


