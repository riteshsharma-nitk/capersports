import { Box, Button, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Rating, Stack, Typography } from '@mui/material';
import React from 'react'
import Iconify from '../../helper/Iconify';
import { Controller, useFormContext } from 'react-hook-form';
import { RHFRadioGroup } from '../../helper/hook-form';
import PropTypes from 'prop-types';

const FILTER_CATEGORY_OPTIONS = [
  'T-Shirts',
  'Trouser',
  'Shorts',
  'Cap',
  'Hoodies',
  'Sweater',
  'Tracksuits',
  'Sweatshirts',
 ' Jackets',
  'Socks',
  'Basketball Kit'
]

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];


export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below ₹500' },
  { value: 'between', label: 'Between ₹500 - ₹1000' },
  { value: 'above', label: 'Above ₹1000' },
];

ProductFilter.propTypes = {
  isOpen: PropTypes.bool,
  onResetAll: PropTypes.func,
  onOpen: PropTypes.func,
};

function ProductFilter({isOpen, onResetAll, onOpen}) {
  const { control } = useFormContext();

  return (
    <div className='sidebar_body'>
    <div className='sidebar'>
   
   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
   <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onOpen}>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider/>

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack spacing={1}>
            <Typography variant="subtitle1">Category</Typography>
            <RHFRadioGroup name="category" options={FILTER_CATEGORY_OPTIONS} row={false} />
      </Stack>   


      <Stack spacing={1}>
              <Typography variant="subtitle1">Price</Typography>
              <RHFRadioGroup
                name="price"
                options={FILTER_PRICE_OPTIONS.map((item) => item.value)}
                getOptionLabel={FILTER_PRICE_OPTIONS.map((item) => item.label)}
              />
      </Stack>


              <Stack spacing={1}>
              <Typography variant="subtitle1">Rating</Typography>


            
              <Controller
                name="ratings"
                control={control}
                render={({ field }) => (
                  <RadioGroup {...field}>
                    {FILTER_RATING_OPTIONS.map((item, index) => (
                      <FormControlLabel
                        key={item}
                        value={item}
                        control={
                          <Radio
                            disableRipple
                            color="default"
                            icon={<Rating readOnly value={4 - index} />}
                            checkedIcon={<Rating readOnly value={4 - index} />}
                            sx={{
                              '&:hover': { bgcolor: 'transparent' },
                            }}
                          />
                        }
                        label="& Up"
                        sx={{
                          my: 0.5,
                          borderRadius: 1,
                          '&:hover': { opacity: 0.48 },
                          ...(field.value.includes(item) && {
                            bgcolor: 'action.selected',
                          }),
                        }}
                      />
                    ))}
                  </RadioGroup>
                )}
              />
      </Stack>
      </Stack>
    
     
               
    </div>
    
    <Box sx={{ p: 3 }}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
            onClick={onResetAll}
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            Clear All
          </Button>
          </Box>
     
    </div>
  )
}

export default ProductFilter;