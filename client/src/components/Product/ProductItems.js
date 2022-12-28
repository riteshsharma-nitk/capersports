import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Link, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ProductItems = ({product, loading}) => {
  return (
  <Grid item xs={6} md={4}>
    {!loading && <Card sx={{ m:1}}>
      <Link underline='none' component={RouterLink} to={`/product/${product._id}`}>
        <CardMedia  sx={{ backgroundColor:'#eeeeee' }} component="img" image={product?.images[0]?.url} alt="product photo"/>
        <CardContent>
          <Typography fontWeight={500} sx={{fontSize:'1rem', color:'black'}}> {product.name} </Typography>
          <Typography sx={{fontSize:'1rem'}} color="text.secondary"  fontWeight={500}>{product.category}</Typography>
          <br></br>
          <Typography sx={{fontSize:'1rem', color:'black'}} fontWeight={500}>{`MRP : ₹ ${product.price}`}</Typography>
        </CardContent> 
     </Link>
    </Card>}
</Grid>
  )
}

export default ProductItems;