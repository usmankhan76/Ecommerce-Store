import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { StarOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import { toast } from 'react-toastify';
import {useNavigate, useParams} from "react-router-dom"
import StarBorderIcon from '@mui/icons-material/StarBorder';
const RatingModal = ({children}) => {
    const{loginUser}=useSelector(state=>state.user);
    const[showModal,setShowModal]=useState(false)
    const{slug}=useParams();
    const navigate=useNavigate()
   
  return (
    <>
    <div onClick={()=>setShowModal(true)} style={{marginTop:'13px'}}>
        
        <StarBorderIcon className='text-danger' /><br/> {" "}
        {loginUser?"Leave Rating":"Login to Leave rating"}
    </div>
    {loginUser?(
        <Modal 
      title='Leave Your Rating'
      centered
      open={showModal}
     
      onOk={()=>{
          setShowModal(false)
          // toast.success("Thanks For you Review")
           }}
       onCancel={()=>{setShowModal(false)}}    
        >
        {children}
    </Modal>
    ):(
       <Modal 
      // title='Please Log In'
      centered
      visible={showModal}
      okText="Log In Page"
      onOk={()=>{
          navigate('/login',{state:{goBack:`/product/${slug}`}})
          setShowModal(false)
          
           }}
       onCancel={()=>{setShowModal(false)}}    
        >
      <h4>Please first login to leave Rating</h4>
    </Modal>
    )}
    </>
    
      
  )
}

export default RatingModal