import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { UPDATE_PROFILE_RESET } from "../../constants/userConstants";
import {updateProfile, loadUser } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Stack } from '@mui/material';
import { useSnackbar } from 'notistack';
import LoadingScreen from '../../helper/LoadingScreen';

function UpdateProfile() {
  const { enqueueSnackbar } = useSnackbar();

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
            setAvatarPreview(user?.avatar?.url);
          }
      
          if (error) {
            // NotificationManager.error(error);
            dispatch(clearErrors());
          }
      
          if (isUpdated) {
            enqueueSnackbar('Update success!');
                        dispatch(loadUser());
      
            Navigate("/account");
      
            dispatch({
              type: UPDATE_PROFILE_RESET,
            });
          }
        }, [dispatch, error, user, isUpdated]);
      
  
    
  
    return (
      <> 
      {loading ? (<LoadingScreen/>):(
        <Grid container>
              <Grid container sx={{p:2}}>
                <Grid item md={12} xs={12}>
                <Typography fontSize='1.5rem' fontWeight='bold'>
                  Update profile
                </Typography>
                <br></br>
                </Grid>
                <Grid item md={12} xs={12} display='flex' alignItems='center' justifyContent='center' sx={{boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:2}}>
                <Box width='100%' component="form" onSubmit={updateProfileSubmit} sx={{ m: 2 }}>
                <Stack spacing={3} alignItems="flex-end">
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
                   
      
                    <Box gap={2} width='100%' display='flex' justifyContent='flex-start'>
      
                    <Avatar  alt="Avatar Preview" src={avatarPreview} />
      
                      <Button
                      color='inherit'
                      fullWidth                      
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
                      
                    </Box>
      
      
                  <Button
                    type="submit"
                    variant="contained"
                  >
                    Save Changes
                  </Button>
                  </Stack>
                </Box>
              </Grid>
              </Grid>
              </Grid>
             
        )}
</>
    );
  }

export default UpdateProfile