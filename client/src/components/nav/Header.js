import React, { useState } from 'react'
import { Menu } from 'antd';
import {  AppstoreOutlined, HomeOutlined, LogoutOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { setLogOut } from '../redux/features/user/user-slice';
import { toast } from 'react-toastify';
const Header = () => {
    const [current,setCurrent]=useState('home');
    const handleClick=(e)=>{
        
        setCurrent(e.key);
    }
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {loginUser}=useSelector(state=>state.user);

    const logOut=()=>{
    
      
      signOut(auth).then(()=>{
        dispatch(setLogOut())
        toast.success(`${loginUser.email} is successfully Log out`)
        navigate('/')
      })

    }
    const items=[
        {label:(<Link to={'/'}>Home</Link>),key:'home',to:'/',icon:<HomeOutlined />},

        {label:'User Name',key:'userName',icon:<SettingOutlined />,
         children:[
                  {label:'Navigation One',key:'one',icon:<AppstoreOutlined />},
                  {label:'Navigation Two',key:'two',icon:<AppstoreOutlined />},
                  {label:'Log out',key:'logout',icon:<LogoutOutlined />,onClick:()=>{logOut()}},
         ]        
        },

        {label:(<Link to={'/login'}>Login</Link>),key:'login',type:Link,to:'/login',icon:<UserOutlined/>,className:"float-end",},

        {
        label:(<Link to={'/signup'}>Sign Up</Link>),
        key:'Signup',icon:<UserAddOutlined/>,className:'float-end'},

    ]
    function itemss(){
      if(loginUser){
  
      let newA=items.map((item)=>{
         if(item.key!=='login' || item.key!=='Signup' || item.children.key!=='logOut') {
        return item 
        }else{items.remove(item)}
          
        
          
        }
        )
        
        return newA
       
          
      }else{
        return items
      }

    }
  return (
    <Menu theme='dark' items={itemss()} mode="horizontal" selectedKeys={current} onClick={handleClick}  className="d-block"/>

    
  )
}

export default Header
