import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { Link, Box, Stack } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Image from '../../helper/Image';

const ProductItems = ({product, loading}) => {
  return (
    <Card sx={{ m:1}}>
      <Link color='inherit' underline='none' component={RouterLink} to={`/product/${product._id}`}>
      <Box sx={{ position: 'relative', backgroundColor:'#eeeeee', m:1, borderRadius:1}}>
      <Image alt='product images' src={product?.images[0]?.url} ratio="1/1" />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
          <Typography variant='subtitle1' noWrap> {product.name} </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">

          <Typography variant='subtitle1' color='text.secondary'>{product.category}</Typography>
          <Stack direction="row" spacing={0.5}>
          <Typography variant="subtitle1">MRP : </Typography>
          {product?.priceSale?(
          <>
          <Typography variant='subtitle1'>{`₹${product?.priceSale}`}</Typography> 
          <Typography variant="subtitle1" sx={{ color: 'text.disabled', textDecoration:'line-through'}}>{` ₹${product?.price}`}</Typography>
          </>
          ):
          <Typography variant="subtitle1">{`₹${product?.price}`}</Typography>
          }
          </Stack>
          </Stack>
          </Stack>
       
     </Link>
    </Card>
  )
}

export default ProductItems;