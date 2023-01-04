import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Avatar, Box, Button, Container, createTheme, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, ThemeProvider, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { useParams } from "react-router";
import { UPDATE_USER_RESET } from "../../constants/userConstants";

import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../actions/userAction";
import Sidebar from "./Sidebar";
import Loader from "../Layout/Loader";
import { useNavigate } from "react-router";


const UpdateUser = () => {
    const theme = createTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  const {id} = useParams();
  const  userId = id;

  useEffect(() => {
    if (user && user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setName(user.name);
      setEmail(user.email);
      setRole(user.role);
    }
    if (error) {
      dispatch(clearErrors());
    }

    if (updateError) {
      dispatch(clearErrors());
    }

    if (isUpdated) {
      navigate("/admin/users");
      dispatch({ type: UPDATE_USER_RESET });
    }
  }, [dispatch, error, isUpdated, updateError, user, userId]);

  const updateUserSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("role", role);

    dispatch(updateUser(userId, myForm));
  };

  return (
    <Box display='flex' sx={{marginTop:1 ,backgroundColor:'#f5f5f5'}}>
         <Sidebar/>

          {loading ? (
            <Loader />
          ) : (
          <ThemeProvider theme={theme}>
            <Grid backgroundColor='#f5f5f5' container rowSpacing={2}>
                      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
                        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px' }}> 
        
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
                          <PersonIcon />
                        </Avatar>
                        <Typography fontSize='1.5rem' fontWeight='medium'>
                          Update User
                        </Typography>

                        <Box component="form" noValidate onSubmit={updateUserSubmitHandler} sx={{ mt: 3 }}>

           

             
                        <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                      type='text'
                      fontSize='1rem'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                      
                        label="Product Name"
                      
                      />
                    </Grid>


             
                 
                    <Grid item xs={12}>
                      <TextField
                  type="email"
                  placeholder="Email"
                  fullWidth
                  required
                  fontSize='1rem'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>


             <Grid item md={12} xs={12}>
               <FormControl fullWidth>
                <InputLabel  fontSize='1rem'>Choose Role</InputLabel>
                <Select
                 fontSize='1rem'
                label='Choose Role'
                 value={role} onChange={(e) => setRole(e.target.value)}>
                  <MenuItem  fontSize='1rem' value="">Choose Role</MenuItem>
                  <MenuItem  fontSize='1rem' value="admin">Admin</MenuItem>
                  <MenuItem  fontSize='1rem' value="user">User</MenuItem>
                </Select>
                </FormControl>
                </Grid>
                </Grid>
             <br></br>
               
              <Button
              fullWidth
              fontSize='1rem'
              variant="contained"
              sx={{textTransform:'none', backgroundColor:'black'}}
                id="createProductBtn"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
              </Box>
              </Box>
            
             

              </Paper>
        </Container>
          </Grid>
          </ThemeProvider>
            
          )}
        
       
       </Box>

  );
};

export default UpdateUser;