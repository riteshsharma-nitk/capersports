import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { Link as RouterLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import logo from '../../images/logo.png'
import {Badge, Link, ListItem, StyledEngineProvider, useTheme } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import UserOptions from './UserOptions';
import { useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import { Grid, Box } from '@mui/material';

const pages = ['Cricket', 'Football','Products', 'Contact', 'About'];

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: 25,
  backgroundColor: alpha(theme.palette.common.black, 0.05),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.10),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '10ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

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

const ListItemStyle = styled(ListItem)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 0,
  marginTop: theme.spacing(3),
  color: theme.palette.text.secondary,
  transition: theme.transitions.create('color'),
  '&:hover': {
    color: theme.palette.text.primary,
  },
}));

export default function Desktop() {
  const theme = useTheme();
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
    <AppBar style={{ background: '#ffffff', color:'black', boxShadow:'none', zIndex: theme.zIndex.drawer + 1 }} position="relative">
      <Toolbar sx={{p:0.5}}> 
       <Grid container>
        <Grid item md={4} display='flex' justifyContent='flex-start' alignItems='center'>
        <Link underline='none' component={RouterLink} to="/">
         <Box component='img' src={logo}  sx={{height:50}}></Box>
        </Link>
       </Grid> 

      <Grid item md={4} display="flex" justifyContent="center" alignItems='center'>
        {pages.map((page) => (
        <LinkStyle  key={page} underline='none' component={RouterLink} to={(`/${page}`).toLowerCase()}>
          {page}
        </LinkStyle> ))}
      </Grid>


      <Grid item md={4} display='flex' justifyContent="flex-end" alignItems='center'>
          <form onSubmit={searchSubmitHandler}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange = {(e) => setKeyword(e.target.value)}
            />
          </Search>
          </form>
         
  
          {isAuthenticated ? ( 
          <Link component={RouterLink} to="/cart">
            <IconButton>
            <StyledBadge badgeContent={cartItems.length} color="secondary">
              <LocalMallIcon style={{fontSize:"1.5rem", color:'#0097a7'}}/>
            </StyledBadge>
            </IconButton>
          </Link>):(<></>)}
          
          {!isAuthenticated ? ( 
          <Link component={RouterLink} to="/login">
            <IconButton>
              <PermIdentityIcon style={{fontSize:"1.5rem", color:'#00796b'}}/>
            </IconButton>
           </Link>):(<UserOptions user={user}/>)}
         </Grid>
         </Grid>
        </Toolbar>
    </AppBar>   
  );
}

