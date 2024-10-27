import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Grid, Rating, Button, Typography, LinearProgress, Stack, Link } from '@mui/material';
import { fShortenNumber } from '../../utils/formatNumber';
import Iconify from '../../helper/Iconify';

const RatingStyle = styled(Rating)(({ theme }) => ({
  marginBottom: theme.spacing(1),
}));

const GridStyle = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:nth-of-type(2)': {
    [theme.breakpoints.up('md')]: {
      borderLeft: `solid 1px ${theme.palette.divider}`,
      borderRight: `solid 1px ${theme.palette.divider}`,
    },
  },
}));

// ----------------------------------------------------------------------

ProductDetailsReviewOverview.propTypes = {
  product: PropTypes.object,
  submitReviewToggle: PropTypes.func,
};

export default function ProductDetailsReviewOverview({ product, submitReviewToggle }) {

  var star = [0, 0, 0, 0, 0]
  product?.reviews?.forEach((ratings) => {
    star[ratings?.rating - 1] += 1;
  })

  return (
    <Grid container>
      <GridStyle item xs={12} md={4}>
        <Typography variant="subtitle1" gutterBottom>
          Average rating
        </Typography>
        <Typography variant="h2" gutterBottom sx={{ color: 'error.main' }}>
          {product?.ratings}
        </Typography>
        <RatingStyle readOnly value={product?.ratings} precision={0.1} />
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          ({fShortenNumber(product?.numOfReviews)}
          &nbsp;reviews)
        </Typography>
      </GridStyle>

      <GridStyle item xs={12} md={4}>

      <Stack spacing={1.5} sx={{ width: 1 }}>
          {star
            .slice(0)
            .reverse()
            .map((rating, index) => (
              <ProgressItem key={index}  star={index} rate = {rating} total={product?.numOfReviews} />
            ))}
        </Stack>
       
      </GridStyle>

      <GridStyle item xs={12} md={4}>
        <Link href="#move_add_review" underline="none">
          <Button onClick={submitReviewToggle} size="large" variant="outlined" startIcon={<Iconify icon={'eva:edit-2-fill'} />}>
            Write your review
          </Button>
        </Link>
      </GridStyle>
    </Grid>
  );
}

// ----------------------------------------------------------------------

function ProgressItem({ star, total, rate}) {
  return (
    <Stack direction="row" alignItems="center" spacing={1.5}>
      <Typography variant="subtitle2">{`${5-star} Star`}</Typography>
      <LinearProgress
        variant="determinate"
        value={(rate / total) * 100}
        sx={{
          mx: 2,
          flexGrow: 1,
          bgcolor: 'divider',
        }}
      />
      <Typography variant="body2" sx={{ color: 'text.secondary', minWidth: 64, textAlign: 'right' }}>
        {fShortenNumber(rate)}
      </Typography>
    </Stack>
  );
}
