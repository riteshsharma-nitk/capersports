import PropTypes from 'prop-types';
import { useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, Link, MenuItem } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
import createAvatar from '../../utils/createAvatar';
import { fCurrency } from '../../utils/formatNumber';
// components
import Label from '../../helper/Label';
import Avatar from '../../helper/Avatar';
import { TableMoreMenu } from '../../helper/table';
import Iconify from '../../helper/Iconify';

// ----------------------------------------------------------------------

ReviewTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onDeleteRow: PropTypes.func,
};

export default function ReviewTableRow({ row, selected, onSelectRow, onDeleteRow }) {
  const theme = useTheme();

  const { id, rating, comment, user, CreateAt } = row;

  const [openMenu, setOpenMenuActions] = useState(null);

  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar alt={user} color={createAvatar(user).color} sx={{ mr: 2 }}>
          {user}
        </Avatar>

        <Stack>
          <Typography variant="subtitle2" noWrap>
            {id}
          </Typography>

        </Stack>
      </TableCell>

      <TableCell align="left">{user}</TableCell>

      <TableCell align="left">{CreateAt && fDate(CreateAt)}</TableCell>
      <TableCell align="center">{comment}</TableCell>

      <TableCell align="center">{rating}</TableCell>



     

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={() => {
                  onDeleteRow();
                  handleCloseMenu();
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                Delete
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
