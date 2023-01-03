import React, { useEffect } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Link, Box, Card, Typography, Grid } from '@mui/material'
import { Doughnut, Line } from "react-chartjs-2";
import 'chart.js/auto';
import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import Sidebar from './Sidebar'
import NavBar from '../Header/NavBar'

export default function Dashboard()  {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);
  
  let outOfStock = 0;
  products && products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    document.title = "Dashboard | Caper Sports"
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);


  let totalAmount = 0;
  orders && orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const lineState = {
      labels: ["Initial Amount", "Amount Earned"],
      datasets: [
        {
          label: "Total Amount",
          backgroundColor: ["tomato"],
          hoverBackgroundColor: ["rgb(197, 72, 49)"],
          data: [0, totalAmount],
        },
      ],
    };
  
    const doughnutState = {
      labels: ["Out of Stock", "In Stock"],
      datasets: [
        {
          backgroundColor: ["#00A6B4", "#6800B4"],
          hoverBackgroundColor: ["#4B5000", "#35014F"],
          data: [outOfStock, products.length - outOfStock],
          
        },
      ],
    };


  return (
    <>

  <Box display='flex' sx={{marginTop:1}}>
    <Sidebar/>
    <Grid container spacing={4} sx={{ p:{md:3.2, xs:2} }}>
      <Grid item md={12} xs={12}>
        <Typography sx={{fontSize:'1.5rem', fontWeight:'bold', color:'#00796b'}}>{`Hello, ${(user.name).split(' ')[0]}!`}</Typography>

      </Grid>
      <Grid item xs={12} md={3}>
        <Card sx={{borderRadius:2.4, display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6}}>
           <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#ede7f6'}}>
            <AccountBalanceWalletIcon fontSize='large' style={{ color:'#673ab7'}}/>
           </Box>
            <Box>
            <Typography fontSize='1.45rem' fontWeight='bold'>{`₹${totalAmount}`}</Typography>
            <Typography fontSize='1.05rem' color='text.secondary' fontWeight={500}>Total Amount</Typography>
            </Box>
        </Card>    
      </Grid>    


    <Grid item xs={12} md={3}>
    <Link sx={{color:'black'}} underline='none' component={RouterLink} to="/admin/orders">
      <Card sx={{borderRadius:2.4, display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6, ":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'}}}>
          <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#e8eaf6'}}>
          <ListIcon fontSize='large' style={{ color:'#3f51b5'}}/>
          </Box>
          <Box>
          <Typography fontSize='1.45rem'  fontWeight='bold'>{orders?.length}</Typography>
          <Typography fontSize='1.05rem' color='text.secondary' fontWeight={500} >Total Orders</Typography>
          </Box>
      </Card>  
    </Link>
   </Grid>  

    <Grid item xs={12} md={3}>
    <Link sx={{color:'black'}} underline='none' component={RouterLink} to="/admin/products">
    <Card sx={{borderRadius:2.4, display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6, ":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'}}}>
    <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#fce4ec'}}>
          <InventoryIcon fontSize='large' style={{ color:'#e91e63'}}/>
          </Box>
          <Box>
          <Typography fontSize='1.45rem' fontWeight='bold' >{products && products.length}</Typography>
          <Typography fontSize='1.05rem' color='text.secondary'  fontWeight={500} >Total Product</Typography>
          </Box>
      </Card>
      </Link>
    </Grid>
    
    <Grid item xs={12} md={3}>
    <Link  sx={{color:'black'}}underline='none' component={RouterLink} to="/admin/users">
    <Card sx={{borderRadius:2.4, display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6, ":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'}}}>
    <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#e0f2f1'}}>
          <GroupIcon  fontSize='large' style={{ color:'#009688'}}/>
          </Box>
          <Box>
          <Typography fontSize='1.45rem'  fontWeight='bold' >{users && users?.length}</Typography>
         <Typography fontSize='1.05rem' fontWeight={500} >Total Users</Typography>
        </Box>
     </Card>
     </Link>
  </Grid>

<Grid item md={8} xs={12}>
<Card sx={{borderRadius:2.4,":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'} }}>
    <Line data={lineState} />
  </Card>
</Grid>

<Grid item md={4} xs={12}>
<Card sx={{borderRadius:2.4,":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'} }}>
    <Doughnut data={doughnutState} />
  </Card>
</Grid>

</Grid>
</Box>
</>
  )
}

