/**
 * Created by haams on 2017-08-21.
 */
var express = require("express");
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var fileListSchema = new Schema({
    diary_k: {type: Number},
    title: {type: String},
    memo: {type: String}
});

module.exports = mongoose.model("FileList", fileListSchema);