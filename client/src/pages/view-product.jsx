import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import ProductCard from '../components/product-card/product-card'
import LoadingSipner from '../components/spin/spin'
import ViewProductCardComponent from '../components/view-product-card/view-product-card-component'
import { getListRelatedProducts, getProduct, productStars } from '../services/product-services'

const ViewProduct = () => {
    const {slug}=useParams()
    const [product,setProduct]=useState([]);
    const [relatedProducts,setRelatedProducts]=useState([]);
    const [loading,setLoading]=useState(false);
    const [stars,setStars]=useState(0);
    const {authUserToken,loginUser,id}=useSelector(state=>state.user)

    const loadProduct=()=>{
        console.log("lpado fucntioan is runnign");
        setLoading(true)
        getProduct(slug).then((res)=>{
            console.log("product res",res.data);
            setProduct(res.data) 
            setLoading(false)
            getListRelatedProducts(res.data._id).then((res)=>{
                console.log("related response",res.data);
                setRelatedProducts(res.data)
                
            }).catch((error)=>{
                console.log("related product error",error.message);
            })
        }).catch((err)=>{
            setLoading(false)
            console.log("loadProduct Error",err.message);
        })
    }
    const authtoken=authUserToken;

    const handleStarsChange=(newRating,name)=>{
        setStars(newRating)
        console.log("handel stars",newRating,name);
        productStars(name,newRating,authtoken).then((res)=>{
            toast.success("Thanks For you Review")
        loadProduct()
            
        }).catch((err)=>{
            console.log("star response error",err.message);
        })
    }
    useEffect(()=>{
        console.log("useEffect in loadPorduct");
        loadProduct()
    },[slug])

    useEffect(()=>{
        
        if(product && product.ratings && loginUser ){
            const checkProductRatingObject= product.ratings.find((obj)=> (
            obj.postedBy.toString()===id.toString()
            ))
            console.log("useEfect check object",checkProductRatingObject);
            checkProductRatingObject && setStars(checkProductRatingObject.stars)
        }
    })
  return (
    <div className="container-fluid">
        <div className='row pt-4'>
            {loading ? <LoadingSipner/> :  product&& (
            <ViewProductCardComponent product={product} handleStarsChange={handleStarsChange} 
                stars={stars}
            />)}
        </div>
        <div className="row">
            <div className="col text-center pt-5 pb-5">
            <hr />
            <h4>Related Products</h4>
            <hr />
 
            </div>
        </div>
        <div className="row">
                {relatedProducts.length && relatedProducts.length>0?(
                    relatedProducts.map((product)=>{
                        return  <div className="col-md-3 pb-5" key={product._id}>
                                <ProductCard product={product} />
                            </div>
                })):<div>No Products </div>}
        </div>
            {/* {JSON.stringify(relatedProducts)} */}
    </div>
  )
}

export default ViewProduct