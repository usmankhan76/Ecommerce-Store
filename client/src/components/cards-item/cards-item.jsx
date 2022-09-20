import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import dummy from "../../assets/dummy.jpg"
import { Card } from 'antd';
import React from 'react';
import LoadingSipner from '../spin/spin';
import { Link } from 'react-router-dom';
const { Meta } = Card;

const CardItem = ({product,handleRemove,loading}) => {

    
    const {description,title,images,slug}=product
return (
  <>
  {loading ? <LoadingSipner/>:(
    <Card
    hoverable
    style={{
      width: '250px',
      
      marginBottom:'20px'
    }}
    cover={<img alt="example" src={images&& images.length?images[0].url:dummy}  
        style={{width:'100%',height:'150px',objectFit:'cover',}} 
        // className='p-1'
        />}
      actions={[
        <Link to={`/admin/dashboard/product/${slug}`} >
          <EditOutlined className='text-info'/>,
      </Link>,
      <DeleteOutlined className='text-danger' onClick={()=>{return handleRemove(slug)}}/>]}
    >
    <Meta title={title} description={`${description && description.substring(0,10)}...`} />
  </Card>
)}
</>
 
);
}

export default CardItem;