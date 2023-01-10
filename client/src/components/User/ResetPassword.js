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
import { resetPassword, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Layout/Loader'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import { Fragment } from 'react';
import PasswordIcon from '@mui/icons-material/Password';

const theme = createTheme();


function ResetPassword() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const {token} = useParams();

  const resetPasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(resetPassword(token, myForm));
  };

  useEffect(() => {
    if (error) {
      // NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (success) {
      // NotificationManager.success("Password Updated Successfully");

      Navigate("/login");
    }
  }, [dispatch, error, success]);

  
    return (
        <Fragment>
        {loading ? (<Loading/>):(
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main', fontSize:'1.5rem' }}>
                  <PasswordIcon />
                </Avatar>
                <Typography fontSize='1.5rem' fontWeight='medium'>
                  Change Password
                </Typography>
                <Box component="form" noValidate onSubmit={resetPasswordSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                  
                   
                    <Grid item xs={12}>
                      <TextField
                      type='password'
                        autoComplete="given-name"
                        name="newPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        id="newPassword"
                        label="New Password"
                        autoFocus
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                      type='password'
                        autoComplete="given-name"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        autoFocus
                      />
                    </Grid>
                   
      
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ textTransform:'none', mt: 3, mb: 2, backgroundColor:"black", color:'white' }}
                  >
                    Update 
                  </Button>
                 
                </Box>
              </Box>
             
            </Container>
          </ThemeProvider>
        )}
    </Fragment>
    );
  }

export default ResetPassword