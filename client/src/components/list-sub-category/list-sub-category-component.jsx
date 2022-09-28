import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubCategories } from '../../services/sub-category-services'
const ListSubCategoryComponent = () => {
    const[loading,setLoading]=useState(false)
    const[subCategories,setSubCategories]=useState([])

    const laodSubCategories=()=>{
        setLoading(true)
        getSubCategories().then((res)=>{
           
            setLoading(false)
            setSubCategories(res.data)
        }).catch(err=>console.log("Load Subcategories error",err.message))

    }

    const  showSubCategories=()=>{
        return subCategories.map(item=>{
            return <div className='col'
                        key={item._id} 
                        
                    >
                        <Link to={`/sub-category/${item.slug}` } 
                            className=" btn btn-outlined btn-lg  btn-block btn-raised m-3"
                            style={{textDecoration:'none',color:'white', backgroundColor:'#004080',width:"200px",whiteSpace:'nowrap'}}>
                            {item.name}
                        </Link>
                    </div>
        })
    }

    useEffect(()=>{
        laodSubCategories()
    },[])

  return (
    <>
    <h4 className="text-center p-3 mt-5 mt-5 mb-5 display-6" style={{backgroundColor:'rgb(183, 198, 181)'}}>
    Sub Categories
    </h4>
    <div className='container'>

        <div className="row">
        
            {loading ? <h4>Loading...</h4> : (showSubCategories())}
        </div>
    </div>
    </>
  )
}

export default ListSubCategoryComponent