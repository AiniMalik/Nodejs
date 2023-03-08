const mongoose = require("mongoose");


const groupSchema = new mongoose.Schema({
    group: String
})

module.exports = mongoose.model("study-groups", groupSchema);