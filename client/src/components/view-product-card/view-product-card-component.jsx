import { HeartOutlined, ShoppingCartOutlined, StarOutlined } from '@ant-design/icons';
import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import dummy from "../../assets/dummy.jpg"
import ViewProductCardPropComp from './view-product-card-properties-comp';
import { Box, Tab, } from '@mui/material';
import StarRatings from 'react-star-ratings';

import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import RatingModal from '../modal/rating-modal';
import { AverageRating } from '../../services/rating';


const ViewProductCardComponent = ({product,handleStarsChange,stars}) => {
    const [value, setValue] = useState('1');
  
    const {title,description,images,_id}=product;
    const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
    <div className="col-md-7">
        <Carousel  
            infiniteLoop 
            showArrows={true} 
            autoPlay={true} >

            {images&& images.length>0 ? images.map(i=><img src={i.url} key={i.public_id} alt={title} />)
            :<img src={dummy} alt="No Pic"/>}
        </Carousel>

        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Description" value="1" />
                    <Tab label="Contact Us" value="2" />
                    <Tab label="Item Three" value="3" />
                </TabList>
                </Box>
                <TabPanel value="1">{description}</TabPanel>
                <TabPanel value="2">Contact Us on xxxx xxxx xxx</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
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
            <><Link to='/' style={{textDecoration:"none"}}><HeartOutlined/> <br/> Add to Wishlist</Link></>,
            <><ShoppingCartOutlined className='text-success'/> <br /> Add To Cart</>,
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