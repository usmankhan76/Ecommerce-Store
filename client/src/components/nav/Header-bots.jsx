import React, { useState } from 'react'
import './header-bots.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {   UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut } from '../../redux/features/user/user-slice';
import { toast } from 'react-toastify';
import UserProfileComponent from '../user-profile/user-profile-component';
import SearchForm from '../search-form/search-form';
import RedeemIcon from '@mui/icons-material/Redeem';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Badge } from '@mui/material';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import { addToCart, emptyCartStatate } from '../../redux/features/cart/cart-slice';

const Header = () => {
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loginUser,role}=useSelector(state=>state.user);
    const cart=useSelector(state=>state.cart)
    // console.log("this is cart ",cart);
    const bageCount = cart.length >0 ?cart.length:0
    // console.log("cart count",bageCount);
    const logOut=()=>{
    
      
      signOut(auth).then(()=>{
        if(typeof window!=='undefined') localStorage.removeItem("cart")
        // dispatch(addToCart([]));
        dispatch(emptyCartStatate([]));
        dispatch(setLogOut())
        toast.success(`${loginUser.email} is successfully Log out`)
        navigate('/')
      })

    }
    let profileImage=loginUser && loginUser.providerData[0].photoURL
    // console.log("profile------->",profileImage);
  return (
   <Navbar collapseOnSelect sticky='top' fixed='top' expand="sm" bg="light" data-bs-theme="light">
      <Container style={{maxWidth:'1305px' }}>

        <Navbar.Brand as={Link} to='/' >Royal Collection</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav  className="me-auto">
            <Nav.Link 
              to={'/shop'} 
              as={Link}> 
                 <RedeemIcon style={{marginRight:'4px'}} fontSize='small'/>
                  Shop
            </Nav.Link>
            
             <Nav.Link 
              to={'/cart'} 
              as={Link}> 
                 <ShoppingCartIcon style={{marginRight:'4px'}} fontSize='small'/>
              <Badge badgeContent={bageCount} color="error"  >
  
                  <span style={{marginRight:'7px'}}>
                    Cart
                    </span>
              </Badge>
            </Nav.Link>
           
          </Nav>
          <Nav><SearchForm/></Nav>
          <Nav >
            {loginUser && <UserProfileComponent role={role} profileImage={profileImage} 
                loginUser={loginUser} logOut={logOut} />}
           
            
             
            {loginUser? null:(
                <Nav.Link as={Link} to='/login'>
                  {/* <LoginIcon fontSize='small' style={{marginRight:'5px',color:'white'}}/> */}
                  <Person2OutlinedIcon  fontSize='small' style={{marginRight:'3px'}}/>
                  Log In
                </Nav.Link>

       
              )}
              
            {/* {loginUser? null:<Nav.Link as={Link} to='/signup'> 
                <PersonAddAltIcon fontSize='small' style={{marginRight:'5px'}}/>Sign up
              </Nav.Link>} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  )
}

export default Header
