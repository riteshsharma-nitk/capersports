import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, updateProduct, getProductDetails,} from "../../actions/productAction";
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Box from '@mui/material/Box';
import Sidebar from "./Sidebar";
import { Avatar, Button, Container, CssBaseline, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextareaAutosize, TextField, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InventoryIcon from '@mui/icons-material/Inventory';
import { NotificationManager } from 'react-notifications';


const theme = createTheme();

const UpdateProduct = ({match}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, product } = useSelector((state) => state.productDetails);
    const {
        loading,
        error: updateError,
        isUpdated,
    } = useSelector((state) => state.product);


    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);
    const [information, setInformation] = useState("");

    const categories = [
        'T-Shirts',
        'Hoodies',
        'Sweatshirts',
        'Jackets',
        'Tracksuits',
        'Shorts',
        'Socks',
    ]
    
    const {id} = useParams();
    const productId = id;

    useEffect(() => {
        console.log(productId)
        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
        } else {
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
            setInformation(product.information);
        }
        if (error) {
            NotificationManager.error(error);
            dispatch(clearErrors());
        }

        if (updateError) {
            NotificationManager.error(updateError);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            NotificationManager.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({ type: UPDATE_PRODUCT_RESET });
        }
    }, [
        dispatch,
        error,
        isUpdated,
        productId,
        product,
        updateError,
    ]);

    const updateProductSubmitHandler = (e) => {
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

        
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);

        setImages([]);
        setImagesPreview([]);
        setOldImages([]);

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

        <Box display='flex' sx={{marginTop:1 ,backgroundColor:'#f5f5f5'}}>
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
                            justifyContent:'center',
                            alignItems: 'center',
                        }}>
                            
                            <Avatar sx={{ m: 1, bgcolor: 'secondary.main', fontSize:'1.5rem' }}>
                                <InventoryIcon />
                            </Avatar>
                            
                            <Typography fontSize='1.5rem' fontWeight='medium'>
                                Update Product
                            </Typography>
                            
                            <Box encType="multipart/form-data" component="form" onSubmit={updateProductSubmitHandler} sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                        type='text'
                                        name="name"
                                        fontSize='1rem'
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        fullWidth
                                        label="Product Name"
                                        />
                                        
                                </Grid>
                                
                                <Grid item xs={12}>
                                    <TextField
                                    type='number'
                                    fullWidth
                                    name="price"
                                    fontSize='1rem'
                                    label="Price"
                                    value={price}
                                   
                                    onChange={(e) => setPrice(e.target.value)}
                                    />
                                
                                </Grid>
                                
                                
                                <Grid item xs={12}>
                                    <TextField
                                    multiline
                                    fullWidth
                                    name="description"
                                    value={description}
                                    fontSize='1rem'
                                    onChange={(e) => setDescription(e.target.value)}
                                    
                                    label="Product Description"
                                    />
                                    
                                </Grid>
 
                                <Grid item xs={12}>
                                     <TextField
                                     multiline
                                     fullWidth
                                  
                                    value={information}
                                    name="information"
                                    onChange={(e) => setInformation(e.target.value)}       
                                    fontSize='1rem'
                                    label="Product Information"
                                    />
                                </Grid>

                                <Grid item  md={6} xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel  fontSize='1rem'>Category</InputLabel>

                                    <Select
                                     fontSize='1rem'
                                    label="Category"
                                    name="category"
                                    value={category}
                                     onChange={(e) => setCategory(e.target.value)}>
                                        <MenuItem  fontSize='1rem' value="">Choose Category</MenuItem>
                                        {categories.map((cate) => (
                                        <MenuItem  fontSize='1rem' key={cate} value={cate}>
                                            {cate}
                                        </MenuItem>
                                        ))}
                                    </Select>
                                    </FormControl>
                        
                                </Grid>

                                <Grid item md={6} xs={12}>
                                    <TextField
                                    type='number'
                                    fullWidth
                                    label="Stock"
                                    name="Stock"
                                    fontSize='1rem'
                                    value={Stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    
                                />
                                </Grid>

                                <Grid item xs={12}>
                                    <Button
                                    fullWidth
                                    variant='contained'
                                    component='label'
                                    required
                                    sx={{textTransform:'none'}}
                                   
                                    label="image"
                                    type="file"
                                   
                                    fontSize='1rem'>
                                    Upload File
                                    <input
                                    type='file'
                                     name="images"
                                    accept='image/*'
                                    onChange={updateProductImagesChange}                          
                                    multiple
                                    hidden
                                    />
                                    </Button>
                                </Grid>
                                
                                
                                <Grid gap={2} display='flex' justifyContent='center' overflow='auto' item xs={12}>
                                    {oldImages && oldImages.map((image, index) => (
                                    <Avatar key={index} src={image?.url} alt="Old Product Preview" />))}
                                </Grid>
                                
                                <Grid gap={2} display='flex' justifyContent='center' overflow='auto' item xs={12}>
                                    {imagesPreview.map((image, index) => (
                                    <Avatar key={index} src={image} alt="Product Preview" />))}
                                </Grid>
                                
                            </Grid>    
                              
                            
                            <Button
                                type="submit"
                                fullWidth
                                fontSize='1rem'
                                variant="contained"
                                sx={{ mt: 3, mb: 2, backgroundColor:"black", color:'white', textTransform:'none' }}
                                disabled={loading ? true : false}
                            >
                                Update
                            </Button>
                  </Box>
                  </Box>
              
             </Paper>
            </Container>
            </Grid>
          </ThemeProvider>
          </Box>
       
    );
};

export default UpdateProduct;