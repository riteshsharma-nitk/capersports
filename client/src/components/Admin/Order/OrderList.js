import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import sumBy from 'lodash/sumBy';
import { Card, Container, Divider, FormControlLabel, IconButton, Stack, Switch, Table, TableBody, TableContainer, TablePagination, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import useTable, { emptyRows } from '../../../hooks/useTable';
import { deleteOrder, getAllOrders, clearErrors } from "../../../actions/orderAction";
import { DELETE_ORDER_RESET } from "../../../constants/orderConstants";
import { Box } from "@mui/system";
import Page from "../../../helper/Page";
import HeaderBreadcrumbs from "../../../helper/HeaderBreadcrumbs";
import Iconify from "../../../helper/Iconify";
import useSettings from "../../../hooks/useSettings";
import Scrollbar from '../../../helper/Scrollbar';
import InvoiceAnalytic from "./InvoiceAnalytic";
import { useTheme } from '@mui/material/styles';
import { TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions } from "../../../helper/table";
import InvoiceTableRow from "./InvoiceTableRow";

const TABLE_HEAD = [
  { id: 'orderId', label: 'Order Id', align: 'left' },
  { id: 'createDate', label: 'Create', align: 'left' },
  { id: 'price', label: 'Amount', align: 'center', width: 140 },
  { id: 'itemQty', label: 'Item Quantity', align: 'center', width: 140 },
  { id: 'status', label: 'Status', align: 'left' },
  { id: '' },
];

const OrderList = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { themeStretch } = useSettings();

  const navigate = useNavigate()

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

  const { error, orders } = useSelector((state) => state.allOrders);

  const { error: deleteError, isDeleted } = useSelector((state) => state.order);

  const denseHeight = dense ? 56 : 76;

  const handleEditRow = (id) => {
    navigate(`/admin/order/${id}`)
  }

  const deleteOrderHandler = (id) => {
    dispatch(deleteOrder(id));
  };

  const handleDeleteRows = (selected) => {
    for(let i=0;i<selected.length;i++){
      deleteOrderHandler(selected[i])
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
      navigate("/admin/orders");
      dispatch({ type: DELETE_ORDER_RESET });
    }

    dispatch(getAllOrders());
  }, [dispatch, error, deleteError, isDeleted]);

  
  

            
  const rows = [];

  orders &&
    orders.forEach((item) => {
      rows.push({
        id: item._id,
        itemsQty: item.orderItems.length,
        amount: item.totalPrice,
        status: item.orderStatus,
        createDate: item.createdAt,
      });
    });

    const getLengthByStatus = (status) => rows.filter((item) => item.status === status).length;
    const getTotalPriceByStatus = (status) => sumBy(rows.filter((item) => item.status === status),'amount');
    const getPercentByStatus = (status) => (getLengthByStatus(status) / rows.length) * 100;


  return (
      <Page title="Invoice: List">
        <Container maxWidth={themeStretch ? false : 'lg'}>
          <HeaderBreadcrumbs
            heading="Order List"
            links={[
              { name: 'Dashboard', href: '/admin/dashboard' },
              { name: 'Orders', href: 'admin/orders' },
              { name: 'List' },
            ]}
          />    
          <Card sx={{mb:5}}>
          <Scrollbar>

          <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <InvoiceAnalytic
                title="Total"
                total={rows?.length}
                percent={100}
                price={sumBy(rows, 'amount')}
                icon="ic:round-receipt"
                color={theme.palette.info.main}
              />
              <InvoiceAnalytic
                title="Delivered"
                total={getLengthByStatus('Delivered')}
                percent={getPercentByStatus('Delivered')}
                price={getTotalPriceByStatus('Delivered')}
                icon="eva:checkmark-circle-2-fill"
                color={theme.palette.success.main}
              />
              <InvoiceAnalytic
                title="Shipped"
                total={getLengthByStatus('Shipped')}
                percent={getPercentByStatus('Shipped')}
                price={getTotalPriceByStatus('Shipped')}
                icon="eva:clock-fill"
                color={theme.palette.warning.main}
              />
              <InvoiceAnalytic
                title="Processing"
                total={getLengthByStatus('Processing')}
                percent={getPercentByStatus('Processing')}
                price={getTotalPriceByStatus('Processing')}
                icon="eva:bell-fill"
                color={theme.palette.error.main}
              />
            </Stack>
          </Scrollbar>
          </Card>

          <Card>
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
                      <Tooltip title="Sent">
                        <IconButton color="primary">
                          <Iconify icon={'ic:round-send'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Download">
                        <IconButton color="primary">
                          <Iconify icon={'eva:download-outline'} />
                        </IconButton>
                      </Tooltip>

                      <Tooltip title="Print">
                        <IconButton color="primary">
                          <Iconify icon={'eva:printer-fill'} />
                        </IconButton>
                      </Tooltip>

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
                    <InvoiceTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => deleteOrderHandler(row.id)}
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

  );
};

export default OrderList;