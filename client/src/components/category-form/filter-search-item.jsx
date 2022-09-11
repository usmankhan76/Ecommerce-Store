import React from 'react'
import InputField from '../input-field/input-field.component'

const FilterSearchItem = ({keyword,setKeyword}) => {
    const handleOnChange=(e)=>{
        return setKeyword(e.target.value)
    }
  return (
    <div className="container pt-4 pb-4">

    <InputField type='text' 
                            onChange={handleOnChange} 
                            label="Find" 
                            name='keyword' 
                            value={keyword} 
                            
                            />
                            </div>
  )
}

export default FilterSearchItem