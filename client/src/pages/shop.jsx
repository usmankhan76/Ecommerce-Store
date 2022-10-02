import { DollarOutlined } from '@ant-design/icons'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ProductCard from '../components/product-card/product-card'
import LoadingSipner from '../components/spin/spin'
import { getProductsbyCount, getProductsFromSearch } from '../services/product-services'
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import { Divider, Slider } from '@mui/material'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';

import Box from '@mui/material/Box';


function valuetext(value) {
  return `${value}°C`;
}
const ShopPage = () => {
    const [loading,setLoading]=useState(false)
    const [products,setProducts]=useState([])
    const [price,setPrice]=useState([20,37])
    const {text}=useSelector(state=>state.search)
     const [open, setOpen] = useState(true);
     const handleClick = () => {
    setOpen(!open);
  };
    
    const handleChange = (event, newValue) => {
      
        console.log("handle Change is running",event.target.value, newValue) 
    setPrice(event.target.value);
  };

    const loadAllProducts=()=>{
            setLoading(true)
            getProductsbyCount(12).then((res)=>{
                setProducts(res.data)
                setLoading(false)
            }).catch((err)=>{
                setLoading(false)
                console.log("shop get Product error",err.message);
            })
        
    }
    const fetchProducts=(args)=>{
        
        getProductsFromSearch(args).then((res)=>{
                console.log("Search response",res);
               setProducts(res.data)
                setLoading(false) 
            }).catch(err=>{
                setLoading(false)
                console.log("shop search get Product error",err.message);
            })
    }
    useEffect(()=>{
        console.log("useEffect 1")
        loadAllProducts()
    },[])
    useEffect(()=>{
        console.log("useEffect 2")
        const delay=setTimeout(() => {
            
            fetchProducts({query:text})
        }, 800);
        return ()=>{clearTimeout(delay)}
    },[text])

  return (
    
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-3 pt-2">
                <h4>search/filter menu</h4>
                <hr />
             <List
                sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
                component="nav"
                // aria-labelledby="search/filter menu"
                // subheader={
                //     <ListSubheader component="div" id="nested-list-subheader">
                //     Search/Filter Menu
                //     </ListSubheader>
                // }
                >
                    {/* <ListItemButton>
                            <ListItemIcon>
                            <SendIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sent mail" />
                    </ListItemButton> */}
                    
                   
                    <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <MonetizationOnOutlinedIcon />
                            </ListItemIcon>
                            <ListItemText primary="Filter by price" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                     <Box sx={{ width: 300 }} >
                                        <Slider
                                            
                                            getAriaLabel={() => 'Temperature range'}
                                            value={price}
                                            onChange={()=>handleChange()}
                                            valueLabelDisplay="auto"
                                            getAriaValueText={valuetext}
                                            onChangeCommitted={()=>{handleChange()}}
                                        />
                                    </Box>
                                </ListItemButton>
                            </List>
                    </Collapse>
                     <Divider />
                    <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <InboxIcon />
                            </ListItemIcon>
                            <ListItemText primary="other" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={false} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon>
                                        <StarBorder />
                                    </ListItemIcon>
                                    <ListItemText primary="Starred" />
                                </ListItemButton>
                            </List>
                    </Collapse>
                </List>   
              
                
                
            </div>

            <div className="col-md-9 text-center  ">
                <h4 className='pt-2'>Products</h4>
                        <hr />
                <div className="row mt-3">

                
               {  loading? <LoadingSipner/>: (
                
                products && products.length<1 ? "No Product Found" :(
                    products.map((product)=>{
                        return  <div className="col-md-4 pb-5" key={product._id}>
                                <ProductCard product={product} />
                               </div>
                            }

                    ) )  
                
                )}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ShopPage