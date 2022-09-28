import { Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getProducts, getProductsCounting } from '../../services/product-services';
import LoadingCard from '../cards-item/loading-card';
import ProductCard from '../product-card/product-card';


 const BestSellerComponent = () => {
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(false);
  const[productsCount,setProductsCount]=useState(0)
  const[page,setPage]=useState(1)
  
  const showProducts=()=>{
    setLoading(true)
    getProducts("sold","desc",page).then(res=>{
      setLoading(false)
      setProducts(res.data)
    }).catch(err=>{
      toast.error(err.message)
    })
  }
  const getProductsCount=()=>{
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
    
    <h4 className="text-center p-3 mt-5 mt-5 mb-5 display-6" style={{backgroundColor:'rgb(183, 198, 181)'}}>
      Best Seller
    </h4>
    <div className='container'> 
    
                
            {loading?<LoadingCard count={4}/>:
           
          <div className="row">
             {products.map(product=>{
              return <div className="col-md-3" key={product._id}>
                <ProductCard product={product} loading={loading}/>
              </div> 
            })}
        
              </div>
          }
          <div className='row'>
            <Stack spacing={2} className='mt-3' justifyContent='center' direction="row">
              <Pagination  count={Math.round(productsCount/4)} variant="outlined" page={page} onChange={handleChange}/>
            </Stack>
          </div>
       
      </div>
                </>
  )
}
export default BestSellerComponent