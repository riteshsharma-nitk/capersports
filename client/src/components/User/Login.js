import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useState } from 'react';
import Loading from '../Layout/Loader'
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import { NotificationManager } from 'react-notifications';
import {useNavigate} from 'react-router-dom'
import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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

    document.title = 'Login | Caper Sports'

  }, [dispatch, error, navigate, redirect, isAuthenticated]);


  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  return (
    <React.Fragment> 
      {loading ? (<Loading/>) : (
        <Grid container minHeight='100vh'>
          <Grid item md={8} sx={{backgroundColor:'rgb(240 239 246)', display:{xs:'none', md:'block'}}}>
            <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', mt:5}}>
              <Typography fontWeight='bold' fontSize='2rem'>Hi, Welcome back</Typography>
            </Box>
          </Grid>

          <Grid item md={4} xs={12}>
               <Box sx={{ pt:{md:25, xs:15}, pl:7, pr:7, display: 'flex', flexDirection: 'column'}}>
                <Typography fontSize='1.5rem' fontWeight='bold'> Sign in to Caper Sports </Typography>
                <br></br>
              <Box sx={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                 <Typography fontWeight='regular' fontSize='0.85rem'>New user?</Typography>
                 <Link  underline='none' sx={{ml:1}} component={RouterLink} to="/register">
                         <Typography fontWeight='bold' fontSize='0.85rem' color="#4caf50">{"Create an account"}</Typography>
                 </Link>
                 </Box>
                 <br></br>

                 <Box component="form" onSubmit={loginSubmit} sx={{ mt: 1 }}>
                   <TextField
                    
                     type='email'
                     name='email'
                     required
                     fullWidth
                     label="Email Address"
                     fontSize='1rem'
                     value={loginEmail}
                     
                     onChange={(e) => setLoginEmail(e.target.value)}
                    
                   />
                   <br></br>
                   <br></br>
                  
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


















                       <br></br>
                       <br></br>
                       <Link underline='none' sx={{fontSize:'0.8rem'}} component={RouterLink} to='/password/forgot' variant="body2">
                         <Typography fontSize='0.85rem' color='text.secondary' textAlign='right'>Forgot password?</Typography>
                       </Link>
                    
                       <br></br>
                   <Button
                   margin='normal'
                   fontSize='1rem'
                     type="submit"
                     fullWidth
                     variant="contained"
                     sx={{ pt: 2, pb: 2, fontWeight:'bold', textTransform:'none', borderRadius:2, backgroundColor:'rgb(33, 43, 54)', ":hover":{backgroundColor:'rgb(33, 43, 54)'} }}
                   >
                     Login
                   </Button>
                   <Grid container>
                     <Grid item>
                       
                     </Grid>
                   </Grid>
                 </Box>
               </Box>
             </Grid>
           </Grid>)}

    </React.Fragment>
   
  );
}
