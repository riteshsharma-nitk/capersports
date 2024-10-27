import React, { useEffect, useState } from "react";
import { Box, Container, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Page from "../../../helper/Page";
import useSettings from "../../../hooks/useSettings";
import HeaderBreadcrumbs from "../../../helper/HeaderBreadcrumbs";
import LoadingScreen from '../../../helper/LoadingScreen'
import { getOrderDetails, clearErrors, updateOrder } from "../../../actions/orderAction";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../../constants/orderConstants";
import { useParams } from "react-router-dom";
import Invoice from "./InvoiceDetails";
const ProcessOrder = () => {
  const { themeStretch } = useSettings();
  const [ edit, setEdit ]= useState(false)
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const {id} = useParams();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(id, myForm));
    setEdit(!edit)
  };

  useEffect(() => {
    
    if (error) {
      dispatch(clearErrors());
    }
    if (updateError) {
      dispatch(clearErrors());
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(id));
  }, [dispatch, error, id, isUpdated, updateError]);

  return (
    <>
    {loading ? (<LoadingScreen/>) : (
    <Page title="Order: View">
    <Container maxWidth='lg'>
      <HeaderBreadcrumbs
        heading="Order Details"
        links={[
          { name: 'Dashboard', href: '/admin/dashboard' },
          {
            name: 'Orders',
            href: '/admin/orders',
          },
          { name: order?._id || '' },
        ]}
      />

        {<Invoice invoice={order} edit = {edit} setEdit={setEdit} />}

         <br></br>
            
            {edit && 
        <Box component='form' onSubmit={updateOrderSubmitHandler}>
          <FormControl fullWidth>
            <InputLabel>Choose category</InputLabel>
            <Select 
            onChange={(e) => setStatus(e.target.value)}
            required
            fullWidth
            label="Choose Category"
           >
            
             <MenuItem value="">Choose Category</MenuItem>
             {order.orderStatus === "Processing" && (
             <MenuItem value="Shipped">Shipped</MenuItem>
             )}

                      {order.orderStatus === "Shipped" && (
                        <MenuItem value="Delivered">Delivered</MenuItem>
                      )}
                    </Select>
                    </FormControl>
                  
                
               
                <br></br>
                <br></br>

                  <Button variant="contained"
                  size="large"
                  fullWidth
                  sx={{backgroundColor:"black"}}
                    type="submit"
                    disabled={
                      loading ? true : false || status === "" ? true : false
                    }
                  >
                    Process
                  </Button>
                </Box>}
          
            </Container>
            </Page>)} 
        </>      
  );
};

export default ProcessOrder;