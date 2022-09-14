import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import AdminNavs from '../../../components/nav/admin-navs'
import ProductForm from '../../../components/product-form/product-form'
import { getParentSubCategories } from '../../../services/category-service'
import { createProduct } from '../../../services/product-services'

const initialValues={
    title:'',
    description:'',
    price:"",
    categories:[],
    category:"",
    subs:[],
    shipping:"",
    quantity:"",
    images:[],
    colors:["Black","Brown","Silver","white","Blue"],
    brands:["Apple","Samsung","Microsoft","Lenevo","ASUS"],
    color:"",
    brand:"",

    
}
const CreateProduct = () => {
    const[values,setValues]=useState(initialValues)
    const {authUserToken}=useSelector((state=>state.user))
    const[subCategories,setSubCategories]=useState([])
    const[showsubs,setShowSubs]=useState(false)
    
    const handleCategoryChange=(e)=>{
        e.preventDefault()
        console.log("category change",e.target.value);
        setValues({...values,category:e.target.value})
        getParentSubCategories(e.target.value).then((res)=>{
          console.log("Parent subCategories",res.data);
          setShowSubs(true);
          console.log("check",showsubs)
          setSubCategories(res.data);
        }).catch(error=>console.log(error.message))
    } 
     
    
    let authtoken=authUserToken
    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(values);
        createProduct(values,authtoken).then((res)=>{
            console.log("Product response",res.data)
            toast.success(`${values.title} is created successfully`)
            window.location.reload();
    
        }).catch((err)=>{
            console.log("product error",err);
            toast.error(err.response.data.err)
          })
    }
    console.log("categories",values.categories);
  return (
     <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNavs/>
            </div>
            <div className="col" >
                <h4>create product</h4>
                <hr />
               <ProductForm  values={values} handleSubmit={handleSubmit} setValues={setValues} handleCategoryChange={handleCategoryChange} showsubs={showsubs} subCategories={subCategories} />
         
            </div>
        </div>
    </div>
  )
}

export default CreateProduct