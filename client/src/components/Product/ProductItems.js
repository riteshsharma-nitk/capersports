import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, Grid, Box, Stack } from '@mui/material';
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
          <Typography variant='subtitle2'> {product.name} </Typography>
          <Stack direction="row" alignItems="center" justifyContent="space-between">

          <Typography variant='subtitle2' color='text.secondary'>{product.category}</Typography>
          <Stack direction="row" spacing={0.5}>
          <Typography sx={{fontSize:'1rem', color:'black'}} fontWeight={500}>{`MRP : ₹ ${product.price}`}</Typography>
          </Stack>
          </Stack>
          </Stack>
       
     </Link>
    </Card>
  )
}

export default ProductItems;