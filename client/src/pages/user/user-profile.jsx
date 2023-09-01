import { updatePassword } from 'firebase/auth';
import React, { useState } from 'react'
import { toast } from 'react-toastify';
import InputField from '../../components/input-field/input-field.component'
import UserNavs from '../../components/nav/user-navs'
import { auth } from '../../firebase';

const UserProfile = () => {
    let [password,setPassword]=useState('');
    let [loading,setLoading]=useState(false);
    const handleOnChange=(event)=>{
        return setPassword(event.target.value)
    }
    const user=auth.currentUser;

    const handleSubmit=(event)=>{
        event.preventDefault()
        setLoading(true)
         updatePassword(user,password).then(()=>{
            setLoading(false)
            setPassword('')
            toast.success("Password Updated successfully");
        }).catch((err)=>{
            setLoading(false)
            toast.error(err)
        })
        // updatePassword
    }
  return (
    <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <UserNavs/>
            </div>
            <div className="col" >
                <div className='position-absolute top-50 start-50 translate-middle' style={{width:'50%',}}>

                    <h4>Password Update</h4>
                    {
                        loading?(
                        <div className="d-flex justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                        </div>
                        </div> 
):(
                        <form >
                        {/* <div className="form-group"> */}

                            <InputField type='password' 
                                onChange={handleOnChange} 
                                label="Password" 
                                name='password' 
                                value={password} 
                               
                                />
                            <button className='btn btn-primary'  disabled={password.length<6} onClick={handleSubmit}>Submit</button>    

                        {/* </div> */}
                    </form>
                    )
                    }    
                    
                </div>
            </div>
        </div>
    </div>
    )
}


export default UserProfile