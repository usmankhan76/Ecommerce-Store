import { EyeOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Card } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React from 'react'
import { Link } from 'react-router-dom'
import dummy from '../../assets/dummy.jpg'
const ProductCard = ({product}) => {
  const {title,images,description}=product
  return (
     <Card
    hoverable
    style={{
      width: '250px',
      marginTop:'10px',
      marginBottom:'20px'
    }}
    cover={<img alt="example" src={images&& images.length?images[0].url:dummy}  
        style={{width:'100%',height:'150px',objectFit:'cover',}} 
        // className='p-1'
        />}
      actions={[
        <Link to={`/admin/dashboard/product/`} style={{textDecoration:"none"}}>
          <EyeOutlined className='text-info'/><br/> View Product
      </Link>,
      <>
      <ShoppingCartOutlined className='text-danger'/> <br /> Add to Cart
      </>
      ]}
    >
    <Meta title={title} description={`${description && description.substring(0,10)}...`} />
  </Card>
  )
}

export default ProductCard