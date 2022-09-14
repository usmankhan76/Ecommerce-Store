import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../../services/category-service';
import InputField from '../input-field/input-field.component';
import { Select } from 'antd';
import SubsSelect from './subs-select';
import { Form } from 'react-bootstrap';
const { Option } = Select;
const ProductForm = ({values,setValues,handleSubmit,handleCategoryChange,subCategories,showsubs}) => {
    // const [categories,setCategories]=useState([])
    const{ 
            title,
            description,
            price,
            categories,
            category,
            subs,
            shipping,
            quantity,
            images,
            colors,
            brands,
            color,
            brand,
      }=values;
    const handleChange=(e)=>{
        const {value,name}=e.target
        console.log("select",value,name);
        setValues({...values,[name]:value})
    } 
    
    const getCategoriesFromBackend=() => {
        
        getCategories().then(res=>{setValues({...values,categories:res.data})}).catch((err)=>{toast.error(err)})
      }
    useEffect(()=>{
        getCategoriesFromBackend();
    },[])
    const handleChangeSubs = (e) => {
      const {value,name}=e.target
        console.log("select",value,name);
          setValues({...values,subs:value})


}; 
console.log("Subs",subs);
console.log("Subs check",showsubs);
  return (
    <> 
     <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <InputField 
                           type="text"
                           name="title"
                           value={title}
                           onChange={handleChange}
                           label='Title'
                         />
                          <InputField 
                           type="text"
                           name="description"
                           value={description}
                           onChange={handleChange}
                           label='Description'
                         />
                         <InputField 
                           type='Number'
                           name="price"
                           value={price}
                           onChange={handleChange}
                           label='Price'
                         />
                         
                    
                         <InputField 
                           type="quantity"
                           name="quantity"
                           value={quantity}
                           onChange={handleChange}
                           label='Quantity'
                         />
                          <div className="input-group mb-3"> 
                         <label htmlFor='shipping' className='input-group-text'>Shipping</label>
                         <select name='shipping'
                         className='form-select'
                         onChange={handleChange}
                         
                         
                         >
                            <option value="none"  selected disabled hidden >Select shipping</option>
                            <option value="No">No</option>
                            <option value="Yes">Yes</option>

                         </select>
                         </div>
                         
                          <div className="input-group mb-3">

                         <label htmlFor='color' className='input-group-text'>Color</label>
                         <select name='color'
                         className='form-select'
                         onChange={handleChange}
                        //  value={color}
                         >
                            <option value="none" selected disabled hidden >Select Color</option>
                              {colors.map((c)=>(
                                <option key={c} value={c} style={{borderBottom:'solid 1px '}}>
                                {c}
                              </option>
                              ))}

                         </select>
                              </div> 
                          
                          <div className="input-group mb-3">


                              <label htmlFor='brand' className='input-group-text' >Brand</label>
                              <select name='brand'
                              className='form-select'
                            
                              onChange={handleChange}

                              >
                                  <option value="none" selected disabled hidden >Select Brand</option>
                                    {brands.map((c)=>(
                                    <option key={c} value={c} style={{borderBottom:'solid 1px '}} >
                                      {c}
                                    </option>
                                    ))}

                              </select>     
                          </div>
                          
                           <div className="input-group mb-3">
                            <label htmlFor="category" className='input-group-text'>Parent Category</label>
                            <select name="category" 
                                onChange={handleCategoryChange}
                                className='form-select' >
                                <option value="none" selected disabled hidden>Select </option>
                                {categories.length>0 && categories.map(item=>{
                                    return <option 
                                     key={item._id}
                                     value={item._id}
                                     style={{borderBottom:'solid 1px '}}
                                    >{item.name}
                                    </option>

                                })}
                            </select>
                            
                        </div>{
                          showsubs &&(
                            <div className="input-group mb-3">
                            <label htmlFor="category" className='input-group-text'>Sub Categories</label>
                            {/* <select 
                                name="subs" 
                                onChange={handleChangeSubs}
                                value={subs}
                                placeholder="Select"
                                className='form-select' 
                                multiple={true}>
                                <option value="one">ONe</option>
                                <option value="Two">Two</option>
                                <option value="Three">Three</option>
                            </select> */}
                           
                            <Form.Control 
                              className='form-select' 
                              value={subs}
                              name="subs"
                               as="select" multiple 
                                placeholder="Select"
                               onChange={handleChangeSubs}>
                             {subCategories.length>0 ? subCategories.map(item=>{
                              return<option style={{borderBottom:'solid 1px '}} key={item._id}value={item._id}>{item.name}</option>
                             }):(<option style={{borderBottom:'solid 1px '}} value={'none'}>No SubCategories</option>)
                             }
                            </Form.Control>
    
                         
                            
                        </div>
                          )
                        }
                        
                        
                    </div>
                    
                    {subCategories?subCategories.length:0}
                    <button className="btn btn-outline-info " type='submit' >Submit</button>

                </form>
               
                </>
  )
}

export default ProductForm