import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'

import FileUpload from '../../../components/file-upload/file-upload'
import AdminNavs from '../../../components/nav/admin-navs'
import ProductUpdateForm from '../../../components/product-form/product-update-form'
import LoadingSipner from '../../../components/spin/spin'
import { getCategories, getParentSubCategories } from '../../../services/category-service'
import { getProduct, updateProduct } from '../../../services/product-services'
// import { getParentSubCategories } from '../../../services/category-service'


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
const UpdateProduct = () => {
    const[values,setValues]=useState(initialValues);
    const {authUserToken}=useSelector((state=>state.user))
    const[subCategories,setSubCategories]=useState([])
    const[categories,setCategories]=useState([])
    const[selectedCategory,setSelectedCategory]=useState('')
    const[showsubs,setShowSubs]=useState(false)
    const[showUpdateForm,setShowUpdateForm]=useState(false)
    const[laoding,setLoading]=useState(false)
    const {slug}=useParams();
    const navigate=useNavigate();

    const getProductFromBackend=()=>{
        setShowUpdateForm(false)
        getProduct(slug).then(res=>{
            console.log("Product check",res.data);
            setShowUpdateForm(true)
            setValues({...values,...res.data});
            setShowSubs(true)
            setSubCategories(res.data.subs)
        })
    }
    
    const handleCategoryChange=(e)=>{
        e.preventDefault()
        
        setValues({...values,subs:[]})
        setSelectedCategory(e.target.value)
        console.log("Selected Category",selectedCategory);
        getParentSubCategories(e.target.value).then((res)=>{
            console.log("Parent subCategories",res.data);
            setShowSubs(true);
            console.log("check",showsubs)
            setSubCategories(res.data);
        }).catch(error=>console.log(error.message))

        if(values.category._id=== e.target.value){
           
            getProductFromBackend()
            getParentSubCategories(e.target.value).then((res)=>{
                
                setShowSubs(true);
                setSubCategories(res.data);
                
            }).catch(error=>console.log(error.message))

        }
    }
     
    
    let authtoken=authUserToken
    const handleSubmit=(e)=>{
        e.preventDefault()
       setLoading(true)
        updateProduct(slug,values,authtoken).then((res)=>{
            console.log("update response",res.data)
       setLoading(false)
            toast.success(`${res.data.title} is update successfully`)
            navigate('/admin/dashboard/products')
    
        }).catch((err)=>{
            console.log("product error",err);
            setLoading(false)
            toast.error(err.response.data.err)
          })
    }
    const getCategoriesFromBackend=() => {
        
        getCategories().then(res=>{
            setCategories(res.data)
            }).catch((err)=>{toast.error(err)})
      }
    useEffect(()=>{
        getCategoriesFromBackend()
        getProductFromBackend();
    },[])
    
  return (
     <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNavs/>
            </div>
            <div className="col-md-10" >
                <h4>Update product</h4>
                <hr />
                <div>
                {showUpdateForm?(
                    <>
                    <div className="p-3">
                    <FileUpload values={values}setValues={setValues}/>
                    </div>
                 
                    <ProductUpdateForm  values={values} handleSubmit={handleSubmit} setValues={setValues} 
                    selectedCategory={selectedCategory}
                    handleCategoryChange={handleCategoryChange}
                    showsubs={showsubs} subCategories={subCategories} categories={categories} laoding={laoding}
                    />
               </>
                ):(<LoadingSipner/>)}</div>
                
         
            </div>
        </div>
    </div>
  )
}

export default UpdateProduct