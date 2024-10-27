import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getAllReviews, deleteReviews } from "../../../actions/productAction";
import { Button, Card, Container, FormControlLabel, IconButton, Stack, Switch, Table, TableBody, TableContainer, TablePagination, TextField, Tooltip } from "@mui/material";
import { DELETE_REVIEW_RESET } from "../../../constants/productConstants";
import { useNavigate } from "react-router";
import Box from '@mui/material/Box';
import Page from "../../../helper/Page";
import HeaderBreadcrumbs from "../../../helper/HeaderBreadcrumbs";
import Scrollbar from "../../../helper/Scrollbar";
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from "../../../helper/table";
import Iconify from "../../../helper/Iconify";
import useTable, { emptyRows } from "../../../hooks/useTable";
import ReviewTableRow from "./ReviewTableRow";


const ProductReviews = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    //
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable({ defaultOrderBy: 'createDate' });

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

  const handleDeleteRows = (selected) => {
    for(let i=0;i<selected.length;i++){
      deleteReviewHandler(selected[i])
    }
  }

  const denseHeight = dense ? 56 : 76;


  const productReviewsSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllReviews(productId));
  };

  useEffect(() => {
    if (productId.length === 24) {
      dispatch(getAllReviews(productId));
    }
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/reviews");
      dispatch({ type: DELETE_REVIEW_RESET });
    }
  }, [dispatch, error, deleteError, isDeleted, productId]);


  const TABLE_HEAD = [
    { id: 'reviewId', label: 'Review Id', align: 'left' },
    { id: 'userName', label: 'User Name', align: 'left' },

    { id: 'create', label: 'Create', align: 'left' },
    { id: 'comment', label: 'Comment', align: 'left' },
    { id: 'rating', label: 'Rating', align: 'left' },
    { id: '' },
  ];



  const rows = [];

  reviews &&
    reviews.forEach((item) => {
      rows.push({
        id: item._id,
        rating: item.rating,
        comment: item.comment,
        user: item.name,
        CreateAt : item.reviewCreatedAt
      });
    });

  return (

    <Page title="Reviews: View">
    <Container maxWidth='lg'>
      <HeaderBreadcrumbs
        heading="Product reviews"
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          {
            name: 'Reviews',
            href:'/admin/reviews',
          },
          { name: 'product reviews'},
        ]}
      />      
      
      <Box component="form" onSubmit={productReviewsSubmitHandler} sx={{ mt: 2 }}>
        <Stack direction='column' spacing={2}>
        <TextField
        name="productId"
        type='text'
        fullWidth
        required
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        label="Product Id"/>
        
       
        
        <Button
        size="large"
        type="submit"
        fullWidth
        variant="contained"
        sx={{backgroundColor:"black"}}
        disabled={
          loading ? true : false || productId === "" ? true : false
        }>
        Search
        </Button>
        </Stack>
        </Box>
<br></br>
        <Card sx={{ mb: 5 }}>
        <Scrollbar>
        <TableContainer sx={{ minWidth: 800, position: 'relative' }}>
              {selected.length > 0 && (
                <TableSelectedActions
                  dense={dense}
                  numSelected={selected.length}
                  rowCount={rows.length}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      rows.map((row) => row.id)
                    )
                  }
                  actions={
                    <Stack spacing={1} direction="row">
                      <Tooltip title="Delete">
                        <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                          <Iconify icon={'eva:trash-2-outline'} />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  }
                />
              )}

              <Table size={dense ? 'small' : 'medium'}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={rows.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      rows.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <ReviewTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => deleteReviewHandler(row.id)}
                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, rows.length)} />

                  <TableNoData />
                </TableBody>
              </Table>
            </TableContainer>
          

        </Scrollbar>
        </Card>

        <Box sx={{ position: 'relative' }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={onChangePage}
              onRowsPerPageChange={onChangeRowsPerPage}
            />

            <FormControlLabel
              control={<Switch checked={dense} onChange={onChangeDense} />}
              label="Dense"
              sx={{ px: 3, py: 1.5, top: 0, position: { md: 'absolute' } }}
            />
          </Box>
         
          </Container>
          </Page>

  );
};

export default ProductReviews;