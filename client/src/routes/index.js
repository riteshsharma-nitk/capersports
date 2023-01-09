import { Suspense, lazy, useState, useEffect } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';



import GuestGuard from '../components/Guards/GuestGuard';
import AuthGuard from '../components/Guards/AuthGuard';
import RoleBasedGuard from '../components/Guards/RoleBasedGuard';

import MainLayout from '../components/Layout/Main/MainLayout';



import LoadingScreen from '../helper/LoadingScreen';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";

import DashboardLayout from '../components/Layout/Dashboard';
import axios from 'axios';
import store from '../store';
import { loadUser } from '../actions/userAction';


const Loadable = (Component) => (props) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();


    return (
        <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
          <Component {...props} />
        </Suspense>
      );

};

export default function MyRouter(){

    const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    store.dispatch(loadUser());
    getStripeApiKey();


  },[]);
  
    return useRoutes([
        
            { 
                path:'login', 
                element : 
                <GuestGuard>
                    <Login/>
                </GuestGuard> 
            },

            { 
                path:'register',
                element :
                <GuestGuard>
                    <Register/>
                </GuestGuard>
            },


            {
                path:"me/update", 
                element:
                <AuthGuard>
                    <UpdateProfile/>
                </AuthGuard>
            },

            {
                path:"password/update",
                element:
                <AuthGuard>
                    <UpdatePassword/>
                </AuthGuard>
            },

          

           

           

            {
                path:"success", 
                element:
                <AuthGuard>
                <OrderSuccess/>
                </AuthGuard>
            },

            {
                path:"order/confirm",
                 element:
                 <AuthGuard>
                 <ConfirmOrder/>
                 </AuthGuard>
                 } ,


                


             // Dashboard Routes
            {
                path:'admin',
                element: (
                    <AuthGuard>
                      <DashboardLayout />
                    </AuthGuard>
                  ),
                children: [
                    { element: <Navigate to="/admin/dashboard" replace />, index: true },

                    { 
                        path:'dashboard',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <Dashboard/>
                        </RoleBasedGuard>
                    },

                    {
                        path:'products',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <ProductList/>
                        </RoleBasedGuard>
                    },

                    {
                        path:'product',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <NewProduct/>
                        </RoleBasedGuard>
                    },

                    {
                        path:'product/:id',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <UpdateProduct/>
                        </RoleBasedGuard>
                    },

                    {
                        path:'users',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <UsersList/>
                        </RoleBasedGuard>
                    },

                    {
                        path:'user/:id',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <UpdateUser/>
                        </RoleBasedGuard>
                    },

                    {
                        path:'reviews',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <ProductReviews/>
                        </RoleBasedGuard>

                    },

                    {
                        path:'orders',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <OrderList/>
                        </RoleBasedGuard>

                    },

                    {
                        path:'order/:id',
                        element:
                        <RoleBasedGuard accessibleRoles = {['admin']}>
                            <ProcessOrder/>
                        </RoleBasedGuard>

                    }
                ],
            },

           

          

             // Main Routes
            {
                path: '*',
                element: <LogoOnlyLayout />,
                children: [
                { path: 'coming-soon', element: <ComingSoon /> },
                { path: '404', element: <NotFound /> },
                { path: '*', element: <Navigate to="/404" replace /> },
                { path: "password/forgot", element:<ForgotPassword/>},
                { path: "password/reset/:token", element:<ResetPassword/>} ,
                { path: "cricket-products", element:<ComingSoon/>} ,
                { path: "football-products", element:<ComingSoon/>} ,

          
                ],
            },

            {
                path: '/',
                element: <MainLayout />,
                children: [
                  { element: <Home />, index: true },
                  { path: 'about-us', element: <About /> },
                  { path: 'contact-us', element: <ContactUs /> },
                  { path: 'product/:id', element:<ProductDetails/> },
                  { path: 'products', element:<Products/> },
                  { path: "products/:keyword", element:<Products/> }, 
                  { path: "/search", element: <Search/>},
                  {
                    path:"account",
                    element:
                    <AuthGuard>
                        <Profile/>
                    </AuthGuard>
                },

                {
                    path:"cart",
                    element:
                    <AuthGuard>
                        <Cart/>
                    </AuthGuard>
                },

                {
                    path:"shipping",
                     element:
                     <AuthGuard>
                     <Shipping/>
                     </AuthGuard>
                },

                {
                    path:"/process/payment",
                     element:
                     <AuthGuard>
                     <Elements stripe={loadStripe(stripeApiKey)}><Payment/> </Elements>
                     </AuthGuard>
                       


                 },

                 {
                    path:"orders", 
                    element:
                    <AuthGuard>
                    <MyOrders/>
                    </AuthGuard>
                },

                {
                    path:"order/:id",
                     element:
                     <AuthGuard>
                     <OrderDetails/>
                     </AuthGuard>
                },

                
                  
                ],
              },




           
    ])
}



// AUTHENTICATION
const Login = Loadable(lazy(() => import('../components/User/Login')));
const Register = Loadable(lazy(() => import('../components/User/Register')));

// DASHBOARD
const Dashboard = Loadable(lazy(() => import( '../components/Admin/Dashboard')));
const NewProduct = Loadable(lazy(() => import( '../components/Admin/NewProduct')));
const OrderList = Loadable(lazy(() => import( '../components/Admin/OrderList')));
const ProcessOrder = Loadable(lazy(() => import( '../components/Admin/ProcessOrder')));
const ProductList = Loadable(lazy(() => import( '../components/Admin/ProductList')));
const ProductReviews = Loadable(lazy(() => import( '../components/Admin/ProductReviews')));
const UpdateProduct = Loadable(lazy(() => import( '../components/Admin/UpdateProduct')));
const UpdateUser = Loadable(lazy(() => import( '../components/Admin/UpdateUser')));
const UsersList = Loadable(lazy(() => import( '../components/Admin/UsersList')));

// Product
// Main
const Home = Loadable(lazy(() => import( '../components/Home/Home')));
const About = Loadable(lazy(() => import( '../components/About/About')));
const ComingSoon = Loadable(lazy(() => import( '../components/About/ComingSoon')));
const ContactUs = Loadable(lazy(() => import( '../components/Contact/ContactUs')));
const NotFound = Loadable(lazy(() => import( '../components/Layout/NotFound')));
const ForgotPassword = Loadable(lazy(() => import( '../components/User/ForgotPassword')));
const ResetPassword = Loadable(lazy(() => import( '../components/User/ResetPassword')));


// 
const LogoOnlyLayout = Loadable(lazy(()=> import('../components/Layout/LogoOnlyLayout')));
const Cart = Loadable(lazy(()=> import( '../components/Cart/Cart')));
const ConfirmOrder = Loadable(lazy(()=> import( '../components/Cart/ConfirmOrder')));
const OrderSuccess = Loadable(lazy(()=> import( '../components/Cart/OrderSuccess')));
const Shipping = Loadable(lazy(()=> import( '../components/Cart/Shipping')));
const MyOrders = Loadable(lazy(()=> import( '../components/Order/MyOrders')));
const OrderDetails = Loadable(lazy(()=> import( '../components/Order/OrderDetails')));
const ProductDetails = Loadable(lazy(()=> import( '../components/Product/ProductDetails')));
const Products = Loadable(lazy(()=> import( '../components/Product/Products')));
const Search = Loadable(lazy(()=> import( '../components/Product/Search')));
const Profile = Loadable(lazy(()=> import( '../components/User/Profile')));
const UpdatePassword = Loadable(lazy(()=> import( '../components/User/UpdatePassword')));
const UpdateProfile = Loadable(lazy(()=> import( '../components/User/UpdateProfile')));
const Payment = Loadable(lazy(()=> import( '../components/Cart/Payment')));
const CheckoutSteps = Loadable(lazy(()=> import( '../components/Cart/CheckoutSteps')));

