import React from 'react'
import BestSellerComponent from '../components/best-seller/best-seller-component';
import ListCategoryComponent from '../components/list-category/list-category-component';
import ListSubCategoryComponent from '../components/list-sub-category/list-sub-category-component';
import NewArrivalComponent from '../components/new-arrivals/new-arrivals-component';
import TypewriterEffect from '../components/typerwriter/typewriter-effect';
import { Container, Grid } from '@mui/material';

 const Home = () => {

  return (
  <Container disableGutters={true}  maxWidth={true} sx={{backgroundColor:'rgb(245, 251, 255)'}}>
      <Grid container >
        <Grid item lg={12} sm={12} xs={12} md={12}>
            <div className="   text-danger h2 font-weight-bold text-center " 
                // style={{backgroundColor:'rgb(183, 198, 181)'}}
                style={{
                    width:'100%', height:'80vh',
                    marginBottom:'0',
                    // backgroundImage:`url(${"https://res.cloudinary.com/dp0nxa8se/image/upload/v1690222813/burgess-lcothe-medum_lkckq8.jpg"})`,
                    backgroundImage:`url(${"https://res.cloudinary.com/dp0nxa8se/image/upload/v1690639261/apple-bakground_qaelez.png"})`,
                    backgroundRepeat:'no-repeat',
                    position:'relative',
                    backgroundSize:'cover',
                    backgroundPosition:'center'
                    // objectFit:'cover'  
                  }}
                > 
                <div style={{
                    content: "''",
                    position: 'absolute', top: 0,left: 0,right: 0,bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    display:'flex',flexDirection:'column',alignItems:'center',
                    justifyContent:'center',}}>

                      <TypewriterEffect text={["50% off SUMMER SALE","Free Delivery shoping over 3000"]} />
                </div>
            </div>
        </Grid>
        <Grid container item lg={12} md={12} sm={12}><NewArrivalComponent/></Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} ><BestSellerComponent/></Grid>
        {/* <Grid container item xl={12} lg={12} md={12} sm={12}><ListCategoryComponent/></Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12}><ListSubCategoryComponent/></Grid> */}
        <br />
        <br />
      </Grid>

  </Container>
  )
}
export default Home