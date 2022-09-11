import axios from "axios"

export const getCategories=async() => {
    const options = {
        method: 'GET',
        url: 'http://localhost:8000/api/categories',
        
    };

    return await axios.request(options);
 }

export const getcategory=async(slug) => {
    // console.log("category slug",slug)
    const options = {
        method: 'GET',
        url: `http://localhost:8000/api/category/${slug}`,
        
    };

     return await axios.request(options);
 }
 export const removeCategory=async(slug,authtoken) => {
    const options = {
        method: 'DELETE',
        url: `http://localhost:8000/api/category/${slug}`,
        headers:{authtoken}
    };

    return await axios.request(options);
 }
export const updateCategory=async(slug,category,authtoken) => {
    
    const options = {
        method: 'PUT',
        url: `http://localhost:8000/api/category/${slug}`,
        data:{category},
        headers:{
            authtoken,
        }
    };

    return await axios.request(options);
 }

 export const createCategory=async(category,authtoken) => {
   
    const options = {
        method: 'POST',
        url: 'http://localhost:8000/api/category',
        data: {category},
        headers:{
            authtoken,
        }
    };

    return await axios.request(options);
    // return await  axios.post('http://localhost:8000/api/category',category,{
    //     headers:{authtoken}
    // })
 }
 