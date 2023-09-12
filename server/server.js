const express=require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors=require('cors')
const fs = require('fs');
const enforce=require('express-sslify')
const path = require('path');

const { performMigration } = require('./src/services/mongoose-connection');
require('dotenv').config();

// const authRoutes=require('./src/routes/auth-routes')
const app=express()

const dbURI= process.env.NODE_ENV==='production'?process.env.PROD_DB_URI:process.env.DEV_DB_URI

 // perfrom data migration 
    performMigration()
    .then(()=>{
        console.log('data migration completed')
        // mongoose.connect.close() use correct Method
        mongoose.connect(dbURI)
            .then(()=>{
                console.log('DB Connected');
            })
            .catch((err)=>{console.log('DB error',err);})

        })
    .catch((e)=console.log('data migration error'))





//middleware
app.use(morgan("dev"))
app.use(bodyParser.json({limit:'50mb'}))
app.use(cors())


if(process.env.NODE_ENV==="production"){ 
    
    // app.use(enforce.HTTPS({trustProtoHeader:true}))
    app.use(express.static(path.join(__dirname,'../client/build')))
    app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'));

  }); //it will pass the build html file 
}


//routes middleware
// app.use('/api',authRoutes)

// the one method to call all routes under one route
fs.readdirSync("./src/routes").map((r)=>app.use('/api',require('./src/routes/'+r)))

// but other method is make versioning of it like nasa mission 
// app.use('/v1',)


const PORT=process.env.PORT|| 8000;

app.listen(PORT,()=>{console.log(`server is running on ${PORT}`);})
