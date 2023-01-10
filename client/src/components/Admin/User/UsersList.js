import React, { Fragment, useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import { Box, Card, Container, FormControlLabel, Grid, IconButton, Link, Switch, Table, TableBody, TableContainer, TablePagination, Tooltip, Typography } from "@mui/material";
import { Button } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { getAllUsers, clearErrors, deleteUser } from "../../../actions/userAction";
import { DELETE_USER_RESET } from "../../../constants/userConstants";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";
import EditIcon from '@mui/icons-material/Edit';
import Page from "../../../helper/Page";
import useSettings from "../../../hooks/useSettings";
import HeaderBreadcrumbs from "../../../helper/HeaderBreadcrumbs";
import Iconify from "../../../helper/Iconify";
import Scrollbar from "../../../helper/Scrollbar";
import {TableEmptyRows, TableHeadCustom, TableNoData, TableSelectedActions} from '../../../helper/table'
import useTable, { emptyRows } from "../../../hooks/useTable";
import UserTableRow from "./UserTableRow";
import UserTableToolbar from "./UserTableToolbar";

const TABLE_HEAD = [
  { id: 'name', label: 'Name', align: 'left' },
  { id: 'userId', label: 'User Id', align: 'left' },
  { id: 'role', label: 'Role', align: 'left' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: '' },
];

const ROLE_OPTIONS = [
  'all',
  'admin',
  'user',
];


const UsersList = () => {

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
  } = useTable();
  const { themeStretch } = useSettings();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, users } = useSelector((state) => state.allUsers);

  const denseHeight = dense ? 52 : 72;

  const {
    error: deleteError,
    isDeleted,
    message,
  } = useSelector((state) => state.profile);

  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id));
  };


  const editUserHandler = (id) => {
   navigate(`/admin/user/${id}`)
  };

  const handleDeleteRows = (selected) => {
   for(let i=0;i<selected.length;i++){
    deleteUserHandler(selected[i])
   }
  };

  useEffect(() => {
    if (error) {
      dispatch(clearErrors());
    }

    if (deleteError) {
      dispatch(clearErrors());
    }

    if (isDeleted) {
      navigate("/admin/users");
      dispatch({ type: DELETE_USER_RESET });
    }

    dispatch(getAllUsers());
  }, [dispatch, error, deleteError, isDeleted, message]);

  const rows = [];

  users &&
    users.forEach((item) => {
      rows.push({
        id: item._id,
        role: item.role,
        email: item.email,
        name: item.name,
        avatar: item.avatar.url
      });
    });

  return (
    <Page title="User: List">
      <Container maxWidth={themeStretch ? false : 'lg'}>
      <HeaderBreadcrumbs
          heading="User List"
          links={[
            { name: 'Dashboard', href:'/admin/dashboard' },
            { name: 'User', href: '/admin/users' },
            { name: 'List' },
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon={'eva:plus-fill'} />}
            >
              New User
            </Button>
          }
        />
      
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
                  {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                    <UserTableRow
                      key={row.id}
                      row={row}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => deleteUserHandler(row.id)}
                      onEditRow={() => editUserHandler(row.id)}


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


    {/* <Grid backgroundColor='#f5f5f5' container rowSpacing={2} borderRadius={2} padding={2}>
    <Grid  item md={12} xs={12}>
      <Typography fontSize='1.5rem' textAlign='center'>All Users</Typography>
      </Grid>
      <Grid item md={12} xs={12}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        </Grid>
        </Grid> */}
        </Container>
      </Page>
  );
};

export default UsersList;