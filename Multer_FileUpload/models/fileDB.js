/**
 * Created by haams on 2017-07-20.
 */
var mongoose = require("mongoose");
var schema = mongoose.Schema;
var fileSchema = new schema({
    cr_name: {type: String, default: '', required: true},
    created_at: {type: Date, default: Date.now()}
});
var File = mongoose.model("File", fileSchema);

fileSchema.methods.uploadFile = function uploadFile(filename, done) {
    return this.model("File").collection.insert(filename, done);
};


module.exports = File;