import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card'
import LoadingSipner from '../../components/spin/spin'
import { getSubCategory } from '../../services/sub-category-services'
import Card from '../../components/CardsMouseFlow/cards'
import { Container, Grid } from '@mui/material'
// import { Container } from 'react-bootstrap'

const SubCategoryHome = () => {
    const {slug}=useParams()
    const[loading,setLoading]=useState(false)
    const[products,setProducts]=useState([])
    const[subCategory,setSubCategory]=useState()
    const loadProductFromSubCategory=()=>{
        setLoading(true)
        getSubCategory(slug).then((res)=>{
            setLoading(false)
            console.log("load Product From SubCategory",res.data);
            setProducts(res.data.findProducts)
            setSubCategory(res.data.Subategory)
        }).catch(err=>{
            setLoading(false)
            console.log("loadProductFromCategory",err.message)
        })
    }
    console.log("Subcategory",subCategory);

    useEffect(()=>{
        loadProductFromSubCategory()
    },[])
  return (
    // <div className='container'>
    //     <div className="row">
    //         <div className="col">

    //         <h4 className="text-center p-3 mt-4 mb-4 display-6 rounded-4"  style={{
    //           color:'white',
    //           background: 'linear-gradient(25deg, rgba(0, 90, 167, 1) 0%, rgba(199, 229, 252, 1) 86%)'
                        
    //       }}>
    //             {products && products.length} Products in {subCategory && subCategory.name} Sub category
    //         </h4>
    //         </div>
    //     </div>

    //     <div className="row">
            
            
    //         {  loading? <LoadingSipner/>: (
                
    //             products && products.length>0 ?(
    //                 products.map((product)=>{
    //                     return  <div className="col-md-3 pb-5" key={product._id}>
    //                             {/* <ProductCard product={product} /> */}
    //                             <Card product={product} />
    //                            </div>
    //                         }

    //                 ) ): "No Product Found"   
                
    //             )}

    //     </div>
        
    // </div>
        
     <Container disableGutters={true}  >
        <Grid container >
        <Grid item lg={12} md={12} xs={12} sm={12}>

            <h4 className="text-center p-3 mt-4 mb-4 display-6 rounded-4"  style={{
              color:'white',
              background: 'linear-gradient(25deg, rgba(0, 90, 167, 1) 0%, rgba(199, 229, 252, 1) 86%)'
                        
          }}>
                {products && products.length} Products in {subCategory && subCategory.name} Sub category
            </h4>
           

        </Grid>

        <Grid container item spacing={6}  lg={12} md={12} sm={12} xs={12}>
            
            
            {  loading? <LoadingSipner/>: (
                
                products && products.length>0 ?(
                    products.map((product)=>{
                        return  <Grid item lg={3} md={4} sm={6} xs={12} key={product._id} sx={{
                  // backgroundColor:'orange',
                  // border:'solid' ,
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'center'}} >
                                {/* <ProductCard product={product} /> */}
                                <Card product={product} />
                               </Grid>
                            }

                    ) ): "No Product Found"   
                
                )}

        </Grid>
        </Grid>
    </Container>
    
  )
}

export default SubCategoryHome