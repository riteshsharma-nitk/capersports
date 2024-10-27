import * as React from 'react';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { resetPassword, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import {useParams } from 'react-router-dom';
import LoadingScreen from '../../helper/LoadingScreen';
import Page from '../../helper/Page';
import { Stack } from '@mui/material';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));


function ResetPassword() {
    const dispatch = useDispatch();

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

      // Navigate("/login");
    }
  }, [dispatch, error, success]);

  
    return (
      <Page title="Reset Password" sx={{ height: 1 }}>
      {loading ? (<LoadingScreen/>):(
        <RootStyle>
            <Container>
            <Box sx={{ maxWidth: 480, mx: 'auto' }}>
              {!success ? (
                <>
                <Typography variant='h4'> Change Password </Typography>
                <Box component="form" noValidate onSubmit={resetPasswordSubmit} sx={{ mt: 3 }}>
                  <Stack spacing={3}>
                   
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
                   
      
                  <Button
                  size='large'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor:"black", color:'white' }}
                  >
                    Update 
                  </Button>
                  </Stack>
                 
                </Box>
                </>
              ):(
                <Box sx={{ textAlign: 'center' }}>

                <Typography variant="h4" gutterBottom>
                  Password changed successfully
                </Typography>
               

                <Button size="large" variant="contained" component={RouterLink} to={'/login'} sx={{ mt: 5 }}>
                  Login
                </Button>
              </Box>
           
              )}
                
                </Box>
             
            </Container>
            </RootStyle>
        )}
    </Page>
    );
  }

export default ResetPassword;