// import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getProducts, getProductsCounting } from '../../services/product-services';
import LoadingCard from '../cards-item/loading-card';

import ProductCard from '../product-card/product-card';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

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
    <>
    
    <h4 className="text-center p-3 mt-5 mt-5 mb-5 display-4" style={{backgroundColor:'rgb(183, 198, 181)'}}>
      New Arrivals
    </h4>
    <div className='container'> 
    
                
            {loading?<LoadingCard count={amountOfProducts}/>:
           
          <div className="row">
             {products.map(product=>{
              return <div className="col-md-3" key={product._id}>
                <ProductCard product={product} loading={loading}/>
              </div> 
            })}
        
              </div>
          }
          <div className="row">
               <Stack className='mt-3' spacing={4} direction="row" justifyContent='center' >
                 <Pagination count={Math.round(productsCount/4)} page={page} variant="outlined" onChange={handleChange} />
      
                </Stack>

          </div>
          </div>
                </>
  )
}
export default NewArrivalComponent