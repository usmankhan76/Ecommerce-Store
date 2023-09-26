import axios from "axios"

export const getCategories=async() => {
    const options = {
        method: 'GET',
        // url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/categories`,
         url: `${process.env.REACT_APP_API}/categories`,
    };

    return await axios.request(options);
 }

export const getcategory=async(slug) => {
    // console.log("category slug",slug)
    const options = {
        method: 'GET',
        // url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/category/${slug}`,
        url: `${process.env.REACT_APP_API}/category/${slug}`,
    };

     return await axios.request(options);
 }
 export const removeCategory=async(slug,authtoken) => {
    const options = {
        method: 'DELETE',
        // url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/category/${slug}`,
        url: `${process.env.REACT_APP_API}/category/${slug}`,
        headers:{authtoken}
    };

    return await axios.request(options);
 }
export const updateCategory=async(slug,category,authtoken) => {
    
    const options = {
        method: 'PUT',
        // url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/category/${slug}`,
        url: `${process.env.REACT_APP_API}/category/${slug}`,
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
        // url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/category`,
        url: `${process.env.REACT_APP_API}/category`,
        data: {category},
        headers:{
            authtoken,
        }
    };

    return await axios.request(options);
    // return await  axios.post('`${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}`/category',category,{
    //     headers:{authtoken}
    // })
 }

 export const getParentSubCategories=async(_id) => {
    console.log("ID check",_id);
    const options = {
        method: 'GET',
        // url: `${process.env.NODE_ENV==='production'?process.env.REACT_APP_API:'http://localhost:8000/api'}/category/sub/${_id}`,
        url: `${process.env.REACT_APP_API}/category/sub/${_id}`,
    };

     return await axios.request(options);
 }