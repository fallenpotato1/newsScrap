var express = require("express")
var PORT = process.env.PORT || 3000
var app = express()
var exphbs = require("express-handlebars")
var router = require("./routes/appRoutes")

app.use(express.static("public"))

app.use(express.urlencoded({ extended: true}))
app.use(express.json())

app.engine("handlebars", exphbs({defaultLayout : "main"}))
app.set("view engine", "handlebars")

app.use(router)
app.listen(PORT, function() {
    console.log("listening on port localhost:" + PORT)
})