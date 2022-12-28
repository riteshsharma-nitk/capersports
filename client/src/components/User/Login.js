import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../Layout/Loader'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { NotificationManager } from 'react-notifications';
import {useNavigate} from 'react-router-dom'


const theme = createTheme();

export default function Login() {
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
    if (error) {
      NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      navigate(redirect);
    }

  }, [dispatch, error, navigate, redirect, isAuthenticated]);


  return (
    <React.Fragment> 
      {loading ? (<Loading/>) : (
       <ThemeProvider theme={theme}>
              <Container component="main" maxWidth="xs">
              <CssBaseline />
               <Box
                 sx={{
                   marginTop: 8,
                   display: 'flex',
                   flexDirection: 'column',
                   alignItems: 'center',
                 }}
               >
                 <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                   <LockOutlinedIcon fontSize='1.5rem' />
                 </Avatar>
                 <Typography fontSize='1.5rem' fontWeight='medium'>
                   Sign in
                 </Typography>
                 <Box component="form" onSubmit={loginSubmit} sx={{ mt: 1 }}>
                   <TextField
                     type='email'
                     name='email'
                     required
                     fullWidth
                     margin='normal'
                     label="Email Address"
                     fontSize='1rem'
                     value={loginEmail}
                     
                     onChange={(e) => setLoginEmail(e.target.value)}
                    
                   />
                   <TextField
                    
                     type="password"
                     required
                     fullWidth
                     name='password'
                     margin='normal'
                     label="Password"
                     fontSize='1rem'
                     value={loginPassword}
                     onChange={(e) => setLoginPassword(e.target.value)}
                     
                   />
                 
                   <Button
                   margin='normal'
                   fontSize='1rem'
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ mt: 3, mb: 2, textTransform:'none', backgroundColor:'black' }}
                   >
                     Sign In
                   </Button>
                   <Grid container>
                     <Grid item xs>
                       <Link underline='none' sx={{fontSize:'0.8rem'}} component={RouterLink} to='/password/forgot' variant="body2">
                         Forgot password?
                       </Link>
                     </Grid>
                     <Grid item>
                       <Link  underline='none' sx={{fontSize:'0.8rem'}} component={RouterLink} to="/register" variant="body2">
                         {"Don't have an account? Sign Up"}
                       </Link>
                     </Grid>
                   </Grid>
                 </Box>
               </Box>
             </Container>
           </ThemeProvider>)}

    </React.Fragment>
   
  );
}
