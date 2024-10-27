import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Box, Button, Card, Container, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { useParams } from "react-router";
import { UPDATE_USER_RESET } from "../../../constants/userConstants";
import LoadingScreen from '../../../helper/LoadingScreen'
import {
  getUserDetails,
  updateUser,
  clearErrors,
} from "../../../actions/userAction";
import { useNavigate } from "react-router";
import Page from "../../../helper/Page";
import HeaderBreadcrumbs from "../../../helper/HeaderBreadcrumbs";


const UpdateUser = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user } = useSelector((state) => state.userDetails);

  const {
    loading: updateLoading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.profile);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [role, setRole] = useState(user?.role || '');

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
   <>
    {
      loading ? (<LoadingScreen/>):(
    
    <Page title="User: Create a new user">
            <Container maxWidth= 'lg'>
            <HeaderBreadcrumbs
          heading={'Edit user'}
          links={[
            { name: 'Dashboard', href: '/admin/dashboard' },
            { name: 'User', href: '/admin/users' },
            { name : name || 'Update user' },
          ]}
        />
        
         <Box component="form" noValidate onSubmit={updateUserSubmitHandler} sx={{ mt: 3 }}>
        <Card sx={{ py: 10, px: 3 }}>

        <Box
              sx={{
                display: 'grid',
                rowGap: 3,
                gridTemplateColumns:'repeat(1, 1fr)',
              }}
            >
                <TextField
                      type='text'
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                      
                        label="Full Name"
                      
                      />


             
                 
                      <TextField
                  type="email"
                  placeholder="Email"
                  fullWidth
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />


               <FormControl fullWidth>
                <InputLabel>Choose Role</InputLabel>
                <Select
                 fontSize='1rem'
                 label='Choose Role'
                 value={role} onChange={(e) => setRole(e.target.value)}>
                  <MenuItem  value="">Choose Role</MenuItem>
                  <MenuItem  value="admin">Admin</MenuItem>
                  <MenuItem  value="user">User</MenuItem>
                </Select>
                </FormControl>
               
              <Button
              fullWidth
              size="large"
              variant="contained"
                type="submit"
                disabled={
                  updateLoading ? true : false || role === "" ? true : false
                }
              >
                Update
              </Button>
              </Box>
              </Card>
              </Box>
             
            
         
        
       </Container>
       </Page>)}
      
       </>
  );
};

export default UpdateUser;