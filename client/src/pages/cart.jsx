import { Button, Container, CssBaseline, Grid, Typography } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import CheckoutProductItem from '../components/checkout-item/checkout-product-item';

const CartPage = () => {
  const state=useSelector(state=>state)
  const navigate=useNavigate()
  const cart=state.cart
  const {loginUser}=state.user
  const getTotal=()=>{
   return cart.reduce((cu,ac)=>{
    return cu+(ac.count*ac.price)
   },0)
  }
  const handleLogin=()=>{
    return navigate('/login',{state:{goBack: `/cart`}})
  }

  function createData(Image, Title, Price, Brand, Color,Count, Shipping,Remove) {
  return { Image, Title, Price, Brand, Color,Count, Shipping,Remove};
}
  
const rows = [
  createData('Frozen yoghurt', 11, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const [age, setAge] = React.useState('');

  
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
            <CheckoutProductItem product={product} key={product._id}/>
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
                        <Button color='secondary' variant='contained' disabled={!cart.length}>
                            Proceed to Checkout
                        </Button>
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


