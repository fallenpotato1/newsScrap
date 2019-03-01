var axios = require("axios")
var cheerio = require("cheerio")
var mongoose = require("mongoose")
var gamingItem = require("../models/createLink")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gamingList";
mongoose.connect(MONGODB_URI)

function findThisBitch(thisBitch){
    gamingItem.find({title: thisBitch.title}, function(err, bitch) {
        if(err) {
            gamingItem.create(thisBitch)
            return console.log("this bitch didnt exist" + thisBitch.title)
        }
            console.log("this bitch exists")
    })
}

var theData = {
    returnData: function () {
        axios.get("https://www.gamespot.com/news/").then(function (response) {
            var $ = cheerio.load(response.data)
            $(".media-article").each(function (i, element) {
                var title = $(element).find("h3.media-title").text()
                var link = "https://www.gamespot.com" + $(element).find("a").attr("href")
                var summary = $(element).find(".media-deck").text()
                var thing = {
                    title,
                    link,
                    summary
                }
                findThisBitch(thing)
            })
        })
    },
    imDrunk: function(heyThere) {
        findThisBitch(heyThere)
    }
}
module.exports = theData