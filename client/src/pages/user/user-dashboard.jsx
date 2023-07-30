import React, { useState } from 'react'
import UserNavs from '../../components/nav/user-navs'
import ResponsiveDrawer from '../../components/user-side-nav/user-side-nav-comp'

const UserDashboard = () => {
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNavs/>
                {/* <ResponsiveDrawer/> */}
            </div>
            <div className="col">user DashBoard Page</div>
        </div>
    </div>
    )
}


export default UserDashboard