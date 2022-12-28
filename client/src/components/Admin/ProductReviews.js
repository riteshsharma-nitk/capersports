import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getAllReviews,
  deleteReviews,
} from "../../actions/productAction";
import { NotificationManager } from 'react-notifications';
import { Avatar, Button, Container, CssBaseline, Divider, Grid, Paper, TextField, Typography } from "@mui/material";

import ReviewsIcon from '@mui/icons-material/Reviews';
import DeleteIcon from '@mui/icons-material/Delete';
import { DELETE_REVIEW_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Sidebar from "./Sidebar";

import { createTheme, ThemeProvider } from '@mui/material';
const theme = createTheme();


const ProductReviews = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.review
  );

  const { error, reviews, loading } = useSelector(
    (state) => state.productReviews
  );

  const [productId, setProductId] = useState("");

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId, productId));
  };

  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (deleteError) {
      NotificationManager.error(deleteError);
      dispatch(clearErrors());
    }

    if (isDeleted) {
      NotificationManager.success("Review Deleted Successfully");
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId]);

  const columns = [
    { field: "id", headerName: "Review ID", minWidth: 200, flex: 0.5 },

    {
      field: "user",
      headerName: "User",
      minWidth: 200,
      flex: 0.6,
    },

    {
      field: "comment",
      headerName: "Comment",
      minWidth: 350,
      flex: 1,
    },

    {
      field: "rating",
      headerName: "Rating",
      type: "number",
      minWidth: 180,
      flex: 0.4,

      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3
          ? "greenColor"
          : "redColor";
      },
    },

    {
      field: "actions",
      flex: 0.3,
      headerName: "Actions",
      minWidth: 150,
      type: "number",
      sortable: false,
      renderCell: (params) => {
        return (
          <Fragment>
            <Button
              onClick={() =>
                deleteReviewHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
      });
    });

  return (

  <Box display='flex' sx={{marginTop:1}}>
      <Sidebar/>
      
      <ThemeProvider theme={theme}>
      <Grid container rowSpacing={2}>

<Grid item md={12} xs={12}>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'  }}> 

      <Box
                sx={{
                  marginTop: 2,
                  marginBottom: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                                <ReviewsIcon />
                            </Avatar>
                            
                            <Typography fontSize='1.5rem' fontWeight='medium'>
                                All Reviews
                            </Typography>
                            
     


            <Box component="form" onSubmit={productReviewsSubmitHandler} sx={{ mt: 2 }}>
              
              <Grid container spacing={2}>
                                    <Grid item md={12} xs={12}>
                                        <TextField
                                        fontSize='1rem'
                                        name="productId"
                                        type='text'
                                     fullWidth
                                      required
                                        value={productId}
                                        onChange={(e) => setProductId(e.target.value)}

                                        label="Product Id"
                                        />
                                        
                                </Grid>
                                </Grid>
                              
                              <br></br>

                                <Button
                                  fontSize='1rem'

                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{backgroundColor:"black",textTransform:'none' }}
                                disabled={
                                  loading ? true : false || productId === "" ? true : false
                                }
                            >
                                Search
                            </Button>

                            </Box>
              </Box>
             
             </Paper>
             </Container>
             </Grid>

        
 
<Grid item md={12} xs={12} padding={2}>

  

          {reviews && reviews.length > 0 ? (
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
            />
          ) : (
            <Typography textAlign='center' variant="h5">No Reviews Found</Typography>
          )}
         
          </Grid>
          </Grid>
          </ThemeProvider>
         
        </Box>

  );
};

export default ProductReviews;