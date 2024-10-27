import { useLocation, Outlet } from 'react-router-dom';
import { Box, Container, Typography, Stack } from '@mui/material';
import MainHeader from './Header/MainHeader';
import MainFooter from './Footer/MainFooter';
import Logo from '../../../helper/Logo';


export default function MainLayout() {
    const { pathname } = useLocation();
  
    const isHome = pathname === '/';
  
    return (
      <Stack sx={{ minHeight: 1 }}>
        <MainHeader />
  
        <Outlet />
  
        <Box sx={{ flexGrow: 1 }} />
  
       <MainFooter/>
      </Stack>
    );
  }
  

