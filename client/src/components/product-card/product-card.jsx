import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useState } from 'react'
import { Link, useNavigate,  } from 'react-router-dom'
import dummy from '../../assets/dummy.jpg'
import { AverageRating } from '../../services/rating'
import _ from 'lodash'
import { Tooltip } from '@mui/material'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/features/cart/cart-slice'
import { showDarwer } from '../../redux/features/drawer/drawer.slice'


const ProductCard = ({product}) => {
  
  const {title,images,description,slug,price}=product
  const [tooltipText,setTooltipText]=useState('Click To Add')
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleAddToCart=()=>{
    let cart=[];
    if(typeof window !== 'undefined'){
      if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0 ){
        // if cart is in localStorage get it
        cart=JSON.parse(localStorage.getItem('cart'))
        // cart=localStorage.getItem('cart')


      }
    
        if(cart.length>0){
          let findPorduct=cart.find((item)=>item._id===product._id)
         dispatch(showDarwer(true))
          setTooltipText("Already Added")
        }else{


          cart.push({...product,count:++product.count|| 1})
          let unique= _.uniqWith(cart, _.isEqual)
          localStorage.setItem('cart',JSON.stringify(unique))
          dispatch(addToCart(unique))
  
  
          dispatch(showDarwer(true))
          setTooltipText("Added")
        }
        
        
      
      
    }
  }
  
  const handleClickCard=()=>{
    return navigate(`/product/${slug}` )
  }

 
  return (
    <>
       {product && product.ratings && product.ratings.length>0 ?(
            AverageRating(product)):(
                <div className="text-center pt-1 pb-3">
                    No Rating Yet
                </div>)}
     <Card
        hoverable
        bordered={true}
        style={{
            width: '250px',
            marginTop:'10px',
            marginBottom:'20px',
            // border:'solid',
            // borderRadius:"10px"
            
        }}
        cover={<img alt="example" src={images&& images.length?images[0].url:dummy}  
                style={{width:'100%',height:'150px',objectFit:'cover',}} 
              />}

      actions={[
      <Link to={`/product/${slug}`} style={{textDecoration:"none"}}>
          <EyeOutlined className='text-info'/><br/> View Product
      </Link>,
      <Tooltip title={product.quantity<1?"Out of Stock":tooltipText} arrow placement="top">

      <a disabled={product.quantity<1} style={{textDecoration:'none'}} onClick={handleAddToCart} >
      <ShoppingCartOutlined className='text-danger'/> <br />{product.quantity<1?"Out of Stock":" Add to Cart"}
      </a>
    </Tooltip>,
    
      ]}
    >
    <Meta onClick={handleClickCard} title={`${title} - ${price}`} description={`${description && description.substring(0,10)}...`} />
  </Card>
    </>
  )
}

export default ProductCard