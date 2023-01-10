
import React, {useState, useEffect } from "react";
import Loading from "../Layout/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import { useNavigate } from 'react-router-dom';
import PasswordIcon from '@mui/icons-material/Password';
import { Avatar, Button, CssBaseline, Grid, Stack, TextField, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useSnackbar } from 'notistack';


const theme = createTheme();

function UpdatePassword() {
  const { enqueueSnackbar } = useSnackbar();

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
      // NotificationManager.error(error);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      enqueueSnackbar("Update success");

      Navigate("/account");

      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, isUpdated]);



  return (
    <>
    {loading ? (<Loading/>):(
                <Grid container rowSpacing={2} sx={{p:2}}>
                <Grid item md={12} xs={12}>
                <Typography fontSize="1.5rem" fontWeight='bold'>Change password</Typography>
                <br></br>
                </Grid>
                <Grid md={12} xs={12} display='flex' alignItems='center' justifyContent='center' sx={{boxShadow:'rgba(0, 0, 0, 0.16) 0px 1px 4px', borderRadius:2}}>
                <Box width='100%' component="form" onSubmit={updatePasswordSubmit} sx={{ m: 2 }}>
                <Stack spacing={3} alignItems="flex-end">
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
                   
                      <TextField
                      type='password'
                        value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                        required
                        fullWidth
                        name="newPassword"
                        label="New Password"
                        fontSize="1rem"                       />

                      <TextField
                      type='password'
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        fullWidth
                        label="Confirm New Password"
                        fontSize="1rem" 
                                              />
                   
      
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
             
             
        )}
    </>
  )
}

export default UpdatePassword