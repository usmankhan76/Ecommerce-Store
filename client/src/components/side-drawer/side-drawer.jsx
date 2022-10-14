import { Button } from '@mui/material';
import { Drawer } from 'antd';
import React, { useState } from 'react'
// import { Drawer } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { showDarwer } from '../../redux/features/drawer/drawer.slice';
import DrawerCardComponent from '../drawer-card/drawer-card-component';
const SideDrawer = () => {
    const dispatch=useDispatch();
    const state=useSelector((state)=>state)
    const drawer=state.drawer
    const navigate=useNavigate()
    const cart=state.cart
    const handleClick=()=>{
        navigate('/cart')
        return dispatch(showDarwer(false))
    }
  return (
    <div>
        <Drawer 
            open={drawer}  
            placement="right" 
            onClose={()=>dispatch(showDarwer(false))}
            width='300px'
            title={cart && `${cart.length} products in cart`}    
            size="default"
            footer={<Button sx={{width:'100%'}} variant="contained" onClick={handleClick}>Checkout</Button>}
            >
                
            {
                cart&& cart.length>0 ?(
                    cart.map((product)=>(
                    <DrawerCardComponent key={product._id} product={product} />
                    
                    )
                   )):("None products")}
        </Drawer>
    </div>
  )
}

export default SideDrawer