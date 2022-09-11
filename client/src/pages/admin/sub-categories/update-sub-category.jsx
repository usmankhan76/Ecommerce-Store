
import React, {  useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/category-form/category-form';
import AdminNavs from '../../../components/nav/admin-navs';
import { auth } from '../../../firebase';
import {  getCategories } from '../../../services/category-service';
import {  getSubCategory, updateSubCategory } from '../../../services/sub-category-services';




const UpdateSubCategoryItem = () => {
    
    let [loading,setLoading]=useState(false);
   
    let [subCategory,setSubCategory]=useState([]);
    let [categories,setCategories]=useState([]);
    let [parentCategory,setParentCategory]=useState(['']);
    const {slug}=useParams();
    const navigate=useNavigate();
    
     const getSubCategoryFromBackend=() => {
        
        getSubCategory(slug).then(res=>{
           
            setSubCategory(res.data.name)
            setParentCategory(res.data.parent)
        }).catch((err)=>{toast.error(err)})
      }
      const getCategoriesFromBackend=() => {
        
        getCategories().then(res=>{setCategories(res.data)}).catch((err)=>{toast.error(err)})
      }
    
     useEffect(()=>{
        getSubCategoryFromBackend();
        getCategoriesFromBackend();
    },[])
    
    const handleSubmit=(event)=>{
        event.preventDefault()
        setLoading(true)
        let idToken=auth.currentUser.accessToken
        console.log("authtoken in update",idToken)
        updateSubCategory(slug,subCategory,parentCategory,idToken).then((resp)=>{
                console.log("category response",resp);
                setLoading(false) 
                
                    toast.success(`${resp.data.name} is updated successfully`)
                    setSubCategory('')
                    setParentCategory('')
                    getSubCategoryFromBackend()  
                    navigate('/admin/dashboard/sub-category')
                    
                }).catch((err)=>{
                    setLoading(false)
                    return toast.error(err.response.data)})    

    }
   

   
   
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNavs/>
            </div>
            <div className="col" >
                {/* <div className='position-absolute top-50 start-50 translate-middle' style={{width:'50%',}}> */}

                    <h4>Create Sub-Category</h4>
                    {
                        loading?(
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </div>
                        </div> )
                        :(
                        <>
                        <div className="form-group">
                            <label htmlFor="parent" className='form-label'>Select Parent Category</label>
                            <select name="parent" 
                                id="" 
                                onChange={(e)=>{setParentCategory(e.target.value)}}
                                className='form-select' >
                                {/* <option value="none" selected disabled hidden>Parent</option> */}
                                {categories.length>0 && categories.map(item=>{
                                    return <option key={item._id} value={item._id}
                                    selected={item._id===parentCategory}
                                    >{item.name}</option>
                                })}
                            </select>
                            

                        </div>
                        <CategoryForm handleSubmit={handleSubmit} name={subCategory} setName={setSubCategory}/>
                        
                        

                        

                        
                        </>    
                    )
                    }    
                    
                {/* </div> */}
            </div>
        </div>
    </div>
    )
}


export default UpdateSubCategoryItem