import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, MenuItem } from '@mui/material';
import { fDate } from '../../utils/formatTime';
import Label from '../../helper/Label';
import { TableMoreMenu } from '../../helper/table';
import Iconify from '../../helper/Iconify';

OrderTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func,
  onViewRow: PropTypes.func,
};

export default function OrderTableRow({ row, selected, onSelectRow, onViewRow, onEditRow, onDeleteRow }) {
  const theme = useTheme();

  const { id, createAt, status, amount, itemsQty } = row;

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

      <TableCell align="left">{id}</TableCell>

      <TableCell align="left">{createAt && fDate(createAt)}</TableCell>
      <TableCell align="center">{itemsQty}</TableCell>
      <TableCell align="center">{`₹${(amount)}`}</TableCell>



      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'Delivered' && 'success') ||
            (status === 'shipped' && 'warning') ||
            (status === 'Processing' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {status}
        </Label>
      </TableCell>

      <TableCell align="right">
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
            
            <MenuItem
                onClick={() => {
                  onViewRow();
                  handleCloseMenu();
                }}
              >
                <Iconify icon={'eva:eye-fill'} />
                View
              </MenuItem>
           

            
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
