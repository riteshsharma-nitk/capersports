import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../Layout/Loader'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import {useNavigate} from 'react-router-dom'
import { Card, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Stack, styled } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import useResponsive from '../../hooks/useResponsive';
import loginImage from '../../images/undraw_secure_login_pdn4.svg'
import Image from '../../helper/Image';
import Logo from '../../helper/Logo';
import Page from '../../helper/Page';
import {LoadingButton} from '@mui/lab';

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  borderRadius:0,
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
  padding: theme.spacing(30, 8, 0),
  },
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));


export default function Login() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const redirect = window.location.search ? window.location.search.split("=")[1] : "/account";

  React.useEffect(() => {
    document.title="Login | Caper Sports"
    if (error) {
      // NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }

  

  }, [dispatch, error, navigate, redirect, isAuthenticated]);


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
        <RootStyle>
          <HeaderStyle>
          <Logo/>
          </HeaderStyle>
          
        {mdUp && (
        <ContentStyle>
          <Typography variant="h3" sx={{ textAlign:'center', mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography> 
          <Image
              visibleByDefault
              disabledEffect
              alt="login"
              src={loginImage}
            />
        </ContentStyle>)}


 
        <SectionStyle>
               
                  <Stack spacing={2}>
                  <Typography variant='h4'> Sign in to Caper Sports </Typography>
                  <Typography variant='body2'>New user? {' '}
                  <Link variant='subtitle2'   component={RouterLink} to="/register">
                    Create an account
                    </Link>
                    </Typography>
                  </Stack>

                  <br></br>

                 <Box component="form" onSubmit={loginSubmit} sx={{ mt: 1 }}>
                 <Stack spacing={3}>

                   <TextField
                    
                     type='email'
                     name='email'
                     required
                     fullWidth
                     label="Email Address"
                     value={loginEmail}
                     onChange={(e) => setLoginEmail(e.target.value)}
                    
                   />
                  
                  
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    fullWidth
                    name='password'
                    label="Password"
                    fontSize='1rem'
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
           
          />
        </FormControl>


















                      
                       <Link underline='none' sx={{fontSize:'0.8rem'}} component={RouterLink} to='/password/forgot' variant="body2">
                         <Typography fontSize='0.85rem' color='text.secondary' textAlign='right'>Forgot password?</Typography>
                       </Link>
                    
                      
                   <LoadingButton
                   size='large'
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{backgroundColor:'rgb(33, 43, 54)'}}
                    
                   >
                     Login
                   </LoadingButton>
                   </Stack>
                 </Box>
                
               </SectionStyle>    
           </RootStyle>

  );
}
