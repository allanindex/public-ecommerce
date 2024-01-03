const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const dotenv = require("dotenv").config()
mongoose.connect(`mongodb+srv://bispo:${process.env.DB_PASSWORD}@ecommerce.ahxac6f.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log("conectado")
}).catch((err)=>{
     console.log("erro: " + err)
})