import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import { forgotPassword, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import LoadingScreen from '../../helper/LoadingScreen';
import Page from '../../helper/Page';
import { SentIcon } from '../../assets';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

function ForgotPassword() {
    const dispatch = useDispatch();
  
    const { error, message, loading } = useSelector(
      (state) => state.forgotPassword
    );
  
    const [email, setEmail] = useState("");
  
    const forgotPasswordSubmit = (e) => {
      e.preventDefault();
  
      const myForm = new FormData();
  
      myForm.set("email", email);
      dispatch(forgotPassword(myForm));
    };
  
    useEffect(() => {
      if (error) {
        // NotificationManager.error(error);
        dispatch(clearErrors());
      }
  
      if (message) {
        // NotificationManager.success(message);
      }
    }, [dispatch, error, message]);
    return (
      <Page title="Forgot Password" sx={{ height: 1 }}>
      {loading ? (<LoadingScreen/>):(
            
            <RootStyle>
              <Container>
              <Box sx={{ maxWidth: 480, mx: 'auto' }}>
                {!message ? (
                  <>
                   <Typography variant="h3" paragraph> Forgot your password? </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Please enter the email address associated with your account and We will email you a link to reset your
                  password.
                </Typography>
                <Box component="form" noValidate onSubmit={forgotPasswordSubmit} sx={{ mt: 3 }}>

                    <Grid item xs={12}>
                      <TextField
                      type='email'
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                   
      
                  
      
      
                  
                  <Button
                  size='large'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, textTransform:'none', backgroundColor:"black", color:'white' }}
                  >
                    Send
                  </Button>
                </Box>
                <Button fullWidth size="large" component={RouterLink} to='/login' sx={{ mt: 1 }}>
                  Back
                </Button>
                  </>

                ):(
                  <Box sx={{ textAlign: 'center' }}>
                  <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />
  
                  <Typography variant="h3" gutterBottom>
                    Request sent successfully
                  </Typography>
                  <Typography>
                    We have sent a confirmation email to &nbsp;
                    <strong>{email}</strong>
                    <br />
                    Please check your email.
                  </Typography>
  
                  <Button size="large" variant="contained" component={RouterLink} to={'/login'} sx={{ mt: 5 }}>
                    Back
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

export default ForgotPassword;