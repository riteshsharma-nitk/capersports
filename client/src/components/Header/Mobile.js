import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled, useTheme, alpha } from '@mui/material/styles';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import InventoryIcon from '@mui/icons-material/Inventory';
import InfoIcon from '@mui/icons-material/Info';
import { useDispatch } from "react-redux";
import PermContactCalendarIcon from '@mui/icons-material/PermContactCalendar';
import { logout } from "../../actions/userAction"
import MenuIcon from '@mui/icons-material/Menu';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import logo from '../../images/logo.png'
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import {Link as RouterLink, useNavigate} from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {Badge, Box, Divider, Drawer, Link, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Avatar, Collapse, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { Logout } from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.black, 0.05),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.black, 0.10),
    },
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
   
    width: '100%',
    [theme.breakpoints.up('xs')]: {
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
      padding: theme.spacing(0.5, 0.5, 0.5, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('xs')]: {
        width: '10ch',
        '&:focus': {
          width: '14ch',
        },
      },
    },
  }));

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }));
  


function Mobile() {
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
    { icon: <ListAltIcon style={{fontSize:"1.5rem", color:'#0097a7'}}/>, name: "Orders", func: orders },
    { icon: <PersonIcon style={{fontSize:"1.5rem", color:'#0288d1'}} />, name: "Profile", func: account },
    { icon: <Logout style={{fontSize:"1.5rem", color:'#388e3c'}} />, name: "Logout", func: logoutUser },
];

if (user?.role === "admin") {
    options.unshift({
      icon: <DashboardIcon style={{fontSize:"1.5rem", color:'#00796b'}} />,
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
    <Box  sx={{ width : 200, mt:6 }}role="presentation">

    <List>
    {!isAuthenticated ? (
      <ListItem disablePadding sx={{display:'block'}}>
        <Link underline='none' color='black' component={RouterLink} to="/login">
          <ListItemButton sx={{borderRadius:2, backgroundColor:'#e0f2f1', m:1}}>
          <ListItemIcon>
            <PermIdentityIcon style={{fontSize:"1.5rem", color:'#00796b'}}/>
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary='Login'></ListItemText>
          </ListItemButton>
        </Link>
      </ListItem>
      
    ) :(
      <ListItem disablePadding sx={{display:'block'}}>
      <ListItemButton sx={{borderRadius:2, backgroundColor:'#e0f2f1', m:1}} onClick={() => setOpenUserMenu(!openUserMenu)}>
       <ListItemIcon>
            <Avatar alt="Avatar Preview" src={user.avatar.url}>{(user.name).substr(0,1)}</Avatar>
       </ListItemIcon>
        <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary={`Hi, ${(user.name).split(' ')[0]}`}></ListItemText>
       </ListItemButton>
      </ListItem>
    )}
    
    <Collapse in={openMenu && openUserMenu} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>{
            options.map((item) => (
              <ListItem disablePadding sx={{display:'block'}} key={item.name}>
                <ListItemButton onClick={item.func} sx={{pl:7}}>
                <ListItemIcon sx={{minWidth: 0, mr: openMenu ? 2 : 'auto'}}>{item.icon}</ListItemIcon>
                <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary={item.name} sx={{color:'black' }} />
                </ListItemButton>
              </ListItem>
              
            ))
          }
        </List>
      </Collapse>
    </List>

    <Divider/>
    
    <List>
      <ListItem disablePadding sx={{display:'block'}}>
          <Link underline='none' component={RouterLink} to="/">
            <ListItemButton sx={{color:'black', pl:4}}>
              <ListItemIcon sx={{ minWidth: 0, mr: 2, justifyContent: 'center'}}>
               <HomeIcon style={{fontSize:"1.5rem", color:'#e65100'}}/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Home" />
            </ListItemButton>
          </Link>
      </ListItem>
      
      <ListItem disablePadding sx={{display:'block'}}>
          <Link underline='none' component={RouterLink} to="/products">
            <ListItemButton sx={{ color:'black', pl:4 }}>
              <ListItemIcon sx={{ minWidth: 0, mr:  2, justifyContent: 'center'}}>
               <InventoryIcon style={{fontSize:"1.5rem", color:'#795548'}}/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Products" />
            </ListItemButton>
          </Link>
      </ListItem>

      <ListItem disablePadding sx={{display:'block'}}>
        <Link underline='none' component={RouterLink} to="/contact">
          <ListItemButton sx={{ color:'black', pl:4 }}>
            <ListItemIcon sx={{ minWidth: 0, mr:  2, justifyContent: 'center'}}>
               <PermContactCalendarIcon style={{fontSize:"1.5rem", color:'#8bc34a'}}/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="Contact" />
            </ListItemButton>
          </Link>
        </ListItem>

        <ListItem disablePadding sx={{display:'block'}}>
          <Link underline='none' component={RouterLink} to="/about">
            <ListItemButton sx={{ color:'black',  pl:4 }}>
              <ListItemIcon sx={{ minWidth: 0, mr:  2, justifyContent: 'center'}}>
               <InfoIcon style={{fontSize:"1.5rem", color:'#546e7a'}}/>
              </ListItemIcon>
              <ListItemText primaryTypographyProps={{fontSize:'1rem'}} primary="About" />
            </ListItemButton>
            </Link>
          </ListItem>
     
      </List>
      <Divider/> 
    </Box>
  );

  return (
          <>
          

        <form onSubmit={searchSubmitHandler}>
            <Search>
                <SearchIconWrapper>
                    <SearchIcon fontSize='medium'/>
                    </SearchIconWrapper>
                    <StyledInputBase
                    fontSize='medium'
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
              />
          </Search>
          </form>

          {isAuthenticated ? ( 
          <Link component={RouterLink} to="/cart">
            <IconButton>
            <Badge badgeContent={cartItems.length} color="secondary">
              <LocalMallIcon style={{fontSize:"20"}}/>
            </Badge>
            </IconButton>
          </Link>):(<></>)}
          
           <IconButton onClick={toggleDrawer()}>
            <MenuIcon/>
           </IconButton>

           <Drawer
           anchor='right'
            open={openMenu}
            onClose={toggleDrawer()} 
          >
            {list()}
          </Drawer>
          </>
   
  );
}
export default Mobile;
