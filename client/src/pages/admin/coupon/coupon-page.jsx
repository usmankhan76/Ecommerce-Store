import React, { useEffect, useState } from 'react'
import AdminNavs from '../../../components/nav/admin-navs'
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { Box, FormControl,  Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { crateCouponInDb, getCoupons, removeCoupon } from '../../../services/coupon-services';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

const CouponPage = () => {
    const [coupon,setCoupon]=useState({name:'',discount:'',expiry:new Date()})
    const [coupons,setCoupons]=useState([])
    const [loading,setLoading]=useState(false)
    const {authUserToken}=useSelector(state=>state.user)
    const {name,discount,expiry}=coupon;

    const handleChange=(e)=>{
        const {name,value}=e.target
        setCoupon({...coupon,[name]:value})
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        crateCouponInDb(coupon,authUserToken).then((res)=>{
            setCoupon({name:'',discount:'',expiry:new Date()})
            fetchCoupons()
            toast.success(`${res.data.name} is created succussfully` )
        }).catch(err=>console.log("Create coupon error",err.message))
    }
   
    const fetchCoupons=()=>{
         setLoading(true)
        getCoupons().then((res)=>{
            setLoading(false)
           return setCoupons(res.data)
        }).catch(err=>console.log("getConpon error",err.message))
    }

     const handleDelete=(_id)=>{
        if(window.confirm('Delte')){
            removeCoupon(_id,authUserToken).then((res)=>{
                fetchCoupons()
                toast.error(`${res.data.name} is deleted successfully`)
            }).catch(err=>console.log("delte eror",err.message))
        }
    }
    useEffect(()=>{
       fetchCoupons()
    },[])
    
    
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNavs/>
            </div>
            <div className="col-md-10" >
                <h4>Coupons</h4>
                <hr />
                <form onSubmit={handleSubmit}>
                    <Box >
                        <FormControl fullWidth>

                        
                        <TextField 
                            variant='standard'
                            label="Name"  
                            type="text" 
                            name="name"
                            fullWidth={true}
                            className="form-control"
                            onChange={handleChange}
                            value={name}
                            autoFocus
                            required />
                            </FormControl>
                            
                   
                        <FormControl margin='dense' fullWidth>

                        <TextField 
                            variant='standard'  
                            type="text" 
                            label="Discount %" 
                            name='discount'
                            fullWidth={true}
                            className="form-control"
                            onChange={handleChange}
                            value={discount}
                            autoFocus
                            required />
                        </FormControl>
                    <div className="form-group" style={{marginTop:'0px',marginBottom:'10px'}}> 
                       <br />
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label="Expiry Date"
                                value={expiry}
                                onChange={(newValue) => {
                                setCoupon({...coupon,expiry:newValue});
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>

                    </div>
                    <button type='submit' className="btn btn-outline-primary">Submit</button>
                     </Box>
                     
                </form>
                
                <hr />
            <h4 className='text-center'>Coupons List</h4>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: '650px' }}  aria-label="simple table">
        <TableHead sx={{backgroundColor:'#2596be',}}>
          <TableRow >
            <TableCell align='left'>Name</TableCell>
            <TableCell align="center">Discount</TableCell>
            <TableCell align="center">Expiry Date</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {coupons.map((coupon) => (
             <TableRow
              key={coupon._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              hover={true}
              
            >
            
              <TableCell style={{whiteSpace:'nowrap'}} align="left">{coupon.name}</TableCell>
              <TableCell align="center">$&nbsp;{coupon.discount}</TableCell>
              <TableCell align="center">{new Date(coupon.expiryDate).toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <DeleteOutlineOutlinedIcon 
                    fontSize='small' 
                    sx={{cursor:'pointer'}} 
                    onClick={()=>handleDelete(coupon._id)}
                    color='error'/>
                </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
         
            </div>
        </div>
    </div>
  )
}

export default CouponPage