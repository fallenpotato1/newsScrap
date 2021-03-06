var express = require("express")
var router = express.Router()
var theData = require("./scraper")
var gamingItem = require("../models/createLink")
var mongoose = require("mongoose")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gamingList";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

router.get("/", function(req, res) {
    gamingItem.find({}, function(err, docs) {
        if(err) {
            throw err
        }
        theData.returnData()
        res.render("index", {thing: docs})
    })
})

module.exports = router