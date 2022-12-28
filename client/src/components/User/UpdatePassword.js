
import React, {useState, useEffect } from "react";
import Loading from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { NotificationManager } from 'react-notifications';
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import { Avatar, Button, CssBaseline, Grid, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme();

function UpdatePassword() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);

    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      NotificationManager.success("Profile Updated Successfully");

      Navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated]);


  return (
    <Box display='flex' sx={{marginTop:1}}> 
    {loading ? (<Loading/>):(
            <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 7,
                  marginBottom: 7,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                  <PasswordIcon fontSize="1.5rem" />
                </Avatar>
                <Typography fontSize="1.5rem" fontWeight='medium'>
                  Update Password
                </Typography>
                <Box component="form" onSubmit={updatePasswordSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                      type='password'
                        value={oldPassword}
                        required
                        name="oldPassword"
                        onChange={(e) => setOldPassword(e.target.value)}
                        fullWidth
                        label="Old Password"
                        fontSize="1rem" 
                      />
                    </Grid>
                   
                    <Grid item xs={12}>
                      <TextField
                      type='password'
                        value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        fontSize="1rem"                       />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                      type='password'
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        label="Confirm Password"
                        fontSize="1rem" 
                                              />
                    </Grid>
                   
      
                  </Grid>
                  <Button
                  fontSize="1rem" 
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ textTransform:'none', mt: 3, mb: 2, backgroundColor:"black", color:'white' }}
                  >
                    Update Password
                  </Button>
                 
                </Box>
              </Box>
             
            </Container>
          </ThemeProvider>
        )}
    </Box>
  )
}

export default UpdatePassword