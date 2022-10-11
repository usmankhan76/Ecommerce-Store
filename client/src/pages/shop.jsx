import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/product-card/product-card'
import LoadingSipner from '../components/spin/spin'
import { getProductsbyCount, getProductsFromSearch } from '../services/product-services'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Checkbox, Divider, FormControl, FormControlLabel, FormGroup, Grid, Radio, RadioGroup, TextField } from '@mui/material'
import { setSearchQuery } from '../redux/features/search/search-slice'
import { getCategories } from '../services/category-service'
import StarsFilterComponent from '../components/stars-filter/stars-filter-component'
import { getSubCategories } from '../services/sub-category-services'
import Chip from '@mui/material/Chip';
import FilterListIcon from '@mui/icons-material/FilterList';
import CategoryIcon from '@mui/icons-material/Category';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const ShopPage = () => {
    const [loading,setLoading]=useState(false)
    const [products,setProducts]=useState([])
    const [price,setPrice]=useState([100,10000000])
    // const [ok,setOk]=useState(false)
    const {text}=useSelector(state=>state.search)
    const dispatch=useDispatch();
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(true);
    const [starsOpen, setStarsOpen] = useState(false);
    const [subOpen, setSubOpen] = useState(false);
    const [brandOpen, setBrandOpen] = useState(false);
    const [colorOpen, setColorOpen] = useState(false);
    const [shippingOpen, setShippingOpen] = useState(false);
    // const [stars, setStars] = useState('');
    const [load, setLoad] = useState(true);
    const [categories,setCategories]=useState([])
    const [selectedCategories,setSelectedCategories]=useState([])
    const [subCategories,setSubCategories]=useState([])
    const [selectedSubCategories,setSelectedSubCategories]=useState([])
    const [brands,setBrands]=useState(["Apple","Microsoft","Samsung","Lenevo","Asus"] )
    const [selectedBrand,setSelectedBrand]=useState('')
    const [colors,setColors]=useState(["Black","White","Brown","Silver","Blue"] )
    const [selectedColor,setSelectedColor]=useState('')
    const [shipping,setShipping]=useState(["Yes","No"] )
    const [selectedShipping,setSelectedShipping]=useState('')

    const handleClickPrice = () => {
            setOpen(!open);
        };
    
    const handleClickCategories = () => {
            setOpen2(!open2);
        };
     const handleClickStars = () => {
            setStarsOpen(!starsOpen);
        };
    const handleClickSub = () => {
            setSubOpen(!subOpen);
        };
    const handleClickBrand = () => {
            setBrandOpen(!brandOpen);
        };
    const handleClickColor=()=>{
            setColorOpen(!colorOpen)
    }
    const handleClickShipping=()=>{
            setShippingOpen(!shippingOpen)
    }
    
    
  const onChange1 = (e) => {
      dispatch(setSearchQuery(""))
        setSelectedSubCategories([])
        setSelectedCategories([])
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedShipping('')

    if(price[0]<price[1]){
        setPrice([parseInt(e.target.value),price[1]])
        setTimeout(()=>{
            // setOk(!ok)
        fetchProducts({price})
        },300)
    }
    else{
        setPrice([price[0],price[1]])
    }
  };
    const onChange2 = (e) => {
        dispatch(setSearchQuery(""))
        setSelectedCategories([])
        setSelectedSubCategories([])
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedShipping('')


        if(e.target.value > price[0]){
            setPrice([price[0],parseInt(e.target.value)])
             setTimeout(()=>{
                    // setOk(!ok)
                fetchProducts({price})

                },300)


        }else{
            setPrice([price[0],price[1]])
        }
  };



    const loadAllProducts=()=>{
            setLoading(true)
            getProductsbyCount(6).then((res)=>{
                setProducts(res.data)
                setLoading(false)
            }).catch((err)=>{
                setLoading(false)
                console.log("shop get Product error",err.message);
            })
        
    }
    const fetchProducts=(args)=>{
        
        getProductsFromSearch(args).then((res)=>{
                
               setProducts(res.data)
                setLoading(false) 
            }).catch(err=>{
                setLoading(false)
                console.log("shop search get Product error",err.message);
            })
    }
    const handleCategory=(e)=>{
        setPrice([100,10000000])
        dispatch(setSearchQuery(""))
        setSelectedSubCategories([])
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedShipping('')

        const inTheState=selectedCategories
        const clickedCategory=e.target.value
        const findCategory=inTheState.indexOf(clickedCategory)// if it find then return index else -1

        if(findCategory===-1){
            inTheState.push(clickedCategory)
        }else{
            inTheState.splice(findCategory,1)
        }

        if(inTheState.length>0){
            setSelectedCategories(inTheState)
            fetchProducts({category:inTheState})
        }else{
            setLoad(!load)
        }

      
        
        
    }

    const showCategories=()=>{
      return  categories.map(c=>{
           return <ListItemButton key={c._id}>
                        <FormControlLabel  
                            control={<Checkbox 
                            size='small' 
                            value={c._id} 
                            onClick={handleCategory} />}
                            label={c.name}
                            checked={selectedCategories.includes(c._id)}
                            />
                </ListItemButton>
        })
    }
    
    const handleStarClick=(num)=>{
        console.log("star click",num);
        dispatch(setSearchQuery(""))
        setSelectedCategories([])
        setSelectedBrand('')
        setPrice([100,10000000])
        setSelectedColor('')
        setSelectedSubCategories([])
        setSelectedShipping('')
        fetchProducts({stars:num})
      
    } ;

    const showStars=()=>{
        return( <>
            <ListItemButton>
                <StarsFilterComponent handleStarClick={handleStarClick} amountOfStars={5}/>
            </ListItemButton>

            <ListItemButton>
                <StarsFilterComponent handleStarClick={handleStarClick} amountOfStars={4}/>
            </ListItemButton>

            <ListItemButton>
                <StarsFilterComponent handleStarClick={handleStarClick} amountOfStars={3}/>

            </ListItemButton>

            <ListItemButton>
                <StarsFilterComponent handleStarClick={handleStarClick} amountOfStars={2}/>

            </ListItemButton>
            
            <ListItemButton>

                <StarsFilterComponent handleStarClick={handleStarClick} amountOfStars={1}/>
            </ListItemButton>
            </>
            )
    }
    const handleSubCategory=(s)=>{
       
        setSelectedSubCategories([s])
        dispatch(setSearchQuery(""))
        setSelectedCategories([])
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedShipping('')
        setPrice([100,10000000])
        fetchProducts({sub:s})
    }
        

    const showSubs=()=>{
         return <Grid container direction="row" spacing={1}>
            {subCategories.map((s)=>(
                <Grid item xs={6} key={s._id}  style={{marginLeft:'20px'}}>

                <Chip 
                    size='small' 
                    label={s.name}
                    onClick={()=>handleSubCategory(s)}
                    key={s._id} 
                    sx={{fontSize:'15px'}}
                    />
                    </Grid>
                    ))}
      
      
        </Grid>
    }
    const handleBrandChange=(e)=>{
        setSelectedShipping('')
         setSelectedSubCategories([])
        dispatch(setSearchQuery(""))
        setSelectedCategories([])
        setPrice([100,10000000])
        setSelectedBrand(e.target.value)
        setSelectedColor('')
        fetchProducts({brand:e.target.value})
    }
    const showBrands=()=>{
        return brands.map(b=>(
            <FormControlLabel 
                sx={{marginLeft:'10px'}}
                value={b}
                control={
                    <Radio 
                        size='small' 
                        onChange={handleBrandChange} 
                        // checked={selectedBrand.includes(b)} //to understand this see showCategories  
                        checked={b===selectedBrand}
                        />} 
                label={b}
                key={b} 
             />))
    }
    const handleColorChange=(e)=>{
        
         setSelectedSubCategories([])
        dispatch(setSearchQuery(""))
        setSelectedCategories([])
        setPrice([100,10000000])
        setSelectedBrand('')
        setSelectedShipping('')
        setSelectedColor(e.target.value)
        fetchProducts({color:e.target.value})
    }
    const showColors=()=>{
        return colors.map(c=>(
            <FormControlLabel 
                sx={{marginLeft:'10px'}}
                value={c}
                control={
                    <Radio 
                        size='small' 
                        onChange={handleColorChange} 
                        // checked={selectedBrand.includes(b)} //to understand this see showCategories  
                        checked={c===selectedColor}
                        />} 
                label={c}
                key={c} 
             />))
    }

    const handleShippingChange=(e)=>{
        
         setSelectedSubCategories([])
        dispatch(setSearchQuery(""))
        setSelectedCategories([])
        setPrice([100,10000000])
        setSelectedBrand('')
        setSelectedColor('')
        setSelectedShipping(e.target.value)
        fetchProducts({shipping:e.target.value})
    }
    const showShipping=()=>{
        return shipping.map(s=>(
            <FormControlLabel 
                sx={{marginLeft:'10px'}}
                value={s}
                control={
                    <Radio 
                        size='small' 
                        onChange={handleShippingChange} 
                        // checked={selectedBrand.includes(b)} //to understand this see showCategories  
                        checked={s===selectedShipping}
                        />} 
                label={s}
                key={s} 
             />))
    }

    useEffect(()=>{
        console.log("useEffect 1 fetch all products")
        loadAllProducts()
        //get categories
        getCategories().then(res=>{setCategories(res.data)})
        //get subCategories
        getSubCategories().then(res=>setSubCategories(res.data))
    },[load])

    useEffect(()=>{
        console.log("fetch products base on search useeffect")
        const delay=setTimeout(() => {
            
            fetchProducts({query:text})
        }, 800);
        return ()=>{clearTimeout(delay)}
    },[text])

    // useEffect(()=>{
    //     console.log("fetch products base on price useeffect")
    //     fetchProducts({price})
    // },[ok,price])

  return (
    
    <div className='container-fluid'>
        <div className="row">
            <div className="col-md-3 ">
                <div style={{display:'flex',flexDirection:'row',marginLeft:'5px' }}   >
                <FilterListIcon style={{fontSize:'30px',marginTop:'10px'}}/>

                <h4 style={{marginTop:'10px',marginLeft:'5px'}}>Filter Products</h4>
                </div>
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
                     <ListItemButton onClick={handleClickCategories}>
                            <ListItemIcon>
                                <CategoryIcon />
                            </ListItemIcon>
                            <ListItemText primary="Categories" />
                            {open2 ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open2} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        
                            {/* <ListItemButton> */}
                                <FormGroup >
                                    {showCategories()}
                                </FormGroup>
                            {/* </ListItemButton> */}
                                
                        </List>
                    </Collapse>
                     <Divider />
                   
                    <ListItemButton onClick={handleClickPrice}>
                            <ListItemIcon>
                                <MonetizationOnIcon />
                            </ListItemIcon>
                            <ListItemText primary="Filter by price" />
                            {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding >
                                
                                    <div className="d-flex justify-content-around">
                                        
                                        <TextField 
                                            size='small' 
                                            inputProps={{ type: 'number'}} 
                                            id="outlined-basic"
                                            margin='dense' 
                                            label={`Min  $100`} 
                                            variant="outlined" 
                                            sx={{width:'110px'}}
                                           
                                            value={price[0]} 
                                            onChange={onChange1} />
                                            
                                        <TextField 
                                            size='small' 
                                            inputProps={{ type: 'number'}} 
                                            id="outlined-basic" 
                                            margin='dense'  
                                            label={`Max  $10000000`} 
                                            variant="outlined" 
                                            sx={{width:'110px'}} 
                                            value={price[1]} 
                                            onChange={onChange2}/>
                                    </div>
                                
                                
                            </List>
                    </Collapse>
                     <Divider />
                   

                    <ListItemButton onClick={handleClickStars}>
                            <ListItemIcon>
                                <StarBorderIcon />
                            </ListItemIcon>
                            <ListItemText primary="Rating" />
                            {starsOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={starsOpen} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        
                                    {showStars()}
                                    
                                
                        </List>
                    </Collapse>
                     <Divider />
                     <ListItemButton onClick={handleClickSub}>
                            <ListItemIcon>
                                <SubdirectoryArrowRightIcon />
                            </ListItemIcon>
                            <ListItemText primary="Sub Categories" />
                            {subOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={subOpen} timeout="auto" unmountOnExit>
                                        
                            <List component="div" disablePadding style={{marginBottom:'10px'}} >
                                {showSubs()}
                                
                            </List>
                    </Collapse>
                
                     <Divider />
                    
                     <ListItemButton onClick={handleClickBrand}>
                            <ListItemIcon>
                                <LoyaltyIcon />
                            </ListItemIcon>
                            <ListItemText primary="Brands" />
                            {brandOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={brandOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding >
                                
                                <FormControl>
                                    <RadioGroup
                                        // aria-labelledby="demo-radio-buttons-group-label"
                                        // defaultValue="female"
                                        // name="radio-buttons-group"
                                    >
                                    {showBrands()}
                                    </RadioGroup>
                                </FormControl>

                            </List>
                    </Collapse>
                    
                    {/* Color */}
                    <ListItemButton onClick={handleClickColor}>
                            <ListItemIcon>
                                <ColorLensIcon />
                            </ListItemIcon>
                            <ListItemText primary="Colors" />
                            {colorOpen ? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={colorOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding >
                                
                                <FormControl>
                                    <RadioGroup
                                        
                                    >
                                    {showColors()}
                                    </RadioGroup>
                                </FormControl>

                            </List>
                    </Collapse>
                    {/* For shipping */}
                     <ListItemButton onClick={handleClickShipping}>
                            <ListItemIcon>
                                <LocalShippingIcon />
                            </ListItemIcon>
                            <ListItemText primary="Shipping" />
                            {shippingOpen? <ExpandLess /> : <ExpandMore />}
                    </ListItemButton>
                    <Collapse in={shippingOpen} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding >
                                
                                <FormControl>
                                    <RadioGroup
                                        
                                    >
                                    {showShipping()}
                                    </RadioGroup>
                                </FormControl>

                            </List>
                    </Collapse>
                </List>
                   
                                                            
            </div>

            <div className="col-md-9 text-center  ">
                <h4 className='pt-2 pb-2'>Products</h4>
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







