/**
 * Created by haams on 2017-08-21.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var fileSchema = new Schema({
    memoTitle: {type: String},
    memoContent: {
        type: String
    },
    memoImagePath: {
        type: String
    }
});

fileSchema.statics.fileUpload = function (title, memo, imageUrl) {
    if (err) return console.log(new Error("파일 업로드가 잘못되었습니다."));
    else {
        this.models("File").collection.insert({memoTitle: title, memoContent: memo, memoImagePath: imageUrl}, cb);
    }
};

module.exports = mongoose.model("File", fileSchema);