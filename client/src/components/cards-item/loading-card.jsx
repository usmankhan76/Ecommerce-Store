import { Card, Skeleton } from 'antd'
import React from 'react'

const LoadingCard = ({count}) => {
    const skelotonFun=()=>{

        let sekeletonArray=[]
        for (let index = 0; index<count; index++) {
            
            sekeletonArray.push(
                <Card className='col-md-3 ' style={{
                    width: '250px',
                    marginTop:'10px',
                    marginBottom:'20px',
                    marginRight:'30px'
                    }}>
                <Skeleton active> LoadingCard</Skeleton>
            </Card>
            )      
            
        }
        return sekeletonArray
    }
    return(<div className='row '>{skelotonFun()}</div>)
}

export default LoadingCard