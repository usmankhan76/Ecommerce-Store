import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/product-card/product-card'
import LoadingSipner from '../../components/spin/spin'
import { getcategory } from '../../services/category-service'

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
    <div className='container'>
        <div className="row">
            <div className="col">

            <h4 className="text-center p-3 mt-4 mb-4 display-6 rounded-4" style={{backgroundColor:'rgb(183, 198, 181)'}}>
                {products && products.length} Products in {category && category.name} category
            </h4>
            </div>
        </div>

        <div className="row">
            
            
            {  loading? <LoadingSipner/>: (
                
                products && products.length>0 ?(
                    products.map((product)=>{
                        return  <div className="col-md-3 pb-5" key={product._id}>
                                <ProductCard product={product} />
                               </div>
                            }

                    ) ): "No Product Found"   
                
                )}

        </div>
        
    </div>
        
  )
}

export default CategoryHome