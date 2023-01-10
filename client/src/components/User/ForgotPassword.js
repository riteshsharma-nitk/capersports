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
import { forgotPassword, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Loading from '../Layout/Loader'
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import { useEffect } from 'react';
const theme = createTheme();

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
      <Box display='flex' sx={{marginTop:1 }}> 
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
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <ChangeCircleIcon fontSize='1.5rem'/>
                </Avatar>
                <Typography fontSize='1.5rem' fontWeight='medium'>
                  Forgot Password
                </Typography>
                <Box component="form" noValidate onSubmit={forgotPasswordSubmit} sx={{ mt: 3 }}>
                    <Grid item xs={12}>
                      <TextField
                      type='email'
                        required
                        fullWidth
                        name="email"
                        label="Email Address"
                        fontSize='1rem'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Grid>
                   
      
                  
      
      
                  
                  <Button
                  fontSize='1rem'
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2, textTransform:'none', backgroundColor:"black", color:'white' }}
                  >
                    Send
                  </Button>
                </Box>
              </Box>
             
            </Container>
          </ThemeProvider>
        )}
      </Box>
    );
  }

export default ForgotPassword