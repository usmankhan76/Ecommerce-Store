// import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getProducts, getProductsCounting } from '../../services/product-services';
import LoadingCard from '../cards-item/loading-card';

import ProductCard from '../product-card/product-card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Grid } from '@mui/material';
import Card from '../CardsMouseFlow/cards';
import CategoryButton from '../category-button/categoryButton';

 const NewArrivalComponent = () => {
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(false);
  const[productsCount,setProductsCount]=useState(0);
  const[page,setPage]=useState(1);
  const amountOfProducts=1
  const showProducts=()=>{
    setLoading(true)
    getProducts("createdAt","desc",page).then(res=>{
      setLoading(false)
      setProducts(res.data)
    }).catch(err=>{
      toast.error(err.message)
    })
  }
  const getProductsCount=()=>{
    // we want this function because on the bases of this we make our paginatio pages dynamically
    getProductsCounting().then(res=>{ 
      setProductsCount(res.data)
    })
  }
  useEffect(()=>{
    showProducts()
  },[page])

  useEffect(()=>{
    getProductsCount() 
  },[page])
const handleChange=(event,value)=>{
                    console.log("page",value);
                    return setPage(value)
                  }
  return (
    <Grid  container item spacing={2} 
    // sx={{backgroundColor:'blue'}}
    >
    
      <Grid item lg={12} sm={12} md={12} xs={12}>
        <h4 className="text-center  p-3 mt-5  mb-5 display-6" 
          // style={{backgroundColor:'rgb(183, 198, 181)'}}
          //  style={{backgroundColor:'rgb(108, 151, 212)'}}
          //  style={{backgroundColor:'rgb(125, 115, 119)'}}
           style={{
              color:'white',
              // background: 'linear-gradient(25deg, rgba(0, 90, 167, 1) 0%, rgba(199, 229, 252, 1) 86%)'
              background: 'linear-gradient(25deg, rgba(89, 150, 247) 0%, rgba(199, 229, 252, 1) 86%)'
                        
          }}

          >
          New Arrivals
        </h4>
      </Grid>
      
      {/* <Grid item lg={1} md={1} xs={0} sm={0}></Grid> */}
      
      {/* <div className='container'>  */}
      <Grid container item lg={12} md={12} sm={12} xs={12}  >

              {loading?<LoadingCard count={amountOfProducts}/>:
            
            // <div className="row">          
            //   {products.map(product=>{
            //     return <div className="col-md-3" key={product._id}>
            //       <ProductCard product={product} loading={loading}/>
            //     </div> 
            //   })}
            //     </div>
            <>
              {/* <div style={{width:'400xp',height:'500px'}}>
              <Card/>   

              </div> */}
              {products.map(product=>{
                return <Grid item lg={3} md={4} sm={6} xs={12} xl={3}
                sx={{
                  // backgroundColor:'orange',
                  // border:'solid' ,
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center'}} 
                key={product._id}>
                  {/* <ProductCard product={product} loading={loading}/> */}
                  <Card product={product} loading={loading}/>
                </Grid> 
              })}
                
              </>
            }
            {/* <div className="row"> */}
          <Grid item lg={12} sm={12} md={12} xs={12} >
                <Stack  className='mt-3' spacing={4}  direction="row" justifyContent='center'>
                  <Pagination count={Math.round(productsCount/4)} page={page} variant="outlined" onChange={handleChange} />
        
                  </Stack>
            </Grid>  

            {/* </div> */}

            {/* </div> */}
          </Grid>
      {/* <Grid item lg={1} md={1} xs={0} sm={0}></Grid> */}

    </Grid>
  )
}
export default NewArrivalComponent