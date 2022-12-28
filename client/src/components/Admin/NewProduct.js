import React from 'react'
import {Fragment, useEffect, useState} from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import Sidebar from './Sidebar';
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from 'react-router';
import { Box, Container } from '@mui/system';
import InventoryIcon from '@mui/icons-material/Inventory';
import { Avatar, Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NotificationManager } from 'react-notifications';
const theme = createTheme();
function NewProduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, error, success } = useSelector((state) => state.newProduct);
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [information, setInformation] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        'T-Shirts',
        'Hoodies',
        'Sweatshirts',
        'Jackets',
        'Tracksuits',
        'Shorts',
        'Socks',
      ]
      
      useEffect(() => {
        if (error) {
          NotificationManager.error(error);
          dispatch(clearErrors());
        }
    
        if (success) {
          NotificationManager.success("Product Created Successfully");
          navigate("/admin/dashboard");
          dispatch({ type: NEW_PRODUCT_RESET });
        }
      }, [dispatch, error, success]);


      const createProductSubmitHandler = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("information", information);
        myForm.set("category", category);
        myForm.set("Stock", Stock);
    
        images.forEach((image) => {
          myForm.append("images", image);
        });
        dispatch(createProduct(myForm));
      };
    
      const createProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
    
        files.forEach((file) => {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImagesPreview((old) => [...old, reader.result]);
              setImages((old) => [...old, reader.result]);
            }
          };
    
          reader.readAsDataURL(file);
        });
      };


  return (

  <Box display='flex' sx={{marginTop:1}}> 
    <Sidebar/>
    <ThemeProvider theme={theme}>
    <Grid backgroundColor='#f5f5f5' container rowSpacing={2}>
              <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px' }}> 

              <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', fontSize:'1.5rem' }}>
                  <InventoryIcon />
                </Avatar>
                <Typography fontSize='1.5rem' fontWeight='medium'>
                  Add Product
                </Typography>
                <Box component="form" onSubmit={createProductSubmitHandler} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        type='text'
                        fontSize='1rem'
                        value={name}
                        required
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        label="Product Name"
                       
                      />
                    </Grid>
                   
                    <Grid item xs={12}>
                      <TextField
                        type='number'
                        required
                        fullWidth
                        value={price}
                        name='price'
                        fontSize='1rem'
                        label="Price"
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        type='text'
                        fontSize='1rem'
                        multiline
                        name='description'
                        value={description}
                        required
                        onChange={(e) => setDescription(e.target.value)}                        
                        fullWidth
                        label="Product Description"
                      
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        type='text'
                        multiline
                        name='information'
                        value={information}
                        required
                        fontSize='1rem'
                        onChange={(e) => setInformation(e.target.value)}                        
                        fullWidth
                        label="Product Information"
                       
                        
                      />
                    </Grid>

                    <Grid item md={6} xs={12}> 
                     <FormControl fullWidth>
                     <InputLabel fontSize='1rem'>Category</InputLabel>
                     <Select
                     fontSize='1rem'
                     label='Category'
                     name='category'
                     required
                     onChange={(e) => setCategory(e.target.value)}>
                      <MenuItem fontSize='1rem' value="">Choose Category</MenuItem>
                      {categories.map((cate) => (
                      <MenuItem  fontSize='1rem' key={cate} value={cate}>
                    {cate}
                  </MenuItem>
                ))}
              </Select>
              </FormControl>  
                        
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <TextField
                         fontSize='1rem'
                        type='number'
                        required
                        fullWidth
                        name='Stock'
                        label="Stock"
                     
                        onChange={(e) => setStock(e.target.value)}
                        
                      />
                    </Grid>

                    <Grid item xs={12}>
                    <Button
                     fullWidth
                     fontSize='1rem'
                     sx={{textTransform:'none'}}
                      
                      variant='contained'
                      component='label'
                        required
                      
                     
                        label="image"
                        type="file"
                    
                >
                          Upload File
                          <input
                          type='file'
                          accept='image/*'
                          onChange={createProductImagesChange}                          
                          multiple
                          hidden
                          />
                        </Button>                    
                    </Grid>
                    <Grid gap={2} display='flex' justifyContent='flex-start' overflow='auto' item xs={12}>

                    {imagesPreview.map((image, index) => (
                <Avatar key={index} src={image} alt="Product Preview" />
              ))}
                  
                    </Grid>
      
      
                  </Grid>
                  <br></br>
                  <Button
                  
                    type="submit"
                    fullWidth
                    fontSize='1rem'
                    variant="contained"
                    sx={{ textTransform:'none', backgroundColor:"black", color:'white' }}
                    disabled={loading ? true : false}
                  >
                    Add
                  </Button>
                 
                </Box>
              </Box>
             
             </Paper>
            </Container>       
            </Grid>         
          </ThemeProvider>
    </Box>
 
    )
}

export default NewProduct