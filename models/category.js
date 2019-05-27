var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema({
    name: Number,
    status: Number

});
var category = mongoose.model('category', categorySchema);

module.exports = category;