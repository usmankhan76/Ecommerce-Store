import { Pagination } from 'antd'
import React from 'react'

const PaginationComponent = ({current,total,onChange}) => {
  return (
    <Pagination defaultCurrent={current} total={total} onChange={onChange}/>
  )
}

export default PaginationComponent