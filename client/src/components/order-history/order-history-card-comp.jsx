import React from 'react'
import OrderItemComp from '../order-item/order-item-comp';
import { Button, Card, CardContent, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import OrderItemOrderComp from '../order-item/order-item-order-comp';
// import { Card } from 'antd'


const OrderHistoryCardComp = ({order}) => {
    const {products,paymentIntent}=order;
  return (
    <Grid item lg={12}
        // title={"Show payment info"}
    
        sx={{marginBottom:'30px',boxShadow:"0 4px 8px 0 rgba(0,0,0,0.2)",}}
        >
    {/* <CardContent> */}

   
    <h6  className='p-2 text-center'>Order Details</h6>
    <TableContainer component={Paper} sx={{}}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead sx={{backgroundColor:'#D3D8E2',}}>
          <TableRow >
            <TableCell align='left' sx={{whiteSpace:'nowrap'}}>Order Id</TableCell>
            <TableCell align="left" sx={{whiteSpace:'nowrap'}} >Order Status</TableCell>
            <TableCell align="center"  sx={{whiteSpace:'nowrap'}}>Payment Method</TableCell>
            <TableCell align="right">Payment</TableCell>
            <TableCell align="center" sx={{whiteSpace:'nowrap'}} > Order Date</TableCell>
            <TableCell align="right">Currency</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          <OrderItemOrderComp order={order}/>                     
          
        </TableBody>
      </Table>
    </TableContainer>
    <h6  className='p-2 text-center'>Products Details</h6>
    <TableContainer component={Paper} sx={{}}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead sx={{backgroundColor:'#D3D8E2',}}>
          <TableRow >
            <TableCell align='center'>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="center" sx={{width:'100px'}}> Color</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Sipping</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
           {products&&products.map((item) => (
               <OrderItemComp item={item} key={item._id}/>
               ))}                       
          
        </TableBody>
      </Table>
    </TableContainer>
    
    <h6 style={{padding:'20px'}}>Total Amount Paid: ${paymentIntent.amount/100}</h6>
    <Button fullWidth size='small' variant='contained' color='success'>Download PDF</Button>
     {/* </CardContent> */}
    </Grid>
    
  )
}

export default OrderHistoryCardComp