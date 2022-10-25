import { Button, Container, FormControl, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import CheckoutCard from '../components/checkout-card/checkout-card'
import EmptyCartDialogComp from '../components/empty-cart-dialog/empty-cart-dialog-comp'
import UserAddressFormComp from '../components/user-address-form/user-address-form-comp'
import { addToCart } from '../redux/features/cart/cart-slice'
import { setCouponApply } from '../redux/features/coupon/coupon-slice'
import { emptyCart, getUserCart } from '../services/cart-service'
import { applyCouponOnTotal } from '../services/coupon-services'

const CheckoutPage = () => {
    // const cart=useSelector(state=>state.cart)
    const [products,setProducts]=useState([])
    const dispatch=useDispatch();
    const [productsTotal,setProductsTotal]=useState('')
    const [productsTotalAfterDiscount,setProductsTotalAfterDiscount]=useState(0)
    const [givenCoupon,setGiveCoupon]=useState('')
    const state=useSelector(state=>state  );
    const {authUserToken}=state.user
    const {couponIsApplied,orderConfirmed}=state.coupon
    const navigate=useNavigate()
    const [dialogOpen,setDialogOpen]=useState(false)
  //   const getTotal=()=>{
  //  return products.reduce((cu,ac)=>{
  //   return cu+(ac.count*ac.price)
  //  },0)
  
  // }

  

  const getCartFromDb=()=>{
    getUserCart(authUserToken).then((res)=>{
      console.log("response data userCart",res.data)
      const {products,cartTotal}=res.data
      setProducts(products)
      dispatch(addToCart(products.product))
      setProductsTotal(cartTotal)
    }).catch(err=>console.log('getCart error',err.message))
  }
  const handleEmptyCart=()=>{
    emptyCart(authUserToken).then((res)=>{
      console.log("empty response",res.data) 
      setProducts([])
      dispatch(addToCart([]))
      setProductsTotal(0)
      if(typeof window !== 'undefined'){
        localStorage.removeItem('cart')
      }
      toast.info("Your cart is empty now")
      setDialogOpen(false)
      // setProductsTotalAfterDiscount(0)
      navigate('/cart')
    })
  }
  const handleCouponChange=(e)=>{
    setGiveCoupon(e.target.value)
  }
  const handleCouponApply=()=>{
    applyCouponOnTotal(givenCoupon,authUserToken).then((res)=>{
      if(res.data.err==='coupon is invalid'){
        toast.error('Invalid coupon')
        dispatch(setCouponApply(false))
        return
      }
      else{
        setProductsTotalAfterDiscount(res.data)
        console.log('else is running')
        toast.success('Coupon is applied successfuly')
        dispatch(setCouponApply(true))
        setGiveCoupon('')
      }

    }).catch((err)=>{
      console.log("conpon apply error ",err.message)
    })
  }
      console.log('res apply coupon',productsTotalAfterDiscount)
      console.log("coupone reduxe",couponIsApplied)
  useEffect(()=>{
    getCartFromDb()
  },[])
  return (
    <Container  disableGutters={true} >
        <Grid container  style={{marginTop:'5px'}}>
            <Grid item container xs={12} md={8} lg={8} style={{padding:'5px'}} >
                 <Grid item lg={12} xs={12} md={12} xl={12}   >
                    <Typography  variant='h5'>Checkout</Typography>
                    <hr />
                    {!products.length?(<p>
                    No Products in Cart <Link to={'/shop'}>Continue Shopping</Link>
                  </p>):(
                    <div style={{padding:'30px'}} >
                      <>
                    <UserAddressFormComp/>
                      </>
                    </div>
              
                   
                  )}
                       
                </Grid>
                {/* <Grid item lg={12} xs={12} md={12} xl={12} sx={{backgroundColor:'green'}}>
                 
                </Grid> */}
                <Grid item  lg={12} xs={12} md={12} >
                    <div style={{paddingLeft:'30px',paddingRight:'30px',marginBottom:'30px'}}>
                    <Typography component='h5' variant='h5'>Got Coupen?</Typography>
                      <Grid item lg={12} xs={12} sm={12}>
                        <TextField  
                            value={givenCoupon} 
                            fullWidth={true} 
                            variant="standard"
                            style={{marginBottom:'10px'}} 
                            label='Apply Coupon'
                            onChange={handleCouponChange}/>
                        <Button  
                            variant='contained' 
                            disabled={givenCoupon===''} 
                            onClick={handleCouponApply} >
                              Apply
                        </Button>
                      </Grid>
                    </div>
                    
                </Grid>
            </Grid>
            
            <Grid item container  xs={12} md={4} lg={4} style={{padding:'5px'}} >
                <Grid item lg={12} xs={12} md={12} >
                    <Typography component='h5' variant='h5'>Order Summery</Typography>
                    <hr />
                      
                     {products && products.length>0 ? (
                        products.map((cart,i)=>(
                              <div key={i}>
                                <CheckoutCard product={cart.product} count={cart.count}/>
                              </div>))
                        ):("No Prodcust in Cart")}

                  <hr />
                  Total: <b>$ {productsTotal}</b>  
                  <hr />
                  {productsTotalAfterDiscount > 0 &&  couponIsApplied && (
                    <p className='bg-success p-2'>
                    Total After Discoun:${productsTotalAfterDiscount}
                    </p>
                  )}

                  <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                     <Button
                          color='success'
                          variant='contained' 
                          // disabled={!products.length}
                          disabled={!orderConfirmed}
                          onClick={()=>navigate('/payment')}
                          >
                            Order Now
                     </Button>
                    {/* <Button variant='contained' color='error' onClick={handleEmptyCart} disabled={products.product && !products.product.length}>
                            Empty  Cart
                     </Button> */}
                  <EmptyCartDialogComp  
                      open={dialogOpen} 
                      setOpen={setDialogOpen} 
                      handleEmptyCart={handleEmptyCart}
                      products={products}/>
                  </div>
                </Grid>
                <Grid item lg={12} xs={12} md={12}>
                 
                </Grid>

            </Grid>
        </Grid>

    </Container>
  )
}

export default CheckoutPage