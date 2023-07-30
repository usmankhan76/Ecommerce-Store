import React from 'react'
import './categoryButton_style.scss'
import { useNavigate } from 'react-router-dom'
const CategoryButton = ({text,slug}) => {
    const navigate=useNavigate();
    const handleOnClick=()=>{
        return navigate(slug)
    }
  return (
    <>
  <button className="blob-btn" onClick={handleOnClick}>
    {text}
    <span className="blob-btn__inner">
      <span className="blob-btn__blobs">
        <span className="blob-btn__blob" />
        <span className="blob-btn__blob" />
        <span className="blob-btn__blob" />
        <span className="blob-btn__blob" />
      </span>
    </span>
  </button>
  
</>

  )
}

export default CategoryButton