const express = require("express")
const router = express.Router()
const mongoose  = require("mongoose")
const Product = mongoose.model("products")
router.get("/", ()=>{

})
router.get("/showProduct/:id", (req, res)=>{
    Product.findOne({_id: req.params.id}).lean().then((product)=>{
        res.render("user/showProduct", {product})
    })
})
module.exports = router