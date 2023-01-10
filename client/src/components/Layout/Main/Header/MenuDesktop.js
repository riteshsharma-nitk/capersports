import * as React from 'react';
import PropTypes from 'prop-types';

import { Link as RouterLink, useLocation } from 'react-router-dom';
import {Badge, Link, useTheme } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';

import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { Stack } from '@mui/system';
import Searchbar from '../../Dashboard/Header/Searchbar';
import UserOptions from '../../Dashboard/UserOptions';
import Iconify from '../../../../helper/Iconify';
import { IconButtonAnimate } from '../../../../helper/animate';

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
  const { pathname } = useLocation();
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
  <>
  <Stack direction='row' alignItems='center'>
  { pages.map((page) => (
  <LinkStyle  key={page.name} underline='none' component={RouterLink} to={page.link}
  sx={{
    ...(isHome && { color: 'common.white' }),
    ...(isOffset && { color: 'text.primary' }),
    '&.active': {
      color: 'primary.main',
    },
  }}
  >
          {page.name}
        </LinkStyle> ))}


          <form onSubmit={searchSubmitHandler}>
          <Searchbar setKeyword={setKeyword}/>
          </form> 

         
         
          {isAuthenticated ? ( 
          <Link component={RouterLink} to="/cart">
            <IconButtonAnimate>
            <Badge badgeContent={cartItems.length} color="secondary">
             <Iconify icon={'ic:sharp-add-shopping-cart'} width={22} height={22}/>
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
         </>
  );
}

