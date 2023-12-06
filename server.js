const express=require('express')
const certificaterouter = require('./routes/certificate')
const app=express()




app.use("/v1",certificaterouter)

app.listen(8000,()=>{
    console.log("server is running")
})