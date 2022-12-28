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
import { Link as RouterLink, redirect, useNavigate } from 'react-router-dom';
import { register, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
const theme = createTheme();

export default function Register() {
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
      }, [dispatch, error, isAuthenticated, redirect]);
    

  

  return (
    <Box display='flex' sx={{marginTop:1}}> 
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 2,
            marginBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon fontSize='1.5rem'/>
          </Avatar>
          <Typography fontSize='1.5rem' fontWeight='medium'>
            Sign up
          </Typography>
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
                <TextField
                  required
                  fullWidth
                  name='password'
                  label="Password"
                 
                
                  fontSize='1rem'
                  value={password}
                  
                  type='password'
                  onChange={registerDataChange}
                />
              </Grid>

              <Grid gap={2} display='flex' justifyContent='flex-start' sx={{}} item xs={12}>

              <Avatar  alt="Avatar Preview" src={avatarPreview} />

                <Button
                fullWidth
                sx={{textTransform:'none'}}
                fontSize='1rem'
                variant='outlined'
                component='label'
                  required
                
                
                  label="image"
                  type="file"
                 
>
                    Upload File
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
            <Button
             fontSize='1rem'
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, textTransform:'none', backgroundColor:"black", color:'white' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link underline='none' sx={{ fontSize:'0.8rem'}} component={RouterLink} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
       
      </Container>
    </ThemeProvider>
    </Box>
  );
}