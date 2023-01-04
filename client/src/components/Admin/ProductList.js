import React from 'react'
import {Fragment, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {clearErrors, getAdminProduct, deleteProduct} from '../../actions/productAction'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Button, Grid, IconButton, Link, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../Admin/Sidebar'
import { DELETE_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from 'react-router-dom';



function ProductList() {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products } = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product
  );

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/dashboard");
      dispatch({ type: DELETE_PRODUCT_RESET });
    }


    dispatch(getAdminProduct());
  },  [dispatch, error, deleteError, isDeleted]);

  const columns = [
    { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

    {
      field: "name",
      headerName: "Name",
      minWidth: 350,
      flex: 1,
    },

    {
      field:'createdBy',
      headerName:'Created By',
      minWidth: 350,
      flex: 1,
    }
    ,
    {
      field: "stock",
      headerName: "Stock",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 270,
      flex: 0.5,
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
            <Link underline='none' component={RouterLink} to={`/admin/product/${params.getValue(params.id, "id")}`}>
              <IconButton>
              <EditIcon />
              </IconButton>
            </Link>

            <IconButton 
              onClick={() =>
                deleteProductHandler(params.getValue(params.id, "id"))
              }
            >
              <DeleteIcon />
            </IconButton> 
          </Fragment>
        );
      },
    },
  ];

  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        createdBy:item.user,

      });
    });


  return (
    <Box display='flex' sx={{marginTop:1}}>
    <Sidebar/>
     
      
      <Grid backgroundColor='#f5f5f5' container rowSpacing={2} borderRadius={2} padding={2}>
        <Grid  item md={12} xs={12}>
        <Typography fontSize='1.5rem' textAlign='center'>All Products</Typography>
        </Grid>
        
        <Grid item md={12} xs={12}>
          <DataGrid sx={{backgroundColor:'white'}}
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
          </Grid>
        </Grid>
      </Box>
  );
};

export default ProductList;