import { LogoutOutlined } from '@ant-design/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import './profile-dropdown.scss'
const ProfileDropdown = ({title}) => {
  return (
    <div className="container " style={{marginLeft:'20px' ,}}>
  <div className="half">
    <label for="profile2" className="profile-dropdown">
      <input type="checkbox" id="profile2"/>
      <img alt='P' src="https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_hipster_guy-512.png"/>
      <span>{title}</span>
      <label for="profile2"><i className="mdi mdi-menu"></i></label>
      <ul>
        <li><Link to={'/'}><LogoutOutlined/>Messages</Link></li>
        <li><Link to={'/'}><LogoutOutlined/>Account</Link></li>
        <li><Link to={'/'}><LogoutOutlined/>Settings</Link></li>
        <li><Link to={'/'}><LogoutOutlined/>Logout</Link></li>
      </ul>
    </label>
  </div>
</div>

  )
}

export default ProfileDropdown