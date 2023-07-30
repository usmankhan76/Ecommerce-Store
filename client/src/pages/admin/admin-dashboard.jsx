import React, { useEffect, useState } from 'react'
import {  Container, Grid, Paper, Table, TableBody, TableCell, TableContainer,  TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNavs from '../../components/nav/admin-navs'
import LoadingSipner from '../../components/spin/spin'
import { getOrdersFromB, updateOrderStatusInB } from '../../services/admin-service'
import OrderItemOrderComp from '../../../src/components/order-item/order-item-order-comp'
import OrderItemComp from '../../components/order-item/order-item-comp'
import ResponsiveDrawer from '../../components/user-side-nav/user-side-nav-comp'
import Header from '../../components/nav/Header-bots'

const AdminDashboard = () => {
  const {authUserToken}=useSelector((state)=>state.user)
  const [orders,setOrders]=useState([]);
  const [loading,setLoading]=useState(false)
  
  const fetchOrders=()=>{
    setLoading(true)
    getOrdersFromB(authUserToken).then((res)=>{
      setLoading(false)
      setOrders(res.data)
    })
  }
  // console.log('getting order',orders); 
  const handleOrderStatusChange=(orderId,orderStatus)=>{
    updateOrderStatusInB(authUserToken,orderId,orderStatus).then((res)=>{
      toast.success("Order status updated successfully")
      fetchOrders()
    }).catch((err)=>{
      console.log("handle order status change error",err.message);
    })
  }
  useEffect(()=>{
    fetchOrders()
  },[])
  return (<>
   {/* <div className="container-fluid">
        <div className="row">
            <div className="col-md-2" >
                <AdminNavs/>
            </div>
              
                
                  <div className="col">
                  <h3>Admin DashBoard</h3>
                  
                
                 </div>
              
              
              
            
        </div>
    </div> */}
   
     <Container disableGutters={true} >
    {/* <Grid container > */}
        <Grid container   >
            <Grid item lg={2} sm={12} xl={2} xs={12}>
                <AdminNavs/>
            </Grid>
            <Grid item container lg={10} sm={12} xs={12} xl={10}>
              

               <Grid item lg={12} md={12} sm={12} xs={12}>
                
                <h4 className='p-2 '>
                    {orders.length>0?(`${orders.length} Purchase Orders`):"No Purchase Orders"}
                </h4>
               </Grid>
                <Grid item container  lg={12} sm={12} xs={12} >
                <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
                <Grid item lg={10} md={10} sm={12} xs={12} >
                    {loading?<LoadingSipner/> : orders.map((order,i)=>{
                      return<div key={i} style={{marginBottom:'20px'}}>
                      <TableContainer component={Paper} sx={{}}>
                          <h6  className='p-2 text-center'>Orders</h6>
                        <Table sx={{ minWidth: 650 }}  aria-label="simple table">
                          <TableHead sx={{backgroundColor:'#D3D8E2',}}>
                            <TableRow >
                              <TableCell align='left' sx={{whiteSpace:'nowrap'}}>Order Id</TableCell>
                              <TableCell align="left" sx={{whiteSpace:'nowrap',}} >Order Status</TableCell>
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
                          <div className="input-group mb-3" style={{width:"100%", }}>
                                      <label htmlFor='shipping' className='input-group-text'>Updat Order Status</label>
                                          <select name='shipping'
                                          className='form-select'
                                          defaultValue={order.orderStatus}
                                          onChange={(e)=>handleOrderStatusChange(order._id,e.target.value)}
                                          >
                                              <option value='none'  selected disabled hidden >Set Status</option>
                                              <option value="Not Processed">Not Processed</option>
                                              <option value="Cash On Delivery">Cash On Delivery</option>
                                              <option value="Processing">Processing</option>
                                              <option value="Dispatched">Dispatched</option>
                                              <option value="Completed">Completed</option>
                                              <option value="Canceled">Canceled</option>

                                          </select>
                                    </div>
                      </TableContainer>
                      <h6  className='p-2 text-center'>Products Details</h6>
                    {order.products.length>0&&  <TableContainer component={Paper} sx={{}}>
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
                            {order.products&&order.products.map((item) => (
                                <OrderItemComp item={item} key={item._id}/>
                                ))}                       
                            
                          </TableBody>
                        </Table>
                      </TableContainer>}
                        </div>
                    })}

               
                </Grid>
                <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
                 </Grid>

            </Grid>
        </Grid>
    {/* </Grid> */}
    </Container>
  </>
  )
}

export default AdminDashboard