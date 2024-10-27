import PropTypes from 'prop-types'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import { Box, Stack, Button, Dialog, Tooltip, IconButton, DialogActions, CircularProgress } from '@mui/material';
import useToggle from '../../../hooks/useToggle';
import Iconify from '../../../helper/Iconify';
import InvoicePDF from './InvoicePDF';

InvoiceToolbar.propTypes = {
  order: PropTypes.object.isRequired,
};

export default function InvoiceToolbar({ order, setEdit, edit }) {
  
  const { toggle: open, onOpen, onClose } = useToggle();
  
  const handleEdit = () => {
    setEdit(!edit)
  };

  return (
    <>
      <Stack
        spacing={2}
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ sm: 'center' }}
        sx={{ mb: 5 }}
      >
        <Stack direction="row" spacing={1}>
          <Tooltip title="Edit">
            <IconButton onClick={handleEdit}>
              <Iconify icon={'eva:edit-fill'} />
            </IconButton>
          </Tooltip>

          <Tooltip title="View">
            <IconButton onClick={onOpen}>
              <Iconify icon={'eva:eye-fill'} />
            </IconButton>
          </Tooltip>

          <PDFDownloadLink
            document={<InvoicePDF invoice={order} />}
            fileName={order?._id}
            style={{ textDecoration: 'none' }}
          >
            {({ loading }) => (
              <Tooltip title="Download">
                <IconButton>
                  {loading ? <CircularProgress size={24} color="inherit" /> : <Iconify icon={'eva:download-fill'} />}
                </IconButton>
              </Tooltip>
            )}
          </PDFDownloadLink>
        </Stack>
        
        {order?.orderStatus != 'Delivered' && 
        
        <Button
          color="inherit"
          variant="outlined"
          startIcon={<Iconify icon={'eva:checkmark-fill'} />}
          sx={{ alignSelf: 'flex-end' }}
        >
          {order?.orderStatus === 'Processing' &&  'Mark as Shipped'}
          {order?.orderStatus === 'Shipped' &&  'Mark as Delivered'}


        </Button>}
      </Stack>

      <Dialog fullScreen open={open}>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <DialogActions
            sx={{
              zIndex: 9,
              padding: '12px !important',
              boxShadow: (theme) => theme.customShadows.z8,
            }}
          >
            <Tooltip title="Close">
              <IconButton color="inherit" onClick={onClose}>
                <Iconify icon={'eva:close-fill'} />
              </IconButton>
            </Tooltip>
          </DialogActions>
          <Box sx={{ flexGrow: 1, height: '100%', overflow: 'hidden' }}>
             <PDFViewer width="100%" height="100%" style={{ border: 'none' }}>
               <InvoicePDF invoice={order} /> 
            </PDFViewer>
          </Box>
        </Box>
      </Dialog>
    </>
  );
}
