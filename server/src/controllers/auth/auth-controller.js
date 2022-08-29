
const User=require('../../models/user-model')

async function creatUpdateUser(req,res) {
    const {photoURL,firebaseUser}=req.userCredientials
    const email=firebaseUser.email
    const name=  email.split('@')[0]
    console.log(name,'this is name');
    const {uid}=firebaseUser
    const user= await User.findOneAndUpdate(
        {email},// will find user based on email
        {name,photoURL},// this will update the user 
        {new:true}// it will return us the updated version
    )
    if(user){
        console.log("User updated",user);
        res.json(user)
    }else{
        const newUser=await new User({
            email,name,photoURL,tokenId:uid
        }).save()
        console.log("User Created",newUser);
        res.json(newUser)
    }
    
}
async function getCurrentUser(req,res) {
    User.findOne({email:req.userCredientials.firebaseUser.email}).exec((err,user)=>{
        if(err){throw new Error(err)};
        res.json(user);
    })
}


module.exports={
    creatUpdateUser,
    getCurrentUser
}