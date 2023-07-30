import React, { useState, useRef } from "react";
import "./card.css";
import { showDarwer } from "../../redux/features/drawer/drawer.slice";
import { addToCart } from "../../redux/features/cart/cart-slice";
import _ from 'lodash'
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AverageRating } from "../../services/rating";
import dummy from '../../assets/dummy.jpg'
import { Tooltip } from '@mui/material'

export default function Card({product}) {
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const sizesboxRef = useRef(null);
  const purchaseRef = useRef(null);

  function handleMouseMove(event) {
    const card = cardRef.current;
    const { offsetWidth: width, offsetHeight: height } = card;
    const { clientX, clientY } = event;
    const x = clientX - card.offsetLeft - width / 2;
    const y = clientY - card.offsetTop - height / 2;
    var mult = 40;
    setXRotation((y / height) * mult);
    setYRotation((x / width) * mult);
  }
  function handleMouseEnter() {
    const img = imgRef.current;
    const title = titleRef.current;
    // const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    const desc = descRef.current
    title.style.transform = "translateZ(150px)";
    img.style.transform = "translateZ(100px) rotateZ(-45deg)";
    // sizesBox.style.transform = "translateZ(100px)";
    purchase.style.transform = "translateZ(75px)";
    desc.style.transform = "translateZ(75px)";
  }
  function handleMouseLeave() {
    setXRotation(0);
    setYRotation(0);

    const img = imgRef.current;
    const title = titleRef.current;
    // const sizesBox = sizesboxRef.current;
    const purchase = purchaseRef.current;
    title.style.transform = "translateZ(0px)";
    img.style.transform = "translateZ(0px) rotateZ(0deg)";
    // sizesBox.style.transform = "translateZ(0px)";
    purchase.style.transform = "translateZ(0px)";
  }

    // upper section is for styling




    const {title,images,description,slug,price}=product
  const [tooltipText,setTooltipText]=useState('Click To Add')
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleAddToCart=()=>{
    
    let cart=[];
    // let p={};
    if(typeof window !== 'undefined'){
      if(JSON.parse(localStorage.getItem('cart')) && JSON.parse(localStorage.getItem('cart')).length >0 ){
        // if cart is in localStorage get it
        console.log('local storage with parse',JSON.parse(localStorage.getItem('cart')));
        cart=JSON.parse(localStorage.getItem('cart'))
        // cart=localStorage.getItem('cart')
        console.log('cart parse',cart);

        //I added below code 
        // let newCart=cart.map((item)=>{
        //   if(item._id===product._id){
        //     return {...product,count:++item.count}
        //   }
        // })
        // console.log("checccccccccccck this new cart",newCart)
        // dispatch(addToCart(newCart))
      }
    
        // if(cart.length>0){
        //   let findPorduct=cart.find((item)=>item._id===product._id)
        // console.log("checccccccccccck this new Proddddddduct",findPorduct)
        //  p=findPorduct
        // }


        let itemExist=cart.find((item)=>item._id===product._id);
        if(itemExist){
          cart= cart.map(item=>item._id===product._id?({...product,count:itemExist.count+1}):item)
          let unique= _.uniqWith(cart, _.isEqual)
          localStorage.setItem('cart',JSON.stringify(unique))
          console.log("this is array we passing in state",unique)
          dispatch(addToCart(unique))
        }else{

          // console.log('pppppppppppppppp',p )
          // cart.push({...product,count: p.count? ++p.count : 1})
          // cart.push({...product,count: p?.count+1|| 1})
          cart.push({...product,count:1})
          let unique= _.uniqWith(cart, _.isEqual)
          localStorage.setItem('cart',JSON.stringify(unique))
          console.log("this is array we passing in state",unique)
          dispatch(addToCart(unique))
        }

  
  
          dispatch(showDarwer(true))
          setTooltipText("Added")
        
        
        
      
      
    }
  }
  
  const handleClickCard=()=>{
    return navigate(`/product/${slug}` )
  }



  return (
    <>
         {product && product.ratings && product.ratings.length>0 ?(
            AverageRating(product)):(
                <div className="text-center pt-1 pb-3">
                    No Rating Yet
                </div>)}
    
      <div
        className="card"
        ref={cardRef}
        style={{
          transform: `rotateX(${xRotation}deg) rotateY(${yRotation}deg)`,
        }}
      >
        <img alt="example" src={images&& images.length?images[0].url:dummy}  
                ref={imgRef} className="sneaaker-img"
                style={{width:'100%',height:'180px',objectFit:'cover',}}   
                onMouseMove={handleMouseMove}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                />
        <h5 className="title" ref={titleRef}>
          {title}
        </h5>
        <p ref={descRef} className="ppp">
         {description && description.substring(0,35)}
        </p>
        <div className="price">
            <h6  ref={titleRef}>Price</h6>
            <h6  ref={titleRef}>${price}</h6>
        </div>
            <div className="buttonContainer">
                 <div className="button-box" ref={purchaseRef}>
                    <button className="purchase" onClick={handleClickCard} >
                        view product
                    </button>
                </div>
                  <Tooltip title={product.quantity<1?"Out of Stock":tooltipText} arrow placement="top">
                <div className="button-box" ref={purchaseRef} >

                    <button 
                      className="purchase" 
                      style={{cursor:`${product.quantity<1?'not-allowed':'pointer'}`}} 
                      onClick={handleAddToCart}  
                      disabled={product.quantity<1} >
                        {product.quantity<1?"Out of Stock":" Add to Cart"}
                    </button>
                </div>
                  </Tooltip>
               
            </div>
      </div>
    </>
  );
}