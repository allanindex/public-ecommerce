const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = new Schema({
    name:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    },
    cep:{
        type: Number,
        required: true,
    },
    adress:{
        type: String,
        required: true,
    },
    cell:{
        type: String,
        required: true,
    },
    birth:{
        type: Date,
        required:true,
    }
})
mongoose.model("users", User)