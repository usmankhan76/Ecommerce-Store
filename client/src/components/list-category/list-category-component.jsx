import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getCategories } from '../../services/category-service' 
import { Grid } from '@mui/material'
import CategoryButton from '../category-button/categoryButton'
const ListCategoryComponent = () => {
    const[loading,setLoading]=useState(false)
    const[categories,setCategories]=useState([])

    const laodCategories=()=>{
        setLoading(true)
        getCategories().then((res)=>{
           console.log("---------------><",res.data)
            setLoading(false)
            setCategories(res.data)
        }).catch(err=>console.log("Load categories error",err.message))

    }

    // const  showCategories=()=>{
    //     return categories.map(item=>{
    //         return <Grid item lg={3} md={3} sm={4} xs={12}
    //             // div className='col'
    //                     key={item._id} 
    //                     sx={{ // we do thie b/c the items are not centerd in Grid so we did it
    //                         //             backgroundColor:'orange',
    //                         // border:'solid' ,
    //                         display:'flex',
    //                         flexDirection:'column',
    //                         alignItems:'center'
    //                         }}
    //                     // style={{backgroundColor:'#004080',}}
    //                 >
    //                     <Link to={`/category/${item.slug}` } 
    //                         className=" btn btn-outlined btn-lg  btn-block btn-raised m-3"
    //                         style={{textDecoration:'none',color:'white', backgroundColor:'#004080',width:"200px"}}>
    //                         {item.name}
    //                     </Link>
    //                 </Grid>
    //     })
    // }



     const  showCategories=()=>{
        console.log("->>>>>>>>>>",loading,categories.length)
        return  categories.map(item=>{
            return <Grid item lg={3} md={3} sm={4} xs={12}
                // div className='col'
                        key={item._id} 
                        sx={{ // we do thie b/c the items are not centerd in Grid so we did it
                            //             backgroundColor:'orange',
                            // border:'solid' ,
                            display:'flex',
                            flexDirection:'column',
                            alignItems:'center'
                            }}
                        // style={{backgroundColor:'#004080',}}
                    >
                        <CategoryButton text={item.name} slug={`/category/${item.slug}` }/>
                    </Grid>
        })
    }

    useEffect(()=>{
        laodCategories()
    },[])

  return (
    <Grid container item spacing={2} >
    <Grid item lg={12} md={12} sm={12} xs={12}>

        <h4 className="text-center p-3 mt-5 mt-5 mb-5 display-6" 
            // style={{backgroundColor:'rgb(108, 151, 212)'}}
            //  style={{backgroundColor:'rgb(125, 115, 119)'}}
             style={{
                color:'white',
                background: 'linear-gradient(25deg, rgba(89, 150, 247) 0%, rgba(199, 229, 252, 1) 86%)'
                // background: 'linear-gradient(25deg, rgba(0, 90, 167, 1) 0%, rgba(199, 229, 252, 1) 86%)'
            }}

            >
        Categories
        </h4>
    </Grid>

     <Grid container rowSpacing={2} item lg={12} md={12} sm={12} xs={12}>
        {/* <Grid item lg={3} md={3} sm={3} xs={3}> */}
            {loading ? <h4>Loading...</h4> :(showCategories())}
        {/* </Grid> */}
    </Grid>
    </Grid>
  )
}

export default ListCategoryComponent