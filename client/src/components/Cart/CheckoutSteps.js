import React from "react";
import { Typography, Stepper, StepLabel, Step, Grid, Container } from"@mui/material";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Page from "../../helper/Page";
import HeaderBreadcrumbs from "../../helper/HeaderBreadcrumbs";

const CheckoutSteps = ({ activeStep }) => {

  const steps = [
    {
      label: <Typography>Shipping Details</Typography>,
      icon: <LocalShippingIcon />,
    },
    {
      label: <Typography>Confirm Order</Typography>,
      icon: <LibraryAddCheckIcon />,
    },
    {
      label: <Typography>Payment</Typography>,
      icon: <AccountBalanceIcon />,
    },
  ];

  const stepStyles = {
    boxSizing: "border-box",
  };

  return (
    <Page title="Checkout">
      <Container maxWidth='lg' sx={{mt:'100px'}}>
      <HeaderBreadcrumbs
          heading="Checkout"
          links={[
            { name: 'Home', href: '/' },
            {
              name: 'Products',
              href: 'products',
            },
            { name: 'Checkout' },
          ]}
        />



    <Grid container justifyContent='center'>
      <Grid item xs={12} md={8} sx={{ mb: 5 }}>

    <Stepper alternativeLabel activeStep={activeStep} style={stepStyles}>
        {steps.map((item, index) => (
          <Step
            key={index}
            active={activeStep === index ? true : false}
            completed={activeStep >= index ? true : false}
          >
            <StepLabel
              sx={{
                color: activeStep >= index ? '#00AB55': "rgba(0, 0, 0, 0.649)",
                typography:'subtitle2'
              }}
              icon={item.icon}
            >
              {item.label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      </Grid>
    </Grid>
    </Container>
    </Page>
  );
};

export default CheckoutSteps;