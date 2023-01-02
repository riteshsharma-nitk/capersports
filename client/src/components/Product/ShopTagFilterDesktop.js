import { Box, Button, Chip, Divider, FormControlLabel, IconButton, Radio, RadioGroup, Rating, Stack, styled, Typography } from '@mui/material';
import React from 'react'
import { sentenceCase } from 'change-case';
import Iconify from '../../helper/Iconify';
import Scrollbar from '../../helper/Scrollbar';


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

export const FILTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];


export const FILTER_PRICE_OPTIONS = [
  { value: 'below', label: 'Below ₹500' },
  { value: 'between', label: 'Between ₹500 - ₹1000' },
  { value: 'above', label: 'Above ₹1000' },
];



function ShopTagFilterDesktop({setCategory}) {
  const [value, setValue] = React.useState('below');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className='sidebar_body'>
    <div className='sidebar'>
   
   <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
   <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton>
            <Iconify icon={'eva:close-fill'} width={20} height={20} />
          </IconButton>
        </Stack>
        <Divider/>

       
        <Stack spacing={3} sx={{ p: 3 }}>
        <Stack spacing={1}>

      <Typography variant="subtitle1">Category</Typography>

      { categories.map((category) => (
          <Typography key={category} variant='body2' onClick={()=>setCategory(category)}>{category}</Typography>
          ))}          
      </Stack>   


      <Stack spacing={1}>
              <Typography variant="subtitle1">Price</Typography>
      <RadioGroup
        value={value}
        onChange={handleChange}
      > 
      {FILTER_PRICE_OPTIONS.map((item) => (
        <FormControlLabel value={item.value} control={<Radio />} label={item.label} />
      ))}

    
      </RadioGroup>
            </Stack>


              <Stack spacing={1}>
              <Typography variant="subtitle1">Rating</Typography>


              <RadioGroup
        value={value}
        onChange={handleChange}
      > 
      {FILTER_RATING_OPTIONS.map((item, index) => (
        <FormControlLabel 
        key={item}
        value={item}
        control={
        <Radio 
        disableRipple
        color='default'
        icon={<Rating readOnly value={4-index}/>}
        checkedIcon={<Rating readOnly value={4-index}/>}
        sx={{
          '&:hover': { bgcolor: 'transparent' },
        }}
        />
      } label="& Up" 
      sx={{
        my: 0.5,
        borderRadius: 1,
        '&:hover': { opacity: 0.48 },
        
        
        

      }}
      />
      ))}
      </RadioGroup>
      </Stack>
      </Stack>
    
     
               
    </div>
    
    <Box sx={{ p: 2.5}}>
          <Button
            fullWidth
            size="large"
            type="submit"
            color="inherit"
            variant="outlined"
           
            startIcon={<Iconify icon={'ic:round-clear-all'} />}
          >
            Clear All
          </Button>
        </Box>
     
    </div>
  )
}

export default ShopTagFilterDesktop;