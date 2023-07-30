import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card'
import LoadingSipner from '../../components/spin/spin'
import { getcategory } from '../../services/category-service'
import Card from '../../components/CardsMouseFlow/cards'
import { Container, Grid } from '@mui/material'

const CategoryHome = () => {
    const {slug}=useParams()
    const[loading,setLoading]=useState(false)
    const[products,setProducts]=useState([])
    const[category,setCategory]=useState()
    const loadProductFromCategory=()=>{
        setLoading(true)
        getcategory(slug).then((res)=>{
            setLoading(false)
            console.log("load Product From Category",res.data);
            setProducts(res.data.findProducts)
            setCategory(res.data.category)
        }).catch(err=>{
            setLoading(false)
            console.log("loadProductFromCategory",err.message)
        })
    }
    console.log("category",category);

    useEffect(()=>{
        loadProductFromCategory()
    },[])
  return (
    <Container disableGutters={true} >
        <Grid container>
        <Grid item lg={12} md={12} xs={12} sm={12}>
           

            <h4 className="text-center p-3 mt-4 mb-4 display-6 rounded-4" 
             style={{
              color:'white',
              background: 'linear-gradient(25deg, rgba(0, 90, 167, 1) 0%, rgba(199, 229, 252, 1) 86%)'
                        
          }}>
                {products && products.length} Products in {category && category.name} category
            </h4>
        </Grid>

        <Grid container item spacing={10}  lg={12} md={12} sm={12} xs={12}>
            
            
            {  loading? <LoadingSipner/>: (
                
                products && products.length>0 ?(
                    products.map((product)=>{
                        return  <Grid item lg={3} md={4} sm={6} xs={12} key={product._id}
                                sx={{
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

export default CategoryHome