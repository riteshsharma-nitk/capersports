import { Box, Collapse, Typography } from '@mui/material'
import {Link} from '@mui/material'
import {Link as RouterLink} from 'react-router-dom'
import DashboardIcon from '@mui/icons-material/Dashboard';
import React from 'react'
import AddBoxRoundedIcon from '@mui/icons-material/AddBoxRounded';
import PostAddIcon from '@mui/icons-material/PostAdd';
import AddIcon from '@mui/icons-material/Add';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';
import CancelIcon from '@mui/icons-material/Cancel';
import { styled, useTheme } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import InventoryIcon from '@mui/icons-material/Inventory';


const drawerWidth = 200;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));


const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);


function Sidebar() {

  const [open, setOpen] = React.useState(false);
  const [openProductDrawer, setOpenProductDrawer] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };


  return (
  
  <Box  sx={{display:'flex'}}>
    <Drawer sx={{"& .MuiDrawer-paper": { borderWidth: 0 }}} variant="permanent" open={open} >
      <DrawerHeader></DrawerHeader>
    
     



    <List>
   { open ? <></> :
    <ListItem disablePadding sx={{display:'block'}}>
      <ListItemButton onClick={handleDrawer}>
      <ListItemIcon  sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}>
       <DashboardIcon style={{fontSize:"1.5rem", color:'#00796b'}}/>
       </ListItemIcon>
       </ListItemButton>
       </ListItem>
       }

       { open && 
       
       <ListItem disablePadding sx={{display:'block'}}>
       <ListItemButton sx={{borderRadius:2, backgroundColor:'#e0f2f1', ml:1, mr:1}} onClick={handleDrawer}>
       <ListItemIcon  sx={{
           minWidth: 0,
           mr: open ? 3 : 'auto',
           justifyContent: 'center',
         }}>
       <DashboardIcon style={{fontSize:"1.5rem", color:'#00796b'}}/>
       </ListItemIcon>
       <ListItemText primaryTypographyProps={{fontWeight:'bold'}} primary="Dashboard" sx={{ color:'#00796b', opacity: open ? 1 : 0 }} />
       </ListItemButton>
       </ListItem>
              
         }
   


    


     
     
            <ListItem disablePadding sx={{display:'block'}}>
            <Link  underline='none' component={RouterLink} to="/admin/products">
            <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
         <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}>
          <InventoryIcon sx={{fontSize:'1.25rem'}}/>         
        </ListItemIcon>
         <ListItemText primary="Products" sx={{color:'black', opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </Link>
      </ListItem>


      <ListItem disablePadding sx={{display:'block'}}>
      <Link underline='none' component={RouterLink} to="/admin/product">
        <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
         <ListItemIcon
           sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}>
 <AddBoxRoundedIcon style={{fontSize:"1.25rem"}}/>         
</ListItemIcon>
         <ListItemText primary="Add Product" sx={{color:'black', opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </Link>
      </ListItem>
       


     


        <ListItem disablePadding sx={{display:'block'}}>
        <Link underline='none' component={RouterLink} to="/admin/orders">
        <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
         <ListItemIcon
         sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}>
          <ListAltIcon sx={{fontSize:'1.25rem'}}/>
         </ListItemIcon>
         <ListItemText primary="Orders" sx={{color:'black', opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </Link>
      </ListItem>

      <ListItem disablePadding sx={{display:'block'}}>
      <Link  underline='none' component={RouterLink} to="/admin/users">
        <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                  

         <ListItemIcon
         sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}>
          
          <PeopleIcon style={{fontSize:"1.5rem"}}/>
         </ListItemIcon>
         <ListItemText primary="Users" sx={{color:'black', opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </Link>
      </ListItem>

      <ListItem disablePadding sx={{display:'block'}}>
      <Link underline='none' component={RouterLink} to="/admin/reviews">
        <ListItemButton sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}>
                  

         <ListItemIcon
         sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}>
          
          <RateReviewIcon style={{fontSize:'1.5rem'}}/>
         </ListItemIcon>
         <ListItemText primary="Reviews" sx={{color:'black', opacity: open ? 1 : 0 }} />
        </ListItemButton>
        </Link>
      </ListItem>

     </List>
     
    </Drawer>
   </Box>
  )
}

export default Sidebar;