/**
 * Created by haams on 2017-08-26.
 */
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var memoSchema = new Schema({
    title: {type: String},
    contents: {type: String},
    imagePath: {type: String}
});

var albumSchema = new Schema({
    memo: [memoSchema]
});

module.exports = mongoose.model("Album",albumSchema);