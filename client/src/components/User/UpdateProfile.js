import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { NotificationManager } from 'react-notifications';
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import {updateProfile, loadUser } from "../../actions/userAction";
import Loading from '../Layout/Loader'
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useEffect } from 'react';

const theme = createTheme();

function UpdateProfile() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
  
    const { user } = useSelector((state) => state.user);
    const { error, isUpdated, loading } = useSelector((state) => state.profile);
  
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  
    const updateProfileSubmit = (e) => {
        e.preventDefault();
    
        const myForm = new FormData();
    
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("avatar", avatar);
        dispatch(updateProfile(myForm));
      };
    
      const updateProfileDataChange = (e) => {
        const reader = new FileReader();
  
        reader.onload = () => {
            if (reader.readyState === 2) {
              setAvatarPreview(reader.result);
              setAvatar(reader.result);
            }
          };
      
          reader.readAsDataURL(e.target.files[0]);
        };
      
        useEffect(() => {
          if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user.avatar.url);
          }
      
          if (error) {
            NotificationManager.error(error);
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
            NotificationManager.success("Profile Updated Successfully");
            dispatch(loadUser());
      
            Navigate("/account");
      
            dispatch({
              type: UPDATE_PROFILE_RESET,
            });
          }
        }, [dispatch, error, user, isUpdated]);
      
  
    
  
    return (
      <Box display='flex' sx={{marginTop:1}}> 
      {loading ? (<Loading/>):(
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  marginBottom: 10,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <AccountCircleIcon  fontSize='1.5rem'/>
                </Avatar>
                <Typography fontSize='1.5rem' fontWeight='medium'>
                  Update Profile
                </Typography>
                <Box component="form" onSubmit={updateProfileSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                      type='text'
                       
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                         name='name'
                        label="Name"
                        fontSize='1rem'
                      />
                    </Grid>
                   
                    <Grid item xs={12}>
                      <TextField
                      type='email'
                        required
                        fullWidth
                       
                        label="Email Address"
                        name="email"
                        fontSize='1rem'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                   
      
                    <Grid gap={2} display='flex' justifyContent='flex-start' sx={{}} item xs={12}>
      
                    <Avatar  alt="Avatar Preview" src={avatarPreview} />
      
                      <Button
                      sx={{width:'90%', textTransform:'none', backgroundColor:'white', color:'black'}}
                      
                      variant='outlined'
                      component='label'
                        required
                      
                        name="image"
                        label="image"
                        type="file"
                        >
                          Upload File
                          <input
                          type='file'
                          name='avatar'
                          accept='image/*'
                          onChange={updateProfileDataChange}
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
                    sx={{ mt: 3, mb: 2, backgroundColor:"black", color:'white', textTransform:"none" }}
                  >
                    Save
                  </Button>
                  
                </Box>
              </Box>
             
            </Container>
          </ThemeProvider>
        )}
</Box>
    );
  }

export default UpdateProfile