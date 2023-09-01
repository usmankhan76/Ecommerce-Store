import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const AdminNavs = () => {
  return (
    

    <nav >
        <ul className="nav flex-column">
            
            <li className="nav-item">
                <Link to={"/admin/dashboard/product"} className='nav-link'>Create Product</Link>
            </li>
            <li className="nav-item">
                <Link to={"/admin/dashboard/products"} className='nav-link'>Products</Link>
            </li>
            <li className="nav-item">
                <Link to={"/admin/dashboard/category"} className='nav-link'>Category</Link>
            </li>
            <li className="nav-item">
                <Link to={"/admin/dashboard/sub-category"} className='nav-link'>Sub Category</Link>
            </li>
            
            <li className="nav-item">
                <Link to={'/admin/dashboard/coupons'} className='nav-link'>Coupens</Link>
            </li>
            <li className="nav-item">
                <Link to={"/user/dashboard/profile"} className='nav-link'>Password</Link>
            </li>
        </ul>
    </nav>
   
  )
}

// import {
//   AppstoreOutlined,
//   ContainerOutlined,
//   DesktopOutlined,
//   MailOutlined,
//   MenuFoldOutlined,
//   MenuUnfoldOutlined,
//   PieChartOutlined,
// } from '@ant-design/icons';
// import { Button, Menu } from 'antd'; 

// function getItem(label, key, icon, children, type) {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   };
// }

// const items = [
//   getItem('Option 1', '1', <PieChartOutlined />),
//   getItem('Option 2', '2', <DesktopOutlined />),
//   getItem('Option 3', '3', <ContainerOutlined />),
//   getItem('Navigation One', 'sub1', <MailOutlined />, [
//     getItem('Option 5', '5'),
//     getItem('Option 6', '6'),
//     getItem('Option 7', '7'),
//     getItem('Option 8', '8'),
//   ]),
//   getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
//     getItem('Option 9', '9'),
//     getItem('Option 10', '10'),
//     getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
//   ]),
// ];

// const UserNavs = () => {
//   const [collapsed, setCollapsed] = useState(false);

//   const toggleCollapsed = () => {
//     setCollapsed(!collapsed);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height:'91.5vh',
//       }}
//     >
//       <Button
//         type="primary"
//         onClick={toggleCollapsed}
//         style={{
//           marginBottom: 0,
//         }}
//       >
//         {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
//       </Button>
//       <Menu
//         style={{height:"86.5vh"}}
//         defaultSelectedKeys={['1']}
//         defaultOpenKeys={['sub1']}
//         mode="inline"
//         theme="dark"
//         inlineCollapsed={collapsed}
//         items={items}
//       />
//     </div>
//   );
// };

export default AdminNavs