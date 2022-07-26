import React, { useState } from 'react'
import { Menu } from 'antd';
import {  AppstoreOutlined, HomeOutlined, SettingOutlined, UserAddOutlined, UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const Header = () => {
    const [current,setCurrent]=useState('home');
    const handleClick=(e)=>{
        console.log(e.key)
        setCurrent(e.key);
    }
            
    
    const items=[
        {label:(<Link to={'/'}>Home</Link>),key:'home',to:'/',icon:<HomeOutlined />},

        {label:'User Name',key:'userName',icon:<SettingOutlined />,
         children:[
                  {label:'Navigation One',key:'one',icon:<AppstoreOutlined />},
                  {label:'Navigation Two',key:'two',icon:<AppstoreOutlined />},
         ]        
        },

        {label:(<Link to={'/login'}>Login</Link>),key:'login',type:Link,to:'/login',icon:<UserOutlined/>,className:"float-end"},

        {
        label:(<Link to={'/register'}>'Register'</Link>),
        key:'Register',icon:<UserAddOutlined/>,className:'float-end'}
    ]
  return (
    <Menu items={items} mode="horizontal" selectedKeys={current} onClick={handleClick}  className="d-block"/>

    
  )
}

export default Header
