import * as React from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import {Badge, Box, Link } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { Stack } from '@mui/system';
import Searchbar from '../../Dashboard/Header/Searchbar';
import UserOptions from '../../Dashboard/UserOptions';
import Iconify from '../../../../helper/Iconify';
import { IconButtonAnimate } from '../../../../helper/animate';
import Logo from '../../../../helper/Logo';

const pages = [
  { name:'Home',     link:'/' },
  { name:'Cricket',  link:'/cricket-products' },
  { name:'Football', link:'/football-products' },
  { name:'Products', link:'/products' },
  { name:'Contact', link:'contact-us'}
];
const LinkStyle = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle1,
  color: theme.palette.text.primary,
  marginRight: theme.spacing(5),
  justifyContent: "center",
  marginTop:12,
  transition: theme.transitions.create('opacity', {
    duration: theme.transitions.duration.shorter,
  }),
  '&:hover': {
    opacity: 0.48,
    textDecoration: 'none',
  },
}));




MenuDesktop.propTypes = {
  isHome: PropTypes.bool,
  isOffset: PropTypes.bool,
};

export default function MenuDesktop({isOffset, isHome}) {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [keyword, setKeyword] = React.useState("");
  const navigate=useNavigate()

  const { cartItems } = useSelector((state) => state.cart);
  
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()){
      navigate(`/products/${keyword}`);
  }else{
   
    navigate("/products");
  }
}

  return (
    <div style={{ width: '100%' }}>
  <Box sx={{
    display: 'flex',
    justifyContent: 'space-between',
         
  }}>
  <Stack direction='row' alignItems='flex-start' width='50%'>
  { pages.map((page) => (
  <LinkStyle  key={page.name} underline='none' component={RouterLink} to={page.link}
  sx={{
    ...(isHome && { color: 'text.primary' }),
    ...(isOffset && { color: 'text.primary' }),
    '&.active': {
      color: 'primary.main',
      
    },
  }}
  >
          {page.name}
        </LinkStyle> ))}
        </Stack>
<Stack alignContent='center' width='30%'>
<Logo/>
</Stack >
<Stack direction="row-reverse" alignItems='flex-end' width='25%'>
          <form onSubmit={searchSubmitHandler}>
          <Searchbar setKeyword={setKeyword}/>
          </form> 

         
         
          {isAuthenticated ? ( 
          <Link component={RouterLink} to="/cart">
            <IconButtonAnimate>
            <Badge badgeContent={cartItems.length} color="secondary">
             <Iconify icon={'ic:sharp-add-shopping-cart'} width={24} height={24}/>
            </Badge>
            </IconButtonAnimate>

          </Link>):(<></>)}
          
          {!isAuthenticated ? ( 
          <Link component={RouterLink} to="/login">
              <IconButtonAnimate>
              <Iconify icon={'mdi:user'}width={24} height={24}/>
              </IconButtonAnimate>

           </Link>):(<UserOptions user={user}/>)}
           </Stack>
          
         </Box>
         </div>
  );
}

