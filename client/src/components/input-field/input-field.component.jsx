import React from 'react'
import './input-fiel.style.css'
const InputField = ({handleOnChange,label,value,...otherProps}) => {
  return (
    <div className="group">
    <input 
        onChange={handleOnChange}
        className='focus form-input focus'
        required
        value={value}
        {...otherProps}
        />
    <label className={` form-input-label ${value && value.length>=1?'shrink':''}  `}  >
        {label}</label>
    </div>
    
    
  )
}

export default InputField