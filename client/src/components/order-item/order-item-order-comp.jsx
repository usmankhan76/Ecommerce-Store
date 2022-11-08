import {  Table,  TableCell,  TableRow } from '@mui/material'
import React from 'react'

const OrderItemOrderComp = ({order}) => {
    const{orderStatus,paymentIntent}=order
    console.log("orrder adn order", order);
    const {id,currency,payment_method_types,status,created}=paymentIntent
  return (
    
    <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            //   hover={true}
              
            >
              <TableCell style={{whiteSpace:'nowrap'}} align="left">{id}</TableCell>
              <TableCell align="center">&nbsp;{orderStatus}</TableCell>
              <TableCell align="center">{payment_method_types[0]}</TableCell>
             
              <TableCell align="right" >{status}</TableCell>
              <TableCell align="right" sx={{whiteSpace:'nowrap'}} >{new Date(created*1000).toLocaleString()}</TableCell>
              <TableCell align="right" >{currency}</TableCell>
              
            
            </TableRow>
  )
}

export default OrderItemOrderComp