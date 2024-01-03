const express = require("express")
const app = express()
const handlebars = require("express-handlebars")
const path = require("path")
const admin = require("./routes/admin")
const public = require("./routes/public")
app.use(express.urlencoded({extended: true}))
app.use(express.json())

require("./DB/connection")

const session = require("express-session")
const flash = require("connect-flash")

app.use(
    session({
      secret: 'ghgfdkhlfjjodghsisidg',
      resave: true,
      saveUninitialized: true,
    })
    
  )


//passport

app.use(flash())

app.use((req, res, next)=>{
    res.locals.error_msg = req.flash('error_msg')
    res.locals.success_msg = req.flash('success_msg')
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
})


app.use(express.static(path.join(__dirname, 'public')))

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

app.get("/", (req, res)=>{
    res.render("user/home")
})


app.use("/admin", admin)
app.use("/public", public)
const port = process.env.PORT || 5000
app.listen(port, ()=>{
    console.log("server in @localhost:" + port)
})