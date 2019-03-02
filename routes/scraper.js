var axios = require("axios")
var cheerio = require("cheerio")
var mongoose = require("mongoose")
var gamingItem = require("../models/createLink")

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/gamingList";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true })

function findThisBitch(thisBitch){
    gamingItem.find({title: thisBitch.title}, function(err, bitch) {
        let {title, summary, link} = thisBitch
        console.log(thisBitch.title)
        if(!bitch.title) {
            let anotherThing = {
                title, 
                summary,
                link
            }
            console.log(anotherThing)
            return gamingItem.create({
                title: anotherThing.title,
                summary: anotherThing.summary,
                link: anotherThing.link
            }, function(err, res) {
                console.log("created")
            })
        }
        console.log("existed already")
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