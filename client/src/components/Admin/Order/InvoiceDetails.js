import PropTypes from 'prop-types'
import { styled, useTheme } from '@mui/material/styles';
import { Box, Card, Grid, Table, Divider, TableRow, TableBody, TableHead, TableCell, Typography, TableContainer, Stack } from '@mui/material';
import Label from '../../../helper/Label';
import Scrollbar from '../../../helper/Scrollbar';
import InvoiceToolbar from './InvoiceToolbar';
import { fDate } from '../../../utils/formatTime';
import Logo from '../../../helper/Logo';

const RowResultStyle = styled(TableRow)(({ theme }) => ({
  '& td': {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

InvoiceDetails.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default function InvoiceDetails({ invoice, setEdit, edit }) {
  const theme = useTheme();

  if (!invoice) {
    return null;
  }

  const { orderItems, orderStatus, shippingInfo, createdAt, itemsPrice, _id, totalPrice} = invoice;
  

  return (
    <>
      <InvoiceToolbar order={invoice} edit = {edit} setEdit = {setEdit} />
      <Card sx={{ pt: 5, px: 5 }}>
        <Grid container>
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Stack alignItems='center' direction='row' spacing={1}>
            <Logo/>
            <Typography variant='h5'>CAPER SPORTS</Typography>
            </Stack>
          </Grid>
          
          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Box sx={{ textAlign: { sm: 'right' } }}>
              <Label
                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                color={
                  (orderStatus === 'paid' && 'success') ||
                  (orderStatus === 'unpaid' && 'warning') ||
                  (orderStatus === 'overdue' && 'error') ||
                  'default'
                }
                sx={{ textTransform: 'uppercase', mb: 1 }}
              >
                {orderStatus}
              </Label>

              <Typography variant="h6">{_id}</Typography>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice from
            </Typography>
            <Typography variant="body2">{"Avinash Sharma"}</Typography>
            <Typography variant="body2">{"SH-47, Sector 141, Noida,"}</Typography>
            <Typography variant='body2'>{"Gautam Buddha Nagar, Uttar Pradesh, 201305"}</Typography>
            <Typography variant="body2">Phone: {"9999557455"}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice to
            </Typography>
            <Typography variant="body2">{shippingInfo?.address}</Typography>
            <Typography variant="body2">Phone: {shippingInfo?.phoneNo}</Typography>
          </Grid>

          <Grid item xs={12} sm={6} sx={{ mb: 5 }}>
            <Typography paragraph variant="overline" sx={{ color: 'text.disabled' }}>
              Invoice Date
            </Typography>
          <Typography variant="body2">{createdAt && fDate(createdAt)}</Typography>
          </Grid>
        </Grid>

        <Scrollbar>
        <TableContainer sx={{ minWidth: 960 }}>

        </TableContainer>
        <Table>
        <TableHead
                sx={{
                  borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                  '& th': { backgroundColor: 'transparent' },
                }}
              >
                <TableRow>
                  <TableCell align='left'>Item #</TableCell>
                  <TableCell align="left">Description</TableCell>
                  <TableCell align="left">HSN/SAC Code</TableCell>
                  <TableCell align="left">Qty</TableCell>
                  <TableCell align="right">Unit price</TableCell>
                  <TableCell align="right">Discount</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>

              {orderItems && orderItems.map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
                    }}
                  >
                    <TableCell>{index + 1}</TableCell>
                    <TableCell align="left">
                      <Box sx={{ maxWidth: 560 }}>
                        <Typography variant="subtitle2">{row.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell align='left'>6211</TableCell>
                    <TableCell align="left">{row.quantity}</TableCell>
                    <TableCell align="right">{`₹${(row.price)}`}</TableCell>
                    <TableCell align="right"></TableCell>
                    <TableCell align="right">{`₹${(row.price * row.quantity)}`}</TableCell>
                  </TableRow>
                ))}

                 <RowResultStyle>
                  <TableCell colSpan={5} />
                  <TableCell align="right">
                    <Box sx={{ mt: 2 }} />
                    <Typography>Invoice Subtotal</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Box sx={{ mt: 2 }} />
                    <Typography>{`₹${(itemsPrice)}`}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={5} />
                  <TableCell align="right">
                    <Typography>Discount</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography sx={{ color: 'error.main' }}>{0}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={5} />
                  <TableCell align="right">
                    <Typography>IGST(0.00%)</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{0}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={5} />
                  <TableCell align="right">
                    <Typography>CGST(2.50%)</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                    <Typography>{itemsPrice && `₹${(itemsPrice)*0.025}`}</Typography>
                  </TableCell>
                </RowResultStyle>

                <RowResultStyle>
                  <TableCell colSpan={5} />
                  <TableCell align="right">
                    <Typography>SGST(2.50%)</Typography>
                  </TableCell>
                  <TableCell align="right" width={120}>
                  <Typography>{itemsPrice && `₹${(itemsPrice)*0.025}`}</Typography>
                  </TableCell>
                </RowResultStyle>

              

                <RowResultStyle>
                  <TableCell colSpan={5} />
                  <TableCell align="right">
                    <Typography variant="h6">Total</Typography>
                  </TableCell>
                  <TableCell align="right" width={140}>
                    <Typography variant="h6">{`₹${(totalPrice)}`}</Typography>
                  </TableCell>
                </RowResultStyle>
              </TableBody>
        </Table>
      </Scrollbar>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={6} sx={{ py: 3 }}>
            <Typography variant="body2">Caper Sports</Typography>
            <Typography variant='body2'>Canara Bank</Typography>
            <Typography variant='body2'>A/c no. - 5549201000080</Typography>
            <Typography variant='body2'>IFSC - CNRB0005549</Typography>
            <Typography variant='body2'>Sector 45, Noida</Typography>
            <Typography variant='body2'>Uttar Pradesh - 201303</Typography>
            <Typography variant='body2'>Make all cheque payable to CAPER SPORTS.</Typography>
          </Grid>

          <Grid item xs={12} md={6} sx={{ py: 3 }}>
          <Typography variant="h6">Thank you for your business!</Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 5 }} />

        <Grid container>
          <Grid item xs={12} md={9} sx={{ py: 3 }}>
            <Typography variant="subtitle2">TERMS & CONDITION:</Typography>
            <Typography variant="body2">
            • Certified that the particular given above are correct and amount indicated is
            representative of of the price actually charged and that there is no flow of 
            additional consideration directly or indirectly from the buyer.
            </Typography>
            <Typography variant='body2'>• Goods once sold will not be taken back.</Typography>
            <Typography variant='body2'>• Interest will be charged @ 18% per annum if the payment is not made on the due date.</Typography>
            <Typography variant='body2'>• All disputes subject to Uttar Pradesh Jurisdiction only.</Typography>

          </Grid>
          <Grid item xs={12} md={3} sx={{ py: 3, textAlign: 'right' }}>
            <Typography variant="subtitle2">Have a Question?</Typography>
            <Typography variant="body2">capersports.in@gmail.com</Typography>
          </Grid>
        </Grid>  
      </Card>
    </>
  );
}
