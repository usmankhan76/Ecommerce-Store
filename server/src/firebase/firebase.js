
var admin = require("firebase-admin");
const {getAuth}=require("firebase-admin/auth")
var serviceAccount = require("../config/fbServiceAccountKey.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


const { initializeApp } = require('firebase-admin/app');
const adminApp= initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const adminAuth=getAuth(adminApp)
module.exports=adminAuth