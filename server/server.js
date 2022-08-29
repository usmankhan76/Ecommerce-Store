const bodyParser = require('body-parser');
const express=require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors=require('cors')
const fs = require('fs');
require('dotenv').config();

// const authRoutes=require('./src/routes/auth-routes')
const app=express()

mongoose.connect(process.env.DATABASE)
.then(()=>{console.log('DB Connected');})
.catch((err)=>{console.log('DB error',err);})

//middleware
app.use(morgan("dev"))
app.use(bodyParser.json())
app.use(cors())

//routes middleware
// app.use('/api',authRoutes)

// the one method to call all routes under one route
fs.readdirSync("./src/routes").map((r)=>app.use('/api',require('./src/routes/'+r)))

// but other method is make versioning of it like nasa mission 
// app.use('/v1',)


const PORT=process.env.PORT|| 8000;

app.listen(PORT,()=>{console.log(`server is running on ${PORT}`);})
