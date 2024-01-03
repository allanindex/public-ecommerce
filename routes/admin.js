const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
require("../models/Category")
require("../models/Product")
const path = require("path")
const multer = require("multer")

const fetch = require('node-fetch')

// Configuração do Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/img/uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname)
    },
  });
  const upload = multer({ storage: storage })
  

const Category = mongoose.model("categories")
const Product = mongoose.model("products")

router.get("/categories", (req, res)=>{
    Category.find().lean().then((categories)=>{
        res.render("admin/categories", {categories : categories})
    }).catch(()=>{
        res.send("houve um erro interno")
    })
    
})
router.get("/newCategory", (req, res)=>{
    res.render("admin/newCategory")
})
router.post("/newCategory", (req, res)=>{
    let error = []
    if(!req.body.category || req.body.category == null ||  req.body.category == ''){
        error.push({texto: "nome inválido"})
    }
    if(req.body.category.length < 3){
        error.push({texto: "nome muito curto"})
    }
    if(error.length > 0){
        res.render("admin/newCategory", {error : error})
    }else{
        const newCategory = {
            name: req.body.category,
        }
        new Category(newCategory).save().then(()=>{
            req.flash("success_msg", "Categoria salva com sucesso!")
            res.redirect("/admin/categories")
        }).catch(()=>{
            req.flash("error_msg", "houve um erro interno")
            res.redirect("/admin/categories")
        }) 
    }
})
router.get("/categoryDelete/:id", (req, res)=>{
    Category.deleteOne({_id: req.params.id}).then(()=>{
        req.flash("success_msg","Categoria deletada com sucesso")
        res.redirect("/admin/categories")
    }).catch(()=>{
        req.flash("error_msg", "erro ao deletar categoria")
        res.redirect("/admin/categories")
    })
})
router.get("/categoryUpdate/:id", (req, res)=>{
    Category.findOne({_id : req.params.id}).lean().then((category)=>{
        res.render("admin/categoryUpdate", {category})
    })
})

router.post("/categoryUpdate", (req, res)=>{
    Category.findOne({_id: req.body.id}).then((category)=>{
        let error = []
        category.name = req.body.name
        if(!req.body.name || req.body.name == '' || req.body.name == null || req.body.name == undefined){
            error.push({texto: "Nome inválido"})
        }
        if(req.body.name.length < 3){
            error.push({texto: "Nome muito curto"})
        }
        if(error.length > 0){
            res.render("admin/categoryUpdate", {error})
        }
        else{
            category.save().then(()=>{
                req.flash("success_msg", "categoria alterada com sucesso")
                res.redirect("/admin/categories")
            })
        }
       
    })
})
router.get("/products", (req, res)=>{
    Product.find().lean().then((products)=>{
    res.render("admin/products", {products})  
    })
})
router.get("/newProduct", (req, res)=>{
    Category.find().lean().then((categories)=>{
        res.render("admin/newProduct", {categories})
    }).catch(()=>{
        req.flash("Houve um erro interno")
        res.redirect("/")
    })
   
})

router.post("/newProduct", upload.array('images'),(req, res)=>{
    let error = []
    if(req.body.name.length < 4){
        error.push({texto: "Nome muito curto"})
    }
    if( !req.body.name || !req.body.description || !req.body.brand || !req.body.weight || !req.body.stock){
        error.push({texto: "Preencha todos os campos"})
    }
    if(error.length > 0){
        res.render("admin/newProduct", {error})
    }else{
        const images = req.files
        var imageNames = images.map(objeto => objeto.filename)

        const stock  = req.body.stock
        const color = req.body.color

    const objetosStock = []


    for (let i = 0; i < stock.length; i++) {
    const objeto = {
        quantidade: stock[i],
        cor: color[i]
    };
    objetosStock.push(objeto);
    }
        const newProduct = {
            name: req.body.name,
            description:  req.body.description,
            weight: req.body.weight,
            brand: req.body.brand,
            categories: req.body.category,
            images: imageNames,
            price: req.body.price,
            stock: objetosStock,
        }
        new Product(newProduct).save().then(()=>{
            req.flash("success_msg", "produto cadastrado com sucesso")
            res.redirect('/admin/products')
        }).catch(()=>{
            req.flash("error_msg", "houve um erro interno")
            res.redirect('/admin/products')
        })
    }
})

router.post("/search", (req, res)=>{
    const search = req.body.search || req.body.mobileSearch
        Product.findOne({$text: {$search: search}}).then((result)=>{
            console.log(result)
             res.render("admin/search", {result})
        }).catch((err)=>{
            res.render("admin/search", {err})
        })    
})


router.post("/deliveryCalc", (req, res)=>{
    Product.findOne({_id: req.body.id}).lean().then((product)=>{
        const dest = req.body.cep
        const url = 'https://www.melhorenvio.com.br/api/v2/me/shipment/calculate';
        const options = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiMzNmYzMyYjY2NjM4ODM5ZTE4ZTIxMDVlM2M1ZmVlM2EzYmRlZDNhMWNhYjFmZDlkMjk5MDQ0Njk1NDJmM2QyZTZlOGM0ZDNkZGRmMDAzMzgiLCJpYXQiOjE3MDQxNDA4NzIuMDU1NDY5LCJuYmYiOjE3MDQxNDA4NzIuMDU1NDcsImV4cCI6MTczNTc2MzI3Mi4wMzg2NzQsInN1YiI6IjlhZmQ3NzRhLWZmOTAtNDcyZi1hMjc4LWRiMmQ2ZjM3OGYwZCIsInNjb3BlcyI6WyJzaGlwcGluZy1jYWxjdWxhdGUiXX0.guVkQA---v-xgDi30vnScoiq_VWPHBFifo_EJoiIYdVGFVgE3YnDjXVjsPPeVJURUGq2kY84TP3H66aldTdCk_qbg2CXw50eJLtVbRSqCz27JOysAuirtHW6MHGJ1K_zA7mX85SlUtjubIQt0Fp5VAx6rWRmoJfUpUsgo22fLciBflBgubuMh8_9YmbLyr6hHwtpWMEJL2Nb8zsAYAXmZeXVEzFGxpKlij_LIkQSwPKN5Kvuii0UzR9ibodtfIhe4O6UG6q-NsAWebldAqGl70uQnCEe4kmDHRe9aZ-do8QAT3Fpuu-IGJfii3hU2F80sfebJdmpXvMSf5OmDzEK7QBDTrzKIRtz2oMrUppxkIGJjcP66t-8V-VMf1yJojG-wMSp587NtrWjvD0m0Nk095QTXf05-1vYWcF8oP4QY7vn6UP2QXTOSxODq-z-NVjC63zopWfG7yqmdt76N5T3pUOBfepnKmIV0BNVD0XkTjvEV5sYvzjNcbBbAESBA2kIQUY19HoqWiiQDp7eGC69aYtp34PNjM1f5oHxMl8nTIf702ktb3XkcHTxkYRLuJOwf7wOd3hKNhVjwBtnKfZq_80oGHGNqrCEv9Qbk8l7dTb_d34c2BOzxlMQPfolPW-S6qwBL-P0Iot5_CHX08dyx0fIU2VQRlgwJpZlQ102EeA',
                'User-Agent': 'Aplicação bispoa486@gmail.com'
            },
            body: JSON.stringify({
                "from": {
                "postal_code": "74603140"
                },
                "to": {
                "postal_code": `${dest}`
                },
                "package": {
                    "height": 4,
                    "width": 12,
                    "length": 1,
                    "weight": 0.3,
                },
            })
        }
        fetch(url, options)
        .then(res => res.json())
        .then((json) => {
            const price = json[1].price
            const company = json[1].name
            const time = json[1].delivery_time
            res.render("user/showProduct", {product, price, company, time})
        })
        .catch(err => console.error('error:' + err));
    }).catch((err)=>{
            res.send(err)
       })

    })

module.exports = router