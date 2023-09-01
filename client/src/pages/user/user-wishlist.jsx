import { Container, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import UserNavs from '../../components/nav/user-navs'
import LoadingSipner from '../../components/spin/spin'
import WishlistCardComponent from '../../components/wishlist/wishlist-card-component'
import { getWishlistFromB, removeFromWishlist } from '../../services/wishlist-service'

const UserWishlist = () => {
    const[wishlist,setWishlist]=useState([])
    const[loading,setLoading]=useState(false)
    const {authUserToken}=useSelector((state)=>state.user)

    const fetchWishlist=()=>{
        setLoading(true)
        getWishlistFromB(authUserToken).then((res)=>{
            setLoading(false)
            setWishlist(res.data.wishlist)
        }).catch((err)=>{console.log("get wishlist error",err.message);})
    }

    const handleRemoveFromWishList=(productId)=>{
        removeFromWishlist(productId,authUserToken).then((res)=>{
            if(res.data.DeleteProductFromWishList===true){
                toast.success(`Item is remove from wishlist`)
                fetchWishlist()
            }
        }).catch(err=>console.log("wihslist remvoe error",err.message))
    }
    useEffect(()=>{
        fetchWishlist();
    },[])
  return (
    <Container disableGutters={true}>
        <Grid container >
            <Grid item  lg={2} md={2} sm={12}>
                <UserNavs/>
            </Grid>
            
            <Grid item container lg={10} md={10} sm={12}>
                <Grid item lg={12} sm={12} md={12} xs={12}>
                    <Typography component={'h6'} variant='h6'>
                        Wishlist Products
                    </Typography>
                </Grid>
                <Grid item lg={1} md={1} sm={2} xs={2} ></Grid>
                <Grid item container lg={10} md={10} sm={10} xs={10}>

                    {loading ? <LoadingSipner/>:(
                        wishlist.map((product)=>{
                            return <WishlistCardComponent product={product} key={product._id} handleRemoveFromWishList={handleRemoveFromWishList}/>
                        })  
                    )}
                </Grid>
                <Grid item lg={1} md={1} sm={0} xs={0}  ></Grid>
                
            </Grid>
                
        </Grid>
    </Container>
    )
}


export default UserWishlist