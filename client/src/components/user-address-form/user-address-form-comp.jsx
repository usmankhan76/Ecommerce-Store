import React from 'react'
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useForm, Controller } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { saveUserAddress } from '../../services/cart-service';
import FormInput from './CustomTextFields';
import { setOrderConfirm } from '../../redux/features/coupon/coupon-slice';

// import Input from "@material-ui/core/Input";
const UserAddressFormComp = () => {
    const dispatch=useDispatch();

     let { control, handleSubmit,setValue,formState } = useForm({
    defaultValues: {
      firstName: '',
      phoneNumber:'',
      country:'',
      city:'',
      homeAddress:'',
      postalCode:''
    }
  });
    const {authUserToken}=useSelector(state=>state.user);

  const onSubmit = data =>{
     console.log(data)
     saveUserAddress(data,authUserToken).then((res)=>{
      if (res.data.ok) {
    //      setValue("firstName",'')
    //  setValue('phoneNumber','')
    //  setValue('country','')
    //  setValue('city','')
    //  setValue('homeAddress','')
    //  setValue('postalCode','')
     toast.success('Address save successfly')
    console.log('This is SUCCUSSEFUL in functon',formState.isSubmitSuccessful)
    
    dispatch(setOrderConfirm(true))
      }
     }).catch(err=>{console.log(err.message)})
    
    };
  
  // console.log('This is control',control._formValues)
  // console.log('This is formState',formState)
  // console.log('This is defaultValues',formState.defaultValues)
  console.log('This is SUCCUSSEFUL',formState.isSubmitSuccessful)

  return (
    <>
    <Typography variant='h6' gutterBottom >Shipping Address</Typography>
    <Box component={'form'} onSubmit={handleSubmit(onSubmit)} >
        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
        <Grid container spacing={3}>
            <Grid item lg={12} xs={12} sm={12}>

                  <Controller
                  name="firstName"
                  control={control}
                  render={({ field }) => <TextField required={true} {...field} fullWidth={true} variant="standard"  label='Name'/>}
                /> 
            </Grid>
            <Grid item lg={12} xs={12} sm={12}>

                <Controller
                name="homeAddress"
                control={control}
                rules={{ required: true }}
                render={({ field }) => <TextField {...field} required={true} fullWidth={true} variant="standard"  label='Home Address'/>}
              /> 
            </Grid>
            <FormInput fullWidth={true} required={true} label="City" name={"city"} control={control}/>
            <FormInput fullWidth={true} required={true} label="Postal Code"  name={"postalCode"} control={control}/>
      {/* <Grid>

      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <TextField {...field} style={{width:'300px'}} variant="standard" label='Name' />}
        />
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => <TextField {...field}  style={{width:'300px'}}  variant="standard" label='City' />}
        />
        </Grid> */}

            <FormInput fullWidth={true} required={true} label="Country" name={"country"} control={control}/>
            <FormInput fullWidth={true} required={true} label="Phone Number"  name={"phoneNumber"} control={control}/>

       
      
      {/* <Controller
        name="select"
        control={control}
        render={({ field }) =><select {...field}>
            <option value="apple">apple</option>
            <option value="bannana">banana</option>
            <option value="orange">orange</option>
        </select>}
      /> */}
    {/* </form> */}
    </Grid>
        <div style={{display:'flex',justifyContent:'space-between', marginTop:'10px'}}>
                            <Button 
                                type='submit' 
                                variant='contained'
                                
                                >
                                  Save</Button>
                    </div>
    </Box>
    </>
  )
}

export default UserAddressFormComp





