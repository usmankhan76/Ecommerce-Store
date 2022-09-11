import React from 'react'
import { Outlet } from 'react-router-dom'
import AdminNavs from '../../components/nav/admin-navs'

const AdminDashboard = () => {
  return (<>
   <div className="container-fluid">
        <div className="row">
            <div className="col-md-2" >
                <AdminNavs/>
            </div>
            <div className="col">Admin DashBoard Page</div>
        </div>
    </div>
   
    
  </>
  )
}

export default AdminDashboard