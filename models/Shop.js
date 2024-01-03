const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Shop = new Schema({
    productId:{
        type: String,
        required: true,
    },
    userId:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'pendente'
    },
    response:{
        Type: String,
    }
})
mongoose.model("shops", Shop)