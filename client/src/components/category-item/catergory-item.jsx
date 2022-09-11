import React from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { auth } from '../../firebase'
import { removeCategory } from '../../services/category-service'

const CategoryItem = ({item,categories,getCategoriesFromBackend}) => {
  const {name,slug,}=item
 
  const handleRemove=async (slug)=>{
      if(window.confirm("You want to delte Category")){

        let idToken=auth.currentUser.accessToken
        await removeCategory(slug,idToken).then(res=>{
            console.log(res)
            toast.error("successfully removed")
            getCategoriesFromBackend()
            
        })
      }
  }
  return (
    <div className="alert alert-secondary" style={{marginTop:'10px'}} >
      {name}
      <span onClick={()=>handleRemove(slug,categories)}  className='float-end' style={{cursor:'pointer'}}>
        <i className=" float-right bi bi-trash text-danger " ></i>
      </span>
      <Link to={`/admin/catergory/${slug}`} className='float-end' style={{marginRight:'10px'}} >
        <i className="bi bi-pencil-square "></i>
      </Link>
    </div>
  )
}

export default CategoryItem