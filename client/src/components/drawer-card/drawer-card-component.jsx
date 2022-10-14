import React from 'react'
import Meta from 'antd/lib/card/Meta'
import dummy from '../../assets/dummy.jpg'
import { Card } from 'antd'

const DrawerCardComponent = ({product}) => {
    const {images,title,description,price}=product
    
  return (
    <>
     <Card
                
                style={{
                    // width: '250px',
                    marginTop:'10px',
                    // marginBottom:'30px',
                    
                }}
                cover={<img alt="example" src={images&& images.length?images[0].url:dummy}  
                                    style={{width:'100%',height:'150px',objectFit:'cover',}} 
                                />}
                        >
                        <Meta title={`${title} - ${price}`} description={`${description && description.substring(0,10)}...`} />
        </Card>
                {/* <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={images&& images.length?images[0].url:dummy}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
          {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
        {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>         */}
                        </>

  )
}

export default DrawerCardComponent