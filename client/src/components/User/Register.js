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
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import { Link as RouterLink, redirect, useNavigate } from 'react-router-dom';
import { register, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import loginImage from '../../images/undraw_secure_login_pdn4.svg'


import { Card, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Logo from '../../helper/Logo';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../helper/Image';
const theme = createTheme();
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
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius:0,
  minHeight: '100vh',
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

export default function Register() {
  const smUp = useResponsive('up', 'sm');

  const mdUp = useResponsive('up', 'md');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

    const [user, setUser] = React.useState({
        name: "",
        email: "",
        password: "",
      });
    
      const { name, email, password } = user;
      const [avatar, setAvatar] = useState("/Profile.png");
      const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

      const redirect = window.location.search ? window.location.search.split("=")[1] : "/account";

      const registerSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
      };

      const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
          const reader = new FileReader();
    
          reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
    
          reader.readAsDataURL(e.target.files[0]);
        } else {
          setUser({ ...user, [e.target.name]: e.target.value });
        }
      };

      React.useEffect(() => {
        if (error) {
          NotificationManager.error(error);
          dispatch(clearErrors());
        }
    
        if (isAuthenticated) {
          navigate(redirect);
          
         
        }

        document.title = "Register | Caper Sports"
      }, [dispatch, error, isAuthenticated, redirect]);
    
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
             Welcome to Caper Sports
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src={loginImage}
            />
          </ContentStyle>
        )}


               

    <SectionStyle>

      
         
         <Typography fontSize='1.5rem' fontWeight='bold'>
                 Sign up to Caper Sports
                 </Typography>
                 <br></br>

                 <Box sx={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                 <Typography fontWeight='regular' fontSize='0.85rem'>Already have an account?</Typography>
                 <Link underline='none' sx={{ml:1}} component={RouterLink} to="/login" variant="body2">
                 <Typography fontWeight='bold' fontSize='0.85rem' color="#4caf50">Sign in</Typography>
                </Link>
                 </Box>

          <Box component="form" encType="multipart/form-data" onSubmit={registerSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                type='text'
                  value={name}
                  required
                  name='name'
                  onChange={registerDataChange}
                  fullWidth
                  fontSize='1rem'
                  label="Name"
                 
                />
              </Grid>
             
              <Grid item xs={12}>
                <TextField
                type='email'
                  required
                  fullWidth
                name='email'
                  label="Email Address"
                  fontSize='1rem'
                  value={email}
                  onChange={registerDataChange}
                />
              </Grid>
              <Grid item xs={12}>


              <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    fullWidth
                    name='password'
                    margin='normal'
                    label="Password"
                    fontSize='1rem'
                  value={password}
                  
                 
                  onChange={registerDataChange}
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


              </Grid>

              <Grid gap={2} display='flex' justifyContent='flex-start' sx={{}} item xs={12}>

              <Avatar sx={{ width: 56, height: 56 }} alt="Avatar Preview" src={avatarPreview} />

                <Button
                fullWidth
                size='large'
                variant='outlined'
                component='label'
                  required
                
                
                  label="image"
                  type="file"
                 
>
                    Upload profile picture
                    <input
                    type='file'
                   name='avatar'
                    accept='image/*'
                    onChange={registerDataChange}
                    hidden
                    />
                  </Button>
                
              </Grid>


            </Grid>
            <br></br>
            <Button
            size='large'
              type="submit"
              fullWidth
              variant="contained"
              sx={{backgroundColor:'rgb(33, 43, 54)'}}              >
              Create Account
            </Button>
            <br></br>
            <br></br>
            <Typography textAlign='center' fontSize='0.75rem' color='text.secondary'>By signing up, I agree to Terms of Service and Privacy Policy.</Typography>
          </Box>
       
        </SectionStyle>
        </RootStyle>
  );
}