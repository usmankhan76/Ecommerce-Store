import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import React from 'react';
const antIcon = (
    <div className="position-fixed top-50 start-50 translate-middle" style={{
        //  textAlign:'center',
        //   backgroundColor:"pink",
        // height: '80vh',
        // width: '100%',
        // display: 'flex',
        // justifyContent:' center',
        // alignItems: 'center',
    }}>

  <LoadingOutlined
    style={{
        fontSize: 54,     
    }}
    
    spin
    />
    </div>
);

const LoadingSipner= () => <Spin indicator={antIcon} />;

export default LoadingSipner;