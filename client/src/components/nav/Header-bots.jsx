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
const Header = () => {
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loginUser,role}=useSelector(state=>state.user);

    const logOut=()=>{
    
      
      signOut(auth).then(()=>{
        dispatch(setLogOut())
        toast.success(`${loginUser.email} is successfully Log out`)
        navigate('/')
      })

    }
    let profileImage=loginUser && loginUser.providerData[0].photoURL

  return (
   <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" style={{paddingLeft:'0'}}>
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

           
          </Nav>
          <Nav><SearchForm/></Nav>
          <Nav >
            {loginUser && <UserProfileComponent role={role} profileImage={profileImage} 
                loginUser={loginUser} logOut={logOut} />}
           
            
             
            {loginUser? null:(
                <Nav.Link as={Link} to='/login'><LoginIcon fontSize='small' style={{marginRight:'5px'}}/>
                  Log In
                </Nav.Link>

       
              )}
              <UserOutlined/>
            {loginUser? null:<Nav.Link as={Link} to='/signup'> 
                <PersonAddAltIcon fontSize='small' style={{marginRight:'5px'}}/>Sign up
              </Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  )
}

export default Header
