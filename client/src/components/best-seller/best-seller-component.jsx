import { Grid, Pagination, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { getProducts, getProductsCounting } from '../../services/product-services';
import LoadingCard from '../cards-item/loading-card';
import ProductCard from '../product-card/product-card';
import Card from '../CardsMouseFlow/cards';


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
    <Grid container item spacing={2}>
      <Grid item lg={12} sm={12} md={12} xs={12}>
          <h4 
            className="text-center p-3 mt-5 mt-5 mb-5 display-6" 
            // style={{backgroundColor:'rgb(183, 198, 181)'}}
            // style={{backgroundColor:'rgb(108, 151, 212)'}}
            //  style={{backgroundColor:'rgb(125, 115, 119)'}}
              style={{
                // backgroundColor:'rgb(134, 134, 134)',
                color:'white',
              background: 'linear-gradient(25deg, rgba(89, 150, 247) 0%, rgba(199, 229, 252, 1) 86%)'
            }}
            >
            Best Seller
          </h4>

      </Grid>
    


      <Grid container item lg={12} md={12} sm={12} >  
            {loading?<LoadingCard count={4}/>:<>
            
              
             {products.map(product=>{
              return <Grid item lg={3} md={4} sm={6} xs={12} xl={3} key={product._id}
                   sx={{ // we do thie b/c the items are not centerd in Grid so we did it
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center'
                }}
                  >
                {/* <ProductCard product={product} loading={loading}/> */}
                <Card product={product} loading={loading}/>
              </Grid> 
            })}
        
              


            </>
           
          }



          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Stack spacing={2} className='mt-3' justifyContent='center' direction="row">
              <Pagination  count={Math.round(productsCount/4)} variant="outlined" page={page} onChange={handleChange}/>
            </Stack>
          </Grid>
      </Grid>

    </Grid>
  )
}
export default BestSellerComponent