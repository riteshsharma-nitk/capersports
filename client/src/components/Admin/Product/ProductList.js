import React from 'react'
import {Fragment, useEffect} from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {clearErrors, getAdminProduct, deleteProduct} from '../../../actions/productAction'
import {Link as RouterLink} from 'react-router-dom'
import {Box, Button, Card, Container, FormControlLabel, Grid, IconButton, Link, Switch, Table, TableBody, TableContainer, TablePagination, Tooltip, Typography} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from '../Sidebar'
import { DELETE_PRODUCT_RESET } from "../../../constants/productConstants";
import { useNavigate } from 'react-router-dom';
import Page from '../../../helper/Page';
import HeaderBreadcrumbs from '../../../helper/HeaderBreadcrumbs';
import Iconify from '../../../helper/Iconify';
import useSettings from '../../../hooks/useSettings';
import Scrollbar from '../../../helper/Scrollbar';
import useTable, { emptyRows } from '../../../hooks/useTable';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from '../../../helper/table';
import ProductTableRow from './ProductTableRow';

const TABLE_HEAD = [
  { id: 'name', label: 'Product', align: 'left' },
  { id: 'createdAt', label: 'Create at', align: 'left' },
  { id: 'inventoryType', label: 'Status', align: 'center', width: 180 },
  { id: 'price', label: 'Price', align: 'right' },
  { id: '' },
];

export default function ProductList() {

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
  } = useTable({
    defaultOrderBy: 'createdAt',
  });

  const { themeStretch } = useSettings();


  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, products} = useSelector((state) => state.products);
  const { error: deleteError, isDeleted } = useSelector((state) => state.product);

  const deleteProductHandler = (id) => {
    dispatch(deleteProduct(id));
  };

  const handleEditRow = (id) => {
    navigate(`/admin/product/${id}`)
  }

  const handleDeleteRows = (selected) => {
    for(let i=0;i<selected.length;i++){
      deleteProductHandler(selected[i])
    }
  }

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


  const rows = [];

  products &&
    products.forEach((item) => {
      rows.push({
        id: item._id,
        stock: item.Stock,
        price: item.price,
        name: item.name,
        createdBy:item.user,
        image:item.images[0].url,
        createdAt:item.createdAt

      });
    });

    const denseHeight = dense ? 60 : 80;

  


  return (
    <Page title="Ecommerce: Product List">
    <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
        heading="Product List"
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          {
            name: 'Caper Sports',
            href: '/admin/products',
          },
          { name: 'Product List' },
        ]}
        action={
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:plus-fill" />}
            component={RouterLink}
            to={'/admin/product'}
          >
            New Product
          </Button>
        }
      />
      <Card>
        <Scrollbar>

        <TableContainer sx={{ minWidth: 800 }}>
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
                    <Tooltip title="Delete">
                      <IconButton color="primary" onClick={() => handleDeleteRows(selected)}>
                        <Iconify icon={'eva:trash-2-outline'} />
                      </IconButton>
                    </Tooltip>
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
                
                    {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => (
                     
                        <ProductTableRow
                          key={row.id}
                          row={row}
                          selected={selected.includes(row.id)}
                          onSelectRow={() => onSelectRow(row.id)}
                          onDeleteRow={() => deleteProductHandler(row.id)}
                          onEditRow={() => handleEditRow(row.id)}
                        />
                      ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, rows.length)} />

                  <TableNoData/>
                </TableBody>
              </Table>
            </TableContainer>

        </Scrollbar>

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
      </Card>
     
      
    
        </Container>
      </Page>
  );
};

