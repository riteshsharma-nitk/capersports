import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as Yup from 'yup';
import { clearErrors, updateProduct, getProductDetails,} from "../../actions/productAction";
import { useParams } from 'react-router-dom';
import {useNavigate} from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import { Card, Container, Grid, InputAdornment, Stack, Typography } from '@mui/material';
import { createTheme, styled } from '@mui/material/styles';
import useSettings from "../../hooks/useSettings";
import Page from "../../helper/Page";
import HeaderBreadcrumbs from "../../helper/HeaderBreadcrumbs";
import { yupResolver } from '@hookform/resolvers/yup';

import {
    FormProvider,
    RHFSelect,
    RHFEditor,
    RHFTextField,
    RHFUploadMultiFile,
  } from '../../helper/hook-form';

import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";
import { LoadingButton } from '@mui/lab';
  

const CATEGORY_OPTION = [
  { group:'Clothing', classify:['T-Shirts', 'Hoodies', 'Sweatshirts', 'Jackets', 'Tracksuits', 'Shorts', 'Socks', 'Trouser', 'Cap', 'Basketball Kit'] }]

const LabelStyle = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle2,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  }));

const UpdateProduct = () => {
    const { themeStretch } = useSettings();
    const { enqueueSnackbar } = useSnackbar();

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, product } = useSelector((state) => state.productDetails);
    const { loading, error: updateError, isUpdated,} = useSelector((state) => state.product);

    const NewProductSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        description: Yup.string().required('Description is required'),
        information: Yup.string().required('Information is required'),
        images: Yup.array().min(1, 'Images is required'),
        price: Yup.number().moreThan(0, 'Price should not be $0.00'),
        category: Yup.string().required('Category is required'),
        Stock:Yup.number().required('Stock is required')
      });

      const defaultValues = useMemo(
        () => ({
          name: product?.name || '',
          description: product?.description || '',
          information: product?.information || '',
          images: product?.images?.map(({url})=>url) || [],
          price: product?.price || 0,
          Stock: product?.Stock || 0,
          category: product?.category || '',
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [product]
      );

      const methods = useForm({
        resolver: yupResolver(NewProductSchema),
        defaultValues,
      });

      const {
        reset,
        watch,
        control,
        setValue,
        getValues,
        handleSubmit,
        formState: { isSubmitting },
      } = methods;

      const values = watch();
      
      

    
    const {id} = useParams();
    const productId = id;

    useEffect(() => {

        if (product && product._id !== productId) {
            dispatch(getProductDetails(productId));
          }

        reset(defaultValues)
      
        if (error) {
            dispatch(clearErrors());
        }

        if (updateError) {
            dispatch(clearErrors());
        }

        if (isUpdated) {
            localStorage.clear();
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

 

  

    const onSubmit = async () => {
        try {
        
          await new Promise((resolve) => setTimeout(resolve, 500));
    
           console.log(values)
       
          dispatch(updateProduct(productId, values));
          reset();
          enqueueSnackbar('Update success!');
          navigate('/admin/products');
        } catch (error) {
          console.error(error);
        }
      };

      const convertToBase64 = (files) => {
        return new Promise((resolve, reject) => {
          files.map((file) => {
          const fileReader = new FileReader();
          fileReader.onload = () => {
            resolve(fileReader.result);
            localStorage.setItem(file.path, fileReader.result);
          }
          fileReader.readAsDataURL(file);
          fileReader.onerror = (error) => {
            reject(error);
          };
        });
      })
      };

      const handleDrop = useCallback(
        (acceptedFiles) => {
          convertToBase64(acceptedFiles)
                setValue('images',
                  acceptedFiles.map((file) =>
                    Object.assign(file, {
                      preview: URL.createObjectURL(file),
                      base64Image: localStorage.getItem(file.path),
                    })
                  )
                )
              
            },[setValue]
      )


      const handleRemoveAll = () => {
        setValue('images', []);
      };
    
      const handleRemove = (file) => {
        const filteredItems = values.images?.filter((_file) => _file !== file);
        setValue('images', filteredItems);
      };



    return (
    <Page title="Ecommerce: Update a new product">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
          heading={'Edit product'}
          links={[
            { name: 'Dashboard', href: '/admin/dashboard' },
            {
              name: 'Caper Sports',
              href: '/products',
            },
            { name: product.name },
          ]}
        />
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>

    <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3}>
              <RHFTextField name="name" label="Product Name" />

              <div>
                <LabelStyle>Description</LabelStyle>
                <RHFEditor simple name="description" />
              </div>

              <div>
                <LabelStyle>Information</LabelStyle>
                <RHFEditor simple name="information" />
              </div>

              <div>
                <LabelStyle>Images</LabelStyle>
                <RHFUploadMultiFile
                  name="images"
                  showPreview
                  accept="image/*"
                  maxSize={3145728}
                  onDrop={handleDrop}
                  onRemove={handleRemove}
                  onRemoveAll={handleRemoveAll}
                  
                />
              </div>
       </Stack>
       </Card>
       </Grid>
       <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            <Card sx={{ p: 3 }}>
            <Stack spacing={3} mt={2}>

            <RHFTextField name="Stock" label="Stock" />

            <RHFSelect name="category" label="Category">
                  {CATEGORY_OPTION.map((category) => (
                    <optgroup key={category.group} label={category.group}>
                    {category.classify.map((classify) => (
                      <option key={classify} value={classify}>
                        {classify}
                      </option>
                    ))}
                  </optgroup>
                ))}
                </RHFSelect>

               </Stack>

              </Card>

              <Card sx={{ p: 3 }}>
              <Stack spacing={3} mb={2}>
                <RHFTextField
                  name="price"
                  label="Regular Price"
                  placeholder="0.00"
                  value={getValues('price') === 0 ? '' : getValues('price')}
                  onChange={(event) => setValue('price', Number(event.target.value))}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">₹</InputAdornment>,
                    type: 'number',
                  }}
                />
                </Stack>
                </Card>

                <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
             Save Changes
            </LoadingButton>
            </Stack>
            




              </Grid>
       </Grid>
       </FormProvider>






       
           
        
            </Container>
            </Page>
       
    );
};

export default UpdateProduct;