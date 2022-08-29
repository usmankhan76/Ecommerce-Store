const admin = require('../firebase/firebase');
const userModel = require('../models/user-model');
exports.authMiddleware=async (req,res,next)=>{
    try {
        console.log("this is header",req.headers);
        const{name,photoURL,authtoken}=req.headers
        const firebaseUser=await admin.auth().verifyIdToken(authtoken);
        req.userCredientials={firebaseUser,name,photoURL}; // this step will provide us the user in controller
        next();
        
    } catch (error) {
        res.status(404).json({
            error:"Invalid or expired user token"
        })
    }
}

exports.adminMiddleware=async()=>{
    try {
        // becuase of upper middleware we have access to user data
        let {firebaseUser:{email}}=req.userCredientials;
        let adminUser=userModel.findOne({email,}).exec()
        if(adminUser.role!=='admin'){
            res.status(403).json({
                error:'Admin Resource, Access Denied'
            })
        }
        else{ 
            next();
        }

        

    } catch (error) {
        
    }
}