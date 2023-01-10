import PropTypes from 'prop-types';

import * as React from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';

import { useDispatch } from "react-redux";
import { logout } from "../../../../actions/userAction"
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import {Badge, Box, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Collapse, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import Searchbar from '../../Dashboard/Header/Searchbar';
import Iconify from '../../../../helper/Iconify';
import { IconButtonAnimate } from '../../../../helper/animate';
import { NAVBAR } from '../../../../config';
import Scrollbar from '../../../../helper/Scrollbar';
import Logo from '../../../../helper/Logo';

const ListItemStyle = styled(ListItemButton)(({ theme }) => ({
  ...theme.typography.body2,
  height: NAVBAR.DASHBOARD_ITEM_ROOT_HEIGHT,
  textTransform: 'capitalize',
  color: theme.palette.text.secondary,
}));


  const drawerWidth = 240;

 
  
  MenuMobile.propTypes = {
    isOffset: PropTypes.bool,
    isHome: PropTypes.bool,
   
  };
  

  export default function MenuMobile({isOffset, isHome}) {
  const theme = useTheme();

  const dispatch = useDispatch();
  const Navigate=useNavigate()

  const [openUserMenu, setOpenUserMenu] = React.useState(false);
  const [openMenu, setOpenMenu] = React.useState(false);
  const [keyword, setKeyword] = React.useState("");

  const { isAuthenticated, user } = useSelector((state) => state.user);

  const toggleDrawer = () => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setOpenMenu(!openMenu);
  };


    const { cartItems } = useSelector((state) => state.cart);
    
    const searchSubmitHandler = (e) => {
      e.preventDefault();
      if(keyword.trim()){
        Navigate(`/products/${keyword}`);
    }else{
     
      Navigate("/products");
    }
  }


  const options = [
    { icon: <Iconify icon={'tabler:file-invoice'} width={22} height={22}/>, name: "Orders", func: orders },
    { icon: <Iconify icon={'iconoir:profile-circled'} width={22} height={22}/>, name: "Profile", func: account },
    { icon: <Iconify icon={'heroicons-outline:logout'} width={22} height={22}/>, name: "Logout", func: logoutUser },
];

const generalOptions = [
  { icon: <Iconify icon={'material-symbols:home-app-logo'} width={22} height={22}/>, name: "Home", link: '/' },
  { icon: <Iconify icon={'dashicons:products'} width={22} height={22}/>, name: "Products", link: '/products' },
  { icon: <Iconify icon={'material-symbols:contact-page-outline'} width={22} height={22}/>, name: "Contact", link: '/contact-us' },
  { icon: <Iconify icon={'mdi:about-circle-outline'} width={22} height={22}/>, name: "About", link: '/about-us' },

];

if (user?.role === "admin") {
    options.unshift({
      icon: <Iconify icon={'ic:round-dashboard'}  width={22} height={22}/>,
      name: "Dashboard",
      func: dashboard,
    });
  }
  
  function dashboard() {
    Navigate("/admin/dashboard");
  }

  function orders() {
    Navigate("/orders");
  }
  function account() {
    Navigate("/account");
  }
  function cart() {
    Navigate("/cart");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }



  const list = () => (
    <>

  
    {!isAuthenticated ? (
      <ListItemStyle to='/login' component={RouterLink} sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}>
          <ListItemIcon><Iconify icon={'ic:baseline-login'} width={22} height={22}/></ListItemIcon>
          <ListItemText disableTypography primary='Login'/>
      </ListItemStyle>
      
    ) :(
      <ListItemStyle 
      sx={{
        '&.active': {
          color: 'primary.main',
          fontWeight: 'fontWeightMedium',
          bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
        },
      }}>
      <ListItemButton onClick={() => setOpenUserMenu(!openUserMenu)}>
       <ListItemIcon>
            <Avatar sx={{width:22, height:22}} alt="Avatar Preview" src={user.avatar.url}>{(user.name).substr(0,1)}</Avatar>
       </ListItemIcon>
        <ListItemText disableTypography primary={`Hi, ${(user.name).split(' ')[0]}`}/>
       </ListItemButton>
      </ListItemStyle>
    )}
    
    <Collapse in={openMenu && openUserMenu} timeout="auto" unmountOnExit>
        <List>{
            options.map((item) => (
              <ListItemStyle key={item.name}>
                <ListItemButton onClick={item.func} sx={{pl:4}}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText disableTypography primary={item.name} />
                </ListItemButton>
              </ListItemStyle>
              
            ))
          }
        </List>
      </Collapse>


    <Divider/>
    
    <List>{
      generalOptions.map((item) => (
        <ListItemStyle key={item.name} to={item.link} component={RouterLink}>
            <ListItemIcon>
             {item.icon}
            </ListItemIcon>
            <ListItemText disableTypography primary={item.name} />
        </ListItemStyle>

      ))
      }
     
       
     
      </List>
      <Divider/> 
    </>
  );

  return (
          <>
          
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
          
          <IconButtonAnimate
        onClick={toggleDrawer()}
        sx={{
          ml: 1,
          ...(isHome && { color: 'common.white' }),
          ...(isOffset && { color: 'text.primary' }),
        }}
      >
        <Iconify icon={'eva:menu-2-fill'} />
      </IconButtonAnimate>


           <Drawer
           anchor='left'
            open={openMenu}
            ModalProps={{ keepMounted: true }}
            onClose={toggleDrawer()} 
            PaperProps={{ sx: { pb: 5, width: 260 } }}

          >
            <Scrollbar>
          <Logo sx={{ mx: 2.5, my: 3 }} />
          <List disablePadding>

            {list()}
            </List>
            </Scrollbar>
          </Drawer>
          </>
   
  );
}

