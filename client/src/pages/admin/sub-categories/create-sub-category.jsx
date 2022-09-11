
import React, {  useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/category-form/category-form';
import FilterSearchItem from '../../../components/category-form/filter-search-item';
import CategoryItem from '../../../components/category-item/catergory-item';
import InputField from '../../../components/input-field/input-field.component';
import AdminNavs from '../../../components/nav/admin-navs';
import SubCategoryItem from '../../../components/sub-category-item/sub-catergory-item';
import { auth } from '../../../firebase';
import { createCategory, getCategories } from '../../../services/category-service';
import { createSubCategory, getSubCategories } from '../../../services/sub-category-services';




const CreateSubCategory = () => {
    let [name,setName]=useState('');
    let [loading,setLoading]=useState(false);
    let [keyword,setKeyword]=useState('');
    let [subCategories,setSubCategories]=useState([]);
    let [categories,setCategories]=useState([]);
    let [parentCategory,setParentCategory]=useState(['']);
    
    
    console.log("keyword",keyword)
     const getSubCategoriesFromBackend=() => {
        
        getSubCategories().then(res=>{setSubCategories(res.data)}).catch((err)=>{toast.error(err)})
      }
      const getCategoriesFromBackend=() => {
        
        getCategories().then(res=>{setCategories(res.data)}).catch((err)=>{toast.error(err)})
      }
    
     useEffect(()=>{
        getSubCategoriesFromBackend();
        getCategoriesFromBackend();
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault()
        setLoading(true)
        let idToken=auth.currentUser.accessToken
        createSubCategory(name,parentCategory,idToken).then((resp)=>{
                console.log("category response",resp);
                setLoading(false) 
                
                    toast.success(`${resp.data.name} is created successfully`)
                    setName('')
                    setParentCategory('')
                    getSubCategoriesFromBackend()  
                    
                    
                }).catch((err)=>{
                    setLoading(false)
                    return toast.error(err.response.data)})    

    }
    let keywordM=keyword.toLowerCase();
    const searched=(keywordM)=>(item)=>item.name.toLowerCase().includes(keywordM)

   
    console.log("subCategories",subCategories)
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
                            <select name="parent" id="" 
                                onChange={(e)=>{setParentCategory(e.target.value)}}
                                className='form-select' >
                                <option value="none" selected disabled hidden>Parent</option>
                                {categories.length>0 && categories.map(item=>{
                                    return <option key={item._id} value={item._id}>{item.name}</option>
                                })}
                            </select>
                            

                        </div>
                        <CategoryForm handleSubmit={handleSubmit} name={name} setName={setName}/>
                        
                         <FilterSearchItem setKeyword={setKeyword} keyword={keyword}/>

                         <h3 style={{marginBottom:'20px'}}>Sub-Catergories</h3>

                        {subCategories.filter(searched(keywordM)).map((item)=>{
                           return <SubCategoryItem key={item._id} item={item} subCategories={subCategories}
                           getSubCategoriesFromBackend={()=>getSubCategoriesFromBackend()}
                           />
                        })}
                        </>    
                    )
                    }    
                    
                {/* </div> */}
            </div>
        </div>
    </div>
    )
}


export default CreateSubCategory