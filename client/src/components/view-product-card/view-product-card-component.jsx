import { HeartOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import dummy from "../../assets/dummy.jpg"
import ViewProductCardPropComp from './view-product-card-properties-comp';
import { Box, Checkbox, Tab, Tooltip, } from '@mui/material';
import StarRatings from 'react-star-ratings';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import RatingModal from '../modal/rating-modal';
import { AverageRating } from '../../services/rating';
import { addToCart } from '../../redux/features/cart/cart-slice';
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux';
import { showDarwer } from '../../redux/features/drawer/drawer.slice';
import { addToWishlist, removeFromWishlist } from '../../services/wishlist-service';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';


const ViewProductCardComponent = ({product,handleStarsChange,stars}) => {
    const [value, setValue] = useState('1');
    const [tooltipText,setTooltipText]=useState('Click To Add')
    const dispatch=useDispatch()
    const {authUserToken}=useSelector((state)=>state.user)
    const {title,description,images,_id}=product;


    const handleChange = (event, newValue) => {
    setValue(newValue);
        };

    const handleAddToCart=()=>{
        let cart=[];
        if(typeof window !== 'undefined'){
        if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0 ){
            // if cart is in localStorage get it
            cart=JSON.parse(localStorage.getItem('cart'))
        
        }
        
            cart.push({...product,count:1})
            let unique= _.uniqWith(cart, _.isEqual)
            localStorage.setItem('cart',JSON.stringify(unique))
            dispatch(addToCart(unique))
            dispatch(showDarwer(true))
            setTooltipText("Added")
        
        
        }
    }
    const handleAddToWishlist=()=>{
        addToWishlist(_id,authUserToken).then((res)=>{
            if(res.data.saveProductToWishList===true){
                toast.success(`${title} successfully add to Wishlist `)
            }    
        }).catch(err=>console.log("addTowishlist error",err.message))
    }
     const handleRemoveFromWishList=()=>{
        removeFromWishlist(_id,authUserToken).then((res)=>{
            if(res.data.DeleteProductFromWishList===true){
                toast.success(`Item is remove from wishlist`)
            }
        }).catch(err=>console.log("wihslist remvoe error",err.message))
    }
    const handleCheckListChange=(e)=>{
        if(e.target.checked===true){
            return handleAddToWishlist()
        }else{
            return handleRemoveFromWishList()
        }

    }

  return (
    <>
    <div className="col-md-7">
        <Carousel  
            infiniteLoop 
            showArrows={true} 
            autoPlay={true} >

            {images&& images.length>0 ? images.map(i=><img src={i.url} key={i.public_id} alt={title} style={{objectFit:'cover'}} />)
            :<img src={dummy} alt="No Pic" />}
        </Carousel>

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Description" value="1" />
                    <Tab label="Contact Us" value="2" />
                </TabList>
                </Box>
                <TabPanel value="1">{description}</TabPanel>
                <TabPanel value="2">Contact Us on xxxx xxxx xxx</TabPanel>
            </TabContext>
    </Box>
    </div>

    <div className="col-md-5">
        <h1 className=" p-3 text-center" style={{backgroundColor:'#004080' ,color:'white'}}>{title}</h1>
        {product&& product.ratings&& product.ratings.length >0 ?(
            AverageRating(product)):(
                <div className="text-center pt-1 pb-3">
                    No Rating Yet
                </div>)}

        <Card 
           actions={[
            <span >
                <Checkbox onChange={handleCheckListChange} size='small' icon={<FavoriteBorder fontSize='small'/>} checkedIcon={<Favorite />} /> <br/> Add to Wishlist
            
            </span>,
            <>
            <Tooltip title={product.quantity<1?"Out of Stock":tooltipText} arrow placement="top">

            <a disabled={product.quantity<1}  style={{marginTop:'13px',textDecoration:'none'}}onClick={handleAddToCart}>
            <AddShoppingCartIcon  className='text-success'/> <br /> Add to Cart
            </a>
            </Tooltip>
            </>,
            <> 
            <RatingModal>

            <StarRatings 
                name={_id}
                numberofStars={5}
                rating={stars}
                isSelectable={true}
                starRatedColor="#004080"
                starHoverColor="#004080"
                changeRating={handleStarsChange}
        /> 
        </RatingModal> </>
           ]} 
        >
            {/* <Meta title={title} description={description}/> */}
            <ViewProductCardPropComp product={product}/>
            
        </Card>

    </div>
    </>
  )
}

export default ViewProductCardComponent