const mongoose = require("mongoose")
const Schema = mongoose.Schema
const Product = new Schema({
    name:{
        type: String,
        required: true,
    },
    
    description:{
        type: String,
    },
    weight:{
        type: Number,
    },
    width:{
        type:  Number,
    },
    height:{
        type: Number,
    },
    brand:{
        type: String,
    },
    categories:{
        type: [String],
    },
    images:{
        type: [String],
    },
    stock:{
        type: [Object],
    },
    price:{
        type: Number,
    }
})
Product.index({name: 'text'})
mongoose.model("products", Product)