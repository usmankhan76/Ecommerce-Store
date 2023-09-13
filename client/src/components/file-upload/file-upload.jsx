
import { Avatar, Badge } from 'antd'
import axios from 'axios'
import React, { useState } from 'react'
import Resizer from "react-image-file-resizer"
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import LoadingSipner from '../spin/spin'



const FileUpload = ({values,setValues}) => {
    const {authUserToken}=useSelector((state=>state.user))
    const [loading,setLoading]=useState(false)
    const {images}=values
    const fileUploadAndResize=(e)=>{
        
        let files=e.target.files;
        // let filesArray=Object.keys(files).map(item=>files[item])
       
       
        let allUploadedFiles=images
        setLoading(true)
        if(files){
            for(let i=0; i<files.length; i++)
            Resizer.imageFileResizer(
                files[i],
                720, //max width
                720, // max height
                "JPEG",
                100,
                0,
                (uri)=>{
                    let options={
                        method:"POST",
                        url:`${process.env.NODE_ENV==='production' ? process.env.REACT_APP_API:'http://localhost:8000/api'}/uploadimages`,
                        data:{image:uri},
                        headers:{authtoken:authUserToken},
                        maxContentLength: 1000000,
                        maxBodyLength: 1000000
                    }
                    axios.request(options).then((res)=>{
                        allUploadedFiles.push(res.data)
                        setLoading(false)
                        setValues({...values,images:allUploadedFiles})
                    }).catch(err=>{console.log("image uri fun ",err.message);})
                },
                "base64"
    
            )

        }

    }
    const removeImage=(public_id)=>{
        
        let options={
            method:"POST",
            url:`${process.env.NODE_ENV==='production' ? process.env.REACT_APP_API:'http://localhost:8000/api'}/removeimage`,
            data:{public_id},
            headers:{authtoken:authUserToken}
        }
        axios.request(options).then((res)=>{
            
            let filterImages=images.filter((item)=> (item.public_id!==public_id))
            setValues({...values,images:filterImages})
            return toast.error("Deleted Successfully")
            }).catch(err=>{console.log("remove  error",err.message);})
            
        }
      
  return (
    <>
    <div className="row" >
        <Avatar.Group
            maxCount={7}
            maxPopoverTrigger="click"
            size="large"
            maxStyle={{
                color: '#f56a00',
                backgroundColor: '#fde3cf',
                cursor: 'pointer',
            }}
    >
            {images&& images.map((item)=>{  
                return <Badge 
                        count='X'
                        key={item.public_id}
                        style={{cursor:'pointer'}}
                        onClick={()=>removeImage(item.public_id)}>
                    <Avatar  shape='square' size={70} src={item.url} style={{marginLeft:'10px',marginBottom:'10px'}}/>
                    </Badge>
            })}
      
     
        </Avatar.Group>



        

    </div>
    <div className='row'>
        {loading?(
            <LoadingSipner/>
        ):(
        <label className='btn btn-primary  '  style={{width:'100px'}}>
            Chose File
            <input 
                type='file'
                multiple
                hidden
               
                // accept='images/*'
                onChange={fileUploadAndResize}  
                   />
        </label>)}
        
    </div>
                </>
  )
}

export default FileUpload