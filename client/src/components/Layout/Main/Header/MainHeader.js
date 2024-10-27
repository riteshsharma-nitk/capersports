import { useLocation } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import { Box, AppBar, Toolbar, Typography } from '@mui/material';
import { HEADER } from '../../../../config';
import useOffSetTop from '../../../../hooks/useOffSetTop';
import useResponsive from '../../../../hooks/useResponsive';
import Logo from '../../../../helper/Logo';
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import cssStyles from '../../../../utils/cssStyles';

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
    height: HEADER.MOBILE_HEIGHT,
    transition: theme.transitions.create(['height', 'background-color'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    [theme.breakpoints.up('md')]: {
      height: HEADER.MAIN_DESKTOP_HEIGHT,
    },
  }));


  const ToolbarShadowStyle = styled('div')(({ theme }) => ({
    left: 0,
    right: 0,
    bottom: 0,
    height: 24,
    zIndex: -1,
    margin: 'auto',
    borderRadius: '50%',
    position: 'absolute',
    width: `calc(100% - 48px)`,
    boxShadow: theme.customShadows.z8,
  }));

  export default function MainHeader() {
    const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);
  
    const theme = useTheme();
  
    const { pathname } = useLocation();
  
    const isDesktop = useResponsive('up', 'md');
  
    const isHome = pathname === '/';
  
    return (
      <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
        <ToolbarStyle
          disableGutters
          sx={{
            ...(isOffset && {
              ...cssStyles(theme).bgBlur(),
              height: { md: HEADER.MAIN_DESKTOP_HEIGHT - 16 },
            }),
          }}
        >
           <Box width='100%'
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p:2
          }}
        >

          
          
            {/* <Typography fontSize={25} fontWeight='bold'
            sx={{
              marginLeft:2,
              ...(isHome && { color: 'common.white' }),
              ...(isOffset && { color: 'text.primary' }),
              '&.active': {
                color: 'primary.main',
              },
            }}>
          CAPER SPORTS
        </Typography>  */}


            <Box sx={{ flexGrow: 1 }} />
           
  
            {isDesktop && <MenuDesktop isOffset={isOffset} isHome={isHome} />}
  
          
  
            {!isDesktop && <MenuMobile isOffset={isOffset} isHome={isHome} />}
          </Box>
        </ToolbarStyle>
  
        {isOffset && <ToolbarShadowStyle />}
      </AppBar>
    );
  }
  


