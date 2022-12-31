import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import {useNavigate } from 'react-router';
import { NotificationManager } from 'react-notifications';
import { logout } from "../../actions/userAction"
import { useDispatch } from "react-redux";
import { Divider, List, ListItem, ListItemText } from '@mui/material';

export default function UserOptions({user}) {

    const Navigate = useNavigate()
    const dispatch = useDispatch();

    const options = [
        { icon: <ListAltIcon />, name: "Orders", func: orders },
        { icon: <PersonIcon />, name: "Profile", func: account },
       
    ];

    if (user.role === "admin") {
        options.unshift({
          icon: <DashboardIcon />,
          name: "Dashboard",
          func: dashboard,
        });
      }
      
      
    const [anchorEl, setAnchorEl] = React.useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
  };
  
    const handleClose = () => {
      setAnchorEl(null);
  };

 
  function dashboard() {
    Navigate("/admin/dashboard");
  }

  function orders() {
    Navigate("/orders");
  }
  function account() {
    Navigate("/account");
  }

  function logoutUser() {
    dispatch(logout());
    NotificationManager.success("Logout Successfully");
  }

  return (
    <>
    <Box>
          <IconButton
            onClick={handleClick}
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar alt="Avatar Preview" src={user.avatar.url}  sx={{ width: 32, height: 32 }}>{(user.name).substr(0,1)}</Avatar>
          </IconButton>
    </Box>
         
    <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            pl:1.5,
            pr:2.5,
            borderRadius:4,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <List>
          <ListItem>
            <ListItemText 
            primaryTypographyProps={{fontSize:'0.85rem', fontWeight:'bold'}}
            secondaryTypographyProps={{fontSize:"0.75rem"}}
            primary={user.name}
            secondary={user.email}

            />
          </ListItem>
        </List>
        <Divider style={{borderStyle:'dashed'}}/>
        
        {options.map((item) => (
          <MenuItem
          sx={{fontSize:'0.85rem'}}
            key={item.name}
            onClick={item.func}>
                {item.name}
            </MenuItem>
        ))}

        <Divider style={{borderStyle:'dashed'}}/>
        <MenuItem sx={{fontSize:'0.85rem'}} onClick={logoutUser} key={Logout}>
          Logout
 
        </MenuItem>
      
      </Menu>
      </>     
       
  );
}

