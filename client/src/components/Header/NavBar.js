import { styled, useTheme } from "@mui/material/styles";
import { AppBar, Box, Container, Link, Toolbar, useMediaQuery } from "@mui/material";
import Desktop from "./Desktop";
import Mobile from "./Mobile";
import { HEADER } from "../../config";
import useOffSetTop from "../../hooks/useOffSetTop";
import useResponsive from "../../hooks/useResponsive";
import cssStyles from "../../utils/cssStyles";
import {Link as RouterLink} from 'react-router-dom'
import logo from '../../images/logo.png'


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


export default function Appbar() {
  const isOffset = useOffSetTop(HEADER.MAIN_DESKTOP_HEIGHT);

  const theme = useTheme();

  const isDesktop = useResponsive('up', 'md');

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

               <Link component={RouterLink} to="/">
                <Box component='img' src={logo} sx={{height:40}}></Box>
              </Link>
            

{isDesktop &&  <Desktop/>}
{!isDesktop &&  <Mobile/>}



</Box>
      </ToolbarStyle>
      {isOffset && <ToolbarShadowStyle />}
     
    </AppBar>
  );
}