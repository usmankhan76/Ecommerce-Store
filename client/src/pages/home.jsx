import React from 'react'
import BestSellerComponent from '../components/best-seller/best-seller-component';
import ListCategoryComponent from '../components/list-category/list-category-component';
import ListSubCategoryComponent from '../components/list-sub-category/list-sub-category-component';
import NewArrivalComponent from '../components/new-arrivals/new-arrivals-component';
import TypewriterEffect from '../components/typerwriter/typewriter-effect';

 const Home = () => {

  return (
    <>
    <div className="  p-5  text-danger h2 font-weight-bold text-center " 
      style={{backgroundColor:'rgb(183, 198, 181)'}}>
        <TypewriterEffect text={["Latest Products","New Arrivals","Best Sellers"]}/>
    </div>
   <NewArrivalComponent/>
   <BestSellerComponent/>
   <ListCategoryComponent/>
   <ListSubCategoryComponent/>
   <br />
   <br />
                </>
  )
}
export default Home