
import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CategoryForm from '../../../components/category-form/category-form';
import FilterSearchItem from '../../../components/category-form/filter-search-item';
import CategoryItem from '../../../components/category-item/catergory-item';
import InputField from '../../../components/input-field/input-field.component';
import AdminNavs from '../../../components/nav/admin-navs';
import { auth } from '../../../firebase';
import { createCategory, getCategories } from '../../../services/category-service';




const CreateCategory = () => {
    let [name,setName]=useState('');
    let [loading,setLoading]=useState(false);
    let [keyword,setKeyword]=useState('');
    let [categories,setCategories]=useState([]);
    
    
    console.log("keyword",keyword)
     const getCategoriesFromBackend=() => {
        
        getCategories().then(res=>{setCategories(res.data)}).catch((err)=>{toast.error(err)})
      }
    
     useEffect(()=>{
        getCategoriesFromBackend();
    },[])

    const handleSubmit=(event)=>{
        event.preventDefault()
        setLoading(true)
        let idToken=auth.currentUser.accessToken
        createCategory(name,idToken).then((resp)=>{
                console.log("category response",resp);
                setLoading(false) 
                
                    toast.success(`${resp.data.name} is created successfully`)
                    setName('')
                    getCategoriesFromBackend()  
                    
                    
                }).catch((err)=>{
                    setLoading(false)
                    return toast.error(err.response.data)})    

    }
    let keywordM=keyword.toLowerCase();
    const searched=(keywordM)=>(item)=>item.name.toLowerCase().includes(keywordM)

   
    console.log("catergory",categories)
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNavs/>
            </div>
            <div className="col" >
                {/* <div className='position-absolute top-50 start-50 translate-middle' style={{width:'50%',}}> */}

                    <h4>Create Category</h4>
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
                        
                         <FilterSearchItem setKeyword={setKeyword} keyword={keyword}/>

                         <h3 style={{marginBottom:'20px'}}>Catergories</h3>

                        {categories.filter(searched(keywordM)).map((item)=>{
                           return <CategoryItem key={item._id} item={item} categories={categories}
                           getCategoriesFromBackend={()=>getCategoriesFromBackend()}
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


export default CreateCategory