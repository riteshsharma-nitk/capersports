import React from 'react'

const categories = [
    'T-Shirts',
    'Hoodies',
    'Sweatshirts',
   ' Jackets',
    'Tracksuits',
    'Shorts',
    'Socks',
    'Trouser',
    'Cap',
    'Basketball Kit'
  ]
  
  const priceRange = [
    'Below ₹500',
    'Between ₹500 - ₹1000',
    'Above ₹1000'
  ]
  
  const rating = [
    '4',
    '3',
    '2',
    '1',
  ]
  
  const RootStyle = styled('div')({
      flexGrow: 1,
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
    });
    
    const WrapperStyle = styled('div')(({ theme }) => ({
      display: 'flex',
      overflow: 'hidden',
      alignItems: 'stretch',
      margin: theme.spacing(0.5),
      borderRadius: theme.shape.borderRadius,
      border: `solid 1px ${theme.palette.divider}`,
    }));
    
    const LabelStyle = styled((props) => <Typography component="span" variant="subtitle2" {...props} />)(({ theme }) => ({
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      color: theme.palette.text.secondary,
      backgroundColor: theme.palette.background.neutral,
      borderRight: `solid 1px ${theme.palette.divider}`,
    }));

function ShopTagFilterMobile() {
  return (
    <RootStyle>
        <Box display='flex' justifyContent='flex-end'>
            <IconButton onClick={() => setFilterOptionSmall(!filterOptionSmall)}>
                <CancelIcon style={{fontSize:'2rem', color:'black'}}/>
            </IconButton>
        </Box>

        <WrapperStyle>
      <LabelStyle>Category:</LabelStyle>
      <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
      { categories.map((category) => (
      <Typography key={category} onClick={() => setCategory(category)} variant='subtitle2'>{category}</Typography>
            ))}
      </Stack>   
      </WrapperStyle>


      {priceRange && (
        <WrapperStyle>
          <LabelStyle>Price:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={labelPriceRange(priceRange)} onDelete={onRemovePrice} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}

     {rating && (
        <WrapperStyle>
          <LabelStyle>Rating:</LabelStyle>
          <Stack direction="row" flexWrap="wrap" sx={{ p: 0.75 }}>
            <Chip size="small" label={sentenceCase(rating)} onDelete={onRemoveRating} sx={{ m: 0.5 }} />
          </Stack>
        </WrapperStyle>
      )}


     {isShowReset && (
        <Button color="error" size="small" onClick={onResetAll} startIcon={<Iconify icon={'ic:round-clear-all'} />}>
          Clear All
        </Button>
      )}
               
    </RootStyle>
  )
}

export default ShopTagFilterMobile