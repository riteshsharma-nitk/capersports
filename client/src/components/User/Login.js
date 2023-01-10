import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login } from "../../actions/userAction";
import {useNavigate} from 'react-router-dom'
import { Alert, Card, IconButton, InputAdornment, Stack, styled } from '@mui/material';
import useResponsive from '../../hooks/useResponsive';
import loginImage from '../../images/undraw_secure_login_pdn4.svg'
import Image from '../../helper/Image';
import Logo from '../../helper/Logo';
import Page from '../../helper/Page';
import {LoadingButton} from '@mui/lab';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RHFCheckbox, RHFTextField, FormProvider } from '../../helper/hook-form';
import useIsMountedRef from '../../hooks/useIsMountedRef';
import Iconify from '../../helper/Iconify';
import { useSnackbar } from 'notistack';

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
  borderRadius:0,
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
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


export default function Login() {
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  const mdUp = useResponsive('up', 'md');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const redirect = window.location.search ? window.location.search.split("=")[1] : "/account";

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const defaultValues = {
    email: '',
    password: '',
    remember: true,
  };
  

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
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
      dispatch(login(data.email, data.password));

    } catch (error) {
      console.error(error);
      reset();
      if (isMountedRef.current) {
        setError('afterSubmit', { ...error, message: error.message });
      }
    }
  };

  React.useEffect(() => {
    if (error) {
      dispatch(clearErrors());

    }

    if (isAuthenticated) {
      navigate(redirect);
    }

  

  }, [dispatch, error, navigate, redirect, isAuthenticated]);


  const [showPassword, setShowPassword] = React.useState(false);


  return (
    <Page title="Login">

        <RootStyle>
          <HeaderStyle>
          <Logo/>
          </HeaderStyle>
          
        {mdUp && (
        <ContentStyle>
          <Typography variant="h3" sx={{ textAlign:'center', mt: 10, mb: 5 }}>
            Hi, Welcome Back
          </Typography> 
          <Image
              visibleByDefault
              disabledEffect
              alt="login"
              src={loginImage}
            />
        </ContentStyle>)}


 
        <SectionStyle>
          <Stack spacing={2}>
            <Typography variant='h4'> Sign in to Caper Sports </Typography>
            <Typography variant='body2'>New user? {' '}
                  <Link variant='subtitle2'   component={RouterLink} to="/register">
                    Create an account
                    </Link>
                    </Typography>
                  </Stack>

                  <br></br>

                  <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3}>
                      {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}

                      <RHFTextField name="email" label="Email address" />
                      
                      <RHFTextField
                      name="password"
                      label="Password"
                      type={showPassword ? 'text' : 'password'}
                      InputProps={{
                        endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                            </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <RHFCheckbox name="remember" label="Remember me" />
        <Link component={RouterLink} variant="subtitle2" to={'/password/forgot'}>
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
        Login
      </LoadingButton>
    </FormProvider>
                
               </SectionStyle>    
           </RootStyle>
           </Page>

  );
}
