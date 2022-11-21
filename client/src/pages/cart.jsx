import { Button, Container,  Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CartProductItem from '../components/cart-product-item/cart-product-item-comp';
import { saveCartToDb } from '../services/cart-service';
import LoadingButton from '@mui/lab/LoadingButton';
import { setCashOnD } from '../redux/features/cashOnDelivery/cashOnDelivery-slice';

const CartPage = () => {
  const state=useSelector(state=>state)
  const [loading,setLoading]=useState(false)
  const [loading2,setLoading2]=useState(false)
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const cart=state.cart
  const {authUserToken}=state.user;
  const {loginUser}=state.user
  const getTotal=()=>{
   return cart.reduce((cu,ac)=>{
    return cu+(ac.count*ac.price)
   },0)
  }
  const handleLogin=()=>{
    return navigate('/login',{state:{goBack: `/cart`}})
  }

  

  const handleProceedToCheckout=()=>{
    setLoading(true)
    dispatch(setCashOnD(false))
    saveCartToDb(cart,authUserToken).then((res)=>{
      if(res.data.ok){
    setLoading(false)
        return navigate('/checkout')
      }
    })
    // return navigate('/checkout')
  }
   const handleCashOnD=()=>{
    setLoading2(true)
    dispatch(setCashOnD(true))
    saveCartToDb(cart,authUserToken).then((res)=>{
      if(res.data.ok){
    setLoading2(false)
        return navigate('/checkout')
      }
    })
    // return navigate('/checkout')
  }
  
  const ShowProductCart=()=>{
   return <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}  aria-label="simple table">
        <TableHead sx={{backgroundColor:'#2596be',}}>
          <TableRow >
            <TableCell align='center'>Image</TableCell>
            <TableCell align="left">Title</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="right">Brand</TableCell>
            <TableCell align="center" sx={{width:'100px'}}> Color</TableCell>
            <TableCell align="right">Count</TableCell>
            <TableCell align="right">Sipping</TableCell>
            <TableCell align="right">Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((product) => (
            <CartProductItem product={product} key={product._id}/>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  }

  return (
    <>
   
    {/* style={{border:'2px solid'}} */}
    <Container  disableGutters={true}>
        <Grid container  style={{marginTop:'5px'}}>
            <Grid item container xs={12} md={8} lg={8} style={{padding:'5px',}} >
                {/* <Grid item lg={12} xs={12} md={12} style={{backgroundColor:'green' ,}}>
                    <Typography component='h5' variant='h5' >Cart Products</Typography>
                    <hr />
                </Grid>
                  
                <Grid item lg={12} xs={12} md={12}>
                  {!cart.length?(<p>
                    No Products in Cart <Link to={'/shop'}>Continue Shopping</Link>
                  </p>):(ShowProductCart())}
                    
                </Grid> */}
                 <Grid item lg={12} xs={12} md={12} >
                    <Typography component='h5' variant='h5'>Cart Products</Typography>
                    <hr />
                </Grid>
                <Grid item lg={12} xs={12} md={12}>
                 {!cart.length?(<p>
                    No Products in Cart <Link to={'/shop'}>Continue Shopping</Link>
                  </p>):(ShowProductCart())}
                  
                  
                </Grid>
            </Grid>
            <Grid item container  xs={12} md={4} lg={4} style={{padding:'5px',}} >
                <Grid item lg={12} xs={12} md={12} >
                    <Typography component='h5' variant='h5'>Order Summery</Typography>
                    <hr />
                     {cart && cart.length>0 ? (
                        cart.map((c,i)=>(
                              <div key={i}>
                                <p>{c.title} x {c.count} = ${c.count * c.price }</p>
                              </div>))
                        ):("No Prodcust in Cart")}

                  <hr />
                  Total: <b>${getTotal()}</b>  
                  <hr />
                  {loginUser ?(
                      <>
                        <LoadingButton 
                            // style={{backgroundColor:'#004080',}}
                            color='success'
                            variant='contained' 
                            disabled={!cart.length ||loading2}
                            loading={loading}
                            onClick={handleProceedToCheckout}
                            fullWidth
                            >
                                   Proceed to Checkout
                            
                        </LoadingButton>
                        <br/>
                        <LoadingButton 
                            // style={{backgroundColor:'#004080',}}
                            color='success'
                            variant='contained' 
                            disabled={!cart.length || loading}
                            loading={loading2}
                            onClick={handleCashOnD}
                            sx={{marginTop:'10px',}}
                            fullWidth={true}
                            >
                                  Pay Cash On Delivery
                            
                        </LoadingButton>
                      </>
                    ):(
                        <Button 
                            color='info' 
                            variant='contained' 
                            onClick={handleLogin}  //one method to come back afeter login
                          
                            > 
                            Login to Checkout
                          
                        </Button>
                    ) }
                            
                </Grid>
                <Grid item lg={12} xs={12} md={12}>
                 
                </Grid>

            </Grid>
        </Grid>

    </Container>
    </>
  )
}

export default CartPage


