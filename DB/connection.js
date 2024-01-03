const mongoose = require("mongoose")
mongoose.Promise = global.Promise
const dotenv = require("dotenv").config()
mongoose.connect(`your link + password`).then(()=>{
    console.log("conectado")
}).catch((err)=>{
     console.log("erro: " + err)
})
