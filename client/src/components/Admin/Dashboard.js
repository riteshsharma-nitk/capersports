import React, { useEffect, useState } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Link, Box, Card, Typography, Grid, CardHeader, TextField, useTheme, styled, Container } from '@mui/material'
import merge from 'lodash/merge';
import { alpha } from '@mui/material/styles';


import InventoryIcon from '@mui/icons-material/Inventory';
import GroupIcon from '@mui/icons-material/Group';
import ListIcon from '@mui/icons-material/List';
import { useSelector, useDispatch } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { getAllUsers } from "../../actions/userAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import ReactApexChart from 'react-apexcharts';
import { BaseOptionChart } from '../../helper/chart';
import { fNumber, fPercent } from '../../utils/formatNumber';
import Page from '../../helper/Page';
import { Stack } from '@mui/system';
import Iconify from '../../helper/Iconify';
import WelcomeDashboard from './WelcomeDashboard';

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: theme.spacing(1),
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16),
}));

const CHART_DATA = [
  {
    year: 2019,
    data: [
      { name: 'Cricket', data: [10, 41, 35, 51, 49, 62, 69, 91, 148] },
      { name: 'Football', data: [10, 34, 13, 56, 77, 88, 99, 77, 45] },
    ],
  },
  {
    year: 2020,
    data: [
      { name: 'Cricket', data: [148, 91, 69, 62, 49, 51, 35, 41, 10] },
      { name: 'Football', data: [45, 77, 99, 88, 77, 56, 13, 34, 10] },
    ],
  },
];

const CHART_HEIGHT = 392;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible',
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`,
  },
}));


export default function Dashboard()  {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.allUsers);
  const { orders } = useSelector((state) => state.allOrders);
  const { user } = useSelector((state) => state.user);

  const [seriesData, setSeriesData] = useState(2019);

  
  let outOfStock = 0;
  products && products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers());
  }, [dispatch]);


  let totalAmount = 0;
  orders && orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

    const theme = useTheme();

    const CHART_DATA1 = [outOfStock, products.length - outOfStock]
    const handleChangeSeriesData = (event) => {
      setSeriesData(Number(event.target.value));
    };
  
    const chartOptions = merge(BaseOptionChart(), {
      xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
      },
    });


    const chartOptions1 = merge(BaseOptionChart(), {
      colors: [
        theme.palette.primary.lighter,
        theme.palette.primary.light,
       
      ],
      labels: ['Out of stock', 'In stock'],
      stroke: { colors: [theme.palette.background.paper] },
      legend: { floating: true, horizontalAlign: 'center' },
      tooltip: {
        fillSeriesColor: false,
        y: {
          formatter: (seriesName) => fNumber(seriesName),
          title: {
            formatter: (seriesName) => `${seriesName}`,
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: '90%',
            labels: {
              value: {
                formatter: (val) => fNumber(val),
              },
              total: {
                formatter: (w) => {
                  const sum = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return fNumber(sum);
                },
              },
            },
          },
        },
      },
    });
  

  return (
    <Page title="Dashboard">
      <Container maxWidth='xl'>
        <Box display='flex'>
          <Grid container spacing={3}>

          <Grid item xs={12} md={8}>
              <WelcomeDashboard user = {user}/>
          </Grid>
         

          <Grid item xs={12} md={4}>
              <Card sx={{ display: 'flex', alignItems: 'center', p: 3,height: { xs: 280, xl: 320 } }}>
                <Box sx={{flexGrow:1}}>
                <Typography sx={{mb:2}} variant='subtitle2'>Total Amount</Typography>
                <Typography variant='h3'>{`₹${totalAmount}`}</Typography>
                
                <Stack direction="row" alignItems="center" sx={{mt:2}}>
                <IconWrapperStyle sx={{
              ...(2.4 < 0 && {
                color: 'error.main',
                bgcolor: (theme) => alpha(theme.palette.error.main, 0.16),
              }),
            }}
          >
            <Iconify width={16} height={16} icon={2.4 >= 0 ? 'eva:trending-up-fill' : 'eva:trending-down-fill'} />
          </IconWrapperStyle>
          <Typography variant="subtitle2" component="span">
            {2.4 > 0 && '+'}
            {fPercent(2.4)}
          </Typography>

          <Typography variant="body2" component="span" noWrap sx={{ color: 'text.secondary' }}>
            &nbsp;than last week
          </Typography>

                </Stack>

               </Box>
               <Box sx={{padding:4, borderRadius:'50%', backgroundColor:'#ede7f6'}}>
               <AccountBalanceWalletIcon fontSize='large' style={{ color:'#673ab7'}}/>
               </Box>
         
        </Card>    
      </Grid>    


    <Grid item xs={12} md={4}>
    <Link sx={{color:'black'}} underline='none' component={RouterLink} to="/admin/orders">
      <Card sx={{display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6, ":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'}}}>
          <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#e8eaf6'}}>
          <ListIcon fontSize='large' style={{ color:'#3f51b5'}}/>
          </Box>
          <Box>
          <Typography variant='h3' >{orders?.length}</Typography>
          <Typography variant='subtitle2'  >Total Orders</Typography>
          </Box>
      </Card>  
    </Link>
   </Grid>  

    <Grid item xs={12} md={4}>
    <Link sx={{color:'black'}} underline='none' component={RouterLink} to="/admin/products">
    <Card sx={{ display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6, ":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'}}}>
    <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#fce4ec'}}>
          <InventoryIcon fontSize='large' style={{ color:'#e91e63'}}/>
          </Box>
          <Box>
          <Typography variant='h3' >{products && products.length}</Typography>
          <Typography variant='subtitle2'  fontWeight={500} >Total Product</Typography>
          </Box>
      </Card>
      </Link>
    </Grid>
    
    <Grid item xs={12} md={4}>
    <Link  sx={{color:'black'}}underline='none' component={RouterLink} to="/admin/users">
    <Card sx={{ display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6, ":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'}}}>
    <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#e0f2f1'}}>
          <GroupIcon  fontSize='large' style={{ color:'#009688'}}/>
          </Box>
          <Box>
          <Typography variant='h3' >{users && users?.length}</Typography>
         <Typography variant='subtitle2' >Total Users</Typography>
        </Box>
     </Card>
     </Link>
  </Grid>

<Grid item md={8} xs={12}>


<Card>
      <CardHeader
        title="Total Earnings"
        subheader="(+43%) than last year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': {
                pl: 1,
                py: 0.5,
                pr: '24px !important',
                typography: 'subtitle2',
              },
              '& .MuiOutlinedInput-root': {
                borderRadius: 0.75,
                bgcolor: 'background.neutral',
              },
              '& .MuiNativeSelect-icon': {
                top: 4,
                right: 0,
                width: 20,
                height: 20,
              },
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>



</Grid>

<Grid item md={4} xs={12}>


<Card>
      <CardHeader title="Stock Monitor" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA1} options={chartOptions1} height={280} />
      </ChartWrapperStyle>
    </Card>
</Grid>

</Grid>
</Box>
</Container>
</Page>
  )
}

