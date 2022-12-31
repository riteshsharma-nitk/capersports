import React from "react";
import {Link as RouterLink} from 'react-router-dom'
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Button, Container, Link, styled, Typography } from "@mui/material";
import { MotionContainer } from "../../helper/animate";


const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  height: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

const NotFound = () => {
  return (
    <RootStyle>
      <Container component={MotionContainer}>
      <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <div >
              <Typography variant="h3" paragraph>
                Sorry, page not found!
              </Typography>
            </div>
            <Typography sx={{ color: 'text.secondary' }}>
              Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve mistyped the URL? Be sure to check
              your spelling.
            </Typography>

            <br></br>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              Go to Home
            </Button>
          </Box>

        </Container>

   
    </RootStyle>
  );
};

export default NotFound;