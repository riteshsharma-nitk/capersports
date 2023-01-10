import React, { useEffect, useState } from 'react'
import {Link as RouterLink} from 'react-router-dom'
import {Link, Box, Card, Typography, Grid, CardHeader, TextField, useTheme, styled } from '@mui/material'
import merge from 'lodash/merge';


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
import { fNumber } from '../../utils/formatNumber';

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

// const lineState = {
//   labels: ["Initial Amount", "Amount Earned"],
//   datasets: [
//     {
//       label: "Total Amount",
//       backgroundColor: ["tomato"],
//       hoverBackgroundColor: ["rgb(197, 72, 49)"],
//       data: [0, totalAmount],
//     },
//   ],
// };

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
    document.title = "Dashboard | Caper Sports"
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
    <>

  <Box display='flex' sx={{marginTop:1}}>
    {/* <Sidebar/> */}
    <Grid container spacing={4} sx={{ p:{md:3.2, xs:2} }}>
      <Grid item md={12} xs={12}>
        <Typography variant='h4'>{`Hello, ${(user.name).split(' ')[0]}!`}</Typography>

      </Grid>
      <Grid item xs={12} md={3}>
        <Card sx={{borderRadius:2.4, display: 'flex', justifyContent:'center', alignContent:'center', columnGap:4, paddingTop:6, paddingBottom:6}}>
           <Box sx={{padding:2, borderRadius:'50%', backgroundColor:'#ede7f6'}}>
            <AccountBalanceWalletIcon fontSize='large' style={{ color:'#673ab7'}}/>
           </Box>
            <Box>
            <Typography variant='h3'>{`₹${totalAmount}`}</Typography>
            <Typography variant='subtitle2'>Total Amount</Typography>
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
          <Typography variant='h3' >{orders?.length}</Typography>
          <Typography variant='subtitle2'  >Total Orders</Typography>
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
          <Typography variant='h3' >{products && products.length}</Typography>
          <Typography variant='subtitle2'  fontWeight={500} >Total Product</Typography>
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
          <Typography variant='h3' >{users && users?.length}</Typography>
         <Typography variant='subtitle2' >Total Users</Typography>
        </Box>
     </Card>
     </Link>
  </Grid>

<Grid item md={8} xs={12}>
{/* <Card sx={{borderRadius:2.4,":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'} }}>
    <Line data={lineState} />
  </Card> */}

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
{/* <Card sx={{borderRadius:2.4,":hover" :{boxShadow:'rgba(0, 0, 0, 0.35) -1px 10px 29px 0px'} }}>
    <Doughnut data={doughnutState} />
  </Card> */}

<Card>
      <CardHeader title="Stock Monitor" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="donut" series={CHART_DATA1} options={chartOptions1} height={280} />
      </ChartWrapperStyle>
    </Card>
</Grid>

</Grid>
</Box>
</>
  )
}

