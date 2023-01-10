import React, { Fragment, useEffect } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import Loader from "../Layout/Loader";
import { Link, useNavigate } from "react-router-dom";
// import { NotificationManager } from 'react-notifications';
import Typography from "@mui/material/Typography";
import LaunchIcon from "@mui/icons-material/Launch";
import { Box, Card, Container, FormControlLabel, Grid, IconButton, Paper, Stack, Switch, Table, TableBody, TableContainer, TablePagination, Tooltip } from "@mui/material";
import LoadingScreen from "../../helper/LoadingScreen";
import Page from "../../helper/Page";
import HeaderBreadcrumbs from "../../helper/HeaderBreadcrumbs";
import useSettings from "../../hooks/useSettings";
import useTable, { emptyRows } from "../../hooks/useTable";
import Scrollbar from "../../helper/Scrollbar";
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from "../../helper/table";
import Iconify from "../../helper/Iconify";
import ReviewTableRow from "../Admin/Product/ReviewTableRow";
import OrderTableRow from "./OrderTableRow";

const MyOrders = () => {
  const navigate = useNavigate();

  const { themeStretch } = useSettings();

  const dispatch = useDispatch();

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


  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);

  const denseHeight = dense ? 56 : 76;

  const TABLE_HEAD = [
    { id: 'orderNumber', label: 'Order Id', align: 'left' },
    { id: 'createDate', label: 'Create', align: 'left' },
    { id: 'itemsQty', label: 'Items Qty', align: 'left' },
    { id: 'price', label: 'Amount', align: 'center', width: 140 },
    { id: 'status', label: 'Status', align: 'center', width: 140 },

    { id: '' },

  ];

  const handleEditRow = (id) => {
    navigate(`/order/${id}`)
  }

  
  const rows = [];

  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
        createAt:item.createdAt
      });
    });

  useEffect(() => {
    if (error) {
      // NotificationManager.error(error);
      dispatch(clearErrors());
    }

    dispatch(myOrders());
  }, [dispatch, error]);

  return (
    <Fragment>

      {loading ? (
        <LoadingScreen />
      ) : (
        <Page title="My Orders: View">
        <Container maxWidth={themeStretch ? false : 'lg'} sx={{pt:'88px'}}>
          <HeaderBreadcrumbs
            heading="My Orders"
            links={[
              { name: user?.name, href: '/account' },
              {
                name: 'Orders',
                href: '/orders',
              },
            ]}
          />

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
                        <IconButton color="primary">
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
                    <OrderTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onViewRow={() => handleEditRow(row.id)}

                    />
                  ))}

                  <TableEmptyRows height={denseHeight} emptyRows={emptyRows(page, rowsPerPage, rows.length)} />

                  <TableNoData />
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
        

        
      )}
    </Fragment>
  );
};

export default MyOrders;