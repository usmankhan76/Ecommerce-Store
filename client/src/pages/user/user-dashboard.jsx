import React, { useState } from 'react'
import UserNavs from '../../components/nav/user-navs'

const UserDashboard = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNavs/>
            </div>
            <div className="col">use DashBoard Page</div>
        </div>
    </div>
    )
}


export default UserDashboard