import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {Box, Link, Stack} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Fragment } from 'react';
import Image from '../../helper/Image';


const ProductCard = ({product, loading}) => {
    return (
      <Fragment>
        {!loading &&
         <Card sx={{ m:1, textAlign:'left'}}>
         <Link color='inherit' underline='none' component={RouterLink} to={`/product/${product._id}`}>
         <Box sx={{ position: 'relative', backgroundColor:'#eeeeee', m:1, borderRadius:1}}>
         <Image alt='product images' src={product?.images[0]?.url} ratio="1/1" />
         </Box>
   
         <Stack spacing={2} sx={{ p: 3 }}>
             <Typography variant='subtitle2' noWrap> {product.name} </Typography>
             <Stack direction="row" alignItems="center" justifyContent="space-between">
   
             <Typography variant='subtitle2' color='text.secondary'>{product.category}</Typography>
             <Stack direction="row" spacing={0.5}>
             <Typography sx={{fontSize:'1rem', color:'black'}} fontWeight={500}>{`MRP : ₹ ${product.price}`}</Typography>
             </Stack>
             </Stack>
             </Stack>
          
        </Link>
       </Card>}
      </Fragment>
      
  )
}
export default ProductCard;