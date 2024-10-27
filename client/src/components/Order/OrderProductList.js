import PropTypes from 'prop-types';
import {
  Box,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';
import Image from '../../helper/Image';

OrderProductList.propTypes = {
  products: PropTypes.array.isRequired,
};

export default function OrderProductList({ products }) {
  return (
    <TableContainer sx={{ minWidth: 720 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="left">Price</TableCell>
            <TableCell align="left">Quantity</TableCell>
            <TableCell align="right">Total Price</TableCell>
            <TableCell align="right" />
          </TableRow>
        </TableHead>

        <TableBody>
          {products && products.map((cartItem) => {
            const { _id, name, price, image, quantity } = cartItem;
            return (
              <TableRow key={_id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image alt="product image" src={image} sx={{ width: 64, height: 64, borderRadius: 1.5, mr: 2 }} />
                    <Box>
                      <Typography noWrap variant="subtitle2" sx={{ maxWidth: 240 }}>
                        {name}
                      </Typography>

                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                      </Box>
                    </Box>
                  </Box>
                </TableCell>



                <TableCell align="left">{`₹${price}`}</TableCell>

                <TableCell align="left">
                  {quantity}
                </TableCell>

                <TableCell align="right">{`₹${(price * quantity)}`}</TableCell>

               
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}



