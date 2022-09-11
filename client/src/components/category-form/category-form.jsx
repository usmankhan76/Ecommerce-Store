import React from 'react'
import InputField from '../input-field/input-field.component'

const CategoryForm = ({handleSubmit,name,setName}) => {
    

    const handleOnChange=(event)=>{
        return setName(event.target.value)
    }
  return (
    <form >
        <div className="form-group">

            <InputField type='text' 
                onChange={handleOnChange} 
                label="Name" 
                name='name' 
                value={name} 
                
                />
            <button className='btn btn-primary' onClick={handleSubmit}
            disabled={!name||name.length<2}
            >Submit</button>    


        </div>
     </form>
  )
}

export default CategoryForm