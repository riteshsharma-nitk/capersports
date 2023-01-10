import { useLocation, Outlet } from 'react-router-dom';
import { Box, Link, Container, Typography, Stack } from '@mui/material';
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
  
        {!isHome ? (
          <MainFooter />
        ) : (
          <Box
            sx={{
              py: 5,
              textAlign: 'center',
              position: 'relative',
              bgcolor: 'background.default',
            }}
          >
            <Container>
              <Logo sx={{ mb: 2, mx: 'auto' }} />
  
              <Typography variant="caption" component="p">
                © All rights reserved
                <br /> Caper Sports
              </Typography>
            </Container>
          </Box>
        )}
      </Stack>
    );
  }
  

