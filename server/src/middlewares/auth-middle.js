// const admin = require('../firebase/firebase');
const adminAuth=require('../firebase/firebase')
const userModel = require('../models/user-model');
exports.authMiddleware=async (req,res,next)=>{
    try {   
    const{name,photoURL,authtoken}=req.headers

    // console.log("auth token",authtoken)
    // console.log("auth header",req.headers)
    // console.log("auth body",req.body)
        // console.log("this is header",req.headers);
        // const firebaseUser=await admin.auth().verifyIdToken(authtoken);
        // console.log("This is the firebaseUser",firebaseUser)
        // req.userCredientials={firebaseUser,name,photoURL}; // this step will provide us the user in controller
        // next();


         await adminAuth.verifyIdToken(authtoken).then((res)=>{
            
        req.userCredientials={firebaseUser:res,name,photoURL}; // this step will provide us the user in controller
        // console.log("verify id response",res);
         return next();
        

        }).catch((err)=>console.log(err))
        
    } catch (error) {   
        // res.status(404).json({
        //     error:"Invalid or expired user token"
        // })
        console.log("authMiddleware error",error.message)
    }
}

exports.adminMiddleware=async(req,res,next)=>{
    try {
        // becuase of upper middleware we have access to user data
        let {firebaseUser}=req.userCredientials;
        const {email}=firebaseUser;
        // console.log("autmiddleware is chaling",email);

        let adminUser=await userModel.findOne({email}).exec()
        if(adminUser.role!=='admin'){
            res.status(403).json({
                error:'Admin Resource, Access Denied'
            })
        }
        else{ 
            next();
        }

        

    } catch (error) {
        console.log(error.message);
    }
}