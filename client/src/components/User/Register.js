import * as React from 'react';
import { useForm } from 'react-hook-form';
import { FormProvider, RHFTextField } from '../../helper/hook-form';
import { LoadingButton } from '@mui/lab';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { register, clearErrors } from '../../actions/userAction';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import loginImage from '../../images/undraw_secure_login_pdn4.svg'
import { Alert, Card, IconButton, InputAdornment, Stack } from '@mui/material';
import Logo from '../../helper/Logo';
import useResponsive from '../../hooks/useResponsive';
import Image from '../../helper/Image';
import useIsMountedRef from '../../hooks/useIsMountedRef';

import Page from '../../helper/Page';
import default_profile_picture from '../../images/default_profile_picture.png'
import Iconify from '../../helper/Iconify';
const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(3),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(7, 5, 0, 7),
  },
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  borderRadius:0,
  minHeight: '100vh',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
  padding: theme.spacing(30, 8, 0),
  },

}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

export default function Register() {
  const smUp = useResponsive('up', 'sm');
  const mdUp = useResponsive('up', 'md');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMountedRef = useIsMountedRef();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );


  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    name: Yup.string().required('Full name required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    name: '',
    email: '',
    password: '',
  };

  const methods = useForm({
    resolver: yupResolver(RegisterSchema),
    defaultValues,
  });

  const {
    reset,

    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;


  const onSubmit = async (data) => {
    try {
      console.log(data)
      dispatch(register(data.name, data.email, data.password));
    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };


 
 

  const redirect = window.location.search ? window.location.search.split("=")[1] : "/account";

      

      

      React.useEffect(() => {
        if (error) {
          // NotificationManager.error(error);
          // dispatch(clearErrors());
        }
    
        if (isAuthenticated) {
          navigate(redirect);
          
         
        }

      }, [dispatch, error, isAuthenticated, redirect]);
    

 

  

  return (
    <Page title="Register">
    <RootStyle>
      <HeaderStyle>
        <Logo/>
      </HeaderStyle>
      {mdUp && (
          <ContentStyle>
            <Typography variant="h3" sx={{ textAlign:'center', mt: 10, mb: 5 }}>
             Welcome to Caper Sports
            </Typography>
            <Image
              visibleByDefault
              disabledEffect
              alt="register"
              src={loginImage}
            />
          </ContentStyle>
        )}


               

    <SectionStyle>

      
         
         <Typography fontSize='1.5rem' fontWeight='bold'>
                 Sign up
                 </Typography>
                 <br></br>

{smUp && (
                 <Box sx={{display:'flex', justifyContent:'flex-start', alignItems:'center'}}>
                 <Typography fontWeight='regular' fontSize='0.85rem'>Already have an account?</Typography>
                 <Link underline='none' sx={{ml:1}} component={RouterLink} to="/login" variant="body2">
                 <Typography fontWeight='bold' fontSize='0.85rem'>Sign in</Typography>
                </Link>
                 </Box>)}
                 <br></br>
                 {error && <Alert severity="error">{error}</Alert>}
                 <br></br>


                 <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <RHFTextField name="name" label="Full name" />
        </Stack>

        <RHFTextField name="email" label="Email address" />

        <RHFTextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end" onClick={() => setShowPassword(!showPassword)}>
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          Register
        </LoadingButton>
      </Stack>
    </FormProvider>
    <br></br>
    <Typography textAlign='center' fontSize='0.75rem' color='text.secondary'>By signing up, I agree to Terms of Service and Privacy Policy.</Typography>

    {!smUp && (
                 <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', mt:1}}>
                 <Typography variant='body2'>Already have an account?</Typography>
                 <Link underline='none' sx={{ml:1}} component={RouterLink} to="/login" variant="body2">
                 <Typography fontWeight='bold' fontSize='0.85rem'>Sign in</Typography>
                </Link>
                 </Box>)}
       
        </SectionStyle>
        </RootStyle>
        </Page>
  );

}


