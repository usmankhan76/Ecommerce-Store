import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import CardItem from '../../../components/cards-item/cards-item';
import AdminNavs from '../../../components/nav/admin-navs';
import LoadingSipner from '../../../components/spin/spin';
import { getProducts, removeProduct } from '../../../services/product-services';
import {useSelector} from 'react-redux'

const AllProducts = () => {
  const [loading,setLoading]=useState(false);
  const [products,setProducts]=useState([]);
  const {authUserToken}=useSelector((state=>state.user))
  const getAllProducts=()=>{
    setLoading(false)

    getProducts(10).then(res=>{
      setLoading(false)
      setProducts(res.data)
    }).catch(err=>{
      setLoading(false)
      console.log("getporducts error",err.message);
    })
  }
  let authtoken=authUserToken;
  const handleRemove=async(slug)=>{
    console.log(slug);
    setLoading(true);
    let confirm=window.confirm("You want to Delet?")
    if(confirm){
      await removeProduct(slug,authtoken).then((res)=>{
        setLoading(false)
        getAllProducts();
        toast.success(`${res.data.title} is removed successfully `);
    }).catch(err=>{
      if(err.message.status===400) toast.error(err.response.data)
      console.log("Product remove error",err.message);
    })
    }
    
  }
  useEffect(()=>{
    getAllProducts();
  },[])
console.log("products",products);
  return (<>
   <div className="container-fluid">
        <div className="row">
            <div className="col-md-2" >
                <AdminNavs/>
            </div>
            <div className="col">

              <h3>Admin DashBoard</h3>
              {loading?<LoadingSipner/>:(
               <h5> All products</h5>
              )}
                <div className="row align-items-start">

                  {   products.map(item=>{
                    return <div className="col" key={item._id}>
                              <CardItem  product={item} handleRemove={handleRemove} loading={loading}/>
                           </div> })}
                  </div>
              
            
            </div>
        </div>
    </div>
   
    
  </>
  )
}

export default AllProducts