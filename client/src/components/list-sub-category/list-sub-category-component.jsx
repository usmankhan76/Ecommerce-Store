import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getSubCategories } from '../../services/sub-category-services'
import { Grid } from '@mui/material'
import CategoryButton from '../category-button/categoryButton'
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

    // const  showSubCategories=()=>{
    //     return subCategories.map(item=>{
    //         return <Grid item lg={3} md={3} sm={4} xs={12}
    //                     key={item._id} 
    //                     sx={{ // we do thie b/c the items are not centerd in Grid so we did it
    //                         //             backgroundColor:'orange',
    //                         // border:'solid' ,
    //                         display:'flex',
    //                         flexDirection:'column',
    //                         alignItems:'center'
    //                         }}
                        
    //                 >
    //                     <Link to={`/sub-category/${item.slug}` } 
    //                         className=" btn btn-outlined btn-lg  btn-block btn-raised m-3"
    //                         style={{textDecoration:'none',color:'white', backgroundColor:'#004080',width:"200px",whiteSpace:'nowrap'}}>
    //                         {item.name}
    //                     </Link>
    //                 </Grid>
    //     })
    // }


    const  showSubCategories=()=>{
        return subCategories.map(item=>{
            return <Grid item lg={3} md={3} sm={4} xs={12}
                        key={item._id} 
                        sx={{ // we do thie b/c the items are not centerd in Grid so we did it
                            //             backgroundColor:'orange',
                            // border:'solid' ,
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center'
                            }}
                        
                    >
                        {/* <Link to={`/sub-category/${item.slug}` } 
                            className=" btn btn-outlined btn-lg  btn-block btn-raised m-3"
                            style={{textDecoration:'none',color:'white', backgroundColor:'#004080',width:"200px",whiteSpace:'nowrap'}}>
                            {item.name}
                        </Link> */}
                        <CategoryButton text={item.name} slug={`/sub-category/${item.slug}`}/>
                    </Grid>
        })
    }

    useEffect(()=>{
        laodSubCategories()
    },[])

  return (
    <Grid container item spacing={0} sx={{marginBottom:'20px'}}>
        <Grid item lg={12} sm={12} md={12} xs={12}>
            <h4 className="text-center p-3 mt-5 mt-5 mb-5 display-6" 
            // style={{backgroundColor:'rgb(108, 151, 212)'}}
            //  style={{backgroundColor:'rgb(125, 115, 119)'}}
             style={{
                color:'white',
                background: 'linear-gradient(25deg, rgba(89, 150, 247) 0%, rgba(199, 229, 252, 1) 86%)'
}}
            >
            Sub Categories
            </h4>

        </Grid>
    
        <Grid container item rowSpacing={2} lg={12} md={12} sm={12} xs={12}>
        
            {loading ? <h4>Loading...</h4> : (showSubCategories())}
    </Grid>

    </Grid>
  )
}

export default ListSubCategoryComponent