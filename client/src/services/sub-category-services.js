import axios from "axios"


export const createSubCategory=async (subCategory,parentCategory,authtoken)=>{
    console.log("create sub",subCategory,parentCategory,authtoken)
    const options={
        method:'POST',
        url:`/api/subCategory`,
        // url:`${process.env.REACT_APP_API}/subCategory`,
        data:{subCategory,parentCategory},
        headers:{authtoken}
    }
    return await axios.request(options)
}
export const getSubCategories=async() => { 
    const options={
        method:'GET',
        url:`/api/subCategories`,
        //  url:`${process.env.REACT_APP_API}/subCategories`,

    }
    return await axios.request(options)
 }

export const removeSubCategory=async(slug,authtoken)=>{
    const options={
        method:'DELETE',
        url:`/api/subCategory/${slug}`,
        // url:`${process.env.REACT_APP_API}/subCategory/${slug}`,
        headers:{authtoken}
    }
    return await axios.request(options)

}

export const getSubCategory=async(slug)=>{
    const options={
        method:'GET',
        url:`/api/subCategory/${slug}`,
        // url:`${process.env.REACT_APP_API}/subCategory/${slug}`,
    }
    return await axios.request(options)
}

export const updateSubCategory=async(slug,subCategory,parentCategory,idToken)=>{
    let authtoken=idToken;
    console.log("update service authtoken",authtoken,)
    const options={
         method: 'PUT',
        url: `/api/subCategory/${slug}`,
        //  url: `${process.env.REACT_APP_API}/subCategory/${slug}`,
        data:{subCategory,parent:parentCategory},
        headers:{
            authtoken,}
        }
    return await axios.request(options)
        
}