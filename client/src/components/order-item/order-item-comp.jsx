import { Paper, Table, TableBody, TableCell,  TableRow } from '@mui/material'
import React from 'react'
import ModalImage from "react-modal-image";
import dummy from "../../assets/dummy.jpg"
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

const OrderItemComp = ({item}) => {
    const{product,count,color}=item
    const {title,price,brand,shipping,images,}=product
  return (
    
    <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            //   hover={true}
              
            >
              <TableCell  scope="row">
                <div style={{width:'100px',height:'100px'}} >
                    {/* {product.images && product.images.length>0?( */}
                        <ModalImage     
                        small={images && images.length>0? images[0].url:dummy } 
                        large={ images && images.length>0? images[0].url:dummy }
                        style={{width:'80px',innerHeight:'80px',objectFit:'cover'}}
                       
                        />
                </div>
                
              </TableCell>
              <TableCell style={{whiteSpace:'nowrap'}} align="left">{title}</TableCell>
              <TableCell align="right">$&nbsp;{price}</TableCell>
              <TableCell align="right">{brand}</TableCell>
             
              <TableCell align="right" >{color}</TableCell>
              <TableCell align="right" >{count}</TableCell>
              <TableCell align="center">
                {shipping?(
                    <CheckCircleOutlineIcon fontSize='small' color='success'/>):(
                         <CancelOutlinedIcon fontSize='small' color='error'/>
                )}
               </TableCell>
            
            </TableRow>
  )
}

export default OrderItemComp