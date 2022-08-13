import React from 'react'
import './input-fiel.style.css'
const InputField = ({handleOnChange,label,...otherProps}) => {
  return (
    <div className="group">
    <input 
        onChange={handleOnChange}
        className='focus form-input focus'
        required
        {...otherProps}
        />
    <label className={` form-input-label ${otherProps.value.length?'shrink':''}  `}  >
        {label}</label>
    </div>
    
    
  )
}

export default InputField