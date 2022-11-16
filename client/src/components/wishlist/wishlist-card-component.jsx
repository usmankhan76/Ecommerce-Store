import React from 'react'
import { Button, Grid } from '@mui/material'
import ProductCard from "../product-card/product-card"

const WishlistCardComponent = ({product,handleRemoveFromWishList}) => {

   
  return (
    <Grid item lg={4} md={4} sm={6} xs={12}>
        <ProductCard product={product}/>
        <Button 
            variant='contained' 
            color="error" 
            onClick={()=>handleRemoveFromWishList(product._id)}
            sx={{width:"250px",height:'25px',marginTop:'-40px' }}>
                Remove From Wishlist
        </Button>
    </Grid>
  )
}

export default WishlistCardComponent