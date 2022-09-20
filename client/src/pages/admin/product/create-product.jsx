import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FileUpload from '../../../components/file-upload/file-upload'
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
    colors:["Black","Brown","Silver","White","Blue"],
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
        
        setValues({...values,subs:[],category:e.target.value})
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
       
        createProduct(values,authtoken).then((res)=>{
            console.log("Product response",res.data)
            toast.success(`${values.title} is created successfully`)
            window.location.reload();
    
        }).catch((err)=>{
            console.log("product error",err);
            toast.error(err.response.data.err)
          })
    }
    
  return (
     <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNavs/>
            </div>
            <div className="col-md-10" >
                <h4>create product</h4>
                <hr />
                <div className="p-3">
                    <FileUpload values={values}setValues={setValues}/>
                    </div>
                 {JSON.stringify(values.images)}   
               <ProductForm  values={values} handleSubmit={handleSubmit} setValues={setValues} handleCategoryChange={handleCategoryChange} showsubs={showsubs} subCategories={subCategories} />
         
            </div>
        </div>
    </div>
  )
}

export default CreateProduct