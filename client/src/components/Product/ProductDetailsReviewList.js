import PropTypes from 'prop-types';
import { useState } from 'react';
import { Box, List, Rating, Avatar, ListItem, Pagination, Typography } from '@mui/material';
import Iconify from '../../helper/Iconify';
import { fDate } from '../../utils/formatTime';

ProductDetailsReviewList.propTypes = {
  product: PropTypes.object,
};

export default function ProductDetailsReviewList({ product }) {
  const { reviews } = product;

  return (
    <Box sx={{ pt: 3, px: 2, pb: 5 }}>
      <List disablePadding>
        {reviews?.map((review) => (
          <ReviewItem key={review?._id} review={review} />
        ))}
      </List>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Pagination 
        count={reviews?.length} color="primary" />
      </Box>
    </Box>
  );
}


ReviewItem.propTypes = {
  review: PropTypes.object,
};

function ReviewItem({ review }) {
  const [isHelpful, setHelpfuls] = useState(false);

  const { name, rating, comment, reviewCreatedAt, userAvatarUrl } = review;

  const handleClickHelpful = () => {
    setHelpfuls((prev) => !prev);
  };

  return (
    <>
      <ListItem
        disableGutters
        sx={{
          mb: 5,
          alignItems: 'flex-start',
          flexDirection: { xs: 'column', sm: 'row' },
        }}
      >
        <Box
          sx={{
            mr: 2,
            display: 'flex',
            alignItems: 'center',
            mb: { xs: 2, sm: 0 },
            minWidth: { xs: 160, md: 240 },
            textAlign: { sm: 'center' },
            flexDirection: { sm: 'column' },
          }}
        >
          <Avatar
            src={userAvatarUrl}
            sx={{
              mr: { xs: 2, sm: 0 },
              mb: { sm: 2 },
              width: { md: 64 },
              height: { md: 64 },
            }}
          />
          <div>
            <Typography variant="subtitle2" noWrap>
              {name}
            </Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }} noWrap>
              {fDate(reviewCreatedAt)}
            </Typography>
          </div>
        </Box>

        <div>
          <Rating size="small" value={rating} precision={0.1} readOnly />

          {true && (
            <Typography
              variant="caption"
              sx={{
                my: 1,
                display: 'flex',
                alignItems: 'center',
                color: 'primary.main',
              }}
            >
              <Iconify icon={'ic:round-verified'} width={16} height={16} />
              &nbsp;Verified purchase
            </Typography>
          )}

          <Typography variant="body2">{comment}</Typography>

        </div>
      </ListItem>
    </>
  );
}
