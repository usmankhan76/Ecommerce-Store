


import React, {  useEffect, useState } from 'react'
import {  useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/category-form/category-form';
// import InputField from '../../../components/input-field/input-field.component';
import AdminNavs from '../../../components/nav/admin-navs';
import { auth } from '../../../firebase';
import { getcategory, updateCategory } from '../../../services/category-service';




const UpdateCategoryItem = () => {
    const {slug}=useParams();
    const navigate=useNavigate();
    console.log(slug,"its prams");
    let [name,setName]=useState('');
    let [loading,setLoading]=useState(false);
   
    
    
     const getCategoryFromBackend=(slug) => {
        
        getcategory(slug).then(res=>{
            // console.log(res.data,"data coming")
            setName(res.data.name)
        }).catch((err)=>{toast.error(err)})
        
      }
    
     useEffect(()=>{
        getCategoryFromBackend(slug);
    },[slug])

    const handleSubmit=(event)=>{
        event.preventDefault()
        setLoading(true)
        let idToken=auth.currentUser.accessToken
        updateCategory(slug,name,idToken).then((resp)=>{
                console.log("category response",resp);
                setLoading(false) 
                
                    toast.success(`${resp.data.name} is updated successfully`)
                    setName('')
                navigate('/admin/dashboard/category')
                    
                    
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

                    <h4>Update Category</h4>
                    {
                        loading?(
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </div>
                        </div> )
                        :(
                        <>
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>

                        
                        </>    
                    )
                    }    
                    
                {/* </div> */}
            </div>
        </div>
    </div>
    )
}



export default UpdateCategoryItem