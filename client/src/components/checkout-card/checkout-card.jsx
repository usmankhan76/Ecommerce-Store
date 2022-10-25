import React from 'react'
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import dummy from "../../assets/dummy.jpg"
import { Badge } from '@mui/material';
const CheckoutCard = ({product,count}) => {
    const {images,title,description,price,}=product;
    console.log(price)
  return (
    <>
      <Card sx={{ display: 'flex',flexDirection:'row',height:'80px',marginBottom:'20px' ,padding:'10px'}}>
          <Badge badgeContent={count} color='primary'>
        <CardMedia
        component="img"
        sx={{width:'80px',innerHeight:'70px',objectFit:'cover' ,borderRadius:'10px'}}
        image={images && images.length>0? images[0].url:dummy } 
        alt="Live from space album cover"
        />

        </Badge>
      <>
     
      <Box sx={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between',width:'100%' }}>
        <CardContent sx={{marginTop:'-10px'}}>
          <Typography  variant="subtitle1">
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
             {description && description.substring(0,20)}... 
          </Typography>
        </CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'row',alignItems:'flex-end', }}>
          <Typography>
                $ {count? price*count:price}
          </Typography>
        </Box>
      </Box>
       </>
    </Card>
    </>
  )
}

export default CheckoutCard