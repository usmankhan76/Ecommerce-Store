import React from 'react'
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { getCategories } from '../../services/category-service';
import InputField from '../input-field/input-field.component';
import TextField from '@mui/material/TextField'
import { Form } from 'react-bootstrap';
import { Box } from '@mui/material';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

const ProductUpdateForm = ({values,setValues,handleSubmit,handleCategoryChange,subCategories,categories,showsubs,selectedCategory,laoding}) => {
    // const [categories,setCategories]=useState([])
    const{ 
            title,
            description,
            price,
            // categories,
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
    
    
    // useEffect(()=>{
    //   console.log("Useeffect is challing");
    //     getCategoriesFromBackend();
    // },[])
    const handleChangeSubs = (e) => {
      const {value,name}=e.target
        console.log("select",value,name);
          setValues({...values,subs:value})


}; 
console.log("Subs", subs&&  subs);
console.log("category check",category);
console.log("categories check",categories);
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
)
  return (
    <> 
     <form onSubmit={handleSubmit}>
                    
                      <Box
                            component="form"
                            sx={{
                              '& .MuiTextField-root': { m: 0, width: '100%' },
                              width:'100%',}}
                            
                            autoComplete="off"
    >

                        <TextField 
                           type="text"
                           name="title"
                           value={title}
                           onChange={handleChange}
                           label='Title'
                           variant="standard"
                           fullWidth
                           InputLabelProps={{
                              shrink: true,
                            }}
                            style={{marginBottom:'15px'}}
                         />
                          <TextField 
                           type="text"
                           name="description"
                           value={description}
                           onChange={handleChange}
                           label='Description'
                           variant="standard"
                           InputLabelProps={{
                              shrink: true,
                            }}
                           fullWidth
                             style={{marginBottom:'15px'}}
                         />
                         <div className=" mb-3">


                         <TextField 
                           type='Number'
                           variant="standard"
                           fullWidth
                           name="price"
                           value={price}
                           onChange={handleChange}
                           label='Price'
                           
                           InputLabelProps={{
                              shrink: true,
                            }}
                              style={{marginBottom:'15px'}}
                           />
                           </div>
                         <div className=" mb-3">

                       
                           <TextField
                          type="Number"
                          value={quantity}
                          onChange={handleChange}
                          name={"quantity"}
                          label="Quantity"
                          style={{marginBottom:'15px'}}
                          variant="standard"
                          fullWidth
                          InputLabelProps={{
                              shrink: true,
                            }}
                              />
                           </div>
                          </Box>
                          <div className="form-group">
                          <div className="input-group mb-3"> 
                         <label htmlFor='shipping' className='input-group-text'>Shipping</label>
                         <select name='shipping'
                         className='form-select'
                         value={shipping==="Yes"?"Yes":"N0"}
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
                         value={color}
                         >
                            <option value="none" selected disabled hidden >Select Color</option>
                              {colors && colors.map((c)=>(
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
                              value={brand}
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
                                value={selectedCategory ? selectedCategory :category._id}
                                className='form-select' >
                                  
                                {/* <option value="none" selected disabled hidden>Select </option> */}
                                {categories && categories.length>0 && categories.map(item=>{
                                    return <option 
                                     key={item._id}
                                     value={item._id}
                                     style={{borderBottom:'solid 1px '}}
                                    >{item.name}
                                    </option>

                                })}
                            </select>
                            
                        </div>
                        {
                          showsubs &&(
                            <div className="input-group mb-3">
                            <label htmlFor="category" className='input-group-text'>Sub Categories</label>
                            
                           
                            <Form.Control 
                              className='form-select' 
                              as="select"
                               multiple 
                              value={subs}
                              name="subs"
                              form-select-color
                                placeholder="Select"
                               onChange={handleChangeSubs}>
                             {subCategories.length>0 ? subCategories.map(item=>{
                              return  <option 
                                        style={{borderBottom:'solid 1px '}} 
                                        key={item._id}
                                        value={item._id}>
                                                {item.name}
                                                
                                        </option>
                             }):(
                             <option style={{borderBottom:'solid 1px'}} value={'none'}>No SubCategories</option>
                            //  subs.length>0 ? subs.map(item=>{
                            //   return  <option 
                            //             style={{borderBottom:'solid 1px '}} 
                            //             key={item._id}
                            //             value={item._id}>
                            //                     {item.name}
                            //             </option>
                            //  }):<option style={{borderBottom:'solid 1px'}} value={'none'}>No SubCategories</option>
                             )
                             }
                            </Form.Control>
    
                         
                            
                        </div>
                          )
                        }
                        
                        
                    </div>
                    
                    <div style={{display:'flex',flexDirection:'row',width:'200px' }}>
                    <button className="btn btn-outline-info " style={{marginRight:'10px'}} type='submit' >Submit</button>
                    {laoding?(
                      <div><Spin indicator={antIcon} /></div> ):""}

                    </div>

                </form>
               
                </>
  )
}

export default ProductUpdateForm