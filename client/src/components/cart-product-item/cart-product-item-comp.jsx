import {  TableCell, TableRow } from '@mui/material'
import React, { useState } from 'react'
import ModalImage from "react-modal-image";
import { useDispatch } from 'react-redux';
import dummy from "../../assets/dummy.jpg"
import { addToCart } from '../../redux/features/cart/cart-slice';
import {toast} from 'react-toastify'
import ClearIcon from '@mui/icons-material/Clear';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const CartProductItem = ({product}) => {
    const {title,price,brand,color,count,shipping,images,_id,quantity}=product
    const [colors,setColors]=useState(["Black","White","Brown","Silver","Blue"])
    const dispatch=useDispatch()

  const handleColorChange = (e) => {
    let cart=[]
    if(typeof window !== 'undefined'){
        if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0 )
        {
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        cart.map((c,i)=>{
             if (c._id===_id){
               return c.color=e.target.value // there is also index method in which we index to update see video
            }
        })
                dispatch(addToCart(cart))
        localStorage.setItem('cart',JSON.stringify(cart))

    }
    
  };
  const handleCountChange=(e)=>{
    let num=e.target.value<=0?1:e.target.value   
    if(num>quantity){
        toast.error('Exceed quantity limit')
        return
    }
    let cart=[]
    if(typeof window !== 'undefined'){
        if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0 ){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
          cart.map((c,i)=>{
             if (c._id===_id){
               return c.count=parseInt(num) // there is also index method in which we index to update see video
            }
        })
                dispatch(addToCart(cart))
        localStorage.setItem('cart',JSON.stringify(cart))
    }
  }
  const filterColor=colors.filter((c)=>(c!==color))

  const handleRemoveProduct=()=>{
    let cart=[];
    console.log("id",_id)
    if(typeof window !== 'undefined'){
        if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0 ){
            cart=JSON.parse(localStorage.getItem('cart'))
        }
        const filterArray=cart.filter((p)=>(p._id!==_id))
      
        dispatch(addToCart(filterArray))
        localStorage.setItem('cart',JSON.stringify(filterArray))
    }
  }
  return (
    <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
              
            >
              <TableCell component="th" scope="row">
                <div  >
                    {/* {product.images && product.images.length>0?( */}
                        <ModalImage    
                        small={images && images.length>0? images[0].url:dummy } 
                        large={ images && images.length>0? images[0].url:dummy }
                        style={{width:'150px',innerHeight:'150px',objectFit:'cover'}}
                       
                        />
                </div>
                
              </TableCell>
              <TableCell style={{whiteSpace:'nowrap'}} align="left">{title}</TableCell>
              <TableCell align="right">$&nbsp;{price}</TableCell>
              <TableCell align="right">{brand}</TableCell>
              <TableCell align="right" >
                {color &&( 
                    <select 
                            name="color" style={{width:'80px'}}  
                            className='form-select form-select-sm' 
                            onChange={handleColorChange}  
                                >
                                {color?(
                                    <option value={color} hidden>
                                        {color}
                                    </option>):( 
                                    <option value="select">
                                        Select
                                    </option>
                                    )}
                                {filterColor.map(c=><option key={c} value={c}>{c}</option>)}
                        </select>)}
                </TableCell>
              <TableCell align="right" >
                    <input 
                        type="number" 
                        style={{width:'80px',height:'30px'}} 
                        className='form-control' 
                        value={count}
                        onChange={handleCountChange} />
              </TableCell>
              <TableCell align="center">
                {shipping?(
                    <CheckCircleOutlineIcon fontSize='small' color='success'/>):(
                         <CancelOutlinedIcon fontSize='small' color='error'/>
                )}
               </TableCell>
              <TableCell align="center">
                <ClearIcon fontSize='small' color='error' onClick={handleRemoveProduct} sx={{cursor:'pointer'}} />
                </TableCell>
            </TableRow>
  )
}

export default CartProductItem