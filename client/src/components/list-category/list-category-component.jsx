import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../services/category-service' 
const ListCategoryComponent = () => {
    const[loading,setLoading]=useState(false)
    const[categories,setCategories]=useState([])

    const laodCategories=()=>{
        setLoading(true)
        getCategories().then((res)=>{
           
            setLoading(false)
            setCategories(res.data)
        }).catch(err=>console.log("Load categories error",err.message))

    }

    const  showCategories=()=>{
        return categories.map(item=>{
            return <div className='col'
                        key={item._id} 
                        
                        // style={{backgroundColor:'#004080',}}
                    >
                        <Link to={`/category/${item.slug}` } 
                            className=" btn btn-outlined btn-lg  btn-block btn-raised m-3"
                            style={{textDecoration:'none',color:'white', backgroundColor:'#004080',width:"200px"}}>
                            {item.name}
                        </Link>
                    </div>
        })
    }

    useEffect(()=>{
        laodCategories()
    },[])

  return (
    <>
    <h4 className="text-center p-3 mt-5 mt-5 mb-5 display-6" style={{backgroundColor:'rgb(183, 198, 181)'}}>
    Categories
    </h4>
    <div className='container'>

        <div className="row">
        
            {loading ? <h4>Loading...</h4> : (showCategories())}
        </div>
    </div>
    </>
  )
}

export default ListCategoryComponent