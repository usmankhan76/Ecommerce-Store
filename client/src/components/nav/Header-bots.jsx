import React, { useState } from 'react'
import './header-bots.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {  AppstoreOutlined, HomeOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut } from '../../redux/features/user/user-slice';
import { toast } from 'react-toastify';
const Header = () => {
    
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loginUser,role}=useSelector(state=>state.user);

    const logOut=()=>{
      console.log('logout')
      
      signOut(auth).then(()=>{
        dispatch(setLogOut())
        toast.success(`${loginUser.email} is successfully Log out`)
        navigate('/')
      })

    }
    let a=loginUser && loginUser.providerData[0].photoURL
    console.log("photo",a);
   
  return (
   <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" style={{paddingLeft:'0'}}>
      <Container style={{maxWidth:'1305px' }}>
        <Navbar.Brand as={Link} to='/' >Royal Collection</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav  className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>

           
          </Nav>
          <Nav>
            {loginUser && (
            <div className='wholeContainer' style={{display:'flex'}}>
             {/* <span className='bi bi-person-circle' style={{color:'white',marginTop:'6px'
            ,marginRight:'0px',fontSize:'20px'}}></span> */}
            <div className="avatar">
                 {a ?
                    <img className="avatarImage" alt='U' src={`${a}`} />
                    :<span className='bi bi-person-circle avat' >
                      u
                      </span> }
              </div>
            <NavDropdown  
                drop='down' 
                title={`${loginUser.email && loginUser.email.split('@')[0]}`} 
                menuVariant='dark' 
                id="collasible-nav-dropdown" 
               
                >
                <NavDropdown.Item >
                  <span className="bi bi-person-lines-fill" style={{marginRight:'10px'}} ></span>
                  <Link to={role === "admin" ? 'admin/dashboard':'/user/dashboard' } 
                  style={{textDecoration:'none' ,color:'white'}}>Dashboard</Link>
                </NavDropdown.Item>
                <NavDropdown.Item >
                   <span className='bi-search s' style={{marginRight:'10px'}}></span> Another action
                </NavDropdown.Item>
                <NavDropdown.Item >
                   <span className='bi-search s'style={{marginRight:'10px'}} ></span>  Something
                </NavDropdown.Item>
                {loginUser?<NavDropdown.Divider />:null}
                {
                  loginUser?<NavDropdown.Item onClick={()=>logOut()} color='danger'>
                      <span className="bi-box-arrow-left" style={{marginRight:'10px'}}></span> Log Out
                    </NavDropdown.Item>:null
                }
            </NavDropdown>
            
            
               </div>
            
            )}
             
            {loginUser? null:(

            <Nav.Link as={Link} to='/login'>Log In</Nav.Link>
       
              )}
              <UserOutlined/>
            {loginUser? null:<Nav.Link as={Link} to='/signup'> Sign up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

    
  )
}

export default Header
