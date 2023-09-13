import axios from "axios"


export const createSubCategory=async (subCategory,parentCategory,authtoken)=>{
    console.log("create sub",subCategory,parentCategory,authtoken)
    const options={
        method:'POST',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/subCategory`,
        data:{subCategory,parentCategory},
        headers:{authtoken}
    }
    return await axios.request(options)
}
export const getSubCategories=async() => { 
    const options={
        method:'GET',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/subCategories`,

    }
    return await axios.request(options)
 }

export const removeSubCategory=async(slug,authtoken)=>{
    const options={
        method:'DELETE',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/subCategory/${slug}`,
        headers:{authtoken}
    }
    return await axios.request(options)

}

export const getSubCategory=async(slug)=>{
    const options={
        method:'GET',
        url:`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/subCategory/${slug}`,

    }
    return await axios.request(options)
}

export const updateSubCategory=async(slug,subCategory,parentCategory,idToken)=>{
    let authtoken=idToken;
    console.log("update service authtoken",authtoken,)
    const options={
         method: 'PUT',
        url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/subCategory/${slug}`,
        data:{subCategory,parent:parentCategory},
        headers:{
            authtoken,}
        }
    return await axios.request(options)
        
}