import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import BestSellerComponent from '../components/best-seller/best-seller-component';
import LoadingCard from '../components/cards-item/loading-card';
import NewArrivalComponent from '../components/new-arrivals/new-arrivals-component';
import ProductCard from '../components/product-card/product-card';
import LoadingSipner from '../components/spin/spin'
import TypewriterEffect from '../components/typerwriter/typewriter-effect';
import { getProducts } from '../services/product-services';

 const Home = () => {
  const[products,setProducts]=useState([]);
  const[loading,setLoading]=useState(false);
  const amountOfProducts=4
  const showProducts=()=>{
    setLoading(true)
    getProducts("createdAt","desc",3).then(res=>{
      setLoading(false)
      setProducts(res.data)
    }).catch(err=>{
      toast.error(err.message)
    })
  }

  useEffect(()=>{
    showProducts()
  },[])
  return (
    <>
    <div className="  p-5  text-danger h1 font-weight-bold text-center " 
      style={{backgroundColor:'rgb(183, 198, 181)'}}>
        <TypewriterEffect text={["Latest Products","New Arrivals","Best Sellers"]}/>
    </div>
   <NewArrivalComponent/>
   <BestSellerComponent/>
   <br />
   <br />
                </>
  )
}
export default Home