var mongoose = require("mongoose")
var Schema = mongoose.Schema

var aRow = new Schema({
    title: {
        type: String
    },
    link: {
        type: String
    },
    summary: {
        type: String
    },
    id: {
        type: mongoose.Types.ObjectId
    }
})
const gamingItem = mongoose.model("rows", aRow)
module.exports = gamingItem