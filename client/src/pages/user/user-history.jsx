
import { Container, Grid } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import UserNavs from '../../components/nav/user-navs'
import OrderHistoryCardComp from '../../components/order-history/order-history-card-comp'
import LoadingSipner from '../../components/spin/spin'
import { getUserOrders } from '../../services/order-service'

const UserHistory = () => {
    const [orders,setOrders]=useState([])
    const [loading,setLoading]=useState(false)
    const {authUserToken}=useSelector((state)=>state.user)
    const fetchOrders=async()=>{
        setLoading(true)
       return getUserOrders(authUserToken).then((res)=>{
            setLoading(false)
           return setOrders(res.data)
        }).catch((err)=>{console.log("getUser order error",err.message);})
    }
    useEffect(()=>{
        fetchOrders();
    },[])

  return (
    <Container disableGutters={true} >
    {/* <Grid container > */}
        <Grid container  >
            <Grid item lg={2} sm={12} xl={2} xs={12}>
                <UserNavs/>
            </Grid>
            <Grid item container lg={10} sm={12} xs={12} xl={10}>
               <Grid item lg={12} md={12} sm={12} xs={12}>
                
                <h4 className='p-2 '>
                    {orders.length>0? (`${orders.length} Purchase Orders`):"No Purchase Orders"}
                </h4>
               </Grid>
                <Grid item container  lg={12} sm={12} xs={12} >
                <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
                <Grid item lg={10} md={10} sm={12} xs={12} >
                    {loading?<LoadingSipner/> : orders.map((order,i)=>{
                        return<OrderHistoryCardComp key={i} order={order}/>
                    })}

               
                </Grid>
                <Grid item lg={1} md={1} sm={0} xs={0}></Grid>
                 </Grid>

            </Grid>
        </Grid>
    {/* </Grid> */}
    </Container>
    )
}


export default UserHistory